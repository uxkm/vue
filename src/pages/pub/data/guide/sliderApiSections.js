/**
 * Slider 가이드 — API · Props / Events / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'value',
    type: 'number',
    default: '—',
    description: '넘기면 제어 모드입니다. 부모가 값을 소유하며, 변경은 onChange 로만 반영됩니다.'
  },
  {
    name: 'defaultValue',
    type: 'number',
    default: '50',
    description: '비제어 초기값입니다. value 를 넘기지 않을 때 씁니다.'
  },
  {
    name: 'min · max · step',
    type: 'number',
    default: '0 · 100 · 1',
    description: '값의 범위와 증감 단위입니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '트랙·썸·값 텍스트 크기입니다.'
  },
  {
    name: 'disabled · vertical',
    type: 'boolean',
    default: 'false',
    description: '비활성 상태와 방향입니다.'
  },
  {
    name: 'label · showValue · valueSuffix · hint',
    type: 'string · boolean · ReactNode',
    default: '—',
    description: '레이블, 현재 값, 단위 및 보조 설명입니다.'
  },
  {
    name: 'stepper · stepperAlways',
    type: 'boolean',
    default: 'false',
    description: '증감 버튼을 모바일 또는 항상 표시합니다.'
  },
  {
    name: 'decreaseLabel · increaseLabel',
    type: 'string',
    default: '값 줄이기 · 값 늘리기',
    description: '증감 버튼의 접근 가능한 이름입니다.'
  },
  {
    name: 'ripple',
    type: 'boolean',
    default: 'false',
    description: 'true일 때 루트·증감 버튼에 data-ripple을 붙여 클릭 파장을 표시합니다.'
  },
  {
    name: 'className · ...props',
    type: 'string · range attributes',
    default: '—',
    description: '루트 클래스와 네이티브 range 속성입니다.'
  }
]

const events = [
  {
    name: 'onChange',
    type: '(value: number) => void',
    default: '—',
    description: '값 변경 콜백입니다. 제어 모드에서는 부모가 value 를 갱신해야 화면이 바뀝니다.'
  }
]

const classes = [
  {
    name: 'slider · slider_input',
    type: 'class',
    default: '—',
    description: '슬라이더 루트와 네이티브 range입니다.'
  },
  {
    name: 'slider_header · slider_label · slider_value · slider_hint',
    type: 'class',
    default: '—',
    description: '레이블, 값 및 설명입니다.'
  },
  {
    name: 'slider_sm · slider_lg · slider_fit · slider_block',
    type: 'class',
    default: '—',
    description: '크기와 너비 변형입니다.'
  },
  {
    name: 'slider_control · slider_stepper · slider_stepper_always · slider_step',
    type: 'class',
    default: '—',
    description: '증감 버튼 구조와 표시 방식입니다.'
  },
  {
    name: 'slider_ticks · slider_tick',
    type: 'class',
    default: '—',
    description: '눈금 구조입니다.'
  }
]

const tokens = [
  {
    name: '--slider-track-height · --slider-thumb-size',
    type: 'length',
    default: '4px · 14px',
    description: '기본 트랙과 썸 크기입니다.'
  },
  {
    name: '--slider-max-width',
    type: 'length',
    default: 'var(--input-max-width)',
    description: 'slider_fit의 최대 너비입니다.'
  },
  {
    name: '--slider-step-size · --slider-step-gap',
    type: 'length',
    default: '2.25rem · var(--space-sm)',
    description: '증감 버튼 크기와 간격입니다.'
  }
]

export const sliderApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Slider props입니다.',
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
