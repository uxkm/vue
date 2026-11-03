'use client'

import type { ReactNode } from 'react'
import { hasNodes } from '@/utils/react'
import { LAYOUT_SLOT_HIDDEN } from './layout-slot-shared'
import { LayoutHiddenHost, useLayoutSlotSync } from './LayoutContext'

export interface FooterProps {
  /** true면 AppFooter 전체를 숨김 */
  hidden?: boolean
  /** 기본 AppFooter 안의 문구만 교체 */
  content?: ReactNode
  /** content 없이 children 만 주면 푸터 전체 교체 */
  children?: ReactNode
}

/**
 * 페이지에서 AppShell 푸터를 한곳에서 제어
 *
 * @example 숨김
 * <Footer hidden />
 *
 * @example 푸터 전체 교체
 * <Footer><footer>...</footer></Footer>
 *
 * @example 기본 푸터 문구만 교체
 * <Footer content="문구" />
 */
export function Footer ({ hidden = false, content, children }: FooterProps) {
  useLayoutSlotSync((setSlot) => {
    if (hidden) {
      setSlot('footer-content', null)
      setSlot('footer', LAYOUT_SLOT_HIDDEN)
      return
    }

    if (hasNodes(content)) {
      setSlot('footer', null)
      setSlot('footer-content', content)
      return
    }

    if (hasNodes(children)) {
      setSlot('footer-content', null)
      setSlot('footer', children)
      return
    }

    setSlot('footer', null)
    setSlot('footer-content', null)
  }, ['footer', 'footer-content'])

  return <LayoutHiddenHost className="layout-footer" />
}

export default Footer
