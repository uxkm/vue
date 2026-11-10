'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/EthicsPageSkeleton'

/**
 * WEB 회사소개 · 윤리/준법경영.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function EthicsPage () {

  return (
    <>
      <Page page="web-about" title="윤리/준법경영" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="about"
          folderName="회사소개"
          screenName="윤리/준법경영"
          screenType="Page"
          screenId="WEB-ABOUT-004"
          pageUrl="/web/about/ethics"
        />
      </PageLoading>
    </>
  )
}
