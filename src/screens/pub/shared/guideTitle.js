'use client'

/**
 * 가이드·데모 브라우저 탭 제목 모음.
 * 화면은 `@/screens/pub/shared/guideTitle` 로 import.
 */
import { useSiteTitle } from '@/lib/siteTitle'

/** 퍼블리싱 가이드·데모 구간의 탭 섹션명 */
export const GUIDE_SECTION = '퍼블리싱가이드'

export { useSiteTitle }

/**
 * 가이드·데모용 document.title.
 * section 기본값은 GUIDE_SECTION.
 *
 * @param {string} [page]
 * @param {{ section?: string, enabled?: boolean }} [options]
 */
export function useGuideTitle (page, options = {}) {
  const { section = GUIDE_SECTION, enabled } = options
  useSiteTitle({ page, section, enabled })
}
