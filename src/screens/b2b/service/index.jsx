'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * B2B 서비스.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function B2bServicePage () {

  const links = [
    { to: "/b2b/service/learning-platform", label: "서비스 > 러닝플랫폼", screenId: "B2B-SERVIC-001" },
    { to: "/b2b/service/learning", label: "서비스 > 러닝 서비스", screenId: "B2B-SERVIC-002" },
    { to: "/b2b/service/diagnosis", label: "서비스 > 진단 서비스", screenId: "B2B-SERVIC-003" },
    { to: "/b2b/service/consulting", label: "서비스 > 컨설팅 서비스", screenId: "B2B-SERVIC-004" },
    { to: "/b2b/service/bpo", label: "서비스 > BPO 서비스", screenId: "B2B-SERVIC-005" }
  ]

  return (
    <>
      <Page page="b2b-service" title="서비스 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="service"
          folderName="서비스"
          screenName="서비스 메인"
          screenType="Index"
          screenId="B2B-SERVIC-000"
          pageUrl="/b2b/service"
          links={links}
        />
      </PageLoading>
    </>
  )
}
