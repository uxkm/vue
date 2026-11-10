'use client'

import { Page, PageLoading, PublishScreenStub } from '@/comp'
import Skeleton from './skeleton/LanguagePageSkeleton'

/**
 * WEB 기업교육 · 기업교육 > 외국어.
 * Publish stub — 언어팩(PublishScreenStub) 적용.
 */
export default function LanguagePage () {

  return (
    <>
      <Page page="web-corpeduc" title="기업교육 > 외국어" />
      <PageLoading loading={false} skeleton={<Skeleton />} className="page-container">
        <PublishScreenStub
          device="WEB"
          folderId="corpeduc"
          folderName="기업교육"
          screenName="기업교육 > 외국어"
          screenType="Page"
          screenId="WEB-CORPED-006"
          pageUrl="/web/corpeduc/language"
        />
      </PageLoading>
    </>
  )
}
