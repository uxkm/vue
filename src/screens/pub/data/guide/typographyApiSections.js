/**
 * Typography 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'level',
    type: '1 | 2 | 3 | 4 | 5',
    default: '—',
    description: '제목 레벨. h1~h5와 typo_title-* 클래스를 결정. 지정 시 variant보다 우선.'
  },
  {
    name: 'variant',
    type: "'text' | 'paragraph' | 'lead' | 'caption' | 'label' | 'overline' | 'code' | 'kbd' | 'pre' | 'strong' | 'italic' | 'underline' | 'delete' | 'mark' | 'sub' | 'sup' | 'small' | 'link' | 'blockquote'",
    default: 'text',
    description: '텍스트 스타일과 기본 시맨틱 태그.'
  },
  {
    name: 'tag',
    type: 'string',
    default: '—',
    description: 'level·variant의 기본 루트 HTML 태그를 덮어씀.'
  },
  {
    name: 'color',
    type: "'default' | 'primary' | 'muted' | 'success' | 'warning' | 'danger' | 'info'",
    default: '—',
    description: '공통 color_* 유틸 → CSS 변수.'
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'lg' | 'xl'",
    default: '—',
    description: '공통 size_* 텍스트 크기.'
  },
  {
    name: 'ellipsis',
    type: '1 | 2 | 3',
    default: '—',
    description: '말줄임 줄 수. text_ellipsis 계열.'
  },
  {
    name: 'label',
    type: 'string',
    default: '—',
    description: '표시 텍스트. children이 있으면 children 우선.'
  },
  {
    name: 'href',
    type: 'string',
    default: '—',
    description: 'link variant 또는 a 태그일 때 이동 경로.'
  },
  {
    name: 'htmlFor',
    type: 'string',
    default: '—',
    description: 'label variant의 for 속성.'
  },
  {
    name: 'cite',
    type: 'string',
    default: '—',
    description: 'blockquote variant의 출처 URL.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '루트에 추가할 클래스.'
  }
]

const children = [
  {
    name: 'children',
    type: 'ReactNode',
    default: 'label',
    description: '제목·본문 콘텐츠. label보다 우선. 인라인 혼합 마크업에 사용.'
  }
]

const htmlRows = [
  {
    name: 'h1~h5',
    type: 'element',
    default: '—',
    description: 'level에 맞는 시맨틱 제목 + typo_title-*'
  },
  {
    name: 'p · strong · em · del · mark · sub · sup · small · code · kbd · pre · blockquote',
    type: 'element',
    default: '—',
    description: 'variant별 기본 네이티브 태그'
  },
  {
    name: 'href · htmlFor · cite',
    type: 'attribute',
    default: '—',
    description: '링크·레이블·인용문 속성'
  }
]

const classes = [
  { name: 'typo_title-1 ~ typo_title-5', type: 'class', default: '—', description: '제목 스케일' },
  { name: 'typo_paragraph · typo_lead · typo_caption · typo_label · typo_overline', type: 'class', default: '—', description: '본문·보조 텍스트' },
  { name: 'typo_strong · typo_italic · typo_underline · typo_delete · typo_mark', type: 'class', default: '—', description: '인라인 강조' },
  { name: 'typo_sub · typo_sup · typo_small', type: 'class', default: '—', description: '아래첨자·위첨자·소문자' },
  { name: 'typo_link', type: 'class', default: '—', description: '본문 인라인 링크' },
  { name: 'typo_code · typo_kbd · typo_pre', type: 'class', default: '—', description: '인라인 코드·키·코드 블록' },
  { name: 'typo_blockquote', type: 'class', default: '—', description: '인용 블록' },
  { name: 'typo_list · typo_list-ordered', type: 'class', default: '—', description: '비순서·순서 목록' },
  { name: 'typo_stack · typo_stack-lg', type: 'class', default: '—', description: '제목·본문 수직 간격' },
  { name: 'text_ellipsis · text_ellipsis-2 · text_ellipsis-3', type: 'class', default: '—', description: '1~3줄 말줄임' },
  { name: 'size_xs · size_sm · size_lg · size_xl', type: 'class', default: '—', description: '텍스트 크기' },
  { name: 'color_*', type: 'class', default: '—', description: '공통 색상 유틸리티' }
]

const tokens = [
  {
    name: '--typo-title-1-size · … · --typo-title-5-size',
    type: 'length',
    default: '2.375 · 1.875 · 1.5 · 1.25 · 1rem',
    description: '제목 레벨별 크기'
  },
  {
    name: '--typo-title-1-weight · … · --typo-title-5-weight',
    type: 'font-weight',
    default: '700 · 700 · 600 · 600 · 600',
    description: '제목 레벨별 굵기'
  },
  {
    name: '--typo-title-1-line-height · … · --typo-title-5-line-height',
    type: 'number',
    default: '1.2 · 1.25 · 1.3 · 1.35 · 1.4',
    description: '제목 레벨별 줄높이'
  },
  {
    name: '--typo-text-line-height',
    type: 'number',
    default: '1.6',
    description: '단락·목록·인용 줄높이'
  },
  {
    name: '--typo-paragraph-gap · --typo-list-gap',
    type: 'length',
    default: 'var(--space-md) · var(--space-xs)',
    description: '단락·목록 간격'
  },
  {
    name: '--typo-lead-size · --typo-caption-size · --typo-label-size',
    type: 'length',
    default: 'var(--text-size-lg) · var(--text-size-xs) · var(--text-size-sm)',
    description: '리드·캡션·레이블 크기'
  },
  {
    name: '--typo-mark-bg',
    type: 'color',
    default: 'rgba(250, 219, 20, 0.35)',
    description: '형광펜 배경'
  },
  {
    name: '--typo-sub-sup-size · --typo-sub-offset · --typo-sup-offset',
    type: 'length',
    default: '0.75em · -0.25em · -0.5em',
    description: '아래·위첨자 크기와 오프셋'
  },
  {
    name: '--typo-pre-padding · --typo-pre-radius',
    type: 'length',
    default: 'var(--space-md) · var(--radius-md)',
    description: '코드 블록 패딩·모서리'
  }
]

export const typographyApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Typography props입니다. level이 있으면 제목, 없으면 variant 본문입니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · Children',
    tables: [{ columns, rows: children }]
  },
  {
    title: 'HTML API · Markup',
    description: '시맨틱 태그에 공통 OOCSS 클래스를 직접 적용할 때도 동일합니다.',
    tables: [{ columns, rows: htmlRows }]
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
