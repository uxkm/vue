'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * MOBILE 기업교육.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function MobileCorpeducPage () {

  const links = [
    { to: "/mobile/corpeduc/ax", label: "기업교육 > AX 교육", screenId: "MO-CORPED-001" },
    { to: "/mobile/corpeduc/it", label: "기업교육 > IT 교육", screenId: "MO-CORPED-002" },
    { to: "/mobile/corpeduc/job", label: "기업교육 > 직무교육", screenId: "MO-CORPED-003" },
    { to: "/mobile/corpeduc/leadership", label: "기업교육 > 리더십", screenId: "MO-CORPED-004" },
    { to: "/mobile/corpeduc/statutory", label: "기업교육 > 법정필수", screenId: "MO-CORPED-005" },
    { to: "/mobile/corpeduc/language", label: "기업교육 > 외국어", screenId: "MO-CORPED-006" }
  ]

  return (
    <>
      <Page page="mobile-corpeduc" title="기업교육 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 메인"
          screenType="Index"
          screenId="MO-CORPED-000"
          pageUrl="/mobile/corpeduc"
          links={links}
        />
      </PageLoading>
    </>
  )
}
