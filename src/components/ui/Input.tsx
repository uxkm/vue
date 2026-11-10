'use client'

/**
 * 한 줄 입력.
 * size · clearable · prefix/suffix · error 상태를 공통 클래스로 표현한다.
 */
import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type InputHTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { Icon } from './Icon'

const VALID_SIZES = new Set(['sm', 'md', 'lg'])

/** 입력창 크기 */
export type InputSize = 'sm' | 'md' | 'lg'

/** 입력창이 받는 값 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'onChange'> {
  size?: InputSize
  error?: boolean
  block?: boolean
  clearable?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
  onPaste?: (event: ClipboardEvent<HTMLInputElement>) => void
}

/**
 * 한 줄 텍스트 입력.
 * clearable · prefix · suffix가 있으면 래퍼/그룹으로 묶는다.
 */
export function Input ({
  size = 'md',
  disabled = false,
  error = false,
  placeholder,
  type = 'text',
  block = false,
  clearable = false,
  value,
  defaultValue = '',
  prefix,
  suffix,
  className,
  onChange,
  onPaste,
  onClear,
  readOnly,
  ...props
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    maxLength: maxLengthProp,
    maxlength,
    ...restProps
  } = props as Omit<InputProps, 'size' | 'prefix' | 'onChange'> & {
    maxlength?: number | string
  }
  const resolvedMaxLength = Number(maxLengthProp ?? maxlength)
  const nativeMaxLength =
    Number.isFinite(resolvedMaxLength) && resolvedMaxLength > 0 ? resolvedMaxLength : undefined

  const resolvedSize = VALID_SIZES.has(size) ? size : 'md'
  const controlled = value !== undefined
  const [innerValue, setInnerValue] = useState(() => value ?? defaultValue ?? '')
  const currentValue = controlled
    ? typeof value === 'string' || typeof value === 'number'
      ? String(value)
      : ''
    : String(innerValue ?? '')
  const hasAddon = prefix != null || suffix != null

  const [previousValue, setPreviousValue] = useState(value)
  if (previousValue !== value) {
    setPreviousValue(value)
    if (controlled) setInnerValue(value ?? '')
  }

  const inputClasses = useMemo(
    () =>
      cx(
        'input',
        resolvedSize === 'sm' && 'input_sm',
        resolvedSize === 'lg' && 'input_lg',
        block && 'input_block',
        error && 'is-error',
        type === 'password' && String(currentValue).length > 0 && 'input_masked',
        !hasAddon && !clearable && className
      ),
    [resolvedSize, block, error, type, currentValue, hasAddon, clearable, className]
  )

  const numericOnly =
    restProps.inputMode === 'numeric' ||
    (restProps as { inputmode?: string }).inputmode === 'numeric'
  const maxLengthLimit = nativeMaxLength ?? 0

  function sanitize (next: string) {
    if (numericOnly) {
      const digits = String(next).replace(/\D/g, '')
      return maxLengthLimit > 0 ? digits.slice(0, maxLengthLimit) : digits
    }
    if (type === 'number') return String(next).replace(/[a-zA-ZeE+\-]/g, '')
    return next
  }

  function applyValue (event: ChangeEvent<HTMLInputElement>, next: string) {
    if (next !== event.target.value) event.target.value = next
    if (!controlled) setInnerValue(next)
    onChange?.(event)
  }

  function handleChange (event: ChangeEvent<HTMLInputElement>) {
    applyValue(event, sanitize(event.target.value))
  }

  function handlePaste (event: ClipboardEvent<HTMLInputElement>) {
    onPaste?.(event)
    if (event.defaultPrevented || !numericOnly) return
    event.preventDefault()
    const pasted = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '')
    if (!pasted) return
    const input = event.currentTarget
    const start = input.selectionStart ?? input.value.length
    const end = input.selectionEnd ?? input.value.length
    const next = sanitize(`${input.value.slice(0, start)}${pasted}${input.value.slice(end)}`)
    const synthetic = {
      ...event,
      target: input,
      currentTarget: input
    } as ChangeEvent<HTMLInputElement>
    if (next !== input.value) input.value = next
    if (!controlled) setInnerValue(next)
    onChange?.(synthetic)
  }

  function handleClear () {
    if (disabled || readOnly) return
    const input = inputRef.current
    if (!input) return
    const descriptor = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )
    descriptor?.set?.call(input, '')
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
    if (!controlled) setInnerValue('')
    onClear?.()
    input.focus()
  }

  const clearButton = (
    <button
      type="button"
      className="input_clear"
      aria-label="입력 지우기"
      hidden={String(currentValue).length === 0 || disabled || !!readOnly}
      onClick={handleClear}
    >
      <Icon name="close" />
    </button>
  )

  const input = (
    <input
      {...restProps}
      ref={inputRef}
      type={type}
      className={inputClasses}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      maxLength={nativeMaxLength}
      value={currentValue}
      aria-invalid={error ? 'true' : restProps['aria-invalid']}
      onChange={handleChange}
      onPaste={handlePaste}
    />
  )

  const control = clearable
    ? (
      <span
        className={cx(
          'input_clearable',
          String(currentValue).length > 0 && !disabled && !readOnly && 'is-filled'
        )}
      >
        {input}
        {clearButton}
      </span>
      )
    : (
        input
      )

  if (!hasAddon) {
    return clearable
      ? (
        <span
          className={cx(
            'input_clearable',
            String(currentValue).length > 0 && !disabled && !readOnly && 'is-filled',
            className
          )}
        >
          {input}
          {clearButton}
        </span>
        )
      : (
          input
        )
  }

  return (
    <div className={cx('input_group', className)}>
      {prefix != null && (
        <span className="input_group-addon" aria-hidden="true">
          {prefix}
        </span>
      )}
      {control}
      {suffix != null && <span className="input_group-addon">{suffix}</span>}
    </div>
  )
}

export default Input
