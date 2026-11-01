import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

export type TypographyVariant =
  | 'text' | 'paragraph' | 'lead' | 'caption' | 'label' | 'overline'
  | 'code' | 'kbd' | 'pre' | 'strong' | 'italic' | 'underline' | 'delete'
  | 'mark' | 'sub' | 'sup' | 'small' | 'link' | 'blockquote'
export type TypographyColor = 'primary' | 'muted' | 'success' | 'warning' | 'danger' | 'info' | 'default'
export type TypographySize = 'xs' | 'sm' | 'lg' | 'xl'

const TITLE_TAGS: Record<number, string> = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5' }

const VARIANT_CLASS: Record<string, string> = {
  text: '',
  paragraph: 'typo_paragraph',
  lead: 'typo_lead',
  caption: 'typo_caption',
  label: 'typo_label',
  overline: 'typo_overline',
  code: 'typo_code',
  kbd: 'typo_kbd',
  pre: 'typo_pre',
  strong: 'typo_strong',
  italic: 'typo_italic',
  underline: 'typo_underline',
  delete: 'typo_delete',
  mark: 'typo_mark',
  sub: 'typo_sub',
  sup: 'typo_sup',
  small: 'typo_small',
  link: 'typo_link',
  blockquote: 'typo_blockquote'
}

const VARIANT_TAG: Record<string, string> = {
  paragraph: 'p',
  lead: 'p',
  caption: 'p',
  label: 'label',
  overline: 'p',
  code: 'code',
  kbd: 'kbd',
  pre: 'pre',
  strong: 'strong',
  italic: 'em',
  underline: 'u',
  delete: 'del',
  mark: 'mark',
  sub: 'sub',
  sup: 'sup',
  small: 'small',
  link: 'a',
  blockquote: 'blockquote'
}

export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  tag?: string
  level?: number | string
  variant?: TypographyVariant
  color?: TypographyColor | ''
  size?: TypographySize | ''
  ellipsis?: number | string
  label?: string
  href?: string
  htmlFor?: string
  cite?: string
  /** @deprecated use color="muted" */
  muted?: boolean
  /** @deprecated use typo_* classes via variant */
  weight?: number | string
  children?: ReactNode
}

export function Typography ({
  tag = '',
  level = 0,
  variant = 'text',
  color = '',
  size = '',
  ellipsis = 0,
  label = '',
  href = '',
  htmlFor = '',
  cite = '',
  muted = false,
  weight = '',
  children,
  className,
  ...rest
}: TypographyProps) {
  const n = Number(level)
  const titleLevel = n >= 1 && n <= 5 ? n : 0
  const isTitle = titleLevel > 0

  let resolvedTag: string
  if (tag) resolvedTag = tag
  else if (isTitle) resolvedTag = TITLE_TAGS[titleLevel] || 'h1'
  else if (href || variant === 'link') resolvedTag = 'a'
  else resolvedTag = VARIANT_TAG[variant] || 'p'

  const resolvedColor = color || (muted ? 'muted' : '')
  const ell = Number(ellipsis)

  const typoClass = cx(
    isTitle
      ? 'typo_title-' + titleLevel
      : VARIANT_CLASS[variant] || 'typo_text',
    resolvedColor && 'color_' + resolvedColor,
    size && 'size_' + size,
    ell === 1 && 'text_ellipsis',
    ell === 2 && 'text_ellipsis-2',
    ell === 3 && 'text_ellipsis-3',
    weight !== '' && weight != null && 'is-w' + weight,
    className
  )

  return createElement(
    resolvedTag,
    {
      ...rest,
      className: typoClass,
      href: href || undefined,
      htmlFor: htmlFor || undefined,
      cite: cite || undefined
    },
    hasNodes(children) ? children : label
  )
}

export default Typography
