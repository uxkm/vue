'use client'

import { useLatestRef } from '@/hooks/useLatestRef'

/**
 * Swiper 기반 캐러셀.
 * Storybook(기타/Carousel)과 동일한 props · 마크업 계약을 따른다.
 */

import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode
} from 'react'
import Swiper from 'swiper'
import type { Swiper as SwiperInstance } from 'swiper'
import { carouselSwiperModules } from '@/lib/swiper'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 커버플로우 좌우 노출 */
export type CoverflowSides = 1 | 1.5 | 2 | 'auto'

/** 페이지네이션 유형 */
export type CarouselPagination = boolean | 'fraction' | 'progressbar' | 'custom'

/** Carousel props — Storybook API */
export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 캐러셀 영역 접근성 이름 */
  ariaLabel?: string
  children?: ReactNode
  /** sm · md(기본) · lg */
  size?: 'sm' | 'md' | 'lg'
  /** 자동 너비 다중 슬라이드 */
  multi?: boolean
  /** 페이지네이션을 슬라이드 영역 밖 */
  dotsOutside?: boolean
  /** 재생·정지 토글 버튼 */
  autoplayToggle?: boolean
  /** fade · coverflow */
  effect?: 'fade' | 'coverflow'
  /** 자동 재생 */
  autoplay?: boolean
  /** 자동 재생 간격(ms) */
  delay?: number
  /** 끝↔처음 순환 */
  loop?: boolean
  /** 초기 슬라이드 인덱스 */
  initialSlide?: number
  /** 현재 슬라이드 인덱스(제어). 넘기면 페이지가 위치를 관리한다 */
  index?: number
  /** 슬라이드가 바뀔 때 호출 */
  onIndexChange?: (index: number, swiper: SwiperInstance) => void
  /** 자동재생 재생 중 여부(제어) */
  playing?: boolean
  /** 비제어 초기 재생. 기본은 autoplay */
  defaultPlaying?: boolean
  /** 재생/정지 상태가 바뀔 때 호출 */
  onPlayingChange?: (playing: boolean) => void
  /** 한 화면 슬라이드 수 */
  slidesPerView?: number | 'auto'
  /** 한 번에 이동할 슬라이드 수 */
  slidesPerGroup?: number
  /** 슬라이드 간격(px) */
  spaceBetween?: number
  /** 활성 슬라이드 가운데 정렬 */
  centered?: boolean
  /** 페이지네이션 */
  pagination?: CarouselPagination
  /** 이전·다음 버튼 */
  navigation?: boolean
  /** 2 이상이면 다행 그리드 */
  gridRows?: number
  /** 그리드 채움 방향 */
  gridFill?: 'row' | 'column'
  /** 커버플로우 스타일 */
  coverflowStyle?: 'tilt' | 'rise'
  /** 커버플로우 좌우 노출 */
  coverflowSides?: CoverflowSides
  /** Swiper coverflowEffect 덮어쓰기 */
  coverflowEffect?: Record<string, unknown>
  /** 연결할 썸네일 Swiper */
  thumbs?: SwiperInstance | null
  /** 썸네일 컨트롤 캐러셀 */
  thumbsControl?: boolean
  /** 슬라이드 진행 감시(썸네일·커버플로우) */
  watchSlidesProgress?: boolean
  /** 자유 스크롤 */
  freeMode?: boolean
  /** Swiper 인스턴스 콜백 */
  onSwiper?: (swiper: SwiperInstance) => void
  /** 내비·토글 ripple */
  ripple?: boolean
}

/** CarouselSlide props */
export interface CarouselSlideProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

/** 커버플로우 sides 정규화 → 1 | 1.5 | 2 */
function normalizeCoverflowSides (sides: CoverflowSides): 1 | 1.5 | 2 {
  const n = Number(sides)
  if (n === 1) return 1
  if (n === 2 || n === 2.5) return 2
  return 1.5
}

/** 커버플로우 loop 에 필요한 최소 슬라이드 수 */
function coverflowLoopMin (sides: 1 | 1.5 | 2) {
  if (sides === 1) return 6
  if (sides === 1.5) return 8
  return 10
}

