import type {
  ChangeEvent,
  FocusEvent,
  ReactNode,
  SelectHTMLAttributes
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes, useControllable } from '@/utils/react'

export type SelectValue = string | number
export type SelectOption =
  | SelectValue
  | { value: SelectValue; label?: ReactNode; disabled?: boolean }

export interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'value' | 'size' | 'onChange' | 'onFocus' | 'onBlur'
  > {
  value?: SelectValue | string[]
  options?: SelectOption[]
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  nativeSize?: number | string | null
  fit?: boolean
  error?: boolean
  /** Vue `input` + `change` 대응 — (value) */
  onChange?: (value: any, event?: ChangeEvent<HTMLSelectElement>) => void
  /** Vue `input` 이벤트 호환 */
  onInput?: (value: any, event?: ChangeEvent<HTMLSelectElement>) => void
  onFocus?: (event: FocusEvent<HTMLSelectElement>) => void
  onBlur?: (event: FocusEvent<HTMLSelectElement>) => void
  /** 지정 시 options 대신 사용 (Vue 기본 슬롯) */
  children?: ReactNode
}

export function Select ({
  value,
  defaultValue,
  options = [],
  size = 'md',
  placeholder = '',
  nativeSize = null,
  fit = false,
  disabled = false,
  error = false,
  multiple = false,
  className,
  children,
  onChange,
  onInput,
  onFocus,
  onBlur,
  ...rest
}: SelectProps) {
  const [current, setInner] = useControllable<SelectValue | string[]>(
    value,
    (defaultValue as SelectValue | string[] | undefined) ?? (multiple ? [] : '')
  )

  const normalizedOptions = (options || []).map((item) => {
    if (item && typeof item === 'object') {
      return {
        value: item.value,
        label: item.label != null ? item.label : item.value,
        disabled: item.disabled
      }
    }
    return { value: item as SelectValue, label: String(item), disabled: undefined }
  })

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let next: SelectValue | string[]
    if (multiple) {
      next = Array.from(event.target.options)
        .filter((o) => o.selected)
        .map((o) => o.value)
    } else {
      next = event.target.value
    }
    setInner(next)
    onInput?.(next, event)
    onChange?.(next, event)
  }

  return (
    <select
      {...rest}
      className={cx(
        'input',
        size === 'sm' && 'input_sm',
        size === 'lg' && 'input_lg',
        fit && 'input_fit',
        error && 'is-error',
        className
      )}
      value={current as any}
      disabled={disabled}
      multiple={multiple}
      size={nativeSize ? Number(nativeSize) : undefined}
      aria-invalid={error ? 'true' : undefined}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {placeholder && !multiple && (
        <option value="" disabled>{placeholder}</option>
      )}
      {hasNodes(children)
        ? children
        : normalizedOptions.map((option) => (
          <option
            key={String(option.value)}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
    </select>
  )
}

export default Select
