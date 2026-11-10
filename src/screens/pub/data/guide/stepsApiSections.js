/**
 * Steps 가이드 — API · Props / 클래스 / 디자인 토큰
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
    type: 'StepItem[]',
    default: '—',
    description: "단계 목록입니다. { key?, title, desc?, icon?, status?, disabled? }. status 가 없으면 current 로 finish · process · wait 를 계산합니다."
  },
  {
    name: 'current · defaultCurrent',
    type: 'number',
    default: '— · 0',
    description: '현재 단계 인덱스(0부터)입니다. current 를 넘기면 제어하고, 생략하면 defaultCurrent 와 내부 상태로 동작합니다(navigable 클릭 시 갱신).'
  },
  {
    name: 'direction',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: '방향입니다. vertical 이면 steps_vertical 이 붙어 세로 타임라인 형태가 됩니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '크기입니다. sm · lg 일 때 steps_sm · steps_lg 가 붙어 인디케이터·제목·설명 토큰이 바뀝니다.'
  },
  {
    name: 'dot',
    type: 'boolean',
    default: 'false',
    description: 'steps_dot 을 붙여 숫자 대신 작은 점 인디케이터를 씁니다.'
  },
  {
    name: 'align',
    type: "'start' | 'center'",
    default: "'start'",
    description: '가로 모드 정렬입니다. center 이면 steps_align-center 가 붙습니다.'
  },
  {
    name: 'navigable',
    type: 'boolean',
    default: 'false',
    description: 'steps_navigable 을 붙이고 완료·현재 단계를 버튼으로 감쌉니다. onChange 와 함께 쓰면 클릭으로 current 를 바꿀 수 있습니다. 대기(wait) 단계는 비활성입니다.'
  },
  {
    name: 'onChange',
    type: '(index: number) => void',
    default: '—',
    description: 'navigable 일 때 단계 클릭 시 호출됩니다.'
  },
  {
    name: 'label',
    type: 'string',
    default: "'진행 단계'",
    description: 'ol 의 aria-label 입니다.'
  },
  {
    name: 'className · ...props',
    type: 'ol attributes',
    default: '—',
    description: '루트(ol.steps)에 합쳐지는 클래스와 속성입니다.'
  }
]

const classes = [
  {
    name: 'steps · steps_item · steps_head · steps_content',
    type: 'class',
    default: '—',
    description: '루트 목록, 단계, 인디케이터 줄, 제목/설명 영역입니다.'
  },
  {
    name: 'steps_indicator · steps_index · steps_icon · steps_tail',
    type: 'class',
    default: '—',
    description: '원형 인디케이터, 숫자, 아이콘, 단계 사이 연결선입니다. 마지막 단계의 tail 은 숨겨집니다.'
  },
  {
    name: 'steps_title · steps_desc',
    type: 'class',
    default: '—',
    description: '단계 제목과 설명입니다.'
  },
  {
    name: 'is-finished · is-active · is-wait · is-error',
    type: 'class',
    default: '—',
    description: '완료 · 현재 · 대기 · 오류 상태입니다. 현재 단계는 aria-current="step" 을 둡니다.'
  },
  {
    name: 'steps_vertical · steps_dot · steps_sm · steps_lg · steps_align-center · steps_navigable · steps_icon-style',
    type: 'class',
    default: '—',
    description: '세로 · 점 · 크기 · 가운데 정렬 · 클릭 가능 · 아이콘 스타일 변형입니다.'
  },
  {
    name: 'steps_trigger',
    type: 'class',
    default: '—',
    description: 'navigable 모드에서 단계를 감싸는 버튼입니다.'
  }
]

const tokens = [
  {
    name: '--steps-gap · --steps-head-gap · --steps-content-gap',
    type: 'length',
    default: 'var(--space-md) · sm · xs',
    description: '단계 간격, 인디케이터-연결선 간격, 제목 영역 간격입니다.'
  },
  {
    name: '--steps-indicator-size · --steps-indicator-size-sm · --steps-indicator-size-lg',
    type: 'length',
    default: '2rem · 1.75rem · 2.5rem',
    description: '인디케이터 지름입니다.'
  },
  {
    name: '--steps-title-size · --steps-desc-size · --steps-tail-height',
    type: 'length',
    default: 'var(--text-size-sm) · xs · 2px',
    description: '제목·설명 글자 크기와 연결선 두께입니다.'
  },
  {
    name: '--steps-dot-size · --steps-icon-size · --steps-pulse-duration',
    type: 'length · time',
    default: '8px · 1rem · 1.5s',
    description: '점 크기, 아이콘 크기, 현재 단계 펄스 주기입니다.'
  }
]

export const stepsApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Steps props입니다. current 로 진행 위치를 제어하고, direction · dot · navigable 로 형태를 바꿉니다.',
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
