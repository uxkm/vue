'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/HistoryPageSkeleton'

/**
 * B2B 회사소개 · 연혁.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function HistoryPage () {

  return (
    <>
      <Page page="b2b-about" title="연혁" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="about"
          folderName="회사소개"
          screenName="연혁"
          screenType="Page"
          screenId="B2B-ABOUT-003"
          pageUrl="/b2b/about/history"
        />
      </PageLoading>
    </>
  )
}
