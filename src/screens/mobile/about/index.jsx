'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * MOBILE 회사소개.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function MobileAboutPage () {

  const links = [
    { to: "/mobile/about/intro", label: "멀티캠퍼스 소개", screenId: "MO-ABOUT-001" },
    { to: "/mobile/about/ceo", label: "CEO 인사말", screenId: "MO-ABOUT-002" },
    { to: "/mobile/about/history", label: "연혁", screenId: "MO-ABOUT-003" },
    { to: "/mobile/about/ethics", label: "윤리/준법경영", screenId: "MO-ABOUT-004" },
    { to: "/mobile/about/sustainability", label: "지속가능경영", screenId: "MO-ABOUT-005" },
    { to: "/mobile/about/investor", label: "투자자정보", screenId: "MO-ABOUT-006" },
    { to: "/mobile/about/pr", label: "홍보", screenId: "MO-ABOUT-007" }
  ]

  return (
    <>
      <Page page="mobile-about" title="회사소개 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="about"
          folderName="회사소개"
          screenName="회사소개 메인"
          screenType="Index"
          screenId="MO-ABOUT-000"
          pageUrl="/mobile/about"
          links={links}
        />
      </PageLoading>
    </>
  )
}
