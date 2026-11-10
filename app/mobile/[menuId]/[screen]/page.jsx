import { routeMetadata } from '@/lib/routeMetadata'
import { mobileScreenStaticParams } from '@/lib/staticParams'
import { RegistryPage } from '@/lib/RegistryPage'
import { mobileScreenLoaders, mobileScreenMeta } from '@/generated/registry-mobile'

// 정적 export에 등록되지 않은 경로는 개발 환경에서도 404로 처리한다.
export const dynamicParams = false

export function generateStaticParams () {
  return mobileScreenStaticParams()
}

export default async function Page ({ params }) {
  const { menuId, screen } = await params
  return <RegistryPage loaders={mobileScreenLoaders} metaMap={mobileScreenMeta} routeKey={`${menuId}/${screen}`} />
}

export async function generateMetadata ({ params }) {
  const { menuId, screen } = await params
  return routeMetadata(`/mobile/${menuId}/${screen}`)
}
