'use client'

import '@/styles/index.scss'

/** 루트까지 깨졌을 때의 오류 화면. 레이아웃 없이 문서 전체를 직접 그린다 */
export default function GlobalError ({ error, reset }) {
  /** 오류 식별자 또는 메시지. 없으면 빈 문자열 */
  const detail = error?.digest
    ? `digest: ${error.digest}`
    : (error?.message || '')

  return (
    <html lang="ko">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/fonts/pretendard/pretendard.css" />
        <title>Error · Publish List</title>
      </head>
      <body>
        <main className="app-layout__main" data-page="error">
          <div className="page-container error-status">
            <p className="error-status__code">Error</p>
            <h1 className="error-status__title">앱을 불러오지 못했습니다</h1>
            <p className="error-status__desc">
              치명적인 오류가 발생했습니다. 다시 시도해 주세요.
            </p>
            {detail
              ? <pre className="error-status__detail">{detail}</pre>
              : null}
            <div className="error-status__actions">
              <button
                type="button"
                className="error-status__btn error-status__btn--primary"
                onClick={reset}
              >
                다시 시도
              </button>
              {/* global-error 는 루트 레이아웃이 깨진 상태라 Link 대신 풀 리로드 */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a className="error-status__btn" href="/">
                퍼블리시 목록
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
