'use client'

/**
 * 탭.
 * tabs 배열 · Tab/TabPanel 조합 · renderTab/renderPanel 로 메뉴·패널을 구성한다.
 */

import {
  Children,
  isValidElement,
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { Icon, type IconColor } from './Icon'

/** 탭 값. 문자 또는 숫자 */
export type TabValue = string | number

/** 탭 한 칸. value, label, 패널 content, 아이콘, 닫기 여부 */
export type TabItem =
  | TabValue
  | {
    value: TabValue
    label?: ReactNode
    /** 탭 메뉴 안에 넣을 커스텀 노드. 있으면 label 대신 쓴다 */
    children?: ReactNode
    icon?: ReactNode
    disabled?: boolean
    closable?: boolean
    closeLabel?: string
    /** 이 탭의 패널 내용 */
    content?: ReactNode
    className?: string
    panelClassName?: string
  }

/** renderTab 에 전달되는 상태 */
export interface TabRenderState {
  active: boolean
  disabled: boolean
  select: () => void
  close?: () => void
}

/** 정규화된 탭 한 칸 */
interface NormalizedTab {
  value: TabValue
  label: ReactNode
  custom: ReactNode
  icon: ReactNode
  disabled: boolean
  closable: boolean
  closeLabel: string
  content: ReactNode
  className: string
  panelClassName: string
}

/** 탭이 받는 값. value 와 onChange */
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onInput'> {
  value?: TabValue
  /** 비제어 초기 활성 탭. 생략 시 첫 사용 가능 탭 */
  defaultValue?: TabValue
  tabs?: TabItem[]
  /** line(기본) · card · pill → tabs_line · tabs_card · tabs_pill */
  variant?: 'line' | 'card' | 'pill'
  size?: 'sm' | 'md' | 'lg'
  /** auto · equal(균등) · scroll(이전/다음 네비 스크롤) */
  layout?: 'auto' | 'equal' | 'scroll'
  /** tabs_vertical */
  vertical?: boolean
  /** layout=auto 에서 가로 스크롤만. tabs_scrollable */
  scrollable?: boolean
  /**
   * 슬라이딩 인디케이터(tabs_indicator-slide).
   * line · pill 에서 활성 탭을 따라 이동하는 tabs_indicator 를 쓴다.
   */
  indicatorSlide?: boolean
  /**
   * layout=scroll 일 때 좌·우 가장자리 딤(is-fade-start · is-fade-end).
   * 기본 false.
   */
  navFade?: boolean
  /**
   * layout=scroll 일 때 이전/다음 클릭으로 인접 탭을 선택.
   * false(기본)면 목록만 가로 스크롤한다.
   */
  navSelect?: boolean
  /** 좌·우 네비 Icon button 스킨. outline(기본) · ghost · soft → tabs_nav-* */
  navVariant?: 'outline' | 'ghost' | 'soft'
  /** 좌·우 네비 Icon color. primary · muted 등 */
  navColor?: IconColor | ''
  /** 좌·우 네비에 추가할 클래스 */
  navClassName?: string
  /** 모든 탭에 닫기 버튼 */
  closable?: boolean
  /** tabs_bar 오른쪽 부가 영역 */
  extra?: ReactNode
  /** tablist aria-label */
  label?: string
  /** 탭 버튼 내부를 커스텀 렌더 */
  renderTab?: (tab: NormalizedTab, state: TabRenderState) => ReactNode
  /** 패널 본문을 커스텀 렌더. 멀티 패널일 때 항목마다 호출 */
  renderPanel?: (tab: NormalizedTab, state: { active: boolean }) => ReactNode
  /** 활성 탭 변경 — (value) */
  onChange?: (value: TabValue) => void
  /** onChange 와 동일 시그니처 (하위 호환) */
  onInput?: (value: TabValue) => void
  onClose?: (value: TabValue) => void
  /**
   * Tab · TabPanel 자식, 또는 단일 활성 패널 내용.
   * tabs 에 content 가 없고 TabPanel 도 없으면 children 을 활성 패널로 쓴다.
   */
  children?: ReactNode
}

