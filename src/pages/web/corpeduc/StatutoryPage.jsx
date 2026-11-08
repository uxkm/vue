'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/StatutoryPageSkeleton'

/**
 * WEB 기업교육 · 기업교육 > 법정필수.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function StatutoryPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="web-corpeduc" title="기업교육 > 법정필수" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 > 법정필수"
          screenType="Page"
          screenId="WEB-CORPED-005"
          pageUrl="/web/corpeduc/statutory"
        />
      </PageLoading>
    </>
  )
}
