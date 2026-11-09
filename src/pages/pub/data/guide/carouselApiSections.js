/**
 * Carousel 가이드 — API · Props / 클래스 / 디자인 토큰
 * Storybook(기타/Carousel) API 와 대응한다.
 */

const columns = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

const props = [
  {
    name: 'ariaLabel',
    type: 'string',
    default: "'콘텐츠 슬라이드'",
    description: '캐러셀 영역의 접근성 이름입니다. role="region" · aria-roledescription="carousel" 과 함께 씁니다.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: '높이와 내비게이션 크기입니다. sm → carousel_sm, lg → carousel_lg.'
  },
  {
    name: 'effect',
    type: "'fade' | 'coverflow'",
    default: '—',
    description: '슬라이드 전환 효과입니다. data-swiper-effect 로도 노출됩니다.'
  },
  {
    name: 'loop',
    type: 'boolean',
    default: 'false',
    description: '마지막과 첫 슬라이드를 순환합니다. 슬라이드 수·effect·grid 조건이 부족하면 자동으로 꺼집니다.'
  },
  {
    name: 'initialSlide',
    type: 'number',
    default: '0',
    description: '처음 표시할 슬라이드 인덱스입니다. index(제어)를 쓰지 않을 때 초기 위치입니다.'
  },
  {
    name: 'index',
    type: 'number',
    default: '—',
    description: '현재 슬라이드 인덱스(제어). 넘기면 페이지가 위치를 관리합니다.'
  },
  {
    name: 'onIndexChange',
    type: '(index: number, swiper) => void',
    default: '—',
    description: '슬라이드가 바뀔 때 호출됩니다. 제어 모드에서는 부모가 index 를 갱신합니다. 갱신하지 않으면 prop 위치로 되돌립니다.'
  },
  {
    name: 'playing · defaultPlaying · onPlayingChange',
    type: 'boolean · (playing) => void',
    default: '— · autoplay · —',
    description: '자동재생 재생/정지 상태입니다. playing 을 넘기면 페이지가 제어하고, 토글 시 onPlayingChange 가 호출됩니다.'
  },
  {
    name: 'navigation',
    type: 'boolean',
    default: 'true',
    description: '이전·다음 버튼(swiper-button-prev/next)을 표시합니다. 슬라이드가 1장이면 항상 숨깁니다.'
  },
  {
    name: 'pagination',
    type: "boolean | 'fraction' | 'progressbar' | 'custom'",
    default: 'true',
    description: '페이지네이션 유형입니다. true=점, false=숨김, fraction·progressbar·custom(번호). 슬라이드가 1장이면 항상 숨깁니다.'
  },
  {
    name: 'dotsOutside',
    type: 'boolean',
    default: 'false',
    description: '페이지네이션을 슬라이드 영역 밖에 표시합니다(carousel_dots-outside).'
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'CarouselSlide(또는 자동 래핑된 자식)입니다. 1장이면 좌우·닷·재생/정지·자동재생을 렌더하지 않습니다(is-single · data-single).'
  },
  {
    name: 'className · …rest',
    type: 'string · HTMLAttributes',
    default: '—',
    description: '루트(carousel) 클래스와 속성입니다. data-component="Carousel" 이 붙습니다.'
  }
]

const layoutProps = [
  {
    name: 'slidesPerView',
    type: "number | 'auto'",
    default: '1',
    description: '한 화면에 표시할 슬라이드 수입니다. multi · coverflow 이면 auto 로 취급됩니다.'
  },
  {
    name: 'slidesPerGroup',
    type: 'number',
    default: '1',
    description: '한 번에 이동할 슬라이드 수입니다.'
  },
  {
    name: 'spaceBetween',
    type: 'number',
    default: '0',
    description: '슬라이드 사이 간격(px)입니다. data-swiper-space-between 으로도 노출됩니다.'
  },
  {
    name: 'multi',
    type: 'boolean',
    default: 'false',
    description: '자동 너비 다중 슬라이드 레이아웃입니다(carousel_multi).'
  },
  {
    name: 'centered',
    type: 'boolean',
    default: 'false',
    description: '활성 슬라이드를 가운데 정렬합니다. coverflow 이면 자동으로 켜집니다.'
  },
  {
    name: 'gridRows',
    type: 'number',
    default: '1',
    description: '2 이상이면 다행 그리드입니다(carousel_grid).'
  },
  {
    name: 'gridFill',
    type: "'row' | 'column'",
    default: "'row'",
    description: '그리드 채움 방향입니다.'
  }
]

const autoplayProps = [
  {
    name: 'autoplay',
    type: 'boolean',
    default: 'false',
    description: '슬라이드를 자동 재생합니다. 재생·정지 토글도 함께 표시됩니다. 슬라이드가 1장이면 자동재생·토글을 쓰지 않습니다.'
  },
  {
    name: 'delay',
    type: 'number',
    default: '4000',
    description: '자동 재생 간격(ms)입니다.'
  },
  {
    name: 'autoplayToggle',
    type: 'boolean',
    default: 'false',
    description: '자동 재생이 꺼져 있어도 재생·정지 버튼(carousel_toggle)을 표시하고, 버튼·playing 으로 실제 자동재생을 켤 수 있습니다. 슬라이드가 1장이면 숨깁니다.'
  },
  {
    name: 'coverflowStyle',
    type: "'tilt' | 'rise'",
    default: "'tilt'",
    description: '커버플로우의 회전(tilt) 또는 축소(rise) 스타일입니다.'
  },
  {
    name: 'coverflowSides',
    type: "1 | 1.5 | 2 | 'auto'",
    default: '1.5',
    description: '활성 슬라이드 좌우 노출 범위입니다. carousel_coverflow-sides-* 클래스가 붙습니다.'
  },
  {
    name: 'coverflowEffect',
    type: 'object',
    default: '—',
    description: 'Swiper coverflowEffect 상세 옵션을 덮어씁니다.'
  }
]

