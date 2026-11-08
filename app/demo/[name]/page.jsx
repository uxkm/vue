import { demoStaticParams } from '@/lib/staticParams'
import DemoPageClient from './page.client'

/** 빌드할 데모 화면 주소 목록 */
export function generateStaticParams () {
  return demoStaticParams()
}

/** 데모 화면 서버 진입. 이름에 맞는 데모를 클라이언트가 불러온다 */
export default function DemoPage () {
  return <DemoPageClient />
}
