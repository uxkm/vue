/**
 * Pagination 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'page · defaultPage',
    type: 'number',
    default: '— · 1',
    description: '현재 페이지(1부터)입니다. page 를 넘기면 제어하고, 생략하면 defaultPage 와 내부 상태로 동작합니다. 범위를 벗어나면 1~pageCount 로 보정합니다.'
  },
  {
    name: 'pageCount',
    type: 'number',
    default: '1',
    description: '전체 페이지 수입니다. 1 미만이면 1로 보정합니다.'
  },
  {
    name: 'siblingCount',
    type: 'number',
    default: '1',
    description: '현재 페이지 양옆에 보여줄 번호 개수입니다. 양 끝과 말줄임(…)은 자동으로 붙습니다.'
  },
  {
    name: 'onChange',
    type: '(page: number) => void',
    default: '—',
    description: '페이지가 바뀔 때 호출됩니다. 이전/다음 · 번호 · jumper 모두 동일합니다. 비제어 모드에서도 내부 페이지가 갱신됩니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '크기입니다. sm · lg 일 때 pagination_sm · pagination_lg 가 붙어 버튼 최소 크기·글자 크기가 바뀝니다.'
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: "'start'",
    description: '가로 정렬입니다. center · end 일 때 pagination_align-center · pagination_align-end 가 붙습니다.'
  },
  {
    name: 'round',
    type: 'boolean',
    default: 'false',
    description: 'pagination_round 를 붙여 링크·버튼을 pill 모서리로 만듭니다.'
  },
  {
    name: 'minimal',
    type: 'boolean',
    default: 'false',
    description: 'pagination_minimal 을 붙여 테두리·배경을 투명하게 합니다.'
  },
  {
    name: 'simple',
    type: 'boolean',
    default: 'false',
    description: 'pagination_simple 을 붙이고 번호 목록 대신 "현재 / 전체" 텍스트를 표시합니다.'
  },
  {
    name: 'total',
    type: 'ReactNode',
    default: '—',
    description: '왼쪽 pagination_total 안내입니다. 있으면 wrap 레이아웃으로 배치됩니다.'
  },
  {
    name: 'showJumper',
    type: 'boolean',
    default: 'false',
    description: '페이지 번호 입력(pagination_jumper)을 표시합니다. Enter · blur 시 onChange 가 호출됩니다.'
  },
  {
    name: 'hideOnSinglePage',
    type: 'boolean',
    default: 'false',
    description: '전체 페이지가 1 이하면 컴포넌트를 렌더링하지 않습니다.'
  },
  {
    name: 'prevLabel · nextLabel',
    type: 'ReactNode',
    default: "'이전' · '다음'",
    description: '이전·다음 버튼 문구입니다.'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: "'페이지 이동'",
    description: 'nav 의 aria-label 입니다.'
  },
  {
    name: 'className · ...props',
    type: 'nav attributes',
    default: '—',
    description: '루트(nav.pagination)에 합쳐지는 클래스와 속성입니다.'
  }
]

const classes = [
  {
    name: 'pagination · pagination_list · pagination_item',
    type: 'class',
    default: '—',
    description: '루트, 목록, 항목입니다.'
  },
  {
    name: 'pagination_link · pagination_btn · pagination_prev · pagination_next',
    type: 'class',
    default: '—',
    description: '페이지 번호 버튼과 이전·다음 버튼입니다. 활성 번호는 is-active · aria-current="page" 입니다.'
  },
  {
    name: 'pagination_ellipsis · pagination_simple-text · pagination_simple-current',
    type: 'class',
    default: '—',
    description: '말줄임 표시와 simple 모드의 현재/전체 텍스트입니다.'
  },
  {
    name: 'pagination_total · pagination_jumper · pagination_jumper-input',
    type: 'class',
    default: '—',
    description: '총 건수 안내와 페이지 점프 입력입니다.'
  },
  {
    name: 'pagination_wrap · pagination_wrap-end',
    type: 'class',
    default: '—',
    description: 'total · jumper 가 있을 때 쓰는 가로 배치 래퍼입니다.'
  },
  {
    name: 'pagination_sm · pagination_lg · pagination_align-center · pagination_align-end · pagination_round · pagination_minimal · pagination_simple',
    type: 'class',
    default: '—',
    description: '크기·정렬·라운드·미니멀·심플 변형입니다.'
  }
]

const tokens = [
  {
    name: '--pagination-gap · --pagination-total-gap · --pagination-wrap-gap',
    type: 'length',
    default: '0.25rem · var(--space-md) · var(--space-md)',
    description: '번호 간격, total과의 간격, wrap 안 간격입니다.'
  },
  {
    name: '--pagination-font-size · --pagination-font-size-sm · --pagination-font-size-lg',
    type: 'length',
    default: 'var(--text-size-sm) · xs · base',
    description: '기본·sm·lg 글자 크기입니다.'
  },
  {
    name: '--pagination-item-min-size · --pagination-item-min-size-sm · --pagination-item-min-size-lg',
    type: 'length',
    default: '2rem · 1.75rem · 2.5rem',
    description: '링크·버튼·말줄임의 최소 한 변 길이입니다.'
  },
  {
    name: '--pagination-bg · --pagination-bg-hover · --pagination-bg-active',
    type: 'color',
    default: 'surface · raised · accent',
    description: '기본·호버·활성 배경색입니다.'
  },
  {
    name: '--pagination-color · --pagination-color-muted · --pagination-color-active · --pagination-border-color',
    type: 'color',
    default: 'text · muted · on-accent · border',
    description: '글자·비활성·활성 글자·테두리 색입니다.'
  },
  {
    name: '--pagination-jumper-input-width · --pagination-simple-text-min-width',
    type: 'length',
    default: '3rem · 3.5rem',
    description: '점프 입력 너비와 simple 텍스트 최소 너비입니다.'
  }
]

export const paginationApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Pagination props입니다. page · pageCount 를 부모에서 제어하고 onChange 로 갱신합니다.',
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
