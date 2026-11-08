'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/FooterSkeleton'

/**
 * WEB 공통 페이지 · Footer.
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
      <Page page="web-common" title="Footer" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="common"
          folderName="공통 페이지"
          screenName="Footer"
          screenType="Page"
          screenId="WEB-COMMON-005"
          pageUrl="/web/common/footer"
        />
      </PageLoading>
    </>
  )
}
