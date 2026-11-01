import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

export interface EmptyProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  description?: ReactNode
  /** @deprecated use description */
  title?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  simple?: boolean
  block?: boolean
  icon?: ReactNode
  image?: ReactNode
  footer?: ReactNode
  children?: ReactNode
}

export function Empty ({
  description = '',
  title = '',
  size = 'md',
  simple = false,
  block = false,
  icon,
  image,
  footer,
  children,
  className,
  ...rest
}: EmptyProps) {
  const resolvedDescription = hasNodes(description)
    ? description
    : hasNodes(title)
      ? title
      : '데이터가 없습니다'
  const hasIcon = hasNodes(icon) || hasNodes(image)
  const hasFooter = hasNodes(footer) || hasNodes(children)

  return (
    <div
      {...rest}
      className={cx(
        'empty',
        size === 'sm' && 'empty_sm',
        size === 'lg' && 'empty_lg',
        simple && 'empty_simple',
        block && 'empty_block',
        className
      )}
      role="status"
    >
      {hasIcon && (
        <div className="empty_image">{hasNodes(icon) ? icon : image}</div>
      )}
      <div className="empty_desc">{resolvedDescription}</div>
      {hasFooter && (
        <div className="empty_footer">{hasNodes(footer) ? footer : children}</div>
      )}
    </div>
  )
}

export default Empty