/** initialSlide 클램프 · loop 시 modulo */
function resolveInitialSlide (index: number, count: number, loop: boolean) {
  const raw = Number.isFinite(Number(index)) ? Math.trunc(Number(index)) : 0
  if (count < 1) return 0
  if (loop) return ((raw % count) + count) % count
  return Math.min(Math.max(raw, 0), count - 1)
}

/**
 * 커버플로우 간격·슬라이드 너비 CSS 변수.
 * 반환값은 Swiper spaceBetween 에 넣을 보정 간격.
 */
function applyCoverflowGap (
  root: HTMLElement | null,
  swiperEl: HTMLElement | null,
  isCoverflow: boolean,
  spaceBetween: number,
  sides: 1 | 1.5 | 2
) {
  if (!root || !swiperEl) return Number(spaceBetween) || 0
  if (!isCoverflow) {
    root.style.removeProperty('--carousel-coverflow-gap')
    root.style.removeProperty('--carousel-coverflow-slide-width')
    return Number(spaceBetween) || 0
  }
  const gap = Number(spaceBetween) || 0
  const width = swiperEl.clientWidth || root.clientWidth
  root.style.setProperty('--carousel-coverflow-gap', `${gap}px`)
  if (!width) return gap
  const slideWidth = (width - gap * 2) / 3
  const peek = (width - slideWidth) / (2 * sides) - slideWidth
  root.style.setProperty('--carousel-coverflow-slide-width', `${Math.round(slideWidth * 100) / 100}px`)
  return Math.round(peek * 100) / 100
}

/** 한 장(swiper-slide) */
export function CarouselSlide ({ children, className, ...rest }: CarouselSlideProps) {
  return (
    <div {...rest} className={cx('swiper-slide', className)}>
      {children}
    </div>
  )
}

CarouselSlide.displayName = 'CarouselSlide'

function isCarouselSlideElement (node: ReactNode) {
  return isValidElement(node) && (
    node.type === CarouselSlide ||
    (typeof (node.props as { className?: string })?.className === 'string' &&
      (node.props as { className: string }).className.split(/\s+/).includes('swiper-slide'))
  )
}

/**
 * 슬라이드 노드로 정규화.
 * CarouselSlide · Fragment 안 슬라이드는 그대로 두고,
 * 커스텀 컴포넌트(<Slides /> 등)도 그대로 두어 렌더 후 swiper-slide 가 펼쳐지게 한다.
 * 문자열·호스트 요소만 CarouselSlide 로 감싼다.
 */
function normalizeSlideChildren (children: ReactNode): ReactNode {
  return Children.map(children, (child, index) => {
    if (!hasNodes(child)) return null
    if (isCarouselSlideElement(child)) return child
    if (isValidElement(child) && typeof child.type !== 'string') return child
    return (
      <CarouselSlide key={isValidElement(child) && child.key != null ? child.key : index}>
        {child}
      </CarouselSlide>
    )
  })
}

function countDomSlides (host: HTMLElement | null) {
  if (!host) return 0
  return host.querySelectorAll(':scope > .swiper-wrapper > .swiper-slide').length
}

/**
 * Swiper 캐러셀.
 * children 은 CarouselSlide(또는 슬라이드를 렌더하는 자식)로 한 장씩 둔다.
 */
