/**
 * Grid 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'cols',
    type: '1–12 | string',
    default: '12',
    description: '열 개수(grid_cols-N).'
  },
  {
    name: 'columns',
    type: '1–12 | string | null',
    default: 'null',
    description: 'cols 별칭. 지정 시 cols보다 우선.'
  },
  {
    name: 'gap',
    type: "'sm' | 'lg' | 'none' | number",
    default: "''",
    description: '간격 토큰. 숫자는 px 인라인 gap. 빈 값은 기본 md.'
  },
  {
    name: 'ratio',
    type: "'1-1' | '2-1' | '1-2' | '3-1' | '1-1-1' | '1-2-1'",
    default: "''",
    description: '열 비율(grid_ratio-*).'
  },
  {
    name: 'autoFit',
    type: 'boolean',
    default: 'false',
    description: 'auto-fit 열(grid_auto-fit).'
  },
  {
    name: 'autoFill',
    type: 'boolean',
    default: 'false',
    description: 'auto-fill 열(grid_auto-fill).'
  },
  {
    name: 'equalColumns',
    type: 'boolean',
    default: 'false',
    description: '자식 수만큼 균등 열(grid_equal-columns).'
  },
  {
    name: 'align',
    type: "'' | 'center' | 'end'",
    default: "''",
    description: '아이템 세로 정렬(grid_align-*).'
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
    description: 'Grid 자식. 개별 span은 grid_col-span-* 클래스.'
  }
]

const classes = [
  { name: 'grid', type: 'class', default: '—', description: '12열 기본 격자' },
  { name: 'grid_cols-1…12', type: 'class', default: '—', description: '열 개수' },
  { name: 'grid_gap-sm · lg · none', type: 'class', default: '—', description: '간격' },
  { name: 'grid_ratio-* · grid_auto-fit · grid_auto-fill · grid_equal-columns', type: 'class', default: '—', description: '비율·자동·균등' },
  { name: 'grid_align-center · end', type: 'class', default: '—', description: '아이템 정렬' },
  { name: 'grid_col-span-* · grid_item-span-*', type: 'class', default: '—', description: '개별·일괄 열 span' }
]

const tokens = [
  {
    name: '--grid-columns',
    type: 'number',
    default: '12',
    description: '기본 열 수'
  },
  {
    name: '--grid-gap · --grid-gap-sm · --grid-gap-lg',
    type: 'length',
    default: 'md · sm · lg',
    description: '기본·작음·큼 간격'
  },
  {
    name: '--grid-auto-min',
    type: 'length',
    default: '10rem',
    description: 'auto-fit/fill 최소 열 너비'
  }
]

export const gridApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Grid props입니다. cols·gap으로 격자를 만듭니다.',
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
