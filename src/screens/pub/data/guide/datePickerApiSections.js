/**
 * DatePicker 가이드 — API · Props / Events / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'value · defaultValue',
    type: 'YYYY-MM-DD string',
    default: "''",
    description: '제어 값과 비제어 초기 값입니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '트리거 높이와 글자 크기입니다.'
  },
  {
    name: 'min · max',
    type: 'YYYY-MM-DD string',
    default: '—',
    description: '선택할 수 있는 날짜 범위입니다.'
  },
  {
    name: 'fit · block',
    type: 'boolean',
    default: 'false',
    description: '제한 너비와 전체 너비 변형입니다.'
  },
  {
    name: 'disabled · error · success',
    type: 'boolean',
    default: 'false',
    description: '비활성 및 검증 상태입니다.'
  },
  {
    name: 'clearable',
    type: 'boolean',
    default: 'true',
    description: '선택한 날짜를 지우는 동작을 표시합니다.'
  },
  {
    name: 'open',
    type: 'boolean',
    default: '—',
    description: '넘기면 패널 열림을 페이지가 제어합니다. 열리면 루트에 is-open 이 붙습니다.'
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: '비제어 초기 패널 열림입니다. open 을 넘기지 않을 때 씁니다.'
  },
  {
    name: 'displayMonth · defaultDisplayMonth',
    type: 'Date | string',
    default: '—',
    description: '패널에 표시 중인 월입니다. Date 또는 YYYY-MM-DD. displayMonth 를 넘기면 페이지가 월을 제어합니다.'
  },
  {
    name: 'panelAlign',
    type: "'start' | 'end'",
    default: "'start'",
    description: '달력 패널의 정렬 방향입니다.'
  },
  {
    name: 'placeholder · locale · ariaLabel',
    type: 'string',
    default: '—',
    description: '안내 문구, 표시 로케일, 접근 가능한 이름입니다.'
  },
  {
    name: 'className · ...props',
    type: 'string · input attributes',
    default: '—',
    description: '루트 클래스와 트리거 입력 속성입니다.'
  }
]

const events = [
  {
    name: 'onChange',
    type: '(value: string) => void',
    default: '—',
    description: 'YYYY-MM-DD 값이 바뀔 때 호출됩니다.'
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '—',
    description: '패널 열림이 바뀔 때 호출됩니다. 제어 모드에서는 부모가 open 을 갱신합니다.'
  },
  {
    name: 'onDisplayMonthChange',
    type: '(month: Date) => void',
    default: '—',
    description: '이전/다음 달 이동 시 호출됩니다. displayMonth 제어 시 부모가 월을 갱신합니다.'
  }
]

const classes = [
  {
    name: 'date_picker · date_picker_trigger · date_picker_input',
    type: 'class',
    default: '—',
    description: '날짜 선택 루트와 트리거 입력입니다.'
  },
  {
    name: 'date_picker_btn · date_picker_clear · date_picker_panel',
    type: 'class',
    default: '—',
    description: '달력 버튼, 지우기, 패널입니다.'
  },
  {
    name: 'date_picker_sm · date_picker_lg · date_picker_fit · date_picker_block',
    type: 'class',
    default: '—',
    description: '크기와 너비 변형입니다.'
  },
  {
    name: 'is-error · is-success · is-disabled · is-open',
    type: 'class',
    default: '—',
    description: '상태 클래스입니다.'
  }
]

const tokens = [
  {
    name: '--date-picker-input-padding-*',
    type: 'length',
    default: '크기별 값',
    description: '트리거 입력 영역의 안쪽 여백입니다.'
  },
  {
    name: '--date-picker-btn-size',
    type: 'length',
    default: '2.25rem',
    description: '달력 버튼 크기입니다.'
  },
  {
    name: '--date-picker-icon-size',
    type: 'length',
    default: '1rem',
    description: '달력 아이콘 크기입니다.'
  }
]

export const datePickerApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js DatePicker props입니다.',
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
