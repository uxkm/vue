'use client'

/**
 * 플로팅(Floating).
 * 우측(또는 지정 모서리)에 고정되는 액션 스택.
 * BackTop · 커스텀 버튼을 담으며, order 로 순서를 바꾼다.
 * BackTop 이 안에 있으면 고정 기준·배치는 Floating 이 된다.
 */

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useId,
  useMemo,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 모서리 배치 */
export type FloatingPlacement =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left'

/** 스택 방향 */
export type FloatingDirection =
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse'

/** Floating context — BackTop 등 자식이 중첩 여부를 알 때 사용 */
export interface FloatingContextValue {
  inside: boolean
  placement: FloatingPlacement
}

export const FloatingContext = createContext<FloatingContextValue>({
  inside: false,
  placement: 'bottom-right'
})

/** Floating 안에 있는지 */
export function useFloatingContext () {
  return useContext(FloatingContext)
}

/** Floating props */
export interface FloatingProps extends HTMLAttributes<HTMLDivElement> {
  /** 모서리. 기본 bottom-right(우측 하단) */
  placement?: FloatingPlacement
  /** 하단 여백(px). top-* 이면 상단 여백으로 쓴다 */
  offsetBottom?: number
  /** 우측 여백(px). *-left 이면 좌측 여백으로 쓴다 */
  offsetRight?: number
  /** 아이템 간격(px). 기본 12 */
  gap?: number
  /** flex 방향. 기본 column(위→아래, 마지막이 하단) */
  direction?: FloatingDirection
  /**
   * Floating.Item name 배열(위→아래 또는 direction 기준 시작→끝).
   * 지정하면 해당 이름 순으로 재배치하고, 나머지 name 없는 아이템은 뒤에 붙인다.
   */
  order?: string[]
  children?: ReactNode
}

/** Floating.Item props */
export interface FloatingItemProps extends HTMLAttributes<HTMLDivElement> {
  /** order 배열·정렬에 쓰는 이름 */
  name?: string
  /** CSS order. 작을수록 direction 시작쪽에 가깝다 */
  order?: number
  /**
   * true 면 렌더하지 않아 스택 자리·gap 을 비우지 않는다.
   * BackTop 미표시와 같이, 숨긴 버튼 영역이 비어 보이지 않게 할 때 쓴다.
   */
  hidden?: boolean
  children?: ReactNode
}

function placementStyle (
  placement: FloatingPlacement,
  offsetBottom: number,
  offsetRight: number
): CSSProperties {
  const y = offsetBottom
  const x = offsetRight
  switch (placement) {
    case 'bottom-left':
      return { bottom: y, left: x, top: 'auto', right: 'auto' }
    case 'top-right':
      return { top: y, right: x, bottom: 'auto', left: 'auto' }
    case 'top-left':
      return { top: y, left: x, bottom: 'auto', right: 'auto' }
    case 'bottom-right':
    default:
      return { bottom: y, right: x, top: 'auto', left: 'auto' }
  }
}

function collectItems (children: ReactNode) {
  const items: Array<{
    key: string
    name?: string
    node: ReactElement
  }> = []
  let index = 0
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    const props = child.props as FloatingItemProps
    const isItem = child.type === FloatingItem || (child.type as { displayName?: string })?.displayName === 'FloatingItem'
    if (isItem) {
      items.push({
        key: String(child.key ?? props.name ?? index),
        name: props.name,
        node: child
      })
    } else {
      // 임의 자식도 아이템으로 래핑해 순서에 포함
      items.push({
        key: String(child.key ?? `anon-${index}`),
        name: undefined,
        node: (
          <FloatingItem key={`anon-${index}`}>
            {child}
          </FloatingItem>
        )
      })
    }
    index += 1
  })
  return items
}

function sortItems (
  items: ReturnType<typeof collectItems>,
  order?: string[]
) {
  if (!order?.length) return items
  const rank = new Map(order.map((name, index) => [name, index]))
  return [...items].sort((a, b) => {
    const aRank = a.name != null && rank.has(a.name) ? rank.get(a.name)! : Number.POSITIVE_INFINITY
    const bRank = b.name != null && rank.has(b.name) ? rank.get(b.name)! : Number.POSITIVE_INFINITY
    if (aRank !== bRank) return aRank - bRank
    return 0
  })
}

/**
 * 모서리에 고정되는 플로팅 액션 스택.
 * BackTop · 버튼 등을 Floating.Item 으로 넣고 order · direction 으로 순서를 맞춘다.
 */
export function Floating ({
  placement = 'bottom-right',
  offsetBottom = 24,
  offsetRight = 24,
  gap = 12,
  direction = 'column',
  order,
  className,
  style,
  children,
  ...rest
}: FloatingProps) {
  const uid = useId().replace(/:/g, '')
  const ctx = useMemo(
    () => ({ inside: true as const, placement }),
    [placement]
  )

  const items = sortItems(collectItems(children), order)
  const place = placementStyle(placement, offsetBottom, offsetRight)

  return (
    <FloatingContext.Provider value={ctx}>
      <div
        {...rest}
        id={rest.id || `floating-${uid}`}
        className={cx('floating', className)}
        style={{
          ...place,
          gap,
          flexDirection: direction,
          ...style
        }}
        data-floating=""
        data-placement={placement}
        data-direction={direction}
        data-order={order?.length ? order.join(',') : undefined}
      >
        {items.map((item) => item.node)}
      </div>
    </FloatingContext.Provider>
  )
}

/**
 * Floating 스택의 한 칸.
 * name 으로 order 배열에 매칭하고, order 숫자로 CSS order 를 준다.
 */
export function FloatingItem ({
  name,
  order,
  hidden = false,
  className,
  style,
  children,
  ...rest
}: FloatingItemProps) {
  if (hidden || !hasNodes(children)) return null

  return (
    <div
      {...rest}
      className={cx('floating_item', className)}
      style={order != null ? { order, ...style } : style}
      data-floating-item=""
      data-name={name}
      data-order={order}
    >
      {children}
    </div>
  )
}

FloatingItem.displayName = 'FloatingItem'
Floating.Item = FloatingItem

export default Floating
