'use client'

import { useEffect } from 'react'

/**
 * ref 바깥 클릭 시 handler 호출
 * @param {import('react').RefObject<HTMLElement|null>} ref
 * @param {(event: MouseEvent|TouchEvent) => void} handler
 * @param {boolean} [enabled=true]
 */
export function useClickOutside (ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined

    /** 바깥을 눌렀는지. ref 안이면 무시하고, 밖이면 handler */
    const onPointer = (event) => {
      const el = ref && ref.current
      if (!el) return
      if (el.contains(event.target)) return
      handler(event)
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
    }
  }, [ref, handler, enabled])
}

export default useClickOutside
