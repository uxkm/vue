/**
 * Skeleton 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'variant',
    type: "'rect' | 'text' | 'title' | 'circle' | 'button' | 'image' | 'block' | …",
    default: "'rect'",
    description: "형태입니다. text · title · circle · button · image · block 은 각각 skeleton_* 클래스가 붙습니다. avatar→circle, eyebrow→text+w-sm, meta→text+w-md, chip→button, text-sm→text+sm 별칭을 지원합니다. rect 는 형태 클래스 없이 width · height 로 크기를 정합니다."
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '크기 토큰입니다. sm · lg 일 때 skeleton_sm · skeleton_lg 가 붙어 텍스트·타이틀·원·버튼 치수가 바뀝니다.'
  },
  {
    name: 'width',
    type: "string | number | 'sm' | 'md' | 'lg' | null",
    default: 'null',
    description: "너비입니다. 'sm' · 'md' · 'lg' 이면 skeleton_w-* 토큰 클래스를, 숫자·CSS 길이는 style.width 를 씁니다."
  },
  {
    name: 'height',
    type: 'string | number | null',
    default: 'null',
    description: '높이입니다. 숫자(px) 또는 CSS 길이로 style.height 에 들어갑니다. variant 기본 높이보다 우선합니다.'
  },
  {
    name: 'block',
    type: 'boolean',
    default: 'false',
    description: '가로 100%입니다. variant 가 rect 이고 height 가 없으면 skeleton_block(고정 높이 블록)도 붙습니다.'
  },
  {
    name: 'round',
    type: 'boolean',
    default: 'false',
    description: 'skeleton_circle 을 붙여 원형으로 만듭니다. variant circle · avatar 와 같습니다.'
  },
  {
    name: 'static',
    type: 'boolean',
    default: 'false',
    description: 'skeleton_static 을 붙여 shimmer 애니메이션을 끕니다.'
  },
  {
    name: 'className · ...props',
    type: 'span attributes',
    default: '—',
    description: '루트(span.skeleton)에 합쳐지는 클래스와 속성입니다. aria-hidden="true" 는 항상 지정됩니다. 그룹 접근성은 skeleton_group 에 role="status" 를 둡니다.'
  }
]

const classes = [
  {
    name: 'skeleton',
    type: 'class',
    default: '—',
    description: '뼈대 한 칸입니다. 배경·모서리·overflow hidden 과 ::after shimmer(skeleton-shimmer)가 적용됩니다.'
  },
  {
    name: 'skeleton_text · skeleton_title · skeleton_circle · skeleton_button · skeleton_image · skeleton_block',
    type: 'class',
    default: '—',
    description: '형태입니다. text·title 은 줄 높이·너비, circle 은 아바타 정사각 원, button 은 버튼 크기, image 는 16/9, block 은 전체 너비·고정 높이입니다.'
  },
  {
    name: 'skeleton_w-sm · skeleton_w-md · skeleton_w-lg',
    type: 'class',
    default: '—',
    description: '너비 토큰(기본 35% · 65% · 85%)입니다. React 에서는 width="sm" 등으로 붙습니다.'
  },
  {
    name: 'skeleton_sm · skeleton_lg',
    type: 'class',
    default: '—',
    description: '크기 변형입니다. 텍스트·타이틀·원·버튼 관련 토큰을 한꺼번에 바꿉니다.'
  },
  {
    name: 'skeleton_group · skeleton_row · skeleton_row-body',
    type: 'class',
    default: '—',
    description: '레이아웃용입니다. group 은 세로 스택, row 는 가로(원+본문), row-body 는 행 안 세로 텍스트 묶음입니다. React Skeleton 은 렌더링하지 않으며 HTML 마크업으로 조합합니다.'
  },
  {
    name: 'skeleton_static',
    type: 'class',
    default: '—',
    description: '::after 애니메이션을 끕니다. prefers-reduced-motion 에서도 동일하게 꺼집니다.'
  }
]

const tokens = [
  {
    name: '--skeleton-bg · --skeleton-shine',
    type: 'color',
    default: 'var(--color-surface-raised) · color-mix(…)',
    description: '뼈대 배경과 shimmer 하이라이트 색입니다.'
  },
  {
    name: '--skeleton-radius · --skeleton-radius-round',
    type: 'length',
    default: 'var(--radius-sm) · 50%',
    description: '기본 모서리와 원형(circle) 반경입니다.'
  },
  {
    name: '--skeleton-text-height · --skeleton-title-height · --skeleton-title-width',
    type: 'length',
    default: '0.875rem · 1.125rem · 40%',
    description: 'text · title 기본 치수입니다. sm · lg 크기 클래스가 높이를 바꿉니다.'
  },
  {
    name: '--skeleton-avatar-size · --skeleton-button-height · --skeleton-button-width',
    type: 'length',
    default: 'var(--avatar-size) · 2rem · 5rem',
    description: 'circle · button 기본 치수입니다.'
  },
  {
    name: '--skeleton-block-height · --skeleton-image-ratio',
    type: 'length · ratio',
    default: '4rem · 16 / 9',
    description: 'block 높이와 image 가로세로 비입니다.'
  },
  {
    name: '--skeleton-width-sm · --skeleton-width-md · --skeleton-width-lg',
    type: 'length',
    default: '35% · 65% · 85%',
    description: 'skeleton_w-* 너비 토큰입니다.'
  },
  {
    name: '--skeleton-gap · --skeleton-gap-sm · --skeleton-duration',
    type: 'length · time',
    default: 'var(--space-sm) · 0.375rem · 1.4s',
    description: 'group · row 간격과 shimmer 한 주기입니다.'
  }
]

export const skeletonApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Skeleton props입니다. 한 칸만 렌더링하며, 그룹·행 레이아웃은 skeleton_group · skeleton_row 마크업으로 조합합니다.',
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
