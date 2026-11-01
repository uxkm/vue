import {
  createElement,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'
export type IconColor = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted'

const SIZE_CLASS: Record<string, string> = {
  sm: 'icon_sm',
  md: '',
  lg: 'icon_lg',
  xl: 'icon_xl'
}

const SIZE_PX: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
}

export interface IconProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color' | 'title' | 'onClick'> {
  name?: string
  size?: IconSize | number | string
  color?: IconColor | ''
  inline?: boolean
  spin?: boolean
  button?: boolean
  circle?: boolean
  square?: boolean
  pulse?: boolean
  ripple?: boolean
  ariaLabel?: string
  /** @deprecated use ariaLabel */
  label?: string
  title?: string
  children?: ReactNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

export function Icon ({
  name = 'plus',
  size = 'md',
  color = '',
  inline = false,
  spin = false,
  button = false,
  circle = false,
  square = false,
  pulse = false,
  ripple = true,
  ariaLabel = '',
  label = '',
  title = '',
  children,
  className,
  style,
  onClick,
  ...rest
}: IconProps) {
  const rootTag = button ? 'button' : 'span'
  const resolvedAriaLabel = ariaLabel || label || undefined
  const isDecorative = !(resolvedAriaLabel || title || button)

  let sizeToken: string | null
  if (typeof size === 'number') sizeToken = null
  else {
    const key = String(size)
    sizeToken = SIZE_CLASS[key] !== undefined ? key : 'md'
  }

  const iconClass = cx(
    'icon',
    button
      ? 'icon_button'
      : circle
        ? [
            'icon_circle',
            sizeToken === 'sm' && 'icon_circle-sm',
            (sizeToken === 'lg' || sizeToken === 'xl') && 'icon_circle-lg'
          ]
        : square && 'icon_square',
    sizeToken && SIZE_CLASS[sizeToken],
    color && 'color_' + color,
    inline && 'icon_inline',
    spin && 'icon_spin',
    pulse && circle && 'icon_pulse',
    className
  )

  let sizeStyle: CSSProperties | undefined
  if (typeof size === 'number') {
    sizeStyle = { width: size + 'px', height: size + 'px', fontSize: size + 'px' }
  } else if (!(button || circle || square)) {
    const px = SIZE_PX[sizeToken || 'md'] || SIZE_PX.md
    sizeStyle = { width: px + 'px', height: px + 'px', fontSize: px + 'px' }
  }

  return createElement(
    rootTag,
    {
      ...rest,
      className: iconClass,
      type: button ? 'button' : undefined,
      'aria-hidden': isDecorative ? 'true' : undefined,
      'aria-label': resolvedAriaLabel,
      title: title || undefined,
      'data-ripple': button ? (ripple ? undefined : 'false') : undefined,
      style: sizeStyle || style ? { ...sizeStyle, ...style } : undefined,
      onClick: button ? onClick : undefined
    },
    children != null && children !== false && children !== '' ? children : name
  )
}

export default Icon
