'use client'

import { useState } from 'react'
import { Carousel, CarouselSlide } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { carouselApiSections } from '@/screens/pub/data/guide/carouselApiSections'

const SLIDES = [
  { id: 1, overline: '이벤트', title: '신규 가입 혜택', body: '첫 주문 20% 할인 쿠폰을 드립니다.', color: 'primary' },
  { id: 2, overline: '혜택', title: '무료 배송', body: '3만 원 이상 구매 시 전 상품 무료 배송이 적용됩니다.', color: 'success' },
  { id: 3, overline: '세일', title: '시즌 세일', body: '베스트셀러 상품을 최대 50% 할인합니다.', color: 'warning' },
  { id: 4, overline: '멤버십', title: 'VIP 혜택', body: '등급별 적립률과 전용 쿠폰을 제공합니다.', color: 'info' },
  { id: 5, overline: '컬렉션', title: '신상품 입고', body: '이번 주 새로 들어온 아이템을 만나 보세요.', color: 'primary' },
  { id: 6, overline: '리뷰', title: '베스트 리뷰', body: '구매 후기가 좋은 상품만 모았습니다.', color: 'success' },
  { id: 7, overline: '기획', title: '브랜드위크', body: '인기 브랜드 특별가가 진행 중입니다.', color: 'warning' },
  { id: 8, overline: '안내', title: '앱 전용 쿠폰', body: '앱에서만 쓸 수 있는 추가 할인을 받으세요.', color: 'info' }
]

/** Storybook Slides — Card 슬라이드 */
function SlideCard ({ slide, compact = false }) {
  return (
    <article className={`card card_accent color_${slide.color ?? 'primary'} card_elevated`}>
      <div className="card_body">
        <p className="typo_overline">{slide.overline ?? '슬라이드'}</p>
        <h3 className="card_title">{slide.title}</h3>
        <p className={compact ? 'card_subtitle' : 'typo_lead'}>{slide.body}</p>
      </div>
    </article>
  )
}

function Slides ({ data = SLIDES.slice(0, 3), compact = false }) {
  return (
    <>
      {data.map((slide) => (
        <CarouselSlide key={slide.id}>
          <SlideCard slide={slide} compact={compact} />
        </CarouselSlide>
      ))}
    </>
  )
}

/** index · onIndexChange · playing · onPlayingChange 로 슬라이드·재생을 제어하는 예시 */
function ControlledIndexDemo () {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  return (
    <div className="demo-stack">
      <Carousel
        ariaLabel="제어 슬라이드"
        autoplay
        index={index}
        onIndexChange={(next) => setIndex(next)}
        playing={playing}
        onPlayingChange={setPlaying}
      >
        <Slides />
      </Carousel>
      <p>
        index: <code>{index}</code>
        {' · '}
        playing: <code>{String(playing)}</code>
      </p>
    </div>
  )
}

