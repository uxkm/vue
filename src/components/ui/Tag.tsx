'use client'

/**
 * 태그 라벨.
 * 색·filled/outline 등으로 짧은 분류 표시. TagGroup으로 묶을 수 있다.
 */

import {
  createElement,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 태그 색 */
export type TagColor = 'primary' | 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted'
/** 태그 모양. filled 채움, outline 테두리, borderless 테두리 없음 */
export type TagVariant = 'filled' | 'solid' | 'outline' | 'borderless'

const VALID_VARIANTS = new Set(['filled', 'solid', 'outline', 'borderless'])
const VALID_SIZES = new Set(['sm', 'md', 'lg'])

/** 태그가 받는 값. 닫기 버튼이 있으면 onClose */
export interface TagProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color' | 'onClick'> {
  color?: TagColor | ''
  /** @deprecated use `color` */
  type?: string
  variant?: TagVariant
  size?: 'sm' | 'md' | 'lg'
  label?: string
  href?: string
  closeLabel?: string
  round?: boolean
  checkable?: boolean
  add?: boolean
  closable?: boolean
  selected?: boolean
  /** 비제어 초기 선택(checkable) */
  defaultSelected?: boolean
  disabled?: boolean
  ripple?: boolean
  icon?: ReactNode
  children?: ReactNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
  /** checkable 선택 상태가 바뀔 때 호출. 페이지에서 선택값을 제어한다 */
  onSelectedChange?: (selected: boolean, event: MouseEvent<HTMLElement>) => void
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
}

/** 관련 Tag를 묶는 그룹 */
export interface TagGroupProps extends HTMLAttributes<HTMLDivElement> {
  tight?: boolean
  ariaLabel?: string
  children?: ReactNode
}

function CloseIcon () {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

/**
 * 분류용 태그.
 * color 색, variant 채움·테두리. closable 이면 닫기 버튼이 있다.
 */
export function Tag ({
  color,
  type = '',
  variant = 'filled',
  size = 'md',
  label = '',
  href = '',
  closeLabel = '',
  round = false,
  checkable = false,
  add = false,
  closable = false,
  selected,
  defaultSelected = false,
  disabled = false,
  ripple = false,
  icon,
  children,
  className,
  onClick,
  onSelectedChange,
  onClose,
  ...rest
}: TagProps) {
  const resolvedColor = color || type || 'primary'
  const resolvedVariant = VALID_VARIANTS.has(variant) ? variant : 'filled'
  const resolvedSize = VALID_SIZES.has(size) ? size : 'md'
  const interactive = checkable || add || Boolean(href)
  const splitControl = closable && interactive
  const selectedControlled = selected !== undefined
  const [innerSelected, setInnerSelected] = useState(defaultSelected)
  const isSelected = selectedControlled ? Boolean(selected) : innerSelected

  const tagClass = cx(
    'tag',
    resolvedColor && 'color_' + resolvedColor,
    resolvedVariant !== 'filled' && 'tag_' + resolvedVariant,
    resolvedSize !== 'md' && 'tag_' + resolvedSize,
    round && 'tag_round',
    checkable && 'tag_checkable',
    add && 'tag_add',
    isSelected && 'is-selected',
    disabled && 'is-disabled',
    className
  )

  const text = hasNodes(children) ? children : label
  const content = (
    <>
      {hasNodes(icon) && (
        <span className="tag_icon" aria-hidden="true">{icon}</span>
      )}
      {text}
    </>
  )

  const closeButton = closable
    ? (
      <button
        type="button"
        className="tag_close"
        aria-label={
          closeLabel ||
          (typeof text === 'string' ? `${text} 태그 제거` : '태그 제거')
        }
        disabled={disabled || undefined}
        onClick={(event) => {
          event.stopPropagation()
          if (disabled) return
          onClose?.(event)
        }}
      >
        <CloseIcon />
      </button>
      )
    : null

  /** 비활성이면 막고, checkable 이면 선택 토글 후 onClick */
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    if (checkable) {
      const next = !isSelected
      if (!selectedControlled) setInnerSelected(next)
      onSelectedChange?.(next, event)
    }
    onClick?.(event)
  }

  const rippleAttr = ripple ? 'true' : undefined

  if (splitControl) {
    const Control = checkable || add ? 'button' : 'a'
    return (
      <span
        {...rest}
        className={tagClass}
        aria-disabled={disabled || undefined}
      >
        {createElement(
          Control,
          {
            className: 'tag_control',
            type: Control === 'button' ? 'button' : undefined,
            href: Control === 'a' && !disabled ? (href || undefined) : undefined,
            disabled: Control === 'button' ? disabled : undefined,
            'aria-disabled': Control === 'a' && disabled ? true : undefined,
            'aria-pressed': checkable ? isSelected : undefined,
            tabIndex: Control === 'a' && disabled ? -1 : undefined,
            'data-ripple': rippleAttr,
            onClick: handleClick
          },
          content
        )}
        {closeButton}
      </span>
    )
  }

  const rootTag = checkable || add ? 'button' : href ? 'a' : 'span'

  return createElement(
    rootTag,
    {
      ...rest,
      className: tagClass,
      type: rootTag === 'button' ? 'button' : undefined,
      href: rootTag === 'a' && !disabled ? (href || undefined) : undefined,
      disabled: rootTag === 'button' ? disabled : undefined,
      'aria-disabled': rootTag !== 'button' && disabled ? true : undefined,
      'aria-pressed': checkable ? isSelected : undefined,
      tabIndex: rootTag === 'a' && disabled ? -1 : undefined,
      'data-ripple': rippleAttr,
      onClick: handleClick
    },
    content,
    closeButton
  )
}

/**
 * 관련 Tag를 role=group으로 묶는다. tight면 간격을 줄인다.
 */
export function TagGroup ({
  tight = false,
  ariaLabel = '',
  children,
  className,
  ...rest
}: TagGroupProps) {
  return (
    <div
      {...rest}
      className={cx('tag_group', tight && 'tag_group-tight', className)}
      role="group"
      aria-label={ariaLabel || undefined}
    >
      {children}
    </div>
  )
}

export default Tag
