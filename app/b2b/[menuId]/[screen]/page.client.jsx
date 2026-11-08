'use client'

import { useParams } from 'next/navigation'
import { RegistryPage } from '@/pages/RegistryPage'
import { b2bScreenLoaders, b2bScreenMeta } from '@/generated/registry'

/** B2B 이름 화면. menuId/screen 으로 레지스트리 화면을 연다 */
export default function B2bScreenPageClient () {
  const { menuId, screen } = useParams()
  return (
    <RegistryPage
      loaders={b2bScreenLoaders}
      metaMap={b2bScreenMeta}
      routeKey={`${menuId}/${screen}`}
    />
  )
}
