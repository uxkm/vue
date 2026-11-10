'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/SitemapSkeleton'

/**
 * MOBILE 공통 페이지 · 사이트맵.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function Sitemap () {

  return (
    <>
      <Page page="mobile-common" title="사이트맵" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="common"
          folderName="공통 페이지"
          screenName="사이트맵"
          screenType="Page"
          screenId="MO-COMMON-004"
          pageUrl="/mobile/common/sitemap"
        />
      </PageLoading>
    </>
  )
}