const thumbsProps = [
  {
    name: 'thumbs',
    type: 'Swiper',
    default: '—',
    description: '연결할 썸네일 Swiper 인스턴스입니다.'
  },
  {
    name: 'thumbsControl',
    type: 'boolean',
    default: 'false',
    description: '썸네일 컨트롤 캐러셀로 동작합니다(carousel_thumbs · slideToClickedSlide).'
  },
  {
    name: 'watchSlidesProgress',
    type: 'boolean',
    default: 'false',
    description: '썸네일 연결·커버플로우를 위해 진행 상태를 감시합니다.'
  },
  {
    name: 'freeMode',
    type: 'boolean',
    default: 'false',
    description: '자유 스크롤 모드를 사용합니다.'
  },
  {
    name: 'onSwiper',
    type: '(swiper) => void',
    default: '—',
    description: '생성된 Swiper 인스턴스를 전달합니다.'
  },
  {
    name: 'ripple',
    type: 'boolean',
    default: 'true',
    description: '이전·다음·토글에 data-ripple 을 붙입니다.'
  }
]

const slideProps = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: '슬라이드 콘텐츠입니다.'
  },
  {
    name: 'className · …rest',
    type: 'string · HTMLAttributes',
    default: '—',
    description: 'swiper-slide 루트 클래스와 속성입니다.'
  }
]

const classes = [
  {
    name: 'carousel · carousel_demo',
    type: 'class',
    default: '—',
    description: '루트입니다. React 캐러셀은 항상 carousel_demo 를 포함합니다.'
  },
  {
    name: 'swiper · swiper-wrapper · swiper-slide',
    type: 'class',
    default: '—',
    description: 'Swiper 루트 · 트랙 · 한 장입니다. 루트에 role="region" · aria-roledescription="carousel" 이 붙습니다.'
  },
  {
    name: 'swiper-button-prev · swiper-button-next · swiper-pagination',
    type: 'class',
    default: '—',
    description: '이전 · 다음 · 페이지네이션입니다.'
  },
  {
    name: 'carousel_toggle · carousel_toggle-icon-play/pause',
    type: 'class',
    default: '—',
    description: '자동 재생 토글과 아이콘입니다. 정지 시 is-autoplay-paused · aria-pressed=false.'
  },
  {
    name: 'carousel_multi · carousel_grid · carousel_coverflow · carousel_thumbs · carousel_dots-outside',
    type: 'class',
    default: '—',
    description: '레이아웃·효과 변형 클래스입니다.'
  },
  {
    name: 'carousel_pagination-custom · carousel_pagination-progress',
    type: 'class',
    default: '—',
    description: '번호 불릿 · 프로그레스바 페이지네이션 스킨입니다.'
  },
  {
    name: 'data-swiper · data-swiper-effect · data-swiper-space-between',
    type: 'attr',
    default: '—',
    description: 'Swiper 초기화·효과·간격 속성입니다.'
  },
  {
    name: 'is-single · data-single · data-count',
    type: 'class · attr',
    default: '—',
    description: '슬라이드가 1장일 때 루트에 붙습니다. 이 경우 내비·페이지네이션·재생/정지를 렌더하지 않습니다.'
  }
]

const tokens = [
  {
    name: '--carousel-height · --carousel-radius',
    type: 'token',
    default: '16rem · radius-lg',
    description: '슬라이드 영역 높이와 모서리입니다.'
  },
  {
    name: '--carousel-nav-size · --carousel-nav-offset',
    type: 'token',
    default: '2.25rem · space-md',
    description: '내비게이션 크기와 위치입니다.'
  },
  {
    name: '--carousel-dot-size · --carousel-dot-size-active',
    type: 'token',
    default: '0.5rem · 1.25rem',
    description: '페이지네이션 점 크기입니다.'
  },
  {
    name: '--carousel-toggle-size',
    type: 'token',
    default: '2rem',
    description: '재생·정지 버튼 크기입니다.'
  }
]

export const carouselApiSections = [
  {
    title: 'API · 기본',
    description: 'React · Next.js Carousel props입니다. Swiper 기반으로 키보드·터치·페이지네이션·자동 재생을 지원합니다.',
    tables: [{ columns, rows: props }]
  },
  {
    title: 'API · 레이아웃',
    tables: [{ columns, rows: layoutProps }]
  },
  {
    title: 'API · 자동 재생과 효과',
    tables: [{ columns, rows: autoplayProps }]
  },
  {
    title: 'API · 썸네일',
    tables: [{ columns, rows: thumbsProps }]
  },
  {
    title: 'API · CarouselSlide',
    description: '한 장입니다. 생략하면 children 을 자동으로 swiper-slide 로 감쌉니다.',
    tables: [{ columns, rows: slideProps }]
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
