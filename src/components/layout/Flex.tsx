import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'

const GAP_TOKEN: Record<string, string> = {
  sm: 'flex_gap-sm',
  lg: 'flex_gap-lg',
  none: 'flex_gap-none'
}

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  as?: string
  direction?: 'row' | 'col' | 'column' | string
  wrap?: boolean
  gap?: 'sm' | 'lg' | 'none' | string | number
  cols?: number | string
  ratio?: string
  equal?: boolean
  autoFit?: boolean
  align?: string
  justify?: string
  children?: ReactNode
}

export function Flex ({
  as = 'div',
  direction = 'row',
  wrap = false,
  gap = '',
  cols = '',
  ratio = '',
  equal = false,
  autoFit = false,
  align = '',
  justify = '',
  className,
  style,
  children,
  ...rest
}: FlexProps) {
  const isCol = direction === 'col' || direction === 'column'

  const flexClass = cx(
    'flex',
    isCol ? 'flex_col' : 'flex_row',
    wrap && 'flex_wrap',
    typeof gap === 'string' && GAP_TOKEN[gap],
    cols && 'flex_cols-' + cols,
    ratio && 'flex_ratio-' + ratio,
    equal && 'flex_equal',
    autoFit && 'flex_auto-fit',
    align && 'flex_align-' + align,
    justify && 'flex_justify-' + (justify === 'space-between' ? 'between' : justify),
    className
  )

  const inlineStyle = typeof gap === 'number' ? { gap: gap + 'px', ...style } : style

  return createElement(as, { ...rest, className: flexClass, style: inlineStyle }, children)
}

export default Flex
