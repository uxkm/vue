'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/SitemapSkeleton'

/**
 * B2B 공통 페이지 · 사이트맵.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function Sitemap () {

  return (
    <>
      <Page page="b2b-common" title="사이트맵" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="common"
          folderName="공통 페이지"
          screenName="사이트맵"
          screenType="Page"
          screenId="B2B-COMMON-004"
          pageUrl="/b2b/common/sitemap"
        />
      </PageLoading>
    </>
  )
}
