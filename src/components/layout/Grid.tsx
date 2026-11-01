import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'

const GAP_TOKEN: Record<string, string> = {
  sm: 'grid_gap-sm',
  lg: 'grid_gap-lg',
  none: 'grid_gap-none'
}

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: string
  cols?: number | string
  /** columns 별칭 */
  columns?: number | string | null
  gap?: 'sm' | 'lg' | 'none' | string | number
  ratio?: string
  autoFit?: boolean
  autoFill?: boolean
  equalColumns?: boolean
  align?: '' | 'center' | 'end'
  children?: ReactNode
}

export function Grid ({
  as = 'div',
  cols = 12,
  columns = null,
  gap = '',
  ratio = '',
  autoFit = false,
  autoFill = false,
  equalColumns = false,
  align = '',
  className,
  style,
  children,
  ...rest
}: GridProps) {
  const resolvedCols = columns != null ? columns : cols

  const gridClass = cx(
    'grid',
    resolvedCols && 'grid_cols-' + resolvedCols,
    typeof gap === 'string' && GAP_TOKEN[gap],
    ratio && 'grid_ratio-' + ratio,
    autoFit && 'grid_auto-fit',
    autoFill && 'grid_auto-fill',
    equalColumns && 'grid_equal-columns',
    align && 'grid_align-' + align,
    className
  )

  const inlineStyle = typeof gap === 'number' ? { gap: gap + 'px', ...style } : style

  return createElement(as, { ...rest, className: gridClass, style: inlineStyle }, children)
}

export default Grid
