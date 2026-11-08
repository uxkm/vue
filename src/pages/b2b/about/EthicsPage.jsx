'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/EthicsPageSkeleton'

/**
 * B2B 회사소개 · 윤리/준법경영.
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
      <Page page="b2b-about" title="윤리/준법경영" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="about"
          folderName="회사소개"
          screenName="윤리/준법경영"
          screenType="Page"
          screenId="B2B-ABOUT-004"
          pageUrl="/b2b/about/ethics"
        />
      </PageLoading>
    </>
  )
}
