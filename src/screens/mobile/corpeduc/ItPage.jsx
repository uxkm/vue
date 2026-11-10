'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/ItPageSkeleton'

/**
 * MOBILE 기업교육 · 기업교육 > IT 교육.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function ItPage () {

  return (
    <>
      <Page page="mobile-corpeduc" title="기업교육 > IT 교육" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 > IT 교육"
          screenType="Page"
          screenId="MO-CORPED-002"
          pageUrl="/mobile/corpeduc/it"
        />
      </PageLoading>
    </>
  )
}
