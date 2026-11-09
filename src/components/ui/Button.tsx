/**
 * 공통 버튼.
 * variant·color·size, 아이콘·loading·disabled. button/a/div 태그 선택 가능.
 */
import {
  createElement,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 버튼 모양. filled 채움, outline 테두리, ghost 옅은 배경, text 글자만, select 선택됨 */
export type ButtonVariant = 'filled' | 'outline' | 'ghost' | 'text' | 'select'
/** 버튼 색. primary 가 기본 강조 */
export type ButtonColor = 'primary' | 'default' | 'success' | 'warning' | 'danger' | 'muted'
/** 버튼 크기. sm 작게, md 기본, lg 크게 */
export type ButtonSize = 'sm' | 'md' | 'lg'

/** variant 이름 → btn_* 클래스 */
const VARIANT_CLASS: Record<string, string> = {
  filled: 'btn_filled',
  outline: 'btn_outline',
  ghost: 'btn_ghost',
  text: 'btn_text',
  select: 'btn_select'
}

/** 버튼이 받는 값. variant·color·size 와 라벨, 아이콘, 비활성 */
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

/**
 * 공통 버튼.
 * variant 모양, color 색, size 크기. label 또는 children 이 문구다.
 * tag 로 button / a / div 를 고르고, loading·disabled 이면 클릭을 막는다.
 */
export function Button ({
  variant = 'filled',
  color = 'primary',
  size = 'md',
  label = 'Button',
  ripple = false,
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
    placeholder && 'btn_select-placeholder',
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

  /** 클릭·Enter·Space. 비활성이면 막고, 아니면 onClick */
  const handleClick = (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    if (isDisabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    onClick?.(event)
  }

  /** 버튼 역할일 때 Enter·Space 를 클릭으로 넘긴다 */
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

  const caret = showCaret ? (
    <span
      className={cx(
        'btn_icon',
        'btn_icon-after',
        variant === 'select' ? 'btn_select-caret' : 'btn_caret'
      )}
      aria-hidden="true"
    >
      {variant === 'select' ? (
        <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      ) : (
        '▾'
      )}
    </span>
  ) : null

  const content: ReactNode = (
    <>
      {loading ? <span aria-hidden="true" className="btn_spinner" /> : null}
      {hasNodes(iconBefore) ? (
        <span className="btn_icon btn_icon-before">{iconBefore}</span>
      ) : null}
      {iconOnly
        ? (hasNodes(children) ? children : null)
        : <span className="btn_label">{hasNodes(children) ? children : label}</span>}
      {hasNodes(iconAfter) ? (
        <span className="btn_icon btn_icon-after">{iconAfter}</span>
      ) : null}
      {caret}
    </>
  )

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
      'data-ripple': ripple ? 'true' : undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown
    },
    content
  )
}

export default Button
