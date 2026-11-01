import { useEffect, useRef, useState } from 'react'
import { bindHomeScrollFx, createStickyProgress } from '@/utils/scrollFx'

/**
 * Home 랜딩 스크롤 인터랙션 훅
 * @param {{ loading?: boolean, scrollTrackRef?: import('react').RefObject<HTMLElement|null>, onStickyProgress?: (p: number) => void }} options
 */
export function useHomeScrollFx (options = {}) {
  const { loading = false, scrollTrackRef, onStickyProgress } = options
  const [stickyProgress, setStickyProgress] = useState(0)
  const rootRef = useRef(null)

  useEffect(() => {
    if (loading) return undefined

    const host = {
      $el: rootRef.current,
      $refs: {
        scrollTrack: scrollTrackRef ? scrollTrackRef.current : null
      }
    }

    let unbindFx = null
    let unbindSticky = null

    // DOM 반영 후 바인딩
    const id = window.setTimeout(() => {
      host.$el = rootRef.current
      host.$refs.scrollTrack = scrollTrackRef ? scrollTrackRef.current : null
      unbindFx = bindHomeScrollFx(host)

      if (host.$refs.scrollTrack) {
        unbindSticky = createStickyProgress(host.$refs.scrollTrack, (p) => {
          setStickyProgress(p)
          if (typeof onStickyProgress === 'function') onStickyProgress(p)
        })
      }
    }, 0)

    return () => {
      window.clearTimeout(id)
      if (typeof unbindFx === 'function') unbindFx()
      if (typeof unbindSticky === 'function') unbindSticky()
    }
  }, [loading, scrollTrackRef, onStickyProgress])

  return { rootRef, stickyProgress }
}

export default useHomeScrollFx
