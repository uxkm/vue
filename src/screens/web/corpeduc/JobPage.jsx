'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/JobPageSkeleton'

/**
 * WEB 기업교육 · 기업교육 > 직무교육.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function JobPage () {

  return (
    <>
      <Page page="web-corpeduc" title="기업교육 > 직무교육" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 > 직무교육"
          screenType="Page"
          screenId="WEB-CORPED-003"
          pageUrl="/web/corpeduc/job"
        />
      </PageLoading>
    </>
  )
}
