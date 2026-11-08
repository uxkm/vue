'use client'

import { useParams } from 'next/navigation'
import { RegistryPage } from '@/pages/RegistryPage'
import { mobileScreenLoaders, mobileScreenMeta } from '@/generated/registry'

/** 모바일 숫자 화면. menuId/screen 으로 레지스트리 화면을 연다 */
export default function MobileScreenPageClient () {
  const { menuId, screen } = useParams()
  return (
    <RegistryPage
      loaders={mobileScreenLoaders}
      metaMap={mobileScreenMeta}
      routeKey={`${menuId}/${screen}`}
    />
  )
}
