import type { ReactNode } from 'react'
import { LAYOUT_SLOT_HIDDEN } from './layout-slot-shared'
import { LayoutHiddenHost, useLayoutSlotSync } from './LayoutContext'

export { LAYOUT_SLOT_HIDDEN }

export interface LayoutSlotProps {
  /** header, header-brand, header-nav, header-actions, footer, footer-content */
  name: string
  hidden?: boolean
  children?: ReactNode
}

/**
 * 저수준 슬롯 등록 (세분 제어용)
 * 일반 페이지는 Header / Footer 컴포넌트 사용을 권장
 */
export function LayoutSlot ({ name, hidden = false, children }: LayoutSlotProps) {
  useLayoutSlotSync((setSlot) => {
    if (hidden) {
      setSlot(name, LAYOUT_SLOT_HIDDEN)
      return
    }
    setSlot(name, children ?? null)
  }, [name])

  return <LayoutHiddenHost className="layout-slot" />
}

export default LayoutSlot
