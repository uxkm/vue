'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/GNBSkeleton'

/**
 * WEB 공통 페이지 · GNB.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function GNB () {

  return (
    <>
      <Page page="web-common" title="GNB" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="common"
          folderName="공통 페이지"
          screenName="GNB"
          screenType="Page"
          screenId="WEB-COMMON-001"
          pageUrl="/web/common/gnb"
        />
      </PageLoading>
    </>
  )
}
