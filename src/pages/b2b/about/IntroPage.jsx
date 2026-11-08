'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/IntroPageSkeleton'

/**
 * B2B 회사소개 · 멀티캠퍼스 소개.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function IntroPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="b2b-about" title="멀티캠퍼스 소개" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="about"
          folderName="회사소개"
          screenName="멀티캠퍼스 소개"
          screenType="Page"
          screenId="B2B-ABOUT-001"
          pageUrl="/b2b/about/intro"
        />
      </PageLoading>
    </>
  )
}
