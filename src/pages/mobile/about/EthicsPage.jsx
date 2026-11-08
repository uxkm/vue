'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/EthicsPageSkeleton'

/**
 * MOBILE 회사소개 · 윤리/준법경영.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function EthicsPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="mobile-about" title="윤리/준법경영" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="about"
          folderName="회사소개"
          screenName="윤리/준법경영"
          screenType="Page"
          screenId="MO-ABOUT-004"
          pageUrl="/mobile/about/ethics"
        />
      </PageLoading>
    </>
  )
}
