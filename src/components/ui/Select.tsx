/**
 * 셀렉트.
 * 네이티브 select에 size · fit · error · placeholder를 공통 클래스로 연결한다.
 */
import type {
  ChangeEvent,
  ReactNode,
  SelectHTMLAttributes
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

const VALID_SIZES = new Set(['sm', 'md', 'lg'])

/** 선택 값 */
export type SelectValue = string | number

/** options prop용 항목 (children 대신 쓸 때) */
export type SelectOption =
  | SelectValue
  | { value: SelectValue; label?: ReactNode; disabled?: boolean }

/** 셀렉트가 받는 값 */
export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'prefix'> {
  size?: 'sm' | 'md' | 'lg'
  /** 네이티브 select size(표시 행 수) */
  nativeSize?: number
  fit?: boolean
  error?: boolean
  placeholder?: string
  /** children이 없을 때 option 목록 */
  options?: SelectOption[]
  children?: ReactNode
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

/**
 * 목록에서 값을 고르는 네이티브 select.
 * option · optgroup은 children(또는 options)으로 구성한다.
 */
export function Select ({
  size = 'md',
  nativeSize,
  disabled = false,
  error = false,
  fit = false,
  placeholder,
  value,
  defaultValue,
  className,
  children,
  options = [],
  onChange,
  ...props
}: SelectProps) {
  const resolvedSize = VALID_SIZES.has(size) ? size : 'md'
  const classes = cx(
    'input',
    resolvedSize === 'sm' && 'input_sm',
    resolvedSize === 'lg' && 'input_lg',
    fit && 'input_fit',
    error && 'is-error',
    className
  )

  const valueProps =
    value !== undefined
      ? { value }
      : { defaultValue: defaultValue ?? (placeholder ? '' : undefined) }

  const optionNodes = hasNodes(children)
    ? children
    : options.map((item) => {
      if (item && typeof item === 'object') {
        return (
          <option
            key={String(item.value)}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label != null ? item.label : item.value}
          </option>
        )
      }
      return (
        <option key={String(item)} value={item as SelectValue}>
          {String(item)}
        </option>
      )
    })

  return (
    <select
      {...props}
      {...valueProps}
      className={classes}
      size={nativeSize}
      disabled={disabled}
      aria-invalid={error ? 'true' : props['aria-invalid']}
      onChange={onChange}
    >
      {placeholder != null && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {optionNodes}
    </select>
  )
}

export default Select
