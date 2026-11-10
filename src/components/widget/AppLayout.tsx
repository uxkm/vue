'use client'

import { useHydrated } from '@/hooks/useHydrated'

import { useLatestRef } from '@/hooks/useLatestRef'

/**
 * 앱 공통 레이아웃 셸.
 * 헤더·본문·푸터 배치, 슬롯 병합, 스크롤 시 헤더 숨김, GlobalTranslator 연결.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { useAppStore } from '@/lib/store'
import { DEFAULT_LOCALE, normalizeLocale } from '@/lib/i18n'
import { AppFooter } from './AppFooter'
import { AppHeader, isAppHeaderLayout, type AppHeaderLayout } from './AppHeader'
import { GlobalTranslator } from './GlobalTranslator'
import { LayoutProvider, useLayoutSlots } from '@/comp/module/LayoutContext'
import { isLayoutSlotHidden } from '@/comp/shared/layout-slot'

/** 같은 방향으로 이만큼 누적되면 헤더 show/hide (느린 스크롤도 감지) */
const SCROLL_TRIGGER = 8
/** 이 스크롤 위치 위에서는 헤더를 항상 보여 준다 */
const SHOW_AT_TOP = 24

/** 앱 레이아웃이 받는 값. 헤더·본문·푸터를 감싼다 */
export interface AppLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 헤더 전체 교체 */
  header?: ReactNode
  headerBack?: ReactNode
  headerBrand?: ReactNode
  headerNav?: ReactNode
  headerActions?: ReactNode
  /** stacked: 상단 브랜드 + 하단 네비 (스크롤 시 상단만 숨김) */
  headerLayout?: AppHeaderLayout
  /**
   * stacked 전용: 스크롤 시 하단 네비까지 함께 숨김
   * (Header hideNavOnScroll 슬롯이 있으면 그쪽 우선)
   */
  hideNavOnScroll?: boolean
  /** 푸터 전체 교체 */
  footer?: ReactNode
  /** 기본 AppFooter 내용 */
  footerContent?: ReactNode
  children?: ReactNode
}

/**
 * 헤더·본문·푸터를 한 화면에 배치한다.
 * 페이지의 Header/Footer/meta 가 슬롯을 채우기 전에는 기본 크롬을 쓴다.
 */
