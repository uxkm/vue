'use client'

import { useEscapeKey } from '@/hooks/useEscapeKey'

/**
 * 날짜 선택.
 * 트리거 입력과 달력 패널로 YYYY-MM-DD 값을 고른다.
 */
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const pad = (value: number) => String(value).padStart(2, '0')
const toValue = (date: Date | null) =>
  date ? `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` : ''
const parseValue = (value?: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value || '') ? new Date(`${value}T00:00:00`) : null
const formatValue = (value: string, locale: string) => {
  const date = parseValue(value)
  return date
    ? new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date)
    : ''
}

function getCells (month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const start = new Date(month.getFullYear(), month.getMonth(), 1 - first.getDay())
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return { date, value: toValue(date), other: date.getMonth() !== month.getMonth() }
  })
}

/** 날짜 선택이 받는 값 */
export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange' | 'type'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** 패널 열림(제어) */
  open?: boolean
  /** 비제어 초기 열림 */
  defaultOpen?: boolean
  /** 패널 열림이 바뀔 때 호출 */
  onOpenChange?: (open: boolean) => void
  /** 표시 중인 월(제어). Date 또는 YYYY-MM-DD */
  displayMonth?: Date | string
  /** 비제어 초기 표시 월 */
  defaultDisplayMonth?: Date | string
  /** 표시 월이 바뀔 때 호출 */
  onDisplayMonthChange?: (month: Date) => void
  placeholder?: string
  locale?: string
  size?: 'sm' | 'md' | 'lg'
  fit?: boolean
  block?: boolean
  disabled?: boolean
  error?: boolean
  success?: boolean
  clearable?: boolean
  min?: string
  max?: string
  name?: string
  required?: boolean
  panelAlign?: 'start' | 'end'
  ariaLabel?: string
  children?: ReactNode
}

/**
 * 날짜 입력.
 * value는 YYYY-MM-DD. clearable · min · max · 검증 상태를 지원한다.
 */
function toMonthDate (value?: Date | string | null) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return new Date(value.getFullYear(), value.getMonth(), 1)
  }
  if (typeof value === 'string') {
    const parsed = parseValue(value)
    if (parsed) return new Date(parsed.getFullYear(), parsed.getMonth(), 1)
  }
  return null
}

