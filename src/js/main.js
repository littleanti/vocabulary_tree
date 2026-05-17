// 진입점 — 라우팅 + 게임 루프

import { CONFIG, SCREENS } from './config.js';
import { state } from './state.js';
import { todayISO, vibrate, shuffle } from './utils.js';
import { speak, cancel as cancelTTS } from './tts.js';
import * as db from './db.js';
import { decideTodayHanja, buildTodayQueue, isLockedToday, getTodayProgress } from './curriculum.js';
import { applyResult, seedSrl, applyWrongMini } from './srl.js';
import { getWordsForHanja } from '../data/words.js';
import { renderSapling, highlightBranch, growBranch, slotEndToScreen } from './tree/render.js';
import { placeLeaf, repositionLeaves } from './tree/leaves.js';
import { spawnBlocks, clearBlocks, consumeBlock, returnBlock } from './blocks/spawn.js';
import { attachDrag } from './blocks/drag.js';
import { isCorrectNext, isComplete } from './blocks/match.js';
import { showLeafModal, showMiniquiz, closeModal } from './ui/modal.js';
import { renderLockScreen } from './ui/lock.js';

// =======================
// Screen routing
// =======================
function showScreen(name) {
  cancelTTS();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(`screen-${name}`);
  if (el) el.classList.add('active');
  state.ui.screen = name;
}

function toast(msg, duration = 1600) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

// =======================
// Today screen
// =======================
async function showTodayScreen() {
  const hanja = await decideTodayHanja(state.profile.grade);
  state.today.hanjaId = hanja.id;
  const prog = await getTodayProgress();
  state.today.completed = (prog.wordIds || []).map(id => ({ id }));

  const el = document.getElementById('screen-today');
  el.innerHTML = `
    <div class="screen-header">
      <h2>오늘의 한자</h2>
      <button class="close-btn" id="today-back" aria-label="홈">✕</button>
    </div>
    <div class="today-hanja-card">
      <span class="hanja-glyph hanja">${hanja.code}</span>
      <span class="hanja-hunum">${hanja.hun} ${hanja.eum}</span>
      <span class="hanja-meta">${hanja.level}급 · ${hanja.strokes}획 · 부수 ${hanja.radical}</span>
    </div>
    <p class="today-progress">오늘 학습 <span class="num">${prog.completedCount}</span> / ${prog.target}</p>
    ${prog.locked
      ? `<button class="btn big mint" id="today-tree">🌳 나무 보기</button>`
      : `<button class="btn big" id="today-start">학습 시작 🌱</button>`}
    <div class="splash-foot">
      <button class="btn small ghost" id="today-overview">🌳 누적 나무</button>
      ${await hasBossUnlocked() ? `<button class="btn small mint" id="today-boss">🏛️ 학술 어휘 보스</button>` : ''}
    </div>
  `;
  el.querySelector('#today-back')?.addEventListener('click', () => showScreen(SCREENS.SPLASH));
  el.querySelector('#today-start')?.addEventListener('click', startPlay);
  el.querySelector('#today-tree')?.addEventListener('click', () => showTreeOverview());
  el.querySelector('#today-overview')?.addEventListener('click', () => showTreeOverview());
  el.querySelector('#today-boss')?.addEventListener('click', () => enterBoss());
  showScreen(SCREENS.TODAY);
}

async function hasBossUnlocked() {
  const cnt = await db.countLearnedWords();
  return cnt >= CONFIG.BOSS_UNLOCK_WORDS;
}

// =======================
// Play (묘목 + 매칭)
// =======================
let currentDetachDrag = null;
let currentWords = [];
let currentWordIdx = 0;
let placedBranchIndexes = [];

