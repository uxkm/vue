/**
 * 토글 스위치.
 * label · labelEnd · size · ripple을 공통 클래스로 표현한다.
 */
import type {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode
} from 'react'
import { cx } from '@/utils/cx'

const VALID_SIZES = new Set(['sm', 'md', 'lg'])

/** 스위치가 받는 값 */
export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size' | 'color'> {
  label?: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  labelEnd?: boolean
  size?: 'sm' | 'md' | 'lg'
  ripple?: boolean
  ariaLabel?: string
  children?: ReactNode
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

/**
 * 켜짐·꺼짐을 전환하는 스위치.
 * FormSwitch 와 Switch 는 같은 컴포넌트다. SVG switch 태그와 이름이 겹치지 않게 둘 다 둔다.
 */
export function Switch ({
  label,
  checked,
  defaultChecked,
  disabled = false,
  labelEnd = false,
  size = 'md',
  ripple = false,
  ariaLabel,
  children,
  className,
  onChange,
  id,
  name,
  value,
  ...props
}: SwitchProps) {
  const content = children ?? label
  const hasLabel = content != null && content !== ''
  const resolvedSize = VALID_SIZES.has(size) ? size : 'md'
  const classes = cx(
    'switch',
    labelEnd && 'switch_label-end',
    resolvedSize === 'sm' && 'switch_sm',
    resolvedSize === 'lg' && 'switch_lg',
    className
  )

  // checked 유무로 제어/비제어 판정. onChange 만으로는 제어 모드가 되지 않는다.
  const checkedProps = checked !== undefined
    ? { checked, onChange }
    : { defaultChecked, onChange }

  return (
    <label
      className={classes}
      aria-label={!hasLabel ? ariaLabel : undefined}
      {...(ripple ? { 'data-ripple': 'true' as const } : {})}
    >
      {hasLabel && labelEnd && <span className="switch_label">{content}</span>}
      <span className="switch_control">
        <input
          {...props}
          id={id}
          type="checkbox"
          className="switch_input"
          role="switch"
          name={name}
          value={value}
          disabled={disabled}
          aria-label={!hasLabel ? ariaLabel : undefined}
          {...checkedProps}
        />
        <span className="switch_track" aria-hidden="true">
          <span className="switch_thumb" />
        </span>
      </span>
      {hasLabel && !labelEnd && <span className="switch_label">{content}</span>}
    </label>
  )
}

/** Switch 별칭. SVG switch 태그와 구분할 때 사용한다 */
export const FormSwitch = Switch

export default Switch
