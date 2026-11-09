/**
 * Navbar 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'brand',
    type: 'ReactNode',
    default: "'Logo'",
    description: 'navbar_brand 에 표시할 로고·브랜드입니다. 비우면 브랜드 링크를 렌더링하지 않습니다.'
  },
  {
    name: 'brandHref',
    type: 'string',
    default: "'#'",
    description: '브랜드 링크 주소입니다.'
  },
  {
    name: 'items',
    type: 'NavbarItem[]',
    default: '[]',
    description: "메뉴 링크 목록입니다. { key, label, href?, active? }. active 이면 navbar_link 에 is-active 와 aria-current=\"page\" 가 붙습니다. children 이 있으면 items 는 쓰이지 않습니다."
  },
  {
    name: 'actions',
    type: 'ReactNode',
    default: '—',
    description: '우측 navbar_actions 영역입니다. 버튼·검색 등을 둡니다. children 으로 collapse 를 직접 구성할 때는 actions 를 그 안에 직접 넣습니다.'
  },
  {
    name: 'sticky',
    type: 'boolean',
    default: 'false',
    description: 'navbar_sticky 를 붙여 position: sticky · top: 0 · z-index: 20 으로 스크롤 시 상단에 고정합니다.'
  },
  {
    name: 'borderless',
    type: 'boolean',
    default: 'false',
    description: 'navbar_borderless 를 붙여 하단 테두리를 투명하게 합니다.'
  },
  {
    name: 'dark',
    type: 'boolean',
    default: 'false',
    description: 'navbar_dark 를 붙여 surface 배경 톤으로 바꿉니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '높이입니다. sm · lg 일 때 navbar_sm · navbar_lg 가 붙어 컨테이너 min-height 토큰이 바뀝니다.'
  },
  {
    name: 'open · defaultOpen · onOpenChange',
    type: 'boolean · (open) => void',
    default: '— · false · —',
    description: '모바일 메뉴 열림입니다. open 을 주면 제어 모드, 없으면 defaultOpen 으로 시작합니다. 토글 시 루트·collapse 에 is-open 이 붙습니다.'
  },
  {
    name: 'selectedKey · defaultSelectedKey',
    type: 'string | null',
    default: '— · null',
    description: '활성 링크 키입니다. selectedKey 를 넘기면 제어하고, 생략하면 defaultSelectedKey 와 내부 상태로 클릭 선택이 갱신됩니다. item.active 와 함께 쓸 수 있습니다.'
  },
  {
    name: 'onSelect',
    type: '(key, item, event) => void',
    default: '—',
    description: '메뉴 링크 클릭 시 호출됩니다. 비제어 모드에서는 내부 selectedKey 도 갱신됩니다. 모바일에서 열린 메뉴는 클릭 후 자동으로 닫힙니다.'
  },
  {
    name: 'toggleLabel',
    type: 'string',
    default: "'메뉴 열기'",
    description: '닫힌 상태 토글 버튼 aria-label 입니다. 열린 상태는 "메뉴 닫기"입니다.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '있으면 navbar_collapse 안을 통째로 대체합니다. nav · actions · search 를 HTML 계약대로 직접 조합할 때 씁니다.'
  },
  {
    name: 'className · ...props',
    type: 'header attributes',
    default: '—',
    description: '루트(header.navbar)에 합쳐지는 클래스와 속성입니다.'
  }
]

const classes = [
  {
    name: 'navbar · navbar_container',
    type: 'class',
    default: '—',
    description: '루트와 가운데 정렬 컨테이너입니다. 컨테이너는 max-width · min-height · 좌우 패딩을 갖습니다.'
  },
  {
    name: 'navbar_brand · navbar_brand-icon',
    type: 'class',
    default: '—',
    description: '브랜드 링크와 선택적 아이콘입니다. 굵은 글자·호버 시 accent 색입니다.'
  },
  {
    name: 'navbar_toggle · navbar_toggle-icon-open · navbar_toggle-icon-close',
    type: 'class',
    default: '—',
    description: '모바일(≤ md)에서만 보이는 메뉴 버튼입니다. aria-expanded 에 따라 open/close 아이콘이 바뀝니다.'
  },
  {
    name: 'navbar_collapse · navbar_nav · navbar_list · navbar_item · navbar_link',
    type: 'class',
    default: '—',
    description: '접히는 영역과 메뉴 리스트·링크입니다. 활성 링크는 is-active 입니다.'
  },
  {
    name: 'navbar_actions · navbar_search',
    type: 'class',
    default: '—',
    description: '우측 액션 줄과 검색 입력 래퍼입니다. search 안 .input 패딩이 약간 줄어듭니다.'
  },
  {
    name: 'navbar_sticky · navbar_borderless · navbar_dark · navbar_sm · navbar_lg',
    type: 'class',
    default: '—',
    description: '고정 · 테두리 없음 · 다크 톤 · 높이 sm/lg 변형입니다.'
  },
  {
    name: 'is-open · is-active',
    type: 'class',
    default: '—',
    description: 'is-open 은 모바일 메뉴 열림(루트 또는 collapse), is-active 는 현재 페이지 링크입니다.'
  },
  {
    name: 'navbar_demo · navbar_demo-scroll',
    type: 'class',
    default: '—',
    description: '가이드용 데모 래퍼입니다. demo-scroll 은 짧은 스크롤 영역에서 sticky 동작을 보여 줍니다.'
  }
]

const tokens = [
  {
    name: '--navbar-height · --navbar-height-sm · --navbar-height-lg',
    type: 'length',
    default: 'var(--header-height) · 3rem · 4rem',
    description: '컨테이너 최소 높이입니다. sm · lg 클래스가 바꿉니다.'
  },
  {
    name: '--navbar-padding-x · --navbar-gap',
    type: 'length',
    default: 'var(--space-lg) · var(--space-md)',
    description: '컨테이너 좌우 패딩과 brand · collapse · actions 간격입니다.'
  },
  {
    name: '--navbar-brand-font-size · --navbar-brand-font-weight',
    type: 'length · number',
    default: 'var(--text-size-lg) · 700',
    description: '브랜드 글자 크기와 굵기입니다.'
  },
  {
    name: '--navbar-link-padding-y · --navbar-link-padding-x · --navbar-link-font-weight',
    type: 'length · number',
    default: '0.35rem · 0.5rem · 500',
    description: '메뉴 링크 패딩과 기본 굵기입니다. is-active 는 600입니다.'
  },
  {
    name: '--navbar-search-width · --navbar-search-width-lg',
    type: 'length',
    default: '12rem · 16rem',
    description: '검색 영역 기준 너비입니다. md 이상에서 lg 값이 쓰입니다.'
  }
]

export const navbarApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Navbar props입니다. 기본 브랜드는 Logo 이며, items · actions · 변형 클래스로 구성합니다.',
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
