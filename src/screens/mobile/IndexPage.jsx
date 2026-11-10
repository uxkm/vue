'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './main/skeleton/indexSkeleton'

/**
 * MOBILE 루트 (/mobile).
 * 본문은 여기(index)에 두고, 스켈레톤 등 호출부는 main/ 에서 가져온다.
 */
export default function MobileIndexPage () {

  return (
    <>
      <Page page="mobile-main" title="메인화면 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="main"
          folderName="메인화면"
          screenName="메인화면 메인"
          screenType="Index"
          screenId="MO-MAIN-000"
          pageUrl="/mobile"
        />
      </PageLoading>
    </>
  )
}
