import {
  createElement,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

export type CardVariant = 'bordered' | 'shadow' | 'flat' | 'ghost'

const VARIANT_CLASS: Record<string, string> = {
  bordered: '',
  shadow: 'card_shadow',
  flat: 'card_ghost',
  ghost: 'card_ghost'
}

export interface CardProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'onClick'> {
  variant?: CardVariant
  size?: 'sm' | 'md' | 'lg' | 'compact'
  title?: ReactNode
  subtitle?: ReactNode
  as?: string
  /** @deprecated use `as` */
  tag?: string
  href?: string
  hoverable?: boolean
  horizontal?: boolean
  accent?: boolean
  disabled?: boolean
  ripple?: boolean
  media?: ReactNode
  header?: ReactNode
  extra?: ReactNode
  footer?: ReactNode
  children?: ReactNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

export function Card ({
  variant = 'bordered',
  size = 'md',
  title = '',
  subtitle = '',
  as = 'article',
  tag = '',
  href = '',
  hoverable = false,
  horizontal = false,
  accent = false,
  disabled = false,
  ripple = false,
  media,
  header,
  extra,
  footer,
  children,
  className,
  onClick,
  ...rest
}: CardProps) {
  const rootTag = href ? 'a' : (tag || as || 'article')
  const hasTitle = hasNodes(title)
  const hasSubtitle = hasNodes(subtitle)
  const hasHeader = hasTitle || hasSubtitle || hasNodes(header) || hasNodes(extra)

  const cardClass = cx(
    'card',
    VARIANT_CLASS[variant],
    size === 'sm' && 'card_sm',
    size === 'lg' && 'card_lg',
    size === 'compact' && 'card_compact',
    hoverable && 'card_hover',
    horizontal && 'card_horizontal',
    accent && 'card_accent',
    href && 'card_clickable',
    disabled && 'is-disabled',
    className
  )

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    onClick?.(event)
  }

  return createElement(
    rootTag,
    {
      ...rest,
      className: cardClass,
      href: rootTag === 'a' ? (href || undefined) : undefined,
      'data-ripple': ripple ? undefined : 'false',
      onClick: handleClick
    },
    hasNodes(media) && <div className="card_media">{media}</div>,
    <div className="card_inner">
      {hasHeader && (
        <div className="card_header">
          {hasNodes(header)
            ? header
            : (
              <div className="card_header-main">
                {hasTitle && <div className="card_title">{title}</div>}
                {hasSubtitle && <div className="card_subtitle">{subtitle}</div>}
              </div>
            )}
          {hasNodes(extra) && <div className="card_extra">{extra}</div>}
        </div>
      )}
      <div className="card_body">{children}</div>
      {hasNodes(footer) && <div className="card_footer">{footer}</div>}
    </div>
  )
}

export default Card
