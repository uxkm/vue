'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/DiagnosisPageSkeleton'

/**
 * MOBILE 서비스 · 서비스 > 진단 서비스.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function DiagnosisPage () {

  return (
    <>
      <Page page="mobile-service" title="서비스 > 진단 서비스" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="service"
          folderName="서비스"
          screenName="서비스 > 진단 서비스"
          screenType="Page"
          screenId="MO-SERVIC-003"
          pageUrl="/mobile/service/diagnosis"
        />
      </PageLoading>
    </>
  )
}
