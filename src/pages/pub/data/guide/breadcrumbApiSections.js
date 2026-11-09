/**
 * Breadcrumb 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'items',
    type: 'BreadcrumbItem[]',
    default: '[]',
    description: "경로 단계입니다. { key?, label?, href?, current?, disabled?, icon?, ariaLabel? }. current 이거나 마지막 항목이 현재 페이지입니다."
  },
  {
    name: 'separator',
    type: "'chevron' | 'slash' | 'dot'",
    default: "'chevron'",
    description: "구분자입니다. 기본(›) · slash(/) · dot(·). slash · dot 일 때 루트에 breadcrumb_sep-slash · breadcrumb_sep-dot 이 붙고, 실제 글자는 항목 ::before 로 그려집니다."
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '글자 크기입니다. sm · lg 일 때 루트에 breadcrumb_sm · breadcrumb_lg 가 붙습니다.'
  },
  {
    name: 'maxItems',
    type: 'number',
    default: '0',
    description: '0 보다 크고 항목 수보다 작으면 가운데를 …(breadcrumb_ellipsis) 로 접습니다. 클릭하면 전체 경로를 펼칩니다. 권장 값은 3 이상입니다.'
  },
  {
    name: 'expanded',
    type: 'boolean',
    default: '—',
    description: '넘기면 말줄임 펼침을 부모가 제어합니다(제어). 넘기지 않으면 내부 상태로 동작합니다.'
  },
  {
    name: 'defaultExpanded',
    type: 'boolean',
    default: 'false',
    description: '비제어 모드의 초기 펼침 여부입니다. expanded 를 넘기면 무시됩니다.'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: "'경로'",
    description: 'nav 의 aria-label 입니다.'
  },
  {
    name: 'onExpandedChange',
    type: '(expanded: boolean) => void',
    default: '—',
    description: '말줄임(…) 클릭으로 펼침 상태가 바뀔 때 호출됩니다. 제어 모드에서는 부모에서 expanded 를 바꿔야 합니다.'
  },
  {
    name: 'onSelect',
    type: '(item, index, event) => void',
    default: '—',
    description: '경로 링크 클릭 시 호출됩니다. 페이지에서 라우팅·선택을 제어할 때 사용합니다.'
  },
  {
    name: 'className · ...props',
    type: 'nav attributes',
    default: '—',
    description: '루트(nav.breadcrumb)에 합쳐지는 클래스와 속성입니다.'
  }
]

const classes = [
  {
    name: 'breadcrumb · breadcrumb_list · breadcrumb_item',
    type: 'class',
    default: '—',
    description: '루트, 순서 목록(ol), 단계(li)입니다. 현재 단계는 is-current 와 aria-current="page" 를 둡니다.'
  },
  {
    name: 'breadcrumb_link · breadcrumb_current',
    type: 'class',
    default: '—',
    description: '이동 가능한 링크와 현재 위치 문구입니다. 긴 라벨은 max-width 에서 말줄임됩니다.'
  },
  {
    name: 'breadcrumb_link-icon · breadcrumb_icon',
    type: 'class',
    default: '—',
    description: '아이콘만 있는 홈 링크 등에 쓰는 변형과 아이콘 래퍼입니다.'
  },
  {
    name: 'breadcrumb_sep-slash · breadcrumb_sep-dot · breadcrumb_sm · breadcrumb_lg',
    type: 'class',
    default: '—',
    description: '구분자·크기 변형입니다. 구분자는 .breadcrumb_item + .breadcrumb_item::before 콘텐츠를 바꿉니다.'
  },
  {
    name: 'breadcrumb_ellipsis',
    type: 'class',
    default: '—',
    description: '접힌 경로를 펼치는 … 버튼입니다. maxItems 로 중간이 생략될 때 렌더링됩니다.'
  },
  {
    name: 'is-current · is-disabled',
    type: 'class',
    default: '—',
    description: '현재 단계(항목)와 비활성 링크 상태입니다.'
  }
]

const tokens = [
  {
    name: '--breadcrumb-font-size · --breadcrumb-font-size-sm · --breadcrumb-font-size-lg',
    type: 'length',
    default: 'var(--text-size-sm) · xs · base',
    description: '기본·sm·lg 글자 크기입니다.'
  },
  {
    name: '--breadcrumb-gap · --breadcrumb-icon-gap · --breadcrumb-line-height',
    type: 'length · number',
    default: 'var(--space-xs) · 0.25rem · 1.5',
    description: '항목·아이콘 간격과 줄 높이입니다.'
  },
  {
    name: '--breadcrumb-link-font-weight · --breadcrumb-current-font-weight',
    type: 'number',
    default: '500 · 600',
    description: '링크와 현재 위치 글자 굵기입니다.'
  },
  {
    name: '--breadcrumb-link-max-width · --breadcrumb-separator-color',
    type: 'length · color',
    default: '12rem · var(--color-text-muted)',
    description: '링크·현재 문구 최대 너비와 구분자 색입니다.'
  },
  {
    name: '--breadcrumb-icon-size · --breadcrumb-icon-padding · --breadcrumb-ellipsis-size',
    type: 'length',
    default: '1rem · 0.15rem · 1.5rem',
    description: '아이콘 크기·패딩과 말줄임 버튼 최소 크기입니다.'
  }
]

export const breadcrumbApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Breadcrumb props입니다. items 로 경로를 구성하고, separator · size · maxItems · expanded · onSelect 로 표시·제어를 바꿉니다.',
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
