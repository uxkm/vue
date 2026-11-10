'use client'

/**
 * useEllipsisTooltip
 * - 표 칸이 말줄임일 때만 hover 시 전체 문구 툴팁(포털) 표시
 * - 대상 요소에 ellipsisAttr(`data-ellipsis`)을 붙인다
 */
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/** 말줄임 대상 표시 */
export const ellipsisAttr = { 'data-ellipsis': '' }

function isTruncated (el) {
  return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1
}

export function useEllipsisTooltip () {
  const current = useRef(null)
  const tipRef = useRef(null)
  const [tip, setTip] = useState(null)

  const hide = useCallback(() => {
    current.current = null
    setTip(null)
  }, [])

  const onMouseOver = useCallback((event) => {
    const el = event.target.closest('[data-ellipsis]')
    if (!el || !event.currentTarget.contains(el)) {
      if (current.current) hide()
      return
    }
    if (el === current.current) return
    if (!isTruncated(el)) {
      if (current.current) hide()
      return
    }
    const text = (el.textContent || '').replace(/\s+/g, ' ').trim()
    if (!text || text === '-') {
      if (current.current) hide()
      return
    }
    current.current = el
    const rect = el.getBoundingClientRect()
    const maxWidth = Math.min(420, window.innerWidth - 16)
    let left = rect.left
    if (left + maxWidth > window.innerWidth - 8) {
      left = Math.max(8, window.innerWidth - 8 - maxWidth)
    }
    setTip({
      text,
      left,
      top: rect.bottom + 6,
      anchorTop: rect.top,
      maxWidth
    })
  }, [hide])

  const onMouseOut = useCallback((event) => {
    const el = current.current
    if (!el) return
    const next = event.relatedTarget
    if (next instanceof Node && el.contains(next)) return
    hide()
  }, [hide])

  useLayoutEffect(() => {
    const node = tipRef.current
    if (!node || !tip) return
    const rect = node.getBoundingClientRect()
    let top = tip.top
    if (rect.bottom > window.innerHeight - 8) {
      const above = tip.anchorTop - rect.height - 6
      if (above >= 8) top = above
    }
    let left = tip.left
    if (rect.right > window.innerWidth - 8) {
      left = Math.max(8, window.innerWidth - 8 - rect.width)
    }
    node.style.top = top + 'px'
    node.style.left = left + 'px'
  }, [tip])

  const node = tip && typeof document !== 'undefined'
    ? createPortal(
      <div
        ref={tipRef}
        className="wbs-ellipsis-tip"
        role="tooltip"
        style={{ left: tip.left, top: tip.top, maxWidth: tip.maxWidth }}
      >{tip.text}</div>,
      document.body
    )
    : null

  return { onMouseOver, onMouseOut, onScroll: hide, node }
}
