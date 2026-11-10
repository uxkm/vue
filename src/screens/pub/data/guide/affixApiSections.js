/**
 * Affix 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'offsetTop',
    type: 'number',
    default: '0',
    description: 'position="top" 일 때 target 가시 영역 상단에서의 여백(px)입니다. data-offset-top 으로도 노출됩니다.'
  },
  {
    name: 'offsetBottom',
    type: 'number',
    default: '0',
    description: 'position="bottom" 일 때 target 가시 영역 하단에서의 여백(px)입니다. 하단 고정 좌표도 이 가시 하단을 기준으로 맞춥니다. data-offset-bottom 으로도 노출됩니다.'
  },
  {
    name: 'position',
    type: "'top' | 'bottom'",
    default: "'top'",
    description: '고정 방향입니다. top → target 가시 상단, bottom → target 가시 하단에 붙습니다.'
  },
  {
    name: 'target',
    type: 'Window | HTMLElement | (() => …)',
    default: 'window',
    description: '스크롤·고정 좌표의 기준입니다. 생략/window → 문서 뷰포트(DOM window). HTMLElement → 그 요소의 가시 영역(내부 스크롤). 루트 data-target 은 window | container 입니다.'
  },
  {
    name: 'skin',
    type: "'bar' | 'anchor'",
    default: "'bar'",
    description: '타깃 스킨입니다. bar → affix_bar, anchor → affix_anchor 가 붙습니다.'
  },
  {
    name: 'label',
    type: 'ReactNode',
    default: '—',
    description: 'skin="bar" 일 때 왼쪽 라벨(affix_bar-label)입니다. children 이 있으면 쓰지 않습니다.'
  },
  {
    name: 'actions',
    type: 'ReactNode',
    default: '—',
    description: 'skin="bar" 일 때 오른쪽 액션(affix_bar-actions)입니다. children 이 있으면 쓰지 않습니다.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'affix_target 안 콘텐츠입니다. 있으면 label · actions 대신 렌더합니다. 앵커 링크 나열 등에 씁니다.'
  },
  {
    name: 'fixed',
    type: 'boolean',
    default: '—',
    description: '넘기면 고정 표시를 페이지가 제어합니다. 생략 시 offset · target 기준 자동 고정입니다.'
  },
  {
    name: 'onChange',
    type: '(fixed: boolean) => void',
    default: '—',
    description: '스크롤 기반 고정 상태(is-fixed)가 바뀔 때 호출됩니다. fixed 제어와 함께 쓸 수 있습니다.'
  },
  {
    name: 'className · …rest',
    type: 'string · HTMLAttributes',
    default: '—',
    description: '루트(affix) 클래스와 속성입니다. 루트에 data-affix 가 붙습니다.'
  }
]

const classes = [
  {
    name: 'affix · affix_placeholder · affix_target',
    type: 'class',
    default: '—',
    description: '루트 · 높이 보정용 placeholder · 실제 고정 대상입니다. 고정되면 target 에 is-fixed 가 붙고 placeholder 높이가 맞춰집니다. 너비는 100%입니다.'
  },
  {
    name: 'affix_bar · affix_bar-label · affix_bar-actions',
    type: 'class',
    default: '—',
    description: '기본 바 스킨과 라벨·액션 영역입니다.'
  },
  {
    name: 'affix_anchor',
    type: 'class',
    default: '—',
    description: '앵커 링크 가로 스크롤 바 스킨입니다.'
  },
  {
    name: 'is-fixed',
    type: 'class',
    default: '—',
    description: '고정 중일 때 affix_target 에 붙습니다. z-index 는 --affix-z-index 입니다.'
  },
  {
    name: 'data-affix · data-target · data-offset-top · data-offset-bottom',
    type: 'attr',
    default: '—',
    description: 'Affix 활성화 속성입니다. data-target 은 window(문서 뷰포트) 또는 container(내부 스크롤 가시 영역)입니다. offset 은 해당 가시 상·하단 기준입니다.'
  },
  {
    name: 'affix_demo-scroll · affix_demo-page · affix_demo-content',
    type: 'class',
    default: '—',
    description: '가이드 데모용 스크롤 컨테이너·본문입니다. 너비 100%입니다.'
  }
]

const tokens = [
  {
    name: '--affix-z-index',
    type: 'token',
    default: '10',
    description: '고정 시 쌓임 순서입니다.'
  },
  {
    name: '--affix-bar-gap · --affix-bar-padding-y/x',
    type: 'token',
    default: '—',
    description: '바 간격·패딩입니다.'
  },
  {
    name: '--affix-bar-bg · --affix-bar-border · --affix-bar-shadow',
    type: 'token',
    default: '—',
    description: '바 배경·테두리·그림자입니다.'
  }
]

export const affixApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Affix props입니다. offsetTop · target · skin · label · actions 로 구성하고, 스크롤 시 affix_target 에 is-fixed 가 붙습니다.',
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
