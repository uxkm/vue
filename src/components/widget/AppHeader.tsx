'use client'

/**
 * 공통 상단 헤더 UI.
 * inline/stacked 배치, 기본 네비·언어 전환. 문구는 한글 원문(전역 번역기가 처리).
 */
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { Link, NavLink } from '@/lib/router'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { LanguageSwitcher } from './LanguageSwitcher'

/** 헤더 메뉴 링크 한 줄. to 와 label */
export interface AppHeaderLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'> {
  href?: string
  to?: string
  className?: string
  end?: boolean
  children?: ReactNode
}

/** AppHeader 용 NavLink — 활성 시 `is-active router-link-exact-active` */
export function AppHeaderLink ({ className, end = true, to, href, children, ...rest }: AppHeaderLinkProps) {
  return (
    <NavLink
      {...rest}
      to={to ?? href}
      end={end}
      className={({ isActive }) => cx(
        'app-header__link',
        isActive && 'is-active router-link-exact-active',
        typeof className === 'string' && className
      )}
    >
      {children}
    </NavLink>
  )
}

/** 헤더 배치. inline 한 줄, stacked 위 브랜드·아래 메뉴 */
export type AppHeaderLayout = 'inline' | 'stacked'

/** 값이 inline 또는 stacked 인지. 아니면 레이아웃 prop 으로 쓰지 않는다 */
export function isAppHeaderLayout (value: unknown): value is AppHeaderLayout {
  return value === 'inline' || value === 'stacked'
}

/** 앱 헤더가 받는 값. layout, 메뉴, 숨김 */
export interface AppHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** 브랜드 왼쪽 뒤로가기 영역 */
  back?: ReactNode
  brand?: ReactNode
  nav?: ReactNode
  actions?: ReactNode
  /**
   * inline — 한 줄 (브랜드 | 네비+액션)
   * stacked — 위: 브랜드/액션, 아래: 네비 (스크롤 시 상단만 숨김)
   */
  layout?: AppHeaderLayout
  /**
   * stacked 전용: 스크롤 시 하단 네비까지 함께 숨김
   * (기본은 상단 브랜드만 숨기고 네비는 유지)
   */
  hideNavOnScroll?: boolean
  /** false 면 공통 언어 전환을 넣지 않음 (페이지가 직접 넣을 때) */
  showLanguageSwitcher?: boolean
  children?: ReactNode
}

/** nav 를 안 넘겼을 때 쓰는 기본 메뉴. 원문 한글 — 전역 번역기가 처리 */
function DefaultNav () {
  return (
    <>
      <AppHeaderLink to="/pub">목록</AppHeaderLink>
      <AppHeaderLink
        to="/guide"
        target="_blank"
        rel="noopener noreferrer"
      >컴포넌트 가이드</AppHeaderLink>
    </>
  )
}

/**
 * 공통 상단 헤더.
 * 문구는 한글 원문. 번역은 AppLayout GlobalTranslator.
 */
export function AppHeader ({
  back,
  brand,
  nav,
  actions,
  layout = 'stacked',
  hideNavOnScroll = false,
  showLanguageSwitcher = true,
  children,
  className,
  ...rest
}: AppHeaderProps) {
  const stacked = layout === 'stacked'
  /** nav 미전달(undefined)일 때만 기본 메뉴. null 은 메뉴 없음 */
  const navNodes = nav === undefined ? <DefaultNav /> : nav
  const showNav = hasNodes(navNodes)
  const showNavBar = stacked && showNav
  const showActions = hasNodes(actions) || showLanguageSwitcher

  return (
    <header
      {...rest}
      className={cx(
        'app-header',
        stacked && 'app-header--stacked',
        stacked && hideNavOnScroll && 'app-header--hide-nav-on-scroll',
        className
      )}
      data-header-layout={layout}
      data-hide-nav-on-scroll={stacked && hideNavOnScroll ? 'true' : undefined}
    >
      {hasNodes(children)
        ? (
          <div className="app-header__top">
            <div className="app-header__inner">{children}</div>
          </div>
        )
        : (
          <>
            <div className="app-header__top">
              <div className="app-header__inner">
                <div className="app-header__start">
                  {hasNodes(back) && (
                    <div className="app-header__back">{back}</div>
                  )}
                  <div className="app-header__brand-wrap">
                    {hasNodes(brand)
                      ? brand
                      : <Link className="app-header__brand" to="/pub">Publish List</Link>}
                  </div>
                </div>
                <div className="app-header__end">
                  {!stacked && showNav && (
                    <nav className="app-header__nav" aria-label="주요 메뉴">
                      {navNodes}
                    </nav>
                  )}
                  {showActions && (
                    <div className="app-header__actions">
                      {hasNodes(actions) ? actions : null}
                      {showLanguageSwitcher ? (
                        <LanguageSwitcher
                          className="app-header__lang"
                          id="app-header-language"
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {showNavBar && (
              <div className="app-header__nav-bar">
                <div className="app-header__inner app-header__inner--nav">
                  <nav className="app-header__nav" aria-label="주요 메뉴">
                    {navNodes}
                  </nav>
                </div>
              </div>
            )}
          </>
        )}
    </header>
  )
}

export default AppHeader
