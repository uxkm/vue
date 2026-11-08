/**
 * Flex 레이아웃.
 * direction·gap·정렬로 가로·세로 배치 상자를 만든다.
 */
import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'

/** 간격 이름 → flex_gap-* 클래스 */
const GAP_TOKEN: Record<string, string> = {
  sm: 'flex_gap-sm',
  lg: 'flex_gap-lg',
  none: 'flex_gap-none'
}

/** 가로·세로 정렬 상자 */
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

/**
 * 가로·세로 배치.
 * direction 방향, align 교차축, justify 주축, gap 간격.
 */
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
