'use client'

import '@/styles/pub.scss'
import PubIndex from '@/pages/pub/IndexPage'

/**
 * 라우트 셸만. 화면 본문은 src/pages/pub (app → pages 분리).
 * /pub — 퍼블리시 목록
 */
export default function PubListPage () {
  return <PubIndex />
}
