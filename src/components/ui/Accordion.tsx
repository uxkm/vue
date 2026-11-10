'use client'

/**
 * 아코디언.
 * items 배열 · AccordionItem/AccordionPanel 조합 · 단일 패널 슬롯으로 구성한다.
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

/** 아코디언 값 */
export type AccordionValue = string | number

/** 아코디언 한 칸. value · label · 패널 content · 비활성 */
export type AccordionItemData =
  | AccordionValue
  | {
    value: AccordionValue
    /** @deprecated value 와 동일. 하위 호환 */
    key?: AccordionValue
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
  value: AccordionValue
  label: ReactNode
  custom: ReactNode
  icon: ReactNode
  extra: ReactNode
  disabled: boolean
  content: ReactNode
  className: string
  panelClassName: string
}

/** Accordion props */
export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: AccordionValue | null
  defaultValue?: AccordionValue | null
  items?: AccordionItemData[]
  /** bordered(기본) · flush · card → accordion_bordered · accordion_flush · accordion_card */
  skin?: 'bordered' | 'flush' | 'card'
  size?: 'sm' | 'md' | 'lg'
  /** 다시 눌러 모두 접기. 기본 true */
  collapsible?: boolean
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
  onChange?: (value: AccordionValue | null) => void
  /**
   * AccordionItem · AccordionPanel 자식, 또는 단일 활성 패널 내용.
   * items 에 content 가 없고 AccordionPanel 도 없으면 children 을 열린 칸 슬롯으로 쓴다.
   */
  children?: ReactNode
}

/** AccordionItem props — 커스텀 트리거 */
export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  value: AccordionValue
  label?: ReactNode
  icon?: ReactNode
  extra?: ReactNode
  disabled?: boolean
  children?: ReactNode
}

/** AccordionPanel props — 칸별 패널 */
export interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: AccordionValue
  children?: ReactNode
}

const ITEM_TYPE = 'accordion-item'
const PANEL_TYPE = 'accordion-panel'

function normalizeItem (item: AccordionItemData): NormalizedItem {
  if (item && typeof item === 'object') {
    const value = item.value != null ? item.value : item.key
    return {
      value: value as AccordionValue,
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
    value: item as AccordionValue,
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

/** children 에서 AccordionItem · AccordionPanel 을 분리한다 */
function parseCompoundChildren (children: ReactNode): {
  items: NormalizedItem[]
  panels: { value: AccordionValue, content: ReactNode, className: string }[]
  rest: ReactNode[]
} {
  const items: NormalizedItem[] = []
  const panels: { value: AccordionValue, content: ReactNode, className: string }[] = []
  const rest: ReactNode[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      if (child != null && child !== false) rest.push(child)
      return
    }
    const type = (child.type as { accordionType?: string })?.accordionType
    if (type === ITEM_TYPE) {
      const props = child.props as AccordionItemProps
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
      const props = child.props as AccordionPanelProps
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
 * 커스텀 아코디언 트리거 칸.
 * Accordion 자식으로 두면 목록을 구성한다. 단독으로는 DOM 을 렌더하지 않는다.
 */
export function AccordionItem (_props: AccordionItemProps): ReactElement | null {
  return null
}
AccordionItem.accordionType = ITEM_TYPE

/**
 * 커스텀 아코디언 패널.
 * Accordion 자식으로 두면 value 가 같을 때 표시된다. 단독으로는 DOM 을 렌더하지 않는다.
 */
export function AccordionPanel (_props: AccordionPanelProps): ReactElement | null {
  return null
}
AccordionPanel.accordionType = PANEL_TYPE

/** prefers-reduced-motion 이면 슬라이드 없이 즉시 전환 */
function prefersReducedMotion (): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 패널 셸.
 * effect=slide 이면 height 를 0 ↔ scrollHeight 로 전환한다.
 */
function AccordionPanelShell ({
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
      className={cx('accordion_panel', className)}
      role="region"
      aria-labelledby={labelledBy}
      hidden={!open && !slide}
      onTransitionEnd={onTransitionEnd}
    >
      <div className="accordion_content">{body}</div>
    </div>
  )
}

/**
 * 아코디언.
 * items 배열 · AccordionItem/AccordionPanel · 단일 패널 슬롯으로 메뉴와 본문을 구성한다.
 */
export function Accordion ({
  value,
  defaultValue,
  items = [],
  skin = 'bordered',
  size = 'md',
  collapsible = true,
  effect = 'none',
  renderItem,
  renderPanel,
  onChange,
  children,
  className,
  ...rest
}: AccordionProps) {
  const uid = useId().replace(/:/g, '')
  const compound = parseCompoundChildren(children)
  const propItems = (items || []).map(normalizeItem)
  const normalizedItems = propItems.length ? propItems : compound.items

  const isControlled = value !== undefined
  const [innerValue, setInnerValue] = useState<AccordionValue | null>(
    defaultValue !== undefined
      ? defaultValue
      : (normalizedItems[0]?.value ?? null)
  )
  const openValue = isControlled ? value : innerValue

  // 원본 타입 보존(1 과 '1' 충돌 방지)
  const panelMap = new Map<AccordionValue, { content: ReactNode, className: string }>()
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

  const setOpen = (next: AccordionValue | null) => {
    if (!isControlled) setInnerValue(next)
    onChange?.(next)
  }

  const toggle = (next: AccordionValue) => {
    const item = normalizedItems.find((entry) => entry.value === next)
    if (item?.disabled) return
    if (openValue === next) {
      if (collapsible) setOpen(null)
      return
    }
    setOpen(next)
  }

  const rootClass = cx(
    'accordion',
    skin === 'bordered' && 'accordion_bordered',
    skin === 'flush' && 'accordion_flush',
    skin === 'card' && 'accordion_card',
    size === 'sm' && 'accordion_sm',
    size === 'lg' && 'accordion_lg',
    className
  )

  return (
    <div
      {...rest}
      className={rootClass}
      data-effect={effect === 'slide' ? 'slide' : undefined}
    >
      {normalizedItems.map((item, index) => {
        const open = openValue === item.value
        const slide = effect === 'slide'
        const triggerId = `${uid}-trigger-${index}`
        const panelId = `${uid}-panel-${index}`
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
                <span className="accordion_leading">{item.icon}</span>
              )}
              {hasNodes(item.custom)
                ? item.custom
                : <span className="accordion_label">{item.label}</span>}
              {hasNodes(item.extra) && (
                <span className="accordion_extra">{item.extra}</span>
              )}
              <Icon name="chevron-down" className="accordion_icon" />
            </>
            )

        return (
          <div
            key={String(item.value)}
            className={cx(
              'accordion_item',
              open && 'is-open',
              item.disabled && 'is-disabled',
              item.className
            )}
          >
            <div className="accordion_heading" role="heading" aria-level={3}>
              <button
                type="button"
                id={triggerId}
                className="accordion_trigger"
                aria-expanded={open}
                aria-controls={showItemPanel ? panelId : undefined}
                disabled={item.disabled}
                onClick={() => toggle(item.value)}
              >
                {inner}
              </button>
            </div>
            {showItemPanel && (
              <AccordionPanelShell
                id={panelId}
                open={open}
                slide={slide}
                labelledBy={triggerId}
                className={mapped?.className || item.panelClassName}
              >
                {hasMultiPanel
                  ? panelBody
                  : (open ? singlePanelContent : null)}
              </AccordionPanelShell>
            )}
          </div>
        )
      })}
    </div>
  )
}

Accordion.Item = AccordionItem
Accordion.Panel = AccordionPanel

export default Accordion
