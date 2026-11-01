import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'
import { useLocation } from 'react-router-dom'
import { hasNodes } from '@/utils/react'
import {
  LAYOUT_SLOT_HIDDEN,
  isLayoutSlotHidden,
  type LayoutSlotHidden
} from './layout-slot-shared'

/**
 * pageSlots 값: 렌더할 노드 | 숨김 마커
 * 지원 name: header, header-brand, header-nav, header-actions, footer, footer-content
 */
export type LayoutSlotValue = ReactNode | LayoutSlotHidden
export type PageSlots = Record<string, LayoutSlotValue>
export type SetPageSlot = (name: string, nodes: LayoutSlotValue | null | undefined) => void

/** setPageSlot — 참조가 안정적이라 등록 컴포넌트(Header 등)가 슬롯 변경으로 재렌더되지 않음 */
const LayoutSetSlotContext = createContext<SetPageSlot | null>(null)
/** 현재 페이지 슬롯 — AppShell 만 구독 */
const LayoutSlotsContext = createContext<PageSlots>({})

export function LayoutProvider ({ children }: { children?: ReactNode }) {
  const location = useLocation()
  const [pageSlots, setPageSlots] = useState<PageSlots>({})
  const [prevKey, setPrevKey] = useState(location.pathname + location.search + location.hash)

  // 라우트 변경 시 슬롯 초기화 (Vue: watch $route.fullPath)
  // 렌더 단계에서 처리해야 새 페이지의 Header 등록(layout effect)이 지워지지 않음
  const key = location.pathname + location.search + location.hash
  if (key !== prevKey) {
    setPrevKey(key)
    setPageSlots({})
  }

  const setPageSlot = useCallback<SetPageSlot>((name, nodes) => {
    setPageSlots((prev) => {
      if (isLayoutSlotHidden(nodes)) {
        if (prev[name] === LAYOUT_SLOT_HIDDEN) return prev
        return { ...prev, [name]: LAYOUT_SLOT_HIDDEN }
      }
      if (!hasNodes(nodes)) {
        if (!Object.prototype.hasOwnProperty.call(prev, name)) return prev
        const next = { ...prev }
        delete next[name]
        return next
      }
      return { ...prev, [name]: nodes }
    })
  }, [])

  return (
    <LayoutSetSlotContext.Provider value={setPageSlot}>
      <LayoutSlotsContext.Provider value={pageSlots}>
        {children}
      </LayoutSlotsContext.Provider>
    </LayoutSetSlotContext.Provider>
  )
}

/** AppShell 용: 현재 페이지 슬롯 */
export function useLayoutSlots (): PageSlots {
  return useContext(LayoutSlotsContext)
}

/** Header / Footer / LayoutSlot 용: Provider 밖이면 null (Vue inject default null) */
export function useLayoutSetSlot (): SetPageSlot | null {
  return useContext(LayoutSetSlotContext)
}

/**
 * 슬롯 등록 헬퍼 — 매 렌더 후 동기화(Vue mounted/updated), 언마운트 시 정리(beforeDestroy)
 *
 * @param sync   현재 props 기준으로 setSlot 호출
 * @param names  언마운트 시 비울 슬롯 이름
 */
export function useLayoutSlotSync (
  sync: (setSlot: SetPageSlot) => void,
  names: string[]
): void {
  const setSlot = useLayoutSetSlot()

  useLayoutEffect(() => {
    if (!setSlot) return
    sync(setSlot)
  })

  const namesKey = names.join('|')
  useLayoutEffect(() => {
    if (!setSlot) return undefined
    return () => {
      namesKey.split('|').forEach((name) => setSlot(name, null))
    }
  }, [setSlot, namesKey])
}

/** Header / Footer / LayoutSlot 이 렌더하는 보이지 않는 호스트 (Vue createHiddenHostRender 대응) */
export function LayoutHiddenHost ({ className }: { className: string }) {
  return <span className={className} style={{ display: 'none' }} aria-hidden="true" />
}

export { LAYOUT_SLOT_HIDDEN }
