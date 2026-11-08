'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * B2B 기업교육.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function B2bCorpeducPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  const links = [
    { to: "/b2b/corpeduc/ax", label: "기업교육 > AX 교육", screenId: "B2B-CORPED-001" },
    { to: "/b2b/corpeduc/it", label: "기업교육 > IT 교육", screenId: "B2B-CORPED-002" },
    { to: "/b2b/corpeduc/job", label: "기업교육 > 직무교육", screenId: "B2B-CORPED-003" },
    { to: "/b2b/corpeduc/leadership", label: "기업교육 > 리더십", screenId: "B2B-CORPED-004" },
    { to: "/b2b/corpeduc/statutory", label: "기업교육 > 법정필수", screenId: "B2B-CORPED-005" },
    { to: "/b2b/corpeduc/language", label: "기업교육 > 외국어", screenId: "B2B-CORPED-006" }
  ]

  return (
    <>
      <Page page="b2b-corpeduc" title="기업교육 메인" />
      <PageLoading loading={loading} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 메인"
          screenType="Index"
          screenId="B2B-CORPED-000"
          pageUrl="/b2b/corpeduc"
          links={links}
        />
      </PageLoading>
    </>
  )
}
