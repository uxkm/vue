'use client'

/**
 * 인라인 알림 배너.
 * info/success/warning/danger 색과 닫기 가능한 안내 메시지.
 */

import { useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { Icon, type IconName } from './Icon'

/** 알림 색. error 는 danger 와 같이 위험 */
export type AlertColor = 'info' | 'success' | 'warning' | 'danger' | 'error'

/** 색 이름 → 알림 클래스. danger 도 error 클래스를 쓴다 */
const COLOR_MAP: Record<string, string> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
  error: 'error'
}
/** 색 이름 → Icon name */
const ICON_NAME: Record<string, IconName> = {
  info: 'info',
  success: 'check-circle',
  warning: 'warning',
  error: 'x-circle'
}

/** 알림이 받는 값. title 과 본문, 닫기 */
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> {
  color?: AlertColor
  /** @deprecated use `color` */
  type?: string
  size?: 'sm' | 'md' | 'lg'
  role?: string
  title?: ReactNode
  description?: ReactNode
  closable?: boolean
  showIcon?: boolean
  banner?: boolean
  icon?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  /** 넘기면 표시 상태를 페이지가 제어한다 */
  open?: boolean
  /** 비제어 초기 표시. 기본 true */
  defaultOpen?: boolean
  /** 표시 상태가 바뀔 때 호출 */
  onOpenChange?: (open: boolean) => void
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
}

/**
 * 알림 박스.
 * color 종류(정보·성공·경고·위험), title 제목, open · onOpenChange 로 표시를 제어한다.
 */
export function Alert ({
  color,
  type = '',
  size = 'md',
  role = 'alert',
  title = '',
  description = '',
  closable = false,
  showIcon = true,
  banner = false,
  icon,
  actions,
  children,
  open,
  defaultOpen = true,
  className,
  onOpenChange,
  onClose,
  ...rest
}: AlertProps) {
  const controlled = open !== undefined
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const visible = controlled ? open : innerOpen

  const setVisible = (next: boolean, event?: MouseEvent<HTMLButtonElement>) => {
    if (!controlled) setInnerOpen(next)
    onOpenChange?.(next)
    if (!next && event) onClose?.(event)
  }

  if (!visible) return null

  const resolvedColor = COLOR_MAP[color || type || 'info'] || 'info'
  const defaultIconName = ICON_NAME[resolvedColor] || 'info'
  const hasDefault = hasNodes(description) || hasNodes(children)

  return (
    <div
      {...rest}
      className={cx(
        'alert',
        'color_' + resolvedColor,
        size === 'sm' && 'alert_sm',
        size === 'lg' && 'alert_lg',
        banner && 'alert_banner',
        className
      )}
      role={role}
    >
      {showIcon && (
        <span className="alert_icon" aria-hidden="true">
          {hasNodes(icon)
            ? icon
            : <Icon name={defaultIconName} size="100%" />}
        </span>
      )}
      <div className="alert_body">
        {hasNodes(title) && <div className="alert_title">{title}</div>}
        {hasDefault && (
          <div className="alert_desc">{hasNodes(children) ? children : description}</div>
        )}
        {hasNodes(actions) && <div className="alert_actions">{actions}</div>}
      </div>
      {closable && (
        <button
          type="button"
          className="alert_close"
          aria-label="닫기"
          onClick={(event) => setVisible(false, event)}
        >
          <Icon name="close" size="0.75em" />
        </button>
      )}
    </div>
  )
}

export default Alert
