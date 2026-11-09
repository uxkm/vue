/**
 * 라디오.
 * label · button · labelEnd를 공통 클래스로 표현한다.
 */
import type {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode
} from 'react'
import { cx } from '@/utils/cx'

/** 라디오가 받는 값 */
export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size' | 'color'> {
  label?: ReactNode
  name?: string
  value?: string | number
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  labelEnd?: boolean
  button?: boolean
  ripple?: boolean
  ariaLabel?: string
  children?: ReactNode
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

/**
 * 단일 선택이 가능한 라디오 버튼.
 * 같은 name으로 그룹을 이룬다.
 */
export function Radio ({
  label,
  name,
  value,
  checked,
  defaultChecked,
  disabled = false,
  labelEnd = false,
  button = false,
  ripple = false,
  ariaLabel,
  children,
  className,
  onChange,
  id,
  ...props
}: RadioProps) {
  const content = children ?? label
  const standalone = content == null || content === ''
  const classes = cx(
    'radio',
    labelEnd && 'radio_label-end',
    button && 'radio_button',
    className
  )

  // checked 유무로 제어/비제어 판정. onChange 만으로는 제어 모드가 되지 않는다.
  const checkedProps = checked !== undefined
    ? { checked, onChange }
    : { defaultChecked, onChange }

  const input = (
    <input
      {...props}
      id={id}
      type="radio"
      className="radio_input"
      name={name}
      value={value}
      disabled={disabled}
      {...checkedProps}
    />
  )
  const rippleAttrs = ripple ? { 'data-ripple': 'true' as const } : {}

  if (standalone) {
    return (
      <label
        className={cx('radio_control', className)}
        aria-label={ariaLabel}
        {...rippleAttrs}
      >
        {input}
        <span className="radio_box" aria-hidden="true" />
      </label>
    )
  }

  if (button) {
    return (
      <label className={classes} {...rippleAttrs}>
        {input}
        <span className="radio_label">{content}</span>
      </label>
    )
  }

  return (
    <label className={classes} {...rippleAttrs}>
      {labelEnd && <span className="radio_label">{content}</span>}
      <span className="radio_control">
        {input}
        <span className="radio_box" aria-hidden="true" />
      </span>
      {!labelEnd && <span className="radio_label">{content}</span>}
    </label>
  )
}

export default Radio
