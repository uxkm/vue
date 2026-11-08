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
  selected?: number
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
          <button type="button" className="btn btn_ghost btn_icon-only btn_sm" aria-label={prevLabel}>
            ‹
          </button>
          )
        : null}
      <span className="calendar_title">{title}</span>
      {next
        ? (
          <button type="button" className="btn btn_ghost btn_icon-only btn_sm" aria-label={nextLabel}>
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
}

/** 주간 탐색 바 */
export function CalendarNav ({
  label,
  prevLabel = '이전 주',
  nextLabel = '다음 주',
  className
}: CalendarNavProps) {
  return (
    <div className={cx('calendar_nav', className)}>
      <button type="button" className="btn btn_ghost btn_icon-only btn_sm" aria-label={prevLabel}>
        ‹
      </button>
      <span className="calendar_nav-label">{label}</span>
      <button type="button" className="btn btn_ghost btn_icon-only btn_sm" aria-label={nextLabel}>
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
  selected?: number
  today?: number
  disabled?: number[]
  events?: number[]
  rangeStart?: number
  rangeEnd?: number
  weekends?: boolean
  partial?: number
  week?: boolean
  readonly?: boolean
}

/** 월(또는 주) 날짜 셀 그리드 */
export function CalendarMonth ({
  days,
  selected = 15,
  today = 12,
  disabled = [],
  events = [],
  rangeStart,
  rangeEnd,
  weekends = false,
  partial,
  week = false,
  readonly = false
}: CalendarMonthProps) {
  const resolved = useMemo(
    () =>
      days?.length
        ? days
        : monthDays({ partial, selected, today, events, rangeStart, rangeEnd }),
    [days, partial, selected, today, events, rangeStart, rangeEnd]
  )

  return (
    <CalendarGrid week={week}>
      {resolved.map((cell, index) => (
        <CalendarDay
          key={`${cell.day}-${index}`}
          {...cell}
          disabled={cell.disabled || disabled.includes(cell.day)}
          sunday={cell.sunday ?? (weekends && index % 7 === 0)}
          saturday={cell.saturday ?? (weekends && index % 7 === 6)}
          readonly={readonly}
        />
      ))}
    </CalendarGrid>
  )
}

export interface CalendarFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

/** 하단 액션 영역 */
export function CalendarFooter ({
  children,
  className,
  ...rest
}: CalendarFooterProps) {
  return (
    <div className={cx('calendar_footer', className)} {...rest}>
      <button type="button" className="btn btn_text color_primary btn_sm">
        오늘
      </button>
      <div className="calendar_footer-actions">
        {children ?? (
          <>
            <button type="button" className="btn btn_ghost btn_sm">
              초기화
            </button>
            <button type="button" className="btn btn_filled color_primary btn_sm">
              확인
            </button>
          </>
        )}
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
  children
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
                    <button className="btn btn_text btn_sm" type="button">
                      {cancelLabel}
                    </button>
                    )
                  : null}
                <span className="calendar_wheel-title">{title}</span>
                {confirmLabel
                  ? (
                    <button className="btn btn_text color_primary btn_sm" type="button">
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
  selected?: string | number
  showSteps?: boolean
  prevLabel?: string
  nextLabel?: string
}

/** 휠 한 열 */
export function CalendarWheelColumn ({
  label,
  items = [],
  selected,
  showSteps = true,
  prevLabel = '이전',
  nextLabel = '다음'
}: CalendarWheelColumnProps) {
  const [active, setActive] = useState(selected)
  const listRef = useRef<HTMLUListElement>(null)
  const index = Math.max(
    0,
    items.findIndex((item) => String(item) === String(active))
  )
  const move = (offset: number) =>
    setActive(items[Math.max(0, Math.min(items.length - 1, index + offset))])

  useEffect(() => {
    setActive(selected)
  }, [selected])

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
