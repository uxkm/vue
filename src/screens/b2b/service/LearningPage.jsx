'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/LearningPageSkeleton'

/**
 * B2B 서비스 · 서비스 > 러닝 서비스.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function LearningPage () {

  return (
    <>
      <Page page="b2b-service" title="서비스 > 러닝 서비스" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="service"
          folderName="서비스"
          screenName="서비스 > 러닝 서비스"
          screenType="Page"
          screenId="B2B-SERVIC-002"
          pageUrl="/b2b/service/learning"
        />
      </PageLoading>
    </>
  )
}