async function startPlay() {
  const hanja = (await import('../data/hanja.js')).getHanja(state.today.hanjaId);
  const queue = await buildTodayQueue(hanja);
  state.today.hanjaCurrent = hanja;

  // 신규 어휘 (M1: 복습은 M3에서 통합)
  const learned = new Set((await db.listLearnedWords()).map(w => w.wordId));
  const allWords = getWordsForHanja(hanja.id);
  const remaining = allWords.filter(w => !learned.has(w.id)).slice(0, CONFIG.DAILY_TARGET_WORDS);

  if (!remaining.length) {
    // 이미 다 학습 — 락 화면 또는 트리 오버뷰
    await goToLock(hanja, allWords.slice(0, CONFIG.DAILY_TARGET_WORDS));
    return;
  }

  currentWords = remaining;
  currentWordIdx = 0;
  placedBranchIndexes = [];
  state.today.completed = [];

  renderPlayScreen(hanja);
  showScreen(SCREENS.PLAY);
  loadNextWord();
}

function renderPlayScreen(hanja) {
  const el = document.getElementById('screen-play');
  el.innerHTML = `
    <div class="play-header">
      <button class="quit-btn" id="play-quit">🏠 홈</button>
      <span class="progress-pill">오늘의 한자 <span class="hanja">${hanja.code}</span></span>
      <span class="progress-pill">진행 <span class="num" id="play-progress">0</span>/${CONFIG.DAILY_TARGET_WORDS}</span>
    </div>
    <div class="tree-stage" id="tree-stage">
      <svg class="tree-svg" id="tree-svg" preserveAspectRatio="xMidYMid meet"></svg>
      <div class="hanja-hint-bar"><span>이 한자로 만든 어휘:</span><span class="hanja">${hanja.code}</span><span>(${hanja.hun} ${hanja.eum})</span></div>
      <div class="word-target" id="word-target"></div>
    </div>
    <div class="tree-progress-dots" id="tree-dots"></div>
    <div class="tree-message" id="tree-message">음절을 가지에 끌어다 놓아요</div>
  `;
  // 도트 4개
  const dots = el.querySelector('#tree-dots');
  for (let i = 0; i < CONFIG.DAILY_TARGET_WORDS; i++) {
    const d = document.createElement('span');
    d.className = 'dot';
    dots.appendChild(d);
  }
  el.querySelector('#play-quit').addEventListener('click', () => {
    if (confirm('학습을 종료할까요? 진행 상황은 자동 저장돼요.')) {
      showScreen(SCREENS.SPLASH);
    }
  });

  // 묘목 렌더
  const svg = el.querySelector('#tree-svg');
  renderSapling(svg, hanja, []);
}

function setMessage(msg) {
  const el = document.getElementById('tree-message');
  if (el) el.textContent = msg;
}

function updateProgressUI() {
  const num = document.getElementById('play-progress');
  if (num) num.textContent = String(state.today.completed.length);
  const dots = document.querySelectorAll('#tree-dots .dot');
  dots.forEach((d, i) => d.classList.toggle('done', i < state.today.completed.length));
}

function getCurrentWord() {
  return currentWords[currentWordIdx];
}

function getActiveSlot() {
  // 한 번에 하나의 어휘 → 다음 비어있는 가지
  const slotIdx = placedBranchIndexes.length;
  return slotIdx >= CONFIG.DAILY_TARGET_WORDS ? null : slotIdx;
}

function loadNextWord() {
  const word = getCurrentWord();
  if (!word) {
    // 4어휘 완료
    return finalizeDay();
  }
  state.session.currentWord = word;
  state.session.needSyllables = [...word.syllables];
  state.session.placedSyllables = [];
  state.session.currentBranchIdx = getActiveSlot();

  renderWordTarget(word);

  const stageEl = document.getElementById('tree-stage');
  const svg = document.getElementById('tree-svg');
  spawnBlocks(stageEl, stageEl, word);

  // Drag handlers
  currentDetachDrag?.();
  currentDetachDrag = attachDrag(stageEl, {
    getActiveSlots: () => {
      const idx = state.session.currentBranchIdx;
      if (idx == null) return [];
      const pos = slotEndToScreen(stageEl, idx);
      return [{ idx, x: pos.x, y: pos.y, requires: state.session.needSyllables[0] }];
    },
    onDrop: ({ block, syllable, slotIdx }) => onBlockDrop(block, syllable, slotIdx),
  });

  setMessage(`'${word.text}' 을(를) 만들어 보세요!`);
}

