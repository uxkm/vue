import { mobileMenuStaticParams } from '@/lib/staticParams'
import MobileMenuPageClient from './page.client'

/** 빌드할 모바일 메뉴 주소 목록 */
export function generateStaticParams () {
  return mobileMenuStaticParams()
}

/** 모바일 메뉴 서버 진입. 실제 화면은 클라이언트 RegistryPage 가 고른다 */
export default function MobileMenuPage () {
  return <MobileMenuPageClient />
}
