import type {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes, useControllable } from '@/utils/react'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'size' | 'prefix' | 'onChange' | 'onInput' | 'onFocus' | 'onBlur'
  > {
  value?: string | number
  size?: InputSize
  error?: boolean
  block?: boolean
  clearable?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  /** Vue `input` 이벤트 대응 — (value, event) */
  onChange?: (value: string, event?: ChangeEvent<HTMLInputElement>) => void
  /** Vue `input` 이벤트 호환 — onChange 와 함께 호출 */
  onInput?: (value: string, event?: ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}

export function Input ({
  value,
  defaultValue,
  type = 'text',
  size = 'md',
  placeholder = '',
  disabled = false,
  readOnly = false,
  error = false,
  block = false,
  clearable = false,
  prefix,
  suffix,
  className,
  style,
  onChange,
  onInput,
  onClear,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [current, setInner] = useControllable<string | number>(
    value,
    (defaultValue as string | number | undefined) ?? ''
  )
  const hasValue = current !== '' && current != null

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value
    setInner(next)
    onInput?.(next, event)
    onChange?.(next, event)
  }

  const handleClear = () => {
    setInner('')
    onInput?.('')
    onChange?.('')
    onClear?.()
  }

  return (
    <div
      className={cx(
        'input_wrap',
        { input_clearable: clearable, input_block: block, 'is-error': error },
        className
      )}
      style={style}
    >
      {hasNodes(prefix) && <span className="input_prefix">{prefix}</span>}
      <input
        {...rest}
        className={cx(
          'input',
          size === 'sm' && 'input_sm',
          size === 'lg' && 'input_lg',
          readOnly && 'is-readonly',
          error && 'is-error'
        )}
        type={type}
        value={current}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={error ? 'true' : undefined}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {clearable && hasValue && !disabled && (
        <button
          type="button"
          className="input_clear"
          aria-label="입력 지우기"
          onClick={handleClear}
        >×</button>
      )}
      {hasNodes(suffix) && <span className="input_suffix">{suffix}</span>}
    </div>
  )
}

export default Input
