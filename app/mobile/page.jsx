import { routeMetadata } from '@/lib/routeMetadata'
import MobileIndexPage from '@/screens/mobile/IndexPage'

/**
 * 라우트 셸만. 화면 본문은 src/screens/mobile (app → screens 분리).
 * /mobile — MOBILE 첫 화면 (스켈레톤은 main/)
 */
export default function MobilePage () {
  return <MobileIndexPage />
}

export const metadata = routeMetadata('/mobile')
