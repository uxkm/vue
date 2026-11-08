import { b2bScreenStaticParams } from '@/lib/staticParams'
import B2bScreenPageClient from './page.client'

/** 빌드할 B2B 하위 화면 주소 목록 */
export function generateStaticParams () {
  return b2bScreenStaticParams()
}

/** B2B 하위 화면 서버 진입 */
export default function B2bScreenPage () {
  return <B2bScreenPageClient />
}
