import type { HTMLAttributes, ReactNode } from 'react'
import { Link, NavLink, type NavLinkProps } from 'react-router-dom'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** AppHeader 용 NavLink — 활성 시 `is-active router-link-exact-active` */
export function AppHeaderLink ({ className, end = true, ...rest }: NavLinkProps) {
  return (
    <NavLink
      {...rest}
      end={end}
      className={({ isActive }) => cx(
        'app-header__link',
        isActive && 'is-active router-link-exact-active',
        typeof className === 'string' && className
      )}
    />
  )
}

export interface AppHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  brand?: ReactNode
  nav?: ReactNode
  actions?: ReactNode
  /** 헤더 내부 전체 교체 (Vue 기본 슬롯) */
  children?: ReactNode
}

export function AppHeader ({ brand, nav, actions, children, className, ...rest }: AppHeaderProps) {
  return (
    <header {...rest} className={cx('app-header', className)}>
      <div className="app-header__inner">
        {hasNodes(children)
          ? children
          : (
            <>
              <div className="app-header__brand-wrap">
                {hasNodes(brand)
                  ? brand
                  : <Link className="app-header__brand" to="/">Publish List</Link>}
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
