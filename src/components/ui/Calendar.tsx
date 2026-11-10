'use client'

/**
 * 달력.
 * Calendar · Month · Header · Weekdays · Wheel 등으로 월·주·일정·휠을 조합한다.
 */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

/** 날짜 셀 데이터 */
export interface CalendarDayData {
  day: number
  otherMonth?: boolean
  today?: boolean
  selected?: boolean
  disabled?: boolean
  sunday?: boolean
  saturday?: boolean
  rangeStart?: boolean
  rangeEnd?: boolean
  inRange?: boolean
  event?: boolean
}

function monthDays ({
  partial,
  selected = 15,
  today = 12,
  events = [],
  rangeStart,
  rangeEnd
}: {
  partial?: number
  selected?: number | null
  today?: number
  events?: number[]
  rangeStart?: number
  rangeEnd?: number
} = {}): CalendarDayData[] {
  const cells: CalendarDayData[] = []
  if (!partial) [26, 27, 28, 29, 30, 31].forEach((day) => cells.push({ day, otherMonth: true }))
  const count = partial || 30
  for (let day = 1; day <= count; day += 1) {
    cells.push({
      day,
      today: day === today,
      selected: day === selected || day === rangeStart || day === rangeEnd,
      rangeStart: day === rangeStart,
      rangeEnd: day === rangeEnd,
      inRange: rangeStart != null && rangeEnd != null && day > rangeStart && day < rangeEnd,
      event: events.includes(day)
    })
  }
  if (!partial) [1, 2, 3, 4, 5, 6].forEach((day) => cells.push({ day, otherMonth: true }))
  return cells
}

/** Calendar 루트 props */
export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  ariaLabel?: string
  header?: ReactNode
  weekdays?: ReactNode
  footer?: ReactNode
  children?: ReactNode
  noHeader?: boolean
  minimal?: boolean
  compact?: boolean
  borderless?: boolean
  shadow?: boolean
  ghost?: boolean
  week?: boolean
  readonly?: boolean
  disabled?: boolean
  weekends?: boolean
  agenda?: boolean
  wheel?: boolean
  size?: '' | 'sm' | 'lg'
}

/**
 * 달력 루트.
 * 스킨·레이아웃 플래그와 header · weekdays · children · footer를 조합한다.
 */
export function Calendar ({
  title,
  ariaLabel,
  header,
  weekdays,
  footer,
  children,
  noHeader = false,
  minimal = false,
  compact = false,
  borderless = false,
  shadow = false,
  ghost = false,
  week = false,
  readonly = false,
  disabled = false,
  weekends = false,
  agenda = false,
  wheel = false,
  size = '',
  className,
  role = 'application',
  ...rest
}: CalendarProps) {
  const classes = cx(
    'calendar',
    noHeader && 'calendar_no-header',
    minimal && 'calendar_minimal',
    compact && 'calendar_compact',
    borderless && 'calendar_borderless',
    shadow && 'calendar_shadow',
    ghost && 'calendar_ghost',
    week && 'calendar_week',
    readonly && 'calendar_readonly',
    disabled && 'is-disabled',
    weekends && 'calendar_weekends',
    agenda && 'calendar_agenda',
    wheel && 'calendar_wheel',
    size === 'sm' && 'calendar_sm',
    size === 'lg' && 'calendar_lg',
    className
  )
  const resolvedRole = role === 'feed' ? 'region' : role

  return (
    <div
      className={classes}
      role={resolvedRole}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {header ??
        (title && !noHeader && !minimal
          ? (
            <CalendarHeader title={title} showNav={false} />
            )
          : null)}
      {weekdays}
      {children}
      {footer}
    </div>
  )
}

export interface CalendarHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  prevLabel?: string
  nextLabel?: string
  showNav?: boolean
  showPrev?: boolean
  showNext?: boolean
  /** 이전 달 클릭. 페이지에서 월을 제어한다 */
  onPrev?: () => void
  /** 다음 달 클릭. 페이지에서 월을 제어한다 */
  onNext?: () => void
  children?: ReactNode
}

