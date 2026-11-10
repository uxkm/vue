'use client'

/**
 * 접기 패널 그룹.
 * items 배열 · CollapseItem/CollapsePanel 조합 · 여러 칸 동시 열림을 지원한다.
 */

import {
  Children,
  isValidElement,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type TransitionEvent
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { Icon } from './Icon'

/** 접기 패널 값 */
export type CollapseValue = string | number

/** 접기 패널 한 칸 */
export type CollapseItemData =
  | CollapseValue
  | {
    value: CollapseValue
    /** @deprecated value 와 동일. 하위 호환 */
    key?: CollapseValue
    label?: ReactNode
    /** 트리거 안에 넣을 커스텀 노드. 있으면 label 대신 쓴다 */
    children?: ReactNode
    icon?: ReactNode
    extra?: ReactNode
    disabled?: boolean
    /** 이 칸의 패널 내용 */
    content?: ReactNode
    className?: string
    panelClassName?: string
  }

/** 정규화된 한 칸 */
interface NormalizedItem {
  value: CollapseValue
  label: ReactNode
  custom: ReactNode
  icon: ReactNode
  extra: ReactNode
  disabled: boolean
  content: ReactNode
  className: string
  panelClassName: string
}

/** Collapse(그룹) props */
export interface CollapseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** 열린 칸 value 목록(제어). 여러 칸을 동시에 열 수 있다 */
  value?: CollapseValue[]
  /** 비제어 초기 열린 칸 */
  defaultValue?: CollapseValue[]
  items?: CollapseItemData[]
  /** bordered(기본) · ghost · card → collapse_bordered · collapse_ghost · collapse_card */
  skin?: 'bordered' | 'ghost' | 'card'
  size?: 'sm' | 'md' | 'lg'
  /** slide 이면 data-effect="slide" */
  effect?: 'none' | 'slide'
  /** 트리거 내부를 커스텀 렌더 */
  renderItem?: (
    item: NormalizedItem,
    state: { open: boolean, toggle: () => void }
  ) => ReactNode
  /** 패널 본문을 커스텀 렌더 */
  renderPanel?: (
    item: NormalizedItem,
    state: { open: boolean }
  ) => ReactNode
  onChange?: (value: CollapseValue[]) => void
  /**
   * CollapseItem · CollapsePanel 자식.
   * items 에 content 가 없고 CollapsePanel 도 없으면 남은 children 은
   * 열린 칸마다 동일 슬롯으로 쓴다(동시 다수 열림 시에는 칸별 Panel/content 권장).
   */
  children?: ReactNode
}

/** CollapseItem props — 커스텀 트리거 */
export interface CollapseItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  value: CollapseValue
  label?: ReactNode
  icon?: ReactNode
  extra?: ReactNode
  disabled?: boolean
  children?: ReactNode
}

/** CollapsePanel props — 칸별 패널 */
export interface CollapsePanelProps extends HTMLAttributes<HTMLDivElement> {
  value: CollapseValue
  children?: ReactNode
}

const ITEM_TYPE = 'collapse-item'
const PANEL_TYPE = 'collapse-panel'

function normalizeItem (item: CollapseItemData): NormalizedItem {
  if (item && typeof item === 'object') {
    const value = item.value != null ? item.value : item.key
    return {
      value: value as CollapseValue,
      label: item.label != null ? item.label : value,
      custom: item.children,
      icon: item.icon,
      extra: item.extra,
      disabled: !!item.disabled,
      content: item.content,
      className: item.className || '',
      panelClassName: item.panelClassName || ''
    }
  }
  return {
    value: item as CollapseValue,
    label: String(item),
    custom: undefined,
    icon: undefined,
    extra: undefined,
    disabled: false,
    content: undefined,
    className: '',
    panelClassName: ''
  }
}

