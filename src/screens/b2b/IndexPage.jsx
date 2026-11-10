'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './main/skeleton/indexSkeleton'

/**
 * B2B 루트 (/b2b).
 * 본문은 여기(index)에 두고, 스켈레톤 등 호출부는 main/ 에서 가져온다.
 */
export default function B2bIndexPage () {

  return (
    <>
      <Page page="b2b-main" title="메인화면 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="main"
          folderName="메인화면"
          screenName="메인화면 메인"
          screenType="Index"
          screenId="B2B-MAIN-000"
          pageUrl="/b2b"
        />
      </PageLoading>
    </>
  )
}
