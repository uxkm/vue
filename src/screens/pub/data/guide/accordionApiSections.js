/**
 * Accordion 가이드 — API · Props / 클래스 / 디자인 토큰
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
    type: 'AccordionItemData[]',
    default: '[]',
    description: '칸 목록입니다. 문자열·숫자 또는 { value, label?, children?, icon?, extra?, content?, disabled? }. content 가 있으면 항목별 패널로 렌더합니다. 비어 있으면 AccordionItem · AccordionPanel 자식을 읽습니다. key 는 value 하위 호환 별칭입니다.'
  },
  {
    name: 'children · AccordionItem · AccordionPanel',
    type: 'ReactNode',
    default: '—',
    description: '메뉴는 items.map → AccordionItem 반복을 권장합니다. AccordionPanel 없이 남은 children 은 열린 칸 단일 슬롯(내용·컴포넌트 교체)으로 씁니다. 항목별 패널이 필요하면 AccordionPanel(value) 또는 items[].content 를 씁니다. Accordion.Item · Accordion.Panel 별칭도 같습니다.'
  },
  {
    name: 'value',
    type: 'string | number | null',
    default: '—',
    description: '열린 칸 value 입니다. 넘기면 제어 모드입니다. 일치하는 칸에 is-open · aria-expanded="true" 가 붙습니다.'
  },
  {
    name: 'defaultValue',
    type: 'string | number | null',
    default: '첫 칸 value',
    description: '비제어 모드 초기 열린 칸입니다. value 를 넘기지 않을 때 씁니다.'
  },
  {
    name: 'onChange',
    type: '(value: string | number | null) => void',
    default: '—',
    description: '열린 칸이 바뀔 때 호출됩니다. 모두 접히면 null 입니다.'
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'true',
    description: 'true 이면 열린 칸을 다시 눌러 모두 접을 수 있습니다.'
  },
  {
    name: 'skin',
    type: "'bordered' | 'flush' | 'card'",
    default: "'bordered'",
    description: '스킨입니다. accordion_bordered · accordion_flush · accordion_card 가 붙습니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '크기입니다. sm · lg 일 때 accordion_sm · accordion_lg 가 붙습니다.'
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
    description: '루트(accordion) 클래스와 속성입니다. 트리거에는 aria-expanded, 패널에는 role="region" 이 붙습니다.'
  }
]

const classes = [
  {
    name: 'accordion · accordion_item · accordion_heading',
    type: 'class',
    default: '—',
    description: '루트 · 한 칸 · 제목(heading) 래퍼입니다. 열린 칸에 is-open, 비활성에 is-disabled 가 붙습니다.'
  },
  {
    name: 'accordion_trigger · accordion_label · accordion_leading · accordion_icon · accordion_extra',
    type: 'class',
    default: '—',
    description: '트리거 버튼 · 라벨 · 앞쪽 아이콘 래퍼 · 펼침 아이콘(chevron) · 오른쪽 부가 영역입니다. accordion_icon 은 --accordion-icon-size 를 씁니다.'
  },
  {
    name: 'accordion_panel · accordion_content',
    type: 'class',
    default: '—',
    description: '패널(region)과 본문 패딩 영역입니다. 닫히면 hidden 입니다.'
  },
  {
    name: 'accordion_bordered · accordion_flush · accordion_card',
    type: 'class',
    default: '—',
    description: '스킨입니다. bordered(기본 테두리) · flush(구분선) · card(칸별 카드)입니다.'
  },
  {
    name: 'accordion_sm · accordion_lg',
    type: 'class',
    default: '—',
    description: '크기 변형입니다.'
  },
  {
    name: 'data-effect="slide"',
    type: 'attr',
    default: '—',
    description: 'effect="slide" 일 때 붙습니다. 패널 height 트랜지션과 overflow: hidden 계약을 켭니다.'
  }
]

const tokens = [
  {
    name: '--accordion-font-size · --accordion-trigger-font-weight',
    type: 'token',
    default: '—',
    description: '본문·트리거 타이포입니다.'
  },
  {
    name: '--accordion-trigger-gap · --accordion-trigger-padding-y/x',
    type: 'token',
    default: '—',
    description: '트리거 간격·패딩입니다.'
  },
  {
    name: '--accordion-content-font-size · --accordion-content-padding-y/x',
    type: 'token',
    default: '—',
    description: '패널 본문 타이포·패딩입니다.'
  },
  {
    name: '--accordion-icon-size · --accordion-card-gap · --accordion-card-trigger-bg',
    type: 'token',
    default: '—',
    description: '아이콘 크기 · 카드 스킨 간격·트리거 배경입니다.'
  },
  {
    name: '--accordion-*-sm/lg · --accordion-slide-duration · --accordion-slide-easing',
    type: 'token',
    default: '—',
    description: '크기별 토큰과 슬라이드 이펙트 타이밍입니다.'
  }
]

export const accordionApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Accordion props입니다. items · value · onChange 로 구성하고, skin · size · effect(slide) · collapsible 으로 형태를 바꿉니다. Tabs 와 같이 map + 단일 슬롯(내용·컴포넌트 교체)을 권장합니다.',
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
