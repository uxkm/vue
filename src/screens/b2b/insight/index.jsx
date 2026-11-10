'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * B2B 문의하기.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function B2bInsightPage () {

  const links = [
    { to: "/b2b/insight/corporate-inquiry", label: "문의하기 > 기업교육문의", screenId: "B2B-INSIGH-001" },
    { to: "/b2b/insight/easy-diagnosis", label: "문의하기 > 간편 진단 & 맞춤교육 추천", screenId: "B2B-INSIGH-002" }
  ]

  return (
    <>
      <Page page="b2b-insight" title="문의하기 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="insight"
          folderName="문의하기"
          screenName="문의하기 메인"
          screenType="Index"
          screenId="B2B-INSIGH-000"
          pageUrl="/b2b/insight"
          links={links}
        />
      </PageLoading>
    </>
  )
}
