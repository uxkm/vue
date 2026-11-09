/**
 * 통계 지표.
 * title · value · prefix/suffix · trend · description을 카드·크기로 조합한다.
 */
import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'

const TrendIcon = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="m6 15 6-6 6 6" />
  </svg>
)

/** 지표가 받는 값 */
export interface StatProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  title?: ReactNode
  value?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  description?: ReactNode
  trend?: ReactNode
  trendColor?: string
  trendIcon?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  card?: boolean
  shadow?: boolean
  children?: ReactNode
  /** @deprecated use `title` */
  label?: ReactNode
  /** @deprecated use `description` */
  desc?: ReactNode
  /** @deprecated use `className="stat_horizontal"` */
  horizontal?: boolean
}

/**
 * 숫자 지표 한 칸.
 * title 라벨, value 수치, trend 증감, card · shadow 스킨.
 */
export function Stat ({
  title,
  value,
  prefix,
  suffix,
  description,
  trend,
  trendColor,
  trendIcon,
  size = 'md',
  card = false,
  shadow = false,
  children,
  className,
  label,
  desc,
  horizontal = false,
  ...rest
}: StatProps) {
  const resolvedTitle = title ?? label
  const resolvedDescription = description ?? desc
  const resolvedSize = ['sm', 'md', 'lg'].includes(size) ? size : 'md'

  const classes = cx(
    'stat',
    resolvedSize !== 'md' && `stat_${resolvedSize}`,
    card && 'stat_card',
    shadow && 'stat_shadow',
    horizontal && 'stat_horizontal',
    className
  )

  const trendClasses = cx('stat_trend', trendColor && `color_${trendColor}`)
  const descriptionClasses = cx(
    'stat_desc',
    resolvedDescription && trendColor && `color_${trendColor}`
  )

  const showHeader = Boolean(resolvedTitle && trend)
  const hasValue = value != null && value !== ''

  const valueNode =
    prefix || suffix
      ? (
        <div className="stat_value-row">
          {prefix ? <span className="stat_prefix">{prefix}</span> : null}
          {hasValue ? <span className="stat_value">{value}</span> : null}
          {suffix ? <span className="stat_suffix">{suffix}</span> : null}
        </div>
        )
      : hasValue
        ? (
          <span className="stat_value">{value}</span>
          )
        : null

  const trendNode = (
    <>
      {trendIcon ?? <TrendIcon />}
      {trend}
    </>
  )

  return (
    <div {...rest} className={classes}>
      {showHeader
        ? (
          <div className="stat_header">
            <span className="stat_label">{resolvedTitle}</span>
            <span className={trendClasses}>{trendNode}</span>
          </div>
          )
        : resolvedTitle
          ? (
            <span className="stat_label">{resolvedTitle}</span>
            )
          : null}
      {valueNode}
      {resolvedDescription
        ? (
          <span className={descriptionClasses}>{resolvedDescription}</span>
          )
        : trend && !showHeader
          ? (
            <span className={trendClasses}>{trendNode}</span>
            )
          : null}
      {children}
    </div>
  )
}

export default Stat
