'use client'

/**
 * 맨 위로(BackTop).
 * target 기준(window=문서 뷰포트 · HTMLElement=내부 스크롤)으로
 * visibilityHeight 이상 스크롤되면 나타나고, 클릭 시 해당 target 상단으로 이동한다.
 */

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { Icon } from './Icon'
import { useFloatingContext } from './Floating'

/** 스크롤 컨테이너. 생략 시 window(문서 뷰포트) */
export type BackTopTarget = Window | HTMLElement | null | undefined

/** BackTop props */
export interface BackTopProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** 표시 임계 스크롤(px). target 스크롤량이 이 값 이상이면 보임 */
  visibilityHeight?: number
  /**
   * 스크롤·맨 위 이동 기준 컨테이너.
   * - 생략 / window → 문서 뷰포트(window)
   * - HTMLElement → 해당 요소의 내부 스크롤
   * 함수면 호출 결과를 쓴다.
   */
  target?: BackTopTarget | (() => BackTopTarget)
  /** primary(기본) · ghost */
  variant?: 'primary' | 'ghost'
  /** sm · md(기본) · lg */
  size?: 'sm' | 'md' | 'lg'
  /** 버튼 라벨. children 이 있으면 쓰지 않는다 */
  label?: ReactNode
  /** 아이콘. 기본은 chevron-up(chevron-down 회전). false 면 숨김 */
  icon?: ReactNode | false
  /** 버튼 안 콘텐츠. 있으면 label · icon 대신 쓴다 */
  children?: ReactNode
  /**
   * 표시 여부(제어). 넘기면 스크롤 계산 대신 페이지가 표시를 관리한다.
   * 생략 시 visibilityHeight 기준 자동 표시.
   */
  visible?: boolean
  /** 표시 상태가 바뀔 때(스크롤 기반 측정값) */
  onVisibleChange?: (visible: boolean) => void
}

function resolveTarget (target: BackTopProps['target']): Window | HTMLElement | null {
  if (typeof window === 'undefined') return null
  const value = typeof target === 'function' ? target() : target
  return value == null ? window : value
}

function isWindow (node: Window | HTMLElement): node is Window {
  return typeof window !== 'undefined' && node === window
}

function getScrollTop (scrollParent: Window | HTMLElement) {
  if (isWindow(scrollParent)) {
    return window.scrollY || document.documentElement.scrollTop || 0
  }
  return scrollParent.scrollTop
}

function scrollToTop (scrollParent: Window | HTMLElement) {
  if (isWindow(scrollParent)) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  // Element.scrollTo({ behavior: 'smooth' }) 가 no-op 인 환경이 있어 auto 후 보정
  if (typeof scrollParent.scrollTo === 'function') {
    scrollParent.scrollTo({ top: 0, behavior: 'smooth' })
    requestAnimationFrame(() => {
      if (scrollParent.scrollTop > 0) scrollParent.scrollTo(0, 0)
    })
    return
  }
  scrollParent.scrollTop = 0
}

/**
 * 스크롤을 내리면 나타나는 맨 위 버튼.
 * 표시·이동 기준은 항상 target(window=문서, HTMLElement=내부 스크롤)이다.
 */
export function BackTop ({
  visibilityHeight = 200,
  target,
  variant = 'primary',
  size = 'md',
  label = '맨 위로',
  icon,
  children,
  visible: visibleProp,
  onVisibleChange,
  className,
  onClick,
  ...rest
}: BackTopProps) {
  const uid = useId().replace(/:/g, '')
  const floating = useFloatingContext()
  const controlled = visibleProp !== undefined
  const [innerVisible, setInnerVisible] = useState(false)
  const visible = controlled ? visibleProp : innerVisible
  const [targetMode, setTargetMode] = useState<'window' | 'container'>('window')
  const visibleRef = useRef(false)

  const update = useCallback(() => {
    const scrollParent = resolveTarget(target)
    if (!scrollParent) return

    const mode = isWindow(scrollParent) ? 'window' : 'container'
    setTargetMode((prev) => (prev === mode ? prev : mode))

    const nextVisible = getScrollTop(scrollParent) >= visibilityHeight
    if (visibleRef.current !== nextVisible) {
      visibleRef.current = nextVisible
      if (!controlled) setInnerVisible(nextVisible)
      onVisibleChange?.(nextVisible)
    }
  }, [target, visibilityHeight, onVisibleChange, controlled])

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [update])

  useEffect(() => {
    const scrollParent = resolveTarget(target)
    if (!scrollParent) return

    const onScrollOrResize = () => update()

    scrollParent.addEventListener('scroll', onScrollOrResize, { passive: true })
    // 컨테이너가 뷰포트에서 바뀔 때도 갱신(문서 스크롤)
    if (!isWindow(scrollParent)) {
      window.addEventListener('scroll', onScrollOrResize, { passive: true })
    }
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      scrollParent.removeEventListener('scroll', onScrollOrResize)
      if (!isWindow(scrollParent)) {
        window.removeEventListener('scroll', onScrollOrResize)
      }
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [target, update])

  const content = hasNodes(children)
    ? children
    : (
      <>
        {icon !== false && (
          hasNodes(icon)
            ? icon
            : <Icon name="chevron-down" className="back_top_icon" aria-hidden />
        )}
        {hasNodes(label) && <span className="back_top_label">{label}</span>}
      </>
      )

  const { id: buttonId, 'aria-label': ariaLabel, ...buttonRest } = rest

  return (
    <div
      id={`back-top-${uid}`}
      className={cx('back_top', visible && 'is-visible', floating.inside && 'is-in-floating')}
      data-back-top=""
      data-target={targetMode}
      data-visibility-height={visibilityHeight}
      data-in-floating={floating.inside ? '' : undefined}
    >
      <button
        {...buttonRest}
        id={buttonId}
        type="button"
        className={cx(
          'back_top_btn',
          variant === 'primary' && 'back_top_primary',
          variant === 'ghost' && 'back_top_ghost',
          size === 'sm' && 'back_top_sm',
          size === 'lg' && 'back_top_lg',
          className
        )}
        aria-label={ariaLabel ?? (typeof label === 'string' ? label : '맨 위로')}
        onClick={(event) => {
          const scrollParent = resolveTarget(target)
          if (scrollParent) scrollToTop(scrollParent)
          onClick?.(event)
        }}
      >
        {content}
      </button>
    </div>
  )
}

export default BackTop
