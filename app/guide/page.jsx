import { routeMetadata } from '@/lib/routeMetadata'
import GuideIndexPage from '@/screens/pub/guide/Index.jsx'

/**
 * /guide — 퍼블리싱 가이드 소개(홈)
 */
export default function GuidePage () {
  return <GuideIndexPage />
}

export const metadata = routeMetadata('/guide')
