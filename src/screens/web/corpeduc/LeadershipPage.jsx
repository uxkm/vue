'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/LeadershipPageSkeleton'

/**
 * WEB 기업교육 · 기업교육 > 리더십.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function LeadershipPage () {

  return (
    <>
      <Page page="web-corpeduc" title="기업교육 > 리더십" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 > 리더십"
          screenType="Page"
          screenId="WEB-CORPED-004"
          pageUrl="/web/corpeduc/leadership"
        />
      </PageLoading>
    </>
  )
}
