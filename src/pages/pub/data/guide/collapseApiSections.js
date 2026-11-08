/**
 * Collapse 가이드 — API · Props / 클래스 / 디자인 토큰
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
    type: 'CollapseItemData[]',
    default: '[]',
    description: '칸 목록입니다. 문자열·숫자 또는 { value, label?, children?, icon?, extra?, content?, disabled? }. content 가 있으면 항목별 패널로 렌더합니다. 비어 있으면 CollapseItem · CollapsePanel 자식을 읽습니다. key 는 value 하위 호환 별칭입니다.'
  },
  {
    name: 'children · CollapseItem · CollapsePanel',
    type: 'ReactNode',
    default: '—',
    description: '메뉴는 items.map → CollapseItem 반복을 권장합니다. 여러 칸을 동시에 열 수 있으므로 칸별 CollapsePanel(value) 또는 items[].content 를 권장합니다. 남은 children 은 열린 칸 공통 슬롯으로 쓸 수 있습니다. Collapse.Item · Collapse.Panel 별칭도 같습니다.'
  },
  {
    name: 'value',
    type: '(string | number)[]',
    default: '—',
    description: '열린 칸 value 배열입니다. 넘기면 제어 모드입니다. 일치하는 칸에 is-open · aria-expanded="true" 가 붙습니다. Accordion 과 달리 여러 칸을 동시에 열 수 있습니다.'
  },
  {
    name: 'defaultValue',
    type: '(string | number)[]',
    default: '[첫 칸 value]',
    description: '비제어 모드 초기 열린 칸 목록입니다. value 를 넘기지 않을 때 씁니다.'
  },
  {
    name: 'onChange',
    type: '(value: (string | number)[]) => void',
    default: '—',
    description: '열린 칸 목록이 바뀔 때 호출됩니다.'
  },
  {
    name: 'skin',
    type: "'bordered' | 'ghost' | 'card'",
    default: "'bordered'",
    description: '스킨입니다. collapse_bordered · collapse_ghost · collapse_card 가 붙습니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '크기입니다. sm · lg 일 때 collapse_sm · collapse_lg 가 붙습니다.'
  },
  {
    name: 'effect',
    type: "'none' | 'slide'",
    default: "'none'",
    description: 'slide 이면 data-effect="slide" 와 함께 펼침·접힘 시 패널 높이(height)를 슬라이드합니다. prefers-reduced-motion 이면 즉시 전환합니다.'
  },
  {
    name: 'renderItem',
    type: '(item, state) => ReactNode',
    default: '—',
    description: '트리거 내부를 커스텀합니다. state 는 { open, toggle } 입니다.'
  },
  {
    name: 'renderPanel',
    type: '(item, state) => ReactNode',
    default: '—',
    description: '패널 본문을 커스텀합니다. state 는 { open } 입니다.'
  },
  {
    name: 'className · …rest',
    type: 'string · HTMLAttributes',
    default: '—',
    description: '루트(collapse_group) 클래스와 속성입니다. 트리거에는 aria-expanded, 본문에는 role="region" 이 붙습니다.'
  }
]

const classes = [
  {
    name: 'collapse_group · collapse_panel · collapse_header',
    type: 'class',
    default: '—',
    description: '그룹 루트 · 한 칸 · 헤더 래퍼입니다. 열린 칸에 is-open, 비활성에 is-disabled 가 붙습니다. 너비는 100%입니다.'
  },
  {
    name: 'collapse_trigger · collapse_label · collapse_leading · collapse_icon · collapse_extra',
    type: 'class',
    default: '—',
    description: '트리거 버튼 · 라벨 · 앞쪽 아이콘 래퍼 · 펼침 아이콘(chevron) · 오른쪽 부가 영역입니다.'
  },
  {
    name: 'collapse_body · collapse_content',
    type: 'class',
    default: '—',
    description: '패널(region)과 본문 패딩 영역입니다. 닫히면 hidden 입니다.'
  },
  {
    name: 'collapse_bordered · collapse_ghost · collapse_card',
    type: 'class',
    default: '—',
    description: '스킨입니다. bordered(기본 테두리) · ghost · card 입니다.'
  },
  {
    name: 'collapse_sm · collapse_lg',
    type: 'class',
    default: '—',
    description: '크기 변형입니다.'
  },
  {
    name: 'data-effect="slide"',
    type: 'attr',
    default: '—',
    description: 'effect="slide" 일 때 붙습니다. 패널 height 트랜지션과 overflow: hidden 계약을 켭니다.'
  },
  {
    name: 'collapse',
    type: 'class',
    default: '—',
    description: '독립 접기 영역(그룹 밖)용 구조 클래스입니다. data-effect="slide" 와 함께 쓸 수 있습니다.'
  }
]

const tokens = [
  {
    name: '--collapse-font-size · --collapse-trigger-font-weight',
    type: 'token',
    default: '—',
    description: '본문·트리거 타이포입니다.'
  },
  {
    name: '--collapse-trigger-gap · --collapse-trigger-padding-y/x',
    type: 'token',
    default: '—',
    description: '트리거 간격·패딩입니다.'
  },
  {
    name: '--collapse-content-font-size · --collapse-content-padding-*',
    type: 'token',
    default: '—',
    description: '패널 본문 타이포·패딩입니다.'
  },
  {
    name: '--collapse-icon-size · --collapse-card-gap',
    type: 'token',
    default: '—',
    description: '아이콘 크기 · 카드 스킨 간격입니다.'
  },
  {
    name: '--collapse-*-sm/lg · --collapse-slide-duration · --collapse-slide-easing',
    type: 'token',
    default: '—',
    description: '크기별 토큰과 슬라이드 이펙트 타이밍입니다.'
  }
]

export const collapseApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Collapse props입니다. items · value(배열) · onChange 로 구성하고, skin · size · effect(slide) 로 형태를 바꿉니다. Accordion 과 달리 여러 칸을 동시에 열 수 있습니다.',
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
