'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/EasyDiagnosisPageSkeleton'

/**
 * WEB 문의하기 · 문의하기 > 간편 진단 & 맞춤교육 추천.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function EasyDiagnosisPage () {

  return (
    <>
      <Page page="web-insight" title="문의하기 > 간편 진단 & 맞춤교육 추천" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="insight"
          folderName="문의하기"
          screenName="문의하기 > 간편 진단 & 맞춤교육 추천"
          screenType="Page"
          screenId="WEB-INSIGH-002"
          pageUrl="/web/insight/easy-diagnosis"
        />
      </PageLoading>
    </>
  )
}
