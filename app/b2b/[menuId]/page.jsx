import { b2bMenuStaticParams } from '@/lib/staticParams'
import B2bMenuPageClient from './page.client'

/** 빌드할 B2B 메뉴 주소 목록 */
export function generateStaticParams () {
  return b2bMenuStaticParams()
}

/** B2B 메뉴 서버 진입. 실제 화면은 클라이언트 RegistryPage 가 고른다 */
export default function B2bMenuPage () {
  return <B2bMenuPageClient />
}
