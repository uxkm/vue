'use client'

/**
 * 트리.
 * Tree · TreeNode로 계층 노드를 접고 펼치며 선택·메타를 표시한다.
 */

import {
  useState,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type MouseEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'

/** Tree 루트 props */
export interface TreeProps extends HTMLAttributes<HTMLUListElement> {
  bordered?: boolean
  lines?: boolean
  compact?: boolean
  ariaLabel?: string
  multiselectable?: boolean
  children?: ReactNode
}

/**
 * 계층 목록 루트.
 * bordered · lines · compact 스킨과 다중 선택 상태를 연결한다.
 */
export function Tree ({
  children,
  bordered = false,
  lines = false,
  compact = false,
  ariaLabel,
  multiselectable = false,
  className,
  ...rest
}: TreeProps) {
  return (
    <ul
      {...rest}
      className={cx(
        'tree',
        bordered && 'tree_bordered',
        lines && 'tree_lines',
        compact && 'tree_compact',
        className
      )}
      role="tree"
      aria-label={ariaLabel}
      aria-multiselectable={multiselectable || undefined}
    >
      {children}
    </ul>
  )
}

/** TreeNode props */
export interface TreeNodeProps extends Omit<LiHTMLAttributes<HTMLLIElement>, 'onSelect' | 'prefix'> {
  /** 노드 식별 값. onSelect 에 전달 */
  value?: string
  label?: ReactNode
  expanded?: boolean
  /** 비제어 초기 펼침 */
  defaultExpanded?: boolean
  selected?: boolean
  /** 비제어 초기 선택 */
  defaultSelected?: boolean
  disabled?: boolean
  expandable?: boolean
  plusToggle?: boolean
  toggleLabel?: string
  link?: boolean
  meta?: ReactNode
  prefix?: ReactNode
  icon?: ReactNode
  labelSlot?: ReactNode
  metaSlot?: ReactNode
  children?: ReactNode
  onExpandedChange?: (expanded: boolean) => void
  /** 선택 상태가 바뀔 때 호출(다음 선택 여부) */
  onSelectedChange?: (selected: boolean, event: MouseEvent<HTMLElement>) => void
  /** 노드 선택 시 호출. 페이지에서 선택 상태를 제어한다 */
  onSelect?: (value: string | undefined, event: MouseEvent<HTMLElement>) => void
}

/**
 * 트리 한 노드.
 * 토글 · 아이콘 · 라벨 · 메타와 자식 그룹을 구성한다.
 */
export function TreeNode ({
  value,
  label,
  expanded,
  defaultExpanded,
  selected: selectedProp,
  defaultSelected = false,
  disabled = false,
  expandable = false,
  plusToggle = false,
  toggleLabel,
  link = false,
  meta,
  prefix,
  icon,
  labelSlot,
  metaSlot,
  children,
  className,
  onExpandedChange,
  onSelectedChange,
  onSelect,
  ...rest
}: TreeNodeProps) {
  const hasChildren = Boolean(children)
  const showToggle = expandable || hasChildren
  const controlledExpand = expanded !== undefined
  const [innerExpanded, setInnerExpanded] = useState(
    () => defaultExpanded ?? expanded ?? true
  )
  const isExpanded = controlledExpand ? expanded !== false : innerExpanded
  const selectedControlled = selectedProp !== undefined
  const [innerSelected, setInnerSelected] = useState(defaultSelected)
  const selected = selectedControlled ? !!selectedProp : innerSelected

  const toggle = () => {
    const next = !isExpanded
    if (!controlledExpand) setInnerExpanded(next)
    onExpandedChange?.(next)
  }

  const handleSelect = (event: MouseEvent<HTMLElement>) => {
    if (disabled) return
    const next = !selected
    if (!selectedControlled) setInnerSelected(next)
    onSelectedChange?.(next, event)
    onSelect?.(value, event)
  }

  const labelContent = labelSlot ?? <span className="tree_label">{label}</span>
  const metaContent = metaSlot ?? meta
  const selectable = link || onSelect != null || onSelectedChange != null

  return (
    <li
      {...rest}
      className={cx('tree_item', className)}
      role="treeitem"
      aria-expanded={showToggle ? isExpanded : undefined}
      aria-selected={selected || undefined}
    >
      <div className={cx('tree_row', selected && 'is-selected', disabled && 'is-disabled')}>
        {showToggle
          ? (
            <button
              type="button"
              className={cx('tree_toggle', plusToggle && 'tree_toggle-plus')}
              aria-expanded={isExpanded}
              aria-label={toggleLabel}
              disabled={disabled || undefined}
              onClick={toggle}
            />
            )
          : (
            <span className="tree_toggle tree_toggle_placeholder" aria-hidden="true" />
            )}
        {prefix}
        {icon
          ? (
            <span className="tree_icon" aria-hidden="true">
              {icon}
            </span>
            )
          : null}
        {selectable
          ? (
            <button
              type="button"
              className="tree_link"
              disabled={disabled || undefined}
              onClick={handleSelect}
            >
              {labelContent}
            </button>
            )
          : labelContent}
        {metaContent != null && metaContent !== ''
          ? (
            <span className="tree_meta">{metaContent}</span>
            )
          : null}
      </div>
      {hasChildren
        ? (
          <ul className="tree" role="group" hidden={!isExpanded}>
            {children}
          </ul>
          )
        : null}
    </li>
  )
}

export default Tree
