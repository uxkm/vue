'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/InvestorPageSkeleton'

/**
 * WEB 회사소개 · 투자자정보.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function InvestorPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="web-about" title="투자자정보" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="about"
          folderName="회사소개"
          screenName="투자자정보"
          screenType="Page"
          screenId="WEB-ABOUT-006"
          pageUrl="/web/about/investor"
        />
      </PageLoading>
    </>
  )
}
