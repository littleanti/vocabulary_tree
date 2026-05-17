// 누적 나무 오버뷰 — 학습한 모든 한자를 grid 레이아웃 + 카메라/미니맵.
// 단일 거대 SVG 안에 한자별 작은 sapling을 배치, 잎은 DOM으로 overlay.

import { CONFIG } from '../config.js';
import { getHanja } from '../../data/hanja.js';
import { WORDS } from '../../data/words.js';
import { listLearnedHanja, listLearnedWords } from '../db.js';
import { createCamera } from './camera.js';
import { createMinimap } from './minimap.js';

const SAPLING_CELL = 480;          // cell size in content coordinates
const COLS = 4;                    // 한 줄에 4 그루
const ROOT_R = 40;                 // root circle radius

function cellOrigin(idx) {
  const r = Math.floor(idx / COLS);
  const c = idx % COLS;
  return {
    cx: c * SAPLING_CELL + SAPLING_CELL / 2,
    cy: r * SAPLING_CELL + SAPLING_CELL / 2,
  };
}

function branchEnd(origin, slotIdx) {
  const angles = [-55, -22, 22, 55];
  const len = 150;
  const a = ((angles[slotIdx] || 0) - 90) * Math.PI / 180;
  return { x: origin.cx + Math.cos(a) * len, y: origin.cy - 80 + Math.sin(a) * len };
}

function trunkPath(origin) {
  return `M ${origin.cx} ${origin.cy + 50} Q ${origin.cx} ${origin.cy - 20} ${origin.cx} ${origin.cy - 80}`;
}

function branchPath(origin, slotIdx) {
  const start = { x: origin.cx, y: origin.cy - 80 };
  const end = branchEnd(origin, slotIdx);
  const angles = [-55, -22, 22, 55];
  const a = angles[slotIdx] || 0;
  const curl = a > 0 ? 12 : -12;
  return `M ${start.x} ${start.y} Q ${(start.x + end.x) / 2 + curl} ${(start.y + end.y) / 2} ${end.x} ${end.y}`;
}