/** 월 헤더와 이전·다음 탐색 */
export function CalendarHeader ({
  title,
  prevLabel = '이전 달',
  nextLabel = '다음 달',
  showNav = true,
  showPrev,
  showNext,
  onPrev,
  onNext,
  children,
  className,
  ...rest
}: CalendarHeaderProps) {
  const prev = showPrev ?? showNav
  const next = showNext ?? showNav
  return (
    <div className={cx('calendar_header', className)} {...rest}>
      {prev
        ? (
          <button
            type="button"
            className="btn btn_ghost btn_icon-only btn_sm"
            aria-label={prevLabel}
            onClick={onPrev}
          >
            ‹
          </button>
          )
        : null}
      <span className="calendar_title">{title}</span>
      {next
        ? (
          <button
            type="button"
            className="btn btn_ghost btn_icon-only btn_sm"
            aria-label={nextLabel}
            onClick={onNext}
          >
            ›
          </button>
          )
        : null}
      {children}
    </div>
  )
}

export interface CalendarNavProps {
  label?: ReactNode
  prevLabel?: string
  nextLabel?: string
  className?: string
  /** 이전 주 클릭 */
  onPrev?: () => void
  /** 다음 주 클릭 */
  onNext?: () => void
}

/** 주간 탐색 바 */
export function CalendarNav ({
  label,
  prevLabel = '이전 주',
  nextLabel = '다음 주',
  className,
  onPrev,
  onNext
}: CalendarNavProps) {
  return (
    <div className={cx('calendar_nav', className)}>
      <button
        type="button"
        className="btn btn_ghost btn_icon-only btn_sm"
        aria-label={prevLabel}
        onClick={onPrev}
      >
        ‹
      </button>
      <span className="calendar_nav-label">{label}</span>
      <button
        type="button"
        className="btn btn_ghost btn_icon-only btn_sm"
        aria-label={nextLabel}
        onClick={onNext}
      >
        ›
      </button>
    </div>
  )
}

export interface CalendarWeekdaysProps {
  labels?: string[]
  className?: string
}

/** 요일 행 */
export function CalendarWeekdays ({
  labels = WEEKDAYS,
  className
}: CalendarWeekdaysProps) {
  return (
    <div className={cx('calendar_weekdays', className)} aria-hidden="true">
      {labels.map((label) => (
        <span key={label} className="calendar_weekday">
          {label}
        </span>
      ))}
    </div>
  )
}

export interface CalendarDayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  day?: ReactNode
  otherMonth?: boolean
  today?: boolean
  selected?: boolean
  disabled?: boolean
  sunday?: boolean
  saturday?: boolean
  rangeStart?: boolean
  rangeEnd?: boolean
  inRange?: boolean
  event?: boolean
  readonly?: boolean
}

/** 날짜 한 칸 */
export function CalendarDay ({
  day,
  otherMonth,
  today,
  selected,
  disabled,
  sunday,
  saturday,
  rangeStart,
  rangeEnd,
  inRange,
  event,
  readonly,
  className,
  ...rest
}: CalendarDayProps) {
  const classes = cx(
    'calendar_day',
    otherMonth && 'is-other-month',
    today && 'is-today',
    selected && 'is-selected',
    disabled && 'is-disabled',
    sunday && 'is-sunday',
    saturday && 'is-saturday',
    rangeStart && 'is-range-start',
    rangeEnd && 'is-range-end',
    inRange && 'is-in-range',
    event && 'has-event',
    className
  )
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || (otherMonth && !(selected || inRange)) || undefined}
      aria-current={today ? 'date' : undefined}
      aria-pressed={selected || undefined}
      tabIndex={readonly ? -1 : undefined}
      {...rest}
    >
      {day}
    </button>
  )
}

export interface CalendarGridProps extends HTMLAttributes<HTMLDivElement> {
  week?: boolean
  children?: ReactNode
}

/** 날짜 그리드 래퍼 */
export function CalendarGrid ({
  children,
  week = false,
  className,
  ...rest
}: CalendarGridProps) {
  return (
    <div className={cx('calendar_grid', week && 'calendar_grid-week', className)} {...rest}>
      {children}
    </div>
  )
}

export interface CalendarMonthProps {
  days?: CalendarDayData[]
  /** 선택일. null 이면 미선택. 넘기면 제어 */
  selected?: number | null
  /** 비제어 초기 선택일. days 없을 때 기본 15 */
  defaultSelected?: number | null
  today?: number
  disabled?: number[]
  events?: number[]
  rangeStart?: number
  rangeEnd?: number
  weekends?: boolean
  partial?: number
  week?: boolean
  readonly?: boolean
  /**
   * 날짜 셀 클릭. 페이지에서 선택일을 제어한다.
   * otherMonth · disabled 셀은 호출되지 않는다.
   */
  onSelect?: (day: CalendarDayData, index: number) => void
}

