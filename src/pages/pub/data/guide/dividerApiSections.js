/**
 * Divider 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'vertical',
    type: 'boolean',
    default: 'false',
    description: '세로 구분선(divider_vertical).'
  },
  {
    name: 'dashed',
    type: 'boolean',
    default: 'false',
    description: '점선(divider_dashed).'
  },
  {
    name: 'plain',
    type: 'boolean',
    default: 'false',
    description: '라벨 일반 굵기(divider_plain).'
  },
  {
    name: 'orient',
    type: "'' | 'left' | 'right'",
    default: "''",
    description: '라벨 치우침. orientation 별칭 가능.'
  },
  {
    name: 'label',
    type: 'string',
    default: "''",
    description: '선 가운데 문구. children이 있으면 children 우선.'
  },
  {
    name: 'tag',
    type: "'auto' | 'hr' | 'div' | 'span'",
    default: 'auto',
    description: '루트 태그. auto면 라벨·방향에 따라 hr/div/span.'
  },
  {
    name: 'as',
    type: 'string',
    default: "''",
    description: '루트 태그 직접 지정(tag보다 우선).'
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
    description: '라벨 콘텐츠.'
  }
]

const classes = [
  { name: 'divider', type: 'class', default: '—', description: '가로 구분선 루트' },
  { name: 'divider_vertical', type: 'class', default: '—', description: '세로 구분선' },
  { name: 'divider_dashed', type: 'class', default: '—', description: '점선' },
  { name: 'divider_plain', type: 'class', default: '—', description: '라벨 일반 굵기' },
  { name: 'divider_orient-left · divider_orient-right', type: 'class', default: '—', description: '라벨 좌·우 치우침' },
  { name: 'divider_with-label', type: 'class', default: '—', description: '라벨 있는 non-hr 루트' }
]

const tokens = [
  {
    name: '--divider-color',
    type: 'color',
    default: 'var(--color-border-subtle)',
    description: '선 색'
  },
  {
    name: '--divider-thickness',
    type: 'length',
    default: '1px',
    description: '선 두께'
  },
  {
    name: '--divider-margin-y · --divider-margin-x',
    type: 'length',
    default: 'var(--space-md) · var(--space-sm)',
    description: '가로·세로 바깥 여백'
  },
  {
    name: '--divider-text-gap · --divider-orient-inset',
    type: 'mixed',
    default: 'var(--space-md) · 5%',
    description: '라벨 간격 · 치우침 inset'
  }
]

export const dividerApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Divider props입니다. 라벨이 있으면 양쪽 선 + 텍스트로 렌더됩니다.',
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
