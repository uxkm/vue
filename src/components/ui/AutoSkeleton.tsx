'use client'

/**
 * 자동 스켈레톤.
 * children DOM 을 측정해 뼈대 도형을 그려 로딩 UI 를 만든다.
 */
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'

/** 측정한 뼈대 한 칸. x·y 위치, w·h 크기, r 모서리, shape 네모 또는 원 */
export interface AutoBone {
  x: number
  y: number
  w: number
  h: number
  r: number
  shape: 'rect' | 'circle'
}

/** sessionStorage 에 남기는 측정 스냅샷 */
interface AutoSkeletonCache {
  bones: AutoBone[]
  height: number
}

/** 자동 스켈레톤이 받는 값. id 로 캐시하고, 없을 때 fallback */
export interface AutoSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** 캐시·설정 키 */
  id?: string
  loading?: boolean
  /** 캐시 없을 때 / 수동 폴백 */
  fallback?: ReactNode
  children?: ReactNode
}

/** 뼈대로 만들지 않을 태그 */
const SKIP_TAGS = new Set([
  'SCRIPT', 'STYLE', 'LINK', 'META', 'NOSCRIPT', 'BR', 'WBR', 'PATH', 'DEF', 'CLIPPATH'
])

/** 글자가 적어도 뼈대로 만들 태그 */
const FORCE_TAGS = new Set([
  'IMG', 'VIDEO', 'CANVAS', 'SVG', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'PROGRESS', 'IFRAME'
])

/** 표 셀처럼 한 칸으로 묶을 role — 안쪽 잎 높이 들쭉날쭉을 막는다 */
const SLOT_ROLES = new Set([
  'cell', 'columnheader', 'rowheader', 'gridcell'
])

/** 뼈대 최대 개수 */
const MAX_BONES = 160
/** 이보다 작은 요소는 건너뛴다 */
const MIN_SIZE = 4
/** sessionStorage 키 앞부분 */
const STORAGE_PREFIX = 'auto-skeleton:'

/** 너비를 80px 단위로 묶어 같은 레이아웃은 캐시를 공유 */
function viewportBucket () {
  if (typeof window === 'undefined') return 0
  return Math.round(window.innerWidth / 80) * 80
}

/** 이 화면·이 너비의 캐시 키 */
function storageKey (id: string) {
  return STORAGE_PREFIX + id + ':' + viewportBucket()
}

/** 저장해 둔 뼈대·높이. 없거나 깨졌으면 null */
function readCache (id: string): AutoSkeletonCache | null {
  if (typeof window === 'undefined' || !id) return null
  try {
    const raw = window.sessionStorage.getItem(storageKey(id))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // 이전 형식: AutoBone[]
    if (Array.isArray(parsed) && parsed.length) {
      return { bones: parsed as AutoBone[], height: 0 }
    }
    if (
      parsed &&
      Array.isArray(parsed.bones) &&
      parsed.bones.length
    ) {
      return {
        bones: parsed.bones as AutoBone[],
        height: typeof parsed.height === 'number' ? parsed.height : 0
      }
    }
    return null
  } catch {
    return null
  }
}

/** 측정한 뼈대·높이를 이 탭의 sessionStorage 에 남긴다 */
function writeCache (id: string, bones: AutoBone[], height: number) {
  if (typeof window === 'undefined' || !id || !bones.length) return
  try {
    const payload: AutoSkeletonCache = { bones, height }
    window.sessionStorage.setItem(storageKey(id), JSON.stringify(payload))
  } catch {
    /* quota / private mode */
  }
}

/** 원으로 그릴지. data-skeleton-shape 또는 둥근 모서리로 판단 */
function isCircleLike (el: Element, w: number, h: number) {
  if (el.getAttribute('data-skeleton-shape') === 'circle') return true
  if (el.getAttribute('data-skeleton-shape') === 'rect') return false
  const style = window.getComputedStyle(el)
  const radius = style.borderRadius
  if (radius.includes('%') && parseFloat(radius) >= 50) return true
  if (Math.abs(w - h) <= 2 && parseFloat(radius) >= Math.min(w, h) / 2) return true
  return false
}

/**
 * 표 셀·슬롯: 자식 유무와 관계없이 이 박스 하나를 뼈대로 쓴다.
 * (글자만 있는 셀 vs 뱃지/링크가 있는 셀 높이 차이를 없앤다)
 */
