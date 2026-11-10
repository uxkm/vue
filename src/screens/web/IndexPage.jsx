'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './main/skeleton/indexSkeleton'

/**
 * WEB 루트 (/web).
 * 본문은 여기(index)에 두고, 스켈레톤 등 호출부는 main/ 에서 가져온다.
 */
export default function WebIndexPage () {

  return (
    <>
      <Page page="web-main" title="메인화면 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="main"
          folderName="메인화면"
          screenName="메인화면 메인"
          screenType="Index"
          screenId="WEB-MAIN-000"
          pageUrl="/web"
        />
      </PageLoading>
    </>
  )
}
