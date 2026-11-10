import { routeMetadata } from '@/lib/routeMetadata'
import { webMenuStaticParams } from '@/lib/staticParams'
import { RegistryPage } from '@/lib/RegistryPage'
import { webIndexLoaders, webIndexMeta } from '@/generated/registry-web'
import RouteRedirect from '@/comp/providers/RouteRedirect'

// 정적 export에 등록되지 않은 경로는 개발 환경에서도 404로 처리한다.
export const dynamicParams = false

export function generateStaticParams () {
  return webMenuStaticParams()
}

export default async function Page ({ params }) {
  const { menuId } = await params
  if (menuId === 'main') return <RouteRedirect href="/web" />
  return <RegistryPage loaders={webIndexLoaders} metaMap={webIndexMeta} routeKey={menuId} />
}

export async function generateMetadata ({ params }) {
  const { menuId } = await params
  return routeMetadata(`/web/${menuId}`)
}
