'use client'

import { useParams } from 'next/navigation'
import { RegistryPage } from '@/pages/RegistryPage'
import { demoLoaders, demoMeta } from '@/generated/registry'

/** 데모 화면. name 으로 레지스트리 화면을 연다 */
export default function DemoPageClient () {
  const { name } = useParams()
  return (
    <RegistryPage
      loaders={demoLoaders}
      metaMap={demoMeta}
      routeKey={name}
    />
  )
}
