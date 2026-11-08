/**
 * Floating 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'placement',
    type: "'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'",
    default: "'bottom-right'",
    description: '고정 모서리입니다. 기본은 우측 하단입니다. data-placement 으로도 노출됩니다.'
  },
  {
    name: 'offsetBottom',
    type: 'number',
    default: '24',
    description: '하단(또는 top-* 일 때 상단) 여백(px)입니다. Floating 자체가 고정 기준입니다.'
  },
  {
    name: 'offsetRight',
    type: 'number',
    default: '24',
    description: '우측(또는 *-left 일 때 좌측) 여백(px)입니다.'
  },
  {
    name: 'gap',
    type: 'number',
    default: '12',
    description: '아이템 사이 간격(px)입니다.'
  },
  {
    name: 'direction',
    type: "'column' | 'column-reverse' | 'row' | 'row-reverse'",
    default: "'column'",
    description: '스택 방향입니다. column 이면 위→아래(마지막 아이템이 하단). data-direction 으로도 노출됩니다.'
  },
  {
    name: 'order',
    type: 'string[]',
    default: '—',
    description: 'Floating.Item name 배열로 표시 순서를 지정합니다(시작→끝). 없는 name 은 뒤에 붙습니다. data-order 로도 노출됩니다.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Floating.Item · BackTop · 버튼 등입니다. Item 이 아니면 자동으로 Item 으로 감쌉니다.'
  },
  {
    name: 'className · …rest',
    type: 'string · HTMLAttributes',
    default: '—',
    description: '루트(floating) 클래스와 속성입니다. 루트에 data-floating 이 붙습니다.'
  }
]

const itemProps = [
  {
    name: 'name',
    type: 'string',
    default: '—',
    description: 'Floating order 배열에 매칭할 이름입니다. data-name 으로도 노출됩니다.'
  },
  {
    name: 'order',
    type: 'number',
    default: '—',
    description: 'CSS order 값입니다. 작을수록 direction 시작쪽에 가깝습니다. data-order 로도 노출됩니다.'
  },
  {
    name: 'hidden',
    type: 'boolean',
    default: 'false',
    description: 'true 면 아이템을 렌더하지 않아 스택 자리·gap 이 비지 않습니다. BackTop 미표시와 같이 숨긴 버튼 영역이 비어 보이지 않게 할 때 씁니다.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '아이템 안 콘텐츠입니다. BackTop · Button 등을 넣습니다.'
  }
]

const classes = [
  {
    name: 'floating · floating_item',
    type: 'class',
    default: '—',
    description: '루트 스택 · 아이템 칸입니다. 루트는 position:fixed(데모 래퍼 안에서는 absolute)입니다.'
  },
  {
    name: 'data-floating · data-placement · data-direction · data-order',
    type: 'attr',
    default: '—',
    description: 'Floating 활성화·배치·방향·순서 속성입니다.'
  },
  {
    name: 'data-floating-item · data-name · data-order',
    type: 'attr',
    default: '—',
    description: '아이템 속성입니다. name · order 와 대응합니다.'
  },
  {
    name: 'back_top.is-in-floating · data-in-floating',
    type: 'class · attr',
    default: '—',
    description: 'BackTop 이 Floating 안에 있을 때 붙습니다. 자체 fixed/오프셋이 해제되고 Floating 스택 기준으로 배치됩니다. is-visible 이 없으면 display:none 으로 자리도 비웁니다.'
  },
  {
    name: 'floating_item.is-hidden · [hidden]',
    type: 'class · attr',
    default: '—',
    description: '숨긴 아이템입니다. 스택에서 제거되어 빈 영역·gap 이 남지 않습니다. props.hidden 이면 렌더 자체를 생략합니다.'
  },
  {
    name: 'floating_demo-wrap · floating_demo-scroll · floating_demo-content',
    type: 'class',
    default: '—',
    description: '가이드 데모용 래퍼·스크롤·본문입니다. 래퍼 안 Floating 은 absolute 입니다. 너비 100%입니다.'
  },
  {
    name: 'floating_demo-window',
    type: 'class',
    default: '—',
    description: '문서(window) 기준 데모 안내 박스입니다. Floating 자체는 뷰포트 fixed 로 붙습니다.'
  }
]

const tokens = [
  {
    name: '--floating-z-index',
    type: 'token',
    default: '30',
    description: '고정 시 쌓임 순서입니다. BackTop(--back-top-z-index)보다 위에 두는 것을 권장합니다.'
  },
  {
    name: '--floating-gap · --floating-offset-bottom/right',
    type: 'token',
    default: '—',
    description: '기본 간격·여백 토큰입니다. props 가 있으면 인라인으로 덮습니다.'
  }
]

export const floatingApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Floating props입니다. placement · offset · gap · direction · order 로 우측 플로팅 스택을 구성합니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · Floating.Item',
    description: '스택 한 칸입니다. name 으로 order 배열에 매칭하고, order 숫자로 CSS order 를 줍니다.',
    tables: [{ columns, rows: itemProps }]
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
