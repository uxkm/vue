'use client'

/**
 * 목록.
 * List · ListItem으로 불릿·번호·정의·카드형 항목을 조합한다.
 */
import {
  createContext,
  Fragment,
  useContext,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'

const VARIANT_TAG = {
  default: 'ul',
  bullet: 'ul',
  ordered: 'ol',
  definition: 'dl'
} as const

const VARIANT_CLASS: Record<string, string | undefined> = {
  bullet: 'list_bullet',
  ordered: 'list_ordered',
  definition: 'list_definition'
}

const VALID_VARIANTS = Object.keys(VARIANT_TAG)
const VALID_TAGS = ['ul', 'ol', 'dl', 'div'] as const
const VALID_ITEM_TAGS = ['li', 'dt', 'dd'] as const

type ListRootTag = (typeof VALID_TAGS)[number]
type ListVariant = keyof typeof VARIANT_TAG

interface ListContextValue {
  tag: ListRootTag
  variant: ListVariant
}

export const ListContext = createContext<ListContextValue>({
  tag: 'ul',
  variant: 'default'
})

/** List가 받는 값 */
export interface ListProps extends HTMLAttributes<HTMLElement> {
  bordered?: boolean
  split?: boolean
  block?: boolean
  size?: 'md' | 'compact'
  variant?: ListVariant
  tag?: ListRootTag
  layout?: 'block' | 'inline'
  inlineLabelWidth?: string
  inlineGap?: string
  descAlign?: 'left' | 'right'
  children?: ReactNode
}

/** ListItem이 받는 값 */
export interface ListItemProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'prefix'> {
  title?: ReactNode
  description?: ReactNode
  meta?: ReactNode
  tag?: 'auto' | 'li' | 'dt' | 'dd'
  prefix?: ReactNode
  extra?: ReactNode
  actions?: ReactNode
  children?: ReactNode
}

/**
 * 항목을 세로·인라인으로 늘어 놓는 목록.
 * variant로 기본·불릿·번호·정의를 고른다.
 */
export function List ({
  children,
  bordered = false,
  split = false,
  block = false,
  size = 'md',
  variant = 'default',
  tag,
  layout = 'block',
  inlineLabelWidth,
  inlineGap,
  descAlign = 'left',
  className,
  style,
  role,
  ...rest
}: ListProps) {
  const resolvedVariant = (VALID_VARIANTS.includes(variant) ? variant : 'default') as ListVariant
  const Root = (
    tag && VALID_TAGS.includes(tag) ? tag : VARIANT_TAG[resolvedVariant]
  ) as ListRootTag

  const classes = cx(
    'list',
    VARIANT_CLASS[resolvedVariant],
    bordered && 'list_bordered',
    split && 'list_divider',
    block && 'list_block',
    size === 'compact' && 'list_compact',
    layout === 'inline' && 'list_inline',
    resolvedVariant === 'definition' && descAlign === 'right' && 'list_desc-right',
    className
  )

  const rootStyle: CSSProperties = { ...style }
  if (layout === 'inline' && inlineLabelWidth) {
    (rootStyle as Record<string, string>)['--list-inline-label-width'] = inlineLabelWidth
  }
  if (layout === 'inline' && inlineGap) {
    (rootStyle as Record<string, string>)['--list-inline-gap'] = inlineGap
  }

  return (
    <ListContext.Provider value={{ tag: Root, variant: resolvedVariant }}>
      <Root
        {...(rest as HTMLAttributes<HTMLElement>)}
        className={classes}
        role={role ?? (Root === 'div' ? 'list' : undefined)}
        style={rootStyle}
      >
        {children}
      </Root>
    </ListContext.Provider>
  )
}

/**
 * 목록 한 항목.
 * title · description · meta와 prefix · actions를 조합한다.
 */
export function ListItem ({
  title,
  description,
  meta,
  tag = 'auto',
  prefix,
  extra,
  actions,
  children,
  className,
  role,
  ...rest
}: ListItemProps) {
  const context = useContext(ListContext)
  const definitionPair =
    tag === 'auto' && context.tag === 'dl' && Boolean(title && description)

  if (definitionPair) {
    return (
      <Fragment>
        <dt
          {...(rest as HTMLAttributes<HTMLElement>)}
          className={cx('list_title', className)}
        >
          {title}
        </dt>
        <dd className="list_desc">{description}</dd>
      </Fragment>
    )
  }

  let Root: 'li' | 'dt' | 'dd' | 'div' = 'li'
  if (tag !== 'auto' && (VALID_ITEM_TAGS as readonly string[]).includes(tag)) {
    Root = tag as 'li' | 'dt' | 'dd'
  } else if (tag === 'auto' && context.tag === 'dl') {
    Root = title ? 'dt' : 'dd'
  } else if (tag === 'auto' && context.tag === 'div') {
    Root = 'div'
  }

  const hasContent = Boolean(title || description || meta || children)

  return (
    <Root
      {...(rest as HTMLAttributes<HTMLElement>)}
      className={cx('list_item', className)}
      role={role ?? (context.tag === 'div' ? 'listitem' : undefined)}
    >
      {prefix}
      {hasContent
        ? (
          <div className="list_content">
            {children ?? (
              <>
                {title ? <span className="list_title">{title}</span> : null}
                {meta ? <span className="list_meta">{meta}</span> : null}
                {description ? <span className="list_desc">{description}</span> : null}
              </>
            )}
          </div>
          )
        : null}
      {extra ? <span className="list_extra">{extra}</span> : null}
      {actions ? <span className="list_action">{actions}</span> : null}
    </Root>
  )
}

export default List
