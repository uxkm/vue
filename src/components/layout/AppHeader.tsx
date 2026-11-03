'use client'

import type { HTMLAttributes, ReactNode } from 'react'
import { Link, NavLink } from '@/lib/router'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

export interface AppHeaderLinkProps {
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

export interface AppHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** 브랜드 왼쪽 뒤로가기 영역 */
  back?: ReactNode
  brand?: ReactNode
  nav?: ReactNode
  actions?: ReactNode
  children?: ReactNode
}

export function AppHeader ({ back, brand, nav, actions, children, className, ...rest }: AppHeaderProps) {
  return (
    <header {...rest} className={cx('app-header', className)}>
      <div className="app-header__inner">
        {hasNodes(children)
          ? children
          : (
            <>
              <div className="app-header__start">
                {hasNodes(back) && (
                  <div className="app-header__back">{back}</div>
                )}
                <div className="app-header__brand-wrap">
                  {hasNodes(brand)
                    ? brand
                    : <Link className="app-header__brand" to="/">Publish List</Link>}
                </div>
              </div>
              <div className="app-header__end">
                <nav className="app-header__nav" aria-label="주요 메뉴">
                  {hasNodes(nav)
                    ? nav
                    : (
                      <>
                        <AppHeaderLink to="/">목록</AppHeaderLink>
                        <AppHeaderLink to="/components/button">컴포넌트</AppHeaderLink>
                      </>
                    )}
                </nav>
                {hasNodes(actions) && (
                  <div className="app-header__actions">{actions}</div>
                )}
              </div>
            </>
          )}
      </div>
    </header>
  )
}

export default AppHeader