function AppLayoutInner ({
  header,
  headerBack,
  headerBrand,
  headerNav,
  headerActions,
  headerLayout = 'stacked',
  hideNavOnScroll = false,
  footer,
  footerContent,
  children,
  className,
  ...rest
}: AppLayoutProps) {
  const pageSlots = useLayoutSlots()
  const layoutRef = useRef<HTMLDivElement>(null)
  /** 원문(ko) 복귀 시 React 트리를 리마운트해 한글 원문을 다시 그림 */
  const locale = useAppStore((s) => normalizeLocale(s.locale || DEFAULT_LOCALE))
  const treeKey = locale === 'ko' ? 'ko' : 'xlate'
  /**
   * 기본 헤더/푸터는 마운트 후에만 — SSR·첫 페인트에서 기본 헤더가 먼저 뜨는 깜빡임 방지.
   * (페이지의 Header/Footer 슬롯은 useLayoutEffect 로 그 전에 등록됨)
   */
  const defaultsReady = useHydrated()

  /** 그 슬롯이 숨김 표시인지 */
  const isSlotHidden = (name: string) => isLayoutSlotHidden(pageSlots[name])
  /** 숨김이면 null, 아니면 슬롯 노드 */
  const slotNodes = (name: string): ReactNode =>
    isSlotHidden(name) ? null : (pageSlots[name] as ReactNode)
  const mainPage =
    typeof pageSlots['main-page'] === 'string' ? pageSlots['main-page'] : undefined
  const mainClass =
    typeof pageSlots['main-class'] === 'string' ? pageSlots['main-class'] : undefined
  /** 슬롯에 그릴 노드가 있는지 */
  const hasSlotNodes = (name: string) => hasNodes(slotNodes(name))
  const hasPageContent = hasNodes(children)
  /**
   * 페이지 슬롯 우선, 없으면 AppLayout prop.
   * LAYOUT_SLOT_HIDDEN 이면 null (의도적 비움 — AppHeader 기본 메뉴 억제).
   */
  const pick = (name: string, prop: ReactNode): ReactNode => {
    if (Object.prototype.hasOwnProperty.call(pageSlots, name)) {
      if (isSlotHidden(name)) return null
      if (hasSlotNodes(name)) return slotNodes(name)
    }
    return prop
  }

  const resolvedLayout: AppHeaderLayout = isAppHeaderLayout(pageSlots['header-layout'])
    ? pageSlots['header-layout']
    : headerLayout

  const resolvedHideNavOnScroll =
    pageSlots['header-hide-nav-on-scroll'] === 'true' || hideNavOnScroll === true

  /** PageChrome meta.header / meta.footer — 'false' 만 숨김, 없거나 'true' 면 표시 */
  const metaHeaderVisible = pageSlots['meta-header'] !== 'false'
  const metaFooterVisible = pageSlots['meta-footer'] !== 'false'

  let headerNode: ReactNode = null
  if (header !== undefined && header !== null && header !== false) {
    headerNode = header
  } else if (hasPageContent && metaHeaderVisible && !isSlotHidden('header')) {
    if (hasSlotNodes('header')) {
      headerNode = slotNodes('header')
    } else if (defaultsReady) {
      headerNode = (
        <AppHeader
          layout={resolvedLayout}
          hideNavOnScroll={resolvedHideNavOnScroll}
          back={pick('header-back', headerBack)}
          brand={pick('header-brand', headerBrand)}
          nav={pick('header-nav', headerNav)}
          actions={pick('header-actions', headerActions)}
        />
      )
    }
  }

  let footerNode: ReactNode = null
  if (footer !== undefined && footer !== null && footer !== false) {
    footerNode = footer
  } else if (hasPageContent && metaFooterVisible && !isSlotHidden('footer')) {
    if (hasSlotNodes('footer')) {
      footerNode = slotNodes('footer')
    } else if (hasSlotNodes('footer-content')) {
      footerNode = <AppFooter>{slotNodes('footer-content')}</AppFooter>
    } else if (hasNodes(footerContent)) {
      footerNode = <AppFooter>{footerContent}</AppFooter>
    } else if (defaultsReady) {
      footerNode = <AppFooter />
    }
  }

  const hasHeader = headerNode != null
  const headerHiddenRef = useRef(false)
  const hideNavOnScrollRef = useLatestRef(resolvedHideNavOnScroll)

  /** 헤더 높이를 CSS 변수로 남긴다. 숨김이면 메뉴 높이를 뺀다 */
  const measureHeader = useCallback((headerEl: HTMLElement, hidden: boolean) => {
    const topEl = headerEl.querySelector('.app-header__top') as HTMLElement | null
    const navBar = headerEl.querySelector('.app-header__nav-bar') as HTMLElement | null
    const topH = topEl?.offsetHeight ?? 0
    headerEl.style.setProperty('--app-header-top-height', `${topH}px`)

    const hideAll =
      hideNavOnScrollRef.current ||
      headerEl.classList.contains('app-header--hide-nav-on-scroll') ||
      headerEl.dataset.hideNavOnScroll === 'true'

    // hideNavOnScroll / inline 숨김: 0 / stacked 기본 숨김: 네비만 / 그 외: 전체
    if (hidden && hideAll) return 0
    if (hidden && navBar) return Math.max(0, navBar.offsetHeight)
    if (hidden) return 0
    return Math.max(0, headerEl.offsetHeight)
  }, [hideNavOnScrollRef])

  // 헤더 높이를 --app-header-height 로 노출 → 페이지 sticky 가 헤더 아래에 붙도록
  useLayoutEffect(() => {
    const layout = layoutRef.current
    if (!layout) return

    /** --app-header-height. sticky 가 헤더 아래에 붙는다 */
    const setHeight = (px: number) => {
      layout.style.setProperty('--app-header-height', `${Math.max(0, px)}px`)
    }

    if (!hasHeader) {
      setHeight(0)
      return
    }

    const main = layout.querySelector('.app-layout__main')
    const headerEl = main?.previousElementSibling as HTMLElement | null
    if (!headerEl) {
      setHeight(0)
      return
    }

    // 커스텀 헤더 슬롯에도 옵션 반영
    headerEl.classList.toggle('app-header--hide-nav-on-scroll', resolvedHideNavOnScroll)
    if (resolvedHideNavOnScroll) headerEl.dataset.hideNavOnScroll = 'true'
    else delete headerEl.dataset.hideNavOnScroll

    /** 지금 헤더 높이로 CSS 변수를 다시 맞춘다 */
    const update = () => {
      setHeight(measureHeader(headerEl, headerHiddenRef.current))
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(headerEl)
    const topEl = headerEl.querySelector('.app-header__top')
    const navBar = headerEl.querySelector('.app-header__nav-bar')
    if (topEl) ro.observe(topEl)
    if (navBar) ro.observe(navBar)
    return () => ro.disconnect()
  }, [hasHeader, resolvedLayout, resolvedHideNavOnScroll, measureHeader])

  // 아래로 스크롤 → 상단(또는 전체) 숨김, 위로 스크롤 → 복귀
  useEffect(() => {
    if (!hasHeader) return

    const layout = layoutRef.current
    if (!layout) return

    const main = layout.querySelector('.app-layout__main')
    const headerEl = main?.previousElementSibling as HTMLElement | null
    if (!headerEl) return

    let lastY = window.scrollY || window.pageYOffset || 0
    let pendingY = lastY
    let acc = 0
    let ticking = false

    /** 스크롤로 헤더를 접거나 편다 */
    const applyHidden = (hidden: boolean) => {
      if (headerHiddenRef.current === hidden) return
      headerHiddenRef.current = hidden
      headerEl.classList.toggle('is-scroll-hidden', hidden)
      layout.style.setProperty(
        '--app-header-height',
        `${measureHeader(headerEl, hidden)}px`
      )
    }

    /** 스크롤 방향을 모아 한 프레임에 한 번 헤더를 접는다 */
    const onScroll = () => {
      pendingY = window.scrollY || window.pageYOffset || 0
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        ticking = false
        const y = pendingY
        const delta = y - lastY
        lastY = y

        if (y <= SHOW_AT_TOP) {
          acc = 0
          applyHidden(false)
          return
        }

        if (delta === 0) return

        // 방향이 바뀌면 누적 리셋 후 다시 쌓기
        if ((acc > 0 && delta < 0) || (acc < 0 && delta > 0)) {
          acc = delta
        } else {
          acc += delta
        }

        if (acc >= SCROLL_TRIGGER) {
          applyHidden(true)
          acc = 0
        } else if (acc <= -SCROLL_TRIGGER) {
          applyHidden(false)
          acc = 0
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      applyHidden(false)
    }
  }, [hasHeader, resolvedLayout, resolvedHideNavOnScroll, measureHeader])

  return (
    <div
      {...rest}
      ref={layoutRef}
      className={cx('app-layout', hasHeader && 'app-layout--has-header', className)}
    >
      {/* 헤더·본문·푸터 전체 DOM 을 선택 언어로 번역 (locales 폴더 불필요) */}
      <GlobalTranslator rootRef={layoutRef} />
      <div key={treeKey} className="app-layout__tree">
        {headerNode}
        <main
          className={cx('app-layout__main', mainClass)}
          data-page={mainPage || undefined}
        >
          {children}
        </main>
        {footerNode}
      </div>
    </div>
  )
}

/** 슬롯 저장소를 감싼 공통 레이아웃. 화면은 이 컴포넌트 안에서 헤더·푸터를 바꾼다 */
export function AppLayout (props: AppLayoutProps) {
  return (
    <LayoutProvider>
      <AppLayoutInner {...props} />
    </LayoutProvider>
  )
}

export default AppLayout
