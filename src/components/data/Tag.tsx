import {
  createElement,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

export type TagColor = 'primary' | 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted'
export type TagVariant = 'filled' | 'solid' | 'outline' | 'borderless'

const VARIANT_CLASS: Record<string, string> = {
  filled: '',
  solid: 'tag_solid',
  outline: 'tag_outline',
  borderless: 'tag_borderless'
}

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
  disabled?: boolean
  ripple?: boolean
  icon?: ReactNode
  children?: ReactNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
}

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
  selected = false,
  disabled = false,
  ripple = true,
  icon,
  children,
  className,
  onClick,
  onClose,
  ...rest
}: TagProps) {
  const rootTag = href ? 'a' : (checkable || add) ? 'button' : 'span'
  const resolvedColor = color || type || 'primary'

  const tagClass = cx(
    'tag',
    VARIANT_CLASS[variant],
    resolvedColor && resolvedColor !== 'default' && 'color_' + resolvedColor,
    size === 'sm' && 'tag_sm',
    size === 'lg' && 'tag_lg',
    round && 'tag_round',
    checkable && 'tag_checkable',
    add && 'tag_add',
    selected && 'is-selected',
    disabled && 'is-disabled',
    className
  )

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    onClick?.(event)
  }

  return createElement(
    rootTag,
    {
      ...rest,
      className: tagClass,
      href: rootTag === 'a' ? (href || undefined) : undefined,
      disabled: rootTag === 'button' ? disabled : undefined,
      'aria-disabled': disabled ? 'true' : undefined,
      'data-ripple': ripple ? undefined : 'false',
      onClick: handleClick
    },
    hasNodes(icon) && <span className="tag_icon">{icon}</span>,
    <span className="tag_label">{hasNodes(children) ? children : label}</span>,
    closable && (
      <button
        type="button"
        className="tag_close"
        aria-label={closeLabel || '닫기'}
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation()
          if (disabled) return
          onClose?.(event)
        }}
      >×</button>
    )
  )
}

export default Tag