function isSlot (el: Element): boolean {
  if (!(el instanceof HTMLElement)) return false
  if (el.hasAttribute('data-skeleton-ignore')) return false
  if (el.hasAttribute('data-skeleton-slot') || el.getAttribute('data-skeleton') === 'slot') {
    return true
  }
  if (el.tagName === 'TD' || el.tagName === 'TH') return true
  const role = el.getAttribute('role')
  return role != null && SLOT_ROLES.has(role)
}

/** 이 요소를 뼈대 후보로 볼지 (슬롯이 아닌 잎·강제 태그) */
function isCandidate (el: Element): boolean {
  if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) return false
  if (el.hasAttribute('data-skeleton-ignore')) return false
  if (el.getAttribute('aria-hidden') === 'true' && !el.hasAttribute('data-skeleton')) return false
  if (SKIP_TAGS.has(el.tagName)) return false
  if (isSlot(el)) return false
  if (el.hasAttribute('data-skeleton')) return true
  if (FORCE_TAGS.has(el.tagName)) return true

  const children = Array.from(el.children).filter((c) => !SKIP_TAGS.has(c.tagName))
  if (children.length === 0) {
    /** 글자만 있는 잎 요소 */
    const text = (el.textContent || '').trim()
    if (text) return true
    if (el instanceof HTMLElement) {
      const bg = window.getComputedStyle(el).backgroundColor
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return true
    }
  }
  return false
}

/** 보이는지·최소 크기인지. 통과하면 rect/style 반환 */
function readVisibleBox (el: Element, rootRect: DOMRect) {
  const rect = el.getBoundingClientRect()
  const w = Math.round(rect.width)
  const h = Math.round(rect.height)
  if (w < MIN_SIZE || h < MIN_SIZE) return null
  // 루트와 거의 같은 큰 박스 제외
  if (w >= rootRect.width - 2 && h >= rootRect.height - 2) return null

  const style = window.getComputedStyle(el)
  if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) === 0) {
    return null
  }
  return { rect, w, h, style }
}

/** 슬롯은 padding 안쪽을 뼈대로 — 행마다 같은 셀 높이로 맞춤 */
function boneFromSlot (
  el: Element,
  box: { rect: DOMRect; w: number; h: number; style: CSSStyleDeclaration },
  originX: number,
  originY: number
): AutoBone | null {
  const padL = parseFloat(box.style.paddingLeft) || 0
  const padR = parseFloat(box.style.paddingRight) || 0
  const padT = parseFloat(box.style.paddingTop) || 0
  const padB = parseFloat(box.style.paddingBottom) || 0
  const x = Math.round(box.rect.left - originX + padL)
  const y = Math.round(box.rect.top - originY + padT)
  const w = Math.round(box.w - padL - padR)
  const h = Math.round(box.h - padT - padB)
  if (w < MIN_SIZE || h < MIN_SIZE) return null
  if (x + w < 0 || y + h < 0) return null
  return { x, y, w, h, r: 6, shape: 'rect' }
}

function boneFromLeaf (
  el: Element,
  box: { rect: DOMRect; w: number; h: number; style: CSSStyleDeclaration },
  originX: number,
  originY: number
): AutoBone | null {
  const x = Math.round(box.rect.left - originX)
  const y = Math.round(box.rect.top - originY)
  if (x + box.w < 0 || y + box.h < 0) return null
  const radius = parseFloat(box.style.borderRadius) || 6
  const shape = isCircleLike(el, box.w, box.h) ? 'circle' : 'rect'
  return {
    x,
    y,
    w: box.w,
    h: box.h,
    r: shape === 'circle' ? Math.min(box.w, box.h) / 2 : Math.min(radius, 12),
    shape
  }
}

/**
 * 루트 padding edge 기준 좌표.
 * absolute 자식은 border 안쪽(padding edge)에 붙으므로 clientLeft/Top 을 뺀다.
 */