export function Carousel ({
  ariaLabel = '콘텐츠 슬라이드',
  children,
  className = '',
  style,
  size = 'md',
  multi = false,
  dotsOutside = false,
  autoplayToggle = false,
  effect,
  autoplay = false,
  delay = 4000,
  loop = false,
  initialSlide = 0,
  index,
  onIndexChange,
  playing: playingProp,
  defaultPlaying,
  onPlayingChange,
  slidesPerView = 1,
  slidesPerGroup = 1,
  spaceBetween = 0,
  centered = false,
  pagination = true,
  navigation = true,
  gridRows = 1,
  gridFill = 'row',
  coverflowStyle = 'tilt',
  coverflowSides = 1.5,
  coverflowEffect,
  thumbs = null,
  thumbsControl = false,
  watchSlidesProgress = false,
  freeMode = false,
  onSwiper,
  ripple = true,
  ...rest
}: CarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<SwiperInstance | null>(null)
  const indexRef = useLatestRef(index)
  const onIndexChangeRef = useLatestRef(onIndexChange)
  const playingControlled = playingProp !== undefined
  const [innerPlaying, setInnerPlaying] = useState(
    () => defaultPlaying ?? !!autoplay
  )
  const playing = playingControlled ? playingProp : innerPlaying
  const playingRef = useLatestRef(playing)
  /** DOM 기준 장 수 — <Slides /> 같은 래퍼는 Children 으로는 1로 보이므로 layout 후 센다 */
  const [slideCount, setSlideCount] = useState(0)

  const setPlaying = (next: boolean) => {
    if (!playingControlled) setInnerPlaying(next)
    onPlayingChange?.(next)
  }

  const slides = normalizeSlideChildren(children)
  /** 1장이면 좌우·닷·재생/정지·자동재생을 쓰지 않는다 */
  const multiSlide = slideCount > 1

  const isCoverflow = effect === 'coverflow'
  const isGrid = gridRows > 1
  const sides = normalizeCoverflowSides(coverflowSides)
  const view: number | 'auto' = isCoverflow || multi || slidesPerView === 'auto' ? 'auto' : slidesPerView
  const showPagination = multiSlide && pagination !== false
  const showNavigation = multiSlide && navigation !== false
  const showAutoplayControls = multiSlide && (autoplay || autoplayToggle)
  /** autoplay 또는 autoplayToggle 이면 Swiper autoplay 모듈을 켠다(토글만 켜도 재생 가능) */
  const enableAutoplay = multiSlide && (autoplay || autoplayToggle)

  const syncCoverflowGap = useCallback(
    () => applyCoverflowGap(rootRef.current, swiperRef.current, isCoverflow, spaceBetween, sides),
    [isCoverflow, spaceBetween, sides]
  )

  useLayoutEffect(() => {
    const next = countDomSlides(swiperRef.current)
    setSlideCount((prev) => (prev === next ? prev : next))
  }, [children, slides])

  useEffect(() => {
    const host = swiperRef.current
    if (!host) return

    const domSlideCount = countDomSlides(host)
    if (domSlideCount === 0) return
    if (domSlideCount !== slideCount) {
      setSlideCount(domSlideCount)
      return
    }

    const canLoop = !(
      !loop ||
      isGrid ||
      domSlideCount < 2 ||
      (isCoverflow
        ? domSlideCount < coverflowLoopMin(sides)
        : view === 'auto'
          ? domSlideCount < 4
          : domSlideCount < Math.max(2, Math.ceil(Number(view) || 1) + 1 + (centered ? 1 : 0)))
    )

    // 초기 위치만 사용. 이후 index 변경은 별도 sync effect 가 담당한다.
    const startIndex = resolveInitialSlide(
      indexRef.current !== undefined ? indexRef.current : initialSlide,
      domSlideCount,
      canLoop
    )
    instanceRef.current?.destroy(true, true)

    const paginationEl =
      rootRef.current?.querySelector(':scope > .swiper-pagination') ??
      host.querySelector('.swiper-pagination')

    const gap = syncCoverflowGap()
    const hasControls = domSlideCount > 1

    const options: Record<string, unknown> = {
      modules: carouselSwiperModules,
      initialSlide: startIndex,
      slidesPerView: view,
      slidesPerGroup,
      spaceBetween: gap,
      centeredSlides: centered || isCoverflow,
      loop: canLoop,
      grabCursor: hasControls,
      keyboard: { enabled: hasControls },
      a11y: {
        prevSlideMessage: '이전 슬라이드',
        nextSlideMessage: '다음 슬라이드',
        firstSlideMessage: '첫 슬라이드입니다',
        lastSlideMessage: '마지막 슬라이드입니다',
        paginationBulletMessage: '{{index}}번 슬라이드로 이동'
      },
      observer: true,
      observeParents: true,
      watchSlidesProgress: !!(watchSlidesProgress || thumbsControl || isCoverflow)
    }

    if (showNavigation) {
      options.navigation = {
        prevEl: host.querySelector('.swiper-button-prev'),
        nextEl: host.querySelector('.swiper-button-next')
      }
    }

    if (showPagination) {
      options.pagination = {
        el: paginationEl,
        clickable: true,
        type: pagination === 'fraction' || pagination === 'progressbar' ? pagination : 'bullets',
        ...(pagination === 'custom'
          ? {
              renderBullet: (index: number, className: string) =>
                `<span class="${className}">${index + 1}</span>`
            }
          : {})
      }
    }

    if (enableAutoplay) {
      options.autoplay = { delay, disableOnInteraction: false }
    }

    if (isGrid) {
      options.grid = { rows: gridRows, fill: gridFill === 'column' ? 'column' : 'row' }
    }

    if (freeMode) options.freeMode = true
    if (thumbsControl) options.slideToClickedSlide = true
    if (thumbs && !thumbs.destroyed) options.thumbs = { swiper: thumbs }

    if (effect === 'fade') {
      Object.assign(options, { effect: 'fade', fadeEffect: { crossFade: true } })
    }

    if (isCoverflow) {
      Object.assign(options, {
        effect: 'coverflow',
        coverflowEffect: {
          ...(coverflowStyle === 'rise'
            ? { rotate: 0, stretch: 0, depth: 28, scale: 0.92, modifier: 1, slideShadows: false }
            : { rotate: 24, stretch: 0, depth: 140, modifier: 1, slideShadows: true }),
          ...coverflowEffect
        }
      })
      if (canLoop) {
        Object.assign(options, { loopAdditionalSlides: 0, loopAddBlankSlides: false })
      }
    }

    const swiper = new Swiper(host, options)
    instanceRef.current = swiper
    // autoplay 모듈은 켰지만 playing 이 false 면 즉시 정지(autoplayToggle 전용 등)
    if (enableAutoplay && !playingRef.current) {
      swiper.autoplay?.stop()
    }
    onSwiper?.(swiper)

    const emitIndex = () => {
      if (swiper.destroyed) return
      const next = typeof swiper.realIndex === 'number' ? swiper.realIndex : swiper.activeIndex
      onIndexChangeRef.current?.(next, swiper)
      // 제어 모드에서 부모가 값을 반영하지 않으면 prop 위치로 되돌린다.
      if (indexRef.current === undefined) return
      requestAnimationFrame(() => {
        if (swiper.destroyed) return
        // 부모의 상태 커밋이 끝난 뒤 확인해야 수락한 이동을 이전 위치로 되돌리지 않는다.
        const controlled = indexRef.current
        if (controlled === undefined || controlled === next) return
        if (swiper.params.loop && typeof swiper.slideToLoop === 'function') {
          swiper.slideToLoop(controlled, 0, false)
        } else {
          swiper.slideTo(controlled, 0, false)
        }
      })
    }
    swiper.on('slideChange', emitIndex)

    const raf = window.requestAnimationFrame(() => {
      if (swiper.destroyed) return
      swiper.update()
      if (canLoop && typeof swiper.slideToLoop === 'function') {
        swiper.slideToLoop(startIndex, 0, false)
      }
    })

    return () => {
      window.cancelAnimationFrame(raf)
      swiper.off('slideChange', emitIndex)
      swiper.destroy(true, true)
      if (instanceRef.current === swiper) instanceRef.current = null
    }
  }, [
    centered,
    indexRef,
    onIndexChangeRef,
    playingRef,
    coverflowEffect,
    sides,
    coverflowStyle,
    delay,
    effect,
    enableAutoplay,
    freeMode,
    gridFill,
    gridRows,
    initialSlide,
    isCoverflow,
    isGrid,
    loop,
    multiSlide,
    onSwiper,
    pagination,
    view,
    showNavigation,
    showPagination,
    slidesPerGroup,
    thumbs,
    thumbsControl,
    syncCoverflowGap,
    watchSlidesProgress,
    slideCount
  ])

  // 제어 index 가 바뀌면 Swiper 위치를 맞춘다(초기화 재생성 없이).
  useEffect(() => {
    if (index === undefined) return
    const swiper = instanceRef.current
    if (!swiper || swiper.destroyed) return
    const current = typeof swiper.realIndex === 'number' ? swiper.realIndex : swiper.activeIndex
    if (current === index) return
    if (swiper.params.loop && typeof swiper.slideToLoop === 'function') {
      swiper.slideToLoop(index)
    } else {
      swiper.slideTo(index)
    }
  }, [index])

  // 제어 playing 이 바뀌면 autoplay API 를 맞춘다.
  useEffect(() => {
    if (!enableAutoplay) return
    const autoplayApi = instanceRef.current?.autoplay
    if (!autoplayApi) return
    if (playing && !autoplayApi.running) autoplayApi.start()
    if (!playing && autoplayApi.running) autoplayApi.stop()
  }, [playing, enableAutoplay])

  useEffect(() => {
    if (!rootRef.current || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      const gap = syncCoverflowGap()
      const swiper = instanceRef.current
      if (!swiper || swiper.destroyed) return
      swiper.params.spaceBetween = gap
      swiper.update()
    })
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [syncCoverflowGap])

  function toggleAutoplay () {
    // 요청만 전달하고, 실제 start/stop 은 playing sync effect 가 prop 기준으로 맞춘다.
    setPlaying(!playing)
  }

  const rootClass = cx(
    'carousel',
    'carousel_demo',
    multi && 'carousel_multi',
    dotsOutside && 'carousel_dots-outside',
    isCoverflow && 'carousel_coverflow',
    isCoverflow && coverflowStyle === 'rise' && 'carousel_coverflow-rise',
    isCoverflow && `carousel_coverflow-sides-${sides === 1.5 ? '15' : sides}`,
    isGrid && 'carousel_grid',
    showPagination && pagination === 'custom' && 'carousel_pagination-custom',
    showPagination && pagination === 'progressbar' && 'carousel_pagination-progress',
    thumbsControl && 'carousel_thumbs',
    size !== 'md' && (size === 'sm' || size === 'lg') && `carousel_${size}`,
    showAutoplayControls && !playing && 'is-autoplay-paused',
    !multiSlide && 'is-single',
    className
  )

  return (
    <div
      {...rest}
      ref={rootRef}
      className={rootClass}
      style={style as CSSProperties}
      data-component="Carousel"
      data-count={slideCount}
      data-single={multiSlide ? undefined : ''}
    >
      <div
        ref={swiperRef}
        className="swiper"
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        data-swiper=""
        data-swiper-effect={effect || undefined}
        data-swiper-space-between={spaceBetween || undefined}
      >
        <div className="swiper-wrapper">{slides}</div>
        {showNavigation && (
          <button
            type="button"
            className="swiper-button-prev"
            aria-label="이전 슬라이드"
            data-ripple={ripple ? 'surface' : 'false'}
          />
        )}
        {showNavigation && (
          <button
            type="button"
            className="swiper-button-next"
            aria-label="다음 슬라이드"
            data-ripple={ripple ? 'surface' : 'false'}
          />
        )}
        {showPagination && !dotsOutside && <div className="swiper-pagination" />}
      </div>
      {showPagination && dotsOutside && <div className="swiper-pagination" />}
      {showAutoplayControls && (
        <button
          type="button"
          className="carousel_toggle"
          data-carousel-autoplay-toggle=""
          data-ripple={ripple ? 'surface' : 'false'}
          aria-label={playing ? '슬라이드 정지' : '슬라이드 재생'}
          aria-pressed={playing}
          onClick={toggleAutoplay}
        >
          <svg
            className="carousel_toggle-icon carousel_toggle-icon-pause"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
          <svg
            className="carousel_toggle-icon carousel_toggle-icon-play"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  )
}

Carousel.Slide = CarouselSlide
Carousel.displayName = 'Carousel'

export default Carousel
