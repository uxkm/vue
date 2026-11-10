import { routeMetadata } from '@/lib/routeMetadata'
import WebIndexPage from '@/screens/web/IndexPage'

/**
 * 라우트 셸만. 화면 본문은 src/screens/web (app → screens 분리).
 * /web — WEB 첫 화면 (스켈레톤은 main/)
 */
export default function WebPage () {
  return <WebIndexPage />
}

export const metadata = routeMetadata('/web')