function measureBones (root: HTMLElement): AutoBone[] {
  const rootRect = root.getBoundingClientRect()
  if (rootRect.width < MIN_SIZE || rootRect.height < MIN_SIZE) return []

  const bones: AutoBone[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT)
  const originX = rootRect.left + root.clientLeft - root.scrollLeft
  const originY = rootRect.top + root.clientTop - root.scrollTop
  /** 이미 슬롯으로 잰 조상 — 그 안 잎은 건너뛴다 */
  let skipRoot: Element | null = null

  let node = walker.nextNode()
  while (node && bones.length < MAX_BONES) {
    const el = node as Element
    node = walker.nextNode()

    if (skipRoot) {
      if (skipRoot.contains(el)) continue
      skipRoot = null
    }

    if (isSlot(el)) {
      const box = readVisibleBox(el, rootRect)
      if (box) {
        const bone = boneFromSlot(el, box, originX, originY)
        if (bone) bones.push(bone)
      }
      skipRoot = el
      continue
    }

    if (!isCandidate(el)) continue

    const box = readVisibleBox(el, rootRect)
    if (!box) continue
    const bone = boneFromLeaf(el, box, originX, originY)
    if (bone) bones.push(bone)
  }

  return bones
}

/** 루트 콘텐츠 높이 — 스크롤 영역까지 포함해 레이아웃 점프를 줄인다 */
function measureContentHeight (root: HTMLElement) {
  return Math.max(
    Math.round(root.getBoundingClientRect().height),
    root.scrollHeight,
    root.offsetHeight
  )
}

/** 측정한 뼈대를 절대 위치 막대로 그린다 */
function BonesView ({ bones, height }: { bones: AutoBone[]; height: number }) {
  return (
    <div
      className="auto-skeleton__bones"
      style={{ height: height > 0 ? height + 'px' : undefined }}
      aria-hidden="true"
    >
      {bones.map((bone, i) => {
        const style: CSSProperties = {
          position: 'absolute',
          left: bone.x,
          top: bone.y,
          width: bone.w,
          height: bone.h,
          borderRadius: bone.shape === 'circle' ? '999px' : bone.r
        }
        return <span key={i} className="auto-skeleton__bone skeleton" style={style} />
      })}
    </div>
  )
}

/**
 * 실제 children 레이아웃을 측정해 스켈레톤을 자동 생성.
 * - loading=false 일 때 측정·캐시
 * - loading=true 일 때 캐시(또는 fallback) 표시
 */
export function AutoSkeleton ({
  id = 'page',
  loading = false,
  fallback = null,
  children,
  className,
  ...rest
}: AutoSkeletonProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  // SSR·첫 클라이언트 렌더는 동일하게 null (sessionStorage 읽으면 hydration mismatch)
  const [bones, setBones] = useState<AutoBone[] | null>(null)
  const [contentHeight, setContentHeight] = useState(0)
  const [ready, setReady] = useState(false)

  const applyCache = useCallback((cache: AutoSkeletonCache | null) => {
    if (!cache) return
    setBones(cache.bones)
    if (cache.height > 0) setContentHeight(cache.height)
  }, [])

  const capture = useCallback(() => {
    const root = rootRef.current
    if (!root) return
    const next = measureBones(root)
    if (!next.length) return
    const height = measureContentHeight(root)
    setBones(next)
    setContentHeight(height)
    writeCache(id, next, height)
  }, [id])

  // 마운트 후에만 캐시 적용 → 서버 HTML 과 첫 페인트 일치
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      applyCache(readCache(id))
      setReady(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [id, applyCache])

  useLayoutEffect(() => {
    if (loading) return
    const root = rootRef.current
    if (!root) return

    let raf = requestAnimationFrame(capture)
    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(capture)
      })
      : null

    if (ro) ro.observe(root)

    /** 창 크기가 바뀌면 캐시를 다시 읽고 측정 */
    const onResize = () => {
      applyCache(readCache(id))
      capture()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [loading, id, capture, applyCache, children])

  if (loading) {
    if (ready && bones && bones.length) {
      return (
        <div
          {...rest}
          className={cx('auto-skeleton', 'is-loading', className)}
          aria-busy="true"
        >
          <BonesView bones={bones} height={contentHeight} />
        </div>
      )
    }

    if (fallback != null) {
      return (
        <div
          {...rest}
          className={cx('auto-skeleton', 'is-loading', 'is-fallback', className)}
          aria-busy="true"
        >
          {fallback}
        </div>
      )
    }

    return (
      <div
        {...rest}
        className={cx('auto-skeleton', 'is-loading', className)}
        aria-busy="true"
      />
    )
  }

  return (
    <div
      {...rest}
      ref={rootRef}
      className={cx('auto-skeleton', className)}
    >
      {children}
    </div>
  )
}

export default AutoSkeleton
