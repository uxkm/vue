/**
 * 타임라인.
 * Timeline · TimelineItem으로 시간순 이벤트를 세로·가로·교차로 배치한다.
 */
import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'

const VALID_TAGS = new Set(['ol', 'ul'])

/** Timeline 루트 props */
export interface TimelineProps extends HTMLAttributes<HTMLElement> {
  card?: boolean
  alternate?: boolean
  horizontal?: boolean
  labelCol?: boolean
  icon?: boolean
  iconSize?: 'sm' | 'md'
  size?: 'sm' | 'md' | 'lg'
  tag?: 'ol' | 'ul'
  children?: ReactNode
}

/**
 * 시간 순서 목록 루트.
 * card · alternate · horizontal · labelCol · icon 변형을 조합한다.
 */
export function Timeline ({
  children,
  card = false,
  alternate = false,
  horizontal = false,
  labelCol = false,
  icon = false,
  iconSize = 'md',
  size = 'md',
  tag = 'ol',
  className,
  ...rest
}: TimelineProps) {
  const Root = (VALID_TAGS.has(tag) ? tag : 'ol') as 'ol' | 'ul'
  const classes = cx(
    'timeline',
    card && 'timeline_card',
    alternate && 'timeline_alternate',
    horizontal && 'timeline_horizontal',
    labelCol && 'timeline_label-col',
    icon && 'timeline_icon',
    icon && iconSize === 'sm' && 'timeline_icon-sm',
    size === 'sm' && 'timeline_sm',
    size === 'lg' && 'timeline_lg',
    className
  )

  return (
    <Root {...(rest as HTMLAttributes<HTMLElement>)} className={classes}>
      {children}
    </Root>
  )
}

/** TimelineItem props */
export interface TimelineItemProps extends Omit<LiHTMLAttributes<HTMLLIElement>, 'title' | 'color'> {
  color?: string
  title?: ReactNode
  description?: ReactNode
  time?: ReactNode
  datetime?: string
  label?: ReactNode
  labelDatetime?: string
  active?: boolean
  pending?: boolean
  outline?: boolean
  dot?: ReactNode
  meta?: ReactNode
  children?: ReactNode
}

/**
 * 타임라인 한 시점.
 * title · description · time · label · meta와 도트 상태를 표시한다.
 */
export function TimelineItem ({
  color = 'primary',
  title,
  description,
  time,
  datetime,
  label,
  labelDatetime,
  active = false,
  pending = false,
  outline = false,
  dot,
  meta,
  children,
  className,
  ...rest
}: TimelineItemProps) {
  const itemClasses = cx('timeline_item', active && 'is-active', pending && 'is-pending', className)
  const dotClasses = cx('timeline_dot', outline && 'timeline_dot-outline', color && `color_${color}`)

  return (
    <li {...rest} className={itemClasses}>
      {label
        ? (
          <time className="timeline_label" dateTime={labelDatetime}>
            {label}
          </time>
          )
        : null}
      {dot
        ? (
          <span className="timeline_dot" aria-hidden="true">
            {dot}
          </span>
          )
        : (
          <span className={dotClasses} aria-hidden="true" />
          )}
      <div className="timeline_content">
        {children ?? (
          <>
            {time
              ? (
                <time className="timeline_time" dateTime={datetime}>
                  {time}
                </time>
                )
              : null}
            {title ? <p className="timeline_title">{title}</p> : null}
            {description ? <p className="timeline_desc">{description}</p> : null}
          </>
        )}
        {meta ? <div className="timeline_meta">{meta}</div> : null}
      </div>
    </li>
  )
}

export default Timeline
