'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/IntegratedSearchSkeleton'

/**
 * B2B 공통 페이지 · 통합검색.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function IntegratedSearch () {

  return (
    <>
      <Page page="b2b-common" title="통합검색" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="common"
          folderName="공통 페이지"
          screenName="통합검색"
          screenType="Page"
          screenId="B2B-COMMON-003"
          pageUrl="/b2b/common/integrated-search"
        />
      </PageLoading>
    </>
  )
}
