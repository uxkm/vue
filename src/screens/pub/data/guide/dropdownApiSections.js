/**
 * Dropdown 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'label',
    type: 'ReactNode',
    default: "'메뉴'",
    description: '트리거 버튼(dropdown_trigger) 라벨입니다. 선택 모드에서 값이 없고 placeholder 도 없으면 이 문구를 씁니다.'
  },
  {
    name: 'items',
    type: 'DropdownItem[]',
    default: '[]',
    description: "메뉴 항목입니다. { key, label?, disabled?, danger?, icon?, type?: 'item'|'divider', onSelect? }. type=\"divider\" 이면 구분선입니다."
  },
  {
    name: 'value',
    type: 'string | null',
    default: '—',
    description: '선택 모드(셀렉트 역할)의 제어 값입니다. 선택된 item.key 이며, 트리거 라벨이 해당 item.label 로 바뀝니다. null 이면 미선택입니다.'
  },
  {
    name: 'defaultValue',
    type: 'string',
    default: '—',
    description: '비제어 선택 모드의 초기 item.key 입니다. value 를 넘기지 않을 때 내부 상태로 유지됩니다.'
  },
  {
    name: 'onChange',
    type: '(key: string, item: DropdownItem) => void',
    default: '—',
    description: '항목 선택 시 호출됩니다. value · defaultValue · onChange 중 하나라도 있으면 선택 모드로 동작하며, 루트에 dropdown_selectable 이 붙습니다.'
  },
  {
    name: 'onSelect',
    type: '(key: string, item: DropdownItem) => void',
    default: '—',
    description: '메뉴 항목 클릭 시 호출됩니다. 페이지에서 액션(라우팅·모달·로그아웃 등)을 제어할 때 씁니다. onChange 와 달리 넘겨도 셀렉트 모드로 바뀌지 않으며, 항목별 items[].onSelect 보다 먼저 호출됩니다.'
  },
  {
    name: 'placeholder',
    type: 'ReactNode',
    default: '—',
    description: '선택 모드에서 값이 없을 때 트리거에 보이는 문구입니다. 없으면 label 을 씁니다. 미선택이면 루트에 is-placeholder 가 붙습니다.'
  },
  {
    name: 'open',
    type: 'boolean',
    default: '—',
    description: '넘기면 제어 모드로 열림 상태를 부모가 관리합니다. 없으면 내부 상태로 토글합니다. 열리면 루트에 is-open 이 붙습니다.'
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '—',
    description: '열림 상태가 바뀔 때 호출됩니다(트리거 토글·항목 선택·바깥 클릭·Escape).'
  },
  {
    name: 'placement',
    type: "'bottom' | 'bottom-end' | 'bottom-center' | 'top' | 'top-end' | 'top-center' | 'left' | 'left-top' | 'left-bottom' | 'right' | 'right-top' | 'right-bottom'",
    default: "'bottom'",
    description: '패널 위치입니다. left/right 기본은 세로 center 이고, left-top · left-bottom · right-top · right-bottom 은 트리거 상·하 정렬입니다. 각각 dropdown_placement-* 가 붙습니다.'
  },
  {
    name: 'offset',
    type: "'none' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '트리거와 패널 사이 간격입니다. none · sm · lg 는 dropdown_offset-* 를 붙이고, md(기본)는 --dropdown-offset 토큰을 그대로 씁니다. 임의 길이는 style 의 --dropdown-offset 으로 덮어씁니다.'
  },
  {
    name: 'block',
    type: 'boolean',
    default: 'false',
    description: 'dropdown_block 을 붙여 트리거·메뉴 너비를 100%로 맞춥니다.'
  },
  {
    name: 'fit',
    type: 'boolean',
    default: 'false',
    description: 'dropdown_fit 을 붙입니다. triggerVariant=\"select\" 와 함께 쓰면 트리거 최소 너비(--dropdown-min-width)가 적용됩니다.'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: '루트에 is-disabled 를 붙이고 트리거를 비활성화합니다.'
  },
  {
    name: 'maxVisibleItems',
    type: 'number',
    default: '—',
    description: '넘기면 dropdown_menu-scrollable 과 --dropdown-max-visible-items 가 적용되어 메뉴 목록이 스크롤됩니다.'
  },
  {
    name: 'closeOnOutsideClick',
    type: 'boolean',
    default: 'true',
    description: 'true 이면 트리거·메뉴 바깥을 누를 때 닫힙니다.'
  },
  {
    name: 'triggerVariant',
    type: "'filled' | 'outline' | 'ghost' | 'text' | 'select'",
    default: "'outline'",
    description: '트리거 Button variant 입니다. 선택 모드에서도 select · outline · filled · ghost 등을 쓸 수 있습니다. select 이면 캐럿이 열림 상태에 따라 회전합니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '트리거 Button 크기입니다.'
  },
  {
    name: 'className · ...props',
    type: 'div attributes',
    default: '—',
    description: '루트(dropdown) 클래스와 속성입니다. 트리거에는 aria-haspopup=\"menu\" · aria-expanded · aria-controls 가 붙고, 메뉴에는 role=\"menu\" 가 지정됩니다.'
  }
]

const classes = [
  {
    name: 'dropdown · dropdown_trigger · dropdown_menu',
    type: 'class',
    default: '—',
    description: '루트, 트리거 버튼, 메뉴 패널입니다. 열리면 루트에 is-open 이 붙고 패널이 표시됩니다.'
  },
  {
    name: 'dropdown_placement-end · dropdown_placement-bottom-center · dropdown_placement-top · dropdown_placement-top-center',
    type: 'class',
    default: '—',
    description: '아래·위 배치입니다. end는 오른쪽 정렬, center는 가운데, top은 위입니다.'
  },
  {
    name: 'dropdown_placement-left · dropdown_placement-left-top · dropdown_placement-left-bottom · dropdown_placement-right · dropdown_placement-right-top · dropdown_placement-right-bottom',
    type: 'class',
    default: '—',
    description: '좌·우 배치입니다. left/right 기본은 세로 center, *-top · *-bottom 은 트리거 상·하 정렬입니다.'
  },
  {
    name: 'dropdown_offset-none · dropdown_offset-sm · dropdown_offset-lg',
    type: 'class',
    default: '—',
    description: '트리거와 패널 사이 간격입니다. none=0, sm=--dropdown-offset-sm, lg=--dropdown-offset-lg.'
  },
  {
    name: 'dropdown_block · dropdown_fit',
    type: 'class',
    default: '—',
    description: '가로 100% 레이아웃, select 트리거 최소 너비입니다.'
  },
  {
    name: 'dropdown_menu-scrollable',
    type: 'class',
    default: '—',
    description: 'maxVisibleItems 지정 시 menu_list 에 최대 높이와 세로 스크롤을 줍니다.'
  },
  {
    name: 'is-open · is-disabled · is-placeholder',
    type: 'class',
    default: '—',
    description: '열림 · 비활성 · 선택 모드 미선택(placeholder) 상태입니다.'
  },
  {
    name: 'dropdown_selectable',
    type: 'class',
    default: '—',
    description: 'value · defaultValue · onChange 로 선택 모드일 때 루트에 붙습니다. 항목은 menuitemradio · is-active 로 표시됩니다.'
  },
  {
    name: 'menu · menu_vertical · menu_compact · menu_list · menu_link',
    type: 'class',
    default: '—',
    description: '패널 안 메뉴 목록 구조입니다. 위험 항목은 menu_link.color_danger, 선택 항목은 menu_link.is-active 를 씁니다.'
  }
]

const tokens = [
  {
    name: '--dropdown-min-width · --dropdown-menu-width',
    type: 'length',
    default: '10rem · auto',
    description: '패널 최소 너비와 너비입니다.'
  },
  {
    name: '--dropdown-padding',
    type: 'length',
    default: 'var(--space-xs)',
    description: '패널 안쪽 여백입니다.'
  },
  {
    name: '--dropdown-offset · --dropdown-offset-sm · --dropdown-offset-md · --dropdown-offset-lg',
    type: 'length',
    default: 'space-xs · 2xs · xs · md',
    description: '트리거와 패널 사이 기본·sm·md·lg 간격입니다. offset prop · dropdown_offset-* · style 로 바꿉니다.'
  },
  {
    name: '--dropdown-item-line-height · --dropdown-max-visible-items',
    type: 'number',
    default: '1.4 · —',
    description: '항목 줄 높이와 스크롤 시 보이는 최대 항목 수입니다.'
  },
  {
    name: '--z-dropdown',
    type: 'number',
    default: '100',
    description: '패널 쌓임 순서입니다.'
  }
]

export const dropdownApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Dropdown props입니다. items 로 메뉴를 구성하고, placement · block · maxVisibleItems 로 형태를 바꿉니다.',
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
