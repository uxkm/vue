'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/GNBSkeleton'

/**
 * B2B 공통 페이지 · GNB.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function GNB () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="b2b-common" title="GNB" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="common"
          folderName="공통 페이지"
          screenName="GNB"
          screenType="Page"
          screenId="B2B-COMMON-001"
          pageUrl="/b2b/common/gnb"
        />
      </PageLoading>
    </>
  )
}
