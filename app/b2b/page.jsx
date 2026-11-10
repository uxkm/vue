import { routeMetadata } from '@/lib/routeMetadata'
import B2bIndexPage from '@/screens/b2b/IndexPage'

/**
 * 라우트 셸만. 화면 본문은 src/screens/b2b (app → screens 분리).
 * /b2b — B2B 첫 화면 (스켈레톤은 main/)
 */
export default function B2bPage () {
  return <B2bIndexPage />
}

export const metadata = routeMetadata('/b2b')
