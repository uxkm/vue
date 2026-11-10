'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/FooterSkeleton'

/**
 * B2B 공통 페이지 · Footer.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function Footer () {

  return (
    <>
      <Page page="b2b-common" title="Footer" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="B2B"
          folderId="common"
          folderName="공통 페이지"
          screenName="Footer"
          screenType="Page"
          screenId="B2B-COMMON-005"
          pageUrl="/b2b/common/footer"
        />
      </PageLoading>
    </>
  )
}
