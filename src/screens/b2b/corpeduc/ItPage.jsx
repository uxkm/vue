'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/ItPageSkeleton'

/**
 * B2B 기업교육 · 기업교육 > IT 교육.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function ItPage () {

  return (
    <>
      <Page page="b2b-corpeduc" title="기업교육 > IT 교육" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 > IT 교육"
          screenType="Page"
          screenId="B2B-CORPED-002"
          pageUrl="/b2b/corpeduc/it"
        />
      </PageLoading>
    </>
  )
}
