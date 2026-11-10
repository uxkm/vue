'use client'

/**
 * 팝오버.
 * 트리거 옆에 제목·내용 패널을 띄운다. 닫기 버튼·바깥 클릭 닫기를 지원한다.
 */
import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { Icon } from './Icon'

/** 팝오버가 받는 값 */
export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content' | 'style'> {
  title?: ReactNode
  content?: ReactNode
  open?: boolean
  /** 비제어 초기 열림 */
  defaultOpen?: boolean
  trigger?: ReactNode
  /** true 이면 패널에 닫기(Icon close) 버튼을 표시한다. 기본 true */
  closable?: boolean
  /** true 이면 패널·트리거 바깥을 누를 때 닫힌다. 기본 true */
  closeOnOutsideClick?: boolean
  /** true 이면 popover_arrow 를 표시한다. 기본 true. false 이면 popover_no-arrow */
  arrow?: boolean
  /**
   * 화살표 위치(가장자리 기준 %). 넘기면 popover_arrow-anchor-mixed 와
   * --popover-arrow-position 이 적용된다. 예: '25%' · 50
   */
  arrowPosition?: string | number
  style?: HTMLAttributes<HTMLDivElement>['style']
  onOpenChange?: (open: boolean) => void
}

/**
 * 버튼을 누르면 옆에 뜨는 설명 패널.
 * trigger 가 버튼, content 가 본문. closable · closeOnOutsideClick · arrow 로 닫기·화살표를 제어한다.
 */
export function Popover ({
  title,
  content,
  open,
  defaultOpen = false,
  trigger,
  closable = true,
  closeOnOutsideClick = true,
  arrow = true,
  arrowPosition,
  className,
  style,
  children,
  onOpenChange,
  ...rest
}: PopoverProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [inner, setInner] = useState(defaultOpen)
  const shown = open ?? inner

  const setShown = (next: boolean) => {
    if (open === undefined) setInner(next)
    onOpenChange?.(next)
  }

  const toggle = () => setShown(!shown)
  const close = () => setShown(false)

  // 바깥 영역 클릭 시 닫기
  useEffect(() => {
    if (!shown || !closeOnOutsideClick) return
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      if (open === undefined) setInner(false)
      onOpenChange?.(false)
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => document.removeEventListener('pointerdown', onPointerDown, true)
  }, [shown, closeOnOutsideClick, open, onOpenChange])

  const showHeader = hasNodes(title) || closable
  const arrowPos = arrowPosition == null || arrowPosition === ''
    ? null
    : (typeof arrowPosition === 'number' ? `${arrowPosition}%` : String(arrowPosition))

  return (
    <div
      {...rest}
      ref={rootRef}
      className={cx(
        'popover',
        shown && 'is-open',
        !arrow && 'popover_no-arrow',
        arrowPos && 'popover_arrow-anchor-mixed',
        className
      )}
      style={{
        ...style,
        ...(arrowPos ? { ['--popover-arrow-position' as string]: arrowPos } : null)
      }}
    >
      <button
        type="button"
        className="btn btn_outline color_default popover_trigger"
        aria-expanded={shown}
        onClick={toggle}
      >
        <span className="btn_label">{trigger ?? '자세히'}</span>
      </button>
      {shown && (
        <div className="popover_panel" role="dialog">
          {arrow && <span className="popover_arrow" aria-hidden="true" />}
          {showHeader && (
            <div className="popover_header">
              {hasNodes(title)
                ? <span className="popover_title">{title}</span>
                : <span className="popover_title" />}
              {closable && (
                <button
                  type="button"
                  className="popover_close"
                  aria-label="닫기"
                  onClick={close}
                >
                  <Icon name="close" size="var(--popover-close-icon-size)" />
                </button>
              )}
            </div>
          )}
          <div className="popover_body">{content ?? children}</div>
        </div>
      )}
    </div>
  )
}

export default Popover