/** Tab 컴포넌트 props — 커스텀 탭 메뉴 */
export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'value'> {
  value: TabValue
  label?: ReactNode
  icon?: ReactNode
  disabled?: boolean
  closable?: boolean
  closeLabel?: string
  children?: ReactNode
}

/** TabPanel 컴포넌트 props — 커스텀 탭 패널 */
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: TabValue
  children?: ReactNode
}

const TAB_TYPE = 'tabs-tab'
const PANEL_TYPE = 'tabs-panel'

/** --tabs-indicator-height 파싱. 없으면 2 */
function readIndicatorThickness (list: HTMLElement): number {
  const raw = getComputedStyle(list).getPropertyValue('--tabs-indicator-height').trim()
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 2
}

function normalizeItem (item: TabItem): NormalizedTab {
  if (item && typeof item === 'object') {
    return {
      value: item.value,
      label: item.label != null ? item.label : item.value,
      custom: item.children,
      icon: item.icon,
      disabled: !!item.disabled,
      closable: !!item.closable,
      closeLabel: item.closeLabel || '',
      content: item.content,
      className: item.className || '',
      panelClassName: item.panelClassName || ''
    }
  }
  return {
    value: item as TabValue,
    label: String(item),
    custom: undefined,
    icon: undefined,
    disabled: false,
    closable: false,
    closeLabel: '',
    content: undefined,
    className: '',
    panelClassName: ''
  }
}

/** children 에서 Tab · TabPanel 을 분리한다 */
function parseCompoundChildren (children: ReactNode): {
  tabs: NormalizedTab[]
  panels: { value: TabValue, content: ReactNode, className: string }[]
  rest: ReactNode[]
} {
  const tabs: NormalizedTab[] = []
  const panels: { value: TabValue, content: ReactNode, className: string }[] = []
  const rest: ReactNode[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      if (child != null && child !== false) rest.push(child)
      return
    }
    const type = (child.type as { tabsType?: string })?.tabsType
    if (type === TAB_TYPE) {
      const props = child.props as TabProps
      tabs.push({
        value: props.value,
        label: props.label != null ? props.label : props.value,
        custom: props.children,
        icon: props.icon,
        disabled: !!props.disabled,
        closable: !!props.closable,
        closeLabel: props.closeLabel || '',
        content: undefined,
        className: props.className || '',
        panelClassName: ''
      })
      return
    }
    if (type === PANEL_TYPE) {
      const props = child.props as TabPanelProps
      panels.push({
        value: props.value,
        content: props.children,
        className: props.className || ''
      })
      return
    }
    rest.push(child)
  })

  return { tabs, panels, rest }
}

/**
 * 커스텀 탭 메뉴 칸.
 * Tabs 자식으로 두면 탭 목록을 구성한다. 단독으로는 DOM 을 렌더하지 않는다.
 */
export function Tab (_props: TabProps): ReactElement | null {
  return null
}
Tab.tabsType = TAB_TYPE

/**
 * 커스텀 탭 패널.
 * Tabs 자식으로 두면 value 가 같을 때 표시된다. 단독으로는 DOM 을 렌더하지 않는다.
 */
export function TabPanel (_props: TabPanelProps): ReactElement | null {
  return null
}
TabPanel.tabsType = PANEL_TYPE

/**
 * 탭.
 * tabs 배열 · Tab/TabPanel · renderTab/renderPanel 로 메뉴와 패널을 커스텀한다.
 */
