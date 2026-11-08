import { webScreenStaticParams } from '@/lib/staticParams'
import WebScreenPageClient from './page.client'

/** 빌드할 WEB 하위 화면 주소 목록 */
export function generateStaticParams () {
  return webScreenStaticParams()
}

/** WEB 하위 화면 서버 진입. 실제 화면은 클라이언트 RegistryPage 가 고른다 */
export default function WebScreenPage () {
  return <WebScreenPageClient />
}
