'use client'

/**
 * 메뉴 목록.
 * 세로·가로 방향의 네비게이션 링크 묶음. 서브메뉴·그룹·구분선을 지원한다.
 */

import {
  createContext,
  useContext,
  useId,
  useState,
  type HTMLAttributes,
  type MouseEvent,
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
export interface MenuProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  items?: MenuItem[]
  direction?: 'vertical' | 'horizontal'
  bordered?: boolean
  compact?: boolean
  dark?: boolean
  label?: string
  children?: ReactNode
  /** 선택 키(제어). 넘기면 해당 항목에 is-active */
  selectedKey?: string | null
  /** 비제어 초기 선택 키 */
  defaultSelectedKey?: string
  /** 항목 클릭 시 호출. 페이지에서 라우팅·액션을 제어한다 */
  onSelect?: (key: string, item: MenuItem, event: MouseEvent<HTMLElement>) => void
  /** 열린 서브메뉴 키 목록(제어) */
  openKeys?: string[]
  /** 비제어 초기 열린 서브메뉴 키 */
  defaultOpenKeys?: string[]
  /** 서브메뉴 열림이 바뀔 때 호출 */
  onOpenChange?: (openKeys: string[]) => void
}

type MenuContextValue = {
  selectedKey: string | null
  openKeys: string[]
  onSelect?: MenuProps['onSelect']
  setOpenKey: (key: string, open: boolean) => void
}

const MenuContext = createContext<MenuContextValue>({
  selectedKey: null,
  openKeys: [],
  setOpenKey: () => {}
})

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

function collectDefaultOpenKeys (items: MenuItem[], acc: string[] = []) {
  for (const item of items) {
    if (item.defaultOpen) acc.push(item.key)
    if (item.children?.length) collectDefaultOpenKeys(item.children, acc)
  }
  return acc
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
  const { selectedKey, openKeys, onSelect, setOpenKey } = useContext(MenuContext)
  const open = openKeys.includes(item.key)
  const active = item.active || (selectedKey != null && selectedKey === item.key)

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
      >
        <button
          type="button"
          className={cx('menu_link', active && 'is-active', item.disabled && 'is-disabled')}
          aria-expanded={open}
          aria-controls={subId}
          disabled={item.disabled}
          onClick={() => setOpenKey(item.key, !open)}
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

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (item.disabled) {
      event.preventDefault()
      return
    }
    onSelect?.(item.key, item, event)
  }

  return (
    <li className={cx('menu_item', item.disabled && 'is-disabled')}>
      {item.href ? <a
        href={item.href}
        className={cx(
          'menu_link',
          active && 'is-active',
          item.disabled && 'is-disabled'
        )}
        aria-current={active ? 'page' : undefined}
        aria-disabled={item.disabled || undefined}
        tabIndex={item.disabled ? -1 : undefined}
        onClick={handleClick}
      >
        <MenuLinkContent icon={item.icon} label={item.label} extra={item.extra} />
      </a> : <button
        type="button"
        className={cx('menu_link', active && 'is-active', item.disabled && 'is-disabled')}
        disabled={item.disabled}
        onClick={handleClick}
      >
        <MenuLinkContent icon={item.icon} label={item.label} extra={item.extra} />
      </button>}
    </li>
  )
}

/**
 * 페이지 이동 메뉴.
 * selectedKey · onSelect · openKeys · onOpenChange 로 페이지에서 제어한다.
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
  selectedKey,
  defaultSelectedKey,
  onSelect,
  openKeys,
  defaultOpenKeys,
  onOpenChange,
  ...rest
}: MenuProps) {
  const idPrefix = useId()
  const controlledSelected = selectedKey !== undefined
  const [innerSelected, setInnerSelected] = useState<string | null>(defaultSelectedKey ?? null)
  const currentSelected = controlledSelected ? (selectedKey ?? null) : innerSelected

  const controlledOpen = openKeys !== undefined
  const [innerOpenKeys, setInnerOpenKeys] = useState<string[]>(
    () => defaultOpenKeys ?? collectDefaultOpenKeys(items)
  )
  const currentOpenKeys = controlledOpen ? openKeys! : innerOpenKeys

  const handleSelect: MenuProps['onSelect'] = (key, item, event) => {
    if (!controlledSelected) setInnerSelected(key)
    onSelect?.(key, item, event)
  }

  const setOpenKey = (key: string, open: boolean) => {
    const next = open
      ? (currentOpenKeys.includes(key) ? currentOpenKeys : [...currentOpenKeys, key])
      : currentOpenKeys.filter((value) => value !== key)
    if (!controlledOpen) setInnerOpenKeys(next)
    onOpenChange?.(next)
  }

  return (
    <MenuContext.Provider
      value={{
        selectedKey: currentSelected,
        openKeys: currentOpenKeys,
        onSelect: handleSelect,
        setOpenKey
      }}
    >
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
    </MenuContext.Provider>
  )
}

export default Menu
