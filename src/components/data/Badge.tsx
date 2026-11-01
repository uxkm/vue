import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

export type BadgeColor = 'primary' | 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted'

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

  return (
    <span
      {...rest}
      className={cx(
        'badge',
        resolvedColor && resolvedColor !== 'default' && 'color_' + resolvedColor,
        size === 'sm' && 'badge_sm',
        size === 'lg' && 'badge_lg',
        (dot || dotOnly) && 'badge_dot',
        dotOnly && 'badge_dot-only',
        count && 'badge_count',
        className
      )}
      role={dotOnly ? 'status' : undefined}
      aria-label={ariaLabel || undefined}
    >
      {hasNodes(children) ? children : label}
    </span>
  )
}

export default Badge
