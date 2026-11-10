'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/FullMenuSkeleton'

/**
 * MOBILE 공통 페이지 · 전체메뉴.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function FullMenu () {

  return (
    <>
      <Page page="mobile-common" title="전체메뉴" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="common"
          folderName="공통 페이지"
          screenName="전체메뉴"
          screenType="Page"
          screenId="MO-COMMON-002"
          pageUrl="/mobile/common/full-menu"
        />
      </PageLoading>
    </>
  )
}
