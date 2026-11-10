'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/SustainabilityPageSkeleton'

/**
 * MOBILE 회사소개 · 지속가능경영.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function SustainabilityPage () {

  return (
    <>
      <Page page="mobile-about" title="지속가능경영" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="MOBILE"
          folderId="about"
          folderName="회사소개"
          screenName="지속가능경영"
          screenType="Page"
          screenId="MO-ABOUT-005"
          pageUrl="/mobile/about/sustainability"
        />
      </PageLoading>
    </>
  )
}
