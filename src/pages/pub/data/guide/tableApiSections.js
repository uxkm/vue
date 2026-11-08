/**
 * Table 가이드 — API · Props / Children / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'bordered',
    type: 'boolean',
    default: 'false',
    description: '셀 테두리'
  },
  {
    name: 'striped',
    type: 'boolean',
    default: 'false',
    description: '짝수 행 배경'
  },
  {
    name: 'compact',
    type: 'boolean',
    default: 'false',
    description: '좁은 셀 패딩'
  },
  {
    name: 'hover',
    type: 'boolean',
    default: 'false',
    description: '행 호버 강조'
  },
  {
    name: 'wrap',
    type: 'boolean',
    default: 'true',
    description: 'table_wrap 사용 여부'
  },
  {
    name: 'scroll',
    type: 'boolean',
    default: 'false',
    description: 'sticky용 스크롤 컨테이너'
  },
  {
    name: 'scrollMaxHeight',
    type: 'string',
    default: '—',
    description: '스크롤 영역 최대 높이'
  },
  {
    name: 'stickyTop',
    type: 'boolean',
    default: 'false',
    description: 'thead 상단 고정'
  },
  {
    name: 'stickyLeft',
    type: 'boolean',
    default: 'false',
    description: '좌측 열 고정'
  },
  {
    name: 'stickyCols',
    type: '1 | 2 | 3 | 4',
    default: '1',
    description: '좌측 고정 열 개수'
  },
  {
    name: 'stickyLeftOffsets',
    type: 'Record<number, string>',
    default: '{}',
    description: '각 고정 열의 left 오프셋'
  },
  {
    name: 'columns',
    type: 'TableColumnConfig[]',
    default: '[]',
    description: '{ width, minWidth, maxWidth, padding, nowrap } 열 설정'
  },
  {
    name: 'rows',
    type: 'object[]',
    default: '—',
    description: 'children 없을 때 columns.key로 자동 렌더하는 행 데이터'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '래퍼(또는 wrap=false 시 table) 추가 클래스'
  }
]

const childrenRows = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'thead, tbody, tfoot 등 시맨틱 테이블 마크업'
  }
]

const classes = [
  {
    name: 'table_wrap · table_wrap-scroll · table',
    type: 'class',
    default: '—',
    description: '스크롤 래퍼와 테이블 루트'
  },
  {
    name: 'table_bordered · table_striped · table_compact · table_hover',
    type: 'class',
    default: '—',
    description: '스타일 변형'
  },
  {
    name: 'table_columns · table_col-nowrap',
    type: 'class',
    default: '—',
    description: '열 크기·줄바꿈 제어'
  },
  {
    name: 'table_sticky-top · table_sticky-left · table_sticky-cols-1…4',
    type: 'class',
    default: '—',
    description: '상단·좌측 고정'
  }
]

const tokens = [
  {
    name: '--table-cell-padding-y · --table-cell-padding-x',
    type: 'length',
    default: '0.65rem · 1rem',
    description: '기본 셀 패딩'
  },
  {
    name: '--table-cell-padding-y-compact · --table-cell-padding-x-compact',
    type: 'length',
    default: '0.4rem · 0.75rem',
    description: '컴팩트 셀 패딩'
  },
  {
    name: '--table-scroll-max-height',
    type: 'length',
    default: '16rem',
    description: '스크롤 최대 높이'
  },
  {
    name: '--table-sticky-left-n · --table-sticky-shadow',
    type: 'length · shadow',
    default: '0 · 2px 0 4px -2px…',
    description: '고정 열 위치와 그림자'
  }
]

export const tableApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Table props입니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · Children',
    tables: [{ columns, rows: childrenRows }]
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
