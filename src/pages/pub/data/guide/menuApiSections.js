/**
 * Menu 가이드 — API · Props / 클래스 / 디자인 토큰
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
    type: 'MenuItem[]',
    default: '[]',
    description: "메뉴 데이터입니다. { key, label, href?, active?, disabled?, icon?, extra?, children?, defaultOpen?, type?: 'item'|'divider'|'group', title? }. children 이 있으면 서브메뉴 버튼으로 렌더링됩니다."
  },
  {
    name: 'direction',
    type: "'vertical' | 'horizontal'",
    default: "'vertical'",
    description: '방향입니다. vertical 이면 menu_vertical(기본 세로 리스트), horizontal 이면 menu_horizontal(가로 · 서브메뉴 드롭다운)입니다.'
  },
  {
    name: 'bordered',
    type: 'boolean',
    default: 'false',
    description: 'menu_bordered 를 붙여 패딩·테두리·surface 배경을 줍니다.'
  },
  {
    name: 'compact',
    type: 'boolean',
    default: 'false',
    description: 'menu_compact 를 붙여 항목 패딩·아이콘 크기를 줄입니다.'
  },
  {
    name: 'dark',
    type: 'boolean',
    default: 'false',
    description: 'menu_dark 를 붙여 surface 배경·subtle 테두리 톤으로 바꿉니다.'
  },
  {
    name: 'label',
    type: 'string',
    default: "'주요 메뉴'",
    description: 'nav 의 aria-label 입니다.'
  },
  {
    name: 'selectedKey',
    type: 'string | null',
    default: '—',
    description: '선택 키(제어). 넘기면 해당 항목에 is-active 가 붙습니다. 부모가 선택 상태를 관리합니다.'
  },
  {
    name: 'defaultSelectedKey',
    type: 'string',
    default: '—',
    description: '비제어 초기 선택 키입니다. selectedKey 를 넘기지 않을 때 씁니다.'
  },
  {
    name: 'onSelect',
    type: '(key: string, item: MenuItem, event) => void',
    default: '—',
    description: '항목 클릭 시 호출됩니다. 페이지에서 라우팅·액션·선택 상태를 제어할 때 씁니다.'
  },
  {
    name: 'openKeys',
    type: 'string[]',
    default: '—',
    description: '열린 서브메뉴 키 목록(제어). 넘기면 부모가 펼침 상태를 관리합니다.'
  },
  {
    name: 'defaultOpenKeys',
    type: 'string[]',
    default: '—',
    description: '비제어 초기 열린 서브메뉴 키입니다. openKeys 를 넘기지 않을 때 씁니다. 없으면 items 의 defaultOpen 을 수집합니다.'
  },
  {
    name: 'onOpenChange',
    type: '(openKeys: string[]) => void',
    default: '—',
    description: '서브메뉴 열림이 바뀔 때 호출됩니다.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '있으면 items 대신 nav 안을 통째로 대체합니다. menu_list 마크업을 직접 쓸 때 활용합니다.'
  },
  {
    name: 'className · ...props',
    type: 'nav attributes',
    default: '—',
    description: '루트(nav.menu)에 합쳐지는 클래스와 속성입니다.'
  }
]

const classes = [
  {
    name: 'menu · menu_list · menu_item · menu_link',
    type: 'class',
    default: '—',
    description: '루트, 목록, 항목, 링크(또는 서브메뉴 버튼)입니다. 활성은 is-active · aria-current="page", 비활성은 is-disabled 입니다.'
  },
  {
    name: 'menu_icon · menu_label · menu_arrow · menu_extra',
    type: 'class',
    default: '—',
    description: '링크 안 아이콘, 말줄임 라벨, 서브메뉴 화살표, 우측 부가 영역입니다.'
  },
  {
    name: 'menu_item-submenu · menu_submenu',
    type: 'class',
    default: '—',
    description: '서브메뉴 항목과 하위 목록입니다. aria-expanded="false" 이면 submenu 가 숨겨지고, 화살표는 접힘 때 아래(90deg)·펼침 때 위(270deg)를 가리킵니다. 가로 메뉴에서는 절대 위치 드롭다운입니다.'
  },
  {
    name: 'menu_divider · menu_group · menu_group-title',
    type: 'class',
    default: '—',
    description: '구분선과 그룹·그룹 제목입니다. 가로는 divider 가 세로 막대로 바뀝니다.'
  },
  {
    name: 'menu_vertical · menu_horizontal · menu_bordered · menu_compact · menu_dark',
    type: 'class',
    default: '—',
    description: '방향·테두리·밀집·다크 톤 변형입니다. vertical 은 기본 세로 레이아웃 표시용 클래스입니다.'
  },
  {
    name: 'menu_demo-row · menu_demo-sidebar · menu_demo-content',
    type: 'class',
    default: '—',
    description: '가이드용 사이드바+콘텐츠 데모 레이아웃입니다.'
  }
]

const tokens = [
  {
    name: '--menu-width · --menu-padding · --menu-gap',
    type: 'length',
    default: '16rem · var(--space-sm) · 2px',
    description: '기본 최대 너비, bordered 패딩, 항목 간격입니다.'
  },
  {
    name: '--menu-font-size · --menu-link-font-weight',
    type: 'length · number',
    default: 'var(--text-size-sm) · 500',
    description: '메뉴 글자 크기와 링크 기본 굵기입니다. 활성은 600입니다.'
  },
  {
    name: '--menu-item-padding-y · --menu-item-padding-x',
    type: 'length',
    default: '0.5rem · 0.75rem',
    description: '링크 패딩입니다. compact 가 더 작게 바꿉니다.'
  },
  {
    name: '--menu-icon-size · --menu-arrow-size · --menu-submenu-indent',
    type: 'length',
    default: '1rem · 0.875rem · 1.75rem',
    description: '아이콘·화살표 크기와 세로 서브메뉴 들여쓰기입니다.'
  },
  {
    name: '--menu-divider-margin-y · --menu-group-padding-y · --menu-group-font-size',
    type: 'length',
    default: 'var(--space-xs) · var(--space-sm) · 0.6875rem',
    description: '구분선 여백과 그룹 제목 패딩·글자 크기입니다.'
  }
]

export const menuApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Menu props입니다. items 로 링크·서브메뉴·그룹·구분선을 구성하고, selectedKey · onSelect · openKeys · onOpenChange 로 페이지에서 선택·펼침을 제어합니다.',
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
