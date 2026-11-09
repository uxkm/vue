'use client'

import { useEffect } from 'react'

/** 브라우저 탭 기본 사이트명 */
export const SITE_NAME = '멀티캠퍼스 기업교육'

/**
 * @typedef {object} SiteTitleOptions
 * @property {string} [page] 페이지명 (탭 앞부분)
 * @property {string} [section] 섹션명 (가이드 등)
 * @property {boolean} [enabled=true] false 이면 document.title 을 바꾸지 않음
 */

/**
 * 브라우저 타이틀 조합.
 * - 없음 → 멀티캠퍼스 기업교육
 * - page만 → {page} | 멀티캠퍼스 기업교육
 * - page + section → {page} - {section} | 멀티캠퍼스 기업교육
 *
 * @param {SiteTitleOptions} [options]
 * @returns {string}
 */
export function formatSiteTitle ({ page, section } = {}) {
  const pageTitle = String(page || '').trim()
  const sectionTitle = String(section || '').trim()
  if (pageTitle && sectionTitle) {
    return `${pageTitle} - ${sectionTitle} | ${SITE_NAME}`
  }
  if (pageTitle) return `${pageTitle} | ${SITE_NAME}`
  if (sectionTitle) return `${sectionTitle} | ${SITE_NAME}`
  return SITE_NAME
}

/**
 * document.title 을 페이지에 맞게 설정하고, 떠날 때 이전 값으로 되돌린다.
 * enabled=false 이면 타이틀을 건드리지 않는다.
 *
 * @param {SiteTitleOptions} [options]
 */
export function useSiteTitle ({ page, section, enabled = true } = {}) {
  const pageTitle = page || ''
  const sectionTitle = section || ''

  useEffect(() => {
    if (!enabled) return undefined
    const prev = document.title
    document.title = formatSiteTitle({ page: pageTitle, section: sectionTitle })
    return () => {
      document.title = prev
    }
  }, [pageTitle, sectionTitle, enabled])
}
