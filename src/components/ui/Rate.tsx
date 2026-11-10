'use client'

/**
 * 별점 입력.
 * count · allowHalf · clearable · readOnly · size · ripple을 공통 클래스로 표현한다.
 */
import {
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'

const VALID_SIZES = new Set(['sm', 'md', 'lg'])
const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

function StarGraphic ({ half = false }: { half?: boolean }) {
  return (
    <span className="rate_star-graphic" aria-hidden="true">
      <svg className="rate_star-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d={STAR_PATH} />
      </svg>
      <svg className="rate_star-icon rate_star-icon-filled" viewBox="0 0 24 24" fill="currentColor">
        <path d={STAR_PATH} />
      </svg>
      {half
        ? (
          <span className="rate_star-icon-half">
            <svg className="rate_star-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d={STAR_PATH} />
            </svg>
          </span>
          )
        : null}
    </span>
  )
}

/** 별점이 받는 값 */
export interface RateProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'defaultValue'> {
  /** 선택값. null 이면 미선택(제어). undefined 는 비제어 */
  value?: number | null
  defaultValue?: number | null
  count?: number
  allowHalf?: boolean
  clearable?: boolean
  readOnly?: boolean
  readonly?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  legend?: ReactNode
  name?: string
  ripple?: boolean
  /** 값 변경. clear 시 null */
  onChange?: (value: number | null) => void
}

/**
 * 별점으로 평가·표시한다.
 * 편집 모드는 fieldset + radio, 읽기 전용은 채움 상태만 표시한다.
 */
export function Rate ({
  value,
  defaultValue,
  count = 5,
  allowHalf = false,
  clearable = false,
  readOnly = false,
  readonly = false,
  disabled = false,
  size = 'md',
  legend,
  name,
  className,
  ripple = false,
  onChange,
  ...props
}: RateProps) {
  const generatedName = useId()
  const groupName = name || generatedName
  const resolvedCount = Number(count) > 0 ? Number(count) : 5
  const resolvedSize = VALID_SIZES.has(size) ? size : 'md'
  const isReadonly = readOnly || readonly
  const controlled = value !== undefined
  const [innerValue, setInnerValue] = useState<number | null>(defaultValue ?? null)
  const currentValue = controlled ? value : innerValue
  const stars = useMemo(
    () => Array.from({ length: resolvedCount }, (_, index) => index + 1),
    [resolvedCount]
  )

  const classes = cx(
    'rate',
    resolvedSize === 'sm' && 'rate_sm',
    resolvedSize === 'lg' && 'rate_lg',
    allowHalf && 'rate_allow-half',
    clearable && 'rate_clearable',
    isReadonly && 'is-readonly',
    className
  )

  const update = (next: number | null) => {
    if (!controlled) setInnerValue(next)
    onChange?.(next)
  }

  const rippleAttr = ripple ? ({ 'data-ripple': 'true' as const }) : {}

  if (isReadonly) {
    return (
      <div
        {...props}
        className={classes}
        role="img"
        aria-label={props['aria-label'] || `${resolvedCount}점 만점 중 ${currentValue ?? 0}점`}
      >
        <div className="rate_stars">
          {stars.map((star) => {
            const state =
              (currentValue ?? 0) >= star
                ? 'is-filled'
                : allowHalf && (currentValue ?? 0) >= star - 0.5
                  ? 'is-half'
                  : ''
            return (
              <span key={star} className={cx('rate_star-readonly', state)}>
                <StarGraphic half={state === 'is-half'} />
              </span>
            )
          })}
        </div>
        {currentValue != null ? <span className="rate_value">{currentValue}</span> : null}
      </div>
    )
  }

  return (
    <fieldset
      {...props}
      className={classes}
      {...rippleAttr}
      disabled={disabled}
    >
      {legend ? <legend className="rate_legend">{legend}</legend> : null}
      <div className="rate_control">
        <div className="rate_stars">
          {stars.map((star) => (
            <label key={star} className="rate_star" {...rippleAttr}>
              {allowHalf
                ? (
                  <input
                    type="radio"
                    className="rate_input rate_input-half"
                    name={groupName}
                    value={star - 0.5}
                    checked={currentValue === star - 0.5}
                    disabled={disabled}
                    onChange={() => update(star - 0.5)}
                  />
                  )
                : null}
              <input
                type="radio"
                className="rate_input"
                name={groupName}
                value={star}
                checked={currentValue === star}
                disabled={disabled}
                onChange={() => update(star)}
              />
              {allowHalf
                ? (
                  <>
                    <button
                      type="button"
                      className="rate_star-half rate_star-half-left"
                      tabIndex={-1}
                      aria-hidden="true"
                      disabled={disabled}
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        update(star - 0.5)
                      }}
                    />
                    <button
                      type="button"
                      className="rate_star-half rate_star-half-right"
                      tabIndex={-1}
                      aria-hidden="true"
                      disabled={disabled}
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        update(star)
                      }}
                    />
                  </>
                  )
                : null}
              <StarGraphic half={allowHalf} />
              <span className="rate_star-label">{star}점</span>
            </label>
          ))}
        </div>
        {clearable
          ? (
            <button
              type="button"
              className="rate_clear"
              {...rippleAttr}
              aria-label="별점 초기화"
              title="초기화"
              onClick={() => update(null)}
            >
              <svg
                className="rate_clear-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            )
          : null}
        {currentValue != null ? <output className="rate_value">{currentValue}점</output> : null}
      </div>
    </fieldset>
  )
}

export default Rate
