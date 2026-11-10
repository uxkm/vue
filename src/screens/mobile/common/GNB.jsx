'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/GNBSkeleton'

/**
 * MOBILE 공통 페이지 · GNB.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function GNB () {

  return (
    <>
      <Page page="mobile-common" title="GNB" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="common"
          folderName="공통 페이지"
          screenName="GNB"
          screenType="Page"
          screenId="MO-COMMON-001"
          pageUrl="/mobile/common/gnb"
        />
      </PageLoading>
    </>
  )
}
