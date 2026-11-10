/**
 * Icon 가이드 — API · Props / 클래스 / 디자인 토큰
 * (현재 React · Next 구현 기준)
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'name',
    type: 'IconName | string',
    default: 'plus',
    description: '등록 stroke 아이콘 이름. `.svg` 파일이면 images 경로로 처리. children이 있으면 자식이 우선.'
  },
  {
    name: 'src',
    type: 'string',
    default: '—',
    description: 'public/images SVG. `close.svg` → /images/icon/, `common/a.svg` · 절대 URL 지원.'
  },
  {
    name: 'embed',
    type: 'boolean',
    default: 'false',
    description: 'true면 src 파일을 fetch해 인라인 SVG 코드로 렌더. false면 img. 인라인이면 currentColor·color_* 상속.'
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | number | string",
    default: 'md',
    description: '토큰 크기 또는 커스텀(28 · \'28px\' · \'1.75rem\' · \'var(--x)\'). md는 크기 클래스 없음.'
  },
  {
    name: 'color',
    type: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted'",
    default: '—',
    description: 'color_* 유틸 → CSS 변수(예: primary → var(--color-accent-text)). stroke currentColor에 상속.'
  },
  {
    name: 'inline',
    type: 'boolean',
    default: 'false',
    description: '텍스트 기준선에 맞춰 수직 정렬(icon_inline).'
  },
  {
    name: 'spin',
    type: 'boolean',
    default: 'false',
    description: '회전 애니메이션(icon_spin).'
  },
  {
    name: 'button',
    type: 'boolean',
    default: 'false',
    description: 'button 루트의 클릭 가능한 아이콘으로 렌더.'
  },
  {
    name: 'circle',
    type: 'boolean',
    default: 'false',
    description: '원형 배경 래퍼(icon_circle).'
  },
  {
    name: 'square',
    type: 'boolean',
    default: 'false',
    description: '사각 배경 래퍼(icon_square).'
  },
  {
    name: 'pulse',
    type: 'boolean',
    default: 'false',
    description: 'circle과 함께 펄스 강조(icon_pulse).'
  },
  {
    name: 'ripple',
    type: 'boolean',
    default: 'false',
    description: 'button일 때 클릭 파장. true일 때 data-ripple="true".'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: '접근성 이름. 의미 있는 아이콘·아이콘 버튼에 지정.'
  },
  {
    name: 'title',
    type: 'string',
    default: '—',
    description: 'SVG title과 접근성 이름 후보.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '루트에 추가할 클래스.'
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: '—',
    description: '루트 인라인 스타일. 커스텀 size와 병합.'
  },
  {
    name: 'onClick',
    type: '(event) => void',
    default: '—',
    description: '클릭 핸들러. plain(래퍼 없음)이면 자동으로 button 으로 감쌉니다. circle · square 래퍼에서도 동작합니다.'
  }
]

const children = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'path, circle 등 커스텀 SVG 도형. name·src보다 우선.'
  }
]

const htmlAttributes = [
  {
    name: 'aria-hidden',
    type: "'true'",
    default: '—',
    description: '장식용 SVG를 접근성 트리에서 숨김.'
  },
  {
    name: 'aria-label',
    type: 'string',
    default: '—',
    description: '의미 있는 SVG 또는 아이콘 버튼의 접근성 이름.'
  },
  {
    name: 'viewBox',
    type: 'string',
    default: '0 0 24 24',
    description: '공통 아이콘 좌표계.'
  },
  {
    name: 'stroke',
    type: 'string',
    default: 'currentColor',
    description: '부모 텍스트 색 상속.'
  },
  {
    name: 'data-component',
    type: "'Icon'",
    default: 'Icon',
    description: '컴포넌트 식별용 데이터 속성.'
  },
  {
    name: 'data-ripple',
    type: "'true'",
    default: '—',
    description: 'icon_button 클릭 파장 opt-in. 지정 시에만 활성.'
  },
  {
    name: 'data-embed',
    type: 'URL',
    default: '—',
    description: 'embed 모드일 때 불러온 SVG URL.'
  }
]

const classes = [
  { name: 'icon', type: 'class', default: '—', description: 'SVG·이미지 루트 기본 구조와 md 크기' },
  { name: 'icon_xs · icon_sm · icon_lg · icon_xl · icon_2xl · icon_3xl', type: 'class', default: '—', description: '크기 변형(md는 클래스 없음)' },
  { name: 'icon_inline', type: 'class', default: '—', description: '텍스트 인라인 정렬' },
  { name: 'icon_spin', type: 'class', default: '—', description: '회전 애니메이션' },
  { name: 'icon_button', type: 'class', default: '—', description: '아이콘 버튼 래퍼' },
  { name: 'icon_circle · icon_square', type: 'class', default: '—', description: '원형·사각형 배경 래퍼' },
  { name: 'icon_circle-xs · … · icon_circle-3xl', type: 'class', default: '—', description: '배경형 아이콘 크기' },
  { name: 'icon_pulse', type: 'class', default: '—', description: '펄스 강조 애니메이션' },
  { name: 'icon_group', type: 'class', default: '—', description: '여러 아이콘 가로 배치 컨테이너' },
  { name: 'icon_grid · icon_grid-item', type: 'class', default: '—', description: '아이콘 갤러리 그리드와 항목' },
  { name: 'color_*', type: 'class', default: '—', description: '공통 색상 유틸리티(CSS 변수)' }
]

const tokens = [
  {
    name: '--icon-size-xs · --icon-size-sm · --icon-size · --icon-size-lg · --icon-size-xl · --icon-size-2xl · --icon-size-3xl',
    type: 'length',
    default: '0.75 · 1 · 1.25 · 1.5 · 2 · 2.5 · 3rem',
    description: '아이콘 크기 토큰'
  },
  {
    name: '--icon-custom-size',
    type: 'length',
    default: '—',
    description: '커스텀 size prop이 설정하는 런타임 변수. 토큰보다 우선'
  },
  {
    name: '--icon-circle-size-xs · … · --icon-circle-size-3xl',
    type: 'length',
    default: '1.5 · 1.75 · 2.25 · 2.75 · 3.25 · 3.75 · 4.5rem',
    description: '원형·사각·버튼 배경 크기'
  },
  {
    name: '--icon-spin-duration',
    type: 'time',
    default: '0.8s',
    description: '회전 주기'
  },
  {
    name: '--icon-pulse-duration',
    type: 'time',
    default: '1.5s',
    description: '펄스 주기'
  },
  {
    name: '--ripple-color · --ripple-opacity · --ripple-duration',
    type: 'mixed',
    default: 'currentColor · 0.18 · 550ms',
    description: 'button ripple 파장 토큰'
  }
]

const helpers = [
  {
    name: 'iconNames',
    type: 'IconName[]',
    default: '—',
    description: '등록된 stroke 아이콘 이름 목록'
  },
  {
    name: 'iconSizes',
    type: 'IconSize[]',
    default: "['xs','sm','md','lg','xl','2xl','3xl']",
    description: '등록된 크기 토큰 목록'
  },
  {
    name: 'resolveIconSrc(src)',
    type: '(string) => string',
    default: '—',
    description: 'images 경로 해석 헬퍼'
  },
  {
    name: 'toIconCssSize(size)',
    type: '(size) => string | null',
    default: '—',
    description: '커스텀 크기를 CSS 길이로 변환. 토큰이면 null'
  }
]

export const iconApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Icon props입니다. children이 있으면 name·src보다 우선합니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · Children',
    tables: [{ columns, rows: children }]
  },
  {
    title: 'API · Helpers',
    description: '@/comp 또는 Icon 모듈에서 export합니다.',
    tables: [{ columns, rows: helpers }]
  },
  {
    title: 'HTML API · Markup',
    description: '렌더된 SVG·래퍼에 적용되는 네이티브·데이터 속성입니다.',
    tables: [{ columns, rows: htmlAttributes }]
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
