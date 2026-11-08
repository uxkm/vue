'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * B2B 회사소개.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function B2bAboutPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  const links = [
    { to: "/b2b/about/intro", label: "멀티캠퍼스 소개", screenId: "B2B-ABOUT-001" },
    { to: "/b2b/about/ceo", label: "CEO 인사말", screenId: "B2B-ABOUT-002" },
    { to: "/b2b/about/history", label: "연혁", screenId: "B2B-ABOUT-003" },
    { to: "/b2b/about/ethics", label: "윤리/준법경영", screenId: "B2B-ABOUT-004" },
    { to: "/b2b/about/sustainability", label: "지속가능경영", screenId: "B2B-ABOUT-005" },
    { to: "/b2b/about/investor", label: "투자자정보", screenId: "B2B-ABOUT-006" },
    { to: "/b2b/about/pr", label: "홍보", screenId: "B2B-ABOUT-007" }
  ]

  return (
    <>
      <Page page="b2b-about" title="회사소개 메인" />
      <PageLoading loading={loading} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="about"
          folderName="회사소개"
          screenName="회사소개 메인"
          screenType="Index"
          screenId="B2B-ABOUT-000"
          pageUrl="/b2b/about"
          links={links}
        />
      </PageLoading>
    </>
  )
}