export async function renderOverview(rootEl, { onLeafClick } = {}) {
  const learnedHanja = await listLearnedHanja();
  const learnedWords = await listLearnedWords();
  const wordIdsLearned = new Set(learnedWords.map(w => w.wordId));

  // 학습한 한자만 (없으면 placeholder로 첫 한자 1개 표시)
  let hanjaList = learnedHanja.map(r => getHanja(r.hanjaId)).filter(Boolean);
  const hasContent = hanjaList.length > 0;
  if (!hasContent) hanjaList = [getHanja(14) /* 水 */];

  const total = hanjaList.length;
  const rows = Math.max(1, Math.ceil(total / COLS));
  const contentWidth = COLS * SAPLING_CELL;
  const contentHeight = rows * SAPLING_CELL;

  // 누적 통계 → 성장 단계
  const cumulativeWords = learnedWords.length;
  const stage = stageFor(cumulativeWords);

  rootEl.innerHTML = `
    <div class="screen-header">
      <h2>🌳 어휘 세계수</h2>
      <button class="close-btn" id="ov-back">✕</button>
    </div>
    <div class="overview-meta">
      <span class="meta-chip">단계 <strong>${stageLabel(stage)}</strong></span>
      <span class="meta-chip">한자 <strong>${learnedHanja.length}</strong>자</span>
      <span class="meta-chip">어휘 <strong>${learnedWords.length}</strong>개</span>
    </div>
    <div class="tree-stage overview-stage" id="ov-stage">
      <svg id="ov-svg" class="tree-svg" preserveAspectRatio="xMidYMid meet"></svg>
      <div class="ov-leaves" id="ov-leaves"></div>
    </div>
    <div class="tree-message" id="ov-msg">두 손가락으로 확대/축소, 한 손가락으로 이동해요</div>
  `;

  const stageEl = rootEl.querySelector('#ov-stage');
  const svg = rootEl.querySelector('#ov-svg');
  const leavesContainer = rootEl.querySelector('#ov-leaves');

  // build SVG content into a <g>
  svg.setAttribute('viewBox', `0 0 ${contentWidth} ${contentHeight}`);

  // background sky/soil
  const ns = 'http://www.w3.org/2000/svg';
  const bg = document.createElementNS(ns, 'rect');
  bg.setAttribute('x', 0); bg.setAttribute('y', 0);
  bg.setAttribute('width', contentWidth); bg.setAttribute('height', contentHeight);
  bg.setAttribute('fill', 'transparent');
  svg.appendChild(bg);

  const g = document.createElementNS(ns, 'g');
  g.setAttribute('id', 'ov-g');
  svg.appendChild(g);

  hanjaList.forEach((h, idx) => {
    const origin = cellOrigin(idx);
    // ground patch
    const ground = document.createElementNS(ns, 'ellipse');
    ground.setAttribute('cx', origin.cx);
    ground.setAttribute('cy', origin.cy + 80);
    ground.setAttribute('rx', SAPLING_CELL * 0.35);
    ground.setAttribute('ry', 22);
    ground.setAttribute('fill', '#c2a574');
    ground.setAttribute('opacity', 0.6);
    g.appendChild(ground);

    // trunk
    const trunk = document.createElementNS(ns, 'path');
    trunk.setAttribute('d', trunkPath(origin));
    trunk.setAttribute('stroke', '#5e4a35');
    trunk.setAttribute('stroke-width', 14);
    trunk.setAttribute('stroke-linecap', 'round');
    trunk.setAttribute('fill', 'none');
    g.appendChild(trunk);

    // 4 branches — grown if word learned for this slot
    const wordsForH = WORDS.filter(w => w.hanjaId === h.id).slice(0, 4);
    const slotLearned = wordsForH.map(w => wordIdsLearned.has(w.id));
    for (let i = 0; i < 4; i++) {
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', branchPath(origin, i));
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      if (slotLearned[i]) {
        path.setAttribute('stroke', '#8b6e4e');
        path.setAttribute('stroke-width', 8);
      } else {
        path.setAttribute('stroke', 'rgba(139,110,78,0.25)');
        path.setAttribute('stroke-dasharray', '4 6');
        path.setAttribute('stroke-width', 5);
      }
      g.appendChild(path);
    }

    // root circle + hanja
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', origin.cx);
    circle.setAttribute('cy', origin.cy + 50);
    circle.setAttribute('r', ROOT_R);
    circle.setAttribute('fill', '#FF7757');
    circle.setAttribute('stroke', '#d45a40');
    circle.setAttribute('stroke-width', 3);
    g.appendChild(circle);

    const txt = document.createElementNS(ns, 'text');
    txt.setAttribute('x', origin.cx);
    txt.setAttribute('y', origin.cy + 63);
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('font-size', 38);
    txt.setAttribute('font-family', "'Noto Serif KR', serif");
    txt.setAttribute('font-weight', 700);
    txt.setAttribute('fill', 'white');
    txt.setAttribute('stroke', '#2D3047');
    txt.setAttribute('stroke-width', 1.2);
    txt.setAttribute('paint-order', 'stroke fill');
    txt.textContent = h.code;
    g.appendChild(txt);

    // hun/eum label
    const sub = document.createElementNS(ns, 'text');
    sub.setAttribute('x', origin.cx);
    sub.setAttribute('y', origin.cy + 130);
    sub.setAttribute('text-anchor', 'middle');
    sub.setAttribute('font-size', 18);
    sub.setAttribute('font-family', "'Jua', sans-serif");
    sub.setAttribute('fill', '#2D3047');
    sub.textContent = `${h.hun} ${h.eum}`;
    g.appendChild(sub);
  });

  // 카메라
  const camera = createCamera({
    stageEl,
    contentEl: g,
    contentWidth,
    contentHeight,
    onChange: (s) => {
      placeLeaves(s);
      minimap?.updateViewport(s);
    },
  });

  // 잎 (DOM overlay; SVG g 좌표 → 화면 좌표 변환)
  // 모든 학습 어휘에 대해 잎 위치 미리 계산 (content 좌표)
  const leafEntries = []; // { wordId, contentX, contentY, golden }
  hanjaList.forEach((h, idx) => {
    const origin = cellOrigin(idx);
    const wordsForH = WORDS.filter(w => w.hanjaId === h.id).slice(0, 4);
    wordsForH.forEach((w, slotIdx) => {
      if (!wordIdsLearned.has(w.id)) return;
      const end = branchEnd(origin, slotIdx);
      leafEntries.push({ word: w, contentX: end.x, contentY: end.y, golden: false });
    });
  });

  function placeLeaves(state) {
    // ensure DOM
    if (leavesContainer.childElementCount !== leafEntries.length) {
      leavesContainer.innerHTML = '';
      leafEntries.forEach(le => {
        const el = document.createElement('div');
        el.className = 'leaf' + (le.golden ? ' golden' : '');
        el.dataset.wordId = le.word.id;
        el.innerHTML = `<div class="leaf-shape"></div><div class="leaf-text"></div>`;
        el.querySelector('.leaf-text').textContent = le.word.text;
        el.addEventListener('click', (ev) => {
          ev.stopPropagation();
          onLeafClick?.(le.word);
        });
        leavesContainer.appendChild(el);
        requestAnimationFrame(() => el.classList.add('shown'));
      });
    }
    // position update
    const children = leavesContainer.children;
    leafEntries.forEach((le, i) => {
      const x = le.contentX * state.scale + state.tx;
      const y = le.contentY * state.scale + state.ty;
      const el = children[i];
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.transform = `translate(-50%, -50%) scale(${Math.min(1, Math.max(0.45, state.scale))})`;
      el.classList.add('shown');
    });
  }

  // Minimap with thumbnail
  const thumbnail = svg.innerHTML; // 현재 svg 내부 SVG 직렬화
  const minimap = createMinimap(stageEl, {
    contentSvgInnerHTML: thumbnail,
    contentWidth,
    contentHeight,
    stageEl,
    camera,
  });
  minimap.updateViewport(camera.getState());
  placeLeaves(camera.getState());

  rootEl.querySelector('#ov-back').addEventListener('click', () => {
    camera.detach();
    minimap.destroy();
    rootEl.dispatchEvent(new CustomEvent('ov-close'));
  });

  return {
    destroy: () => {
      camera.detach();
      minimap.destroy();
    },
    camera,
  };
}

export function stageFor(cumulativeWords) {
  const t = CONFIG.STAGE_THRESHOLD;
  if (cumulativeWords >= t.world) return 'world';
  if (cumulativeWords >= t.mature) return 'mature';
  if (cumulativeWords >= t.young) return 'young';
  return 'sapling';
}

export function stageLabel(stage) {
  return {
    sapling: '🌱 묘목',
    young:   '🌿 청년목',
    mature:  '🌳 거목',
    world:   '🌍 세계수',
  }[stage] || '🌱 묘목';
}
