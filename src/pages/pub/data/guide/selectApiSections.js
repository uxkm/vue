/**
 * Select 가이드 — API · Props / Events / 클래스 / 디자인 토큰
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
    type: 'string | number | string[]',
    default: '—',
    description: '제어 값과 비제어 초기 값입니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '선택 필드의 높이와 글자 크기입니다.'
  },
  {
    name: 'placeholder',
    type: 'string',
    default: '—',
    description: '빈 값의 비활성 안내 option을 만듭니다.'
  },
  {
    name: 'nativeSize',
    type: 'number',
    default: '—',
    description: '한 번에 보이는 네이티브 option 개수입니다.'
  },
  {
    name: 'fit',
    type: 'boolean',
    default: 'false',
    description: '최대 너비를 320px로 제한합니다.'
  },
  {
    name: 'disabled · error',
    type: 'boolean',
    default: 'false',
    description: '비활성 및 오류 상태입니다.'
  },
  {
    name: 'multiple · required · ...props',
    type: 'select attributes',
    default: '—',
    description: '네이티브 select 속성을 전달합니다.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'option 또는 optgroup 요소입니다.'
  },
  {
    name: 'options',
    type: 'SelectOption[]',
    default: '[]',
    description: 'children이 없을 때 option을 생성합니다.'
  }
]

const events = [
  {
    name: 'onChange',
    type: 'ChangeEvent handler',
    default: '—',
    description: '선택 값이 바뀔 때 호출됩니다.'
  }
]

const classes = [
  {
    name: 'input · input_sm · input_lg · input_fit',
    type: 'class',
    default: '—',
    description: '네이티브 select의 루트, 크기, 제한 너비입니다.'
  },
  {
    name: 'display_contents · input_group-label_hidden',
    type: 'class',
    default: '—',
    description: '암묵적 label 래퍼와 화면에 숨긴 label 텍스트입니다.'
  },
  {
    name: 'is-error · is-success',
    type: 'class',
    default: '—',
    description: '검증 상태입니다.'
  }
]

const tokens = [
  {
    name: '--select-bg · --select-option-bg',
    type: 'color',
    default: 'surface',
    description: '선택 필드와 option 목록의 테마별 배경입니다.'
  },
  {
    name: '--select-text · --select-placeholder',
    type: 'color',
    default: 'text · text-muted',
    description: '선택 값과 placeholder의 대비 보장 색상입니다.'
  },
  {
    name: '--select-padding-right-*',
    type: 'length',
    default: '크기별 값',
    description: '선택 화살표를 위한 우측 여백입니다.'
  },
  {
    name: '--select-caret-offset-*',
    type: 'length',
    default: '크기별 값',
    description: '선택 화살표의 우측 위치입니다.'
  },
  {
    name: '--select-caret-size-*',
    type: 'length',
    default: '크기별 값',
    description: '선택 화살표 크기입니다.'
  },
  {
    name: '--input-max-width',
    type: 'length',
    default: '320px',
    description: 'fit 변형의 최대 너비입니다.'
  }
]

export const selectApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Select props입니다.',
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
