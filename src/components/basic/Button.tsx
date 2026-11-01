import {
  createElement,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

export type ButtonVariant = 'filled' | 'outline' | 'ghost' | 'text' | 'select'
export type ButtonColor = 'primary' | 'default' | 'success' | 'warning' | 'danger' | 'muted'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANT_CLASS: Record<string, string> = {
  filled: 'btn_filled',
  outline: 'btn_outline',
  ghost: 'btn_ghost',
  text: 'btn_text',
  select: 'btn_select'
}

export interface ButtonProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onClick' | 'onKeyDown' | 'role' | 'color'> {
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  label?: string
  ripple?: boolean
  round?: boolean
  vertical?: boolean
  iconOnly?: boolean
  block?: boolean
  grow?: boolean | string | number
  fit?: boolean
  disabled?: boolean
  ariaDisabled?: boolean
  loading?: boolean
  open?: boolean
  error?: boolean
  placeholder?: boolean
  selectText?: boolean
  selectCaret?: boolean
  type?: 'button' | 'submit' | 'reset'
  /** @deprecated use `type` — kept for older demos */
  nativeType?: 'button' | 'submit' | 'reset' | ''
  tag?: 'button' | 'a' | 'div'
  href?: string
  role?: string
  ariaLabel?: string
  haspopup?: boolean | string | null
  expanded?: boolean | null
  invalid?: boolean
  iconBefore?: ReactNode
  iconAfter?: ReactNode
  children?: ReactNode
  onClick?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
}

export function Button ({
  variant = 'filled',
  color = 'primary',
  size = 'md',
  label = 'Button',
  ripple = true,
  round = false,
  vertical = false,
  iconOnly = false,
  block = false,
  grow = false,
  fit = false,
  disabled = false,
  ariaDisabled = false,
  loading = false,
  open = false,
  error = false,
  placeholder = false,
  selectText = false,
  selectCaret = false,
  type = 'button',
  nativeType = '',
  tag = 'button',
  href = '',
  role = '',
  tabIndex,
  ariaLabel = '',
  haspopup = null,
  expanded = null,
  invalid = false,
  iconBefore,
  iconAfter,
  children,
  className,
  onClick,
  onKeyDown,
  ...rest
}: ButtonProps) {
  const rootTag = tag
  const resolvedType = nativeType || type
  const isDisabled = !!(disabled || ariaDisabled || loading)
  const showCaret = variant === 'select' ? true : !!selectCaret

  const btnClass = cx(
    'btn',
    variant === 'select' && selectText
      ? 'btn_select-text'
      : VARIANT_CLASS[variant] || 'btn_filled',
    variant !== 'ghost' && 'color_' + color,
    size === 'sm' && 'btn_sm',
    size === 'lg' && 'btn_lg',
    round && 'btn_round',
    block && 'btn_block',
    fit && 'btn_fit',
    (grow === true || grow === '') && 'btn_grow',
    (grow === 2 || grow === '2') && 'btn_grow-2',
    iconOnly && 'btn_icon-only',
    vertical && 'btn_vertical',
    placeholder && 'is-placeholder',
    (disabled || ariaDisabled) && 'is-disabled',
    loading && 'is-loading',
    open && 'is-open',
    (error || invalid) && 'is-error',
    className
  )

  const needsButtonRole = tag === 'div' || (tag === 'a' && !href)
  const computedRole = role || (needsButtonRole ? 'button' : undefined)

  let computedTabIndex: number | undefined
  if (tabIndex !== undefined && tabIndex !== null) {
    computedTabIndex = tabIndex
  } else if (isDisabled && tag !== 'button') {
    computedTabIndex = -1
  } else if (needsButtonRole) {
    computedTabIndex = 0
  }

  let haspopupAttr: string | undefined
  if (haspopup === true || haspopup === '') haspopupAttr = 'true'
  else if (haspopup === false || haspopup == null) haspopupAttr = undefined
  else haspopupAttr = String(haspopup)

  let expandedAttr: 'true' | 'false' | undefined
  if (expanded === true) expandedAttr = 'true'
  else if (expanded === false) expandedAttr = 'false'
  else {
    // select / haspopup / open 사용 시에만 aria-expanded 노출
    const needsExpanded =
      variant === 'select' ||
      open === true ||
      (haspopup !== null && haspopup !== false && haspopup !== undefined)
    expandedAttr = needsExpanded ? (open ? 'true' : 'false') : undefined
  }

  const handleClick = (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    if (isDisabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    onClick?.(event)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event)
    if (isDisabled) return
    if (computedRole !== 'button') return
    // 네이티브 button 은 브라우저가 Enter/Space 를 click 으로 처리
    if (rootTag === 'button') return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick(event)
    }
  }

  let content: ReactNode
  if (iconOnly) {
    content = children
  } else {
    content = (
      <>
        {hasNodes(iconBefore) && (
          <span className="btn_icon btn_icon-before">{iconBefore}</span>
        )}
        <span className="btn_label">{hasNodes(children) ? children : label}</span>
        {hasNodes(iconAfter) && (
          <span className="btn_icon btn_icon-after">{iconAfter}</span>
        )}
        {showCaret && (
          <span className="btn_icon btn_icon-after btn_caret" aria-hidden="true">▾</span>
        )}
      </>
    )
  }

  return createElement(
    rootTag,
    {
      ...rest,
      className: btnClass,
      type: rootTag === 'button' ? resolvedType : undefined,
      href: rootTag === 'a' ? (href || undefined) : undefined,
      disabled: rootTag === 'button' ? isDisabled : undefined,
      role: computedRole,
      tabIndex: computedTabIndex,
      'aria-busy': loading ? 'true' : undefined,
      'aria-disabled': isDisabled ? 'true' : undefined,
      'aria-label': ariaLabel || (rest as Record<string, unknown>)['aria-label'] || undefined,
      'aria-haspopup': haspopupAttr,
      'aria-expanded': expandedAttr,
      'aria-invalid': (error || invalid) ? 'true' : undefined,
      'data-ripple': ripple ? undefined : 'false',
      onClick: handleClick,
      onKeyDown: handleKeyDown
    },
    content
  )
}

export default Button
