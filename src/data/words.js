// 한자별 파생 어휘 데이터
// 각 항목: hanjaId, text(어휘), syllables(분해 음절), meaning(아이 친화 의미), example(예문), grade(학년 태그)
// 의미는 항상 이미 아는 어휘로 재구성 ('약수'는 '약처럼 몸에 좋은 물'처럼).
// 음절(syllables)은 음절 블록 매칭에 사용되며, 한자 음 위치를 포함한 전체 음절 배열.

export const WORDS = [
  // 一 (한 일) — id 1
  { id: 101, hanjaId: 1, text: '일등', syllables: ['일','등'], meaning: '맨 처음 자리. 가장 잘함.', example: '달리기에서 일등을 했어요.', grade: '3' },
  { id: 102, hanjaId: 1, text: '일일',   syllables: ['일','일'], meaning: '하루. 한 날.',         example: '일일 학습으로 꾸준히 배워요.', grade: '3' },
  { id: 103, hanjaId: 1, text: '제일', syllables: ['제','일'], meaning: '가장. 으뜸.',           example: '내가 제일 좋아하는 음식.',   grade: '3' },
  { id: 104, hanjaId: 1, text: '일생', syllables: ['일','생'], meaning: '한평생. 태어나서 죽을 때까지.', example: '할머니의 일생 이야기.', grade: '4' },

  // 二 (두 이) — id 2
  { id: 201, hanjaId: 2, text: '이층', syllables: ['이','층'], meaning: '두 번째 층.',           example: '우리 집은 이층이에요.',     grade: '3' },
  { id: 202, hanjaId: 2, text: '이등', syllables: ['이','등'], meaning: '두 번째 자리.',         example: '시합에서 이등을 했어요.',   grade: '3' },
  { id: 203, hanjaId: 2, text: '이중', syllables: ['이','중'], meaning: '두 겹. 두 번 겹침.',    example: '이중 창문이 따뜻해요.',     grade: '4' },
  { id: 204, hanjaId: 2, text: '이월', syllables: ['이','월'], meaning: '한 해의 두 번째 달.',   example: '이월에는 졸업식이 있어요.', grade: '3' },

  // 三 (석 삼) — id 3
  { id: 301, hanjaId: 3, text: '삼각', syllables: ['삼','각'], meaning: '세 개의 뿔(모서리).',   example: '삼각 김밥이 맛있어요.',     grade: '3' },
  { id: 302, hanjaId: 3, text: '삼촌', syllables: ['삼','촌'], meaning: '아빠의 형제.',          example: '삼촌이 선물을 줬어요.',     grade: '3' },
  { id: 303, hanjaId: 3, text: '삼월', syllables: ['삼','월'], meaning: '한 해의 세 번째 달.',   example: '삼월에 새 학기가 시작돼요.', grade: '3' },
  { id: 304, hanjaId: 3, text: '삼면', syllables: ['삼','면'], meaning: '세 면. 세 쪽.',         example: '삼면이 바다인 나라.',       grade: '4' },

  // 四 (넉 사) — id 4
  { id: 401, hanjaId: 4, text: '사각', syllables: ['사','각'], meaning: '네 개의 모서리.',       example: '사각 상자에 담아요.',       grade: '3' },
  { id: 402, hanjaId: 4, text: '사월', syllables: ['사','월'], meaning: '한 해의 네 번째 달.',   example: '사월에 벚꽃이 펴요.',       grade: '3' },
  { id: 403, hanjaId: 4, text: '사방', syllables: ['사','방'], meaning: '동·서·남·북 네 방향.',  example: '사방에 친구들이 있어요.',   grade: '4' },
  { id: 404, hanjaId: 4, text: '사촌', syllables: ['사','촌'], meaning: '큰아빠·작은아빠의 자녀.', example: '사촌 형이 놀러 왔어요.',   grade: '3' },

  // 五 (다섯 오) — id 5
  { id: 501, hanjaId: 5, text: '오월', syllables: ['오','월'], meaning: '한 해의 다섯 번째 달.', example: '오월은 가정의 달이에요.',   grade: '3' },
  { id: 502, hanjaId: 5, text: '오일', syllables: ['오','일'], meaning: '닷새. 5일.',            example: '오일 동안 여행을 갔어요.',  grade: '4' },
  { id: 503, hanjaId: 5, text: '오층', syllables: ['오','층'], meaning: '다섯 번째 층.',         example: '아파트 오층에 살아요.',     grade: '3' },
  { id: 504, hanjaId: 5, text: '오대', syllables: ['오','대'], meaning: '다섯 세대. 다섯 가지.', example: '세계 오대 양 중 하나.',     grade: '4' },

  // 六 (여섯 륙) — id 6
  { id: 601, hanjaId: 6, text: '육각', syllables: ['육','각'], meaning: '여섯 개의 모서리.',     example: '벌집은 육각 모양이에요.',   grade: '4' },
  { id: 602, hanjaId: 6, text: '유월', syllables: ['유','월'], meaning: '한 해의 여섯 번째 달.', example: '유월에는 더위가 시작돼요.', grade: '3' },
  { id: 603, hanjaId: 6, text: '육일', syllables: ['육','일'], meaning: '여섯 날.',              example: '육일째 캠프가 끝났어요.',   grade: '4' },
  { id: 604, hanjaId: 6, text: '육학년', syllables: ['육','학','년'], meaning: '초등학교 마지막 학년.', example: '내년이면 육학년이에요.',   grade: '4' },

  // 七 (일곱 칠) — id 7
  { id: 701, hanjaId: 7, text: '칠월', syllables: ['칠','월'], meaning: '한 해의 일곱 번째 달.', example: '칠월에는 방학을 해요.',     grade: '3' },
  { id: 702, hanjaId: 7, text: '칠일', syllables: ['칠','일'], meaning: '이레. 7일.',            example: '칠일 동안 푹 쉬었어요.',    grade: '3' },
  { id: 703, hanjaId: 7, text: '칠층', syllables: ['칠','층'], meaning: '일곱 번째 층.',         example: '병원이 칠층에 있어요.',     grade: '4' },
  { id: 704, hanjaId: 7, text: '칠석', syllables: ['칠','석'], meaning: '음력 7월 7일 명절.',    example: '칠석에 견우와 직녀가 만나요.', grade: '4' },

  // 八 (여덟 팔) — id 8
  { id: 801, hanjaId: 8, text: '팔월', syllables: ['팔','월'], meaning: '한 해의 여덟 번째 달.', example: '팔월에 해수욕장에 갔어요.', grade: '3' },
  { id: 802, hanjaId: 8, text: '팔각', syllables: ['팔','각'], meaning: '여덟 개의 모서리.',     example: '팔각 시계가 멋져요.',       grade: '4' },
  { id: 803, hanjaId: 8, text: '팔등신', syllables: ['팔','등','신'], meaning: '몸이 머리의 8배인 균형 좋은 몸.', example: '팔등신 인형 같아요.', grade: '4' },
  { id: 804, hanjaId: 8, text: '팔십', syllables: ['팔','십'], meaning: '80. 여든.',             example: '할아버지는 팔십 세이세요.', grade: '3' },

  // 九 (아홉 구) — id 9
  { id: 901, hanjaId: 9, text: '구월', syllables: ['구','월'], meaning: '한 해의 아홉 번째 달.', example: '구월부터 가을이 시작돼요.', grade: '3' },
  { id: 902, hanjaId: 9, text: '구구단', syllables: ['구','구','단'], meaning: '곱하기 표.',     example: '구구단을 다 외웠어요.',     grade: '3' },
  { id: 903, hanjaId: 9, text: '구일', syllables: ['구','일'], meaning: '아홉 날.',              example: '구일째 책을 읽고 있어요.',  grade: '4' },
  { id: 904, hanjaId: 9, text: '십구', syllables: ['십','구'], meaning: '19. 열아홉.',           example: '내 자리 번호는 십구번.',    grade: '3' },

  // 十 (열 십) — id 10
  { id: 1001, hanjaId: 10, text: '시월', syllables: ['시','월'], meaning: '한 해의 열 번째 달.', example: '시월에는 단풍이 들어요.', grade: '3' },
  { id: 1002, hanjaId: 10, text: '십자', syllables: ['십','자'], meaning: '열 십 자 모양.',       example: '십자 모양 도로.',           grade: '4' },
  { id: 1003, hanjaId: 10, text: '십대', syllables: ['십','대'], meaning: '10~19살 청소년.',      example: '언니는 십대예요.',          grade: '4' },
  { id: 1004, hanjaId: 10, text: '수십', syllables: ['수','십'], meaning: '여러 십. 많은 수.',    example: '수십 마리 새가 날아요.',    grade: '4' },

  // 日 (날 일) — id 11
  { id: 1101, hanjaId: 11, text: '일기', syllables: ['일','기'], meaning: '하루를 적은 글.',     example: '오늘 일기를 썼어요.',       grade: '3' },
  { id: 1102, hanjaId: 11, text: '생일', syllables: ['생','일'], meaning: '태어난 날.',          example: '내 생일은 사월이에요.',     grade: '3' },
  { id: 1103, hanjaId: 11, text: '일출', syllables: ['일','출'], meaning: '해가 뜨는 것.',       example: '바다에서 일출을 봤어요.',   grade: '4' },
  { id: 1104, hanjaId: 11, text: '평일', syllables: ['평','일'], meaning: '주말이 아닌 보통 날.', example: '평일에는 학교에 가요.',     grade: '4' },

  // 月 (달 월) — id 12
  { id: 1201, hanjaId: 12, text: '월요일', syllables: ['월','요','일'], meaning: '한 주의 첫 평일.', example: '월요일 아침은 분주해요.', grade: '3' },
  { id: 1202, hanjaId: 12, text: '월말',   syllables: ['월','말'],     meaning: '한 달의 끝.',     example: '월말 시험을 봐요.',         grade: '4' },
  { id: 1203, hanjaId: 12, text: '월급',   syllables: ['월','급'],     meaning: '한 달마다 받는 돈.', example: '아빠가 월급을 받으셨어요.', grade: '4' },
  { id: 1204, hanjaId: 12, text: '매월',   syllables: ['매','월'],     meaning: '달마다.',          example: '매월 책 한 권을 읽어요.',  grade: '4' },

  // 火 (불 화) — id 13
  { id: 1301, hanjaId: 13, text: '화재', syllables: ['화','재'], meaning: '불로 생긴 사고.',     example: '화재 대피 훈련을 해요.',    grade: '4' },
  { id: 1302, hanjaId: 13, text: '화산', syllables: ['화','산'], meaning: '불을 내뿜는 산.',     example: '화산이 폭발했어요.',        grade: '3' },
  { id: 1303, hanjaId: 13, text: '화요일', syllables: ['화','요','일'], meaning: '한 주의 두 번째 날.', example: '화요일에 체육이 있어요.', grade: '3' },
  { id: 1304, hanjaId: 13, text: '소화기', syllables: ['소','화','기'], meaning: '불을 끄는 도구.', example: '교실에 소화기가 있어요.',   grade: '4' },

  // 水 (물 수) — id 14
  { id: 1401, hanjaId: 14, text: '수영', syllables: ['수','영'], meaning: '물에서 헤엄치기.',     example: '여름에 수영을 배워요.',     grade: '3' },
  { id: 1402, hanjaId: 14, text: '생수', syllables: ['생','수'], meaning: '맑은 마실 물.',        example: '생수 한 병을 사 마셨어요.', grade: '3' },
  { id: 1403, hanjaId: 14, text: '약수', syllables: ['약','수'], meaning: '약처럼 몸에 좋은 물.', example: '산에서 약수를 마셨어요.',   grade: '4' },
  { id: 1404, hanjaId: 14, text: '수돗물', syllables: ['수','돗','물'], meaning: '수도에서 나오는 물.', example: '수돗물로 손을 씻어요.',   grade: '3' },

  // 木 (나무 목) — id 15
  { id: 1501, hanjaId: 15, text: '목수', syllables: ['목','수'], meaning: '나무로 집·가구를 만드는 사람.', example: '목수가 책상을 만들어요.', grade: '4' },
  { id: 1502, hanjaId: 15, text: '목요일', syllables: ['목','요','일'], meaning: '한 주의 네 번째 날.', example: '목요일은 도서관 가는 날.', grade: '3' },
  { id: 1503, hanjaId: 15, text: '식목일', syllables: ['식','목','일'], meaning: '나무를 심는 날.', example: '식목일에 나무를 심었어요.', grade: '3' },
  { id: 1504, hanjaId: 15, text: '목재', syllables: ['목','재'], meaning: '나무로 만든 재료.',     example: '목재로 만든 의자.',         grade: '4' },

  // 金 (쇠 금) — id 16
  { id: 1601, hanjaId: 16, text: '금요일', syllables: ['금','요','일'], meaning: '한 주의 다섯 번째 날.', example: '금요일은 신나는 날.',   grade: '3' },
  { id: 1602, hanjaId: 16, text: '금메달', syllables: ['금','메','달'], meaning: '1등에게 주는 금빛 상.', example: '올림픽 금메달을 땄어요.', grade: '3' },
  { id: 1603, hanjaId: 16, text: '저금', syllables: ['저','금'], meaning: '돈을 모아 둠.',         example: '용돈을 저금했어요.',        grade: '4' },
  { id: 1604, hanjaId: 16, text: '황금', syllables: ['황','금'], meaning: '누런 빛의 비싼 쇠.',    example: '황금 보석이 반짝여요.',     grade: '4' },

  // 土 (흙 토) — id 17
  { id: 1701, hanjaId: 17, text: '토요일', syllables: ['토','요','일'], meaning: '한 주의 여섯 번째 날.', example: '토요일에 가족 나들이.',  grade: '3' },
  { id: 1702, hanjaId: 17, text: '국토', syllables: ['국','토'], meaning: '나라의 땅.',           example: '우리나라 국토는 넓어요.',   grade: '4' },
  { id: 1703, hanjaId: 17, text: '영토', syllables: ['영','토'], meaning: '한 나라가 다스리는 땅.', example: '독도는 우리 영토예요.',    grade: '4' },
  { id: 1704, hanjaId: 17, text: '황토', syllables: ['황','토'], meaning: '누런 빛깔의 흙.',       example: '황토집은 시원해요.',        grade: '4' },

  // 山 (메 산) — id 18
  { id: 1801, hanjaId: 18, text: '등산', syllables: ['등','산'], meaning: '산에 오르기.',         example: '주말마다 등산을 해요.',     grade: '3' },
  { id: 1802, hanjaId: 18, text: '산림', syllables: ['산','림'], meaning: '산과 숲.',             example: '산림 보호가 중요해요.',     grade: '4' },
  { id: 1803, hanjaId: 18, text: '산악', syllables: ['산','악'], meaning: '높은 산들.',           example: '산악 자전거를 타요.',       grade: '4' },
  { id: 1804, hanjaId: 18, text: '강산', syllables: ['강','산'], meaning: '강과 산. 자연.',       example: '아름다운 우리 강산.',       grade: '4' },

  // 中 (가운데 중) — id 19
  { id: 1901, hanjaId: 19, text: '중심', syllables: ['중','심'], meaning: '한가운데. 가장 중요한 곳.', example: '도시 중심에 광장이 있어요.', grade: '3' },
  { id: 1902, hanjaId: 19, text: '집중', syllables: ['집','중'], meaning: '한 곳에 마음을 모음.', example: '공부에 집중해요.',          grade: '4' },
  { id: 1903, hanjaId: 19, text: '중간', syllables: ['중','간'], meaning: '가운데.',              example: '중간 자리에 앉았어요.',     grade: '3' },
  { id: 1904, hanjaId: 19, text: '적중', syllables: ['적','중'], meaning: '정확히 맞힘.',         example: '예상이 적중했어요.',        grade: '4' },

  // 大 (큰 대) — id 20
  { id: 2001, hanjaId: 20, text: '대문', syllables: ['대','문'], meaning: '집의 큰 문.',          example: '대문이 활짝 열렸어요.',     grade: '3' },
  { id: 2002, hanjaId: 20, text: '대왕', syllables: ['대','왕'], meaning: '훌륭한 임금.',         example: '세종 대왕이 한글을 만드셨어요.', grade: '3' },
  { id: 2003, hanjaId: 20, text: '대학', syllables: ['대','학'], meaning: '고등 학교의 다음 학교.', example: '언니가 대학에 가요.',      grade: '3' },
  { id: 2004, hanjaId: 20, text: '확대', syllables: ['확','대'], meaning: '크게 늘림.',           example: '글자를 확대해서 봤어요.',   grade: '4' },

  // 小 (작을 소) — id 21
  { id: 2101, hanjaId: 21, text: '소년', syllables: ['소','년'], meaning: '작은 사내아이.',       example: '동네 소년이 인사했어요.',   grade: '3' },
  { id: 2102, hanjaId: 21, text: '소녀', syllables: ['소','녀'], meaning: '작은 여자아이.',       example: '책 속 소녀가 용감해요.',    grade: '3' },
  { id: 2103, hanjaId: 21, text: '축소', syllables: ['축','소'], meaning: '작게 줄임.',           example: '지도를 축소해서 인쇄했어요.', grade: '4' },
  { id: 2104, hanjaId: 21, text: '소국', syllables: ['소','국'], meaning: '작은 나라.',           example: '바다 위의 소국.',           grade: '4' },

  // 上 (윗 상) — id 22
  { id: 2201, hanjaId: 22, text: '상승', syllables: ['상','승'], meaning: '위로 올라감.',         example: '온도가 상승했어요.',        grade: '4' },
  { id: 2202, hanjaId: 22, text: '지상', syllables: ['지','상'], meaning: '땅 위.',               example: '지상에 별이 빛나요.',       grade: '4' },
  { id: 2203, hanjaId: 22, text: '옥상', syllables: ['옥','상'], meaning: '건물 맨 윗층.',         example: '옥상에서 별을 봤어요.',     grade: '3' },
  { id: 2204, hanjaId: 22, text: '상의', syllables: ['상','의'], meaning: '윗옷.',                example: '상의를 단정히 입어요.',     grade: '4' },

  // 下 (아래 하) — id 23
  { id: 2301, hanjaId: 23, text: '하루', syllables: ['하','루'], meaning: '한 날.',               example: '하루 종일 비가 왔어요.',    grade: '3' },
  { id: 2302, hanjaId: 23, text: '하차', syllables: ['하','차'], meaning: '차에서 내림.',         example: '다음 역에서 하차해요.',     grade: '4' },
  { id: 2303, hanjaId: 23, text: '지하', syllables: ['지','하'], meaning: '땅 아래.',             example: '지하 주차장에 가요.',       grade: '3' },
  { id: 2304, hanjaId: 23, text: '하강', syllables: ['하','강'], meaning: '아래로 내려옴.',       example: '낙하산이 천천히 하강했어요.', grade: '4' },

  // 東 (동녘 동) — id 24
  { id: 2401, hanjaId: 24, text: '동쪽', syllables: ['동','쪽'], meaning: '해가 뜨는 방향.',      example: '동쪽 하늘이 밝아져요.',     grade: '3' },
  { id: 2402, hanjaId: 24, text: '동해', syllables: ['동','해'], meaning: '동쪽 바다.',           example: '동해에 일출을 보러 갔어요.', grade: '3' },
  { id: 2403, hanjaId: 24, text: '동문', syllables: ['동','문'], meaning: '동쪽 문.',             example: '학교 동문 앞에서 만나요.',   grade: '4' },
  { id: 2404, hanjaId: 24, text: '극동', syllables: ['극','동'], meaning: '아주 동쪽 끝.',         example: '극동 지역의 나라.',         grade: '4' },

  // 西 (서녘 서) — id 25
  { id: 2501, hanjaId: 25, text: '서쪽', syllables: ['서','쪽'], meaning: '해가 지는 방향.',      example: '서쪽 하늘이 붉어요.',       grade: '3' },
  { id: 2502, hanjaId: 25, text: '서해', syllables: ['서','해'], meaning: '서쪽 바다.',           example: '서해는 물이 얕아요.',       grade: '3' },
  { id: 2503, hanjaId: 25, text: '서양', syllables: ['서','양'], meaning: '유럽과 미국 쪽.',       example: '서양 음악을 들었어요.',     grade: '4' },
  { id: 2504, hanjaId: 25, text: '서부', syllables: ['서','부'], meaning: '서쪽 지역.',           example: '미국 서부 여행.',           grade: '4' },

  // 南 (남녘 남) — id 26
  { id: 2601, hanjaId: 26, text: '남쪽', syllables: ['남','쪽'], meaning: '따뜻한 방향.',         example: '남쪽으로 여행을 가요.',     grade: '3' },
  { id: 2602, hanjaId: 26, text: '남해', syllables: ['남','해'], meaning: '남쪽 바다.',           example: '남해에 섬이 많아요.',       grade: '3' },
  { id: 2603, hanjaId: 26, text: '남극', syllables: ['남','극'], meaning: '지구의 가장 남쪽.',     example: '남극에는 펭귄이 살아요.',   grade: '3' },
  { id: 2604, hanjaId: 26, text: '남산', syllables: ['남','산'], meaning: '서울의 남쪽 산.',       example: '남산 타워에 올랐어요.',     grade: '3' },

  // 北 (북녘 북) — id 27
  { id: 2701, hanjaId: 27, text: '북쪽', syllables: ['북','쪽'], meaning: '추운 방향.',           example: '북쪽 바람이 차가워요.',     grade: '3' },
  { id: 2702, hanjaId: 27, text: '북극', syllables: ['북','극'], meaning: '지구의 가장 북쪽.',     example: '북극곰이 살아요.',          grade: '3' },
  { id: 2703, hanjaId: 27, text: '북한', syllables: ['북','한'], meaning: '한반도 북쪽 나라.',     example: '북한산이 보여요.',          grade: '4' },
  { id: 2704, hanjaId: 27, text: '동북', syllables: ['동','북'], meaning: '동쪽과 북쪽 사이.',     example: '동북 지방은 추워요.',       grade: '4' },

  // 父 (아비 부) — id 28
  { id: 2801, hanjaId: 28, text: '부모', syllables: ['부','모'], meaning: '아버지와 어머니.',      example: '부모님 말씀을 잘 들어요.',  grade: '3' },
  { id: 2802, hanjaId: 28, text: '조부', syllables: ['조','부'], meaning: '할아버지.',            example: '조부님 댁에 갔어요.',       grade: '4' },
  { id: 2803, hanjaId: 28, text: '학부모', syllables: ['학','부','모'], meaning: '학생의 부모.', example: '학부모 회의가 있어요.',     grade: '4' },
  { id: 2804, hanjaId: 28, text: '부친', syllables: ['부','친'], meaning: '아버지를 높여 부르는 말.', example: '부친께서 오셨어요.',    grade: '4' },

  // 母 (어미 모) — id 29
  { id: 2901, hanjaId: 29, text: '모친', syllables: ['모','친'], meaning: '어머니를 높여 부르는 말.', example: '모친께 인사 드렸어요.', grade: '4' },
  { id: 2902, hanjaId: 29, text: '모국', syllables: ['모','국'], meaning: '내가 태어난 나라.',     example: '모국으로 돌아왔어요.',      grade: '4' },
  { id: 2903, hanjaId: 29, text: '이모', syllables: ['이','모'], meaning: '엄마의 자매.',         example: '이모가 케이크를 사오셨어요.', grade: '3' },
  { id: 2904, hanjaId: 29, text: '모교', syllables: ['모','교'], meaning: '내가 졸업한 학교.',     example: '아빠 모교를 방문했어요.',   grade: '4' },

  // 兄 (맏 형) — id 30
  { id: 3001, hanjaId: 30, text: '형제', syllables: ['형','제'], meaning: '형과 동생.',           example: '우리는 사이좋은 형제예요.', grade: '3' },
  { id: 3002, hanjaId: 30, text: '형님', syllables: ['형','님'], meaning: '형을 높여 부르는 말.',   example: '형님이 도와주셨어요.',      grade: '3' },
  { id: 3003, hanjaId: 30, text: '의형제', syllables: ['의','형','제'], meaning: '의리로 맺은 형제.', example: '두 사람은 의형제예요.',    grade: '4' },
  { id: 3004, hanjaId: 30, text: '학형', syllables: ['학','형'], meaning: '같이 배우는 선배.',     example: '학형의 조언을 들었어요.',   grade: '4' },

  // 弟 (아우 제) — id 31
  { id: 3101, hanjaId: 31, text: '제자', syllables: ['제','자'], meaning: '스승에게 배우는 사람.', example: '훌륭한 제자가 되었어요.',   grade: '3' },
  { id: 3102, hanjaId: 31, text: '사제', syllables: ['사','제'], meaning: '스승과 제자.',         example: '사제 간의 정이 깊어요.',    grade: '4' },
  { id: 3103, hanjaId: 31, text: '제수', syllables: ['제','수'], meaning: '동생의 아내.',          example: '제수씨가 인사했어요.',      grade: '4' },
  { id: 3104, hanjaId: 31, text: '자제', syllables: ['자','제'], meaning: '남의 아들을 높여 부르는 말.', example: '댁의 자제가 똑똑해요.',  grade: '4' },

  // 人 (사람 인) — id 32
  { id: 3201, hanjaId: 32, text: '인기', syllables: ['인','기'], meaning: '많은 사람의 사랑.',     example: '이 노래가 인기가 많아요.',  grade: '3' },
  { id: 3202, hanjaId: 32, text: '주인', syllables: ['주','인'], meaning: '물건을 가진 사람.',     example: '강아지 주인을 찾아 주세요.', grade: '3' },
  { id: 3203, hanjaId: 32, text: '인형', syllables: ['인','형'], meaning: '사람 모양 장난감.',     example: '인형을 안고 잠들었어요.',   grade: '3' },
  { id: 3204, hanjaId: 32, text: '시인', syllables: ['시','인'], meaning: '시를 짓는 사람.',       example: '유명한 시인의 시집.',       grade: '4' },

  // 女 (여자 녀) — id 33
  { id: 3301, hanjaId: 33, text: '여자', syllables: ['여','자'], meaning: '여성.',                example: '여자 친구와 놀았어요.',     grade: '3' },
  { id: 3302, hanjaId: 33, text: '여왕', syllables: ['여','왕'], meaning: '여자 임금.',           example: '여왕이 다스리는 나라.',     grade: '3' },
  { id: 3303, hanjaId: 33, text: '여학생', syllables: ['여','학','생'], meaning: '여자 학생.',   example: '여학생들이 줄을 섰어요.',   grade: '3' },
  { id: 3304, hanjaId: 33, text: '소녀', syllables: ['소','녀'], meaning: '어린 여자아이.',       example: '책 속 소녀가 멋져요.',      grade: '3' },

  // 子 (아들 자) — id 34
  { id: 3401, hanjaId: 34, text: '자녀', syllables: ['자','녀'], meaning: '아들과 딸.',           example: '자녀 사랑이 깊어요.',       grade: '4' },
  { id: 3402, hanjaId: 34, text: '제자', syllables: ['제','자'], meaning: '배우는 사람.',         example: '훌륭한 제자가 됐어요.',     grade: '3' },
  { id: 3403, hanjaId: 34, text: '왕자', syllables: ['왕','자'], meaning: '임금의 아들.',         example: '왕자가 공주를 만났어요.',   grade: '3' },
  { id: 3404, hanjaId: 34, text: '자손', syllables: ['자','손'], meaning: '자식과 손자.',         example: '자손이 번창했어요.',        grade: '4' },

  // 寸 (마디 촌) — id 35
  { id: 3501, hanjaId: 35, text: '삼촌', syllables: ['삼','촌'], meaning: '아빠의 형제.',         example: '삼촌이 놀러 오셨어요.',     grade: '3' },
  { id: 3502, hanjaId: 35, text: '사촌', syllables: ['사','촌'], meaning: '큰아빠·작은아빠의 자녀.', example: '사촌과 게임을 했어요.',  grade: '3' },
  { id: 3503, hanjaId: 35, text: '촌수', syllables: ['촌','수'], meaning: '친척 사이 거리 단위.',  example: '촌수가 가까워요.',          grade: '4' },
  { id: 3504, hanjaId: 35, text: '외삼촌', syllables: ['외','삼','촌'], meaning: '엄마의 남자 형제.', example: '외삼촌이 선물을 주셨어요.', grade: '3' },

  // 學 (배울 학) — id 36
  { id: 3601, hanjaId: 36, text: '학생', syllables: ['학','생'], meaning: '배우는 사람.',         example: '저는 초등학생이에요.',      grade: '3' },
  { id: 3602, hanjaId: 36, text: '학교', syllables: ['학','교'], meaning: '배우는 곳.',           example: '학교가 즐거워요.',          grade: '3' },
  { id: 3603, hanjaId: 36, text: '학년', syllables: ['학','년'], meaning: '학교의 1년 단위.',     example: '저는 삼학년이에요.',        grade: '3' },
  { id: 3604, hanjaId: 36, text: '과학', syllables: ['과','학'], meaning: '자연을 배우는 학문.',   example: '과학 실험이 재밌어요.',     grade: '3' },

  // 校 (학교 교) — id 37
  { id: 3701, hanjaId: 37, text: '학교', syllables: ['학','교'], meaning: '배우는 곳.',           example: '학교에 일찍 갔어요.',       grade: '3' },
  { id: 3702, hanjaId: 37, text: '교문', syllables: ['교','문'], meaning: '학교의 문.',           example: '교문 앞에서 만나요.',       grade: '3' },
  { id: 3703, hanjaId: 37, text: '교장', syllables: ['교','장'], meaning: '학교에서 가장 어른인 분.', example: '교장 선생님 말씀.',     grade: '3' },
  { id: 3704, hanjaId: 37, text: '하교', syllables: ['하','교'], meaning: '학교를 마치고 나옴.',   example: '하교 시간이 됐어요.',       grade: '3' },

  // 敎 (가르칠 교) — id 38
  { id: 3801, hanjaId: 38, text: '교실', syllables: ['교','실'], meaning: '배우는 방.',           example: '교실이 조용해졌어요.',      grade: '3' },
  { id: 3802, hanjaId: 38, text: '교사', syllables: ['교','사'], meaning: '가르치는 사람.',       example: '교사가 되고 싶어요.',       grade: '3' },
  { id: 3803, hanjaId: 38, text: '교과서', syllables: ['교','과','서'], meaning: '학교 책.',     example: '교과서를 펴세요.',           grade: '3' },
  { id: 3804, hanjaId: 38, text: '교육', syllables: ['교','육'], meaning: '가르치고 기르는 일.',   example: '교육은 중요해요.',          grade: '4' },

  // 室 (집 실) — id 39
  { id: 3901, hanjaId: 39, text: '교실', syllables: ['교','실'], meaning: '배우는 방.',           example: '교실에 책상이 많아요.',     grade: '3' },
  { id: 3902, hanjaId: 39, text: '거실', syllables: ['거','실'], meaning: '가족이 함께 쓰는 방.',  example: '거실에서 TV를 봐요.',        grade: '3' },
  { id: 3903, hanjaId: 39, text: '실내', syllables: ['실','내'], meaning: '방 안.',               example: '실내에서는 정숙해요.',      grade: '4' },
  { id: 3904, hanjaId: 39, text: '욕실', syllables: ['욕','실'], meaning: '목욕하는 방.',         example: '욕실 청소를 도왔어요.',     grade: '4' },

  // 生 (날 생) — id 40
  { id: 4001, hanjaId: 40, text: '학생', syllables: ['학','생'], meaning: '배우는 사람.',         example: '제 동생도 학생이에요.',     grade: '3' },
  { id: 4002, hanjaId: 40, text: '생일', syllables: ['생','일'], meaning: '태어난 날.',           example: '생일 축하해요.',            grade: '3' },
  { id: 4003, hanjaId: 40, text: '생활', syllables: ['생','활'], meaning: '하루하루 살아감.',     example: '학교 생활이 즐거워요.',     grade: '3' },
  { id: 4004, hanjaId: 40, text: '인생', syllables: ['인','생'], meaning: '사람의 살아가는 시간.', example: '인생은 길어요.',            grade: '4' },

  // 年 (해 년) — id 41
  { id: 4101, hanjaId: 41, text: '학년', syllables: ['학','년'], meaning: '학교의 1년 단위.',     example: '저는 삼학년이에요.',        grade: '3' },
  { id: 4102, hanjaId: 41, text: '내년', syllables: ['내','년'], meaning: '다음 해.',             example: '내년에는 사학년이에요.',    grade: '3' },
  { id: 4103, hanjaId: 41, text: '소년', syllables: ['소','년'], meaning: '어린 남자.',           example: '꿈 많은 소년이에요.',       grade: '3' },
  { id: 4104, hanjaId: 41, text: '연도', syllables: ['연','도'], meaning: '해를 세는 단위.',      example: '졸업 연도를 기록해요.',     grade: '4' },

  // 先 (먼저 선) — id 42
  { id: 4201, hanjaId: 42, text: '선생', syllables: ['선','생'], meaning: '가르치는 분.',         example: '선생님은 친절하세요.',      grade: '3' },
  { id: 4202, hanjaId: 42, text: '선두', syllables: ['선','두'], meaning: '맨 앞.',               example: '달리기에서 선두로 달려요.', grade: '4' },
  { id: 4203, hanjaId: 42, text: '선배', syllables: ['선','배'], meaning: '먼저 배운 사람.',      example: '선배가 도와줬어요.',        grade: '3' },
  { id: 4204, hanjaId: 42, text: '우선', syllables: ['우','선'], meaning: '먼저. 첫 번째로.',     example: '우선 손부터 씻어요.',       grade: '4' },

  // 韓 (한국 한) — id 43
  { id: 4301, hanjaId: 43, text: '한국', syllables: ['한','국'], meaning: '우리나라 이름.',       example: '한국에서 태어났어요.',      grade: '3' },
  { id: 4302, hanjaId: 43, text: '한글', syllables: ['한','글'], meaning: '한국의 글자.',         example: '한글은 자랑스러워요.',      grade: '3' },
  { id: 4303, hanjaId: 43, text: '한식', syllables: ['한','식'], meaning: '한국 음식.',           example: '한식이 가장 맛있어요.',     grade: '3' },
  { id: 4304, hanjaId: 43, text: '한복', syllables: ['한','복'], meaning: '한국 전통 옷.',        example: '설날에 한복을 입어요.',     grade: '3' },

  // 國 (나라 국) — id 44
  { id: 4401, hanjaId: 44, text: '국가', syllables: ['국','가'], meaning: '나라.',                example: '대한민국은 우리 국가예요.', grade: '3' },
  { id: 4402, hanjaId: 44, text: '국기', syllables: ['국','기'], meaning: '나라를 나타내는 깃발.', example: '국기를 게양해요.',          grade: '3' },
  { id: 4403, hanjaId: 44, text: '외국', syllables: ['외','국'], meaning: '다른 나라.',           example: '외국 여행을 가요.',         grade: '3' },
  { id: 4404, hanjaId: 44, text: '국민', syllables: ['국','민'], meaning: '나라의 사람.',         example: '국민이 한마음이에요.',      grade: '4' },

  // 民 (백성 민) — id 45
  { id: 4501, hanjaId: 45, text: '국민', syllables: ['국','민'], meaning: '나라의 사람.',         example: '국민이 행복해요.',          grade: '4' },
  { id: 4502, hanjaId: 45, text: '민족', syllables: ['민','족'], meaning: '같은 핏줄의 사람들.',   example: '한 민족의 자랑.',           grade: '4' },
  { id: 4503, hanjaId: 45, text: '민속', syllables: ['민','속'], meaning: '백성의 옛 풍습.',       example: '민속 박물관을 갔어요.',     grade: '4' },
  { id: 4504, hanjaId: 45, text: '시민', syllables: ['시','민'], meaning: '도시에 사는 사람.',     example: '시민의 권리를 존중해요.',   grade: '4' },

  // 軍 (군사 군) — id 46
  { id: 4601, hanjaId: 46, text: '군인', syllables: ['군','인'], meaning: '군에 속한 사람.',       example: '군인 아저씨께 감사해요.',   grade: '3' },
  { id: 4602, hanjaId: 46, text: '군대', syllables: ['군','대'], meaning: '병사들의 무리.',       example: '군대에서 훈련해요.',        grade: '4' },
  { id: 4603, hanjaId: 46, text: '장군', syllables: ['장','군'], meaning: '군사의 큰 우두머리.',  example: '훌륭한 장군 이야기.',       grade: '4' },
  { id: 4604, hanjaId: 46, text: '국군', syllables: ['국','군'], meaning: '나라의 군대.',         example: '국군 장병의 날.',           grade: '4' },

  // 王 (임금 왕) — id 47
  { id: 4701, hanjaId: 47, text: '왕자', syllables: ['왕','자'], meaning: '임금의 아들.',         example: '왕자가 백성을 도왔어요.',   grade: '3' },
  { id: 4702, hanjaId: 47, text: '왕비', syllables: ['왕','비'], meaning: '임금의 부인.',         example: '왕비가 미소를 지었어요.',   grade: '3' },
  { id: 4703, hanjaId: 47, text: '왕국', syllables: ['왕','국'], meaning: '임금이 다스리는 나라.', example: '동화 속 왕국.',             grade: '3' },
  { id: 4704, hanjaId: 47, text: '대왕', syllables: ['대','왕'], meaning: '훌륭한 임금.',         example: '세종 대왕을 존경해요.',     grade: '3' },

  // 門 (문 문) — id 48
  { id: 4801, hanjaId: 48, text: '대문', syllables: ['대','문'], meaning: '집 큰 문.',            example: '대문을 두드렸어요.',        grade: '3' },
  { id: 4802, hanjaId: 48, text: '교문', syllables: ['교','문'], meaning: '학교의 문.',           example: '교문이 닫혔어요.',          grade: '3' },
  { id: 4803, hanjaId: 48, text: '정문', syllables: ['정','문'], meaning: '앞쪽 문.',             example: '정문으로 들어가요.',        grade: '4' },
  { id: 4804, hanjaId: 48, text: '입문', syllables: ['입','문'], meaning: '처음 들어감. 시작.',    example: '피아노 입문 수업.',         grade: '4' },

  // 長 (긴 장) — id 49
  { id: 4901, hanjaId: 49, text: '장점', syllables: ['장','점'], meaning: '좋은 점.',             example: '내 장점은 친절해요.',       grade: '4' },
  { id: 4902, hanjaId: 49, text: '교장', syllables: ['교','장'], meaning: '학교의 큰 어른.',      example: '교장 선생님께 인사해요.',   grade: '3' },
  { id: 4903, hanjaId: 49, text: '장군', syllables: ['장','군'], meaning: '군대 우두머리.',       example: '장군의 용맹한 모습.',       grade: '4' },
  { id: 4904, hanjaId: 49, text: '장수', syllables: ['장','수'], meaning: '오래 사는 것.',        example: '할머니가 장수하세요.',      grade: '4' },

  // 白 (흰 백) — id 50
  { id: 5001, hanjaId: 50, text: '백설', syllables: ['백','설'], meaning: '흰 눈.',               example: '백설처럼 하얀 눈사람.',     grade: '3' },
  { id: 5002, hanjaId: 50, text: '백조', syllables: ['백','조'], meaning: '흰 새.',               example: '호수에 백조가 떠 있어요.',  grade: '3' },
  { id: 5003, hanjaId: 50, text: '백지', syllables: ['백','지'], meaning: '하얀 종이.',           example: '백지에 그림을 그려요.',     grade: '3' },
  { id: 5004, hanjaId: 50, text: '흑백', syllables: ['흑','백'], meaning: '검은색과 흰색.',       example: '흑백 사진이 멋져요.',       grade: '4' },
];

// 빠른 lookup
export const WORDS_BY_ID = new Map(WORDS.map(w => [w.id, w]));
export const WORDS_BY_HANJA = (() => {
  const m = new Map();
  for (const w of WORDS) {
    if (!m.has(w.hanjaId)) m.set(w.hanjaId, []);
    m.get(w.hanjaId).push(w);
  }
  return m;
})();

export function getWordsForHanja(hanjaId) {
  return WORDS_BY_HANJA.get(hanjaId) || [];
}
