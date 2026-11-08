import { webMenuStaticParams } from '@/lib/staticParams'
import WebMenuPageClient from './page.client'

/** 빌드할 WEB 메뉴 주소 목록 */
export function generateStaticParams () {
  return webMenuStaticParams()
}

/** WEB 메뉴 서버 진입. 실제 화면은 클라이언트 RegistryPage 가 고른다 */
export default function WebMenuPage () {
  return <WebMenuPageClient />
}
