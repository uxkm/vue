'use client'

/**
 * 툴팁.
 * 대상 위·아래·좌·우에 짧은 도움말을 띄운다. 말풍선 화살표·방향을 지원한다.
 */

import {
  useState,
  type CSSProperties,
  type FocusEvent,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode
} from 'react'
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
  /** 넘기면 열림 상태를 페이지가 제어한다 */
  open?: boolean
  /** 비제어 초기 열림 */
  defaultOpen?: boolean
  /** 열림 상태가 바뀔 때 호출 */
  onOpenChange?: (open: boolean) => void
  style?: CSSProperties
}

/**
 * 대상 위에 잠깐 뜨는 도움말.
 * content 문구, placement 방향, arrow 화살표.
 * open · onOpenChange 로 페이지에서 표시를 제어한다.
 */
export function Tooltip ({
  content,
  placement = 'bottom',
  trigger,
  arrow = true,
  arrowPosition,
  open,
  defaultOpen = false,
  className,
  style,
  children,
  onOpenChange,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: TooltipProps) {
  const controlled = open !== undefined
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const shown = controlled ? open : innerOpen

  const setShown = (next: boolean) => {
    if (!controlled) setInnerOpen(next)
    onOpenChange?.(next)
  }

  /** hover · focus 중 하나라도 있으면 열림 유지 */
  const syncPointerOpen = (nextHovered: boolean, nextFocused: boolean) => {
    setHovered(nextHovered)
    setFocused(nextFocused)
    setShown(nextHovered || nextFocused)
  }

  const arrowPos = arrowPosition == null || arrowPosition === ''
    ? null
    : (typeof arrowPosition === 'number' ? `${arrowPosition}%` : String(arrowPosition))

  return (
    <span
      {...rest}
      className={cx(
        'tooltip',
        shown && 'is-open',
        placement !== 'bottom' && 'tooltip_placement-' + placement,
        !arrow && 'tooltip_no-arrow',
        arrowPos && 'tooltip_arrow-anchor-mixed',
        className
      )}
      style={{
        ...style,
        ...(arrowPos ? { ['--tooltip-arrow-position' as string]: arrowPos } : null)
      }}
      onMouseEnter={(event: MouseEvent<HTMLSpanElement>) => {
        syncPointerOpen(true, focused)
        onMouseEnter?.(event)
      }}
      onMouseLeave={(event: MouseEvent<HTMLSpanElement>) => {
        syncPointerOpen(false, focused)
        onMouseLeave?.(event)
      }}
      onFocus={(event: FocusEvent<HTMLSpanElement>) => {
        syncPointerOpen(hovered, true)
        onFocus?.(event)
      }}
      onBlur={(event: FocusEvent<HTMLSpanElement>) => {
        syncPointerOpen(hovered, false)
        onBlur?.(event)
      }}
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
