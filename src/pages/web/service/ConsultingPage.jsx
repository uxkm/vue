'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/ConsultingPageSkeleton'

/**
 * WEB 서비스 · 서비스 > 컨설팅 서비스.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function ConsultingPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="web-service" title="서비스 > 컨설팅 서비스" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="service"
          folderName="서비스"
          screenName="서비스 > 컨설팅 서비스"
          screenType="Page"
          screenId="WEB-SERVIC-004"
          pageUrl="/web/service/consulting"
        />
      </PageLoading>
    </>
  )
}
