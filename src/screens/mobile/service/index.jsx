'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * MOBILE 서비스.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function MobileServicePage () {

  const links = [
    { to: "/mobile/service/learning-platform", label: "서비스 > 러닝플랫폼", screenId: "MO-SERVIC-001" },
    { to: "/mobile/service/learning", label: "서비스 > 러닝 서비스", screenId: "MO-SERVIC-002" },
    { to: "/mobile/service/diagnosis", label: "서비스 > 진단 서비스", screenId: "MO-SERVIC-003" },
    { to: "/mobile/service/consulting", label: "서비스 > 컨설팅 서비스", screenId: "MO-SERVIC-004" },
    { to: "/mobile/service/bpo", label: "서비스 > BPO 서비스", screenId: "MO-SERVIC-005" }
  ]

  return (
    <>
      <Page page="mobile-service" title="서비스 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="service"
          folderName="서비스"
          screenName="서비스 메인"
          screenType="Index"
          screenId="MO-SERVIC-000"
          pageUrl="/mobile/service"
          links={links}
        />
      </PageLoading>
    </>
  )
}
