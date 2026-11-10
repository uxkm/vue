/**
 * List 가이드 — API · Props / ListItem / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const listProps = [
  {
    name: 'bordered',
    type: 'boolean',
    default: 'false',
    description: '항목 테두리'
  },
  {
    name: 'split',
    type: 'boolean',
    default: 'false',
    description: '항목 구분선'
  },
  {
    name: 'block',
    type: 'boolean',
    default: 'false',
    description: '인라인 목록을 부모 너비로 확장'
  },
  {
    name: 'size',
    type: "'md' | 'compact'",
    default: 'md',
    description: '목록 밀도'
  },
  {
    name: 'variant',
    type: "'default' | 'bullet' | 'ordered' | 'definition'",
    default: 'default',
    description: '목록 의미와 기본 루트'
  },
  {
    name: 'tag',
    type: "'ul' | 'ol' | 'dl' | 'div'",
    default: 'variant 기준',
    description: '시맨틱 루트 재정의'
  },
  {
    name: 'layout',
    type: "'block' | 'inline'",
    default: 'block',
    description: '세로 또는 인라인 정의 레이아웃'
  },
  {
    name: 'inlineLabelWidth',
    type: 'string',
    default: '—',
    description: '인라인 정의 목록 제목 열 너비'
  },
  {
    name: 'inlineGap',
    type: 'string',
    default: '—',
    description: '인라인 정의 목록 열 간격'
  },
  {
    name: 'descAlign',
    type: "'left' | 'right'",
    default: 'left',
    description: '정의 설명 정렬'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '루트 추가 클래스'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'ListItem 자식들'
  }
]

const listItemProps = [
  {
    name: 'title',
    type: 'string · ReactNode',
    default: '—',
    description: '항목 제목'
  },
  {
    name: 'description',
    type: 'string · ReactNode',
    default: '—',
    description: '항목 설명'
  },
  {
    name: 'meta',
    type: 'string · ReactNode',
    default: '—',
    description: '항목 보조 메타'
  },
  {
    name: 'tag',
    type: "'auto' | 'li' | 'dt' | 'dd'",
    default: 'auto',
    description: '부모 문맥에 따른 항목 태그'
  },
  {
    name: 'prefix · extra · actions',
    type: 'ReactNode',
    default: '—',
    description: '앞 영역, 우측 보조 영역, 액션 영역'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '커스텀 본문(list_content)'
  }
]

const classes = [
  {
    name: 'list · list_item · list_content · list_title · list_desc · list_meta',
    type: 'class',
    default: '—',
    description: '목록·항목 기본 구조'
  },
  {
    name: 'list_bordered · list_divider · list_compact',
    type: 'class',
    default: '—',
    description: '스타일·밀도 변형'
  },
  {
    name: 'list_bullet* · list_ordered*',
    type: 'class',
    default: '—',
    description: '불릿·번호·계층 번호 변형'
  },
  {
    name: 'list_definition · list_inline · list_block · list_desc-right',
    type: 'class',
    default: '—',
    description: '정의 목록 레이아웃'
  },
  {
    name: 'list_link · list_extra · list_action',
    type: 'class',
    default: '—',
    description: '인터랙티브 본문과 우측 영역'
  }
]

const tokens = [
  {
    name: '--list-gap · --list-item-padding-y · --list-item-padding-x',
    type: 'length',
    default: 'var(--space-xs) · 0.65rem · 1rem',
    description: '목록 간격과 항목 패딩'
  },
  {
    name: '--list-title-size · --list-desc-size · --list-meta-size',
    type: 'length',
    default: '—',
    description: '항목 타이포 크기'
  },
  {
    name: '--list-inline-label-width · --list-inline-gap',
    type: 'length',
    default: '8rem · var(--space-md)',
    description: '인라인 정의 목록 열 설정'
  }
]

export const listApiSections = [
  {
    title: 'API · List Props',
    description: 'React · Next.js List props입니다.',
    tables: [{ columns, rows: listProps }]
  },
  {
    title: 'API · ListItem Props',
    tables: [{ columns, rows: listItemProps }]
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
