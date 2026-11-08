'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/BpoPageSkeleton'

/**
 * B2B 서비스 · 서비스 > BPO 서비스.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function BpoPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="b2b-service" title="서비스 > BPO 서비스" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="service"
          folderName="서비스"
          screenName="서비스 > BPO 서비스"
          screenType="Page"
          screenId="B2B-SERVIC-005"
          pageUrl="/b2b/service/bpo"
        />
      </PageLoading>
    </>
  )
}
