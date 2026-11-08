/**
 * 구분선.
 * 가로·세로, dashed, 가운데/좌우 라벨을 지원한다.
 */
import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 구분선. 가로가 기본, vertical 이면 세로 */
export interface DividerProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  tag?: 'auto' | 'hr' | 'div' | 'span'
  as?: string
  vertical?: boolean
  dashed?: boolean
  plain?: boolean
  orient?: '' | 'left' | 'right'
  /** orientation 별칭 */
  orientation?: string
  label?: string
  marginY?: string
  thickness?: string
  height?: string
  children?: ReactNode
}

/**
 * 구분선.
 * vertical 이면 세로, children 이 있으면 선 가운데 문구.
 */
export function Divider ({
  tag = 'auto',
  as = '',
  vertical = false,
  dashed = false,
  plain = false,
  orient = '',
  orientation = '',
  label = '',
  marginY = '',
  thickness = '',
  height = '',
  className,
  children,
  ...rest
}: DividerProps) {
  const hasLabel = !!label || hasNodes(children)

  let rootTag: string
  if (as) rootTag = as
  else if (tag !== 'auto') rootTag = tag
  else if (hasLabel) rootTag = 'div'
  else rootTag = vertical ? 'span' : 'hr'

  const resolvedOrient = orient || orientation || ''

  const dividerClass = cx(
    'divider',
    vertical && 'divider_vertical',
    dashed && 'divider_dashed',
    plain && 'divider_plain',
    resolvedOrient && 'divider_orient-' + resolvedOrient,
    marginY && 'divider_margin-' + marginY,
    thickness && 'divider_thickness-' + thickness,
    height && 'divider_height-' + height,
    hasLabel && rootTag !== 'hr' && 'divider_with-label',
    className
  )

  const props = {
    ...rest,
    className: dividerClass,
    role: rootTag === 'hr' ? 'separator' : (vertical ? undefined : 'separator'),
    'aria-orientation': vertical ? 'vertical' : 'horizontal',
    'aria-hidden': vertical && !hasLabel ? 'true' : undefined
  }

  if (rootTag === 'hr') return createElement(rootTag, props)
  return createElement(rootTag, props, hasNodes(children) ? children : label)
}

export default Divider
