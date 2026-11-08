'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/LanguagePageSkeleton'

/**
 * MOBILE 기업교육 · 기업교육 > 외국어.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function LanguagePage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="mobile-corpeduc" title="기업교육 > 외국어" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 > 외국어"
          screenType="Page"
          screenId="MO-CORPED-006"
          pageUrl="/mobile/corpeduc/language"
        />
      </PageLoading>
    </>
  )
}
