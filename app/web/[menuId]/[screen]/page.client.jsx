'use client'

import { useParams } from 'next/navigation'
import { RegistryPage } from '@/pages/RegistryPage'
import { webScreenLoaders, webScreenMeta } from '@/generated/registry'

/** WEB 숫자 화면. menuId/screen 으로 레지스트리 화면을 연다 */
export default function WebScreenPageClient () {
  const { menuId, screen } = useParams()
  return (
    <RegistryPage
      loaders={webScreenLoaders}
      metaMap={webScreenMeta}
      routeKey={`${menuId}/${screen}`}
    />
  )
}
