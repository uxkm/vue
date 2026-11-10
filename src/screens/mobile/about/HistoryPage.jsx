'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/HistoryPageSkeleton'

/**
 * MOBILE 회사소개 · 연혁.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function HistoryPage () {

  return (
    <>
      <Page page="mobile-about" title="연혁" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="about"
          folderName="회사소개"
          screenName="연혁"
          screenType="Page"
          screenId="MO-ABOUT-003"
          pageUrl="/mobile/about/history"
        />
      </PageLoading>
    </>
  )
}
