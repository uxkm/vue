'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/CorporateInquiryPageSkeleton'

/**
 * WEB 문의하기 · 문의하기 > 기업교육문의.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function CorporateInquiryPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="web-insight" title="문의하기 > 기업교육문의" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="insight"
          folderName="문의하기"
          screenName="문의하기 > 기업교육문의"
          screenType="Page"
          screenId="WEB-INSIGH-001"
          pageUrl="/web/insight/corporate-inquiry"
        />
      </PageLoading>
    </>
  )
}
