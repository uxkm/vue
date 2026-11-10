import { routeMetadata } from '@/lib/routeMetadata'
import { demoStaticParams } from '@/lib/staticParams'
import { RegistryPage } from '@/lib/RegistryPage'
import { demoLoaders, demoMeta } from '@/generated/registry-demo'

// 정적 export에 등록되지 않은 경로는 개발 환경에서도 404로 처리한다.
export const dynamicParams = false

export function generateStaticParams () {
  return demoStaticParams()
}

export default async function Page ({ params }) {
  const { name } = await params
  return <RegistryPage loaders={demoLoaders} metaMap={demoMeta} routeKey={name} />
}

export async function generateMetadata ({ params }) {
  const { name } = await params
  return routeMetadata(`/demo/${name}`)
}
