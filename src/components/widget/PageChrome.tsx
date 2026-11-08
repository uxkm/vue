'use client'

/**
 * 라우트 크롬(헤더·푸터) 표시 제어.
 * meta.header / meta.footer 의 true·false 만으로 숨김을 정한다.
 * AppLayout 이 `meta-header` / `meta-footer` 슬롯을 읽어 반영한다.
 */
import { isChromeVisible, type PageMeta } from '@/comp/shared/page-meta'
import { useLayoutSlotSync } from '@/comp/module/LayoutContext'

/** PageChrome ↔ AppLayout 크롬 표시 슬롯 */
export const META_HEADER_SLOT = 'meta-header'
export const META_FOOTER_SLOT = 'meta-footer'

/** 로딩과 본문이 같이 쓰는 크롬. meta.header/footer 가 false 면 숨긴다 */
export interface PageChromeProps {
  /**
   * 이 라우트의 크롬. (공통 PageMeta)
   * 필수 아님. 없으면 헤더·푸터를 둘 다 표시한다.
   */
  meta?: PageMeta | null
}

/**
 * 공통. meta 를 AppLayout 헤더·푸터 표시에 적용한다.
 * false 만 숨긴다. true 이거나 없으면 표시.
 * 로고·메뉴 교체는 하지 않는다. 그건 화면의 Header / Footer.
 *
 * 레지스트리 라우트는 RegistryPage 가 붙인다.
 * 404·에러처럼 레지스트리 밖 화면은 이 컴포넌트를 직접 렌더해야 한다.
 *
 * @example
 * export const meta = { header: false, footer: true }
 */
export function PageChrome ({ meta }: PageChromeProps) {
  const showHeader = isChromeVisible(meta?.header)
  const showFooter = isChromeVisible(meta?.footer)

  useLayoutSlotSync((setSlot) => {
    // 'true' | 'false' 문자열 — AppLayout 이 false 일 때만 숨김
    setSlot(META_HEADER_SLOT, showHeader ? 'true' : 'false')
    setSlot(META_FOOTER_SLOT, showFooter ? 'true' : 'false')
  }, [META_HEADER_SLOT, META_FOOTER_SLOT])

  return null
}

export default PageChrome
