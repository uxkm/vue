/**
 * 폼 필드 배치.
 * vertical · horizontal · inline 레이아웃으로 FormField를 묶는다.
 */
import {
  createElement,
  type ElementType,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'

const LAYOUTS = new Set(['vertical', 'horizontal', 'inline'])
const LABEL_WIDTHS = new Set(['', 'sm', 'lg'])

/** 폼 배치. vertical 세로, horizontal 가로, inline 한 줄 */
export type FormLayoutMode = 'vertical' | 'horizontal' | 'inline'

/** 폼 레이아웃이 받는 값 */
export interface FormLayoutProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'as'> {
  as?: ElementType
  layout?: FormLayoutMode
  fit?: boolean
  compact?: boolean
  labelAlign?: 'end' | 'start'
  labelWidth?: '' | 'sm' | 'lg'
  children?: ReactNode
}

/**
 * 필드 묶음의 배치.
 * layout · fit · compact · labelAlign · labelWidth를 조합한다.
 */
export function FormLayout ({
  as: Root = 'form',
  layout = 'vertical',
  fit = false,
  compact = false,
  labelAlign = 'end',
  labelWidth = '',
  children,
  className,
  ...props
}: FormLayoutProps) {
  const resolvedLayout = LAYOUTS.has(layout) ? layout : 'vertical'
  const classes = cx(
    'form',
    `form_${resolvedLayout}`,
    fit && 'form_fit',
    compact && 'form_compact',
    resolvedLayout === 'horizontal' && labelAlign === 'start' && 'form_label-align-start',
    resolvedLayout === 'horizontal' &&
      LABEL_WIDTHS.has(labelWidth) &&
      labelWidth &&
      `form_label-width-${labelWidth}`,
    className
  )

  return createElement(Root, { className: classes, ...props }, children)
}

/** 폼 칸이 받는 값 */
export interface FormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'as'> {
  as?: ElementType
  label?: ReactNode
  htmlFor?: string
  required?: boolean
  hint?: ReactNode
  error?: ReactNode
  success?: ReactNode
  fit?: boolean
  children?: ReactNode
}

/** 라벨과 입력을 한 칸으로 묶는다 */
export function FormField ({
  as: Root = 'div',
  label,
  htmlFor,
  required = false,
  hint,
  error,
  success,
  fit = false,
  children,
  className,
  ...props
}: FormFieldProps) {
  const classes = cx('form_field', fit && 'form_field_fit', className)

  return createElement(
    Root,
    { className: classes, ...props },
    label != null && (
      <label className="form_field-label" htmlFor={htmlFor}>
        {label}
        {required
          ? (
            <span className="form_field-required">
              <span aria-hidden="true">*</span>
              <span className="form_field-required-text">필수 항목</span>
            </span>
            )
          : null}
      </label>
    ),
    <div className="form_field-control">{children}</div>,
    error != null
      ? (
        <p className="form_field-error" role="alert">
          {error}
        </p>
        )
      : hint != null
        ? <p className="form_field-hint">{hint}</p>
        : null,
    success != null ? <p className="form_field-success">{success}</p> : null
  )
}

/** 폼 액션이 받는 값 */
export interface FormActionsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'as'> {
  as?: ElementType
  children?: ReactNode
}

/** 제출·취소 등 액션을 묶는다 */
export function FormActions ({
  as: Root = 'div',
  children,
  className,
  ...props
}: FormActionsProps) {
  return createElement(
    Root,
    { className: cx('form_actions', className), ...props },
    children
  )
}

export default FormLayout
