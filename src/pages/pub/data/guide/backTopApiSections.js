/**
 * BackTop 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'visibilityHeight',
    type: 'number',
    default: '200',
    description: 'target 스크롤량이 이 값(px) 이상일 때 버튼을 표시합니다. data-visibility-height 로도 노출됩니다.'
  },
  {
    name: 'target',
    type: 'Window | HTMLElement | (() => …)',
    default: 'window',
    description: '스크롤 감지·맨 위 이동의 기준입니다. 생략/window → 문서 뷰포트(DOM window). HTMLElement → 그 요소의 내부 스크롤. 루트 data-target 은 window | container 입니다.'
  },
  {
    name: 'variant',
    type: "'primary' | 'ghost'",
    default: "'primary'",
    description: '버튼 스킨입니다. primary → back_top_primary, ghost → back_top_ghost 가 붙습니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '버튼 크기입니다. sm → back_top_sm, lg → back_top_lg 가 붙습니다.'
  },
  {
    name: 'label',
    type: 'ReactNode',
    default: "'맨 위로'",
    description: '버튼 라벨(back_top_label)입니다. children 이 있으면 쓰지 않습니다.'
  },
  {
    name: 'icon',
    type: 'ReactNode | false',
    default: 'chevron-up(기본)',
    description: '버튼 아이콘(back_top_icon)입니다. false 면 숨깁니다. children 이 있으면 쓰지 않습니다.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '버튼 안 콘텐츠입니다. 있으면 label · icon 대신 렌더합니다.'
  },
  {
    name: 'visible',
    type: 'boolean',
    default: '—',
    description: '넘기면 표시 여부를 페이지가 제어합니다. 생략 시 visibilityHeight 기준 자동 표시입니다.'
  },
  {
    name: 'onVisibleChange',
    type: '(visible: boolean) => void',
    default: '—',
    description: '스크롤 기반 표시 상태(is-visible)가 바뀔 때 호출됩니다. visible 제어와 함께 쓸 수 있습니다.'
  },
  {
    name: 'className · …rest',
    type: 'string · ButtonHTMLAttributes',
    default: '—',
    description: '버튼(back_top_btn) 클래스와 속성입니다. 루트에 data-back-top 이 붙습니다.'
  }
]

const classes = [
  {
    name: 'back_top · back_top_btn',
    type: 'class',
    default: '—',
    description: '루트 · 실제 버튼입니다. 표시되면 루트에 is-visible 이 붙습니다. 기본은 position:fixed(뷰포트 우하단)입니다.'
  },
  {
    name: 'back_top_icon · back_top_label',
    type: 'class',
    default: '—',
    description: '아이콘·라벨입니다. 기본 아이콘은 chevron-down 을 180° 회전해 위를 가리킵니다.'
  },
  {
    name: 'back_top_primary · back_top_ghost',
    type: 'class',
    default: '—',
    description: '버튼 스킨입니다. 버튼 요소에 붙습니다.'
  },
  {
    name: 'back_top_sm · back_top_lg',
    type: 'class',
    default: '—',
    description: '버튼 크기입니다. 버튼 요소에 붙습니다.'
  },
  {
    name: 'is-visible',
    type: 'class',
    default: '—',
    description: '표시 중일 때 루트(back_top)에 붙습니다. z-index 는 --back-top-z-index 입니다.'
  },
  {
    name: 'data-back-top · data-target · data-visibility-height',
    type: 'attr',
    default: '—',
    description: 'BackTop 활성화 속성입니다. data-target 은 window(문서 뷰포트) 또는 container(내부 스크롤)입니다. 스크롤·맨 위 이동은 이 target 기준입니다.'
  },
  {
    name: 'back_top_demo-wrap · back_top_demo-scroll · back_top_demo-content',
    type: 'class',
    default: '—',
    description: '가이드 데모용 래퍼·스크롤 컨테이너·본문입니다. 래퍼 안에서는 버튼이 컨테이너 우하단에 absolute 배치됩니다. 너비는 100%입니다.'
  },
  {
    name: 'back_top_demo-window',
    type: 'class',
    default: '—',
    description: '문서(window) 기준 데모 안내 박스입니다. BackTop 자체는 뷰포트 fixed 로 붙습니다.'
  }
]

const tokens = [
  {
    name: '--back-top-z-index',
    type: 'token',
    default: '20',
    description: '고정 시 쌓임 순서입니다.'
  },
  {
    name: '--back-top-size · --back-top-size-sm/lg',
    type: 'token',
    default: '—',
    description: '버튼 크기입니다.'
  },
  {
    name: '--back-top-offset-bottom · --back-top-offset-right',
    type: 'token',
    default: '—',
    description: '뷰포트(또는 데모 래퍼) 기준 우하단 여백입니다.'
  },
  {
    name: '--back-top-bg · --back-top-border · --back-top-shadow',
    type: 'token',
    default: '—',
    description: '버튼 배경·테두리·그림자입니다.'
  }
]

export const backTopApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js BackTop props입니다. visibilityHeight · target · variant · size · label 로 구성하고, 표시되면 루트에 is-visible 이 붙습니다.',
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
