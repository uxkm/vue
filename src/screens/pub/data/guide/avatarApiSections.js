/**
 * Avatar 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'src',
    type: 'string',
    default: '—',
    description: '이미지 URL. 로드 실패 시 fallback.'
  },
  {
    name: 'alt',
    type: 'string',
    default: "''",
    description: '이미지 대체 텍스트.'
  },
  {
    name: 'initials',
    type: 'ReactNode',
    default: '—',
    description: '이미지 없을 때 이니셜. label 별칭 가능.'
  },
  {
    name: 'label',
    type: 'ReactNode',
    default: '—',
    description: 'initials 별칭.'
  },
  {
    name: 'icon',
    type: 'ReactNode',
    default: '—',
    description: '이미지 없을 때 아이콘. avatar_icon 클래스 권장.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'fallback. icon보다 뒤, initials보다 앞.'
  },
  {
    name: 'color',
    type: "'default' | 'primary' | 'success' | 'warning' | 'danger' | …",
    default: '—',
    description: '배경 색. color_*.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: 'md',
    description: '크기. md는 클래스 없음.'
  },
  {
    name: 'square',
    type: 'boolean',
    default: 'false',
    description: '사각형(avatar_square).'
  },
  {
    name: 'badgeColor',
    type: 'string',
    default: '—',
    description: '상태 점 색. avatar_badge color_*.'
  },
  {
    name: 'badgeLabel',
    type: 'string',
    default: '—',
    description: '상태 점 접근성 이름.'
  },
  {
    name: 'ariaHidden',
    type: 'boolean',
    default: 'false',
    description: '장식용 aria-hidden.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '루트 추가 클래스.'
  }
]

const groupProps = [
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: '그룹 접근성 이름(인원·목적).'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '겹쳐 보여줄 Avatar.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '그룹 추가 클래스.'
  }
]

const classes = [
  { name: 'avatar', type: 'class', default: '—', description: '루트 구조' },
  { name: 'avatar_sm · avatar_lg · avatar_xl', type: 'class', default: '—', description: '크기(md는 클래스 없음)' },
  { name: 'avatar_square', type: 'class', default: '—', description: '사각 모서리' },
  { name: 'avatar_image · avatar_icon · avatar_badge', type: 'class', default: '—', description: '이미지·아이콘·상태 점' },
  { name: 'avatar_group', type: 'class', default: '—', description: '겹침 그룹' },
  { name: 'color_*', type: 'class', default: '—', description: '공통 색상' }
]

const tokens = [
  {
    name: '--avatar-size · --avatar-size-sm · -lg · -xl',
    type: 'length',
    default: '2rem · 1.5rem · 2.5rem · 3.5rem',
    description: '아바타 한 변'
  },
  {
    name: '--avatar-font-size · --avatar-icon-size',
    type: 'length',
    default: '—',
    description: '이니셜·아이콘 크기'
  },
  {
    name: '--avatar-badge-size · --avatar-group-overlap',
    type: 'length',
    default: '8px · -0.5rem',
    description: '상태 점·그룹 겹침'
  }
]

export const avatarApiSections = [
  {
    title: 'API · Avatar Props',
    description: 'React · Next.js Avatar props입니다. src 이미지 → 실패/없으면 icon · children · initials 순입니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · AvatarGroup Props',
    description: '관련 Avatar를 role="group"으로 겹쳐 표시합니다.',
    tables: [{ columns, rows: groupProps }]
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
