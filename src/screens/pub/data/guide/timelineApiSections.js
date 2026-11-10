/**
 * Timeline 가이드 — API · Props / TimelineItem / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const timelineProps = [
  {
    name: 'card',
    type: 'boolean',
    default: 'false',
    description: '콘텐츠 카드 스킨'
  },
  {
    name: 'alternate',
    type: 'boolean',
    default: 'false',
    description: '좌우 교차 배치'
  },
  {
    name: 'horizontal',
    type: 'boolean',
    default: 'false',
    description: '가로 프로세스 배치'
  },
  {
    name: 'labelCol',
    type: 'boolean',
    default: 'false',
    description: '왼쪽 날짜 레이블 열'
  },
  {
    name: 'icon',
    type: 'boolean',
    default: 'false',
    description: '아이콘 도트 레이아웃'
  },
  {
    name: 'iconSize',
    type: "'sm' | 'md'",
    default: 'md',
    description: '아이콘 도트 크기'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: '간격과 텍스트 크기'
  },
  {
    name: 'tag',
    type: "'ol' | 'ul'",
    default: 'ol',
    description: '시맨틱 루트'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'TimelineItem 자식'
  }
]

const timelineItemProps = [
  {
    name: 'color',
    type: 'string',
    default: 'primary',
    description: 'color_* 도트 색상'
  },
  {
    name: 'title · description',
    type: 'string · ReactNode',
    default: '—',
    description: '제목과 설명'
  },
  {
    name: 'time · datetime',
    type: 'string',
    default: '—',
    description: '표시 시간과 datetime 값'
  },
  {
    name: 'label · labelDatetime',
    type: 'string',
    default: '—',
    description: '왼쪽 레이블과 datetime 값'
  },
  {
    name: 'active · pending · outline',
    type: 'boolean',
    default: 'false',
    description: '진행·대기·아웃라인 상태'
  },
  {
    name: 'dot · meta · children',
    type: 'ReactNode',
    default: '—',
    description: '도트·메타·본문 커스텀 콘텐츠'
  }
]

const classes = [
  {
    name: 'timeline · timeline_item · timeline_dot · timeline_content',
    type: 'class',
    default: '—',
    description: '기본 구조'
  },
  {
    name: 'timeline_card · timeline_alternate · timeline_horizontal · timeline_label-col',
    type: 'class',
    default: '—',
    description: '레이아웃 변형'
  },
  {
    name: 'timeline_sm · timeline_lg · timeline_icon · timeline_icon-sm',
    type: 'class',
    default: '—',
    description: '크기와 아이콘 변형'
  },
  {
    name: 'timeline_time · timeline_title · timeline_desc · timeline_meta · timeline_label',
    type: 'class',
    default: '—',
    description: '콘텐츠 파트'
  }
]

const tokens = [
  {
    name: '--timeline-gap · --timeline-dot-size · --timeline-line-width',
    type: 'length',
    default: '—',
    description: '항목 간격과 축'
  },
  {
    name: '--timeline-time-size · --timeline-title-size · --timeline-desc-size',
    type: 'length',
    default: '—',
    description: '타이포 크기'
  },
  {
    name: '--timeline-label-width',
    type: 'length',
    default: '4.5rem',
    description: '날짜 레이블 열 너비'
  }
]

export const timelineApiSections = [
  {
    title: 'API · Timeline Props',
    description: 'React · Next.js Timeline props입니다.',
    tables: [{ columns, rows: timelineProps }]
  },
  {
    title: 'API · TimelineItem Props',
    tables: [{ columns, rows: timelineItemProps }]
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
