/**
 * Empty 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'description',
    type: 'ReactNode',
    default: "''",
    description: "안내 문구입니다. empty_desc 에 들어갑니다. 비어 있고 title 도 없으면 '데이터가 없습니다' 가 표시됩니다."
  },
  {
    name: 'title',
    type: 'ReactNode',
    default: "''",
    description: 'deprecated. description 이 비어 있을 때만 안내 문구로 쓰입니다. description 을 사용하세요.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '크기입니다. sm · lg 일 때 empty_sm · empty_lg 가 붙어 이미지·글자·여백 토큰이 바뀝니다.'
  },
  {
    name: 'simple',
    type: 'boolean',
    default: 'false',
    description: 'empty_simple 을 붙여 empty_image 를 숨깁니다. 문구(와 footer)만 짧게 보여줄 때 씁니다.'
  },
  {
    name: 'block',
    type: 'boolean',
    default: 'false',
    description: 'empty_block 을 붙여 가로 전체 너비(flex)로 가운데 정렬합니다.'
  },
  {
    name: 'icon · image',
    type: 'ReactNode',
    default: '—',
    description: 'empty_image 안 미디어입니다. icon 이 있으면 icon 우선, 없으면 image 를 씁니다. 둘 다 없으면 이미지 영역을 렌더링하지 않습니다.'
  },
  {
    name: 'footer · children',
    type: 'ReactNode',
    default: '—',
    description: 'empty_footer 액션 영역입니다. footer 가 있으면 footer 우선, 없으면 children 을 넣습니다.'
  },
  {
    name: 'className · ...props',
    type: 'div attributes',
    default: '—',
    description: '루트(empty)에 합쳐지는 클래스와 네이티브 div 속성입니다. role="status" 는 항상 지정됩니다.'
  }
]

const classes = [
  {
    name: 'empty',
    type: 'class',
    default: '—',
    description: '루트입니다. 세로 inline-flex · 가운데 정렬 · 패딩이 기본입니다.'
  },
  {
    name: 'empty_image · empty_desc · empty_footer',
    type: 'class',
    default: '—',
    description: '이미지(아이콘) 영역, 안내 문구, 하단 액션 줄입니다. 이미지는 aria-hidden, 문구는 p.empty_desc 를 권장합니다.'
  },
  {
    name: 'empty_sm · empty_lg',
    type: 'class',
    default: '—',
    description: '크기 변형입니다. 이미지 한 변·설명 글자 크기·세로 패딩·간격 토큰이 바뀝니다.'
  },
  {
    name: 'empty_simple',
    type: 'class',
    default: '—',
    description: 'empty_image 를 display:none 으로 숨깁니다.'
  },
  {
    name: 'empty_block',
    type: 'class',
    default: '—',
    description: 'display:flex · width:100% 로 부모 가로를 채웁니다.'
  }
]

const tokens = [
  {
    name: '--empty-gap · --empty-padding-y · --empty-padding-x',
    type: 'length',
    default: 'var(--space-sm) · var(--space-xl) · var(--space-md)',
    description: '자식 간격과 루트 패딩입니다. sm · lg 가 gap · padding-y 를 바꿉니다.'
  },
  {
    name: '--empty-image-size · --empty-image-size-sm · --empty-image-size-lg',
    type: 'length',
    default: '4rem · 3rem · 5rem',
    description: 'empty_image 한 변 길이입니다. 크기 클래스가 --empty-image-size 를 바꿉니다.'
  },
  {
    name: '--empty-icon-color',
    type: 'color',
    default: 'var(--color-border)',
    description: '이미지 영역 글자·스트로크 색입니다.'
  },
  {
    name: '--empty-desc-size · --empty-desc-color · --empty-desc-max-width',
    type: 'length · color',
    default: 'var(--text-size-sm) · var(--color-text-muted) · 20rem',
    description: '안내 문구 크기·색·최대 너비입니다. sm 은 text-size-xs, lg 는 text-size-base 입니다.'
  },
  {
    name: '--empty-footer-gap · --empty-footer-offset',
    type: 'length',
    default: 'var(--space-sm) · var(--space-xs)',
    description: 'footer 안 버튼 간격과 설명과의 위쪽 여백입니다.'
  }
]

export const emptyApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Empty props입니다. 데이터 없음 안내와 선택적 아이콘·액션을 구성합니다.',
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
