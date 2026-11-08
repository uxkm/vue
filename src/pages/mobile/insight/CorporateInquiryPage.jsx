'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/CorporateInquiryPageSkeleton'

/**
 * MOBILE 문의하기 · 문의하기 > 기업교육문의.
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
      <Page page="mobile-insight" title="문의하기 > 기업교육문의" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="insight"
          folderName="문의하기"
          screenName="문의하기 > 기업교육문의"
          screenType="Page"
          screenId="MO-INSIGH-001"
          pageUrl="/mobile/insight/corporate-inquiry"
        />
      </PageLoading>
    </>
  )
}
