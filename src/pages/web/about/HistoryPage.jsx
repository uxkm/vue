'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/HistoryPageSkeleton'

/**
 * WEB 회사소개 · 연혁.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function HistoryPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="web-about" title="연혁" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="about"
          folderName="회사소개"
          screenName="연혁"
          screenType="Page"
          screenId="WEB-ABOUT-003"
          pageUrl="/web/about/history"
        />
      </PageLoading>
    </>
  )
}
