'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/LearningPlatformPageSkeleton'

/**
 * B2B 서비스 · 서비스 > 러닝플랫폼.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function LearningPlatformPage () {

  return (
    <>
      <Page page="b2b-service" title="서비스 > 러닝플랫폼" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="service"
          folderName="서비스"
          screenName="서비스 > 러닝플랫폼"
          screenType="Page"
          screenId="B2B-SERVIC-001"
          pageUrl="/b2b/service/learning-platform"
        />
      </PageLoading>
    </>
  )
}
