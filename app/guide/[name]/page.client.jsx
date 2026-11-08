'use client'

import { useParams } from 'next/navigation'
import { RegistryPage } from '@/pages/RegistryPage'
import { componentLoaders, componentMeta } from '@/generated/registry'

/** /guide/:name 레지스트리 화면 — 가이드는 footer 항상 숨김 */
export default function GuideNamePageClient () {
  const { name } = useParams()
  const routeKey = Array.isArray(name) ? name[0] : name
  const meta = {
    ...(componentMeta?.[routeKey] || {}),
    footer: false
  }

  return (
    <RegistryPage
      loaders={componentLoaders}
      metaMap={{ [routeKey]: meta }}
      routeKey={routeKey}
    />
  )
}
