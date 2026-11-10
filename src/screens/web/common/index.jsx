'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * WEB 공통 페이지.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function WebCommonPage () {

  const links = [
    { to: "/web/common/gnb", label: "GNB", screenId: "WEB-COMMON-001" },
    { to: "/web/common/full-menu", label: "전체메뉴", screenId: "WEB-COMMON-002" },
    { to: "/web/common/integrated-search", label: "통합검색", screenId: "WEB-COMMON-003" },
    { to: "/web/common/sitemap", label: "사이트맵", screenId: "WEB-COMMON-004" },
    { to: "/web/common/footer", label: "Footer", screenId: "WEB-COMMON-005" }
  ]

  return (
    <>
      <Page page="web-common" title="공통 페이지 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="common"
          folderName="공통 페이지"
          screenName="공통 페이지 메인"
          screenType="Index"
          screenId="WEB-COMMON-000"
          pageUrl="/web/common"
          links={links}
        />
      </PageLoading>
    </>
  )
}