/** 월(또는 주) 날짜 셀 그리드 */
export function CalendarMonth ({
  days,
  selected: selectedProp,
  defaultSelected,
  today = 12,
  disabled = [],
  events = [],
  rangeStart,
  rangeEnd,
  weekends = false,
  partial,
  week = false,
  readonly = false,
  onSelect
}: CalendarMonthProps) {
  const selectedControlled = selectedProp !== undefined
  const [innerSelected, setInnerSelected] = useState<number | null>(() => {
    if (defaultSelected !== undefined) return defaultSelected
    // days 를 직접 주면 셀 플래그를 쓰고, 아니면 데모용 15
    return days !== undefined ? null : 15
  })
  const selected = selectedControlled ? selectedProp : innerSelected

  // days !== undefined 이면 빈 배열도 유지. selected 를 넘기거나 비제어 선택이 있으면 덮어쓴다.
  const resolved = useMemo(() => {
    const applySelected = (cells: CalendarDayData[]) => {
      if (selectedControlled) {
        return cells.map((cell) => ({
          ...cell,
          selected:
            cell.day === selectedProp ||
            cell.day === rangeStart ||
            cell.day === rangeEnd
        }))
      }
      if (selected == null && defaultSelected === undefined && days !== undefined) {
        return cells
      }
      return cells.map((cell) => ({
        ...cell,
        selected:
          cell.day === selected ||
          cell.day === rangeStart ||
          cell.day === rangeEnd
      }))
    }

    if (days !== undefined) return applySelected(days)
    return monthDays({
      partial,
      selected: selected !== undefined ? selected : 15,
      today,
      events,
      rangeStart,
      rangeEnd
    })
  }, [
    days,
    partial,
    selected,
    selectedProp,
    selectedControlled,
    defaultSelected,
    today,
    events,
    rangeStart,
    rangeEnd
  ])

  return (
    <CalendarGrid week={week}>
      {resolved.map((cell, index) => {
        const isDisabled = cell.disabled || disabled.includes(cell.day)
        return (
          <CalendarDay
            key={`${cell.day}-${index}`}
            {...cell}
            disabled={isDisabled}
            sunday={cell.sunday ?? (weekends && index % 7 === 0)}
            saturday={cell.saturday ?? (weekends && index % 7 === 6)}
            readonly={readonly}
            onClick={
              readonly || isDisabled
                ? undefined
                : () => {
                    if (cell.otherMonth && !(cell.selected || cell.inRange)) return
                    if (!selectedControlled) setInnerSelected(cell.day)
                    onSelect?.(cell, index)
                  }
            }
          />
        )
      })}
    </CalendarGrid>
  )
}

export interface CalendarFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  todayLabel?: string
  clearLabel?: string
  confirmLabel?: string
  showDefaults?: boolean
  /** 오늘 클릭 */
  onToday?: () => void
  /** 초기화 클릭 */
  onClear?: () => void
  /** 확인 클릭 */
  onConfirm?: () => void
}

/** 하단 액션 영역 */
export function CalendarFooter ({
  children,
  className,
  todayLabel = '오늘',
  clearLabel = '초기화',
  confirmLabel = '확인',
  showDefaults = true,
  onToday,
  onClear,
  onConfirm,
  ...rest
}: CalendarFooterProps) {
  return (
    <div className={cx('calendar_footer', className)} {...rest}>
      <button
        type="button"
        className="btn btn_text color_primary btn_sm"
        onClick={onToday}
      >
        {todayLabel}
      </button>
      <div className="calendar_footer-actions">
        {children ?? (showDefaults
          ? (
            <>
              <button
                type="button"
                className="btn btn_ghost btn_sm"
                onClick={onClear}
              >
                {clearLabel}
              </button>
              <button
                type="button"
                className="btn btn_filled color_primary btn_sm"
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </>
            )
          : null)}
      </div>
    </div>
  )
}

export interface CalendarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

/** 다중 패널 그룹 */
export function CalendarGroup ({
  children,
  className,
  ...rest
}: CalendarGroupProps) {
  return (
    <div className={cx('calendar_group', className)} {...rest}>
      {children}
    </div>
  )
}

export interface CalendarWheelProps {
  title?: ReactNode
  shadow?: boolean
  borderless?: boolean
  footer?: boolean
  toolbar?: boolean
  cancelLabel?: string
  confirmLabel?: string
  ariaLabel?: string
  toolbarContent?: ReactNode
  footerContent?: ReactNode
  children?: ReactNode
  /** 취소 클릭 */
  onCancel?: () => void
  /** 완료/확인 클릭 */
  onConfirm?: () => void
}

