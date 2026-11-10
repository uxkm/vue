'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/EthicsPageSkeleton'

/**
 * MOBILE 회사소개 · 윤리/준법경영.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function EthicsPage () {

  return (
    <>
      <Page page="mobile-about" title="윤리/준법경영" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="about"
          folderName="회사소개"
          screenName="윤리/준법경영"
          screenType="Page"
          screenId="MO-ABOUT-004"
          pageUrl="/mobile/about/ethics"
        />
      </PageLoading>
    </>
  )
}
