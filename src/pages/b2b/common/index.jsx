'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * B2B 공통 페이지.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function B2bCommonPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  const links = [
    { to: "/b2b/common/gnb", label: "GNB", screenId: "B2B-COMMON-001" },
    { to: "/b2b/common/full-menu", label: "전체메뉴", screenId: "B2B-COMMON-002" },
    { to: "/b2b/common/integrated-search", label: "통합검색", screenId: "B2B-COMMON-003" },
    { to: "/b2b/common/sitemap", label: "사이트맵", screenId: "B2B-COMMON-004" },
    { to: "/b2b/common/footer", label: "Footer", screenId: "B2B-COMMON-005" }
  ]

  return (
    <>
      <Page page="b2b-common" title="공통 페이지 메인" />
      <PageLoading loading={loading} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="common"
          folderName="공통 페이지"
          screenName="공통 페이지 메인"
          screenType="Index"
          screenId="B2B-COMMON-000"
          pageUrl="/b2b/common"
          links={links}
        />
      </PageLoading>
    </>
  )
}
