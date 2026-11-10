'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * MOBILE 문의하기.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function MobileInsightPage () {

  const links = [
    { to: "/mobile/insight/corporate-inquiry", label: "문의하기 > 기업교육문의", screenId: "MO-INSIGH-001" },
    { to: "/mobile/insight/easy-diagnosis", label: "문의하기 > 간편 진단 & 맞춤교육 추천", screenId: "MO-INSIGH-002" }
  ]

  return (
    <>
      <Page page="mobile-insight" title="문의하기 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="insight"
          folderName="문의하기"
          screenName="문의하기 메인"
          screenType="Index"
          screenId="MO-INSIGH-000"
          pageUrl="/mobile/insight"
          links={links}
        />
      </PageLoading>
    </>
  )
}
