'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * MOBILE 공통 페이지.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function MobileCommonPage () {

  const links = [
    { to: "/mobile/common/gnb", label: "GNB", screenId: "MO-COMMON-001" },
    { to: "/mobile/common/full-menu", label: "전체메뉴", screenId: "MO-COMMON-002" },
    { to: "/mobile/common/integrated-search", label: "통합검색", screenId: "MO-COMMON-003" },
    { to: "/mobile/common/sitemap", label: "사이트맵", screenId: "MO-COMMON-004" },
    { to: "/mobile/common/footer", label: "Footer", screenId: "MO-COMMON-005" }
  ]

  return (
    <>
      <Page page="mobile-common" title="공통 페이지 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="common"
          folderName="공통 페이지"
          screenName="공통 페이지 메인"
          screenType="Index"
          screenId="MO-COMMON-000"
          pageUrl="/mobile/common"
          links={links}
        />
      </PageLoading>
    </>
  )
}
