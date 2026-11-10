import { routeMetadata } from '@/lib/routeMetadata'
import { b2bScreenStaticParams } from '@/lib/staticParams'
import { RegistryPage } from '@/lib/RegistryPage'
import { b2bScreenLoaders, b2bScreenMeta } from '@/generated/registry-b2b'

// 정적 export에 등록되지 않은 경로는 개발 환경에서도 404로 처리한다.
export const dynamicParams = false

export function generateStaticParams () {
  return b2bScreenStaticParams()
}

export default async function Page ({ params }) {
  const { menuId, screen } = await params
  return <RegistryPage loaders={b2bScreenLoaders} metaMap={b2bScreenMeta} routeKey={`${menuId}/${screen}`} />
}

export async function generateMetadata ({ params }) {
  const { menuId, screen } = await params
  return routeMetadata(`/b2b/${menuId}/${screen}`)
}
