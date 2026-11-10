import { routeMetadata } from '@/lib/routeMetadata'
import { webScreenStaticParams } from '@/lib/staticParams'
import { RegistryPage } from '@/lib/RegistryPage'
import { webScreenLoaders, webScreenMeta } from '@/generated/registry-web'

// 정적 export에 등록되지 않은 경로는 개발 환경에서도 404로 처리한다.
export const dynamicParams = false

export function generateStaticParams () {
  return webScreenStaticParams()
}

export default async function Page ({ params }) {
  const { menuId, screen } = await params
  return <RegistryPage loaders={webScreenLoaders} metaMap={webScreenMeta} routeKey={`${menuId}/${screen}`} />
}

export async function generateMetadata ({ params }) {
  const { menuId, screen } = await params
  return routeMetadata(`/web/${menuId}/${screen}`)
}
