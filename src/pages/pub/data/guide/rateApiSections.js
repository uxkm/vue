/**
 * Rate 가이드 — API · Props / Events / 클래스 / 디자인 토큰
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
    type: 'number | null',
    default: '—',
    description: '넘기면 제어 모드입니다. 부모가 별점을 소유하며, 변경은 onChange 로만 반영됩니다. null 은 미선택입니다.'
  },
  {
    name: 'defaultValue',
    type: 'number | null',
    default: '—',
    description: '비제어 초기 별점입니다. value 를 넘기지 않을 때 씁니다. null 은 미선택입니다.'
  },
  {
    name: 'count',
    type: 'number',
    default: '5',
    description: '표시할 별의 개수입니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '별과 값 텍스트 크기입니다.'
  },
  {
    name: 'allowHalf · clearable',
    type: 'boolean',
    default: 'false',
    description: '0.5점 선택과 선택 초기화 기능입니다.'
  },
  {
    name: 'readonly · readOnly · disabled',
    type: 'boolean',
    default: 'false',
    description: '읽기 전용 표시와 비활성 상태입니다.'
  },
  {
    name: 'legend · name',
    type: 'string',
    default: '—',
    description: 'fieldset 범례와 radio 그룹 이름입니다.'
  },
  {
    name: 'ripple',
    type: 'boolean',
    default: 'false',
    description: 'true일 때 각 별·초기화 버튼에 data-ripple을 붙여 클릭 파장을 표시합니다.'
  },
  {
    name: 'className · ...props',
    type: 'string · fieldset attributes',
    default: '—',
    description: '루트 클래스와 네이티브 속성입니다.'
  }
]

const events = [
  {
    name: 'onChange',
    type: '(value: number | null) => void',
    default: '—',
    description: '별점 선택 또는 초기화 콜백입니다. clear 시 null 을 전달합니다. 제어 모드에서는 부모가 value 를 갱신해야 화면이 바뀝니다.'
  }
]

const classes = [
  {
    name: 'rate · rate_control · rate_stars · rate_star',
    type: 'class',
    default: '—',
    description: '별점 루트와 별 선택 구조입니다.'
  },
  {
    name: 'rate_input · rate_star-graphic · rate_star-label',
    type: 'class',
    default: '—',
    description: 'radio 입력, 아이콘과 접근 가능한 레이블입니다.'
  },
  {
    name: 'rate_sm · rate_lg · rate_allow-half · rate_clearable',
    type: 'class',
    default: '—',
    description: '크기와 기능 변형입니다.'
  },
  {
    name: 'rate_value · rate_clear · is-readonly · is-filled · is-half',
    type: 'class',
    default: '—',
    description: '값, 초기화 및 읽기 전용 상태입니다.'
  }
]

const tokens = [
  {
    name: '--rate-star-size · --rate-star-size-sm · --rate-star-size-lg',
    type: 'length',
    default: '1.25rem · 1rem · 1.5rem',
    description: '별 아이콘 크기입니다.'
  },
  {
    name: '--rate-star-gap · --rate-clear-size',
    type: 'length',
    default: '0.125rem · 1.5rem',
    description: '별 간격과 초기화 버튼 크기입니다.'
  },
  {
    name: '--rate-color-filled · --rate-color-empty',
    type: 'color',
    default: 'warning · border-subtle',
    description: '선택 및 미선택 별 색상입니다.'
  }
]

export const rateApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Rate props입니다.',
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
