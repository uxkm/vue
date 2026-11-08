'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/CeoPageSkeleton'

/**
 * B2B 회사소개 · CEO 인사말.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function CeoPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="b2b-about" title="CEO 인사말" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="about"
          folderName="회사소개"
          screenName="CEO 인사말"
          screenType="Page"
          screenId="B2B-ABOUT-002"
          pageUrl="/b2b/about/ceo"
        />
      </PageLoading>
    </>
  )
}
