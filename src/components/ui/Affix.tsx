'use client'

/**
 * 고정(Affix).
 * target 기준(window=문서 뷰포트 · HTMLElement=내부 스크롤 가시 영역)으로 상단·하단에 붙잡는다.
 */

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 스크롤 컨테이너. 생략 시 window(문서 뷰포트) */
export type AffixTarget = Window | HTMLElement | null | undefined

/** Affix props */
export interface AffixProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 상단 고정 여백(px). position=top. 기준은 target 가시 영역 상단 */
  offsetTop?: number
  /** 하단 고정 여백(px). position=bottom. 기준은 target 가시 영역 하단 */
  offsetBottom?: number
  /** top(기본) · bottom */
  position?: 'top' | 'bottom'
  /**
   * 스크롤·고정 기준 컨테이너.
   * - 생략 / window → 문서 뷰포트(window)
   * - HTMLElement → 해당 요소의 가시 영역(내부 스크롤)
   * 함수면 호출 결과를 쓴다.
   */
  target?: AffixTarget | (() => AffixTarget)
  /** bar(기본, affix_bar) · anchor(affix_anchor) */
  skin?: 'bar' | 'anchor'
  /** skin=bar 일 때 왼쪽 라벨 */
  label?: ReactNode
  /** skin=bar 일 때 오른쪽 액션 */
  actions?: ReactNode
  /**
   * 고정 여부(제어). 넘기면 스크롤 측정 대신 페이지가 고정 표시를 관리한다.
   * 생략 시 offset · target 기준으로 자동 고정.
   */
  fixed?: boolean
  /** 고정 상태가 바뀔 때(스크롤 기반 측정값) */
  onChange?: (fixed: boolean) => void
  /** 타깃 안 콘텐츠. 있으면 label·actions 대신 쓴다 */
  children?: ReactNode
}

function resolveTarget (target: AffixProps['target']): Window | HTMLElement | null {
  if (typeof window === 'undefined') return null
  const value = typeof target === 'function' ? target() : target
  return value == null ? window : value
}

function isWindow (node: Window | HTMLElement): node is Window {
  return typeof window !== 'undefined' && node === window
}

/** target 가시 영역(뷰포트 좌표)과 스크롤 여부 */
function getFrame (scrollParent: Window | HTMLElement) {
  if (isWindow(scrollParent)) {
    return {
      top: 0,
      bottom: window.innerHeight,
      left: 0,
      right: window.innerWidth,
      mode: 'window' as const
    }
  }
  const rect = scrollParent.getBoundingClientRect()
  return {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    mode: 'container' as const
  }
}

/**
 * 스크롤에 따라 상단·하단에 붙잡는 막대.
 * 고정 좌표는 항상 target 가시 영역 기준이다(window=문서, HTMLElement=내부 스크롤).
 */
