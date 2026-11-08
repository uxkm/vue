'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { RegistryPage } from '@/pages/RegistryPage'
import { webIndexLoaders, webIndexMeta } from '@/generated/registry'

/** WEB 메뉴 메인. menuId 로 레지스트리 index 화면을 연다 */
export default function WebMenuPageClient () {
  const { menuId } = useParams()
  const router = useRouter()

  // main 본문은 /web (pages/web/IndexPage.jsx). /web/main 은 루트로 보낸다.
  useEffect(() => {
    if (menuId === 'main') router.replace('/web')
  }, [menuId, router])

  if (menuId === 'main') return null

  return (
    <RegistryPage
      loaders={webIndexLoaders}
      metaMap={webIndexMeta}
      routeKey={menuId}
    />
  )
}
