import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'

const GAP_TOKEN: Record<string, string> = {
  xs: 'space_gap-xs',
  sm: 'space_gap-sm',
  md: '',
  lg: 'space_gap-lg',
  xl: 'space_gap-xl'
}

export interface SpaceProps extends HTMLAttributes<HTMLElement> {
  as?: string
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number | null
  /** size는 gap 별칭 (기존 데모 호환) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number
  vertical?: boolean
  wrap?: boolean
  block?: boolean
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between'
  children?: ReactNode
}

export function Space ({
  as = 'div',
  gap = null,
  size = 'md',
  vertical = false,
  wrap = false,
  block = false,
  align = 'center',
  justify = 'start',
  className,
  style,
  children,
  ...rest
}: SpaceProps) {
  const resolvedGap = gap != null ? gap : size
  let token: string | null = null
  if (typeof resolvedGap !== 'number') {
    const key = String(resolvedGap)
    token = Object.prototype.hasOwnProperty.call(GAP_TOKEN, key) ? key : 'md'
  }

  const spaceClass = cx(
    'space',
    token && GAP_TOKEN[token],
    vertical && 'space_vertical',
    wrap && 'space_wrap',
    block && 'space_block',
    align && align !== 'center' && 'space_align-' + align,
    justify && justify !== 'start' && 'space_justify-' + justify,
    className
  )

  const inlineStyle = typeof resolvedGap === 'number'
    ? { gap: resolvedGap + 'px', ...style }
    : style

  return createElement(as, { ...rest, className: spaceClass, style: inlineStyle }, children)
}

export default Space
