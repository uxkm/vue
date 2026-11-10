'use client'

/**
 * 슬라이더(범위 입력).
 * label · showValue · stepper · size · ripple을 공통 클래스로 표현한다.
 */
import {
  useId,
  useState,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'

const VALID_SIZES = new Set(['sm', 'md', 'lg'])

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number(value)))

function StepIcon ({ increase = false }: { increase?: boolean }) {
  return (
    <svg
      className="slider_step-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      {increase ? <path d="M12 5v14" /> : null}
    </svg>
  )
}

/** 슬라이더가 받는 값 */
export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value' | 'defaultValue' | 'type' | 'color'> {
  min?: number
  max?: number
  value?: number
  defaultValue?: number
  step?: number
  disabled?: boolean
  vertical?: boolean
  label?: ReactNode
  showValue?: boolean
  stepper?: boolean
  stepperAlways?: boolean
  valueSuffix?: string
  hint?: ReactNode
  decreaseLabel?: string
  increaseLabel?: string
  size?: 'sm' | 'md' | 'lg'
  ripple?: boolean
  children?: ReactNode
  onChange?: (value: number) => void
}

/**
 * 범위 값을 조절하는 슬라이더.
 * min · max · step과 레이블·증감 버튼을 조합한다.
 */
export function Slider ({
  min = 0,
  max = 100,
  value,
  defaultValue = 50,
  step = 1,
  disabled = false,
  vertical = false,
  label,
  showValue = false,
  stepper = false,
  stepperAlways = false,
  valueSuffix = '',
  hint,
  decreaseLabel = '값 줄이기',
  increaseLabel = '값 늘리기',
  size = 'md',
  id,
  className,
  children,
  ripple = false,
  onChange,
  style,
  ...props
}: SliderProps) {
  const generatedId = useId()
  const inputId = id || generatedId
  const numericMin = Number(min)
  const numericMax = Number(max)
  const controlled = value !== undefined
  const [innerValue, setInnerValue] = useState(() =>
    clamp(defaultValue, numericMin, numericMax)
  )
  const currentValue = clamp(
    controlled ? Number(value) : innerValue,
    numericMin,
    numericMax
  )
  const resolvedSize = VALID_SIZES.has(size) ? size : 'md'
  const progress =
    numericMax === numericMin
      ? 0
      : ((currentValue - numericMin) / (numericMax - numericMin)) * 100

  const classes = cx(
    'slider',
    resolvedSize === 'sm' && 'slider_sm',
    resolvedSize === 'lg' && 'slider_lg',
    vertical && 'slider_vertical',
    stepper && 'slider_stepper',
    stepperAlways && 'slider_stepper_always',
    className
  )

  const valueMap = String(props['data-slider-valuetext-map'] ?? '')
    .split(',')
    .reduce<Record<string, string>>((map, item) => {
      const separator = item.indexOf(':')
      if (separator > -1) map[item.slice(0, separator)] = item.slice(separator + 1)
      return map
    }, {})

  const valueText =
    valueMap[String(currentValue)] ??
    (props['data-slider-valuetext-suffix']
      ? `${currentValue} ${props['data-slider-valuetext-suffix']}`
      : props['aria-valuetext'])

  const update = (next: number | string) => {
    const normalized = clamp(Number(next), numericMin, numericMax)
    if (!controlled) setInnerValue(normalized)
    onChange?.(normalized)
  }

  const rippleAttr = ripple ? ({ 'data-ripple': 'true' as const }) : {}
  const stepRippleAttr = ripple ? ({ 'data-ripple': 'true' as const }) : {}

  const input = (
    <input
      {...props}
      id={inputId}
      type="range"
      className="slider_input"
      min={numericMin}
      max={numericMax}
      step={step}
      value={currentValue}
      disabled={disabled}
      aria-valuetext={valueText || undefined}
      onChange={(event) => update(event.target.value)}
    />
  )

  return (
    <div
      className={classes}
      {...rippleAttr}
      style={{ '--slider-progress': `${progress}%`, ...style } as CSSProperties}
    >
      {(label || showValue) && (
        <div className="slider_header">
          {label
            ? (
              <label className="slider_label" htmlFor={inputId}>
                {label}
              </label>
              )
            : null}
          {showValue
            ? (
              <output className="slider_value" htmlFor={inputId}>
                {currentValue}
                {valueSuffix || props['data-slider-suffix'] || ''}
              </output>
              )
            : null}
        </div>
      )}
      {stepper
        ? (
          <div className="slider_control">
            <button
              type="button"
              className="slider_step slider_step-decrease"
              {...stepRippleAttr}
              aria-label={decreaseLabel}
              disabled={disabled || currentValue <= numericMin}
              onClick={() => update(currentValue - Number(step || 1))}
            >
              <StepIcon />
            </button>
            {input}
            <button
              type="button"
              className="slider_step slider_step-increase"
              {...stepRippleAttr}
              aria-label={increaseLabel}
              disabled={disabled || currentValue >= numericMax}
              onClick={() => update(currentValue + Number(step || 1))}
            >
              <StepIcon increase />
            </button>
          </div>
          )
        : input}
      {hint ? <p className="slider_hint">{hint}</p> : null}
      {children}
    </div>
  )
}

export default Slider
