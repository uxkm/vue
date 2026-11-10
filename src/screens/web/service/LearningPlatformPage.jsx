'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/LearningPlatformPageSkeleton'

/**
 * WEB 서비스 · 서비스 > 러닝플랫폼.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function LearningPlatformPage () {

  return (
    <>
      <Page page="web-service" title="서비스 > 러닝플랫폼" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="service"
          folderName="서비스"
          screenName="서비스 > 러닝플랫폼"
          screenType="Page"
          screenId="WEB-SERVIC-001"
          pageUrl="/web/service/learning-platform"
        />
      </PageLoading>
    </>
  )
}