function renderWordTarget(word) {
  const el = document.getElementById('word-target');
  if (!el) return;
  el.innerHTML = '';
  word.syllables.forEach((syl) => {
    const slot = document.createElement('div');
    slot.className = 'target-slot';
    slot.dataset.expect = syl;
    slot.textContent = '?';
    el.appendChild(slot);
  });
}

function paintTargetSlots() {
  const slots = document.querySelectorAll('#word-target .target-slot');
  const word = getCurrentWord();
  word.syllables.forEach((syl, i) => {
    const slot = slots[i];
    if (!slot) return;
    if (i < state.session.placedSyllables.length) {
      slot.textContent = syl;
      slot.classList.add('filled');
    } else {
      slot.textContent = '?';
      slot.classList.remove('filled', 'complete');
    }
  });
}

function onBlockDrop(blockEl, syllable, slotIdx) {
  const word = getCurrentWord();
  if (!word) return;
  const isMatchCorrect = isCorrectNext(state.session.needSyllables, syllable);
  if (!isMatchCorrect) {
    // 오답 — 원위치 + 진동 + 메시지 + 미니퀴즈는 어휘 단위(다 채운 후)에서.
    returnBlock(blockEl);
    vibrate([20, 30, 20]);
    setMessage('다시 한번 시도해요!');
    return;
  }
  // 정답 음절 한 개
  state.session.placedSyllables.push(syllable);
  state.session.needSyllables.shift();
  consumeBlock(blockEl);
  paintTargetSlots();

  if (isComplete(state.session.needSyllables)) {
    onWordComplete(slotIdx);
  } else {
    setMessage('좋아요! 다음 음절을 찾아요.');
  }
}

async function onWordComplete(slotIdx) {
  const word = getCurrentWord();
  const stageEl = document.getElementById('tree-stage');
  const svg = document.getElementById('tree-svg');

  // 가지 성장
  growBranch(svg, slotIdx);
  placedBranchIndexes.push(slotIdx);

  // 잎 등장
  placeLeaf(stageEl, stageEl, {
    slotIdx,
    word,
    onClick: () => showLeafModal(word, { autoSpeak: true }),
  });

  // 마지막 슬롯 complete 표시
  const slots = document.querySelectorAll('#word-target .target-slot');
  slots.forEach(s => s.classList.add('complete'));

  // DB 기록 + SRL 시드
  await db.recordWordLearned(word, todayISO(), seedSrl());
  state.today.completed.push(word);
  updateProgressUI();

  // 잎 모달 자동 표시 (의미 + 예문 + TTS)
  setTimeout(() => {
    showLeafModal(word, {
      autoSpeak: true,
      autoNextLabel: state.today.completed.length < CONFIG.DAILY_TARGET_WORDS ? '다음 어휘 →' : '오늘 학습 완료 →',
      onClose: () => {
        currentWordIdx++;
        if (currentWordIdx < currentWords.length) {
          loadNextWord();
        } else {
          finalizeDay();
        }
      },
    });
  }, 550);
}

async function finalizeDay() {
  clearBlocks(document.getElementById('tree-stage'));
  currentDetachDrag?.();
  currentDetachDrag = null;

  const hanjaMod = await import('../data/hanja.js');
  const hanja = hanjaMod.getHanja(state.today.hanjaId);
  await goToLock(hanja, state.today.completed);
}

async function goToLock(hanja, completedWords) {
  const el = document.getElementById('screen-lock');
  await renderLockScreen(el, {
    hanja,
    completedWords,
    onTreeView: () => showTreeOverview(),
    onDashboard: () => showScreen(SCREENS.DASHBOARD),
  });
  showScreen(SCREENS.LOCK);
}

