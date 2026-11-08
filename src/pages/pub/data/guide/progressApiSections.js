/**
 * Progress 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'percent',
    type: 'number',
    default: '0',
    description: '진행률(0~100)입니다. 0 미만 · 100 초과 · 숫자가 아닌 값은 0~100 으로 보정되어 막대 너비(width)와 aria-valuenow 에 쓰입니다.'
  },
  {
    name: 'status',
    type: "'' | 'success' | 'exception'",
    default: "''",
    description: "success 이면 루트에 is-success, exception 이면 is-exception 이 붙어 막대가 성공 · 위험 색이 됩니다. showInfo 문구는 각각 '완료' · '실패' 입니다."
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '크기입니다. sm · lg 일 때 루트에 progress_sm · progress_lg 가 붙고, md 는 클래스를 붙이지 않습니다.'
  },
  {
    name: 'color',
    type: "'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted' | ''",
    default: "'primary'",
    description: '막대(progress_bar)에 color_{값} 클래스를 붙입니다. 스타일에는 primary · success · warning · danger · muted 채움 색이 정의되어 있고, info 는 채움 색이 따로 없습니다. status 가 있으면 status 색이 우선합니다.'
  },
  {
    name: 'showInfo',
    type: 'boolean',
    default: 'false',
    description: 'true 이면 progress_info 에 문구를 표시합니다. 우선순위는 label → status 문구(완료 · 실패) → "{percent}%" 입니다. inside 이면 막대 안, 아니면 트랙 뒤에 놓입니다.'
  },
  {
    name: 'label',
    type: 'string',
    default: "''",
    description: 'showInfo 문구를 percent 대신 직접 지정합니다. ariaLabel 이 없으면 aria-label 로도 쓰입니다.'
  },
  {
    name: 'striped',
    type: 'boolean',
    default: 'false',
    description: '루트에 progress_striped 를 붙여 대각선 줄무늬를 표시합니다.'
  },
  {
    name: 'animated',
    type: 'boolean',
    default: 'false',
    description: '루트에 progress_animated 를 붙입니다. 줄무늬가 흐르는 애니메이션은 striped 와 함께 있을 때만 동작합니다.'
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    default: 'false',
    description: '루트에 is-indeterminate 를 붙여 막대(너비 40%)가 좌우로 반복 이동합니다. width 스타일과 aria-valuenow 는 생략됩니다.'
  },
  {
    name: 'inside',
    type: 'boolean',
    default: 'false',
    description: '루트에 progress_inside 를 붙입니다. showInfo 와 함께 쓰면 문구가 막대 안에 들어가며, 트랙 배경은 투명해지고 막대에 최소 너비가 생깁니다.'
  },
  {
    name: 'block',
    type: 'boolean',
    default: 'false',
    description: '루트에 progress_block 을 붙여 최대 너비 제한(--progress-max-width)을 해제하고 부모 너비를 채웁니다.'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: "''",
    description: 'aria-label 값입니다. ariaLabel → label → "진행률" 순으로 정해집니다.'
  },
  {
    name: 'className · ...props',
    type: 'div attributes',
    default: '—',
    description: '루트(progress)에 합쳐지는 클래스와 네이티브 div 속성입니다. role="progressbar" 와 aria-valuemin(0) · aria-valuemax(100) 는 항상 지정됩니다.'
  }
]

const classes = [
  {
    name: 'progress · progress_track · progress_bar',
    type: 'class',
    default: '—',
    description: '루트, 트랙(둥근 배경, overflow: hidden), 채움 막대입니다. 막대 너비는 style.width 로 지정되고 width 변화에 트랜지션이 적용됩니다.'
  },
  {
    name: 'progress_info',
    type: 'class',
    default: '—',
    description: 'React Progress showInfo 문구입니다. 트랙 뒤에 오면 루트가 한 줄(flex)이 되어 트랙 옆에 놓이고, progress_inside 안에서는 막대 글자색을 따릅니다.'
  },
  {
    name: 'progress_header · progress_label · progress_value',
    type: 'class',
    default: '—',
    description: 'HTML 마크업용 머리글입니다. 라벨(왼쪽)과 수치(오른쪽)를 한 줄에 배치하고, 트랙에 직접 role="progressbar" 를 둡니다. React Progress 는 렌더링하지 않습니다.'
  },
  {
    name: 'progress_fit · progress_block',
    type: 'class',
    default: '—',
    description: '너비 변형입니다. 루트 기본·progress_fit 은 width: --progress-max-width · max-width: 100% 이고, progress_block 은 width: 100% · max-width: none 으로 부모를 채웁니다.'
  },
  {
    name: 'progress_sm · progress_lg',
    type: 'class',
    default: '—',
    description: '크기 변형입니다. 막대 두께 · 라벨 · 값 글자 크기 토큰이 바뀌고, 원형에서는 지름 · 선 두께 · 값 글자 크기가 바뀝니다. 기본(클래스 없음)은 중간 크기입니다.'
  },
  {
    name: 'color_primary · color_success · color_warning · color_danger · color_muted',
    type: 'class',
    default: '—',
    description: '채움 색(--progress-fill)입니다. React Progress 는 progress_bar 에 붙이고, HTML 마크업에서는 루트(progress)에 붙여도 됩니다(원형 포함, primary · success · warning · danger).'
  },
  {
    name: 'is-success · is-exception',
    type: 'class',
    default: '—',
    description: '루트에 붙는 상태 클래스입니다. 막대 채움 색이 success · danger 로 바뀌며 color_* 보다 우선합니다.'
  },
  {
    name: 'progress_striped · progress_animated',
    type: 'class',
    default: '—',
    description: '막대 줄무늬(1rem 간격, 흰색 15% 투명도)와 줄무늬 이동 애니메이션(1s linear)입니다. animated 는 striped 와 함께 있을 때만 적용됩니다.'
  },
  {
    name: 'is-indeterminate',
    type: 'class',
    default: '—',
    description: '불확정 상태입니다. 막대 너비가 40% 로 고정되고 좌우 이동 애니메이션(1.5s)이 반복됩니다.'
  },
  {
    name: 'progress_inside',
    type: 'class',
    default: '—',
    description: '막대 안에 텍스트를 넣는 변형입니다. 트랙 배경은 투명, 막대는 flex 중앙 정렬 · 최소 너비 2.5rem · on-accent 글자색이 됩니다.'
  },
  {
    name: 'progress_circle · progress_circle-svg · progress_circle-track · progress_circle-bar · progress_circle-value',
    type: 'class',
    default: '—',
    description: '원형 진행률(HTML 마크업용)입니다. viewBox 0 0 100 100 · r=45 의 SVG 에 트랙 · 막대 circle 을 넣고, 루트에 style="--progress-percent: 0~100" 을 지정해 채움을 정합니다. 가운데 값은 progress_circle-value 입니다. React Progress 는 렌더링하지 않습니다.'
  }
]

const tokens = [
  {
    name: '--progress-height · --progress-height-sm · --progress-height-lg',
    type: 'length',
    default: '8px · 4px · 12px',
    description: '막대 트랙 두께의 기본 · sm · lg 값입니다. 크기 클래스는 --progress-height 를 해당 값으로 바꿉니다.'
  },
  {
    name: '--progress-radius',
    type: 'length',
    default: 'var(--radius-pill)',
    description: '트랙 모서리 반경입니다. 막대는 트랙 반경을 상속합니다.'
  },
  {
    name: '--progress-max-width',
    type: 'length',
    default: 'var(--input-max-width)',
    description: '루트 기본 너비입니다. 부모보다 넓으면 max-width: 100% 로 줄어들고, progress_block 은 제한을 해제합니다.'
  },
  {
    name: '--progress-gap',
    type: 'length',
    default: 'var(--space-sm)',
    description: '막대와 showInfo 문구 사이, 헤더 라벨과 값 사이 간격입니다.'
  },
  {
    name: '--progress-label-size · --progress-value-size · --progress-value-weight',
    type: 'length · number',
    default: 'var(--text-size-sm) · var(--text-size-sm) · 600',
    description: '라벨 글자 크기, 값(progress_value · progress_info) 글자 크기와 굵기입니다. sm 은 text-size-xs, lg 는 text-size-base 로 바뀝니다.'
  },
  {
    name: '--progress-inside-size',
    type: 'length',
    default: 'var(--text-size-xs)',
    description: 'progress_inside 막대 안 글자 크기입니다. sm 은 text-size-xs, lg 는 text-size-sm 입니다.'
  },
  {
    name: '--progress-fill',
    type: 'color',
    default: 'var(--color-accent)',
    description: '채움 색입니다. color_* · is-success · is-exception 이 바꾸며(success · danger · warning · muted 는 해당 시맨틱 색), 직접 지정해도 됩니다.'
  },
  {
    name: '--progress-percent',
    type: 'number',
    default: '0',
    description: '원형 진행률의 채움 비율(0~100)입니다. 막대형은 style.width 를 사용합니다.'
  },
  {
    name: '--progress-circle-size · --progress-circle-size-sm · --progress-circle-size-lg',
    type: 'length',
    default: '7.5rem · 5rem · 9rem',
    description: '원형 지름의 기본 · sm · lg 값입니다.'
  },
  {
    name: '--progress-circle-stroke · --progress-circle-stroke-sm · --progress-circle-stroke-lg',
    type: 'number',
    default: '6 · 4 · 8',
    description: '원형 선 두께(viewBox 100 기준)입니다.'
  },
  {
    name: '--progress-circle-value-size · --progress-circle-value-size-sm · --progress-circle-value-size-lg',
    type: 'length',
    default: 'var(--text-size-lg) · var(--text-size-sm) · var(--text-size-xl)',
    description: '원형 가운데 값(progress_circle-value) 글자 크기입니다.'
  }
]

export const progressApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Progress props입니다. 값 변경 이벤트는 없으며, percent 를 부모에서 갱신해 표시합니다.',
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
