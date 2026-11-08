/**
 * Tree 가이드 — API · Props / TreeNode / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const treeProps = [
  {
    name: 'bordered',
    type: 'boolean',
    default: 'false',
    description: '테두리 스킨'
  },
  {
    name: 'lines',
    type: 'boolean',
    default: 'false',
    description: '계층 연결선'
  },
  {
    name: 'compact',
    type: 'boolean',
    default: 'false',
    description: '컴팩트 밀도'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: '트리 접근성 이름'
  },
  {
    name: 'multiselectable',
    type: 'boolean',
    default: 'false',
    description: '다중 선택 가능 상태'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'TreeNode 자식'
  }
]

const treeNodeProps = [
  {
    name: 'label',
    type: 'string · ReactNode',
    default: '—',
    description: '노드 라벨'
  },
  {
    name: 'expanded · selected · disabled · expandable',
    type: 'boolean',
    default: 'false',
    description: '확장·선택·비활성·확장 가능 상태'
  },
  {
    name: 'plusToggle',
    type: 'boolean',
    default: 'false',
    description: '+/− 토글'
  },
  {
    name: 'toggleLabel',
    type: 'string',
    default: '—',
    description: '토글 접근성 이름'
  },
  {
    name: 'link',
    type: 'boolean',
    default: 'false',
    description: '클릭 가능한 라벨'
  },
  {
    name: 'meta',
    type: 'string · ReactNode',
    default: '—',
    description: '우측 보조 정보'
  },
  {
    name: 'prefix · icon · labelSlot · metaSlot · children',
    type: 'ReactNode',
    default: '—',
    description: '노드 커스텀 영역과 자식 노드'
  },
  {
    name: 'onExpandedChange',
    type: '(expanded: boolean) => void',
    default: '—',
    description: '펼침 상태 변경 콜백'
  }
]

const classes = [
  {
    name: 'tree · tree_item · tree_row · tree_label',
    type: 'class',
    default: '—',
    description: '기본 구조'
  },
  {
    name: 'tree_bordered · tree_lines · tree_compact',
    type: 'class',
    default: '—',
    description: '스킨과 밀도'
  },
  {
    name: 'tree_toggle · tree_toggle-plus · tree_toggle_placeholder',
    type: 'class',
    default: '—',
    description: '확장 토글'
  },
  {
    name: 'tree_link · tree_icon · tree_meta · tree_check',
    type: 'class',
    default: '—',
    description: '인터랙션과 보조 파트'
  },
  {
    name: 'is-selected · is-disabled',
    type: 'class',
    default: '—',
    description: '노드 상태'
  }
]

const tokens = [
  {
    name: '--tree-indent · --tree-row-height · --tree-gap',
    type: 'length',
    default: '—',
    description: '계층 들여쓰기와 행 밀도'
  },
  {
    name: '--tree-font-size · --tree-toggle-size',
    type: 'length',
    default: '—',
    description: '라벨과 토글 크기'
  },
  {
    name: '--tree-line-color',
    type: 'color',
    default: 'var(--color-border)',
    description: '연결선 색상'
  }
]

export const treeApiSections = [
  {
    title: 'API · Tree Props',
    description: 'React · Next.js Tree props입니다.',
    tables: [{ columns, rows: treeProps }]
  },
  {
    title: 'API · TreeNode Props',
    tables: [{ columns, rows: treeNodeProps }]
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
