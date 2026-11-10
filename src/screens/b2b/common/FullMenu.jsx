'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/FullMenuSkeleton'

/**
 * B2B 공통 페이지 · 전체메뉴.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function FullMenu () {

  return (
    <>
      <Page page="b2b-common" title="전체메뉴" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="common"
          folderName="공통 페이지"
          screenName="전체메뉴"
          screenType="Page"
          screenId="B2B-COMMON-002"
          pageUrl="/b2b/common/full-menu"
        />
      </PageLoading>
    </>
  )
}
