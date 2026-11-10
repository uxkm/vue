'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/FooterSkeleton'

/**
 * MOBILE 공통 페이지 · Footer.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function Footer () {

  return (
    <>
      <Page page="mobile-common" title="Footer" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="common"
          folderName="공통 페이지"
          screenName="Footer"
          screenType="Page"
          screenId="MO-COMMON-005"
          pageUrl="/mobile/common/footer"
        />
      </PageLoading>
    </>
  )
}
