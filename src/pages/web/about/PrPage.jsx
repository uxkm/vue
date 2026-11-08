'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/PrPageSkeleton'

/**
 * WEB 회사소개 · 홍보.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function PrPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="web-about" title="홍보" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="about"
          folderName="회사소개"
          screenName="홍보"
          screenType="Page"
          screenId="WEB-ABOUT-007"
          pageUrl="/web/about/pr"
        />
      </PageLoading>
    </>
  )
}
