/**
 * Spin 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'spinning',
    type: 'boolean',
    default: 'true',
    description: 'true 이면 인디케이터(와 tip)를 표시합니다. 자식이 있을 때는 래퍼에 is-loading 을 붙이고 overlay 를 켭니다. false 이면 인디케이터를 숨기고 자식만 보여 줍니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '크기입니다. sm · lg 일 때 spin_sm · spin_lg 가 붙고, md 는 클래스를 붙이지 않습니다.'
  },
  {
    name: 'color',
    type: "'primary' | 'success' | 'warning' | 'danger' | ''",
    default: "'primary'",
    description: '루트(spin)에 color_{값} 을 붙입니다. primary · success · warning · danger 인디케이터 색이 정의되어 있습니다. 빈 문자열이면 색 클래스를 붙이지 않고 기본(--spin-color)을 씁니다.'
  },
  {
    name: 'tip',
    type: 'ReactNode',
    default: '—',
    description: 'spinning 일 때 spin_tip 에 표시할 문구입니다. 문자열 tip 이고 ariaLabel 이 없으면 aria-label 로도 쓰입니다.'
  },
  {
    name: 'inline',
    type: 'boolean',
    default: 'false',
    description: '단독 스피너에 spin_inline 을 붙여 인디케이터와 tip 을 가로로 배치합니다. 자식 래퍼(overlay)에는 적용되지 않습니다.'
  },
  {
    name: 'block',
    type: 'boolean',
    default: 'false',
    description: '단독이면 spin_block(가로 중앙·전체 너비), 자식이 있으면 spin_wrap-block(최소 높이)을 붙입니다.'
  },
  {
    name: 'blur',
    type: 'boolean',
    default: 'false',
    description: '자식 래퍼에 spin_wrap-blur 를 붙입니다. is-loading 일 때 본문(spin_wrap-body)에 blur 필터가 적용됩니다.'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: "''",
    description: 'aria-label 값입니다. ariaLabel → 문자열 tip → "로딩 중" 순으로 정해집니다.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '있으면 spin_wrap 구조로 감싸 spin_wrap-body 에 넣고, spinning 일 때 spin_overlay 를 덮습니다.'
  },
  {
    name: 'className · ...props',
    type: 'div attributes',
    default: '—',
    description: '자식이 없으면 spin 루트, 있으면 spin_wrap 에 합쳐지는 클래스와 네이티브 div 속성입니다. role="status" · aria-live="polite" 는 인디케이터(또는 overlay)에 지정됩니다.'
  }
]

const classes = [
  {
    name: 'spin · spin_indicator · spin_tip',
    type: 'class',
    default: '—',
    description: '루트, 회전 원(border + spin-rotate), 안내 문구입니다. 인디케이터는 aria-hidden 으로 두는 것이 좋습니다.'
  },
  {
    name: 'spin_sm · spin_lg',
    type: 'class',
    default: '—',
    description: '크기 변형입니다. 원 지름·테두리 두께·tip 글자 크기 토큰이 바뀝니다. 기본(클래스 없음)은 중간 크기입니다.'
  },
  {
    name: 'color_primary · color_success · color_warning · color_danger',
    type: 'class',
    default: '—',
    description: '인디케이터 강조 색(--spin-color)입니다. 루트(spin)에 붙입니다.'
  },
  {
    name: 'spin_inline',
    type: 'class',
    default: '—',
    description: '인디케이터와 tip 을 가로(row)로 배치합니다. 기본은 세로(column)입니다.'
  },
  {
    name: 'spin_block',
    type: 'class',
    default: '—',
    description: '단독 스피너를 가로 전체 너비로 두고 가운데 정렬합니다.'
  },
  {
    name: 'spin_wrap · spin_wrap-body · is-loading',
    type: 'class',
    default: '—',
    description: '콘텐츠 위 로딩 래퍼입니다. is-loading 이면 본문 투명도·포인터 비활성, 자식 overlay 표시가 켜집니다.'
  },
  {
    name: 'spin_overlay',
    type: 'class',
    default: '—',
    description: '래퍼 안 절대 위치 오버레이입니다. .spin_wrap.is-loading > .spin_overlay 일 때만 표시되며, tip 은 밝은 글자색을 씁니다.'
  },
  {
    name: 'spin_wrap-block · spin_wrap-blur',
    type: 'class',
    default: '—',
    description: 'wrap-block 은 최소 높이(--spin-wrap-min-height)를 주고, wrap-blur 는 로딩 중 본문에 blur(2px)를 줍니다.'
  }
]

const tokens = [
  {
    name: '--spin-size · --spin-size-sm · --spin-size-lg',
    type: 'length',
    default: '2rem · 1.25rem · 3rem',
    description: '인디케이터 지름의 기본 · sm · lg 값입니다.'
  },
  {
    name: '--spin-border · --spin-border-sm · --spin-border-lg',
    type: 'length',
    default: '3px · 2px · 4px',
    description: '인디케이터 테두리 두께입니다.'
  },
  {
    name: '--spin-duration',
    type: 'time',
    default: '0.8s',
    description: '한 바퀴 회전 시간입니다. prefers-reduced-motion 에서는 1.5s 로 느려집니다.'
  },
  {
    name: '--spin-gap',
    type: 'length',
    default: 'var(--space-sm)',
    description: '인디케이터와 tip 사이 간격입니다.'
  },
  {
    name: '--spin-tip-size',
    type: 'length',
    default: 'var(--text-size-sm)',
    description: 'tip 글자 크기입니다. sm 은 text-size-xs, lg 는 text-size-base 로 바뀝니다.'
  },
  {
    name: '--spin-color · --spin-track-color',
    type: 'color',
    default: 'var(--color-accent) · var(--color-border-subtle)',
    description: '인디케이터 강조 색과 트랙(나머지 border) 색입니다. color_* 가 --spin-color 를 바꿉니다.'
  },
  {
    name: '--spin-overlay-bg · --spin-overlay-tip-color',
    type: 'color',
    default: 'rgba(15, 20, 25, 0.72) · #ffffff',
    description: '오버레이 배경과 그 안 tip 글자색입니다.'
  },
  {
    name: '--spin-wrap-min-height · --spin-wrap-content-opacity',
    type: 'length · number',
    default: '8rem · 0.45',
    description: 'spin_wrap-block 최소 높이와 is-loading 본문 투명도입니다.'
  }
]

export const spinApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Spin props입니다. spinning 으로 표시 여부를 제어하고, 자식이 있으면 콘텐츠 위 오버레이로 동작합니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: '공통 API · 클래스',
    tables: [{ columns, rows: classes }]
  },
  {
    title: '공통 API · 디자인 토큰',
    tables: [{ columns, rows: tokens }]
  }
]
