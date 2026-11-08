/**
 * 툴팁.
 * 대상 위·아래·좌·우에 짧은 도움말을 띄운다. 말풍선 화살표·방향을 지원한다.
 */
import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'

/** 툴팁 방향 */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

/** 툴팁이 받는 값 */
export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content' | 'style'> {
  content: ReactNode
  placement?: TooltipPlacement
  trigger?: ReactNode
  /** true 이면 tooltip_arrow 를 표시한다. 기본 true. false 이면 tooltip_no-arrow */
  arrow?: boolean
  /**
   * 화살표 위치(가장자리 기준 %). 넘기면 tooltip_arrow-anchor-mixed 와
   * --tooltip-arrow-position 이 적용된다. 예: '25%' · 50
   */
  arrowPosition?: string | number
  style?: CSSProperties
}

/**
 * 대상 위에 잠깐 뜨는 도움말.
 * content 문구, placement 방향, arrow 화살표. 포인터를 올리면 보인다.
 */
export function Tooltip ({
  content,
  placement = 'bottom',
  trigger,
  arrow = true,
  arrowPosition,
  className,
  style,
  children,
  ...rest
}: TooltipProps) {
  const [open, setOpen] = useState(false)
  const arrowPos = arrowPosition == null || arrowPosition === ''
    ? null
    : (typeof arrowPosition === 'number' ? `${arrowPosition}%` : String(arrowPosition))

  return (
    <span
      {...rest}
      className={cx(
        'tooltip',
        open && 'is-open',
        placement !== 'bottom' && 'tooltip_placement-' + placement,
        !arrow && 'tooltip_no-arrow',
        arrowPos && 'tooltip_arrow-anchor-mixed',
        className
      )}
      style={{
        ...style,
        ...(arrowPos ? { ['--tooltip-arrow-position' as string]: arrowPos } : null)
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span className="tooltip_trigger">{trigger ?? children}</span>
      <span className="tooltip_bubble" role="tooltip">
        {arrow && <span className="tooltip_arrow" aria-hidden="true" />}
        {content}
      </span>
    </span>
  )
}

export default Tooltip
