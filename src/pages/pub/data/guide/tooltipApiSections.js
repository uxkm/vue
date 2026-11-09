/**
 * Tooltip 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'content',
    type: 'ReactNode',
    default: '—',
    description: '말풍선(tooltip_bubble, role="tooltip")에 표시할 내용입니다. 필수 prop 입니다.'
  },
  {
    name: 'placement',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
    description: '트리거 기준 말풍선 방향입니다. bottom 은 클래스를 붙이지 않고, 나머지는 루트에 tooltip_placement-{값} 이 붙습니다. start · end 정렬 등 다른 변형은 className 으로 붙입니다.'
  },
  {
    name: 'trigger',
    type: 'ReactNode',
    default: '—',
    description: '말풍선을 띄울 대상(tooltip_trigger)입니다. 없으면 children 이 대상이 됩니다.'
  },
  {
    name: 'arrow',
    type: 'boolean',
    default: 'true',
    description: 'true 이면 말풍선에 tooltip_arrow 를 렌더링합니다. false 이면 tooltip_no-arrow 가 붙어 화살표가 숨겨집니다.'
  },
  {
    name: 'arrowPosition',
    type: 'string | number',
    default: '—',
    description: '화살표 위치(가장자리 기준 %). 넘기면 tooltip_arrow-anchor-mixed 와 --tooltip-arrow-position 이 적용됩니다. 예: \'25%\' · 50.'
  },
  {
    name: 'open',
    type: 'boolean',
    default: '—',
    description: '넘기면 표시 상태를 페이지가 제어합니다. 루트에 is-open 이 붙습니다.'
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: '비제어 초기 표시 상태입니다. open 을 넘기지 않을 때 씁니다.'
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '—',
    description: '표시 상태가 바뀔 때 호출됩니다(포인터 진입·이탈 · 포커스·블러 · 제어 토글).'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'trigger 가 없을 때 대상으로 렌더링할 내용입니다. 버튼처럼 포커스를 받는 요소를 넣으면 키보드 포커스로도 열립니다.'
  },
  {
    name: 'className · ...props',
    type: 'span attributes',
    default: '—',
    description: '루트(tooltip) 클래스와 네이티브 span 속성입니다. 크기(tooltip_sm · tooltip_lg) · 간격(tooltip_offset-*) · 정렬 · 스킨(tooltip_inverse) 변형은 className 으로 붙입니다.'
  }
]

const classes = [
  {
    name: 'tooltip · tooltip_trigger · tooltip_bubble',
    type: 'class',
    default: '—',
    description: '루트(inline-flex, position: relative), 대상, 절대 위치 말풍선입니다. 말풍선은 기본적으로 숨김이며 루트에 is-open 이 붙으면 표시됩니다. React Tooltip 은 포인터 진입 · 포커스 시 is-open 을 붙이고, 이탈 · 블러 시 뺍니다.'
  },
  {
    name: 'tooltip_placement-top · tooltip_placement-left · tooltip_placement-right',
    type: 'class',
    default: '—',
    description: '위 · 왼쪽 · 오른쪽 배치입니다. placement prop 이 붙이며, 기본(클래스 없음)은 트리거 아래 가운데입니다.'
  },
  {
    name: 'tooltip_placement-start · tooltip_placement-end',
    type: 'class',
    default: '—',
    description: '아래 배치에서 말풍선을 트리거 왼쪽 · 오른쪽 끝에 맞추는 변형입니다. className 으로 붙입니다.'
  },
  {
    name: 'tooltip_placement-top-start · tooltip_placement-top-end',
    type: 'class',
    default: '—',
    description: '위 배치에서 말풍선을 트리거 왼쪽 · 오른쪽 끝에 맞추는 변형입니다. className 으로 붙입니다(placement 는 기본값 유지).'
  },
  {
    name: 'tooltip_panel-align-start · tooltip_panel-align-center · tooltip_panel-align-end',
    type: 'class',
    default: '—',
    description: '교차축 말풍선 정렬 변형입니다. left · right 배치에서는 위 · 가운데 · 아래 정렬이 됩니다. 화살표 기준 클래스(tooltip_arrow-anchor-mixed)와 함께 쓰면 적용되지 않습니다.'
  },
  {
    name: 'tooltip_sm · tooltip_lg',
    type: 'class',
    default: '—',
    description: '크기 변형입니다. 말풍선 최대 너비 · 여백 · 글자 크기 · 화살표 크기 · 모서리 반경 토큰이 바뀝니다. 기본(클래스 없음)은 중간 크기입니다.'
  },
  {
    name: 'tooltip_offset-none · tooltip_offset-sm · tooltip_offset-lg',
    type: 'class',
    default: '—',
    description: '트리거와 말풍선 사이 전 방향 간격 변형입니다.'
  },
  {
    name: 'tooltip_offset-{top|right|bottom|left}-{none|sm|md|lg}',
    type: 'class',
    default: '—',
    description: '방향별 간격 변형입니다. 배치된 방향의 값만 적용됩니다.'
  },
  {
    name: 'tooltip_inverse',
    type: 'class',
    default: '—',
    description: '어두운 배경 · 밝은 글자 스킨입니다. 말풍선 · 화살표 · 닫기 버튼 색이 함께 바뀝니다.'
  },
  {
    name: 'tooltip_arrow · tooltip_no-arrow',
    type: 'class',
    default: '—',
    description: '말풍선 모서리 화살표와 화살표 숨김 변형입니다. React Tooltip 은 arrow 기본 true 일 때 tooltip_arrow 를 렌더링하고, arrow={false} 이면 tooltip_no-arrow 를 붙입니다. 방향은 placement 를 따릅니다.'
  },
  {
    name: 'tooltip_arrow-anchor-target · tooltip_arrow-anchor-mixed',
    type: 'class',
    default: '—',
    description: '화살표 위치 기준 변형입니다. arrowPosition 을 넘기면 React Tooltip 이 tooltip_arrow-anchor-mixed 와 --tooltip-arrow-position 을 자동으로 붙입니다.'
  },
  {
    name: 'tooltip_close · tooltip_close-icon · tooltip_close-floating · tooltip_bubble-closable',
    type: 'class',
    default: '—',
    description: '말풍선 닫기 버튼과 아이콘입니다. 클릭 트리거(data-tooltip-trigger="click") HTML 마크업용이며 React Tooltip 은 렌더링하지 않습니다.'
  },
  {
    name: 'is-open · is-disabled',
    type: 'class',
    default: '—',
    description: '말풍선 표시 상태(트리거 z-index 도 함께 올라감)와 비활성 상태입니다. HTML 마크업에서는 data-tooltip(호버 · 포커스) · data-tooltip-trigger="click"(클릭) · data-tooltip-close(닫기 버튼)로 동작을 고릅니다.'
  },
  {
    name: 'tooltip_demo-stage · tooltip_row · tooltip_demo-placement · tooltip_demo-placement-cell-{top|left|center|right}',
    type: 'class',
    default: '—',
    description: '문서 미리보기용 스테이지, 가로 행, 3열 배치 그리드와 셀입니다. 실제 화면에서는 쓰지 않습니다.'
  }
]

const tokens = [
  {
    name: '--z-tooltip',
    type: 'number',
    default: '120',
    description: '말풍선 레이어 순서입니다. 열린 트리거는 이보다 1 높게 올라갑니다.'
  },
  {
    name: '--tooltip-max-width',
    type: 'length',
    default: '16rem',
    description: '말풍선 최대 너비입니다. -sm(12rem), -lg(20rem) 접미 토큰이 있습니다.'
  },
  {
    name: '--tooltip-padding-x · --tooltip-padding-y',
    type: 'length',
    default: 'var(--space-sm) · 0.35rem',
    description: '말풍선 좌우 · 상하 여백입니다. -sm(space-xs · 0.25rem), -lg(space-md · 0.5rem) 접미 토큰이 있습니다.'
  },
  {
    name: '--tooltip-font-size',
    type: 'length',
    default: 'var(--text-size-xs)',
    description: '말풍선 글자 크기입니다. -sm(0.6875rem), -lg(text-size-sm) 접미 토큰이 있습니다.'
  },
  {
    name: '--tooltip-offset · --tooltip-offset-sm · --tooltip-offset-md · --tooltip-offset-lg',
    type: 'length',
    default: 'var(--space-xs) · 0.125rem · var(--space-xs) · var(--space-sm)',
    description: '트리거와 말풍선 사이 기본 · sm · md · lg 간격입니다. 방향별로는 --tooltip-offset-{top|right|bottom|left} 가 쓰입니다.'
  },
  {
    name: '--tooltip-arrow-size · --tooltip-arrow-clearance',
    type: 'length',
    default: '6px · calc(var(--tooltip-arrow-size) / 2)',
    description: '화살표 크기와 말풍선 · 트리거 사이 화살표 여유입니다. 화살표 크기는 -sm(5px), -lg(8px) 접미 토큰이 있고, tooltip_no-arrow 에서는 여유가 0 입니다.'
  },
  {
    name: '--tooltip-panel-radius · --tooltip-arrow-edge-inset',
    type: 'length',
    default: 'var(--radius-sm) · panel-radius + arrow-size × 0.35',
    description: '말풍선 모서리 반경(lg 는 radius-md)과 화살표가 모서리에서 떨어지는 최소 거리입니다.'
  },
  {
    name: '--tooltip-arrow-position',
    type: 'length',
    default: '50%',
    description: 'tooltip_arrow-anchor-target · tooltip_arrow-anchor-mixed 에서 화살표의 위치(가장자리 제한 안)입니다.'
  },
  {
    name: '--tooltip-inverse-bg · --tooltip-inverse-text',
    type: 'color',
    default: 'var(--color-text) · var(--color-surface)',
    description: 'tooltip_inverse 스킨의 배경과 글자색입니다.'
  },
  {
    name: '--tooltip-close-size · --tooltip-close-icon-size',
    type: 'length',
    default: '1.25rem · 0.75rem',
    description: '닫기 버튼 크기와 안의 아이콘 크기입니다. 클릭 트리거 HTML 마크업용입니다.'
  }
]

export const tooltipApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Tooltip props입니다. 기본은 포인터 · 포커스로 열리고, open · onOpenChange 로 페이지에서 표시를 제어할 수 있습니다.',
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
