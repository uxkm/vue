'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { pcIndexLoaders } from '@/views/registry'

export default function PcMenuPage () {
  const { menuId } = useParams()
  const [Comp, setComp] = useState(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    let alive = true
    const load = pcIndexLoaders[menuId]
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
