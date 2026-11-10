'use client'

import { useEffect, type RefObject } from 'react'
import { useLatestRef } from './useLatestRef'

/** 패널 내부에서 발생한 Escape를 처리하고 바깥 레이어로 전파하지 않는다. */
export function useEscapeKey (ref: RefObject<HTMLElement | null>, onEscape: () => void, enabled = true) {
  const callback = useLatestRef(onEscape)
  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      event.stopPropagation()
      callback.current()
    }
    element.addEventListener('keydown', onKeyDown)
    return () => element.removeEventListener('keydown', onKeyDown)
  }, [ref, callback, enabled])
}
