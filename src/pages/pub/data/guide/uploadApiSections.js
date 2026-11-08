/**
 * Upload 가이드 — API · Props / Events / 클래스 / 디자인 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'variant',
    type: "'button' | 'drag' | 'list' | 'picture-card' | 'avatar'",
    default: "'button'",
    description: '업로드 UI 유형입니다.'
  },
  {
    name: 'files · defaultFiles',
    type: 'UploadFileItem[]',
    default: '[]',
    description: '제어 파일 목록과 초기 목록입니다.'
  },
  {
    name: 'multiple · accept',
    type: 'boolean · string',
    default: 'false · —',
    description: '다중 선택과 허용 파일 형식입니다.'
  },
  {
    name: 'maxSize · maxFiles',
    type: 'number',
    default: '—',
    description: '바이트 단위 파일 크기와 개수 제한입니다.'
  },
  {
    name: 'size · fit · disabled · error · dragover',
    type: 'string · boolean',
    default: "'md' · false",
    description: '크기, 너비, 상태 옵션입니다.'
  },
  {
    name: 'inputId · trigger · cards',
    type: 'string · ReactNode',
    default: '—',
    description: '파일 input ID와 사용자 정의 트리거·카드 콘텐츠입니다.'
  },
  {
    name: 'buttonLabel · title · description · hint',
    type: 'ReactNode',
    default: '—',
    description: '버튼·드롭존 문구와 도움말입니다.'
  },
  {
    name: 'className · ...props',
    type: 'string · file attributes',
    default: '—',
    description: '루트 클래스와 네이티브 file input 속성입니다.'
  }
]

const events = [
  {
    name: 'onChange',
    type: '(files: File[]) => void',
    default: '—',
    description: '선택 또는 삭제 후 호출됩니다.'
  },
  {
    name: 'onError',
    type: '(message: string) => void',
    default: '—',
    description: '파일 검증 실패 시 호출됩니다.'
  }
]

const classes = [
  {
    name: 'upload_trigger · upload_dropzone · upload_cards · upload_avatar',
    type: 'class',
    default: '—',
    description: '업로드 UI 구조입니다.'
  },
  {
    name: 'upload_list · upload_item · upload_progress',
    type: 'class',
    default: '—',
    description: '파일 목록과 진행률입니다.'
  },
  {
    name: 'upload_fit · upload_sm · upload_lg',
    type: 'class',
    default: '—',
    description: '너비·크기 변형입니다.'
  },
  {
    name: 'is-dragover · is-error · is-disabled',
    type: 'class',
    default: '—',
    description: '드래그와 상태 클래스입니다.'
  }
]

const tokens = [
  {
    name: '--upload-max-width · --upload-gap',
    type: 'length',
    default: '입력 너비 · space-sm',
    description: '컨테이너 너비와 간격입니다.'
  },
  {
    name: '--upload-dropzone-padding · --upload-dropzone-icon-size',
    type: 'length',
    default: '크기별 값',
    description: '드롭존의 여백과 아이콘 크기입니다.'
  },
  {
    name: '--upload-card-size',
    type: 'length',
    default: '6.5rem',
    description: '사진 카드 크기입니다.'
  },
  {
    name: '--upload-progress-height',
    type: 'length',
    default: '4px',
    description: '진행률 표시 높이입니다.'
  }
]

export const uploadApiSections = [
  {
    title: 'API · Props',
    description: 'React · Next.js Upload props입니다.',
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
