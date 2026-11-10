'use client'

/**
 * 브레드크럼.
 * 경로 단계(href·current)를 CSS 구분자와 함께 나열한다.
 */

import {
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 경로 한 칸 */
export interface BreadcrumbItem {
  key?: string
  label?: ReactNode
  href?: string
  current?: boolean
  disabled?: boolean
  icon?: ReactNode
  ariaLabel?: string
}

/** 경로 표시가 받는 값 */
export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  items?: BreadcrumbItem[]
  ariaLabel?: string
  separator?: 'chevron' | 'slash' | 'dot'
  size?: 'sm' | 'md' | 'lg'
  /** 중간을 … 로 접을 때 최대 표시 개수(끝·시작 포함). 0 이하면 접지 않음 */
  maxItems?: number
  /** 말줄임 펼침(제어) */
  expanded?: boolean
  /** 비제어 초기 펼침 */
  defaultExpanded?: boolean
  /** 펼침 상태가 바뀔 때 호출 */
  onExpandedChange?: (expanded: boolean) => void
  /** 링크 클릭 시 호출. 페이지에서 라우팅을 제어한다 */
  onSelect?: (
    item: BreadcrumbItem,
    index: number,
    event: MouseEvent<HTMLAnchorElement>
  ) => void
}

/**
 * 현재 위치를 보여주는 경로.
 * items 순서대로. expanded · onSelect 로 페이지에서 제어한다.
 */
export function Breadcrumb ({
  items = [],
  ariaLabel = '경로',
  separator = 'chevron',
  size = 'md',
  maxItems = 0,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  onSelect,
  className,
  ...rest
}: BreadcrumbProps) {
  const controlled = expandedProp !== undefined
  const [innerExpanded, setInnerExpanded] = useState(defaultExpanded)
  const expanded = controlled ? expandedProp : innerExpanded

  const setExpanded = (next: boolean) => {
    if (!controlled) setInnerExpanded(next)
    onExpandedChange?.(next)
  }

  const isCurrent = (item: BreadcrumbItem, index: number) =>
    Boolean(item.current) || index === items.length - 1

  const itemKey = (item: BreadcrumbItem, index: number) => {
    if (item.key) return item.key
    if (item.href) return String(item.href) + '-' + index
    if (typeof item.label === 'string' || typeof item.label === 'number') {
      return String(item.label) + '-' + index
    }
    return String(index)
  }

  const canCollapse =
    !expanded &&
    maxItems > 2 &&
    items.length > maxItems

  /** 접으면 첫 칸 + … + 끝 (maxItems-1) 칸 */
  const visibleItems: Array<BreadcrumbItem | { type: 'ellipsis' }> = (() => {
    if (!canCollapse) return items
    const tailCount = Math.max(1, maxItems - 1)
    const head = items.slice(0, 1)
    const tail = items.slice(items.length - tailCount)
    return [...head, { type: 'ellipsis' as const }, ...tail]
  })()

  return (
    <nav
      {...rest}
      className={cx(
        'breadcrumb',
        separator === 'slash' && 'breadcrumb_sep-slash',
        separator === 'dot' && 'breadcrumb_sep-dot',
        size === 'sm' && 'breadcrumb_sm',
        size === 'lg' && 'breadcrumb_lg',
        className
      )}
      aria-label={ariaLabel || '경로'}
    >
      <ol className="breadcrumb_list">
        {visibleItems.map((entry, index) => {
          if ('type' in entry && entry.type === 'ellipsis') {
            return (
              <li key="ellipsis" className="breadcrumb_item">
                <button
                  type="button"
                  className="breadcrumb_ellipsis"
                  aria-label="경로 펼치기"
                  onClick={() => setExpanded(true)}
                >
                  …
                </button>
              </li>
            )
          }

          const item = entry as BreadcrumbItem
          // visibleItems 가 접힌 목록일 때 원본 index 를 맞춤
          const sourceIndex = canCollapse
            ? (index === 0
              ? 0
              : items.length - (visibleItems.length - index))
            : index
          const current = isCurrent(item, sourceIndex)
          const iconOnly = hasNodes(item.icon) && !hasNodes(item.label)

          return (
            <li
              key={itemKey(item, sourceIndex)}
              className={cx('breadcrumb_item', current && 'is-current')}
              aria-current={current ? 'page' : undefined}
            >
              {item.href && !current && !item.disabled
                ? (
                  <a
                    className={cx(
                      'breadcrumb_link',
                      iconOnly && 'breadcrumb_link-icon'
                    )}
                    href={item.href}
                    aria-label={item.ariaLabel || undefined}
                    onClick={(event) => onSelect?.(item, sourceIndex, event)}
                  >
                    {hasNodes(item.icon) && (
                      <span className="breadcrumb_icon">{item.icon}</span>
                    )}
                    {hasNodes(item.label) ? item.label : null}
                  </a>
                )
                : (
                  <span
                    className={cx(
                      current ? 'breadcrumb_current' : 'breadcrumb_link',
                      !current && item.disabled && 'is-disabled',
                      iconOnly && 'breadcrumb_link-icon'
                    )}
                    aria-disabled={item.disabled ? 'true' : undefined}
                  >
                    {hasNodes(item.icon) && (
                      <span className="breadcrumb_icon">{item.icon}</span>
                    )}
                    {hasNodes(item.label) ? item.label : null}
                  </span>
                )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
