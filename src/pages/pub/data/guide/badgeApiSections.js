/**
 * Badge 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'color',
    type: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted'",
    default: 'primary',
    description: '색상. color_* 유틸.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: '크기. md는 크기 클래스 없음.'
  },
  {
    name: 'label',
    type: 'string',
    default: "''",
    description: '배지 문구. children이 있으면 children 우선.'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: '접근성 이름. dotOnly·카운트에 권장.'
  },
  {
    name: 'dot',
    type: 'boolean',
    default: 'false',
    description: '텍스트 앞 상태 점(badge_dot).'
  },
  {
    name: 'count',
    type: 'boolean',
    default: 'false',
    description: '카운트형(badge_count).'
  },
  {
    name: 'dotOnly',
    type: 'boolean',
    default: 'false',
    description: '텍스트 없는 상태 점(badge_dot-only). role=status.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'label 대체 콘텐츠.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '루트 추가 클래스.'
  }
]

const wrapProps = [
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: '래퍼 접근성 이름.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '기준 요소와 Badge.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '래퍼 추가 클래스.'
  }
]

const classes = [
  { name: 'badge', type: 'class', default: '—', description: '루트 구조' },
  { name: 'badge_sm · badge_lg', type: 'class', default: '—', description: '크기(md는 클래스 없음)' },
  { name: 'badge_dot · badge_dot-only · badge_count', type: 'class', default: '—', description: '점·카운트 변형' },
  { name: 'badge_wrap', type: 'class', default: '—', description: '기준 요소 + Badge 겹침 래퍼' },
  { name: 'color_*', type: 'class', default: '—', description: '공통 색상 유틸리티' }
]

const tokens = [
  {
    name: '--badge-padding-y · --badge-padding-x · --badge-font-size',
    type: 'mixed',
    default: '0.15rem · 0.5rem · var(--text-size-xs)',
    description: '기본(md) 패딩·타이포'
  },
  {
    name: '--badge-padding-*-sm · --badge-font-size-sm',
    type: 'mixed',
    default: '0.05rem · 0.35rem · 0.6875rem',
    description: 'sm 크기'
  },
  {
    name: '--badge-padding-*-lg · --badge-font-size-lg',
    type: 'mixed',
    default: '0.25rem · 0.65rem · var(--text-size-sm)',
    description: 'lg 크기'
  },
  {
    name: '--badge-dot-size · --badge-count-min-width · --badge-overlay-border',
    type: 'mixed',
    default: '6px · 1.25rem · 2px',
    description: '점·카운트·겹침 테두리'
  }
]

export const badgeApiSections = [
  {
    title: 'API · Badge Props',
    description: 'React · Next.js Badge props입니다. children이 있으면 label보다 우선합니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · BadgeWrap Props',
    description: '기준 요소와 Badge를 같은 좌표 컨텍스트에 배치합니다.',
    tables: [{ columns, rows: wrapProps }]
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
