/**
 * 자식 간격 유틸.
 * 자식 사이에 gap 을 넣는 간단한 배치 래퍼.
 */
import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'

/** 간격 이름 → space_gap-* 클래스. md 는 기본이라 클래스 없음 */
const GAP_TOKEN: Record<string, string> = {
  xs: 'space_gap-xs',
  sm: 'space_gap-sm',
  md: '',
  lg: 'space_gap-lg',
  xl: 'space_gap-xl'
}

/** 자식 사이 간격 */
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

/**
 * 자식 사이 간격.
 * gap 또는 size 가 간격, vertical 이면 세로, wrap 줄바꿈.
 */
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
