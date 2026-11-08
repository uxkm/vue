/**
 * 타이포그래피.
 * 문단·제목·코드·인용 등 글 종류·색·크기를 통일한다.
 */
import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 글 종류. 문단, 리드, 캡션, 코드, 인용 등 */
export type TypographyVariant =
  | 'text' | 'paragraph' | 'lead' | 'caption' | 'label' | 'overline'
  | 'code' | 'kbd' | 'pre' | 'strong' | 'italic' | 'underline' | 'delete'
  | 'mark' | 'sub' | 'sup' | 'small' | 'link' | 'blockquote'
/** 글자 색 */
export type TypographyColor = 'primary' | 'muted' | 'success' | 'warning' | 'danger' | 'info' | 'default'
/** 글자 크기 이름 */
export type TypographySize = 'xs' | 'sm' | 'lg' | 'xl'

/** level 1~5 를 h1~h5 로 */
const TITLE_TAGS: Record<number, string> = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5' }

/** variant 이름 → typo_* 클래스. text 는 클래스 없음 */
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

/** variant 가 정하는 기본 HTML 태그 */
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

/** 타이포그래피가 받는 값. variant 로 태그와 클래스가 정해진다 */
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

/**
 * 공통 글자.
 * variant 역할, color 색, size 크기, level 제목 단계.
 * ellipsis 가 있으면 말줄임이다.
 */
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