/** 썸네일 갤러리 — 메인 + 썸네일 Swiper 연결 */
function ThumbsGalleryDemo () {
  const [thumbs, setThumbs] = useState(null)
  const data = SLIDES.slice(0, 8)

  return (
    <div className="carousel_gallery">
      <Carousel ariaLabel="갤러리 메인" thumbs={thumbs} pagination={false}>
        <Slides data={data} />
      </Carousel>
      <Carousel
        ariaLabel="갤러리 썸네일"
        className="carousel_thumbs"
        slidesPerView={4}
        spaceBetween={8}
        pagination={false}
        navigation={false}
        thumbsControl
        watchSlidesProgress
        onSwiper={setThumbs}
      >
        <Slides data={data} compact />
      </Carousel>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        Swiper 기반 캐러셀입니다. 루트는 <code>role=&quot;region&quot;</code> ·
        <code>aria-roledescription=&quot;carousel&quot;</code> · <code>ariaLabel</code>을 제공합니다.
        <code>index</code> · <code>onIndexChange</code>로 현재 슬라이드를,
        <code>playing</code> · <code>onPlayingChange</code>로 자동재생을 페이지에서 제어합니다.
      </>
    ),
    code: wrapPageExample(`const [index, setIndex] = useState(0)
const [playing, setPlaying] = useState(true)

<Carousel
  ariaLabel="프로모션 슬라이드"
  autoplay
  index={index}
  onIndexChange={(next, swiper) => setIndex(next)}
  playing={playing}
  onPlayingChange={setPlaying}
>
  <CarouselSlide>…</CarouselSlide>
</Carousel>`, {
      name: 'CarouselExample',
      reactImports: ['useState'],
      compImports: ['Carousel', 'CarouselSlide']
    }),
    preview: <ControlledIndexDemo />
  },
  {
    title: '단일 슬라이드',
    description: (
      <>
        장이 하나면 컴포넌트가 좌우·닷·재생/정지를 숨깁니다.
        루트에 <code>is-single</code> · <code>data-single</code> · <code>data-count=&quot;1&quot;</code>이 붙습니다.
      </>
    ),
    code: wrapPageExample(`<Carousel ariaLabel="단일 슬라이드" autoplay navigation pagination>
  <CarouselSlide>
    <article className="card card_accent color_primary card_elevated">
      <div className="card_body">
        <p className="typo_overline">이벤트</p>
        <h3 className="card_title">신규 가입 혜택</h3>
        <p className="typo_lead">첫 주문 20% 할인 쿠폰을 드립니다.</p>
      </div>
    </article>
  </CarouselSlide>
</Carousel>`, {
  name: 'CarouselExample1',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <Carousel ariaLabel="단일 슬라이드" autoplay navigation pagination>
        <Slides data={SLIDES.slice(0, 1)} />
      </Carousel>
    )
  },
  {
    title: '페이드',
    description: (
      <>
        <code>effect=&quot;fade&quot;</code>로 페이드 전환합니다.
      </>
    ),
    code: wrapPageExample(`<Carousel ariaLabel="페이드 슬라이드" effect="fade">
  <Slides />
</Carousel>`, {
  name: 'CarouselExample2',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <Carousel ariaLabel="페이드 슬라이드" effect="fade">
        <Slides />
      </Carousel>
    )
  },
  {
    title: '자동 재생',
    description: (
      <>
        <code>autoplay</code> · <code>delay</code>로 자동 재생합니다.
        재생·정지 토글이 함께 표시되며, <code>dotsOutside</code>면 닷이 슬라이드 밖에 놓입니다.
      </>
    ),
    code: wrapPageExample(`<Carousel
  ariaLabel="자동 재생 슬라이드"
  autoplay
  delay={4000}
  loop
  dotsOutside
>
  <Slides />
</Carousel>`, {
  name: 'CarouselExample3',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <Carousel ariaLabel="자동 재생 슬라이드" autoplay delay={4000} loop dotsOutside>
        <Slides />
      </Carousel>
    )
  },
  {
    title: '무한 루프',
    description: (
      <>
        <code>loop</code>이면 끝과 처음을 순환합니다.
      </>
    ),
    code: wrapPageExample(`<Carousel ariaLabel="루프 슬라이드" loop>
  <Slides />
</Carousel>`, {
  name: 'CarouselExample4',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <Carousel ariaLabel="루프 슬라이드" loop>
        <Slides />
      </Carousel>
    )
  },
  {
    title: '슬라이드 per view',
    description: (
      <>
        <code>multi</code> · <code>slidesPerView=&quot;auto&quot;</code> · <code>spaceBetween</code> ·
        <code>centered</code>로 여러 장을 보여 줍니다.
      </>
    ),
    code: wrapPageExample(`<Carousel
  ariaLabel="다중 슬라이드"
  multi
  slidesPerView="auto"
  spaceBetween={16}
  centered
  navigation={false}
>
  <Slides data={manySlides.slice(0, 4)} compact />
</Carousel>`, {
  name: 'CarouselExample5',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <Carousel
        ariaLabel="다중 슬라이드"
        multi
        slidesPerView="auto"
        spaceBetween={16}
        centered
        navigation={false}
      >
        <Slides data={SLIDES.slice(0, 4)} compact />
      </Carousel>
    )
  },
  {
    title: '슬라이드 간격',
    description: (
      <>
        <code>spaceBetween</code>으로 장 사이 간격(px)을 둡니다.
      </>
    ),
    code: wrapPageExample(`<Carousel ariaLabel="간격이 있는 슬라이드" spaceBetween={12} loop>
  <Slides />
</Carousel>`, {
  name: 'CarouselExample6',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <Carousel ariaLabel="간격이 있는 슬라이드" spaceBetween={12} loop>
        <Slides />
      </Carousel>
    )
  },
  {
    title: '페이지네이션',
    description: (
      <>
        기본은 점 페이지네이션입니다. <code>navigation={'{false}'}</code>로 화살표만 숨길 수 있습니다.
      </>
    ),
    code: wrapPageExample(`<Carousel ariaLabel="페이지네이션 슬라이드" loop navigation={false}>
  <Slides />
</Carousel>`, {
  name: 'CarouselPaginationExample',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <Carousel ariaLabel="페이지네이션 슬라이드" loop navigation={false}>
        <Slides />
      </Carousel>
    )
  },
  {
    title: '분수 페이지네이션',
    description: (
      <>
        <code>pagination=&quot;fraction&quot;</code>이면 1 / N 형식으로 표시합니다.
      </>
    ),
    code: wrapPageExample(`<Carousel ariaLabel="분수 페이지네이션" pagination="fraction">
  <Slides />
</Carousel>`, {
  name: 'CarouselPaginationExample2',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <Carousel ariaLabel="분수 페이지네이션" pagination="fraction">
        <Slides />
      </Carousel>
    )
  },
  {
    title: '프로그레스 페이지네이션',
    description: (
      <>
        <code>pagination=&quot;progressbar&quot;</code>이면 하단 프로그레스바입니다
        (<code>carousel_pagination-progress</code>).
      </>
    ),
    code: wrapPageExample(`<Carousel ariaLabel="프로그레스 페이지네이션" pagination="progressbar" loop>
  <Slides />
</Carousel>`, {
  name: 'CarouselPaginationExample3',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <Carousel ariaLabel="프로그레스 페이지네이션" pagination="progressbar" loop>
        <Slides />
      </Carousel>
    )
  },
  {
    title: '커스텀 페이지네이션',
    description: (
      <>
        <code>pagination=&quot;custom&quot;</code>이면 번호 불릿입니다
        (<code>carousel_pagination-custom</code>).
      </>
    ),
    code: wrapPageExample(`<Carousel
  ariaLabel="번호 페이지네이션"
  pagination="custom"
  loop
  navigation={false}
>
  <Slides data={manySlides.slice(0, 4)} />
</Carousel>`, {
  name: 'CarouselPaginationExample4',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <Carousel ariaLabel="번호 페이지네이션" pagination="custom" loop navigation={false}>
        <Slides data={SLIDES.slice(0, 4)} />
      </Carousel>
    )
  },
  {
    title: '그리드',
    description: (
      <>
        <code>gridRows</code> · <code>slidesPerView</code> · <code>slidesPerGroup</code>으로 다행 그리드를 구성합니다.
      </>
    ),
    code: wrapPageExample(`<Carousel
  ariaLabel="그리드 1장씩"
  slidesPerView={3}
  gridRows={2}
  spaceBetween={16}
>
  <Slides data={manySlides} compact />
</Carousel>

<Carousel
  ariaLabel="그리드 그룹 이동"
  slidesPerView={3}
  slidesPerGroup={6}
  gridRows={2}
  spaceBetween={16}
>
  <Slides data={manySlides} compact />
</Carousel>`, {
  name: 'CarouselExample11',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <div className="demo-stack">
        <div>
          <p className="typo_caption">slidesPerGroup 생략(기본 1) — 한 칸씩 이동합니다.</p>
          <Carousel ariaLabel="그리드 1장씩" slidesPerView={3} gridRows={2} spaceBetween={16}>
            <Slides data={SLIDES} compact />
          </Carousel>
        </div>
        <div>
          <p className="typo_caption">slidesPerGroup=6 — 한 화면(2행 × 3열) 단위로 이동합니다.</p>
          <Carousel
            ariaLabel="그리드 그룹 이동"
            slidesPerView={3}
            slidesPerGroup={6}
            gridRows={2}
            spaceBetween={16}
          >
            <Slides data={SLIDES} compact />
          </Carousel>
        </div>
      </div>
    )
  },
  {
    title: '커버플로우',
    description: (
      <>
        <code>effect=&quot;coverflow&quot;</code> · <code>coverflowSides</code>로 3D 커버플로우를 켭니다.
        기본 스타일은 <code>tilt</code>입니다.
      </>
    ),
    code: wrapPageExample(`<Carousel
  ariaLabel="커버플로우 슬라이드"
  effect="coverflow"
  coverflowSides={1}
  spaceBetween={16}
  loop
  pagination={false}
>
  <Slides data={manySlides} compact />
</Carousel>`, {
  name: 'CarouselExample12',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <Carousel
        ariaLabel="커버플로우 슬라이드"
        effect="coverflow"
        coverflowSides={1}
        spaceBetween={16}
        loop
        pagination={false}
      >
        <Slides data={SLIDES} compact />
      </Carousel>
    )
  },
  {
    title: '커버플로우 · 축소',
    description: (
      <>
        <code>coverflowStyle=&quot;rise&quot;</code>는 회전 대신 축소입니다.
        <code>coverflowSides</code>로 좌우 노출 개수를 조절합니다.
      </>
    ),
    code: wrapPageExample(`<Carousel
  ariaLabel="커버플로우 축소 좌우 1"
  effect="coverflow"
  coverflowStyle="rise"
  coverflowSides={1}
  spaceBetween={16}
  loop
  pagination={false}
>
  <Slides data={manySlides} compact />
</Carousel>

<Carousel
  effect="coverflow"
  coverflowStyle="rise"
  coverflowSides={1.5}
  spaceBetween={16}
  loop
  pagination={false}
>
  <Slides data={manySlides} compact />
</Carousel>

<Carousel
  effect="coverflow"
  coverflowStyle="rise"
  coverflowSides={2}
  spaceBetween={16}
  loop
  pagination={false}
>
  <Slides data={manySlides} compact />
</Carousel>`, {
  name: 'CarouselExample13',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <div className="demo-stack">
        <div>
          <p className="typo_caption">coverflowSides=1</p>
          <Carousel
            ariaLabel="커버플로우 축소 좌우 1"
            effect="coverflow"
            coverflowStyle="rise"
            coverflowSides={1}
            spaceBetween={16}
            loop
            pagination={false}
          >
            <Slides data={SLIDES} compact />
          </Carousel>
        </div>
        <div>
          <p className="typo_caption">coverflowSides=1.5 (기본)</p>
          <Carousel
            ariaLabel="커버플로우 축소 좌우 1.5"
            effect="coverflow"
            coverflowStyle="rise"
            coverflowSides={1.5}
            spaceBetween={16}
            loop
            pagination={false}
          >
            <Slides data={SLIDES} compact />
          </Carousel>
        </div>
        <div>
          <p className="typo_caption">coverflowSides=2</p>
          <Carousel
            ariaLabel="커버플로우 축소 좌우 2"
            effect="coverflow"
            coverflowStyle="rise"
            coverflowSides={2}
            spaceBetween={16}
            loop
            pagination={false}
          >
            <Slides data={SLIDES} compact />
          </Carousel>
        </div>
      </div>
    )
  },
  {
    title: '썸네일 갤러리',
    description: (
      <>
        메인 캐러셀에 <code>thumbs</code>로 썸네일 Swiper를 연결합니다.
        썸네일 쪽은 <code>thumbsControl</code> · <code>onSwiper</code>를 사용합니다.
      </>
    ),
    code: wrapPageExample(`const [thumbs, setThumbs] = useState(null)

<div className="carousel_gallery">
  <Carousel ariaLabel="갤러리 메인" thumbs={thumbs} pagination={false}>
    <Slides data={manySlides.slice(0, 8)} />
  </Carousel>
  <Carousel
    ariaLabel="갤러리 썸네일"
    className="carousel_thumbs"
    slidesPerView={4}
    spaceBetween={8}
    pagination={false}
    navigation={false}
    thumbsControl
    watchSlidesProgress
    onSwiper={setThumbs}
  >
    <Slides data={manySlides.slice(0, 8)} compact />
  </Carousel>
</div>`, {
      name: 'CarouselThumbsExample',
      reactImports: ['useState'],
      compImports: ['Carousel', 'CarouselSlide']
    }),
    preview: <ThumbsGalleryDemo />
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 sm · md · lg입니다. 기본은 <code>md</code>입니다.
      </>
    ),
    code: wrapPageExample(`<Carousel ariaLabel="Small" size="sm"><Slides /></Carousel>
<Carousel ariaLabel="Medium"><Slides /></Carousel>
<Carousel ariaLabel="Large" size="lg"><Slides /></Carousel>`, {
  name: 'CarouselSizeExample',
  reactImports: [],
  compImports: ['Carousel', 'CarouselSlide']
}),
    preview: (
      <div className="demo-stack">
        <Carousel ariaLabel="Small" size="sm">
          <Slides />
        </Carousel>
        <Carousel ariaLabel="Medium">
          <Slides />
        </Carousel>
        <Carousel ariaLabel="Large" size="lg">
          <Slides />
        </Carousel>
      </div>
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        React 없이 클래스만 쓸 때의 Swiper 구조입니다.
        <code>data-swiper</code> 등으로 초기화합니다.
      </>
    ),
    code: `<div class="carousel carousel_demo" data-component="Carousel">
  <div
    class="swiper"
    role="region"
    aria-roledescription="carousel"
    aria-label="프로모션 슬라이드"
    data-swiper
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide">…</div>
      <div class="swiper-slide">…</div>
    </div>
    <div class="swiper-button-prev" aria-label="이전 슬라이드"></div>
    <div class="swiper-button-next" aria-label="다음 슬라이드"></div>
    <div class="swiper-pagination"></div>
  </div>
</div>`,
    preview: (
      <Carousel ariaLabel="마크업 대응 예시">
        <Slides data={SLIDES.slice(0, 2)} />
      </Carousel>
    )
  }
]

/**
 * Carousel 가이드.
 * Storybook(기타/Carousel) 스토리 — 기본·페이드·자동재생·루프·multi·간격·페이지네이션·그리드·커버플로우·썸네일 — 과 API를 모은다.
 */
export default function CarouselGuide () {
  return (
    <GuideLayout
      category="기타"
      title="Carousel"
      description="여러 콘텐츠를 가로로 탐색하는 Swiper 기반 캐러셀입니다. index · onIndexChange · playing · onPlayingChange · effect · pagination · loop · autoplay를 조합합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName={section.title === 'HTML 마크업' ? 'carousel.html' : 'CarouselExample.jsx'}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={carouselApiSections} />
    </GuideLayout>
  )
}
