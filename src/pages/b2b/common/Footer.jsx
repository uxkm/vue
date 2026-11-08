'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/FooterSkeleton'

/**
 * B2B 공통 페이지 · Footer.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function Footer () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="b2b-common" title="Footer" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
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
