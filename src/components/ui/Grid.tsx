/**
 * 그리드 레이아웃.
 * 열 개수(cols)·간격으로 격자 배치를 만든다.
 */
import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'

/** 간격 이름 → grid_gap-* 클래스 */
const GAP_TOKEN: Record<string, string> = {
  sm: 'grid_gap-sm',
  lg: 'grid_gap-lg',
  none: 'grid_gap-none'
}

/** 열 개수를 나누는 격자 */
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

/**
 * 격자 배치.
 * columns 열 수, gap 간격.
 */
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
