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
    name: 'value',
    type: 'string',
    default: '—',
    description: '노드 식별 값입니다. onSelect 에 전달됩니다.'
  },
  {
    name: 'label',
    type: 'string · ReactNode',
    default: '—',
    description: '노드 라벨'
  },
  {
    name: 'expanded',
    type: 'boolean',
    default: '—',
    description: '넘기면 펼침을 제어합니다(expanded !== undefined). 부모가 상태를 관리하고 onExpandedChange 로 갱신합니다.'
  },
  {
    name: 'defaultExpanded',
    type: 'boolean',
    default: 'true',
    description: '비제어 초기 펼침입니다. expanded 를 넘기지 않을 때 씁니다.'
  },
  {
    name: 'selected · defaultSelected',
    type: 'boolean',
    default: '— · false',
    description: '선택 상태입니다. selected 를 넘기면 제어하고, 생략하면 defaultSelected 와 내부 상태로 토글됩니다.'
  },
  {
    name: 'disabled · expandable',
    type: 'boolean',
    default: 'false',
    description: '비활성·확장 가능 상태'
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
    description: '펼침 상태 변경 콜백입니다. 제어 모드에서는 부모가 expanded 를 갱신합니다.'
  },
  {
    name: 'onSelectedChange',
    type: '(selected: boolean, event) => void',
    default: '—',
    description: '선택 상태가 바뀔 때 호출됩니다. 제어 모드에서는 부모가 selected 를 갱신합니다.'
  },
  {
    name: 'onSelect',
    type: '(value: string | undefined, event) => void',
    default: '—',
    description: '노드 선택 시 호출됩니다. onSelectedChange 또는 onSelect 를 넘기면 라벨이 클릭 가능해집니다.'
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
