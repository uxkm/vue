/**
 * Space 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'gap',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
    default: 'size 값',
    description: '자식 간격. 숫자는 px 인라인 gap.'
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
    default: 'md',
    description: 'gap 별칭. gap이 없으면 size 사용.'
  },
  {
    name: 'vertical',
    type: 'boolean',
    default: 'false',
    description: '세로 배치(space_vertical).'
  },
  {
    name: 'wrap',
    type: 'boolean',
    default: 'false',
    description: '줄바꿈(space_wrap).'
  },
  {
    name: 'block',
    type: 'boolean',
    default: 'false',
    description: '가로 100% flex(space_block).'
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end' | 'baseline' | 'stretch'",
    default: 'center',
    description: '교차축 정렬. center는 클래스 생략.'
  },
  {
    name: 'justify',
    type: "'start' | 'center' | 'end' | 'between'",
    default: 'start',
    description: '주축 정렬. start는 클래스 생략.'
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
    description: '간격이 적용될 자식들.'
  }
]

const classes = [
  { name: 'space', type: 'class', default: '—', description: 'inline-flex · 기본 gap(md)' },
  { name: 'space_gap-xs · sm · lg · xl', type: 'class', default: '—', description: '간격 토큰(md는 클래스 없음)' },
  { name: 'space_vertical · space_wrap · space_block', type: 'class', default: '—', description: '방향·줄바꿈·블록' },
  { name: 'space_align-*', type: 'class', default: '—', description: 'start · center · end · baseline · stretch' },
  { name: 'space_justify-*', type: 'class', default: '—', description: 'start · center · end · between' }
]

const tokens = [
  {
    name: '--space-gap',
    type: 'length',
    default: 'var(--space-md)',
    description: '기본(md) 자식 간격'
  },
  {
    name: '--space-xs · --space-sm · --space-md · --space-lg · --space-xl',
    type: 'length',
    default: '4 · 8 · 12 · 16 · 20px',
    description: 'gap 토큰이 참조하는 전역 간격'
  }
]

export const spaceApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Space props입니다. gap이 있으면 size보다 우선합니다.',
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
