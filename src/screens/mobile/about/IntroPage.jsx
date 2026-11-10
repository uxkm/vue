'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/IntroPageSkeleton'

/**
 * MOBILE 회사소개 · 멀티캠퍼스 소개.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function IntroPage () {

  return (
    <>
      <Page page="mobile-about" title="멀티캠퍼스 소개" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="about"
          folderName="회사소개"
          screenName="멀티캠퍼스 소개"
          screenType="Page"
          screenId="MO-ABOUT-001"
          pageUrl="/mobile/about/intro"
        />
      </PageLoading>
    </>
  )
}
