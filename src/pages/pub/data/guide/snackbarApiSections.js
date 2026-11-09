/**
 * Snackbar 가이드 — API · Props / Events / 클래스 / 디자인 토큰
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
    type: "'info' | 'success' | 'warning' | 'error' | 'danger'",
    default: "'info'",
    description: '스낵바 색입니다. danger 는 error 와 같은 위험 스타일(color_error)을 씁니다.'
  },
  {
    name: 'message · children',
    type: 'ReactNode',
    default: '—',
    description: '표시할 문구입니다. children 이 있으면 message 보다 우선합니다.'
  },
  {
    name: 'round',
    type: 'boolean',
    default: 'false',
    description: 'true 이면 알약(pill) 모양의 둥근 모서리로 표시합니다.'
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
    description: 'true 이면 닫기(×) 버튼을 표시하고, 누르면 스낵바를 숨깁니다.'
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
    name: 'className · ...props',
    type: 'div attributes',
    default: '—',
    description: '루트 클래스와 네이티브 div 속성입니다. role 은 error 일 때 alert, 그 외에는 status 입니다.'
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
    type: '() => void',
    default: '—',
    description: '닫기 요청 시 호출됩니다(onOpenChange(false) 와 함께). 실제 표시는 open 제어 부모가 결정합니다.'
  }
]

const classes = [
  {
    name: 'snackbar · snackbar_message',
    type: 'class',
    default: '—',
    description: '스낵바 루트와 문구 영역입니다.'
  },
  {
    name: 'snackbar_icon · snackbar_action · snackbar_close',
    type: 'class',
    default: '—',
    description: '아이콘·액션·닫기 버튼 영역입니다.'
  },
  {
    name: 'snackbar_round · snackbar_sm · snackbar_lg',
    type: 'class',
    default: '—',
    description: '둥근 모서리와 크기 변형입니다.'
  },
  {
    name: 'snackbar_region · snackbar_region-{placement}',
    type: 'class',
    default: '—',
    description: '여러 스낵바를 화면 모서리에 쌓는 고정 영역입니다.'
  },
  {
    name: 'color_info · color_success · color_warning · color_error',
    type: 'class',
    default: '—',
    description: '공통 색상 클래스입니다. 루트 .snackbar 와 함께 씁니다.'
  }
]

const tokens = [
  {
    name: '--snackbar-min-width · --snackbar-max-width',
    type: 'length',
    default: '18rem · 36rem',
    description: '스낵바 최소·최대 너비입니다.'
  },
  {
    name: '--snackbar-padding-y · --snackbar-padding-x',
    type: 'length',
    default: 'var(--space-sm) · var(--space-md)',
    description: '기본 내부 여백입니다. sm · lg 는 -sm · -lg 접미사 토큰을 씁니다.'
  },
  {
    name: '--snackbar-gap · --snackbar-font-size · --snackbar-line-height',
    type: 'length · number',
    default: 'var(--space-sm) · var(--text-size-base) · 1.5',
    description: '요소 간격과 글자 크기·행간입니다.'
  },
  {
    name: '--snackbar-icon-size · --snackbar-close-size',
    type: 'length',
    default: '1.25rem · 2rem',
    description: '아이콘과 닫기 버튼 크기입니다. 아이콘은 -sm · -lg 변형이 있습니다.'
  },
  {
    name: '--snackbar-round-padding-x',
    type: 'length',
    default: 'var(--space-lg)',
    description: 'round 일 때 좌우 여백입니다.'
  },
  {
    name: '--snackbar-region-offset · --snackbar-region-gap · --snackbar-region-z-index',
    type: 'length · number',
    default: 'var(--space-md) · var(--space-sm) · 1200',
    description: '스낵바 영역의 화면 가장자리 간격·스낵바 사이 간격·z-index 입니다.'
  }
]

export const snackbarApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Snackbar props입니다.',
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
