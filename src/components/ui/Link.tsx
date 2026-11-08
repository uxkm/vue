/**
 * 텍스트 링크.
 * href 또는 버튼형 클릭. 색·크기 조절.
 */
import {
  createElement,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 링크 글자 색 */
export type LinkColor = 'primary' | 'muted' | 'success' | 'warning' | 'danger' | 'info'
/** 링크 글자 크기. 생략하면 본문과 같다 */
export type LinkSize = 'sm' | 'lg' | 'xl'

/** 링크가 받는 값. href 가 없으면 버튼처럼 동작할 수 있다 */
export interface LinkProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color' | 'onClick'> {
  as?: string
  href?: string
  label?: string
  color?: LinkColor | ''
  size?: LinkSize | ''
  underline?: boolean
  noUnderline?: boolean
  standalone?: boolean
  nav?: boolean
  block?: boolean
  back?: boolean
  iconOnly?: boolean
  active?: boolean
  disabled?: boolean
  /** @deprecated use target="_blank" */
  blank?: boolean
  target?: string
  rel?: string
  ariaLabel?: string
  ripple?: boolean
  icon?: ReactNode
  iconAfter?: ReactNode
  children?: ReactNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

/**
 * 공통 링크.
 * color 색, size 크기. href 또는 to 가 주소다.
 */
export function Link ({
  as = 'a',
  href = '#',
  label = '',
  color = 'primary',
  size = '',
  underline = false,
  noUnderline = false,
  standalone = false,
  nav = false,
  block = false,
  back = false,
  iconOnly = false,
  active = false,
  disabled = false,
  blank = false,
  target = '',
  rel = '',
  ariaLabel = '',
  ripple = false,
  icon,
  iconAfter,
  children,
  className,
  onClick,
  ...rest
}: LinkProps) {
  const rootTag = as || 'a'
  const resolvedTarget = target || (blank ? '_blank' : '')
  const resolvedRel = rel || (resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined)

  const linkClass = cx(
    'link',
    color && 'color_' + color,
    size && 'size_' + size,
    underline && 'link_underline',
    noUnderline && 'link_no-underline',
    standalone && 'link_standalone',
    nav && 'link_nav',
    block && 'link_block',
    back && 'link_back',
    iconOnly && 'link_icon-only',
    active && 'is-active',
    disabled && 'is-disabled',
    className
  )

  /** 비활성이면 이동을 막고, 아니면 onClick */
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
      className: linkClass,
      href: rootTag === 'a' ? (href || '#') : undefined,
      target: resolvedTarget || undefined,
      rel: resolvedRel,
      'aria-label': ariaLabel || (rest as Record<string, unknown>)['aria-label'] || undefined,
      'aria-disabled': disabled ? 'true' : undefined,
      'data-ripple': ripple ? 'true' : undefined,
      tabIndex: disabled ? -1 : undefined,
      onClick: handleClick
    },
    hasNodes(icon) && <span className="link_icon">{icon}</span>,
    !iconOnly && <span className="link_label">{hasNodes(children) ? children : label}</span>,
    hasNodes(iconAfter) && <span className="link_icon">{iconAfter}</span>
  )
}

export default Link
