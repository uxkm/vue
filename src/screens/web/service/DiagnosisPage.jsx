'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/DiagnosisPageSkeleton'

/**
 * WEB 서비스 · 서비스 > 진단 서비스.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function DiagnosisPage () {

  return (
    <>
      <Page page="web-service" title="서비스 > 진단 서비스" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="service"
          folderName="서비스"
          screenName="서비스 > 진단 서비스"
          screenType="Page"
          screenId="WEB-SERVIC-003"
          pageUrl="/web/service/diagnosis"
        />
      </PageLoading>
    </>
  )
}
