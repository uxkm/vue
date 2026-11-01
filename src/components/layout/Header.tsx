import type { ReactNode } from 'react'
import { hasNodes } from '@/utils/react'
import { LAYOUT_SLOT_HIDDEN } from './layout-slot-shared'
import { LayoutHiddenHost, useLayoutSlotSync } from './LayoutContext'

const PART_NAMES = {
  brand: 'header-brand',
  nav: 'header-nav',
  actions: 'header-actions'
} as const

const ALL_SLOTS = ['header', ...Object.values(PART_NAMES)]

export interface HeaderProps {
  /** true면 AppHeader 전체를 숨김 */
  hidden?: boolean
  brand?: ReactNode
  nav?: ReactNode
  actions?: ReactNode
  /** brand / nav / actions 없이 children 만 주면 헤더 전체 교체 */
  children?: ReactNode
}

/**
 * 페이지에서 AppShell 헤더를 한곳에서 제어
 *
 * @example 숨김
 * <Header hidden />
 *
 * @example 상단 영역만 교체
 * <Header brand={...} nav={...} actions={...} />
 *
 * @example 헤더 전체 교체
 * <Header><header>...</header></Header>
 */
export function Header ({ hidden = false, brand, nav, actions, children }: HeaderProps) {
  useLayoutSlotSync((setSlot) => {
    const parts = { brand, nav, actions }
    const keys = Object.keys(PART_NAMES) as Array<keyof typeof PART_NAMES>

    if (hidden) {
      keys.forEach((key) => setSlot(PART_NAMES[key], null))
      setSlot('header', LAYOUT_SLOT_HIDDEN)
      return
    }

    const hasParts = keys.some((key) => hasNodes(parts[key]))

    if (hasNodes(children) && !hasParts) {
      keys.forEach((key) => setSlot(PART_NAMES[key], null))
      setSlot('header', children)
      return
    }

    setSlot('header', null)
    keys.forEach((key) => {
      setSlot(PART_NAMES[key], hasNodes(parts[key]) ? parts[key] : null)
    })
  }, ALL_SLOTS)

  return <LayoutHiddenHost className="layout-header" />
}

export default Header
