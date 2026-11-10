/**
 * Tabs 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'tabs',
    type: 'TabItem[]',
    default: '[]',
    description: "탭 목록입니다. 문자열·숫자 또는 { value, label?, children?, icon?, content?, disabled?, closable?, closeLabel? }. content 가 있으면 항목별 패널로 렌더합니다. 비어 있으면 Tab · TabPanel 자식을 읽습니다."
  },
  {
    name: 'renderTab',
    type: '(tab, state) => ReactNode',
    default: '—',
    description: '탭 버튼 내부를 커스텀합니다. state 는 { active, disabled, select, close? } 입니다.'
  },
  {
    name: 'renderPanel',
    type: '(tab, state) => ReactNode',
    default: '—',
    description: '멀티 패널일 때 패널 본문을 커스텀합니다. state 는 { active } 입니다.'
  },
  {
    name: 'children · Tab · TabPanel',
    type: 'ReactNode',
    default: '—',
    description: '메뉴는 tabs.map → Tab 반복을 권장합니다. TabPanel 없이 남은 children 은 활성 패널 단일 슬롯(내용·컴포넌트 교체)으로 씁니다. 항목별 패널이 필요하면 TabPanel(value) 또는 tabs[].content 를 씁니다. Tabs.Tab · Tabs.Panel 별칭도 같습니다.'
  },
  {
    name: 'value · defaultValue',
    type: 'string | number',
    default: '— · 첫 사용 가능 탭',
    description: '선택된 탭 value 입니다. value 를 넘기면 제어하고, 생략하면 defaultValue(또는 첫 탭)와 내부 상태로 동작합니다.'
  },
  {
    name: 'onChange',
    type: '(value: string | number) => void',
    default: '—',
    description: '탭을 고를 때 호출됩니다. 같은 값을 다시 눌러도 호출되지 않습니다. 비제어 모드에서도 내부 활성 탭이 갱신됩니다.'
  },
  {
    name: 'onClose',
    type: '(value: string | number) => void',
    default: '—',
    description: '닫기(×)를 눌렀을 때 호출됩니다. closable 또는 항목 closable 이 있을 때 표시됩니다.'
  },
  {
    name: 'variant',
    type: "'line' | 'card' | 'pill'",
    default: "'line'",
    description: '스킨입니다. tabs_line · tabs_card · tabs_pill 이 붙습니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '크기입니다. sm · lg 일 때 tabs_sm · tabs_lg 가 붙습니다.'
  },
  {
    name: 'layout',
    type: "'auto' | 'equal' | 'scroll'",
    default: "'auto'",
    description: '가로 배치입니다. equal → tabs_equal(균등), scroll → tabs_scroll-nav(좌·우 이전/다음 · 가장자리 딤).'
  },
  {
    name: 'vertical',
    type: 'boolean',
    default: 'false',
    description: 'tabs_vertical 을 붙여 세로 탭으로 배치합니다.'
  },
  {
    name: 'scrollable',
    type: 'boolean',
    default: 'false',
    description: 'layout=\"auto\" 일 때 tabs_scrollable(스크롤바)을 붙입니다. layout=\"scroll\" 의 이전/다음 네비와는 별개입니다.'
  },
  {
    name: 'indicatorSlide',
    type: 'boolean',
    default: 'false',
    description: 'true 이면 tabs_indicator-slide 와 tabs_indicator 가 붙고, 활성 탭을 따라 인디케이터가 이동합니다. line(밑줄·세로면 옆줄) · pill(배경)에 맞습니다.'
  },
  {
    name: 'navFade',
    type: 'boolean',
    default: 'false',
    description: 'layout=\"scroll\" 일 때 좌·우 가장자리 딤입니다. true 이면 tabs_nav-fade 와 is-fade-start · is-fade-end 가 붙습니다.'
  },
  {
    name: 'navSelect',
    type: 'boolean',
    default: 'false',
    description: 'layout=\"scroll\" 일 때 이전/다음(Icon button) 클릭으로 인접 활성 탭을 선택합니다. false(기본)면 목록만 가로 스크롤합니다.'
  },
  {
    name: 'navVariant',
    type: "'outline' | 'ghost' | 'soft'",
    default: "'outline'",
    description: '좌·우 네비 Icon button 스킨입니다. tabs_nav-outline · tabs_nav-ghost · tabs_nav-soft 가 붙습니다.'
  },
  {
    name: 'navColor',
    type: "IconColor | ''",
    default: "''",
    description: '좌·우 네비 Icon color 입니다. primary · muted · danger 등 color_* 가 붙습니다.'
  },
  {
    name: 'navClassName',
    type: 'string',
    default: "''",
    description: '좌·우 네비 버튼에 추가할 클래스입니다.'
  },
  {
    name: 'closable',
    type: 'boolean',
    default: 'false',
    description: '모든 탭에 닫기 버튼을 붙입니다. 개별 항목의 closable 로도 지정할 수 있습니다.'
  },
  {
    name: 'extra',
    type: 'ReactNode',
    default: '—',
    description: 'tabs_bar 오른쪽(tabs_extra)에 두는 부가 콘텐츠입니다. 예: 액션 버튼.'
  },
  {
    name: 'label',
    type: 'string',
    default: "'섹션'",
    description: 'tablist 의 aria-label 입니다.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '활성 탭 패널(tabs_panel) 내용입니다. 없으면 패널을 렌더링하지 않습니다.'
  },
  {
    name: 'className · ...props',
    type: 'div attributes',
    default: '—',
    description: '루트(tabs) 클래스와 속성입니다. 탭에는 role=\"tab\", 목록에는 role=\"tablist\", 패널에는 role=\"tabpanel\" 이 붙습니다.'
  }
]

const classes = [
  {
    name: 'tabs · tabs_bar · tabs_list-wrap · tabs_list',
    type: 'class',
    default: '—',
    description: '루트, 탭 바, 목록 래퍼, 탭 목록입니다.'
  },
  {
    name: 'tabs_tab · tabs_label · tabs_icon · tabs_close · tabs_extra',
    type: 'class',
    default: '—',
    description: '탭 버튼, 라벨, 아이콘, 닫기, 바 오른쪽 부가 영역입니다.'
  },
  {
    name: 'tabs_panels · tabs_panel',
    type: 'class',
    default: '—',
    description: '패널 묶음과 본문 영역입니다.'
  },
  {
    name: 'tabs_line · tabs_card · tabs_pill',
    type: 'class',
    default: '—',
    description: '라인 · 카드 · 필 스킨입니다.'
  },
  {
    name: 'tabs_indicator-slide · tabs_indicator',
    type: 'class',
    default: '—',
    description: '슬라이딩 인디케이터 모드와 이동 막대입니다. line · pill 스킨과 함께 씁니다.'
  },
  {
    name: 'tabs_scroll-nav · tabs_scroll-viewport · tabs_nav',
    type: 'class',
    default: '—',
    description: '이전/다음 네비입니다. tabs_nav 는 Icon button(icon_button)입니다. 끝·첫 탭에서는 disabled 입니다.'
  },
  {
    name: 'tabs_nav-outline · tabs_nav-ghost · tabs_nav-soft',
    type: 'class',
    default: '—',
    description: 'navVariant 에 대응하는 네비 버튼 스킨입니다.'
  },
  {
    name: 'tabs_nav-fade · is-fade-start · is-fade-end',
    type: 'class',
    default: '—',
    description: 'navFade 옵션일 때 붙는 가장자리 딤 클래스입니다.'
  },
  {
    name: 'tabs_sm · tabs_lg · tabs_equal · tabs_scrollable · tabs_vertical',
    type: 'class',
    default: '—',
    description: '크기 · 균등 분할 · 스크롤바 · 세로 배치 변형입니다.'
  },
  {
    name: 'is-active · is-disabled',
    type: 'class',
    default: '—',
    description: '선택 · 비활성 탭 상태입니다. 선택은 aria-selected 와 함께 둡니다.'
  }
]

const tokens = [
  {
    name: '--tabs-font-size · --tabs-font-weight · --tabs-font-weight-active',
    type: 'size · number',
    default: 'sm · 500 · 600',
    description: '탭 글자 크기와 기본·활성 굵기입니다.'
  },
  {
    name: '--tabs-gap · --tabs-bar-gap · --tabs-tab-padding-y · --tabs-tab-padding-x',
    type: 'length',
    default: 'xs · md · 0.625rem · 1rem',
    description: '탭 간격, 바 간격, 탭 안쪽 여백입니다.'
  },
  {
    name: '--tabs-indicator-height · --tabs-panel-padding-y · --tabs-icon-size',
    type: 'length',
    default: '2px · lg · 1rem',
    description: '라인 인디케이터 두께, 패널 위 여백, 아이콘 크기입니다.'
  },
  {
    name: '--tabs-font-size-sm/lg · --tabs-tab-padding-*-sm/lg · --tabs-icon-size-sm/lg',
    type: 'length',
    default: '—',
    description: 'sm · lg 크기 토큰입니다.'
  }
]

export const tabsApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Tabs props입니다. tabs · value · onChange 로 구성하고, variant · size · vertical · layout · navFade · navSelect · navVariant · navColor 으로 형태를 바꿉니다.',
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
