/**
 * Stat 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'title',
    type: 'string · ReactNode',
    default: '—',
    description: '지표 라벨'
  },
  {
    name: 'value',
    type: 'string | number | ReactNode',
    default: '—',
    description: '주요 수치'
  },
  {
    name: 'prefix',
    type: 'string · ReactNode',
    default: '—',
    description: '값 앞 접두'
  },
  {
    name: 'suffix',
    type: 'string · ReactNode',
    default: '—',
    description: '값 뒤 접미'
  },
  {
    name: 'description',
    type: 'string · ReactNode',
    default: '—',
    description: '보조 설명'
  },
  {
    name: 'trend',
    type: 'string · ReactNode',
    default: '—',
    description: '증감 텍스트'
  },
  {
    name: 'trendColor',
    type: 'string',
    default: '—',
    description: '증감·설명 color_*'
  },
  {
    name: 'trendIcon',
    type: 'ReactNode',
    default: '기본 상승 아이콘',
    description: '증감 아이콘'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: '수치 크기'
  },
  {
    name: 'card',
    type: 'boolean',
    default: 'false',
    description: '카드 스킨'
  },
  {
    name: 'shadow',
    type: 'boolean',
    default: 'false',
    description: '카드 그림자'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '아이콘·커스텀 레이아웃'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '레이아웃·스킨 추가 클래스'
  }
]

const classes = [
  {
    name: 'stat · stat_header · stat_label · stat_value-row · stat_value',
    type: 'class',
    default: '—',
    description: '지표 기본 구조'
  },
  {
    name: 'stat_prefix · stat_suffix · stat_desc · stat_trend',
    type: 'class',
    default: '—',
    description: '값과 보조 정보'
  },
  {
    name: 'stat_sm · stat_lg · stat_horizontal · stat_inline · stat_row',
    type: 'class',
    default: '—',
    description: '크기·레이아웃 변형'
  },
  {
    name: 'stat_card · stat_shadow · stat_borderless · stat_accent',
    type: 'class',
    default: '—',
    description: '카드 스킨'
  },
  {
    name: 'stat_group · stat_group-2…4 · stat_group-divider',
    type: 'class',
    default: '—',
    description: '반응형 지표 그룹'
  }
]

const tokens = [
  {
    name: '--stat-value-size-sm · --stat-value-size · --stat-value-size-lg',
    type: 'length',
    default: '1.25rem · 1.75rem · 2.25rem',
    description: '수치 크기'
  },
  {
    name: '--stat-label-size · --stat-desc-size',
    type: 'length',
    default: 'var(--text-size-sm)',
    description: '라벨·설명 크기'
  },
  {
    name: '--stat-group-gap · --stat-card-padding',
    type: 'length',
    default: 'var(--space-lg)',
    description: '그룹 간격과 카드 패딩'
  }
]

export const statApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Stat props입니다.',
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