/** children 에서 CollapseItem · CollapsePanel 을 분리한다 */
function parseCompoundChildren (children: ReactNode): {
  items: NormalizedItem[]
  panels: { value: CollapseValue, content: ReactNode, className: string }[]
  rest: ReactNode[]
} {
  const items: NormalizedItem[] = []
  const panels: { value: CollapseValue, content: ReactNode, className: string }[] = []
  const rest: ReactNode[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      if (child != null && child !== false) rest.push(child)
      return
    }
    const type = (child.type as { collapseType?: string })?.collapseType
    if (type === ITEM_TYPE) {
      const props = child.props as CollapseItemProps
      items.push({
        value: props.value,
        label: props.label != null ? props.label : props.value,
        custom: props.children,
        icon: props.icon,
        extra: props.extra,
        disabled: !!props.disabled,
        content: undefined,
        className: props.className || '',
        panelClassName: ''
      })
      return
    }
    if (type === PANEL_TYPE) {
      const props = child.props as CollapsePanelProps
      panels.push({
        value: props.value,
        content: props.children,
        className: props.className || ''
      })
      return
    }
    rest.push(child)
  })

  return { items, panels, rest }
}

/**
 * 커스텀 접기 트리거 칸.
 * Collapse 자식으로 두면 목록을 구성한다. 단독으로는 DOM 을 렌더하지 않는다.
 */
export function CollapseItem (_props: CollapseItemProps): ReactElement | null {
  return null
}
CollapseItem.collapseType = ITEM_TYPE

/**
 * 커스텀 접기 패널.
 * Collapse 자식으로 두면 value 가 같을 때 표시된다. 단독으로는 DOM 을 렌더하지 않는다.
 */
export function CollapsePanel (_props: CollapsePanelProps): ReactElement | null {
  return null
}
CollapsePanel.collapseType = PANEL_TYPE

function prefersReducedMotion (): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 패널 셸.
 * effect=slide 이면 height 를 0 ↔ scrollHeight 로 전환한다.
 */
function CollapseBodyShell ({
  id,
  open,
  slide,
  labelledBy,
  className,
  children
}: {
  id: string
  open: boolean
  slide: boolean
  labelledBy: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(open)
  const [cached, setCached] = useState({ children })
  if ((open || hasNodes(children)) && cached.children !== children) {
    setCached({ children })
  }
  if ((open && !mounted) || (!slide && mounted !== open)) setMounted(open)

  const body = slide ? cached.children : children

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (!slide) {
      el.hidden = !open
      el.style.height = ''
      return
    }

    if (!mounted) return

    if (prefersReducedMotion()) {
      el.hidden = !open
      el.style.height = open ? 'auto' : ''
      if (!open) {
        const frame = requestAnimationFrame(() => setMounted(false))
        return () => cancelAnimationFrame(frame)
      }
      return
    }

    if (open) {
      el.hidden = false
      el.style.height = '0px'
      void el.offsetHeight
      el.style.height = `${el.scrollHeight}px`
      return
    }

    el.hidden = false
    el.style.height = `${el.scrollHeight}px`
    void el.offsetHeight
    el.style.height = '0px'
  }, [open, slide, mounted])

  const onTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (!slide || event.propertyName !== 'height') return
    if (event.target !== ref.current) return
    const el = ref.current
    if (!el) return
    if (open) {
      el.style.height = 'auto'
      return
    }
    el.hidden = true
    el.style.height = ''
    setMounted(false)
  }

  if (!slide && !open) return null
  if (slide && !mounted && !open) return null
  if (!hasNodes(body) && !open && !mounted) return null

  return (
    <div
      ref={ref}
      id={id}
      className={cx('collapse_body', className)}
      role="region"
      aria-labelledby={labelledBy}
      hidden={!open && !slide}
      onTransitionEnd={onTransitionEnd}
    >
      <div className="collapse_content">{body}</div>
    </div>
  )
}

/**
 * 접기 패널 그룹.
 * items 배열 · CollapseItem/CollapsePanel · 여러 칸 동시 열림 · effect=slide 를 지원한다.
 */
