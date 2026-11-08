'use client'

/**
 * 레이아웃 슬롯 Context.
 * Header/Footer/Page 등이 등록한 슬롯을 AppLayout 이 읽어 헤더·본문·푸터를 구성한다.
 */
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode
} from 'react'
import { usePathname } from 'next/navigation'
import { hasNodes } from '@/utils/react'
import {
  LAYOUT_SLOT_HIDDEN,
  isLayoutSlotHidden,
  type LayoutSlotHidden
} from '@/comp/shared/layout-slot'

/**
 * pageSlots 값: 렌더할 노드 | 숨김 마커
 * 지원 name: meta-header, meta-footer, header, header-layout, header-hide-nav-on-scroll, header-back, header-brand, header-nav, header-actions, footer, footer-content, main-page, main-class
 */
/** 슬롯 하나. 그릴 노드이거나 숨김 표시 */
export type LayoutSlotValue = ReactNode | LayoutSlotHidden
/** 이름별 슬롯 */
export type PageSlots = Record<string, LayoutSlotValue>
/** 슬롯을 넣거나 지우는 함수. null 이면 그 슬롯을 비운다 */
export type SetPageSlot = (name: string, nodes: LayoutSlotValue | null | undefined) => void

/** setPageSlot — 참조가 안정적이라 등록 컴포넌트(Header 등)가 슬롯 변경으로 재렌더되지 않음 */
const LayoutSetSlotContext = createContext<SetPageSlot | null>(null)
/** 현재 페이지 슬롯 — AppLayout 만 구독 */
const LayoutSlotsContext = createContext<PageSlots>({})

/** 슬롯 저장소. 경로가 바뀌면 이전 화면의 헤더·푸터를 비운다 */
export function LayoutProvider ({ children }: { children?: ReactNode }) {
  const pathname = usePathname()
  const [pageSlots, setPageSlots] = useState<PageSlots>({})
  const [prevPathname, setPrevPathname] = useState(pathname)

  // 경로 변경 시 슬롯 초기화 (useSearchParams 미사용 — Next가 넣는 hidden 마커/CSR bailout 방지)
  // 렌더 단계에서 처리해야 새 페이지의 Header 등록(layout effect)이 지워지지 않음
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
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

/** AppLayout 용: 현재 페이지 슬롯 */
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

/** @deprecated 슬롯 등록은 hook만으로 충분 — DOM 호스트 없음 */
export function LayoutHiddenHost (_props: { className: string }) {
  return null
}

export { LAYOUT_SLOT_HIDDEN }
