'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * WEB 문의하기.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function WebInsightPage () {

  const links = [
    { to: "/web/insight/corporate-inquiry", label: "문의하기 > 기업교육문의", screenId: "WEB-INSIGH-001" },
    { to: "/web/insight/easy-diagnosis", label: "문의하기 > 간편 진단 & 맞춤교육 추천", screenId: "WEB-INSIGH-002" }
  ]

  return (
    <>
      <Page page="web-insight" title="문의하기 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="insight"
          folderName="문의하기"
          screenName="문의하기 메인"
          screenType="Index"
          screenId="WEB-INSIGH-000"
          pageUrl="/web/insight"
          links={links}
        />
      </PageLoading>
    </>
  )
}
