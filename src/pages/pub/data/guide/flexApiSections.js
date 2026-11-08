/**
 * Flex 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'direction',
    type: "'row' | 'col' | 'column'",
    default: 'row',
    description: '배치 방향. col·column → flex_col.'
  },
  {
    name: 'wrap',
    type: 'boolean',
    default: 'false',
    description: '줄바꿈(flex_wrap).'
  },
  {
    name: 'gap',
    type: "'sm' | 'lg' | 'none' | number",
    default: "''",
    description: '간격 토큰. 숫자는 px 인라인 gap. 빈 값은 기본 md.'
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'",
    default: "''",
    description: '교차축 정렬(flex_align-*).'
  },
  {
    name: 'justify',
    type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'space-between'",
    default: "''",
    description: '주축 정렬. space-between → between.'
  },
  {
    name: 'cols',
    type: '1–12 | string',
    default: "''",
    description: '균등 열 래핑(flex_cols-N).'
  },
  {
    name: 'ratio',
    type: "'1-1' | '2-1' | '1-2' | '3-1' | '1-1-1' | '1-2-1'",
    default: "''",
    description: '자식 flex 비율(flex_ratio-*).'
  },
  {
    name: 'equal',
    type: 'boolean',
    default: 'false',
    description: '자식 균등 분배(flex_equal).'
  },
  {
    name: 'autoFit',
    type: 'boolean',
    default: 'false',
    description: '최소 너비 기준 자동 줄바꿈(flex_auto-fit).'
  },
  {
    name: 'as',
    type: 'string',
    default: "'div'",
    description: '루트 HTML 태그.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '루트 추가 클래스.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Flex 자식.'
  }
]

const classes = [
  { name: 'flex · flex_row · flex_col', type: 'class', default: '—', description: '루트 · 가로 · 세로' },
  { name: 'flex_wrap · flex_gap-sm · lg · none', type: 'class', default: '—', description: '줄바꿈 · 간격' },
  { name: 'flex_align-* · flex_justify-*', type: 'class', default: '—', description: '교차축 · 주축 정렬' },
  { name: 'flex_cols-1…12 · flex_ratio-* · flex_equal · flex_auto-fit', type: 'class', default: '—', description: '열·비율·균등·자동' },
  { name: 'flex_item-span-* · flex_grow · flex_self-*', type: 'class', default: '—', description: '자식 개별 너비·정렬' }
]

const tokens = [
  {
    name: '--flex-gap · --flex-gap-sm · --flex-gap-lg',
    type: 'length',
    default: 'md · sm · lg',
    description: '기본·작음·큼 간격'
  },
  {
    name: '--flex-auto-min',
    type: 'length',
    default: '10rem',
    description: 'auto-fit 최소 너비'
  }
]

export const flexApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Flex props입니다. direction·정렬·gap으로 배치합니다.',
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
