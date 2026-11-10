'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/StatutoryPageSkeleton'

/**
 * B2B 기업교육 · 기업교육 > 법정필수.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function StatutoryPage () {

  return (
    <>
      <Page page="b2b-corpeduc" title="기업교육 > 법정필수" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 > 법정필수"
          screenType="Page"
          screenId="B2B-CORPED-005"
          pageUrl="/b2b/corpeduc/statutory"
        />
      </PageLoading>
    </>
  )
}
