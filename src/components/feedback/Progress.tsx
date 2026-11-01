import type { HTMLAttributes } from 'react'
import { cx } from '@/utils/cx'

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  percent?: number
  status?: '' | 'success' | 'exception'
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted' | ''
  showInfo?: boolean
  striped?: boolean
  animated?: boolean
  indeterminate?: boolean
  inside?: boolean
  block?: boolean
  label?: string
  ariaLabel?: string
}

export function Progress ({
  percent = 0,
  status = '',
  size = 'md',
  color = 'primary',
  showInfo = false,
  striped = false,
  animated = false,
  indeterminate = false,
  inside = false,
  block = false,
  label = '',
  ariaLabel = '',
  className,
  ...rest
}: ProgressProps) {
  let clamped = Number(percent)
  if (isNaN(clamped) || clamped < 0) clamped = 0
  else if (clamped > 100) clamped = 100

  let infoText: string
  if (label) infoText = label
  else if (status === 'success') infoText = '완료'
  else if (status === 'exception') infoText = '실패'
  else infoText = clamped + '%'

  return (
    <div
      {...rest}
      className={cx(
        'progress',
        size === 'sm' && 'progress_sm',
        size === 'lg' && 'progress_lg',
        block && 'progress_block',
        inside && 'progress_inside',
        indeterminate && 'is-indeterminate',
        status === 'success' && 'is-success',
        status === 'exception' && 'is-exception',
        className
      )}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel || label || '진행률'}
    >
      <div className="progress_track">
        <div
          className={cx(
            'progress_bar',
            color && 'color_' + color,
            striped && 'progress_striped',
            animated && 'progress_animated'
          )}
          style={indeterminate ? undefined : { width: clamped + '%' }}
        >
          {inside && showInfo && <span className="progress_info">{infoText}</span>}
        </div>
      </div>
      {!inside && showInfo && <span className="progress_info">{infoText}</span>}
    </div>
  )
}

export default Progress
