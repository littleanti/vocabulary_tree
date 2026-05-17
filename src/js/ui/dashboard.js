// 학부모 대시보드 — PIN 보호 + 진척 시각화

import { CONFIG } from '../config.js';
import * as db from '../db.js';
import { sha256, setText } from '../utils.js';

// ==================== PIN 해싱 ====================
async function hashPin(pin, salt) {
  const text = `${pin}:${salt}`;
  return await sha256(text);
}

// ==================== 기본 PIN 설정 UI ====================
function renderPinSetup(screenEl, onSuccess) {
  const formEl = document.createElement('div');
  formEl.className = 'dashboard-section';
  formEl.innerHTML = `
    <div style="padding: 20px 0;">
      <h3 style="text-align: center; margin-bottom: 20px;">PIN 설정</h3>
      <p class="pin-hint">학부모 대시보드를 보호할 4자리 PIN을 설정하세요</p>
      <div class="pin-dots" id="pin-dots-setup"></div>
      <div class="pin-pad" id="pin-pad-setup"></div>
      <div style="text-align: center; margin-top: 20px; font-family: 'Gowun Dodum', sans-serif; font-size: 0.9rem; color: var(--color-text-dim);">
        <span id="pin-setup-message">4자리 입력</span>
      </div>
    </div>
  `;
  screenEl.appendChild(formEl);

  let pinBuffer = '';
  let stage = 'first'; // 'first' → 'confirm'
  let firstPin = '';
  const dots = formEl.querySelector('#pin-dots-setup');
  const message = formEl.querySelector('#pin-setup-message');

  function updateDots() {
    dots.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const dot = document.createElement('div');
      dot.className = `pin-dot ${i < pinBuffer.length ? 'filled' : ''}`;
      dots.appendChild(dot);
    }
  }

  function renderKeypad() {
    const pad = formEl.querySelector('#pin-pad-setup');
    pad.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
      const btn = document.createElement('button');
      btn.className = 'pin-btn';
      btn.textContent = i;
      btn.addEventListener('click', () => {
        if (pinBuffer.length < 4) {
          pinBuffer += i;
          updateDots();
          if (pinBuffer.length === 4) {
            setTimeout(() => handlePinInput(), 200);
          }
        }
      });
      pad.appendChild(btn);
    }
    const btnBackspace = document.createElement('button');
    btnBackspace.className = 'pin-btn';
    btnBackspace.textContent = '⌫';
    btnBackspace.addEventListener('click', () => {
      pinBuffer = pinBuffer.slice(0, -1);
      updateDots();
    });
    pad.appendChild(document.createElement('div')); // spacer
    const btn0 = document.createElement('button');
    btn0.className = 'pin-btn';
    btn0.textContent = '0';
    btn0.addEventListener('click', () => {
      if (pinBuffer.length < 4) {
        pinBuffer += '0';
        updateDots();
        if (pinBuffer.length === 4) {
          setTimeout(() => handlePinInput(), 200);
        }
      }
    });
    pad.appendChild(btn0);
    pad.appendChild(btnBackspace);
  }

  function handlePinInput() {
    if (stage === 'first') {
      firstPin = pinBuffer;
      pinBuffer = '';
      stage = 'confirm';
      setText(message, 'PIN 재확인');
      updateDots();
    } else if (stage === 'confirm') {
      if (pinBuffer === firstPin) {
        onSuccess(firstPin);
      } else {
        setText(message, 'PIN이 일치하지 않습니다. 다시 설정하세요.');
        pinBuffer = '';
        stage = 'first';
        firstPin = '';
        updateDots();
        setTimeout(() => setText(message, '4자리 입력'), 2000);
      }
    }
  }

  renderKeypad();
  updateDots();
}

