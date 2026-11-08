/**
 * 메뉴 목록.
 * 세로·가로 방향의 네비게이션 링크 묶음. 서브메뉴·그룹·구분선을 지원한다.
 */
'use client'

import {
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { Icon } from './Icon'

/** 메뉴 항목 · 구분선 · 그룹 */
export interface MenuItem {
  key: string
  label?: ReactNode
  href?: string
  active?: boolean
  disabled?: boolean
  icon?: ReactNode
  extra?: ReactNode
  /** 서브메뉴 */
  children?: MenuItem[]
  /** 기본 펼침(비제어) */
  defaultOpen?: boolean
  type?: 'item' | 'divider' | 'group'
  /** type=group 제목 */
  title?: ReactNode
}

/** 메뉴가 받는 값 */
export interface MenuProps extends HTMLAttributes<HTMLElement> {
  items?: MenuItem[]
  direction?: 'vertical' | 'horizontal'
  bordered?: boolean
  compact?: boolean
  dark?: boolean
  label?: string
  children?: ReactNode
}

function MenuLinkContent ({
  icon,
  label,
  extra,
  arrow
}: {
  icon?: ReactNode
  label?: ReactNode
  extra?: ReactNode
  arrow?: boolean
}) {
  return (
    <>
      {hasNodes(icon) && <span className="menu_icon">{icon}</span>}
      {hasNodes(label) && <span className="menu_label">{label}</span>}
      {hasNodes(extra) && <span className="menu_extra">{extra}</span>}
      {arrow && (
        <Icon name="chevron" size="0.875rem" className="menu_arrow" aria-hidden />
      )}
    </>
  )
}

function MenuItems ({
  items,
  idPrefix
}: {
  items: MenuItem[]
  idPrefix: string
}) {
  return items.map((item) => (
    <MenuItemNode key={item.key} item={item} idPrefix={idPrefix} />
  ))
}

function MenuItemNode ({
  item,
  idPrefix
}: {
  item: MenuItem
  idPrefix: string
}) {
  const subId = `${idPrefix}-${item.key}`
  const hasSub = Array.isArray(item.children) && item.children.length > 0
  const [open, setOpen] = useState(Boolean(item.defaultOpen))

  if (item.type === 'divider') {
    return <li className="menu_divider" role="separator" />
  }

  if (item.type === 'group') {
    return (
      <li className="menu_group">
        {hasNodes(item.title) && (
          <span className="menu_group-title">{item.title}</span>
        )}
        {hasSub && (
          <ul className="menu_list">
            <MenuItems items={item.children!} idPrefix={subId} />
          </ul>
        )}
      </li>
    )
  }

  if (hasSub) {
    return (
      <li
        className={cx(
          'menu_item',
          'menu_item-submenu',
          item.disabled && 'is-disabled'
        )}
        aria-expanded={open}
      >
        <button
          type="button"
          className={cx('menu_link', item.active && 'is-active', item.disabled && 'is-disabled')}
          aria-expanded={open}
          aria-controls={subId}
          disabled={item.disabled}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuLinkContent
            icon={item.icon}
            label={item.label}
            extra={item.extra}
            arrow
          />
        </button>
        <ul className="menu_submenu" id={subId}>
          <MenuItems items={item.children!} idPrefix={subId} />
        </ul>
      </li>
    )
  }

  return (
    <li className={cx('menu_item', item.disabled && 'is-disabled')}>
      <a
        href={item.disabled ? undefined : item.href || '#'}
        className={cx(
          'menu_link',
          item.active && 'is-active',
          item.disabled && 'is-disabled'
        )}
        aria-current={item.active ? 'page' : undefined}
        aria-disabled={item.disabled || undefined}
        tabIndex={item.disabled ? -1 : undefined}
        onClick={item.disabled ? (event) => event.preventDefault() : undefined}
      >
        <MenuLinkContent icon={item.icon} label={item.label} extra={item.extra} />
      </a>
    </li>
  )
}

/**
 * 페이지 이동 메뉴.
 * direction 세로·가로, bordered · compact · dark, items 로 구성한다.
 */
export function Menu ({
  items = [],
  direction = 'vertical',
  bordered = false,
  compact = false,
  dark = false,
  label = '주요 메뉴',
  className,
  children,
  ...rest
}: MenuProps) {
  const idPrefix = useId()

  return (
    <nav
      {...rest}
      className={cx(
        'menu',
        direction === 'horizontal' ? 'menu_horizontal' : 'menu_vertical',
        bordered && 'menu_bordered',
        compact && 'menu_compact',
        dark && 'menu_dark',
        className
      )}
      aria-label={label}
    >
      {hasNodes(children) ? (
        children
      ) : (
        <ul className="menu_list">
          <MenuItems items={items} idPrefix={idPrefix} />
        </ul>
      )}
    </nav>
  )
}

export default Menu