export function Collapse ({
  value,
  defaultValue,
  items = [],
  skin = 'bordered',
  size = 'md',
  effect = 'none',
  renderItem,
  renderPanel,
  onChange,
  children,
  className,
  ...rest
}: CollapseProps) {
  const uid = useId().replace(/:/g, '')
  const compound = parseCompoundChildren(children)
  const propItems = (items || []).map(normalizeItem)
  const normalizedItems = propItems.length ? propItems : compound.items

  const isControlled = value !== undefined
  const [innerValue, setInnerValue] = useState<CollapseValue[]>(() => {
    if (defaultValue !== undefined) return [...defaultValue]
    return normalizedItems[0] ? [normalizedItems[0].value] : []
  })
  const openValues = isControlled ? (value || []) : innerValue
  // 원본 타입 보존(1 과 '1' 충돌 방지)
  const openSet = new Set<CollapseValue>(openValues)

  const panelMap = new Map<CollapseValue, { content: ReactNode, className: string }>()
  for (const item of normalizedItems) {
    if (hasNodes(item.content)) {
      panelMap.set(item.value, {
        content: item.content,
        className: item.panelClassName
      })
    }
  }
  for (const panel of compound.panels) {
    panelMap.set(panel.value, {
      content: panel.content,
      className: panel.className
    })
  }

  const hasMultiPanel = panelMap.size > 0
  const singlePanelContent = !hasMultiPanel && compound.rest.length
    ? compound.rest
    : null
  const showPanels = hasMultiPanel || hasNodes(singlePanelContent)
  const slide = effect === 'slide'

  const setOpenValues = (next: CollapseValue[]) => {
    if (!isControlled) setInnerValue(next)
    onChange?.(next)
  }

  const toggle = (next: CollapseValue) => {
    const item = normalizedItems.find((entry) => entry.value === next)
    if (item?.disabled) return
    if (openSet.has(next)) {
      setOpenValues(openValues.filter((entry) => entry !== next))
      return
    }
    setOpenValues([...openValues, next])
  }

  const rootClass = cx(
    'collapse_group',
    skin === 'bordered' && 'collapse_bordered',
    skin === 'ghost' && 'collapse_ghost',
    skin === 'card' && 'collapse_card',
    size === 'sm' && 'collapse_sm',
    size === 'lg' && 'collapse_lg',
    className
  )

  return (
    <div
      {...rest}
      className={rootClass}
      data-effect={slide ? 'slide' : undefined}
    >
      {normalizedItems.map((item, index) => {
        const open = openSet.has(item.value)
        const triggerId = `${uid}-trigger-${index}`
        const bodyId = `${uid}-body-${index}`
        const mapped = panelMap.get(item.value)
        const panelBody = renderPanel
          ? renderPanel(item, { open })
          : hasMultiPanel
            ? mapped?.content
            : singlePanelContent
        const showItemPanel = showPanels && (
          hasMultiPanel
            ? hasNodes(panelBody) || !!renderPanel
            : hasNodes(singlePanelContent) && (slide || open)
        )

        const inner = renderItem
          ? renderItem(item, {
            open,
            toggle: () => toggle(item.value)
          })
          : (
            <>
              {hasNodes(item.icon) && (
                <span className="collapse_leading">{item.icon}</span>
              )}
              {hasNodes(item.custom)
                ? item.custom
                : <span className="collapse_label">{item.label}</span>}
              {hasNodes(item.extra) && (
                <span className="collapse_extra">{item.extra}</span>
              )}
              <Icon name="chevron-down" className="collapse_icon" />
            </>
            )

        return (
          <div
            key={String(item.value)}
            className={cx(
              'collapse_panel',
              open && 'is-open',
              item.disabled && 'is-disabled',
              item.className
            )}
          >
            <div className="collapse_header">
              <button
                type="button"
                id={triggerId}
                className="collapse_trigger"
                aria-expanded={open}
                aria-controls={showItemPanel ? bodyId : undefined}
                disabled={item.disabled}
                onClick={() => toggle(item.value)}
              >
                {inner}
              </button>
            </div>
            {showItemPanel && (
              <CollapseBodyShell
                id={bodyId}
                open={open}
                slide={slide}
                labelledBy={triggerId}
                className={mapped?.className || item.panelClassName}
              >
                {hasMultiPanel
                  ? panelBody
                  : (open ? singlePanelContent : null)}
              </CollapseBodyShell>
            )}
          </div>
        )
      })}
    </div>
  )
}

Collapse.Item = CollapseItem
Collapse.Panel = CollapsePanel

export default Collapse
