'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { pcScreenLoaders } from '@/views/registry'

export default function PcScreenPage () {
  const { menuId, screen } = useParams()
  const key = `${menuId}/${screen}`
  const [Comp, setComp] = useState(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    let alive = true
    const load = pcScreenLoaders[key]
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
  }, [key])

  if (missing) notFound()
  if (!Comp) return null
  return <Comp />
}