// =======================
// Tree overview (M2 stub — M1: 단순 누적 어휘 카운트 화면)
// =======================
async function showTreeOverview() {
  const el = document.getElementById('screen-tree');
  const allWords = await db.listLearnedWords();
  const allHanja = await db.listLearnedHanja();
  el.innerHTML = `
    <div class="screen-header">
      <h2>🌳 누적 나무</h2>
      <button class="close-btn" id="tree-back">✕</button>
    </div>
    <div class="today-hanja-card" style="aspect-ratio:auto;height:auto;padding:24px;gap:12px;">
      <span style="font-size:3rem;">🌱</span>
      <p style="font-family:'Gowun Dodum',sans-serif;text-align:center;">
        지금까지 자란 어휘 나무는<br>
        <strong style="color:var(--coral);font-family:'Jua',sans-serif;font-size:1.5rem;">한자 ${allHanja.length}자 · 어휘 ${allWords.length}개</strong><br>
        ${allWords.length >= 30 ? '🎉 학술 어휘 보스가 해금되었어요!' : `보스까지 ${30 - allWords.length}어휘 남았어요`}
      </p>
    </div>
    <div class="splash-foot">
      <button class="btn small" id="tree-home">🏠 홈으로</button>
    </div>
  `;
  el.querySelector('#tree-back').addEventListener('click', () => showScreen(SCREENS.SPLASH));
  el.querySelector('#tree-home').addEventListener('click', () => showScreen(SCREENS.SPLASH));
  showScreen(SCREENS.TREE);
}

// =======================
// Boss (M4 stub — M1에서는 진입 안내만)
// =======================
async function enterBoss() {
  const mod = await import('./boss/decompose.js').catch(() => null);
  if (mod?.startBoss) {
    mod.startBoss();
  } else {
    toast('학술 어휘 보스는 M4에서 활성화됩니다');
  }
}

// =======================
// Splash
// =======================
function renderSplash() {
  const el = document.getElementById('screen-splash');
  el.innerHTML = `
    <div class="splash-emoji">🌱</div>
    <h1>어휘력 세계수</h1>
    <p class="subtitle">한자 한 글자가 키워내는 어휘 나무 🌳</p>
    <div class="splash-actions">
      <button class="btn big" id="btn-today">오늘 학습 시작 →</button>
      <button class="btn mint small" id="btn-tree">🌳 누적 나무 보기</button>
      <button class="btn ghost small" id="btn-dashboard">👪 학부모 대시보드</button>
    </div>
    <div class="splash-foot">
      <button class="btn small ghost" id="btn-settings">⚙️ 설정</button>
    </div>
  `;
  el.querySelector('#btn-today').addEventListener('click', () => showTodayScreen());
  el.querySelector('#btn-tree').addEventListener('click', () => showTreeOverview());
  el.querySelector('#btn-dashboard').addEventListener('click', async () => {
    const mod = await import('./ui/dashboard.js').catch(() => null);
    if (mod?.openDashboard) mod.openDashboard();
    else showScreen(SCREENS.DASHBOARD);
  });
  el.querySelector('#btn-settings').addEventListener('click', () => openSettings());
}

