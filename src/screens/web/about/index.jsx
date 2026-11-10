'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * WEB 회사소개.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function WebAboutPage () {

  const links = [
    { to: "/web/about/intro", label: "멀티캠퍼스 소개", screenId: "WEB-ABOUT-001" },
    { to: "/web/about/ceo", label: "CEO 인사말", screenId: "WEB-ABOUT-002" },
    { to: "/web/about/history", label: "연혁", screenId: "WEB-ABOUT-003" },
    { to: "/web/about/ethics", label: "윤리/준법경영", screenId: "WEB-ABOUT-004" },
    { to: "/web/about/sustainability", label: "지속가능경영", screenId: "WEB-ABOUT-005" },
    { to: "/web/about/investor", label: "투자자정보", screenId: "WEB-ABOUT-006" },
    { to: "/web/about/pr", label: "홍보", screenId: "WEB-ABOUT-007" }
  ]

  return (
    <>
      <Page page="web-about" title="회사소개 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="about"
          folderName="회사소개"
          screenName="회사소개 메인"
          screenType="Index"
          screenId="WEB-ABOUT-000"
          pageUrl="/web/about"
          links={links}
        />
      </PageLoading>
    </>
  )
}
