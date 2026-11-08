'use client'

import { useEffect, useState } from 'react'
import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/FullMenuSkeleton'

/**
 * WEB 공통 페이지 · 전체메뉴.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function FullMenu () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Page page="web-common" title="전체메뉴" />
      <PageLoading loading={loading} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="common"
          folderName="공통 페이지"
          screenName="전체메뉴"
          screenType="Page"
          screenId="WEB-COMMON-002"
          pageUrl="/web/common/full-menu"
        />
      </PageLoading>
    </>
  )
}
