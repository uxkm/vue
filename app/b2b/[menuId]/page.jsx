import { routeMetadata } from '@/lib/routeMetadata'
import { b2bMenuStaticParams } from '@/lib/staticParams'
import { RegistryPage } from '@/lib/RegistryPage'
import { b2bIndexLoaders, b2bIndexMeta } from '@/generated/registry-b2b'
import RouteRedirect from '@/comp/providers/RouteRedirect'

// 정적 export에 등록되지 않은 경로는 개발 환경에서도 404로 처리한다.
export const dynamicParams = false

export function generateStaticParams () {
  return b2bMenuStaticParams()
}

export default async function Page ({ params }) {
  const { menuId } = await params
  if (menuId === 'main') return <RouteRedirect href="/b2b" />
  return <RegistryPage loaders={b2bIndexLoaders} metaMap={b2bIndexMeta} routeKey={menuId} />
}

export async function generateMetadata ({ params }) {
  const { menuId } = await params
  return routeMetadata(`/b2b/${menuId}`)
}
