/**
 * Link 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'as',
    type: "'a' | 'button' | string",
    default: 'a',
    description: '루트 태그. a · button 또는 커스텀 요소.'
  },
  {
    name: 'href',
    type: 'string',
    default: '#',
    description: 'a일 때 이동 URL.'
  },
  {
    name: 'label',
    type: 'string',
    default: '—',
    description: '링크 텍스트. children이 있으면 children 우선.'
  },
  {
    name: 'color',
    type: "'primary' | 'muted' | 'success' | 'warning' | 'danger' | 'info'",
    default: 'primary',
    description: '공통 color_* → CSS 변수.'
  },
  {
    name: 'size',
    type: "'sm' | 'lg' | 'xl'",
    default: '—',
    description: '공통 size_* 텍스트 크기.'
  },
  {
    name: 'underline',
    type: 'boolean',
    default: 'false',
    description: '항상 밑줄(link_underline).'
  },
  {
    name: 'noUnderline',
    type: 'boolean',
    default: 'false',
    description: 'hover에도 밑줄 없음(link_no-underline).'
  },
  {
    name: 'standalone',
    type: 'boolean',
    default: 'false',
    description: '독립 링크 터치 영역 확장.'
  },
  {
    name: 'nav',
    type: 'boolean',
    default: 'false',
    description: '내비게이션 링크 스타일.'
  },
  {
    name: 'block',
    type: 'boolean',
    default: 'false',
    description: '부모 너비를 채우는 블록 링크.'
  },
  {
    name: 'back',
    type: 'boolean',
    default: 'false',
    description: '뒤로가기 링크 간격·아이콘 크기.'
  },
  {
    name: 'iconOnly',
    type: 'boolean',
    default: 'false',
    description: '텍스트 없이 아이콘만 표시.'
  },
  {
    name: 'active',
    type: 'boolean',
    default: 'false',
    description: 'is-active 상태.'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: '비활성 스타일·aria-disabled·클릭 차단.'
  },
  {
    name: 'target',
    type: 'string',
    default: '—',
    description: '네이티브 target. blank와 함께 쓸 수 있음.'
  },
  {
    name: 'rel',
    type: 'string',
    default: '—',
    description: '네이티브 rel. target=_blank면 noopener noreferrer 기본.'
  },
  {
    name: 'blank',
    type: 'boolean',
    default: 'false',
    description: 'deprecated. target="_blank" 권장.'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: '아이콘 전용 링크 등의 접근성 이름.'
  },
  {
    name: 'ripple',
    type: 'boolean',
    default: 'false',
    description: '클릭 파장. true일 때 data-ripple="true".'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '루트에 추가할 클래스.'
  },
  {
    name: 'onClick',
    type: '(event) => void',
    default: '—',
    description: '클릭 핸들러. disabled면 호출되지 않음.'
  }
]

const children = [
  {
    name: 'children',
    type: 'ReactNode',
    default: 'label',
    description: '링크 텍스트·커스텀 콘텐츠.'
  },
  {
    name: 'icon',
    type: 'ReactNode',
    default: '—',
    description: '텍스트 앞 아이콘(link_icon).'
  },
  {
    name: 'iconAfter',
    type: 'ReactNode',
    default: '—',
    description: '텍스트 뒤 아이콘(link_icon).'
  }
]

const htmlRows = [
  {
    name: 'href',
    type: 'string',
    default: '#',
    description: '링크 이동 경로'
  },
  {
    name: 'target="_blank" + rel="noopener noreferrer"',
    type: 'attribute',
    default: '—',
    description: '새 창 링크 보안 조합'
  },
  {
    name: 'aria-disabled · tabindex="-1"',
    type: 'attribute',
    default: '—',
    description: '비활성 링크 접근성'
  },
  {
    name: 'aria-label',
    type: 'string',
    default: '—',
    description: '텍스트 없는 아이콘 링크 이름'
  },
  {
    name: 'data-ripple',
    type: "'true'",
    default: '—',
    description: '클릭 파장 opt-in. 지정 시에만 활성.'
  }
]

const classes = [
  { name: 'link', type: 'class', default: '—', description: '하이퍼링크 루트' },
  { name: 'link_underline · link_no-underline · link_standalone', type: 'class', default: '—', description: '밑줄·터치 영역 변형' },
  { name: 'link_nav · link_back · link_block · link_icon-only', type: 'class', default: '—', description: '용도별 변형' },
  { name: 'link_icon · link_label', type: 'class', default: '—', description: '내부 아이콘·라벨' },
  { name: 'link_row · link_group · link_group-inline', type: 'class', default: '—', description: '링크 묶음 레이아웃' },
  { name: 'is-active · is-disabled', type: 'class', default: '—', description: '활성·비활성 상태' },
  { name: 'color_* · size_*', type: 'class', default: '—', description: '공통 색상·크기 유틸리티' }
]

const tokens = [
  {
    name: '--link-gap',
    type: 'length',
    default: 'var(--space-xs)',
    description: '아이콘과 텍스트 간격'
  },
  {
    name: '--link-font-weight',
    type: 'font-weight',
    default: '500',
    description: '링크 글자 굵기'
  },
  {
    name: '--link-underline-offset',
    type: 'length',
    default: '2px',
    description: '밑줄 오프셋'
  },
  {
    name: '--link-nav-padding-y · --link-nav-padding-x',
    type: 'length',
    default: '0.35rem · 0.5rem',
    description: '내비게이션 링크 패딩'
  },
  {
    name: '--link-standalone-padding-y · --link-standalone-padding-x',
    type: 'length',
    default: '0.25rem · 0.15rem',
    description: '독립 링크 터치 영역'
  },
  {
    name: '--link-icon-only-size',
    type: 'length',
    default: '2rem',
    description: '아이콘 전용 링크 크기'
  },
  {
    name: '--ripple-color · --ripple-opacity · --ripple-duration',
    type: 'mixed',
    default: 'currentColor · 0.18 · 550ms',
    description: '클릭 파장 토큰'
  }
]

export const linkApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Link props입니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · Children',
    tables: [{ columns, rows: children }]
  },
  {
    title: 'HTML API · Markup',
    description: '네이티브 링크 속성과 공통 클래스를 직접 적용할 때도 동일합니다.',
    tables: [{ columns, rows: htmlRows }]
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
