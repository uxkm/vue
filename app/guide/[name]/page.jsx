import { componentStaticParams } from '@/lib/staticParams'
import GuideNamePageClient from './page.client'

/** 빌드할 가이드 주소 목록 (/guide/button …) */
export function generateStaticParams () {
  return componentStaticParams()
}

/** /guide/:name — 퍼블리싱 가이드 개별 화면 */
export default function GuideNamePage () {
  return <GuideNamePageClient />
}
