'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/EasyDiagnosisPageSkeleton'

/**
 * WEB 문의하기 · 문의하기 > 간편 진단 & 맞춤교육 추천.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function EasyDiagnosisPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="web-insight" title="문의하기 > 간편 진단 & 맞춤교육 추천" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="insight"
          folderName="문의하기"
          screenName="문의하기 > 간편 진단 & 맞춤교육 추천"
          screenType="Page"
          screenId="WEB-INSIGH-002"
          pageUrl="/web/insight/easy-diagnosis"
        />
      </PageLoading>
    </>
  )
}
