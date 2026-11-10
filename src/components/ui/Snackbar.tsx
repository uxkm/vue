'use client'

/**
 * 스낵바(짧은 토스트형 알림).
 * 하단에 잠깐 뜨는 메시지. 색·아이콘·닫기 지원.
 */

import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { Icon, type IconName } from './Icon'

/** 스낵바 색 */
export type SnackbarColor = 'info' | 'success' | 'warning' | 'error' | 'danger'

/** 색 이름 → Icon name */
const ICON_NAME: Record<string, IconName> = {
  info: 'info',
  success: 'check-circle',
  warning: 'warning',
  error: 'x-circle'
}

/** 짧은 알림이 받는 값 */
export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  color?: SnackbarColor
  message?: ReactNode
  round?: boolean
  showIcon?: boolean
  icon?: ReactNode
  closable?: boolean
  /** 넘기면 표시 상태를 페이지가 제어한다 */
  open?: boolean
  /** 비제어 초기 표시. 기본 true */
  defaultOpen?: boolean
  /** 표시 상태가 바뀔 때 호출 */
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
}

/**
 * 잠깐 보여 주는 알림 막대.
 * color 종류, message 문구. open · onOpenChange 로 페이지에서 표시를 제어한다.
 */
export function Snackbar ({
  color = 'info',
  message,
  round = false,
  showIcon = true,
  icon,
  closable = false,
  open,
  defaultOpen = true,
  className,
  children,
  onOpenChange,
  onClose,
  ...rest
}: SnackbarProps) {
  const controlled = open !== undefined
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const visible = controlled ? open : innerOpen

  const setVisible = (next: boolean) => {
    if (!controlled) setInnerOpen(next)
    onOpenChange?.(next)
    if (!next) onClose?.()
  }

  if (!visible) return null
  const resolved = color === 'danger' ? 'error' : color
  const defaultIconName = ICON_NAME[resolved] || 'info'

  return (
    <div
      {...rest}
      className={cx('snackbar', 'color_' + resolved, round && 'snackbar_round', className)}
      role={resolved === 'error' ? 'alert' : 'status'}
    >
      {showIcon && (
        <span className="snackbar_icon" aria-hidden="true">
          {hasNodes(icon)
            ? icon
            : <Icon name={defaultIconName} size="100%" />}
        </span>
      )}
      <span className="snackbar_message">{hasNodes(children) ? children : message}</span>
      {closable && (
        <button
          type="button"
          className="snackbar_close"
          aria-label="닫기"
          onClick={() => setVisible(false)}
        >
          <Icon name="close" size="0.75em" />
        </button>
      )}
    </div>
  )
}

export default Snackbar
