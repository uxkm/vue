/**
 * 배지.
 * 짧은 상태·수치 라벨을 색상별로 표시한다. BadgeWrap으로 요소 위에 겹친다.
 */
import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 배지 색 */
export type BadgeColor = 'primary' | 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted'

const VALID_SIZES = new Set(['sm', 'md', 'lg'])

/** 배지가 받는 값. 짧은 상태 글자용 */
export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  color?: BadgeColor | ''
  /** @deprecated use `color` */
  type?: string
  size?: 'sm' | 'md' | 'lg'
  label?: string
  ariaLabel?: string
  dot?: boolean
  count?: boolean
  dotOnly?: boolean
  children?: ReactNode
}

/** 겹침 래퍼. 기준 요소와 Badge를 같은 좌표 컨텍스트에 둔다 */
export interface BadgeWrapProps extends HTMLAttributes<HTMLSpanElement> {
  ariaLabel?: string
  children?: ReactNode
}

/**
 * 상태·개수를 나타내는 작은 뱃지.
 * color 색, size 크기. dot 점, count 숫자, dotOnly 점만.
 * label 또는 children 이 문구다.
 */
export function Badge ({
  color,
  type = '',
  size = 'md',
  label = '',
  ariaLabel = '',
  dot = false,
  count = false,
  dotOnly = false,
  children,
  className,
  ...rest
}: BadgeProps) {
  const resolvedColor = color || type || 'primary'
  const resolvedSize = VALID_SIZES.has(size) ? size : 'md'

  return (
    <span
      {...rest}
      className={cx(
        dotOnly ? 'badge_dot-only' : 'badge',
        resolvedColor && 'color_' + resolvedColor,
        resolvedSize === 'sm' && 'badge_sm',
        resolvedSize === 'lg' && 'badge_lg',
        !dotOnly && dot && 'badge_dot',
        !dotOnly && count && 'badge_count',
        className
      )}
      role={dotOnly ? 'status' : undefined}
      aria-label={ariaLabel || undefined}
    >
      {dotOnly ? null : (hasNodes(children) ? children : label)}
    </span>
  )
}

/**
 * 기준 요소와 Badge를 겹쳐 배치하는 래퍼.
 */
export function BadgeWrap ({
  ariaLabel = '',
  children,
  className,
  ...rest
}: BadgeWrapProps) {
  return (
    <span
      {...rest}
      className={cx('badge_wrap', className)}
      aria-label={ariaLabel || undefined}
    >
      {children}
    </span>
  )
}

export default Badge
