/**
 * Drawer 가이드 — API · Props / Events / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'open · defaultOpen',
    type: 'boolean',
    default: '— · false',
    description: '열림 상태입니다. open 을 넘기면 제어하고, 생략하면 defaultOpen 과 내부 상태로 동작합니다. 닫기 시 onOpenChange(false) · onClose 가 호출됩니다.'
  },
  {
    name: 'placement',
    type: "'left' | 'right' | 'top' | 'bottom'",
    default: "'right'",
    description: '서랍이 붙는 화면 가장자리입니다. drawer_panel 에 drawer_placement-{값} 클래스가 붙습니다.'
  },
  {
    name: 'draggable',
    type: 'boolean',
    default: 'false',
    description: 'placement="bottom" 일 때만 유효합니다. true 이면 상단 핸들 바(drawer_handle)를 표시하고 드래그로 닫기·확장합니다. false 이면 바를 표시하지 않습니다.'
  },
  {
    name: 'expanded',
    type: 'boolean',
    default: '—',
    description: 'bottom + draggable 확장 높이(제어). 넘기면 부모가 확장 상태를 관리합니다. 넘기지 않으면 내부 상태로 동작합니다.'
  },
  {
    name: 'defaultExpanded',
    type: 'boolean',
    default: 'false',
    description: '비제어 모드의 초기 확장 여부입니다. expanded 를 넘기면 무시됩니다.'
  },
  {
    name: 'title',
    type: 'ReactNode',
    default: '—',
    description: '헤더에 굵게 표시할 제목입니다. 없으면 빈 제목 영역이 남아 닫기 버튼이 오른쪽 끝에 유지됩니다.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '본문(drawer_body)에 표시할 내용입니다.'
  },
  {
    name: 'footer',
    type: 'ReactNode',
    default: '—',
    description: '푸터 버튼 영역입니다. 오른쪽 정렬(drawer_footer-end)로 표시되며, 없으면 푸터를 렌더링하지 않습니다.'
  },
  {
    name: 'staticDemo',
    type: 'boolean',
    default: 'false',
    description: 'true 이면 drawer_demo-static 클래스를 붙여 drawer_demo-frame 안에 고정 표시합니다. 문서 미리보기용입니다.'
  },
  {
    name: 'className · ...props',
    type: 'div attributes',
    default: '—',
    description: '루트 클래스와 네이티브 div 속성입니다. 크기 변형(drawer_sm · drawer_lg)은 className 으로 붙입니다. role="dialog" · aria-modal="true" 는 자동 지정됩니다.'
  }
]

const events = [
  {
    name: 'onClose',
    type: '() => void',
    default: '—',
    description: '오버레이·닫기 버튼·(bottom+draggable) 아래로 드래그 닫기 시 호출됩니다. open 을 false 로 바꾸는 동작은 부모에서 처리합니다.'
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '—',
    description: '열림이 바뀔 때 호출됩니다(닫힐 때 false). onClose 와 함께 쓸 수 있습니다. open 을 false 로 바꾸는 동작은 부모에서 처리합니다.'
  },
  {
    name: 'onExpandedChange',
    type: '(expanded: boolean) => void',
    default: '—',
    description: 'bottom + draggable 에서 확장 상태가 바뀔 때 호출됩니다(드래그·페이지 토글). Drawer 가 닫힐 때도 false 로 호출되어 확장 상태를 초기화합니다. 제어 모드에서는 부모에서 expanded 를 바꿔야 합니다.'
  }
]

const classes = [
  {
    name: 'drawer · drawer_panel',
    type: 'class',
    default: '—',
    description: '서랍 루트(고정 오버레이 레이아웃)와 가장자리에서 나오는 패널입니다. open 이면 is-open 이 함께 붙습니다.'
  },
  {
    name: 'drawer_backdrop',
    type: 'class',
    default: '—',
    description: '배경 오버레이입니다. 클릭하면 onClose 가 호출됩니다.'
  },
  {
    name: 'drawer_header · drawer_title · drawer_close',
    type: 'class',
    default: '—',
    description: '헤더 영역, 제목, 닫기 버튼입니다. React Drawer 는 제목이 없어도 빈 drawer_title 을 두고(flex: 1), 닫기 버튼은 margin-left: auto 로 오른쪽 끝에 고정됩니다. 닫기 버튼 안에는 Icon close 가 들어갑니다.'
  },
  {
    name: 'drawer_extra',
    type: 'class',
    default: '—',
    description: '헤더 제목 옆 부가 영역입니다. HTML 마크업용이며 React Drawer 는 렌더링하지 않습니다.'
  },
  {
    name: 'drawer_body · drawer_footer',
    type: 'class',
    default: '—',
    description: '본문(스크롤)과 푸터 영역입니다.'
  },
  {
    name: 'drawer_placement-left · drawer_placement-right · drawer_placement-top · drawer_placement-bottom',
    type: 'class',
    default: '—',
    description: '패널(drawer_panel) 배치 변형입니다. placement 로 지정합니다.'
  },
  {
    name: 'drawer_sm · drawer_lg',
    type: 'class',
    default: '—',
    description: '크기 변형입니다. left·right 는 너비, top·bottom 은 높이 토큰이 바뀝니다. className 으로 붙입니다.'
  },
  {
    name: 'drawer_footer-start · drawer_footer-center · drawer_footer-end · drawer_footer-between',
    type: 'class',
    default: '—',
    description: '푸터 정렬 변형입니다. React Drawer 의 footer 는 drawer_footer-end 로 고정됩니다.'
  },
  {
    name: 'drawer_footer-even · drawer_footer-even-1-2 · drawer_footer-even-2-1 · drawer_footer-no-pad-b',
    type: 'class',
    default: '—',
    description: '푸터 버튼 균등 너비, 좌우 비율, 하단 패딩 제거 변형입니다.'
  },
  {
    name: 'drawer_footer-group',
    type: 'class',
    default: '—',
    description: 'drawer_footer-between 에서 좌·우에 묶는 버튼 그룹입니다.'
  },
  {
    name: 'drawer_draggable · drawer_handle · drawer_handle-bar',
    type: 'class',
    default: '—',
    description: 'bottom + draggable 일 때 패널·핸들·바에 붙습니다. 바는 드래그 모드에서만 보이며, 아래로 끌면 닫고 위로 끌면 확장(is-expanded)합니다.'
  },
  {
    name: 'is-expanded · is-dragging',
    type: 'class',
    default: '—',
    description: '하단 드래그 시트의 확장 높이와 드래그 중(transition 중지) 상태입니다.'
  },
  {
    name: 'drawer_demo-static · drawer_demo-frame · drawer_demo-frame-compact',
    type: 'class',
    default: '—',
    description: '문서 미리보기용 고정 배치와 프레임(기본·낮은 높이)입니다.'
  },
  {
    name: 'is-open · is-opening · is-closing · is-stack-covered',
    type: 'class',
    default: '—',
    description: '표시·애니메이션 상태와 중첩 시 하위 레이어 상태입니다. body.is-drawer-open 은 스크롤을 잠급니다.'
  }
]

const tokens = [
  {
    name: '--drawer-z-index',
    type: 'number',
    default: '250',
    description: '서랍 레이어 순서입니다.'
  },
  {
    name: '--drawer-width · --drawer-width-sm · --drawer-width-lg',
    type: 'length',
    default: '24rem · 18rem · 36rem',
    description: 'left·right 패널의 기본·sm·lg 너비입니다.'
  },
  {
    name: '--drawer-height · --drawer-height-sm · --drawer-height-lg',
    type: 'length',
    default: '18rem · 14rem · 26rem',
    description: 'top·bottom 패널의 기본·sm·lg 높이입니다.'
  },
  {
    name: '--drawer-bg · --drawer-shadow',
    type: 'color · shadow',
    default: 'var(--color-surface) · var(--shadow-md)',
    description: '패널 배경과 그림자입니다.'
  },
  {
    name: '--drawer-header-gap · --drawer-header-padding-y · --drawer-header-padding-x',
    type: 'length',
    default: 'var(--space-sm) · var(--space-md) · var(--space-lg)',
    description: '헤더 요소 간격과 내부 여백입니다.'
  },
  {
    name: '--drawer-title-font-size · --drawer-title-font-weight',
    type: 'length · number',
    default: 'var(--text-size-lg) · 600',
    description: '제목 글자 크기와 굵기입니다.'
  },
  {
    name: '--drawer-close-size · --drawer-close-icon-size',
    type: 'length',
    default: '2rem · 1.125rem',
    description: '닫기 버튼 크기와 안의 Icon 크기입니다.'
  },
  {
    name: '--drawer-body-padding-y · --drawer-body-padding-x · --drawer-body-font-size',
    type: 'length',
    default: 'var(--space-lg) · var(--space-lg) · var(--text-size-sm)',
    description: '본문 여백과 글자 크기입니다.'
  },
  {
    name: '--drawer-footer-gap · --drawer-footer-padding-y · --drawer-footer-padding-x',
    type: 'length',
    default: 'var(--space-sm) · var(--space-md) · var(--space-lg)',
    description: '푸터 버튼 간격과 내부 여백입니다.'
  },
  {
    name: '--drawer-panel-duration-x · --drawer-panel-duration-y · --drawer-backdrop-duration',
    type: 'time',
    default: '0.32s · 0.36s · 0.24s',
    description: '좌우·상하 패널 이동 시간과 백드롭 페이드 시간입니다.'
  },
  {
    name: '--drawer-panel-easing-x · --drawer-panel-easing-y',
    type: 'easing',
    default: 'cubic-bezier(0.32, 0.72, 0, 1) · cubic-bezier(0.33, 1, 0.68, 1)',
    description: '좌우·상하 패널 이동 가속 곡선입니다.'
  },
  {
    name: '--drawer-handle-width · --drawer-handle-height · --drawer-handle-hit · --drawer-handle-padding-top · --drawer-height-expanded',
    type: 'length',
    default: '2.25rem · 0.25rem · 1.25rem · space-sm · 90%',
    description: '하단 시트 핸들 막대 크기, 터치 영역, 위 여백, 확장 시 높이입니다. 드래그 모드에서는 헤더 상단 패딩도 줄입니다.'
  }
]

export const drawerApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Drawer props입니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · Events',
    tables: [{ columns, rows: events }]
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
