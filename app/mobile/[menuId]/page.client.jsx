'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { RegistryPage } from '@/pages/RegistryPage'
import { mobileIndexLoaders, mobileIndexMeta } from '@/generated/registry'

/** 모바일 메뉴 메인. menuId 로 레지스트리 index 화면을 연다 */
export default function MobileMenuPageClient () {
  const { menuId } = useParams()
  const router = useRouter()

  // main 본문은 /mobile (pages/mobile/IndexPage.jsx). /mobile/main 은 루트로 보낸다.
  useEffect(() => {
    if (menuId === 'main') router.replace('/mobile')
  }, [menuId, router])

  if (menuId === 'main') return null

  return (
    <RegistryPage
      loaders={mobileIndexLoaders}
      metaMap={mobileIndexMeta}
      routeKey={menuId}
    />
  )
}
