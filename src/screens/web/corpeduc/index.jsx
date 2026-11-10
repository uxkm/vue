'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * WEB 기업교육.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function WebCorpeducPage () {

  const links = [
    { to: "/web/corpeduc/ax", label: "기업교육 > AX 교육", screenId: "WEB-CORPED-001" },
    { to: "/web/corpeduc/it", label: "기업교육 > IT 교육", screenId: "WEB-CORPED-002" },
    { to: "/web/corpeduc/job", label: "기업교육 > 직무교육", screenId: "WEB-CORPED-003" },
    { to: "/web/corpeduc/leadership", label: "기업교육 > 리더십", screenId: "WEB-CORPED-004" },
    { to: "/web/corpeduc/statutory", label: "기업교육 > 법정필수", screenId: "WEB-CORPED-005" },
    { to: "/web/corpeduc/language", label: "기업교육 > 외국어", screenId: "WEB-CORPED-006" }
  ]

  return (
    <>
      <Page page="web-corpeduc" title="기업교육 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 메인"
          screenType="Index"
          screenId="WEB-CORPED-000"
          pageUrl="/web/corpeduc"
          links={links}
        />
      </PageLoading>
    </>
  )
}
