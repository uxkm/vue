'use client'

/**
 * 단계 표시.
 * current 기준으로 진행 단계(title·desc)를 나열한다.
 */

import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { Icon } from './Icon'

/** 단계 상태 */
export type StepStatus = 'wait' | 'process' | 'finish' | 'error'

/** 단계 한 칸 */
export interface StepItem {
  key?: string
  title: ReactNode
  desc?: ReactNode
  icon?: ReactNode
  /** 개별 상태. 없으면 current 기준으로 계산 */
  status?: StepStatus
  disabled?: boolean
}

/** 단계 표시가 받는 값. current 는 0부터 */
export interface StepsProps extends Omit<HTMLAttributes<HTMLOListElement>, 'onChange'> {
  items: StepItem[]
  current?: number
  /** 비제어 초기 단계 */
  defaultCurrent?: number
  direction?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  /** 숫자 대신 작은 점 */
  dot?: boolean
  align?: 'start' | 'center'
  /** 끝난/대기 단계 클릭으로 current 변경 */
  navigable?: boolean
  label?: string
  onChange?: (index: number) => void
}

function resolveStatus (index: number, current: number, override?: StepStatus): StepStatus {
  if (override) return override
  if (index < current) return 'finish'
  if (index === current) return 'process'
  return 'wait'
}

function statusClass (status: StepStatus) {
  if (status === 'finish') return 'is-finished'
  if (status === 'process') return 'is-active'
  if (status === 'error') return 'is-error'
  return 'is-wait'
}

/**
 * 진행 단계.
 * current 보다 앞은 끝난 단계, current 는 지금 단계.
 */
export function Steps ({
  items,
  current: currentProp,
  defaultCurrent = 0,
  direction = 'horizontal',
  size = 'md',
  dot = false,
  align = 'start',
  navigable = false,
  label = '진행 단계',
  className,
  onChange,
  ...rest
}: StepsProps) {
  const controlled = currentProp !== undefined
  const [innerCurrent, setInnerCurrent] = useState(defaultCurrent)
  const current = controlled ? currentProp : innerCurrent
  const hasIconItem = items.some((item) => hasNodes(item.icon))

  const go = (index: number) => {
    if (!controlled) setInnerCurrent(index)
    onChange?.(index)
  }

  return (
    <ol
      {...rest}
      className={cx(
        'steps',
        direction === 'vertical' && 'steps_vertical',
        size === 'sm' && 'steps_sm',
        size === 'lg' && 'steps_lg',
        dot && 'steps_dot',
        align === 'center' && 'steps_align-center',
        navigable && 'steps_navigable',
        hasIconItem && 'steps_icon-style',
        className
      )}
      aria-label={label}
    >
      {items.map((item, index) => {
        const status = resolveStatus(index, current, item.status)
        const state = statusClass(status)
        const isCurrent = status === 'process'
        const canNavigate =
          navigable &&
          !item.disabled &&
          status !== 'wait'

        const indicatorInner = (() => {
          if (dot) return null
          if (hasNodes(item.icon)) {
            return <span className="steps_icon">{item.icon}</span>
          }
          if (status === 'finish') {
            return (
              <Icon name="check" size="100%" className="steps_icon" aria-hidden />
            )
          }
          if (status === 'error') {
            return (
              <Icon name="close" size="100%" className="steps_icon" aria-hidden />
            )
          }
          return <span className="steps_index">{index + 1}</span>
        })()

        const body = (
          <>
            <div className="steps_head">
              <span className="steps_indicator" aria-hidden="true">
                {indicatorInner}
              </span>
              {index < items.length - 1 && (
                <span className="steps_tail" aria-hidden="true" />
              )}
            </div>
            <div className="steps_content">
              <p className="steps_title">{item.title}</p>
              {hasNodes(item.desc) && <p className="steps_desc">{item.desc}</p>}
            </div>
          </>
        )

        return (
          <li
            className={cx('steps_item', state)}
            key={item.key || index}
            aria-current={isCurrent ? 'step' : undefined}
          >
            {navigable
              ? (
                <button
                  type="button"
                  className={cx('steps_trigger', item.disabled && 'is-disabled')}
                  disabled={!canNavigate}
                  onClick={() => {
                    if (canNavigate) go(index)
                  }}
                >
                  {body}
                </button>
                )
              : body}
          </li>
        )
      })}
    </ol>
  )
}

export default Steps
