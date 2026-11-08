'use client'

import WebIndexPage from '@/pages/web/IndexPage'

/**
 * 라우트 셸만. 화면 본문은 src/pages/web (app → pages 분리).
 * /web — WEB 첫 화면 (스켈레톤은 main/)
 */
export default function WebPage () {
  return <WebIndexPage />
}
