'use client'

/**
 * 상단 내비게이션 바.
 * brand · 링크 items · actions · 모바일 토글을 한 줄로 구성한다.
 */

import {
  useId,
  useState,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { Icon } from './Icon'

/** 내비게이션 링크 한 줄 */
export interface NavbarItem {
  key: string
  label: ReactNode
  href?: string
  active?: boolean
}

/** 상단 바가 받는 값 */
export interface NavbarProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** 브랜드(로고) 문구. 기본 Logo */
  brand?: ReactNode
  brandHref?: string
  items?: NavbarItem[]
  /** navbar_actions 영역 */
  actions?: ReactNode
  sticky?: boolean
  borderless?: boolean
  dark?: boolean
  size?: 'sm' | 'md' | 'lg'
  /** 모바일 메뉴 열림(제어). 생략 시 내부 상태 */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** 링크 클릭 시 호출. 페이지에서 라우팅·선택을 제어한다 */
  onSelect?: (key: string, item: NavbarItem, event: MouseEvent<HTMLAnchorElement>) => void
  /** 선택 키(제어). 넘기면 해당 링크에 is-active */
  selectedKey?: string | null
  /** 비제어 초기 선택 키 */
  defaultSelectedKey?: string | null
  toggleLabel?: string
  /** collapse 안을 직접 넣을 때 items 대신 사용 */
  children?: ReactNode
}

/**
 * 화면 위 메뉴 막대.
 * brand 로고, items 메뉴 링크, actions 우측 액션.
 */
export function Navbar ({
  brand = 'Logo',
  brandHref = '#',
  items = [],
  actions,
  sticky = false,
  borderless = false,
  dark = false,
  size = 'md',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onSelect,
  selectedKey: selectedKeyProp,
  defaultSelectedKey = null,
  toggleLabel = '메뉴 열기',
  className,
  children,
  ...rest
}: NavbarProps) {
  const collapseId = useId()
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  const isOpen = isControlled ? openProp : uncontrolledOpen
  const selectedControlled = selectedKeyProp !== undefined
  const [innerSelectedKey, setInnerSelectedKey] = useState(defaultSelectedKey)
  const selectedKey = selectedControlled ? selectedKeyProp : innerSelectedKey

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  const handleSelect = (
    item: NavbarItem,
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    if (!selectedControlled) setInnerSelectedKey(item.key)
    onSelect?.(item.key, item, event)
    if (isOpen) setOpen(false)
  }

  const hasActions = hasNodes(actions)
  const hasNav = hasNodes(children) || items.length > 0

  return (
    <header
      {...rest}
      className={cx(
        'navbar',
        sticky && 'navbar_sticky',
        borderless && 'navbar_borderless',
        dark && 'navbar_dark',
        size === 'sm' && 'navbar_sm',
        size === 'lg' && 'navbar_lg',
        isOpen && 'is-open',
        className
      )}
    >
      <div className="navbar_container">
        {hasNodes(brand) && (
          <a href={brandHref} className="navbar_brand">
            {brand}
          </a>
        )}

        {(hasNav || hasActions) && (
          <button
            type="button"
            className="navbar_toggle"
            aria-expanded={isOpen}
            aria-controls={collapseId}
            aria-label={isOpen ? '메뉴 닫기' : toggleLabel}
            onClick={() => setOpen(!isOpen)}
          >
            <Icon
              name="menu"
              size="1.25rem"
              className="navbar_toggle-icon-open"
              aria-hidden
            />
            <Icon
              name="close"
              size="1.25rem"
              className="navbar_toggle-icon-close"
              aria-hidden
            />
          </button>
        )}

        <div
          id={collapseId}
          className={cx('navbar_collapse', isOpen && 'is-open')}
        >
          {hasNodes(children) ? (
            children
          ) : (
            <>
              {items.length > 0 && (
                <nav className="navbar_nav" aria-label="주요 메뉴">
                  <ul className="navbar_list">
                    {items.map((item) => {
                      const active =
                        item.active ||
                        (selectedKey != null && selectedKey === item.key)
                      return (
                        <li className="navbar_item" key={item.key}>
                          <a
                            href={item.href || '#'}
                            className={cx('navbar_link', active && 'is-active')}
                            aria-current={active ? 'page' : undefined}
                            onClick={(event) => handleSelect(item, event)}
                          >
                            {item.label}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              )}
              {hasActions && <div className="navbar_actions">{actions}</div>}
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export type NavbarLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export default Navbar