export function Tabs ({
  value: valueProp,
  defaultValue,
  tabs = [],
  variant = 'line',
  size = 'md',
  layout = 'auto',
  vertical = false,
  scrollable = false,
  indicatorSlide = false,
  navFade = false,
  navSelect = false,
  navVariant = 'outline',
  navColor = '',
  navClassName = '',
  closable = false,
  extra,
  label = '섹션',
  renderTab,
  renderPanel,
  onChange,
  onInput,
  onClose,
  children,
  className,
  ...rest
}: TabsProps) {
  const uid = useId().replace(/:/g, '')
  const listRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const indicatorReadyRef = useRef(false)
  const [scrollState, setScrollState] = useState({
    overflow: false,
    prev: false,
    next: false
  })
  const valueControlled = valueProp !== undefined
  const [innerValue, setInnerValue] = useState<TabValue | undefined>(defaultValue)

  const compound = parseCompoundChildren(children)
  const propTabs = (tabs || []).map(normalizeItem)
  const normalizedTabs = propTabs.length ? propTabs : compound.tabs

  /** 패널 소스: 항목 content · TabPanel · 나머지 children(단일 패널). 원본 타입 보존 */
  const panelMap = new Map<TabValue, { content: ReactNode, className: string }>()
  for (const tab of normalizedTabs) {
    if (hasNodes(tab.content)) {
      panelMap.set(tab.value, {
        content: tab.content,
        className: tab.panelClassName
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

  /** layout=scroll 이고 가로일 때 이전/다음 네비 */
  const scrollNav = layout === 'scroll' && !vertical
  /** scrollable 단독(스크롤바) — scroll-nav 와는 별개 */
  const isScrollable = (scrollable && layout === 'auto') || (layout === 'scroll' && vertical)

  const enabledTabs = normalizedTabs.filter((tab) => !tab.disabled)
  const fallbackValue = enabledTabs[0]?.value ?? normalizedTabs[0]?.value ?? ''
  const value = valueControlled
    ? valueProp
    : (innerValue !== undefined ? innerValue : fallbackValue)
  const activeEnabledIndex = enabledTabs.findIndex((tab) => tab.value === value)
  const canSelectPrev = navSelect && activeEnabledIndex > 0
  const canSelectNext =
    navSelect && activeEnabledIndex >= 0 && activeEnabledIndex < enabledTabs.length - 1

  /** 네비 버튼 표시: 선택 모드면 탭 2개 이상, 아니면 오버플로 시 */
  const showNav = scrollNav && (
    navSelect ? enabledTabs.length > 1 : scrollState.overflow
  )
  const prevDisabled = navSelect ? !canSelectPrev : !scrollState.prev
  const nextDisabled = navSelect ? !canSelectNext : !scrollState.next

  /** 다른 탭을 고르면 onInput·onChange */
  const handleSelect = (next: TabValue) => {
    if (next === value) return
    if (!valueControlled) setInnerValue(next)
    onInput?.(next)
    onChange?.(next)
  }

  /** 인디케이터 위치와 스크롤 가장자리 상태를 맞춘다 */
  const updateVisualState = useCallback(() => {
    const list = listRef.current
    if (!list) return

    if (indicatorSlide) {
      const indicator = indicatorRef.current
      const active = list.querySelector<HTMLElement>(
        '.tabs_tab.is-active, .tabs_tab[aria-selected="true"]'
      )
      if (indicator && active) {
        const listRect = list.getBoundingClientRect()
        const tabRect = active.getBoundingClientRect()
        const left = tabRect.left - listRect.left + list.scrollLeft
        const top = tabRect.top - listRect.top + list.scrollTop
        const appearing = !indicatorReadyRef.current
        if (appearing) indicator.style.transition = 'none'

        if (variant === 'pill') {
          indicator.style.width = `${tabRect.width}px`
          indicator.style.height = `${tabRect.height}px`
          indicator.style.transform = `translate3d(${left}px, ${top}px, 0)`
        } else if (vertical) {
          const thickness = readIndicatorThickness(list)
          indicator.style.width = `${thickness}px`
          indicator.style.height = `${tabRect.height}px`
          indicator.style.transform = `translate3d(${left + tabRect.width - thickness}px, ${top}px, 0)`
        } else {
          const thickness = readIndicatorThickness(list)
          indicator.style.width = `${tabRect.width}px`
          indicator.style.height = `${thickness}px`
          indicator.style.transform = `translate3d(${left}px, ${top + tabRect.height - thickness}px, 0)`
        }

        indicator.style.opacity = '1'
        if (appearing) {
          void indicator.offsetWidth
          indicator.style.transition = ''
          indicatorReadyRef.current = true
        }
      } else if (indicator) {
        indicator.style.opacity = '0'
      }
    }

    const max = list.scrollWidth - list.clientWidth
    setScrollState({
      overflow: scrollNav && max > 1,
      prev: scrollNav && list.scrollLeft > 1,
      next: scrollNav && list.scrollLeft < max - 1
    })
  }, [indicatorSlide, scrollNav, variant, vertical])

  /** 활성 탭이 스크롤 뷰 중앙 근처에 오도록 */
  const scrollTabIntoView = useCallback(
    (tabValue: TabValue) => {
      const list = listRef.current
      if (!scrollNav || !list) return
      const active = [...list.querySelectorAll<HTMLElement>('.tabs_tab')].find(
        (tab) => tab.getAttribute('aria-selected') === 'true'
          || String(tabValue) === tab.dataset.value
      )
      if (!active) return
      const listRect = list.getBoundingClientRect()
      const tabRect = active.getBoundingClientRect()
      const tabLeft = tabRect.left - listRect.left + list.scrollLeft
      const max = list.scrollWidth - list.clientWidth
      list.scrollTo({
        left: Math.max(0, Math.min(tabLeft - (list.clientWidth - tabRect.width) / 2, max)),
        behavior: 'smooth'
      })
    },
    [scrollNav]
  )

  useLayoutEffect(() => {
    if (!indicatorSlide) indicatorReadyRef.current = false

    const list = listRef.current
    if (!list) return

    const schedule = () => {
      requestAnimationFrame(updateVisualState)
    }

    schedule()
    list.addEventListener('scroll', updateVisualState, { passive: true })
    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(list)
    for (const tab of list.querySelectorAll('.tabs_tab')) {
      resizeObserver.observe(tab)
    }

    return () => {
      list.removeEventListener('scroll', updateVisualState)
      resizeObserver.disconnect()
    }
  }, [
    updateVisualState,
    indicatorSlide,
    value,
    variant,
    vertical,
    normalizedTabs.length,
    size,
    layout,
    scrollNav,
    isScrollable,
    navSelect,
    navFade
  ])

  useLayoutEffect(() => {
    if (!scrollNav) return
    const frame = requestAnimationFrame(() => {
      updateVisualState()
      scrollTabIntoView(value)
    })
    return () => cancelAnimationFrame(frame)
  }, [scrollNav, value, scrollTabIntoView, updateVisualState])

  /** 이전/다음: navSelect 면 인접 탭 선택, 아니면 목록 스크롤 */
  const handleNav = (direction: -1 | 1) => {
    if (navSelect) {
      const nextIndex = activeEnabledIndex + direction
      if (nextIndex < 0 || nextIndex >= enabledTabs.length) return
      handleSelect(enabledTabs[nextIndex].value)
      return
    }
    const list = listRef.current
    if (!list) return
    list.scrollBy({
      left: direction * Math.max(list.clientWidth * 0.75, 120),
      behavior: 'smooth'
    })
  }

  const tabsClass = cx(
    'tabs',
    variant === 'line' && 'tabs_line',
    variant === 'card' && 'tabs_card',
    variant === 'pill' && 'tabs_pill',
    vertical && 'tabs_vertical',
    size === 'sm' && 'tabs_sm',
    size === 'lg' && 'tabs_lg',
    layout === 'equal' && 'tabs_equal',
    scrollNav && 'tabs_scroll-nav',
    isScrollable && 'tabs_scrollable',
    indicatorSlide && 'tabs_indicator-slide',
    navFade && 'tabs_nav-fade',
    className
  )

  const indicatorStyle: CSSProperties = {
    opacity: 0
  }

  const viewportClass = cx(
    'tabs_list-wrap',
    scrollNav && 'tabs_scroll-viewport',
    navFade && scrollState.prev && 'is-fade-start',
    navFade && scrollState.next && 'is-fade-end'
  )

  const navButtonClass = (side: 'prev' | 'next') => cx(
    'tabs_nav',
    side === 'prev' ? 'tabs_nav_prev' : 'tabs_nav_next',
    navVariant === 'outline' && 'tabs_nav-outline',
    navVariant === 'ghost' && 'tabs_nav-ghost',
    navVariant === 'soft' && 'tabs_nav-soft',
    navClassName
  )

  const showPanels = hasMultiPanel || hasNodes(singlePanelContent)

  return (
    <div {...rest} className={tabsClass}>
      <div className="tabs_bar">
        {showNav && (
          <Icon
            button
            name="chevron-left"
            size="sm"
            color={navColor || undefined}
            className={navButtonClass('prev')}
            ariaLabel="이전 탭"
            disabled={prevDisabled}
            onClick={() => handleNav(-1)}
          />
        )}
        <div className={viewportClass}>
          <div
            ref={listRef}
            className="tabs_list"
            role="tablist"
            aria-label={label}
            aria-orientation={vertical ? 'vertical' : 'horizontal'}
          >
            {indicatorSlide && (
              <span
                ref={indicatorRef}
                className="tabs_indicator"
                aria-hidden="true"
                style={indicatorStyle}
              />
            )}
            {normalizedTabs.map((tab, index) => {
              const active = tab.value === value
              const showClose = closable || tab.closable
              const tabId = `${uid}-tab-${index}`
              const panelId = `${uid}-panel-${index}`

              /** Enter·Space 로 탭 닫기 */
              const handleCloseKey = (event: KeyboardEvent<HTMLElement>) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  event.stopPropagation()
                  onClose?.(tab.value)
                }
              }

              const select = () => {
                if (tab.disabled) return
                handleSelect(tab.value)
              }

              const close = showClose
                ? () => onClose?.(tab.value)
                : undefined

              const inner = renderTab
                ? renderTab(tab, {
                  active,
                  disabled: tab.disabled,
                  select,
                  close
                })
                : (
                  <>
                    {hasNodes(tab.icon) && (
                      <span className="tabs_icon">{tab.icon}</span>
                    )}
                    {hasNodes(tab.custom)
                      ? tab.custom
                      : <span className="tabs_label">{tab.label}</span>}
                    {showClose && (
                      // <button> 중첩 방지를 위해 span[role=button]
                      <span
                        role="button"
                        tabIndex={0}
                        className="tabs_close"
                        aria-label={tab.closeLabel || '탭 닫기'}
                        onClick={(event) => {
                          event.stopPropagation()
                          onClose?.(tab.value)
                        }}
                        onKeyDown={handleCloseKey}
                      >
                        ×
                      </span>
                    )}
                  </>
                  )

              return (
                <button
                  key={String(tab.value)}
                  id={tabId}
                  type="button"
                  data-value={String(tab.value)}
                  className={cx(
                    'tabs_tab',
                    active && 'is-active',
                    tab.disabled && 'is-disabled',
                    tab.className
                  )}
                  role="tab"
                  aria-selected={active}
                  aria-controls={showPanels ? panelId : undefined}
                  aria-disabled={tab.disabled || undefined}
                  tabIndex={active ? 0 : -1}
                  disabled={tab.disabled}
                  onClick={select}
                >
                  {inner}
                </button>
              )
            })}
          </div>
        </div>
        {showNav && (
          <Icon
            button
            name="chevron-right"
            size="sm"
            color={navColor || undefined}
            className={navButtonClass('next')}
            ariaLabel="다음 탭"
            disabled={nextDisabled}
            onClick={() => handleNav(1)}
          />
        )}
        {hasNodes(extra) && <div className="tabs_extra">{extra}</div>}
      </div>
      {showPanels && (
        <div className="tabs_panels">
          {hasMultiPanel
            ? normalizedTabs.map((tab, index) => {
              const active = tab.value === value
              const mapped = panelMap.get(tab.value)
              const panelBody = renderPanel
                ? renderPanel(tab, { active })
                : mapped?.content
              if (!hasNodes(panelBody) && !mapped) return null
              return (
                <div
                  key={String(tab.value)}
                  id={`${uid}-panel-${index}`}
                  className={cx(
                    'tabs_panel',
                    active && 'is-active',
                    mapped?.className || tab.panelClassName
                  )}
                  role="tabpanel"
                  aria-labelledby={`${uid}-tab-${index}`}
                  hidden={!active}
                >
                  {panelBody}
                </div>
              )
            })
            : (
              <div
                id={`${uid}-panel-active`}
                className="tabs_panel is-active"
                role="tabpanel"
              >
                {singlePanelContent}
              </div>
              )}
        </div>
      )}
    </div>
  )
}

Tabs.Tab = Tab
Tabs.Panel = TabPanel

export default Tabs
