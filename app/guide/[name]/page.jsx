import { routeMetadata } from '@/lib/routeMetadata'
import { componentStaticParams } from '@/lib/staticParams'
import { RegistryPage } from '@/lib/RegistryPage'
import { componentLoaders, componentMeta } from '@/generated/registry-component'

// 정적 export에 등록되지 않은 경로는 개발 환경에서도 404로 처리한다.
export const dynamicParams = false

export function generateStaticParams () {
  return componentStaticParams()
}

export default async function Page ({ params }) {
  const { name } = await params
  return <RegistryPage loaders={componentLoaders} metaMap={componentMeta} routeKey={name} meta={{ ...componentMeta[name], footer: false }} />
}

export async function generateMetadata ({ params }) {
  const { name } = await params
  return routeMetadata(`/guide/${name}`)
}
