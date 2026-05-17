// 한자 마스터 — 8급 50자
// 각 항목: id, code(유니코드), 훈(뜻), 음(소리), 급수, 부수, 획수, 학년 태그
// 학년 태그: '3' = 초3 권장, '4' = 초4 권장 (8급은 대부분 초3 진입)

export const HANJA = [
  // 숫자 1~10
  { id: 1,  code: '一', hun: '한',     eum: '일', level: 8, radical: '一', strokes: 1,  grade: '3' },
  { id: 2,  code: '二', hun: '두',     eum: '이', level: 8, radical: '二', strokes: 2,  grade: '3' },
  { id: 3,  code: '三', hun: '석',     eum: '삼', level: 8, radical: '一', strokes: 3,  grade: '3' },
  { id: 4,  code: '四', hun: '넉',     eum: '사', level: 8, radical: '囗', strokes: 5,  grade: '3' },
  { id: 5,  code: '五', hun: '다섯',   eum: '오', level: 8, radical: '二', strokes: 4,  grade: '3' },
  { id: 6,  code: '六', hun: '여섯',   eum: '륙', level: 8, radical: '八', strokes: 4,  grade: '3' },
  { id: 7,  code: '七', hun: '일곱',   eum: '칠', level: 8, radical: '一', strokes: 2,  grade: '3' },
  { id: 8,  code: '八', hun: '여덟',   eum: '팔', level: 8, radical: '八', strokes: 2,  grade: '3' },
  { id: 9,  code: '九', hun: '아홉',   eum: '구', level: 8, radical: '乙', strokes: 2,  grade: '3' },
  { id: 10, code: '十', hun: '열',     eum: '십', level: 8, radical: '十', strokes: 2,  grade: '3' },

  // 자연 / 요일
  { id: 11, code: '日', hun: '날',     eum: '일', level: 8, radical: '日', strokes: 4,  grade: '3' },
  { id: 12, code: '月', hun: '달',     eum: '월', level: 8, radical: '月', strokes: 4,  grade: '3' },
  { id: 13, code: '火', hun: '불',     eum: '화', level: 8, radical: '火', strokes: 4,  grade: '3' },
  { id: 14, code: '水', hun: '물',     eum: '수', level: 8, radical: '水', strokes: 4,  grade: '3' },
  { id: 15, code: '木', hun: '나무',   eum: '목', level: 8, radical: '木', strokes: 4,  grade: '3' },
  { id: 16, code: '金', hun: '쇠',     eum: '금', level: 8, radical: '金', strokes: 8,  grade: '3' },
  { id: 17, code: '土', hun: '흙',     eum: '토', level: 8, radical: '土', strokes: 3,  grade: '3' },
  { id: 18, code: '山', hun: '메',     eum: '산', level: 8, radical: '山', strokes: 3,  grade: '3' },

  // 위치 / 크기
  { id: 19, code: '中', hun: '가운데', eum: '중', level: 8, radical: '丨', strokes: 4,  grade: '3' },
  { id: 20, code: '大', hun: '큰',     eum: '대', level: 8, radical: '大', strokes: 3,  grade: '3' },
  { id: 21, code: '小', hun: '작을',   eum: '소', level: 8, radical: '小', strokes: 3,  grade: '3' },
  { id: 22, code: '上', hun: '윗',     eum: '상', level: 8, radical: '一', strokes: 3,  grade: '3' },
  { id: 23, code: '下', hun: '아래',   eum: '하', level: 8, radical: '一', strokes: 3,  grade: '3' },

  // 방향
  { id: 24, code: '東', hun: '동녘',   eum: '동', level: 8, radical: '木', strokes: 8,  grade: '3' },
  { id: 25, code: '西', hun: '서녘',   eum: '서', level: 8, radical: '襾', strokes: 6,  grade: '3' },
  { id: 26, code: '南', hun: '남녘',   eum: '남', level: 8, radical: '十', strokes: 9,  grade: '3' },
  { id: 27, code: '北', hun: '북녘',   eum: '북', level: 8, radical: '匕', strokes: 5,  grade: '3' },

  // 가족
  { id: 28, code: '父', hun: '아비',   eum: '부', level: 8, radical: '父', strokes: 4,  grade: '3' },
  { id: 29, code: '母', hun: '어미',   eum: '모', level: 8, radical: '毋', strokes: 5,  grade: '3' },
  { id: 30, code: '兄', hun: '맏',     eum: '형', level: 8, radical: '儿', strokes: 5,  grade: '3' },
  { id: 31, code: '弟', hun: '아우',   eum: '제', level: 8, radical: '弓', strokes: 7,  grade: '3' },

  // 사람
  { id: 32, code: '人', hun: '사람',   eum: '인', level: 8, radical: '人', strokes: 2,  grade: '3' },
  { id: 33, code: '女', hun: '여자',   eum: '녀', level: 8, radical: '女', strokes: 3,  grade: '3' },
  { id: 34, code: '子', hun: '아들',   eum: '자', level: 8, radical: '子', strokes: 3,  grade: '3' },
  { id: 35, code: '寸', hun: '마디',   eum: '촌', level: 8, radical: '寸', strokes: 3,  grade: '4' },

  // 학교 / 시간
  { id: 36, code: '學', hun: '배울',   eum: '학', level: 8, radical: '子', strokes: 16, grade: '3' },
  { id: 37, code: '校', hun: '학교',   eum: '교', level: 8, radical: '木', strokes: 10, grade: '3' },
  { id: 38, code: '敎', hun: '가르칠', eum: '교', level: 8, radical: '攴', strokes: 11, grade: '3' },
  { id: 39, code: '室', hun: '집',     eum: '실', level: 8, radical: '宀', strokes: 9,  grade: '3' },
  { id: 40, code: '生', hun: '날',     eum: '생', level: 8, radical: '生', strokes: 5,  grade: '3' },
  { id: 41, code: '年', hun: '해',     eum: '년', level: 8, radical: '干', strokes: 6,  grade: '3' },
  { id: 42, code: '先', hun: '먼저',   eum: '선', level: 8, radical: '儿', strokes: 6,  grade: '3' },

  // 나라
  { id: 43, code: '韓', hun: '한국',   eum: '한', level: 8, radical: '韋', strokes: 17, grade: '3' },
  { id: 44, code: '國', hun: '나라',   eum: '국', level: 8, radical: '囗', strokes: 11, grade: '3' },
  { id: 45, code: '民', hun: '백성',   eum: '민', level: 8, radical: '氏', strokes: 5,  grade: '4' },
  { id: 46, code: '軍', hun: '군사',   eum: '군', level: 8, radical: '車', strokes: 9,  grade: '4' },
  { id: 47, code: '王', hun: '임금',   eum: '왕', level: 8, radical: '玉', strokes: 4,  grade: '3' },

  // 기타
  { id: 48, code: '門', hun: '문',     eum: '문', level: 8, radical: '門', strokes: 8,  grade: '3' },
  { id: 49, code: '長', hun: '긴',     eum: '장', level: 8, radical: '長', strokes: 8,  grade: '4' },
  { id: 50, code: '白', hun: '흰',     eum: '백', level: 8, radical: '白', strokes: 5,  grade: '3' },
];

// 빠른 lookup
export const HANJA_BY_ID = new Map(HANJA.map(h => [h.id, h]));
export const HANJA_BY_CODE = new Map(HANJA.map(h => [h.code, h]));

export function getHanja(idOrCode) {
  if (typeof idOrCode === 'number') return HANJA_BY_ID.get(idOrCode);
  return HANJA_BY_CODE.get(idOrCode);
}
