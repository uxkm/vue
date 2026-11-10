/**
 * Switch 가이드 — API · Props / Events / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'label · children',
    type: 'string · ReactNode',
    default: '—',
    description: '레이블 텍스트 또는 사용자 정의 레이블 콘텐츠입니다.'
  },
  {
    name: 'checked',
    type: 'boolean',
    default: '—',
    description: '넘기면(checked !== undefined) 제어 모드입니다. 부모가 켜짐 상태를 관리합니다. onChange 유무와는 무관합니다.'
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    default: 'false',
    description: '비제어 초기 켜짐 상태입니다. checked를 넘기지 않을 때 씁니다.'
  },
  {
    name: 'disabled · labelEnd',
    type: 'boolean',
    default: 'false',
    description: '비활성 상태와 레이블 우선 배치입니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '트랙과 레이블 크기입니다.'
  },
  {
    name: 'ripple',
    type: 'boolean',
    default: 'false',
    description: 'true일 때 data-ripple을 붙여 클릭 파장 효과를 표시합니다.'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: '보이는 레이블이 없는 스위치의 접근 가능한 이름입니다.'
  },
  {
    name: 'name · value · className · ...props',
    type: 'input attributes',
    default: '—',
    description: '폼 값, 루트 클래스, 네이티브 checkbox 속성입니다.'
  }
]

const events = [
  {
    name: 'onChange',
    type: '(event) => void',
    default: '—',
    description: '켜짐 상태 변경 콜백입니다. 제어 모드에서는 e.target.checked로 부모 state를 갱신합니다.'
  }
]

const classes = [
  {
    name: 'switch · switch_control · switch_input',
    type: 'class',
    default: '—',
    description: '스위치 루트와 checkbox 입력입니다.'
  },
  {
    name: 'switch_track · switch_thumb',
    type: 'class',
    default: '—',
    description: '트랙과 이동 손잡이입니다.'
  },
  {
    name: 'switch_sm · switch_lg · switch_label-end · switch_block',
    type: 'class',
    default: '—',
    description: '크기·레이아웃·너비 변형입니다.'
  },
  {
    name: 'switch_group · switch_group_compact · switch_group_block',
    type: 'class',
    default: '—',
    description: '그룹 간격과 너비입니다.'
  }
]

const tokens = [
  {
    name: '--switch-width · --switch-height',
    type: 'length',
    default: '2.75rem · 1.5rem',
    description: '기본 트랙 크기입니다.'
  },
  {
    name: '--switch-width-sm · --switch-width-lg',
    type: 'length',
    default: '2.25rem · 3.25rem',
    description: '크기 변형의 트랙 너비입니다.'
  },
  {
    name: '--switch-gap · --switch-radius',
    type: 'length',
    default: '—',
    description: '레이블 간격과 트랙 모서리입니다.'
  }
]

export const switchApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Switch props입니다.',
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
