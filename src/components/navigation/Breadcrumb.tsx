import type { HTMLAttributes } from 'react'
import { cx } from '@/utils/cx'

const SEPARATOR_GLYPH: Record<string, string> = {
  chevron: '›',
  slash: '/',
  dot: '·'
}

export interface BreadcrumbItem {
  label?: string
  href?: string
  current?: boolean
  disabled?: boolean
  ariaLabel?: string
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items?: BreadcrumbItem[]
  ariaLabel?: string
  separator?: 'chevron' | 'slash' | 'dot'
  size?: 'sm' | 'md' | 'lg'
}

export function Breadcrumb ({
  items = [],
  ariaLabel = '경로',
  separator = 'chevron',
  size = 'md',
  className,
  ...rest
}: BreadcrumbProps) {
  const separatorGlyph = SEPARATOR_GLYPH[separator] || '›'
  const isCurrent = (item: BreadcrumbItem, index: number) =>
    !!(item && item.current) || index === items.length - 1
  const itemKey = (item: BreadcrumbItem, index: number) => {
    if (item && item.href) return String(item.href) + '-' + index
    if (item && item.label) return String(item.label) + '-' + index
    return index
  }

  return (
    <nav {...rest} className={cx('breadcrumb', className)} aria-label={ariaLabel || '경로'}>
      <ol
        className={cx(
          'breadcrumb_list',
          size === 'sm' && 'breadcrumb_sm',
          size === 'lg' && 'breadcrumb_lg'
        )}
      >
        {items.map((item, index) => {
          const current = isCurrent(item, index)
          return (
            <li key={itemKey(item, index)} className="breadcrumb_item">
              {item.href && !current && !item.disabled
                ? (
                  <a
                    className="breadcrumb_link"
                    href={item.href}
                    aria-label={item.ariaLabel || undefined}
                  >{item.label}</a>
                )
                : (
                  <span
                    className="breadcrumb_current"
                    aria-current={current ? 'page' : undefined}
                    aria-disabled={item.disabled ? 'true' : undefined}
                  >{item.label}</span>
                )}
              {index < items.length - 1 && (
                <span className="breadcrumb_separator" aria-hidden="true">
                  {separatorGlyph}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
