'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/PrPageSkeleton'

/**
 * MOBILE 회사소개 · 홍보.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function PrPage () {

  return (
    <>
      <Page page="mobile-about" title="홍보" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="about"
          folderName="회사소개"
          screenName="홍보"
          screenType="Page"
          screenId="MO-ABOUT-007"
          pageUrl="/mobile/about/pr"
        />
      </PageLoading>
    </>
  )
}
