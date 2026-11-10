/**
 * Container 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'size',
    type: "'' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "''",
    description: '최대 너비. 빈 값은 기본 72rem.'
  },
  {
    name: 'fluid',
    type: 'boolean',
    default: 'false',
    description: '최대 너비 제한 해제. size보다 우선.'
  },
  {
    name: 'as',
    type: 'string',
    default: "'div'",
    description: '루트 HTML 태그. main · section 등.'
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
    description: '컨테이너 내부 콘텐츠.'
  }
]

const htmlAttributes = [
  {
    name: 'class',
    type: 'string',
    default: "'container'",
    description: 'container와 너비 변형 클래스 조합'
  }
]

const classes = [
  { name: 'container', type: 'class', default: '—', description: '기본 72rem 최대 너비 · 중앙 · 좌우 패딩' },
  { name: 'container_sm', type: 'class', default: '—', description: '최대 너비 36rem' },
  { name: 'container_md', type: 'class', default: '—', description: '최대 너비 48rem' },
  { name: 'container_lg', type: 'class', default: '—', description: '최대 너비 64rem' },
  { name: 'container_xl', type: 'class', default: '—', description: '최대 너비 80rem' },
  { name: 'container_fluid', type: 'class', default: '—', description: 'max-width 제한 해제' }
]

const tokens = [
  {
    name: '--container-padding-x',
    type: 'length',
    default: 'var(--space-6xl)',
    description: '좌우 내부 여백'
  },
  {
    name: '--container-max-width',
    type: 'length',
    default: '72rem',
    description: '기본 최대 너비'
  },
  {
    name: '--container-max-width-sm · -md · -lg · -xl',
    type: 'length',
    default: '36rem · 48rem · 64rem · 80rem',
    description: 'size별 최대 너비'
  }
]

export const containerApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Container props입니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'HTML API · Markup',
    tables: [{ columns, rows: htmlAttributes }]
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
