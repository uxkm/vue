'use client'

/**
 * 본문 main 메타 슬롯.
 * data-page·className·브라우저 탭 제목(siteTitle)을 AppLayout 본문에 반영한다.
 */
import { useLayoutSlotSync } from './LayoutContext'
import { useSiteTitle } from '@/lib/siteTitle'

/** 본문 main 이 받는 값. page 식별자와 탭 제목 */
export interface PageProps {
  /** <main data-page="..."> — 페이지 식별 (login, home 등) */
  page?: string
  /** <main> 에 추가 class */
  className?: string
  /**
   * 브라우저 탭 페이지명.
   * 예) "소개" → "소개 | 멀티캠퍼스 기업교육"
   * section 과 함께면 "소개 - 퍼블리싱가이드 | 멀티캠퍼스 기업교육"
   */
  title?: string
  /** 브라우저 탭 섹션명 (가이드 등). title 과 함께 사용 */
  section?: string
}

/**
 * 공통. AppLayout 의 main 식별(data-page)과 브라우저 탭 제목.
 * 헤더·푸터를 보일지(meta)와는 별개다. 크롬을 숨겨도 Page 는 그대로 둔다.
 *
 * @example
 * <Page page="login" title="로그인" />
 *
 * @example
 * <Page page="guide-intro" title="소개" section="퍼블리싱가이드" />
 */
export function Page ({ page, className, title, section }: PageProps) {
  useLayoutSlotSync((setSlot) => {
    setSlot('main-page', page || null)
    setSlot('main-class', className || null)
  }, ['main-page', 'main-class'])

  useSiteTitle({
    page: title || '',
    section: section || '',
    enabled: Boolean(title)
  })

  return null
}

export default Page
