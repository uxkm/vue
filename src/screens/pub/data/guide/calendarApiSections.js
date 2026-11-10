/**
 * Calendar 가이드 — API · Props / Month / 하위 컴포넌트 / 클래스 / 토큰
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const calendarProps = [
  {
    name: 'title',
    type: 'string',
    default: '—',
    description: '기본 헤더 제목'
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: '캘린더 접근성 라벨'
  },
  {
    name: 'size',
    type: "'' | 'sm' | 'lg'",
    default: "''",
    description: '셀과 패딩 크기'
  },
  {
    name: 'noHeader · minimal · compact',
    type: 'boolean',
    default: 'false',
    description: '헤더 생략·날짜 전용·컴팩트 레이아웃'
  },
  {
    name: 'borderless · shadow · ghost',
    type: 'boolean',
    default: 'false',
    description: '외형 스킨'
  },
  {
    name: 'week · agenda · wheel',
    type: 'boolean',
    default: 'false',
    description: '주간·세로 일정·휠 레이아웃'
  },
  {
    name: 'readonly · disabled',
    type: 'boolean',
    default: 'false',
    description: '읽기 전용·전체 비활성 상태'
  },
  {
    name: 'weekends',
    type: 'boolean',
    default: 'false',
    description: '주말 색상 표시'
  },
  {
    name: 'header · weekdays · footer · children',
    type: 'ReactNode',
    default: '—',
    description: '헤더, 요일, 본문, 푸터 콘텐츠'
  }
]

const monthProps = [
  {
    name: 'days',
    type: 'CalendarDayData[]',
    default: '샘플 월',
    description: '직접 제공하는 날짜 셀 데이터. selected 를 함께 넘기면 셀의 selected 플래그를 덮어써 제어할 수 있습니다.'
  },
  {
    name: 'selected · defaultSelected · today',
    type: 'number | null · number',
    default: '— · days 없을 때 15 · 12',
    description: '선택일(null 이면 미선택)과 오늘 날짜. selected 를 넘기면 제어하고, 생략하면 defaultSelected 와 내부 상태로 클릭 선택이 갱신됩니다. days 와 함께 써도 제어·비제어 선택이 셀에 반영됩니다.'
  },
  {
    name: 'disabled · events',
    type: 'number[]',
    default: '[]',
    description: '비활성·이벤트 날짜'
  },
  {
    name: 'rangeStart · rangeEnd',
    type: 'number',
    default: '—',
    description: '범위 시작·종료 날짜'
  },
  {
    name: 'partial',
    type: 'number',
    default: '—',
    description: '간단 예시에 표시할 날짜 개수'
  },
  {
    name: 'week · weekends · readonly',
    type: 'boolean',
    default: 'false',
    description: '주간·주말·읽기 전용 처리'
  },
  {
    name: 'onSelect',
    type: '(day: CalendarDayData, index: number) => void',
    default: '—',
    description: '날짜 셀 클릭 시 호출됩니다. 페이지에서 selected 상태를 제어합니다. otherMonth · disabled 셀은 호출되지 않습니다.'
  }
]

const subProps = [
  {
    name: 'CalendarHeader · title · showNav · onPrev · onNext',
    type: 'string · boolean · () => void',
    default: '— · true · —',
    description: '월 제목과 이전·다음 탐색. onPrev · onNext 로 페이지에서 월을 제어합니다.'
  },
  {
    name: 'CalendarNav · label · onPrev · onNext',
    type: 'string · () => void',
    default: '—',
    description: '주간 탐색 라벨과 이전·다음 콜백입니다.'
  },
  {
    name: 'CalendarWeekdays · labels',
    type: 'string[]',
    default: '일…토',
    description: '요일 라벨'
  },
  {
    name: 'CalendarFooter · onToday · onClear · onConfirm',
    type: '() => void',
    default: '—',
    description: '오늘 · 초기화 · 확인 클릭을 페이지에서 제어합니다. children 이 있으면 기본 버튼을 대체합니다.'
  },
  {
    name: 'CalendarWheel · onCancel · onConfirm',
    type: '() => void',
    default: '—',
    description: '휠 툴바 취소·완료 클릭 콜백입니다.'
  },
  {
    name: 'CalendarWheelColumn · items · selected · defaultSelected · onChange',
    type: 'array · value · (value) => void',
    default: '[] · — · —',
    description: '휠 열 항목과 선택 값입니다. selected 를 넘기면 제어 모드이고, onChange 로 페이지가 값을 관리합니다.'
  }
]

const classes = [
  {
    name: 'calendar · calendar_header · calendar_weekdays · calendar_grid · calendar_day',
    type: 'class',
    default: '—',
    description: '월간 캘린더 기본 구조'
  },
  {
    name: 'calendar_no-header · calendar_minimal · calendar_week',
    type: 'class',
    default: '—',
    description: '레이아웃 변형'
  },
  {
    name: 'calendar_borderless · calendar_shadow · calendar_ghost · calendar_sm · calendar_lg',
    type: 'class',
    default: '—',
    description: '스킨과 크기'
  },
  {
    name: 'is-today · is-selected · is-disabled · is-other-month · is-in-range · has-event',
    type: 'class',
    default: '—',
    description: '날짜 상태'
  },
  {
    name: 'calendar_wheel* · calendar_agenda* · calendar_group',
    type: 'class',
    default: '—',
    description: '휠·세로 일정·다중 패널 구조'
  }
]

const tokens = [
  {
    name: '--calendar-cell-size · --calendar-cell-size-sm · --calendar-cell-size-lg',
    type: 'length',
    default: '2.25rem · 1.875rem · 2.75rem',
    description: '날짜 셀 크기'
  },
  {
    name: '--calendar-gap · --calendar-font-size · --calendar-header-size',
    type: 'length',
    default: '2px · var(--text-size-sm) · var(--text-size-base)',
    description: '간격과 글자 크기'
  },
  {
    name: '--calendar-wheel-height · --calendar-wheel-step-height · --calendar-wheel-max-width',
    type: 'length',
    default: '13.75rem · 2rem · 22rem',
    description: '휠 선택기 치수'
  },
  {
    name: '--calendar-agenda-gap · --calendar-agenda-date-width',
    type: 'length',
    default: 'var(--space-md) · 3rem',
    description: '세로 일정 간격과 날짜 열 너비'
  }
]

export const calendarApiSections = [
  {
    title: 'API · Calendar Props',
    description: 'React · Next.js Calendar props입니다.',
    tables: [{ columns, rows: calendarProps }]
  },
  {
    title: 'API · CalendarMonth Props',
    tables: [{ columns, rows: monthProps }]
  },
  {
    title: 'API · 하위 컴포넌트',
    tables: [{ columns, rows: subProps }]
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
