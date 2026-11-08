'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/LeadershipPageSkeleton'

/**
 * B2B 기업교육 · 기업교육 > 리더십.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function LeadershipPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="b2b-corpeduc" title="기업교육 > 리더십" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 > 리더십"
          screenType="Page"
          screenId="B2B-CORPED-004"
          pageUrl="/b2b/corpeduc/leadership"
        />
      </PageLoading>
    </>
  )
}
