import type {
  ChangeEvent,
  FocusEvent,
  LabelHTMLAttributes,
  ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes, useControllable } from '@/utils/react'

export interface SwitchProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange' | 'onInput' | 'onFocus' | 'onBlur' | 'color'> {
  value?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''
  label?: string
  checkedLabel?: string
  uncheckedLabel?: string
  ariaLabel?: string
  disabled?: boolean
  /** Vue `input` + `change` 대응 — (checked) */
  onChange?: (checked: boolean, event?: ChangeEvent<HTMLInputElement>) => void
  /** Vue `input` 이벤트 호환 */
  onInput?: (checked: boolean, event?: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  children?: ReactNode
}

// SVG 예약 태그 <switch>와 충돌하던 Vue 이름(FormSwitch)과 Switch 둘 다 export
export function FormSwitch ({
  value,
  size = 'md',
  color = 'primary',
  label = '',
  checkedLabel = '',
  uncheckedLabel = '',
  ariaLabel = '',
  disabled = false,
  className,
  children,
  onChange,
  onInput,
  onFocus,
  onBlur,
  ...rest
}: SwitchProps) {
  const [current, setInner] = useControllable<boolean>(value, false)
  const isOn = !!current
  const showLabel = !!label || hasNodes(children)
  const showInnerLabel = !!(checkedLabel || uncheckedLabel)
  const innerLabel = isOn ? (checkedLabel || '') : (uncheckedLabel || '')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    const next = !!event.target.checked
    setInner(next)
    onInput?.(next, event)
    onChange?.(next, event)
  }

  return (
    <label
      {...rest}
      className={cx(
        'switch',
        isOn && 'is-checked',
        disabled && 'is-disabled',
        size === 'sm' && 'switch_sm',
        size === 'lg' && 'switch_lg',
        color && color !== 'primary' && 'color_' + color,
        className
      )}
    >
      <input
        className="switch_input"
        type="checkbox"
        role="switch"
        checked={isOn}
        disabled={disabled}
        aria-checked={isOn ? 'true' : 'false'}
        aria-label={ariaLabel || label || undefined}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <span className="switch_control" aria-hidden="true">
        <span className="switch_track">
          {showInnerLabel && <span className="switch_inner">{innerLabel}</span>}
        </span>
        <span className="switch_thumb" />
      </span>
      {showLabel && (
        <span className="switch_label">{hasNodes(children) ? children : label}</span>
      )}
    </label>
  )
}

export const Switch = FormSwitch

export default FormSwitch
