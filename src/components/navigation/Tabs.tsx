import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

export type TabValue = string | number
export type TabItem =
  | TabValue
  | {
    value: TabValue
    label?: ReactNode
    disabled?: boolean
    closable?: boolean
    closeLabel?: string
  }

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onInput'> {
  value?: TabValue
  tabs?: TabItem[]
  variant?: 'line' | 'card' | 'pill'
  size?: 'sm' | 'md' | 'lg'
  layout?: 'auto' | 'equal' | 'scroll'
  vertical?: boolean
  scrollable?: boolean
  closable?: boolean
  extra?: ReactNode
  /** Vue `input` + `change` 대응 — (value) */
  onChange?: (value: TabValue) => void
  /** Vue `input` 이벤트 호환 */
  onInput?: (value: TabValue) => void
  onClose?: (value: TabValue) => void
  children?: ReactNode
}

export function Tabs ({
  value = '',
  tabs = [],
  variant = 'line',
  size = 'md',
  layout = 'auto',
  vertical = false,
  scrollable = false,
  closable = false,
  extra,
  onChange,
  onInput,
  onClose,
  children,
  className,
  ...rest
}: TabsProps) {
  const normalizedTabs = (tabs || []).map((item) => {
    if (item && typeof item === 'object') {
      return {
        value: item.value,
        label: item.label != null ? item.label : item.value,
        disabled: !!item.disabled,
        closable: !!item.closable,
        closeLabel: item.closeLabel || ''
      }
    }
    return {
      value: item as TabValue,
      label: String(item),
      disabled: false,
      closable: false,
      closeLabel: ''
    }
  })

  const handleSelect = (next: TabValue) => {
    if (next === value) return
    onInput?.(next)
    onChange?.(next)
  }

  const tabsClass = cx(
    'tabs',
    variant === 'card' && 'tabs_card',
    variant === 'pill' && 'tabs_pill',
    vertical && 'tabs_vertical',
    size === 'sm' && 'tabs_sm',
    size === 'lg' && 'tabs_lg',
    layout === 'equal' && 'tabs_equal',
    (layout === 'scroll' || scrollable) && 'tabs_scroll',
    className
  )

  return (
    <div {...rest} className={tabsClass}>
      <div
        className="tabs_list"
        role="tablist"
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
      >
        {normalizedTabs.map((tab) => {
          const active = tab.value === value
          const showClose = closable || tab.closable
          const handleCloseKey = (event: KeyboardEvent<HTMLElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              event.stopPropagation()
              onClose?.(tab.value)
            }
          }
          return (
            <button
              key={String(tab.value)}
              type="button"
              className={cx('tabs_tab', { 'is-active': active, 'is-disabled': tab.disabled })}
              role="tab"
              aria-selected={active ? 'true' : 'false'}
              aria-disabled={tab.disabled ? 'true' : undefined}
              tabIndex={active ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => handleSelect(tab.value)}
            >
              {tab.label}
              {showClose && (
                // <button> 중첩(invalid DOM nesting) 방지를 위해 span[role=button] 사용 (클래스 동일)
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
                >×</span>
              )}
            </button>
          )
        })}
        {hasNodes(extra) && <div className="tabs_extra">{extra}</div>}
      </div>
      <div className="tabs_panel" role="tabpanel">{children}</div>
    </div>
  )
}

export default Tabs
