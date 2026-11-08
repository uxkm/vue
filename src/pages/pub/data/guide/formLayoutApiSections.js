/**
 * Form Layout 가이드 — API · Props / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const layoutProps = [
  {
    name: 'as',
    type: 'string | component',
    default: "'form'",
    description: '렌더링할 루트 요소 또는 컴포넌트입니다.'
  },
  {
    name: 'layout',
    type: "'vertical' | 'horizontal' | 'inline'",
    default: "'vertical'",
    description: '필드 배치 방향입니다.'
  },
  {
    name: 'fit',
    type: 'boolean',
    default: 'false',
    description: '입력 영역을 공통 최대 너비로 제한합니다.'
  },
  {
    name: 'compact',
    type: 'boolean',
    default: 'false',
    description: '필드 사이 간격을 줄입니다.'
  },
  {
    name: 'labelAlign',
    type: "'end' | 'start'",
    default: "'end'",
    description: '가로 레이아웃의 레이블 정렬입니다.'
  },
  {
    name: 'labelWidth',
    type: "'' | 'sm' | 'lg'",
    default: "''",
    description: '가로 레이아웃의 레이블 열 너비입니다.'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'FormField와 FormActions 콘텐츠입니다.'
  },
  {
    name: 'className · ...props',
    type: 'string · form attributes',
    default: '—',
    description: '추가 클래스와 네이티브 form 속성입니다.'
  }
]

const fieldProps = [
  {
    name: 'as',
    type: 'string | component',
    default: "'div'",
    description: 'FormField 루트 요소입니다.'
  },
  {
    name: 'label',
    type: 'ReactNode | string',
    default: '—',
    description: '필드 레이블입니다.'
  },
  {
    name: 'htmlFor',
    type: 'string',
    default: '—',
    description: '레이블과 컨트롤을 연결할 id입니다.'
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description:
      '시각적 별표와 스크린 리더용 “필수 항목” 텍스트를 추가합니다. 실제 컨트롤에도 required를 지정해야 합니다.'
  },
  {
    name: 'hint · error · success',
    type: 'ReactNode | string',
    default: '—',
    description: '도움말, 오류, 성공 메시지입니다. 오류는 도움말보다 우선합니다.'
  },
  {
    name: 'fit',
    type: 'boolean',
    default: 'false',
    description: '개별 필드 너비를 제한합니다.'
  },
  {
    name: 'FormActions.as · children',
    type: 'string · ReactNode',
    default: "'div' · —",
    description: '제출·취소 같은 폼 액션 영역입니다.'
  }
]

const classes = [
  {
    name: 'form · form_vertical · form_horizontal · form_inline',
    type: 'class',
    default: '—',
    description: '폼 루트와 배치 방식입니다.'
  },
  {
    name: 'form_fit · form_compact',
    type: 'class',
    default: '—',
    description: '최대 너비와 조밀한 간격 변형입니다.'
  },
  {
    name: 'form_label-align-start · form_label-width-sm/lg',
    type: 'class',
    default: '—',
    description: '가로 레이블 정렬과 열 너비입니다.'
  },
  {
    name: 'form_field · form_field-label · form_field-control',
    type: 'class',
    default: '—',
    description: '필드, 레이블, 컨트롤 구조입니다.'
  },
  {
    name: 'form_field-required · form_field-required-text',
    type: 'class',
    default: '—',
    description: '시각적 별표와 보조기술용 필수 항목 텍스트입니다.'
  },
  {
    name: 'form_field-hint · form_field-error · form_field-success',
    type: 'class',
    default: '—',
    description: '도움말과 상태 메시지입니다.'
  },
  {
    name: 'form_actions',
    type: 'class',
    default: '—',
    description: '폼 하단 또는 인라인 액션 영역입니다.'
  }
]

const tokens = [
  {
    name: '--form-label-width · --form-label-width-sm · --form-label-width-lg',
    type: 'length',
    default: '7.5rem · 5rem · 10rem',
    description: '가로 레이아웃 레이블 열 너비입니다.'
  },
  {
    name: '--form-field-gap',
    type: 'length',
    default: 'var(--space-lg)',
    description: '필드 사이 세로 간격입니다.'
  },
  {
    name: '--form-inline-field-min-width',
    type: 'length',
    default: '8rem',
    description: '인라인 입력의 최소 너비입니다.'
  },
  {
    name: '--form-actions-gap',
    type: 'length',
    default: 'var(--space-sm)',
    description: '액션 버튼 사이 간격입니다.'
  },
  {
    name: '--input-max-width',
    type: 'length',
    default: '320px',
    description: 'fit 변형에서 공유하는 입력 최대 너비입니다.'
  }
]

export const formLayoutApiSections = [
  {
    title: 'API · FormLayout Props',
    description: 'React · Next.js FormLayout props입니다.',
    tables: [{ columns, rows: layoutProps }]
  },
  {
    title: 'API · FormField / FormActions',
    tables: [{ columns, rows: fieldProps }]
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
