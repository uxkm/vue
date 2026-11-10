'use client'

import { Link } from '@/lib/router'
import { Header, Page, PageChrome } from '@/comp'

/**
 * 404 크롬.
 */
export const meta = {
  header: true,
  footer: false
}

/** 404 화면. 레지스트리 밖이라 PageChrome 에 meta 를 직접 넘긴다 */
export default function NotFoundView () {
  return (
    <>
      <Page page="error" title="404" />
      <PageChrome meta={meta} />
      <Header
        layout="inline"
        brand={<Link className="app-header__brand" to="/">Publish List</Link>}
        actions={<Link className="app-header__link" to="/pub">목록으로</Link>}
      />

      <div className="page-container error-status">
        <p className="error-status__code">404</p>
        <h1 className="error-status__title">페이지를 찾을 수 없습니다</h1>
        <p className="error-status__desc">
          요청한 주소가 없거나 이동되었습니다. URL을 확인하거나 퍼블리시 목록으로 돌아가 주세요.
        </p>
        <div className="error-status__actions">
          <Link className="error-status__btn error-status__btn--primary" to="/pub">
            퍼블리시 목록
          </Link>
          <Link className="error-status__btn" to="/web">
            WEB
          </Link>
        </div>
      </div>
    </>
  )
}
