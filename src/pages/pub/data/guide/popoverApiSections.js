/**
 * Popover 가이드 — API · Props / Events / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'trigger',
    type: 'ReactNode',
    default: "'자세히'",
    description: '패널을 여닫는 트리거 버튼(btn btn_outline color_default popover_trigger)의 라벨입니다.'
  },
  {
    name: 'title',
    type: 'ReactNode',
    default: '—',
    description: '헤더(popover_header)에 굵게 표시할 제목입니다. 비어 있으면 헤더를 렌더링하지 않습니다.'
  },
  {
    name: 'content',
    type: 'ReactNode',
    default: '—',
    description: '본문(popover_body)에 표시할 내용입니다. 없으면 children 이 본문이 됩니다.'
  },
  {
    name: 'open',
    type: 'boolean',
    default: '—',
    description: '넘기면 제어 모드로 동작해 열림 상태를 부모가 관리합니다. 넘기지 않으면 내부 상태로 트리거를 누를 때마다 토글됩니다. 열리면 루트에 is-open 이 붙습니다.'
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: '비제어 모드의 초기 열림 여부입니다. open 을 넘기면 무시됩니다.'
  },
  {
    name: 'closable',
    type: 'boolean',
    default: 'true',
    description: 'true 이면 패널 헤더에 닫기 버튼(Icon close)을 표시합니다. 제목이 없어도 헤더와 닫기 버튼은 유지됩니다.'
  },
  {
    name: 'closeOnOutsideClick',
    type: 'boolean',
    default: 'true',
    description: 'true 이면 패널·트리거 바깥을 누를 때 닫힙니다. 제어 모드에서는 onOpenChange(false) 만 호출하므로 부모에서 open 을 바꿔야 합니다.'
  },
  {
    name: 'arrow',
    type: 'boolean',
    default: 'true',
    description: 'true 이면 패널에 popover_arrow 를 렌더링합니다. false 이면 popover_no-arrow 가 붙어 화살표가 숨겨집니다.'
  },
  {
    name: 'arrowPosition',
    type: 'string | number',
    default: '—',
    description: '화살표 위치(가장자리 기준 %). 넘기면 popover_arrow-anchor-mixed 와 --popover-arrow-position 이 적용됩니다. 예: \'25%\' · 50.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'content 가 없을 때 본문으로 표시할 내용입니다.'
  },
  {
    name: 'className · ...props',
    type: 'div attributes',
    default: '—',
    description: '루트(popover) 클래스와 네이티브 div 속성입니다. 배치(popover_placement-*) · 크기(popover_sm · popover_lg) · 간격(popover_offset-*) 변형은 className 으로 붙입니다. 패널에는 role="dialog" 가 자동 지정되고, 트리거에는 aria-expanded 가 열림 상태로 갱신됩니다.'
  }
]

const events = [
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '—',
    description: '열림 상태가 바뀔 때 호출됩니다(트리거 토글·닫기 버튼·바깥 클릭). 제어 모드(open 지정)에서는 상태를 바꾸는 동작을 부모에서 처리합니다.'
  }
]

const classes = [
  {
    name: 'popover · popover_trigger · popover_panel',
    type: 'class',
    default: '—',
    description: '루트(inline-flex, position: relative), 트리거 버튼, 절대 위치 패널입니다. 패널은 기본적으로 숨김이며 루트에 is-open 이 붙으면 표시됩니다.'
  },
  {
    name: 'popover_header · popover_title · popover_body',
    type: 'class',
    default: '—',
    description: '헤더 영역, 제목, 본문입니다. title 또는 closable 이면 헤더를 렌더링합니다.'
  },
  {
    name: 'popover_footer',
    type: 'class',
    default: '—',
    description: '오른쪽 정렬 버튼 영역입니다. HTML 마크업용이며 React Popover 는 렌더링하지 않습니다.'
  },
  {
    name: 'popover_arrow · popover_no-arrow',
    type: 'class',
    default: '—',
    description: '패널 모서리 화살표와 화살표 숨김 변형입니다. React Popover 는 arrow 기본 true 일 때 popover_arrow 를 렌더링하고, arrow={false} 이면 popover_no-arrow 를 붙입니다. 방향은 placement 클래스를 따릅니다.'
  },
  {
    name: 'popover_close · popover_close-icon · popover_close-floating · popover_panel-closable',
    type: 'class',
    default: '—',
    description: '패널 닫기 버튼과 아이콘입니다. React Popover 는 closable 일 때 popover_close + Icon close 를 헤더에 렌더링합니다. close-floating · panel-closable 은 HTML 마크업용입니다.'
  },
  {
    name: 'popover_placement-end · popover_placement-bottom-center · popover_placement-top · popover_placement-top-center · popover_placement-left · popover_placement-right',
    type: 'class',
    default: '—',
    description: '배치 변형입니다. 기본은 트리거 아래 · 왼쪽 정렬이며, 루트에 className 으로 붙입니다. placement prop 은 없습니다.'
  },
  {
    name: 'popover_panel-align-center · popover_panel-align-end',
    type: 'class',
    default: '—',
    description: '교차축 패널 정렬 변형입니다. 화살표 기준 클래스(popover_arrow-anchor-mixed)와 함께 쓰면 적용되지 않습니다.'
  },
  {
    name: 'popover_arrow-anchor-target · popover_arrow-anchor-mixed',
    type: 'class',
    default: '—',
    description: '화살표 위치 기준 변형입니다. arrowPosition 을 넘기면 React Popover 가 popover_arrow-anchor-mixed 와 --popover-arrow-position 을 자동으로 붙입니다.'
  },
  {
    name: 'popover_sm · popover_lg',
    type: 'class',
    default: '—',
    description: '크기 변형입니다. 패널 너비·여백·글자 크기·화살표 크기·모서리 반경 토큰이 바뀝니다. 기본(클래스 없음)은 중간 크기입니다.'
  },
  {
    name: 'popover_offset-none · popover_offset-sm · popover_offset-lg',
    type: 'class',
    default: '—',
    description: '트리거와 패널 사이 전 방향 간격 변형입니다.'
  },
  {
    name: 'popover_offset-{top|right|bottom|left}-{none|sm|md|lg}',
    type: 'class',
    default: '—',
    description: '방향별 간격 변형입니다. 배치된 방향의 값만 적용됩니다.'
  },
  {
    name: 'is-open · is-disabled',
    type: 'class',
    default: '—',
    description: '패널 표시 상태(트리거 z-index 도 함께 올라감)와 비활성 상태입니다. HTML 마크업에서는 data-popover(클릭) · data-popover-trigger="hover"(호버·포커스)로 트리거 방식을 고릅니다.'
  },
  {
    name: 'popover_demo-stage · popover_row · popover_inline-sentence · popover_demo-placement · popover_demo-placement-cell-{top|left|center|right}',
    type: 'class',
    default: '—',
    description: '문서 미리보기용 스테이지, 가로 행, 문장 속 배치, 3열 배치 그리드와 셀입니다. 실제 화면에서는 쓰지 않습니다.'
  }
]

const tokens = [
  {
    name: '--z-popover',
    type: 'number',
    default: '110',
    description: '패널 레이어 순서입니다. 열린 트리거는 이보다 1 높게 올라갑니다.'
  },
  {
    name: '--popover-min-width · --popover-max-width',
    type: 'length',
    default: '10rem · 20rem',
    description: '패널 최소·최대 너비입니다. -sm(8rem · 16rem), -lg(12rem · 28rem) 접미 토큰이 있습니다.'
  },
  {
    name: '--popover-padding-x · --popover-padding-y',
    type: 'length',
    default: 'var(--space-md)',
    description: '본문·제목·푸터 좌우, 본문 상하 여백입니다. -sm(space-sm), -lg(space-lg) 접미 토큰이 있습니다.'
  },
  {
    name: '--popover-title-padding-y · --popover-footer-padding-y',
    type: 'length',
    default: 'var(--space-sm)',
    description: '제목·푸터 상하 여백입니다. -sm(space-xs), -lg(space-md) 접미 토큰이 있습니다.'
  },
  {
    name: '--popover-title-font-size · --popover-body-font-size',
    type: 'length',
    default: 'var(--text-size-sm)',
    description: '제목·본문 글자 크기입니다. -sm(text-size-xs), -lg(text-size-base) 접미 토큰이 있습니다.'
  },
  {
    name: '--popover-offset · --popover-offset-sm · --popover-offset-md · --popover-offset-lg',
    type: 'length',
    default: 'var(--space-sm) · var(--space-xs) · var(--space-sm) · var(--space-md)',
    description: '트리거와 패널 사이 기본·sm·md·lg 간격입니다. 방향별로는 --popover-offset-{top|right|bottom|left} 가 쓰입니다.'
  },
  {
    name: '--popover-arrow-size · --popover-arrow-clearance',
    type: 'length',
    default: '8px · calc(var(--popover-arrow-size) / 2)',
    description: '화살표 크기와 패널·트리거 사이 화살표 여유입니다. 화살표 크기는 -sm(6px), -lg(10px) 접미 토큰이 있고, popover_no-arrow 에서는 여유가 0 입니다.'
  },
  {
    name: '--popover-panel-radius · --popover-arrow-edge-inset',
    type: 'length',
    default: 'var(--radius-lg) · panel-radius + arrow-size × 0.35',
    description: '패널 모서리 반경(sm 은 radius-md)과 화살표가 모서리에서 떨어지는 최소 거리입니다.'
  },
  {
    name: '--popover-arrow-position',
    type: 'length',
    default: '50%',
    description: 'popover_arrow-anchor-target · popover_arrow-anchor-mixed 에서 화살표의 위치(가장자리 제한 안)입니다.'
  },
  {
    name: '--popover-close-size · --popover-close-icon-size',
    type: 'length',
    default: '1.5rem · 0.875rem',
    description: '닫기 버튼 크기와 안의 아이콘 크기입니다.'
  }
]

export const popoverApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Popover props입니다.',
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
