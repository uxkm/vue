/**
 * Checkbox 가이드 — API · Props / Events / 클래스 / 디자인 토큰
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
    description: '넘기면(checked !== undefined) 제어 모드입니다. 부모가 체크 상태를 관리합니다. onChange 유무와는 무관합니다.'
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    default: 'false',
    description: '비제어 초기 체크 상태입니다. checked를 넘기지 않을 때 씁니다.'
  },
  {
    name: 'disabled · indeterminate',
    type: 'boolean',
    default: 'false',
    description: '비활성 및 부분 선택 상태입니다.'
  },
  {
    name: 'labelEnd · button',
    type: 'boolean',
    default: 'false',
    description: '레이블 우선 배치 및 버튼형 변형입니다.'
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
    description: '보이는 레이블이 없는 단독 체크박스의 접근 가능한 이름입니다.'
  },
  {
    name: 'className · ...props',
    type: 'string · input attributes',
    default: '—',
    description: '루트 클래스와 네이티브 checkbox 속성입니다.'
  }
]

const events = [
  {
    name: 'onChange',
    type: '(event) => void',
    default: '—',
    description: '체크 상태 변경 콜백입니다. 제어 모드에서는 e.target.checked로 부모 state를 갱신합니다.'
  }
]

const classes = [
  {
    name: 'checkbox · checkbox_control · checkbox_input · checkbox_box',
    type: 'class',
    default: '—',
    description: '체크박스 루트와 입력·커스텀 박스입니다.'
  },
  {
    name: 'checkbox_label · checkbox_content · checkbox_hint',
    type: 'class',
    default: '—',
    description: '레이블과 보조 설명입니다.'
  },
  {
    name: 'checkbox_label-end · checkbox_button · checkbox_block',
    type: 'class',
    default: '—',
    description: '레이아웃·버튼·너비 변형입니다.'
  },
  {
    name: 'checkbox_group · checkbox_card · checkbox_card-clickable',
    type: 'class',
    default: '—',
    description: '그룹과 카드형 조합입니다.'
  }
]

const tokens = [
  {
    name: '--checkbox-size · --checkbox-size-sm · --checkbox-size-lg',
    type: 'length',
    default: '1rem · 0.875rem · 1.125rem',
    description: '체크박스 박스 크기입니다.'
  },
  {
    name: '--checkbox-gap · --checkbox-radius',
    type: 'length',
    default: 'var(--space-sm) · 4px',
    description: '레이블 간격과 모서리입니다.'
  },
  {
    name: '--checkbox-button-padding-y · --checkbox-button-padding-x',
    type: 'length',
    default: '0.35rem · 0.75rem',
    description: '버튼형 패딩입니다.'
  }
]

export const checkboxApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Checkbox props입니다.',
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