// ==================== PIN 입력 UI ====================
function renderPinEntry(screenEl, onSuccess, onError) {
  const formEl = document.createElement('div');
  formEl.className = 'dashboard-section';
  formEl.innerHTML = `
    <div style="padding: 20px 0;">
      <h3 style="text-align: center; margin-bottom: 20px;">PIN 입력</h3>
      <div class="pin-dots" id="pin-dots-entry"></div>
      <div class="pin-pad" id="pin-pad-entry"></div>
      <div style="text-align: center; margin-top: 20px;">
        <span id="pin-entry-message" class="pin-hint"></span>
      </div>
    </div>
  `;
  screenEl.appendChild(formEl);

  let pinBuffer = '';
  const dots = formEl.querySelector('#pin-dots-entry');
  const message = formEl.querySelector('#pin-entry-message');
  const pad = formEl.querySelector('#pin-pad-entry');

  function updateDots() {
    dots.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const dot = document.createElement('div');
      dot.className = `pin-dot ${i < pinBuffer.length ? 'filled' : ''}`;
      dots.appendChild(dot);
    }
  }

  function renderKeypad() {
    pad.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
      const btn = document.createElement('button');
      btn.className = 'pin-btn';
      btn.textContent = i;
      btn.addEventListener('click', () => {
        if (pinBuffer.length < 4) {
          pinBuffer += i;
          updateDots();
          if (pinBuffer.length === 4) {
            setTimeout(() => handlePinInput(), 200);
          }
        }
      });
      pad.appendChild(btn);
    }
    const btnBackspace = document.createElement('button');
    btnBackspace.className = 'pin-btn';
    btnBackspace.textContent = '⌫';
    btnBackspace.addEventListener('click', () => {
      pinBuffer = pinBuffer.slice(0, -1);
      updateDots();
      setText(message, '');
    });
    pad.appendChild(document.createElement('div'));
    const btn0 = document.createElement('button');
    btn0.className = 'pin-btn';
    btn0.textContent = '0';
    btn0.addEventListener('click', () => {
      if (pinBuffer.length < 4) {
        pinBuffer += '0';
        updateDots();
        if (pinBuffer.length === 4) {
          setTimeout(() => handlePinInput(), 200);
        }
      }
    });
    pad.appendChild(btn0);
    pad.appendChild(btnBackspace);
  }

  async function handlePinInput() {
    const pinHash = await db.getProfile('pinHash');
    const startedAt = await db.getProfile('startedAt');
    const hash = await hashPin(pinBuffer, startedAt);

    if (hash === pinHash) {
      onSuccess();
    } else {
      onError(pinBuffer);
      pinBuffer = '';
      updateDots();
    }
  }

  renderKeypad();
  updateDots();
}

