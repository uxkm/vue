/**
 * Tag 가이드 — API · Props / 클래스 / 디자인 토큰
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
    name: 'variant',
    type: "'filled' | 'solid' | 'outline' | 'borderless'",
    default: 'filled',
    description: '스킨. filled는 클래스 없음.'
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
    description: '태그 문구. children이 있으면 children 우선.'
  },
  {
    name: 'round',
    type: 'boolean',
    default: 'false',
    description: 'pill 모서리(tag_round).'
  },
  {
    name: 'checkable',
    type: 'boolean',
    default: 'false',
    description: '선택 가능. button · aria-pressed.'
  },
  {
    name: 'add',
    type: 'boolean',
    default: 'false',
    description: '추가(+) 트리거. button 루트.'
  },
  {
    name: 'closable',
    type: 'boolean',
    default: 'false',
    description: '닫기 버튼. 상호작용 Tag와 조합 시 tag_control 분리.'
  },
  {
    name: 'closeLabel',
    type: 'string',
    default: '자동',
    description: '닫기 버튼 aria-label.'
  },
  {
    name: 'selected',
    type: 'boolean',
    default: '—',
    description: '선택 상태(제어, is-selected · aria-pressed). 넘기면 부모가 선택을 관리합니다.'
  },
  {
    name: 'defaultSelected',
    type: 'boolean',
    default: 'false',
    description: '비제어 초기 선택(checkable). selected 를 넘기지 않을 때 씁니다.'
  },
  {
    name: 'onSelectedChange',
    type: '(selected: boolean, event) => void',
    default: '—',
    description: 'checkable 선택 상태가 바뀔 때 호출됩니다. 페이지에서 선택값을 제어합니다.'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: '비활성. button은 disabled, 그 외 aria-disabled.'
  },
  {
    name: 'href',
    type: 'string',
    default: '—',
    description: '있으면 a 루트(링크 Tag).'
  },
  {
    name: 'ripple',
    type: 'boolean',
    default: 'false',
    description: '클릭 파장. true일 때 data-ripple.'
  },
  {
    name: 'icon',
    type: 'ReactNode',
    default: '—',
    description: '라벨 앞 아이콘(tag_icon).'
  },
  {
    name: 'onClick',
    type: '(event) => void',
    default: '—',
    description: '본문 클릭. disabled면 차단.'
  },
  {
    name: 'onClose',
    type: '(event) => void',
    default: '—',
    description: '닫기 버튼 클릭. 페이지 상태에서 해당 태그를 제거할 때 사용합니다.'
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

const groupProps = [
  {
    name: 'tight',
    type: 'boolean',
    default: 'false',
    description: '좁은 그룹 간격(tag_group-tight).'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: '그룹 접근성 이름.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '그룹에 배치할 Tag.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: '그룹 추가 클래스.'
  }
]

const classes = [
  { name: 'tag', type: 'class', default: '—', description: '루트 구조' },
  { name: 'tag_solid · tag_outline · tag_borderless', type: 'class', default: '—', description: '스킨(filled는 클래스 없음)' },
  { name: 'tag_sm · tag_lg', type: 'class', default: '—', description: '크기(md는 클래스 없음)' },
  { name: 'tag_round · tag_checkable · tag_add', type: 'class', default: '—', description: '모양·상호작용' },
  { name: 'tag_icon · tag_close · tag_control', type: 'class', default: '—', description: '아이콘·닫기·분리 본문' },
  { name: 'tag_group · tag_group-tight', type: 'class', default: '—', description: '그룹 · 좁은 간격' },
  { name: 'is-selected · is-disabled', type: 'class', default: '—', description: '상태' },
  { name: 'color_*', type: 'class', default: '—', description: '공통 색상 유틸리티' }
]

const tokens = [
  {
    name: '--tag-padding-y · --tag-padding-x · --tag-font-size',
    type: 'mixed',
    default: '0.15rem · 0.5rem · var(--text-size-xs)',
    description: '기본(md) 패딩·타이포'
  },
  {
    name: '--tag-padding-*-sm · --tag-font-size-sm · --tag-close-size-sm',
    type: 'mixed',
    default: '0.05rem · 0.35rem · 0.6875rem · 0.75rem',
    description: 'sm 크기'
  },
  {
    name: '--tag-padding-*-lg · --tag-font-size-lg · --tag-close-size-lg',
    type: 'mixed',
    default: '0.25rem · 0.65rem · var(--text-size-sm) · 1rem',
    description: 'lg 크기'
  },
  {
    name: '--tag-gap · --tag-close-size · --tag-icon-size · --tag-add-border-style',
    type: 'mixed',
    default: 'var(--space-xs) · 0.875rem · 0.875em · dashed',
    description: '간격·닫기·아이콘·추가 테두리'
  }
]

export const tagApiSections = [
  {
    title: 'API · Tag Props',
    description: 'React · Next.js Tag props입니다. children이 있으면 label보다 우선합니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · TagGroup Props',
    description: '관련 Tag를 role="group"으로 묶습니다.',
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