export function DatePicker ({
  id,
  value,
  defaultValue = '',
  onChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  displayMonth,
  defaultDisplayMonth,
  onDisplayMonthChange,
  placeholder = '날짜를 선택하세요',
  locale = 'ko-KR',
  size = 'md',
  fit = false,
  block = false,
  disabled = false,
  error = false,
  success = false,
  clearable = true,
  min,
  max,
  name,
  required,
  className,
  panelAlign = 'start',
  ariaLabel = '날짜 선택',
  onClick,
  ...props
}: DatePickerProps) {
  const generatedId = useId().replace(/:/g, '')
  const inputId = id || `date-picker-${generatedId}`
  const panelId = `${inputId}-panel`
  const controlled = value !== undefined
  const [innerValue, setInnerValue] = useState(defaultValue)
  const selectedValue = controlled ? value : innerValue
  const openControlled = openProp !== undefined
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const open = openControlled ? openProp : innerOpen
  const monthControlled = displayMonth !== undefined
  const [innerMonth, setInnerMonth] = useState(
    () =>
      toMonthDate(defaultDisplayMonth) ||
      toMonthDate(displayMonth) ||
      toMonthDate(selectedValue) ||
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )
  const month = monthControlled
    ? (toMonthDate(displayMonth) || innerMonth)
    : innerMonth
  const rootRef = useRef<HTMLDivElement>(null)
  const cells = useMemo(() => getCells(month), [month])
  const today = toValue(new Date())

  const setOpen = (next: boolean) => {
    if (!openControlled) setInnerOpen(next)
    onOpenChange?.(next)
  }

  const setMonth = (next: Date | ((current: Date) => Date)) => {
    const resolved = typeof next === 'function' ? next(month) : next
    const normalized = new Date(resolved.getFullYear(), resolved.getMonth(), 1)
    if (!monthControlled) setInnerMonth(normalized)
    onDisplayMonthChange?.(normalized)
  }

  const [previousValue, setPreviousValue] = useState(selectedValue)
  if (previousValue !== selectedValue) {
    setPreviousValue(selectedValue)
    const date = parseValue(selectedValue)
    if (!monthControlled && date) setInnerMonth(new Date(date.getFullYear(), date.getMonth(), 1))
  }

  useEffect(() => {
    if (!open) return
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        if (!openControlled) setInnerOpen(false)
        onOpenChange?.(false)
      }
    }
    document.addEventListener('click', close, true)
    return () => document.removeEventListener('click', close, true)
  }, [open, openControlled, onOpenChange])

  useEffect(() => {
    if (!open) return
    requestAnimationFrame(() =>
      rootRef.current
        ?.querySelector<HTMLElement>(
          '.calendar_day.is-selected:not(:disabled), .calendar_day:not(:disabled)'
        )
        ?.focus()
    )
  }, [open])

  const commit = (next: string) => {
    if (!controlled) setInnerValue(next)
    onChange?.(next)
  }

  const select = (next: string) => {
    commit(next)
    setOpen(false)
    requestAnimationFrame(() =>
      rootRef.current?.querySelector<HTMLElement>('.date_picker_input')?.focus()
    )
  }

  const moveMonth = (offset: number) =>
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1))

  useEscapeKey(rootRef, () => setOpen(false), open)

  const classes = cx(
    'date_picker',
    size !== 'md' && `date_picker_${size}`,
    fit && 'date_picker_fit',
    block && 'date_picker_block',
    disabled && 'is-disabled',
    error && 'is-error',
    success && 'is-success',
    open && 'is-open',
    className
  )

  return (
    <div
      ref={rootRef}
      role="group"
      className={classes}
    >
      <div className="date_picker_trigger">
        <input
          {...props}
          id={inputId}
          className="date_picker_input"
          role="combobox"
          value={formatValue(selectedValue, locale)}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          required={required}
          aria-label={props['aria-label'] || ariaLabel}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={panelId}
          aria-invalid={error || undefined}
          onClick={(event) => {
            if (!disabled) setOpen(true)
            onClick?.(event)
          }}
        />
        {name ? <input type="hidden" name={name} value={selectedValue} /> : null}
        {clearable && selectedValue && !disabled
          ? (
            <button
              className="date_picker_clear"
              type="button"
              aria-label="날짜 지우기"
              onClick={() => commit('')}
            >
              <svg
                className="icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
            )
          : null}
        <button
          className="date_picker_btn"
          type="button"
          disabled={disabled}
          aria-label="달력 열기"
          aria-controls={panelId}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg
            className="icon"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18" />
          </svg>
        </button>
      </div>
      <div
        id={panelId}
        className={cx('date_picker_panel', panelAlign === 'end' && 'date_picker_panel-end')}
        role="dialog"
        aria-modal="false"
        aria-label={ariaLabel}
        aria-hidden={!open}
      >
        <div className="calendar calendar_borderless">
          <div className="calendar_header">
            <button
              type="button"
              className="btn btn_ghost btn_icon-only btn_sm"
              aria-label="이전 달"
              onClick={() => moveMonth(-1)}
            >
              ‹
            </button>
            <span className="calendar_title" aria-live="polite">
              {month.getFullYear()}년 {month.getMonth() + 1}월
            </span>
            <button
              type="button"
              className="btn btn_ghost btn_icon-only btn_sm"
              aria-label="다음 달"
              onClick={() => moveMonth(1)}
            >
              ›
            </button>
          </div>
          <div className="calendar_weekdays" aria-hidden="true">
            {WEEKDAYS.map((day) => (
              <span key={day} className="calendar_weekday">
                {day}
              </span>
            ))}
          </div>
          <div className="calendar_grid">
            {cells.map((cell) => {
              const unavailable =
                Boolean(min && cell.value < min) || Boolean(max && cell.value > max)
              return (
                <button
                  key={cell.value}
                  type="button"
                  className={cx(
                    'calendar_day',
                    cell.other && 'is-other-month',
                    cell.value === today && 'is-today',
                    cell.value === selectedValue && 'is-selected'
                  )}
                  disabled={unavailable}
                  aria-current={cell.value === today ? 'date' : undefined}
                  aria-pressed={cell.value === selectedValue || undefined}
                  aria-label={formatValue(cell.value, locale)}
                  onClick={() => select(cell.value)}
                >
                  {cell.date.getDate()}
                </button>
              )
            })}
          </div>
          <div className="calendar_footer">
            <button
              type="button"
              className="btn btn_text color_primary btn_sm"
              onClick={() => select(today)}
            >
              오늘
            </button>
            {clearable
              ? (
                <div className="calendar_footer-actions">
                  <button
                    type="button"
                    className="btn btn_ghost btn_sm"
                    onClick={() => commit('')}
                  >
                    초기화
                  </button>
                </div>
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatePicker
