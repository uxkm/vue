'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/InvestorPageSkeleton'

/**
 * MOBILE 회사소개 · 투자자정보.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function InvestorPage () {

  return (
    <>
      <Page page="mobile-about" title="투자자정보" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="about"
          folderName="회사소개"
          screenName="투자자정보"
          screenType="Page"
          screenId="MO-ABOUT-006"
          pageUrl="/mobile/about/investor"
        />
      </PageLoading>
    </>
  )
}
