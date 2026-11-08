'use client'

/**
 * 이름 있는 레이아웃 슬롯.
 * children 을 지정한 name 으로 LayoutContext 에 등록한다 (header, footer 등).
 */
import type { ReactNode } from 'react'
import { LAYOUT_SLOT_HIDDEN } from '@/comp/shared/layout-slot'
import { useLayoutSlotSync } from './LayoutContext'

export { LAYOUT_SLOT_HIDDEN }

/** 이름 있는 슬롯. 자식이 그 이름으로 레이아웃에 등록된다 */
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

  return null
}

export default LayoutSlot
