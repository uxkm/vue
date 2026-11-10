'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/BpoPageSkeleton'

/**
 * WEB 서비스 · 서비스 > BPO 서비스.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function BpoPage () {

  return (
    <>
      <Page page="web-service" title="서비스 > BPO 서비스" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="service"
          folderName="서비스"
          screenName="서비스 > BPO 서비스"
          screenType="Page"
          screenId="WEB-SERVIC-005"
          pageUrl="/web/service/bpo"
        />
      </PageLoading>
    </>
  )
}
