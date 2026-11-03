'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { mobileIndexLoaders } from '@/views/registry'

export default function MobileMenuPage () {
  const { menuId } = useParams()
  const [Comp, setComp] = useState(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    let alive = true
    const load = mobileIndexLoaders[menuId]
    if (!load) {
      setMissing(true)
      return undefined
    }
    load()
      .then((mod) => {
        if (alive) setComp(() => mod.default || mod)
      })
      .catch(() => {
        if (alive) setMissing(true)
      })
    return () => { alive = false }
  }, [menuId])

  if (missing) notFound()
  if (!Comp) return null
  return <Comp />
}
