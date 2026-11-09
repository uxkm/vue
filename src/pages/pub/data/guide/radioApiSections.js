/**
 * Radio 가이드 — API · Props / Events / 클래스 / 디자인 토큰
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
    name: 'name · value',
    type: 'string',
    default: '—',
    description: '라디오 그룹 이름과 제출 값입니다.'
  },
  {
    name: 'checked',
    type: 'boolean',
    default: '—',
    description: '넘기면(checked !== undefined) 제어 모드입니다. 부모가 선택 상태를 관리합니다. onChange 유무와는 무관합니다.'
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    default: 'false',
    description: '비제어 초기 선택 상태입니다. checked를 넘기지 않을 때 씁니다.'
  },
  {
    name: 'disabled · labelEnd · button',
    type: 'boolean',
    default: 'false',
    description: '비활성, 레이블 배치, 버튼형 변형입니다.'
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
    description: '보이는 레이블이 없는 단독 라디오의 접근 가능한 이름입니다.'
  },
  {
    name: 'className · ...props',
    type: 'string · input attributes',
    default: '—',
    description: '루트 클래스와 네이티브 radio 속성입니다.'
  }
]

const events = [
  {
    name: 'onChange',
    type: '(event) => void',
    default: '—',
    description: '선택 상태 변경 콜백입니다. 제어 모드에서는 e.target.checked(또는 value)로 부모 state를 갱신합니다.'
  }
]

const classes = [
  {
    name: 'radio · radio_control · radio_input · radio_box',
    type: 'class',
    default: '—',
    description: '라디오 루트와 입력·커스텀 원입니다.'
  },
  {
    name: 'radio_label · radio_content · radio_hint',
    type: 'class',
    default: '—',
    description: '레이블과 보조 설명입니다.'
  },
  {
    name: 'radio_label-end · radio_button · radio_block',
    type: 'class',
    default: '—',
    description: '레이아웃·버튼·너비 변형입니다.'
  },
  {
    name: 'radio_group · radio_card · radio_card-clickable',
    type: 'class',
    default: '—',
    description: '그룹과 카드형 조합입니다.'
  }
]

const tokens = [
  {
    name: '--radio-size · --radio-size-sm · --radio-size-lg',
    type: 'length',
    default: 'var(--checkbox-size) · … · …',
    description: '라디오 원 크기입니다.'
  },
  {
    name: '--radio-gap · --radio-radius',
    type: 'length',
    default: 'var(--checkbox-gap) · 50%',
    description: '레이블 간격과 원형 모서리입니다.'
  },
  {
    name: '--radio-button-padding-y · --radio-button-padding-x',
    type: 'length',
    default: 'var(--checkbox-button-padding-y) · var(--checkbox-button-padding-x)',
    description: '버튼형 패딩입니다.'
  }
]

export const radioApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Radio props입니다.',
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
