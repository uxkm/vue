/**
 * Button 가이드 — API · Props / 클래스 / 디자인 토큰
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
    type: "'filled' | 'outline' | 'ghost' | 'text' | 'select'",
    default: 'filled',
    description: '버튼 스킨. select는 셀렉트 박스형 트리거.'
  },
  {
    name: 'color',
    type: "'primary' | 'default' | 'success' | 'warning' | 'danger' | 'muted'",
    default: 'primary',
    description: '색상. color_* 유틸 → CSS 변수. ghost는 color 클래스 생략.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: '크기. md는 크기 클래스 없음.'
  },
  {
    name: 'label',
    type: 'string',
    default: 'Button',
    description: '버튼 텍스트. children이 있으면 children 우선.'
  },
  {
    name: 'ripple',
    type: 'boolean',
    default: 'false',
    description: '클릭 파장. true일 때 data-ripple="true".'
  },
  {
    name: 'round',
    type: 'boolean',
    default: 'false',
    description: 'pill(캡슐) 모서리.'
  },
  {
    name: 'vertical',
    type: 'boolean',
    default: 'false',
    description: '아이콘 위·텍스트 아래 세로 배치.'
  },
  {
    name: 'iconOnly',
    type: 'boolean',
    default: 'false',
    description: '아이콘만 표시. ariaLabel 필수.'
  },
  {
    name: 'block',
    type: 'boolean',
    default: 'false',
    description: '부모 너비 100%.'
  },
  {
    name: 'grow',
    type: "boolean | '2' | 2",
    default: 'false',
    description: 'flex 비율 분배. 2는 두 배 너비(btn_grow-2).'
  },
  {
    name: 'fit',
    type: 'boolean',
    default: 'false',
    description: '콘텐츠 너비 유지.'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: '네이티브 disabled 또는 비활성 상호작용 차단.'
  },
  {
    name: 'ariaDisabled',
    type: 'boolean',
    default: 'false',
    description: 'is-disabled · aria-disabled와 상호작용 차단.'
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: '스피너 · aria-busy, 중복 클릭 차단.'
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: '셀렉트·팝오버 트리거 열림(is-open · aria-expanded).'
  },
  {
    name: 'error',
    type: 'boolean',
    default: 'false',
    description: '오류 상태(is-error · aria-invalid).'
  },
  {
    name: 'placeholder',
    type: 'boolean',
    default: 'false',
    description: '셀렉트 미선택 placeholder 스타일(btn_select-placeholder).'
  },
  {
    name: 'selectText',
    type: 'boolean',
    default: 'false',
    description: '배경·테두리 없는 셀렉트 텍스트형.'
  },
  {
    name: 'selectCaret',
    type: 'boolean',
    default: 'false',
    description: 'select 외 스킨에도 드롭다운 캐럿 표시.'
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    default: 'button',
    description: 'button 루트 네이티브 type.'
  },
  {
    name: 'tag',
    type: "'button' | 'a' | 'div'",
    default: 'button',
    description: '렌더 루트 HTML 태그.'
  },
  {
    name: 'href',
    type: 'string',
    default: '—',
    description: 'tag가 a일 때 링크 주소.'
  },
  {
    name: 'role',
    type: 'string',
    default: '자동',
    description: 'href 없는 a·div에는 button 역할 자동.'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: '접근성 이름. iconOnly 시 필수.'
  },
  {
    name: 'haspopup',
    type: "boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'",
    default: '—',
    description: 'aria-haspopup 팝업 유형.'
  },
  {
    name: 'expanded',
    type: 'boolean',
    default: 'open 값',
    description: 'aria-expanded. 생략 시 open 사용.'
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: '폼 오류 aria-invalid.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '루트 추가 클래스.'
  },
  {
    name: 'onClick',
    type: '(event) => void',
    default: '—',
    description: '활성 상태 클릭 핸들러.'
  },
  {
    name: 'onKeyDown',
    type: '(event) => void',
    default: '—',
    description: '키보드 핸들러. div/a button 역할은 Enter·Space 처리.'
  }
]

const children = [
  {
    name: 'children',
    type: 'ReactNode',
    default: 'label',
    description: 'label 대체 콘텐츠. iconOnly일 때 아이콘 콘텐츠.'
  },
  {
    name: 'iconBefore',
    type: 'ReactNode',
    default: '—',
    description: '텍스트 앞 아이콘.'
  },
  {
    name: 'iconAfter',
    type: 'ReactNode',
    default: '—',
    description: '텍스트 뒤 아이콘.'
  }
]

const htmlAttributes = [
  {
    name: 'class',
    type: 'string',
    default: '—',
    description: 'btn + 스킨·색·크기·상태 클래스 조합'
  },
  {
    name: 'data-ripple',
    type: "'true'",
    default: '—',
    description: '클릭 파장 opt-in. 지정 시에만 활성.'
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    default: 'button',
    description: 'button 요소 동작'
  },
  {
    name: 'disabled',
    type: 'boolean attribute',
    default: '—',
    description: 'button 네이티브 비활성'
  },
  {
    name: 'href',
    type: 'URL',
    default: '—',
    description: 'a 요소 링크'
  },
  {
    name: 'role · tabindex',
    type: 'attribute',
    default: '자동',
    description: '비네이티브 루트 접근성'
  },
  {
    name: 'aria-label · aria-disabled · aria-busy · aria-haspopup · aria-expanded · aria-invalid',
    type: 'attribute',
    default: '—',
    description: '접근성·상태 ARIA'
  }
]

const classes = [
  { name: 'btn', type: 'class', default: '—', description: '루트 구조' },
  { name: 'btn_filled · btn_outline · btn_ghost · btn_text', type: 'class', default: '—', description: '버튼 스킨' },
  { name: 'btn_select · btn_select-text', type: 'class', default: '—', description: '셀렉트형·텍스트형 트리거' },
  { name: 'btn_sm · btn_lg', type: 'class', default: '—', description: '크기(md는 클래스 없음)' },
  { name: 'btn_round · btn_vertical · btn_icon-only', type: 'class', default: '—', description: '모양·배치' },
  { name: 'btn_block · btn_grow · btn_grow-2 · btn_fit', type: 'class', default: '—', description: '너비 레이아웃' },
  { name: 'btn_icon · btn_label · btn_spinner', type: 'class', default: '—', description: '내부 파트' },
  { name: 'btn_row · btn_group · btn_stack', type: 'class', default: '—', description: '버튼 묶음' },
  { name: 'is-disabled · is-loading · is-open · is-error', type: 'class', default: '—', description: '상태' },
  { name: 'btn_select-placeholder', type: 'class', default: '—', description: '셀렉트 미선택 placeholder' },
  { name: 'color_*', type: 'class', default: '—', description: '공통 색상 유틸리티' }
]

const tokens = [
  {
    name: '--btn-padding-y · --btn-padding-x · --btn-font-size',
    type: 'mixed',
    default: '0.5rem · 1rem · var(--text-size-base)',
    description: '기본(md) 패딩·타이포'
  },
  {
    name: '--btn-padding-y-sm · --btn-padding-x-sm · --btn-font-size-sm',
    type: 'mixed',
    default: '0.3rem · 0.75rem · var(--text-size-sm)',
    description: 'sm 크기'
  },
  {
    name: '--btn-padding-y-lg · --btn-padding-x-lg · --btn-font-size-lg',
    type: 'mixed',
    default: '0.65rem · 1.25rem · var(--text-size-lg)',
    description: 'lg 크기'
  },
  {
    name: '--btn-font-weight · --btn-line-height · --btn-border-width · --btn-gap',
    type: 'mixed',
    default: '600 · 1.4 · 1px · var(--space-sm)',
    description: '타이포·테두리·간격'
  },
  {
    name: '--btn-icon-size · --btn-icon-only-padding',
    type: 'length',
    default: '1em · 0.5rem',
    description: '아이콘·아이콘 전용 패딩'
  },
  {
    name: '--btn-vertical-min-width',
    type: 'length',
    default: '4.5rem',
    description: '세로 배치 최소 너비'
  },
  {
    name: '--btn-select-min-width · --btn-select-max-width',
    type: 'length',
    default: '10rem · 320px',
    description: '셀렉트 트리거 너비'
  },
  {
    name: '--btn-spinner-size · --btn-spinner-duration',
    type: 'mixed',
    default: '1em · 0.6s',
    description: '로딩 스피너'
  },
  {
    name: '--ripple-color · --ripple-opacity · --ripple-duration',
    type: 'mixed',
    default: 'currentColor · 0.18 · 550ms',
    description: '클릭 파장'
  }
]

export const buttonApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Button props입니다. children이 있으면 label보다 우선합니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · Children',
    tables: [{ columns, rows: children }]
  },
  {
    title: 'HTML API · Markup',
    description: '네이티브 속성과 공통 OOCSS 클래스를 마크업에 직접 적용할 때도 동일합니다.',
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
