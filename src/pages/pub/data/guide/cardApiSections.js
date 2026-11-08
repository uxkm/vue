/**
 * Card 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'variant',
    type: "'bordered' | 'shadow' | 'flat' | 'elevated' | 'ghost' | …",
    default: 'bordered',
    description: '스킨. flat·ghost → card_ghost.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'compact'",
    default: 'md',
    description: '패딩·제목 크기.'
  },
  {
    name: 'title · subtitle',
    type: 'ReactNode',
    default: '—',
    description: '내장 헤더 제목·부제. CardHeader 없이 사용.'
  },
  {
    name: 'as · tag',
    type: 'string',
    default: 'article',
    description: '루트 태그. href면 a, onClick이면 button.'
  },
  {
    name: 'href',
    type: 'string',
    default: '—',
    description: '링크 카드. card_clickable.'
  },
  {
    name: 'hoverable · horizontal · compact · accent',
    type: 'boolean',
    default: 'false',
    description: '호버·가로·조밀·액센트.'
  },
  {
    name: 'color',
    type: 'string',
    default: '—',
    description: 'color_* (액센트 등과 조합).'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: '비활성. 인터랙티브면 aria-disabled · tabIndex=-1.'
  },
  {
    name: 'ripple',
    type: 'boolean',
    default: 'false',
    description: '클릭 파장 opt-in.'
  },
  {
    name: 'media · header · extra · footer',
    type: 'ReactNode',
    default: '—',
    description: '미디어·커스텀 헤더·우측·푸터.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'CardHeader · CardBody · CardFooter 등.'
  },
  {
    name: 'onClick',
    type: '(event) => void',
    default: '—',
    description: '클릭 핸들러. 있으면 button 루트.'
  }
]

const headerProps = [
  { name: 'title', type: 'ReactNode', default: '—', description: '제목(card_title)' },
  { name: 'subtitle', type: 'ReactNode', default: '—', description: '부제(card_subtitle)' },
  { name: 'extra', type: 'ReactNode', default: '—', description: '헤더 우측(card_extra)' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'title·subtitle 대체 메인' }
]

const bodyProps = [
  { name: 'children', type: 'ReactNode', default: '—', description: '카드 본문' }
]

const footerProps = [
  { name: 'between', type: 'boolean', default: 'false', description: '양끝 정렬(card_footer-between)' },
  { name: 'children', type: 'ReactNode', default: '—', description: '하단 액션·메타' }
]

const deckProps = [
  { name: 'columns', type: '2 | 3', default: 'auto', description: '고정 열 수. 없으면 자동 그리드' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Card 목록' }
]

const classes = [
  { name: 'card · card_inner · card_header · card_body · card_footer', type: 'class', default: '—', description: '구조' },
  { name: 'card_title · card_subtitle · card_extra · card_media', type: 'class', default: '—', description: '파트' },
  { name: 'card_sm · card_lg · card_compact · card_horizontal', type: 'class', default: '—', description: '크기·레이아웃' },
  { name: 'card_shadow · card_elevated · card_ghost · card_borderless', type: 'class', default: '—', description: '스킨' },
  { name: 'card_hover · card_clickable · card_accent · is-disabled', type: 'class', default: '—', description: '동작·상태' },
  { name: 'card_deck · card_deck-2 · card_deck-3', type: 'class', default: '—', description: '그리드' },
  { name: 'card_icon · card_avatar · card_stat · card_media-placeholder', type: 'class', default: '—', description: '아이콘·미디어 보조' }
]

const tokens = [
  {
    name: '--card-padding · --card-padding-sm · --card-padding-lg',
    type: 'length',
    default: 'var(--space-lg) · var(--space-md) · var(--space-xl)',
    description: '크기별 내부 여백'
  },
  {
    name: '--card-radius · --card-shadow · --card-shadow-md',
    type: 'mixed',
    default: '—',
    description: '모서리·그림자'
  },
  {
    name: '--card-media-ratio · --card-horizontal-media-width',
    type: 'mixed',
    default: '16 / 9 · 7.5rem',
    description: '미디어 비율·가로형 너비'
  }
]

export const cardApiSections = [
  {
    title: 'API · Card Props',
    description: 'React · Next.js Card props입니다. 본문은 CardBody 등으로 구성합니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · CardHeader Props',
    tables: [{ columns, rows: headerProps }]
  },
  {
    title: 'API · CardBody Props',
    tables: [{ columns, rows: bodyProps }]
  },
  {
    title: 'API · CardFooter Props',
    tables: [{ columns, rows: footerProps }]
  },
  {
    title: 'API · CardDeck Props',
    tables: [{ columns, rows: deckProps }]
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
