'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { RegistryPage } from '@/pages/RegistryPage'
import { b2bIndexLoaders, b2bIndexMeta } from '@/generated/registry'

/** B2B 메뉴 메인. menuId 로 레지스트리 index 화면을 연다 */
export default function B2bMenuPageClient () {
  const { menuId } = useParams()
  const router = useRouter()

  // main 본문은 /b2b (pages/b2b/IndexPage.jsx). /b2b/main 은 루트로 보낸다.
  useEffect(() => {
    if (menuId === 'main') router.replace('/b2b')
  }, [menuId, router])

  if (menuId === 'main') return null

  return (
    <RegistryPage
      loaders={b2bIndexLoaders}
      metaMap={b2bIndexMeta}
      routeKey={menuId}
    />
  )
}
