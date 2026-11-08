/**
 * 로딩 스피너.
 * spinning 중 회전 표시. tip · 크기 · 색 · 인라인 · 래퍼 오버레이 지원.
 */
import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 로딩 표시가 받는 값 */
export interface SpinProps extends HTMLAttributes<HTMLDivElement> {
  spinning?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'danger' | ''
  tip?: ReactNode
  inline?: boolean
  /** 단독: spin_block / 자식 래퍼: spin_wrap-block */
  block?: boolean
  /** 자식 래퍼 로딩 시 본문 블러(spin_wrap-blur) */
  blur?: boolean
  ariaLabel?: string
}

/**
 * 불러오는 중 표시.
 * 자식이 있으면 spin_wrap + overlay, 없으면 인디케이터만 렌더링한다.
 */
export function Spin ({
  spinning = true,
  size = 'md',
  color = 'primary',
  tip,
  inline = false,
  block = false,
  blur = false,
  ariaLabel = '',
  className,
  children,
  ...rest
}: SpinProps) {
  const hasChild = hasNodes(children)
  const showTip = spinning && hasNodes(tip)
  const label = ariaLabel || (typeof tip === 'string' ? tip : '') || '로딩 중'

  const indicator = (
    <div
      {...(hasChild ? {} : rest)}
      className={cx(
        'spin',
        hasChild && 'spin_overlay',
        color && 'color_' + color,
        size === 'sm' && 'spin_sm',
        size === 'lg' && 'spin_lg',
        inline && !hasChild && 'spin_inline',
        block && !hasChild && 'spin_block',
        !hasChild && className
      )}
      role="status"
      aria-live="polite"
      aria-busy={spinning || undefined}
      aria-label={label}
    >
      {spinning && <span className="spin_indicator" aria-hidden="true" />}
      {showTip && <span className="spin_tip">{tip}</span>}
    </div>
  )

  if (!hasChild) return indicator

  return (
    <div
      {...rest}
      className={cx(
        'spin_wrap',
        block && 'spin_wrap-block',
        blur && 'spin_wrap-blur',
        spinning && 'is-loading',
        className
      )}
    >
      <div className="spin_wrap-body">{children}</div>
      {spinning && indicator}
    </div>
  )
}

export default Spin
