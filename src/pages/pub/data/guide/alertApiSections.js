/**
 * Alert 가이드 — API · Props / Events / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'color',
    type: "'info' | 'success' | 'warning' | 'danger' | 'error'",
    default: "'info'",
    description: '알림 색입니다. danger 와 error 는 같은 위험 스타일(color_error)을 씁니다.'
  },
  {
    name: 'type',
    type: 'string',
    default: "''",
    description: 'color 의 이전 이름입니다. 새 코드에서는 color 를 사용합니다. (deprecated)'
  },
  {
    name: 'title',
    type: 'ReactNode',
    default: "''",
    description: '굵게 표시되는 제목입니다.'
  },
  {
    name: 'description · children',
    type: 'ReactNode',
    default: "''",
    description: '본문입니다. children 이 있으면 description 보다 우선합니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '패딩·글자·아이콘 크기입니다.'
  },
  {
    name: 'showIcon · icon',
    type: 'boolean · ReactNode',
    default: 'true · —',
    description: '앞 아이콘 표시 여부와 사용자 정의 아이콘입니다. icon 이 없으면 색별 Icon(info · check-circle · warning · x-circle)을 씁니다.'
  },
  {
    name: 'closable',
    type: 'boolean',
    default: 'false',
    description: 'true 이면 닫기(×) 버튼을 표시하고, 누르면 알림을 숨깁니다.'
  },
  {
    name: 'open',
    type: 'boolean',
    default: '—',
    description: '넘기면 표시 상태를 페이지가 제어합니다. false 이면 렌더하지 않습니다.'
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'true',
    description: '비제어 초기 표시 상태입니다. open 을 넘기지 않을 때 씁니다.'
  },
  {
    name: 'banner',
    type: 'boolean',
    default: 'false',
    description: '모서리와 좌우 테두리를 없애 페이지 상단 배너처럼 표시합니다.'
  },
  {
    name: 'actions',
    type: 'ReactNode',
    default: '—',
    description: '본문 아래에 놓이는 버튼 등 액션 영역입니다.'
  },
  {
    name: 'role',
    type: 'string',
    default: "'alert'",
    description: '루트 role 속성입니다. 덜 긴급한 안내는 role="status" 를 권장합니다.'
  },
  {
    name: 'className · ...props',
    type: 'div attributes',
    default: '—',
    description: '루트 클래스와 네이티브 div 속성입니다.'
  }
]

const events = [
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '—',
    description: '표시 상태가 바뀔 때 호출됩니다. 제어 모드에서는 부모가 open 을 갱신합니다.'
  },
  {
    name: 'onClose',
    type: '(event: MouseEvent<HTMLButtonElement>) => void',
    default: '—',
    description: '닫기 요청 시 호출됩니다(onOpenChange(false) 와 함께). 실제 표시는 open 제어 부모가 결정합니다.'
  }
]

const classes = [
  {
    name: 'alert · alert_body',
    type: 'class',
    default: '—',
    description: '알림 루트와 본문 래퍼입니다.'
  },
  {
    name: 'alert_icon · alert_title · alert_desc · alert_actions · alert_close',
    type: 'class',
    default: '—',
    description: '아이콘·제목·본문·액션·닫기 버튼 영역입니다.'
  },
  {
    name: 'alert_sm · alert_lg · alert_banner',
    type: 'class',
    default: '—',
    description: '크기와 배너 변형입니다.'
  },
  {
    name: 'color_info · color_success · color_warning · color_error',
    type: 'class',
    default: '—',
    description: '공통 색상 클래스입니다. 루트 .alert 와 함께 씁니다.'
  }
]

const tokens = [
  {
    name: '--alert-padding-y · --alert-padding-x',
    type: 'length',
    default: 'var(--space-md) · var(--space-lg)',
    description: '기본 내부 여백입니다. sm · lg 는 -sm · -lg 접미사 토큰을 씁니다.'
  },
  {
    name: '--alert-gap · --alert-font-size · --alert-line-height',
    type: 'length · number',
    default: 'var(--space-md) · var(--text-size-base) · 1.5',
    description: '요소 간격과 글자 크기·행간입니다.'
  },
  {
    name: '--alert-title-weight · --alert-title-gap · --alert-desc-opacity',
    type: 'number · length',
    default: '600 · var(--space-xs) · 0.85',
    description: '제목 굵기·제목 아래 간격과 본문 불투명도입니다.'
  },
  {
    name: '--alert-icon-size · --alert-close-size',
    type: 'length',
    default: '1.25rem',
    description: '아이콘과 닫기 버튼 크기입니다. -sm · -lg 변형이 있습니다.'
  },
  {
    name: '--alert-actions-gap · --alert-actions-margin-top',
    type: 'length',
    default: 'var(--space-sm)',
    description: '액션 영역의 버튼 간격과 위쪽 여백입니다.'
  }
]

export const alertApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Alert props입니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · Events',
    tables: [{ columns, rows: events }]
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
