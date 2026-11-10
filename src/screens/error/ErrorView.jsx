'use client'

import { Link } from '@/lib/router'
import { Header, Page, PageChrome } from '@/comp'

/**
 * 오류 화면 크롬.
 */
export const meta = {
  header: true,
  footer: false
}

/**
 * @param {{ error?: Error & { digest?: string }, reset?: () => void }} props
 */
export default function ErrorView ({ error, reset }) {
  const detail = error?.digest
    ? `digest: ${error.digest}`
    : (error?.message || '')

  return (
    <>
      <Page page="error" title="Error" />
      <PageChrome meta={meta} />
      <Header
        layout="inline"
        brand={<Link className="app-header__brand" to="/">Publish List</Link>}
        actions={<Link className="app-header__link" to="/pub">목록으로</Link>}
      />

      <div className="page-container error-status">
        <p className="error-status__code">Error</p>
        <h1 className="error-status__title">문제가 발생했습니다</h1>
        <p className="error-status__desc">
          화면을 표시하는 중 오류가 났습니다. 다시 시도하거나 목록으로 이동해 주세요.
        </p>
        {detail
          ? <pre className="error-status__detail">{detail}</pre>
          : null}
        <div className="error-status__actions">
          {typeof reset === 'function'
            ? (
              <button
                type="button"
                className="error-status__btn error-status__btn--primary"
                onClick={reset}
              >
                다시 시도
              </button>
              )
            : null}
          <Link className="error-status__btn" to="/pub">
            퍼블리시 목록
          </Link>
        </div>
      </div>
    </>
  )
}