// ==================== 대시보드 콘텐츠 ====================
async function renderDashboardContent(screenEl) {
  const contentDiv = document.createElement('div');
  contentDiv.style.paddingBottom = '20px';

  // Header
  const headerDiv = document.createElement('div');
  headerDiv.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 8px; margin-bottom: 16px;">
      <h2 style="font-family: 'Jua', sans-serif; font-size: 1.6rem; color: var(--coral); margin: 0;">학부모 대시보드</h2>
      <button class="close-btn" id="dashboard-close" style="padding: 0; font-size: 1.4rem;">✕</button>
    </div>
  `;
  contentDiv.appendChild(headerDiv);

  // KPIs section
  const learnedHanja = await db.listLearnedHanja();
  const learnedWords = await db.listLearnedWords();
  const recentDaily = await db.listRecentDaily(60);

  // 정답률 계산 (ease >= 2.0인 어휘 / 전체 SRL 항목)
  let answeredCorrect = 0;
  let totalSrlItems = 0;
  for (const word of learnedWords) {
    const srl = await db.getSrl(word.wordId);
    if (srl) {
      totalSrlItems++;
      if (srl.ease >= 2.0) answeredCorrect++;
    }
  }
  const accuracy = totalSrlItems > 0 ? Math.round((answeredCorrect / totalSrlItems) * 100) : 0;

  // 연속일 계산 (최근부터 역순, completedCount > 0인 날만)
  let consecutiveDays = 0;
  const today = new Date();
  for (let i = 0; i < 366; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const daily = recentDaily.find(r => r.date === dateStr);
    if (daily && daily.completedCount > 0) {
      consecutiveDays++;
    } else if (i > 0) {
      break;
    }
  }

  const kpiSection = document.createElement('div');
  kpiSection.className = 'dashboard-section';
  kpiSection.innerHTML = `
    <h3>학습 현황</h3>
    <div class="kpi-grid">
      <div class="kpi">
        <div class="label">누적 한자 수</div>
        <div class="value">${learnedHanja.length}</div>
      </div>
      <div class="kpi">
        <div class="label">누적 어휘 수</div>
        <div class="value">${learnedWords.length}</div>
      </div>
      <div class="kpi">
        <div class="label">정답률</div>
        <div class="value">${accuracy}%</div>
      </div>
      <div class="kpi">
        <div class="label">연속일</div>
        <div class="value">${consecutiveDays}일</div>
      </div>
    </div>
  `;
  contentDiv.appendChild(kpiSection);

  // SRL 큐 잔여
  const dueSrlWords = await db.dueSrlWords();
  const srlSection = document.createElement('div');
  srlSection.className = 'dashboard-section';
  srlSection.innerHTML = `
    <h3>복습 대기</h3>
    <div style="text-align: center; padding: 10px 0;">
      <div style="font-family: 'Jua', sans-serif; font-size: 2rem; color: var(--coral);">${dueSrlWords.length}</div>
      <div style="font-family: 'Gowun Dodum', sans-serif; font-size: 0.9rem; color: var(--color-text-dim);">어휘 대기 중</div>
    </div>
  `;
  contentDiv.appendChild(srlSection);

  // 요일별 분포
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const weekCount = [0, 0, 0, 0, 0, 0, 0];
  for (const daily of recentDaily) {
    if (daily.completedCount > 0) {
      const d = new Date(daily.date + 'T00:00:00');
      weekCount[d.getDay()]++;
    }
  }
  const maxCount = Math.max(...weekCount, 1);

  const distSection = document.createElement('div');
  distSection.className = 'dashboard-section';
  distSection.innerHTML = `<h3>요일별 학습 분포</h3>`;
  const distContent = document.createElement('div');
  for (let i = 0; i < 7; i++) {
    const row = document.createElement('div');
    row.className = 'bar-row';
    const pct = (weekCount[i] / maxCount) * 100 || 0;
    row.innerHTML = `
      <div style="text-align: center; font-size: 0.85rem; font-weight: bold;">${dayOfWeek[i]}</div>
      <div class="bar-track"><div class="bar-fill" style="width: ${pct}%"></div></div>
      <div style="text-align: right; font-size: 0.85rem;">${weekCount[i]}일</div>
    `;
    distContent.appendChild(row);
  }
  distSection.appendChild(distContent);
  contentDiv.appendChild(distSection);

  // 알림 설정
  const notifyEnabled = await db.getProfile('notify', false);
  const notifySection = document.createElement('div');
  notifySection.className = 'dashboard-section';
  notifySection.innerHTML = `
    <h3>알림 설정</h3>
    <div style="padding: 10px 0;">
      <label style="display: flex; align-items: center; gap: 10px; font-family: 'Gowun Dodum', sans-serif; font-size: 0.95rem;">
        <input type="checkbox" id="dashboard-notify-toggle" ${notifyEnabled ? 'checked' : ''} style="width: 18px; height: 18px; cursor: pointer;">
        <span>매일 ${CONFIG.NOTIFY_DEFAULT_HOUR}시에 알림</span>
      </label>
    </div>
  `;
  contentDiv.appendChild(notifySection);

  // PIN 변경 및 닫기
  const footerSection = document.createElement('div');
  footerSection.className = 'dashboard-section';
  footerSection.style.display = 'flex';
  footerSection.style.gap = '10px';
  footerSection.style.flexDirection = 'column';
  footerSection.innerHTML = `
    <button class="btn big" id="dashboard-change-pin" style="flex: 1;">PIN 변경</button>
  `;
  contentDiv.appendChild(footerSection);

  screenEl.appendChild(contentDiv);

  // 이벤트 리스너
  document.getElementById('dashboard-notify-toggle').addEventListener('change', async (e) => {
    await db.setProfile('notify', e.target.checked);
  });

  document.getElementById('dashboard-change-pin').addEventListener('click', async () => {
    const confirmed = confirm('PIN을 재설정하시겠습니까?');
    if (confirmed) {
      await db.setProfile('pinHash', null);
      await db.setProfile('pinLockedUntil', null);
      screenEl.innerHTML = '';
      showPinFlowContent(screenEl, null);
    }
  });
}

// ==================== 통합 PIN 흐름 ====================
async function showPinFlowContent(screenEl, onClose) {
  screenEl.innerHTML = '';

  const pinHash = await db.getProfile('pinHash');
  const startedAt = await db.getProfile('startedAt');
  const lockedUntil = await db.getProfile('pinLockedUntil', 0);
  let attempts = 0;

  if (!pinHash) {
    // PIN 설정
    await renderPinSetup(screenEl, async (pin) => {
      const hash = await hashPin(pin, startedAt);
      await db.setProfile('pinHash', hash);
      await db.setProfile('pinAttempts', 0);
      await db.setProfile('pinLockedUntil', null);
      screenEl.innerHTML = '';
      await renderDashboardContent(screenEl);
      setupDashboardCloseHandler(screenEl, onClose);
    });
  } else if (Date.now() < lockedUntil) {
    // 잠금 상태
    const remainMs = lockedUntil - Date.now();
    const remainMin = Math.ceil(remainMs / 60000);
    const lockEl = document.createElement('div');
    lockEl.className = 'dashboard-section';
    lockEl.style.textAlign = 'center';
    lockEl.style.padding = '40px 20px';
    lockEl.innerHTML = `
      <h3 style="color: var(--red); margin-bottom: 20px;">PIN 입력 잠금</h3>
      <p style="font-family: 'Gowun Dodum', sans-serif; color: var(--color-text-dim);">
        ${remainMin}분 후에 다시 시도해주세요
      </p>
    `;
    screenEl.appendChild(lockEl);
  } else {
    // PIN 입력
    await renderPinEntry(screenEl, async () => {
      await db.setProfile('pinAttempts', 0);
      await db.setProfile('pinLockedUntil', null);
      screenEl.innerHTML = '';
      await renderDashboardContent(screenEl);
      setupDashboardCloseHandler(screenEl, onClose);
    }, async (attempt) => {
      attempts++;
      const prevAttempts = await db.getProfile('pinAttempts', 0);
      const newAttempts = prevAttempts + 1;
      await db.setProfile('pinAttempts', newAttempts);

      if (newAttempts >= CONFIG.PIN_MAX_ATTEMPTS) {
        const lockUntil = Date.now() + CONFIG.PIN_LOCKOUT_MIN * 60000;
        await db.setProfile('pinLockedUntil', lockUntil);
        screenEl.innerHTML = '';
        showPinFlowContent(screenEl, onClose);
      } else {
        const message = document.getElementById('pin-entry-message');
        setText(message, `오답 (${newAttempts}/${CONFIG.PIN_MAX_ATTEMPTS})`);
        setTimeout(() => setText(message, ''), 2000);
      }
    });
  }
}

function setupDashboardCloseHandler(screenEl, onClose) {
  const closeBtn = document.getElementById('dashboard-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      screenEl.innerHTML = '';
      if (onClose) {
        onClose();
      } else {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const splash = document.getElementById('screen-splash');
        if (splash) splash.classList.add('active');
      }
    });
  }
}

// ==================== 진입점 ====================
export async function openDashboard(opts = {}) {
  const screenEl = document.getElementById('screen-dashboard');
  if (!screenEl) {
    console.error('Dashboard screen element not found');
    return;
  }

  // 초기화 체크
  let startedAt = await db.getProfile('startedAt');
  if (!startedAt) {
    startedAt = new Date().toISOString();
    await db.setProfile('startedAt', startedAt);
  }

  // 화면 전환
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screenEl.classList.add('active');

  // PIN 흐름 시작
  await showPinFlowContent(screenEl, opts.onClose);
}
