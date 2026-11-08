'use client'

import { useEffect, useState } from 'react'

/**
 * registry 동적 import — 라우트 키 변경 시 이전 Comp 를 즉시 비워
 * 이전 페이지가 한 프레임 남는 깜빡임을 막는다.
 */
export function useRegistryView (loaders, key) {
  const [state, setState] = useState({ key, Comp: null, missing: false })

  if (state.key !== key) {
    setState({ key, Comp: null, missing: false })
  }

  useEffect(() => {
    let alive = true
    const load = loaders[key]
    if (!load) {
      setState((prev) => (prev.key === key ? { ...prev, missing: true } : prev))
      return undefined
    }
    load()
      .then((mod) => {
        if (!alive) return
        setState((prev) => (
          prev.key === key
            ? { ...prev, Comp: mod.default || mod, missing: false }
            : prev
        ))
      })
      .catch(() => {
        if (!alive) return
        setState((prev) => (prev.key === key ? { ...prev, missing: true } : prev))
      })
    return () => { alive = false }
  }, [key, loaders])

  return state
}