export function Affix ({
  offsetTop = 0,
  offsetBottom = 0,
  position = 'top',
  target,
  skin = 'bar',
  label,
  actions,
  fixed: fixedProp,
  onChange,
  children,
  className,
  style,
  ...rest
}: AffixProps) {
  const uid = useId().replace(/:/g, '')
  const rootRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const controlled = fixedProp !== undefined
  const [innerFixed, setInnerFixed] = useState(false)
  const fixed = controlled ? fixedProp : innerFixed
  const [fixedStyle, setFixedStyle] = useState<CSSProperties>({})
  const [targetMode, setTargetMode] = useState<'window' | 'container'>('window')
  const fixedRef = useRef(false)

  const update = useCallback(() => {
    const root = rootRef.current
    const targetEl = targetRef.current
    const placeholder = placeholderRef.current
    if (!root || !targetEl || !placeholder) return

    const scrollParent = resolveTarget(target)
    if (!scrollParent) return

    const mode = isWindow(scrollParent) ? 'window' : 'container'
    setTargetMode((prev) => (prev === mode ? prev : mode))

    const frame = getFrame(scrollParent)
    const height = targetEl.offsetHeight || root.offsetHeight
    // 비고정 시 측정용 — 고정 중이면 placeholder 가 흐름 위치를 유지
    const measureEl = fixedRef.current ? placeholder : root
    const measureRect = measureEl.getBoundingClientRect()
    const width = root.offsetWidth
    const left = measureRect.left

    let nextFixed = false
    const nextStyle: CSSProperties = {
      position: 'fixed',
      left,
      width,
      zIndex: 'var(--affix-z-index)'
    }

    if (position === 'top') {
      // target 가시 영역 상단 + offsetTop
      const edge = frame.top + offsetTop
      nextFixed = measureRect.top <= edge
      nextStyle.top = edge
      nextStyle.bottom = 'auto'
    } else {
      // target 가시 영역 하단 − offsetBottom
      // 요소 하단이 가시 하단을 넘기면(또는 아래에 있으면) 하단에 고정
      const edge = frame.bottom - offsetBottom
      nextFixed = measureRect.bottom >= edge
      nextStyle.top = edge - height
      nextStyle.bottom = 'auto'
    }

    // 제어 모드면 렌더 고정은 prop, 스타일·placeholder 만 측정값을 따른다.
    const renderFixed = controlled ? Boolean(fixedProp) : nextFixed

    if (renderFixed) {
      placeholder.hidden = false
      placeholder.style.height = `${height}px`
      setFixedStyle(nextStyle)
    } else {
      placeholder.hidden = true
      placeholder.style.height = ''
      setFixedStyle({})
    }

    if (fixedRef.current !== nextFixed) {
      fixedRef.current = nextFixed
      if (!controlled) setInnerFixed(nextFixed)
      onChange?.(nextFixed)
    } else if (renderFixed) {
      setFixedStyle(nextStyle)
    }
  }, [offsetTop, offsetBottom, position, target, onChange, controlled, fixedProp])

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [update])

  useEffect(() => {
    const scrollParent = resolveTarget(target)
    if (!scrollParent) return

    const onScrollOrResize = () => update()

    // 내부 스크롤 + 문서 스크롤(컨테이너가 뷰포트에서 움직일 때) 모두 갱신
    scrollParent.addEventListener('scroll', onScrollOrResize, { passive: true })
    if (!isWindow(scrollParent)) {
      window.addEventListener('scroll', onScrollOrResize, { passive: true })
    }
    window.addEventListener('resize', onScrollOrResize)

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(onScrollOrResize)
      if (rootRef.current) ro.observe(rootRef.current)
      if (targetRef.current) ro.observe(targetRef.current)
      if (!isWindow(scrollParent)) ro.observe(scrollParent)
    }

    return () => {
      scrollParent.removeEventListener('scroll', onScrollOrResize)
      if (!isWindow(scrollParent)) {
        window.removeEventListener('scroll', onScrollOrResize)
      }
      window.removeEventListener('resize', onScrollOrResize)
      ro?.disconnect()
    }
  }, [target, update])

  const content = hasNodes(children)
    ? children
    : (
      <>
        {hasNodes(label) && <span className="affix_bar-label">{label}</span>}
        {hasNodes(actions) && <div className="affix_bar-actions">{actions}</div>}
      </>
      )

  return (
    <div
      {...rest}
      ref={rootRef}
      id={rest.id || `affix-${uid}`}
      className={cx('affix', className)}
      style={style}
      data-affix=""
      data-target={targetMode}
      data-offset-top={position === 'top' ? offsetTop : undefined}
      data-offset-bottom={position === 'bottom' ? offsetBottom : undefined}
    >
      <div
        ref={placeholderRef}
        className="affix_placeholder"
        aria-hidden="true"
        hidden
      />
      <div
        ref={targetRef}
        className={cx(
          'affix_target',
          skin === 'bar' && 'affix_bar',
          skin === 'anchor' && 'affix_anchor',
          fixed && 'is-fixed'
        )}
        style={fixed ? fixedStyle : undefined}
      >
        {content}
      </div>
    </div>
  )
}

export default Affix
