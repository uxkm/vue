'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/LearningPlatformPageSkeleton'

/**
 * MOBILE 서비스 · 서비스 > 러닝플랫폼.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function LearningPlatformPage () {

  return (
    <>
      <Page page="mobile-service" title="서비스 > 러닝플랫폼" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="service"
          folderName="서비스"
          screenName="서비스 > 러닝플랫폼"
          screenType="Page"
          screenId="MO-SERVIC-001"
          pageUrl="/mobile/service/learning-platform"
        />
      </PageLoading>
    </>
  )
}
