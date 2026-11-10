import { routeMetadata } from '@/lib/routeMetadata'
import '@/styles/pub.scss'
import PubIndex from '@/screens/pub/IndexPage'

/**
 * 라우트 셸만. 화면 본문은 src/screens/pub (app → screens 분리).
 * /pub — 퍼블리시 목록
 */
export default function PubListPage () {
  return <PubIndex />
}

export const metadata = routeMetadata('/pub')
