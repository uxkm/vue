'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/JobPageSkeleton'

/**
 * MOBILE 기업교육 · 기업교육 > 직무교육.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function JobPage () {

  return (
    <>
      <Page page="mobile-corpeduc" title="기업교육 > 직무교육" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 > 직무교육"
          screenType="Page"
          screenId="MO-CORPED-003"
          pageUrl="/mobile/corpeduc/job"
        />
      </PageLoading>
    </>
  )
}