/** iOS 스타일 휠 선택기 */
export function CalendarWheel ({
  title,
  shadow,
  borderless,
  footer = false,
  toolbar = true,
  cancelLabel,
  confirmLabel,
  ariaLabel,
  toolbarContent,
  footerContent,
  children,
  onCancel,
  onConfirm
}: CalendarWheelProps) {
  const showToolbar = toolbar && (toolbarContent || title || cancelLabel || confirmLabel)
  return (
    <Calendar wheel shadow={shadow} borderless={borderless} role="group" ariaLabel={ariaLabel}>
      {showToolbar
        ? (
          <div className="calendar_wheel-toolbar">
            {toolbarContent ?? (
              <>
                {cancelLabel
                  ? (
                    <button
                      className="btn btn_text btn_sm"
                      type="button"
                      onClick={onCancel}
                    >
                      {cancelLabel}
                    </button>
                    )
                  : null}
                <span className="calendar_wheel-title">{title}</span>
                {confirmLabel
                  ? (
                    <button
                      className="btn btn_text color_primary btn_sm"
                      type="button"
                      onClick={onConfirm}
                    >
                      {confirmLabel}
                    </button>
                    )
                  : null}
              </>
            )}
          </div>
          )
        : null}
      <div className="calendar_wheel-body">
        <div className="calendar_wheel-highlight" aria-hidden="true" />
        <div className="calendar_wheel-columns">{children}</div>
        <div className="calendar_wheel-fade" aria-hidden="true" />
      </div>
      {footer || footerContent
        ? (
          <div className="calendar_wheel-footer">{footerContent}</div>
          )
        : null}
    </Calendar>
  )
}

export interface CalendarWheelColumnProps {
  label?: string
  items?: Array<string | number>
  /** 선택값(제어). 넘기면 페이지가 값을 관리한다 */
  selected?: string | number
  /** 비제어 초기 선택 */
  defaultSelected?: string | number
  showSteps?: boolean
  prevLabel?: string
  nextLabel?: string
  /** 값이 바뀔 때 호출 */
  onChange?: (value: string | number) => void
}

/** 휠 한 열 */
export function CalendarWheelColumn ({
  label,
  items = [],
  selected,
  defaultSelected,
  showSteps = true,
  prevLabel = '이전',
  nextLabel = '다음',
  onChange
}: CalendarWheelColumnProps) {
  const controlled = selected !== undefined
  const [innerActive, setInnerActive] = useState(defaultSelected ?? selected)
  const active = controlled ? selected : innerActive
  const listRef = useRef<HTMLUListElement>(null)
  const index = Math.max(
    0,
    items.findIndex((item) => String(item) === String(active))
  )

  const setActive = (next: string | number) => {
    if (!controlled) setInnerActive(next)
    onChange?.(next)
  }

  const move = (offset: number) => {
    const next = items[Math.max(0, Math.min(items.length - 1, index + offset))]
    if (next !== undefined) setActive(next)
  }

  useEffect(() => {
    const list = listRef.current
    const selectedItem = list?.children[index] as HTMLElement | undefined
    if (!list || !selectedItem) return
    const frame = requestAnimationFrame(() => {
      const rowHeight = selectedItem.getBoundingClientRect().height || selectedItem.clientHeight
      list.scrollTop = index * rowHeight
    })
    return () => cancelAnimationFrame(frame)
  }, [index, items])

  return (
    <div className="calendar_wheel-column">
      {showSteps
        ? (
          <button
            type="button"
            className="btn btn_ghost btn_icon-only btn_sm calendar_wheel-step calendar_wheel-step-prev"
            aria-label={prevLabel}
            disabled={index <= 0}
            onClick={() => move(-1)}
          >
            ⌃
          </button>
          )
        : null}
      <ul ref={listRef} className="calendar_wheel-list" role="listbox" aria-label={label}>
        {items.map((item) => (
          <li key={String(item)} role="presentation">
            <button
              type="button"
              role="option"
              className={cx(
                'calendar_wheel-item',
                String(item) === String(active) && 'is-selected'
              )}
              aria-selected={String(item) === String(active) || undefined}
              onClick={() => setActive(item)}
            >
              {String(item)}
            </button>
          </li>
        ))}
      </ul>
      {showSteps
        ? (
          <button
            type="button"
            className="btn btn_ghost btn_icon-only btn_sm calendar_wheel-step calendar_wheel-step-next"
            aria-label={nextLabel}
            disabled={index >= items.length - 1}
            onClick={() => move(1)}
          >
            ⌄
          </button>
          )
        : null}
    </div>
  )
}

export default Calendar
