'use client'

/**
 * 화면별 푸터 슬롯 등록.
 * AppLayout 공통 푸터 영역에 내용을 넘긴다.
 * 보이기/숨기기는 `export const meta = { footer: true | false }` (PageChrome).
 */
import type { ReactNode } from 'react'
import { hasNodes } from '@/utils/react'
import { useLayoutSlotSync } from './LayoutContext'

/** 화면이 푸터 슬롯에 넣는 값. 표시 여부는 meta.footer */
export interface FooterProps {
  /** 기본 AppFooter 안의 문구만 교체 */
  content?: ReactNode
  /** content 없이 children 만 주면 푸터 전체 교체 */
  children?: ReactNode
}

/**
 * 공통 푸터의 내용을 화면에서 바꾼다.
 * 보일지 숨길지는 meta.footer. true 표시, false 숨김. 생략하면 표시.
 *
 * @example 공통 푸터 숨김
 * export const meta = { footer: false }
 *
 * @example 푸터 전체 교체
 * <Footer><footer>...</footer></Footer>
 *
 * @example 기본 푸터 문구만 교체
 * <Footer content="문구" />
 */
export function Footer ({ content, children }: FooterProps) {
  useLayoutSlotSync((setSlot) => {
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

  return null
}

export default Footer
