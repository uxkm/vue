'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import IndexSkeleton from './skeleton/indexSkeleton'

/**
 * WEB 서비스.
 * 메뉴 메인 — 언어팩(PublishScreenStub) 적용.
 */
export default function WebServicePage () {

  const links = [
    { to: "/web/service/learning-platform", label: "서비스 > 러닝플랫폼", screenId: "WEB-SERVIC-001" },
    { to: "/web/service/learning", label: "서비스 > 러닝 서비스", screenId: "WEB-SERVIC-002" },
    { to: "/web/service/diagnosis", label: "서비스 > 진단 서비스", screenId: "WEB-SERVIC-003" },
    { to: "/web/service/consulting", label: "서비스 > 컨설팅 서비스", screenId: "WEB-SERVIC-004" },
    { to: "/web/service/bpo", label: "서비스 > BPO 서비스", screenId: "WEB-SERVIC-005" }
  ]

  return (
    <>
      <Page page="web-service" title="서비스 메인" />
      <PageLoading loading={false} skeleton={<IndexSkeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="service"
          folderName="서비스"
          screenName="서비스 메인"
          screenType="Index"
          screenId="WEB-SERVIC-000"
          pageUrl="/web/service"
          links={links}
        />
      </PageLoading>
    </>
  )
}
