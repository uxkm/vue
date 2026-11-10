'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/CeoPageSkeleton'

/**
 * MOBILE 회사소개 · CEO 인사말.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function CeoPage () {

  return (
    <>
      <Page page="mobile-about" title="CEO 인사말" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="about"
          folderName="회사소개"
          screenName="CEO 인사말"
          screenType="Page"
          screenId="MO-ABOUT-002"
          pageUrl="/mobile/about/ceo"
        />
      </PageLoading>
    </>
  )
}
