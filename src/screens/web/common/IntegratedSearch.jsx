'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/IntegratedSearchSkeleton'

/**
 * WEB 공통 페이지 · 통합검색.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function IntegratedSearch () {

  return (
    <>
      <Page page="web-common" title="통합검색" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="common"
          folderName="공통 페이지"
          screenName="통합검색"
          screenType="Page"
          screenId="WEB-COMMON-003"
          pageUrl="/web/common/integrated-search"
        />
      </PageLoading>
    </>
  )
}