// =======================
// Settings (간단)
// =======================
function openSettings() {
  const el = document.getElementById('screen-settings');
  el.innerHTML = `
    <div class="screen-header">
      <h2>⚙️ 설정</h2>
      <button class="close-btn" id="set-back">✕</button>
    </div>
    <div class="settings-section">
      <div class="section-label">🎯 학년</div>
      <div class="chip-row" id="grade-chips"></div>
      <div class="section-hint">학년에 맞춰 한자 추천이 달라져요</div>
    </div>
    <div class="settings-section">
      <div class="toggle-row">
        <span class="toggle-label">🔊 자동 발음</span>
        <div class="toggle ${state.profile.autoTTS !== false ? 'on' : ''}" id="toggle-tts"></div>
      </div>
      <div class="section-hint">잎 모달이 열리면 자동으로 어휘를 읽어줘요</div>
    </div>
    <div class="settings-section">
      <div class="toggle-row">
        <span class="toggle-label">🔔 일일 학습 알림</span>
        <div class="toggle ${state.profile.notify ? 'on' : ''}" id="toggle-notify"></div>
      </div>
      <div class="section-hint">매일 오후 ${CONFIG.NOTIFY_DEFAULT_HOUR}시 알림을 보내요 (권한 필요)</div>
    </div>
    <div class="settings-footer">
      <button class="btn big" id="set-home">🏠 홈으로</button>
    </div>
  `;
  const gradesEl = el.querySelector('#grade-chips');
  ['3','4','5','6'].forEach(g => {
    const chip = document.createElement('div');
    chip.className = 'chip' + (state.profile.grade === g ? ' active' : '');
    chip.textContent = `초${g}`;
    chip.addEventListener('click', async () => {
      state.profile.grade = g;
      await db.setProfile('grade', g);
      gradesEl.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.textContent === `초${g}`));
    });
    gradesEl.appendChild(chip);
  });
  el.querySelector('#toggle-tts').addEventListener('click', async (ev) => {
    state.profile.autoTTS = !ev.currentTarget.classList.contains('on');
    ev.currentTarget.classList.toggle('on');
    await db.setProfile('autoTTS', state.profile.autoTTS);
  });
  el.querySelector('#toggle-notify').addEventListener('click', async (ev) => {
    const turningOn = !ev.currentTarget.classList.contains('on');
    if (turningOn) {
      const mod = await import('./notify.js');
      const granted = await mod.requestPermission();
      if (!granted) { toast('알림 권한이 거부되었어요'); return; }
      mod.scheduleDaily(CONFIG.NOTIFY_DEFAULT_HOUR);
    }
    state.profile.notify = turningOn;
    ev.currentTarget.classList.toggle('on', turningOn);
    await db.setProfile('notify', turningOn);
  });
  el.querySelector('#set-back').addEventListener('click', () => showScreen(SCREENS.SPLASH));
  el.querySelector('#set-home').addEventListener('click', () => showScreen(SCREENS.SPLASH));
  showScreen(SCREENS.SETTINGS);
}

// =======================
// Boot
// =======================
async function boot() {
  // restore profile
  const grade = await db.getProfile('grade', '3');
  const autoTTS = await db.getProfile('autoTTS', true);
  const notify = await db.getProfile('notify', false);
  state.profile.grade = grade;
  state.profile.autoTTS = autoTTS;
  state.profile.notify = notify;
  if (!state.profile.startedAt) {
    state.profile.startedAt = await db.getProfile('startedAt', null);
    if (!state.profile.startedAt) {
      const iso = new Date().toISOString();
      await db.setProfile('startedAt', iso);
      state.profile.startedAt = iso;
    }
  }

  // Auto-save on visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      // Saved-on-each-step already; here just cancel TTS
      cancelTTS();
    }
  });

  // Resize → reposition leaves
  let resizeRaf = 0;
  window.addEventListener('resize', () => {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      const stageEl = document.getElementById('tree-stage');
      if (!stageEl) return;
      const slotMap = new Map();
      placedBranchIndexes.forEach((slotIdx, i) => {
        const w = state.today.completed[i];
        if (w?.id) slotMap.set(w.id, slotIdx);
      });
      repositionLeaves(stageEl, stageEl, state.today.completed, slotMap);
    });
  });

  renderSplash();

  // Service Worker (PWA — M6)
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.warn('[sw] register failed', err);
    });
  }

  showScreen(SCREENS.SPLASH);
}

boot().catch(err => {
  console.error('boot error', err);
  document.body.innerHTML = `<div style="padding:30px;text-align:center;">
    <h2 style="color:#FF7757;font-family:Jua,sans-serif;">⚠️ 초기화 실패</h2>
    <p>${err?.message || err}</p>
  </div>`;
});
