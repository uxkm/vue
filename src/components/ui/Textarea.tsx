'use client'

/**
 * 여러 줄 입력.
 * size · resize · showCount · clearable · fit 상태를 공통 클래스로 표현한다.
 */
import {
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type TextareaHTMLAttributes
} from 'react'
import { cx } from '@/utils/cx'
import { Icon } from './Icon'

const VALID_SIZES = new Set(['sm', 'md', 'lg'])
const VALID_RESIZE = new Set(['none', 'vertical', 'horizontal', 'both'])

/** Textarea 크기 */
export type TextareaSize = 'sm' | 'md' | 'lg'

/** Textarea 리사이즈 방향 */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'

/** 여러 줄 입력이 받는 값 */
export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  value?: string | number
  size?: TextareaSize
  resize?: TextareaResize
  error?: boolean
  fit?: boolean
  showCount?: boolean
  clearable?: boolean
  wrapperClassName?: string
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onClear?: () => void
}

/**
 * 여러 줄 텍스트 입력.
 * showCount · clearable이 있으면 wrap으로 묶는다.
 */
export function Textarea ({
  size = 'md',
  resize = 'none',
  disabled = false,
  error = false,
  fit = false,
  showCount = false,
  clearable = false,
  value,
  defaultValue = '',
  className,
  wrapperClassName,
  onChange,
  onClear,
  maxLength,
  readOnly,
  ...props
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const generatedId = useId().replace(/:/g, '')
  const controlled = value !== undefined
  const [innerValue, setInnerValue] = useState(() => value ?? defaultValue ?? '')
  const currentValue =
    controlled && (typeof value === 'string' || typeof value === 'number')
      ? String(value)
      : controlled
        ? ''
        : String(innerValue ?? '')
  const resolvedSize = VALID_SIZES.has(size) ? size : 'md'
  const resolvedResize = VALID_RESIZE.has(resize) ? resize : 'none'
  const countId = `${props.id || `textarea-${generatedId}`}-count`
  const describedBy =
    [props['aria-describedby'], showCount && countId].filter(Boolean).join(' ') || undefined
  const count = String(currentValue).length
  const resolvedMaxLength = Number(maxLength)
  const nativeMaxLength =
    Number.isFinite(resolvedMaxLength) && resolvedMaxLength > 0 ? resolvedMaxLength : undefined
  const hasLimit = nativeMaxLength != null
  const showClear = clearable && count > 0 && !disabled && !readOnly

  const classes = useMemo(
    () =>
      cx(
        'textarea',
        resolvedSize === 'sm' && 'textarea_sm',
        resolvedSize === 'lg' && 'textarea_lg',
        `textarea_resize_${resolvedResize}`,
        !showCount && !clearable && fit && 'textarea_fit',
        error && 'is-error',
        className
      ),
    [resolvedSize, resolvedResize, showCount, clearable, fit, error, className]
  )

  function handleChange (event: ChangeEvent<HTMLTextAreaElement>) {
    if (!controlled) setInnerValue(event.target.value)
    onChange?.(event)
  }

  function handleClear () {
    if (disabled || readOnly) return
    const textarea = textareaRef.current
    if (!textarea) return
    const descriptor = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value'
    )
    descriptor?.set?.call(textarea, '')
    textarea.dispatchEvent(new Event('input', { bubbles: true }))
    textarea.dispatchEvent(new Event('change', { bubbles: true }))
    if (!controlled) setInnerValue('')
    onClear?.()
    textarea.focus()
  }

  const control = (
    <textarea
      {...props}
      ref={textareaRef}
      className={classes}
      disabled={disabled}
      readOnly={readOnly}
      maxLength={nativeMaxLength}
      value={currentValue}
      aria-invalid={error ? 'true' : props['aria-invalid']}
      aria-describedby={describedBy}
      onChange={handleChange}
    />
  )

  const clearButton = clearable
    ? (
      <button
        type="button"
        className="textarea_clear"
        aria-label="입력 지우기"
        hidden={!showClear}
        onClick={handleClear}
      >
        <Icon name="close" />
      </button>
      )
    : null

  if (!showCount && !clearable) return control

  return (
    <div
      className={cx(
        'textarea_wrap',
        showCount && 'textarea_show-count',
        clearable && 'textarea_clearable',
        showClear && 'is-filled',
        fit && 'textarea_wrap_fit',
        wrapperClassName
      )}
    >
      {control}
      {clearButton}
      {showCount
        ? (
          <span
            id={countId}
            className={cx('textarea_count', hasLimit && count >= (nativeMaxLength as number) && 'is-limit')}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="textarea_count_visual" aria-hidden="true">
              {count}
              {hasLimit ? `/${nativeMaxLength}` : ''}
            </span>
            <span className="textarea_count_announcer">
              {count}자 입력{hasLimit ? `, 최대 ${nativeMaxLength}자` : ''}
            </span>
          </span>
          )
        : null}
    </div>
  )
}

export default Textarea
