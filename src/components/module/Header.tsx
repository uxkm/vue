'use client'

/**
 * 화면별 헤더 슬롯 등록 (일반 페이지용).
 * back·brand·nav·actions·layout 등을 AppLayout 공통 헤더에 반영한다.
 *
 * - 일반 페이지: 이 Header 또는 PageHeader
 * - /pub 목록: `@/screens/pub/widgets/list` 의 PubHeader
 * - 보이기/숨기기: `export const meta = { header: true | false }` (PageChrome)
 */
import type { ReactNode } from 'react'
import { hasNodes } from '@/utils/react'
import { isAppHeaderLayout, type AppHeaderLayout } from '@/comp/widget/AppHeader'
import { LAYOUT_SLOT_HIDDEN } from '@/comp/shared/layout-slot'
import { useLayoutSlotSync } from './LayoutContext'

/**
 * 슬롯 값 정규화
 * - undefined: 슬롯 비움 → AppHeader 기본값
 * - null/빈 값: 숨김 마커 → 해당 영역 의도적 비움 (기본 메뉴 미표시)
 * - 노드: 그대로 등록
 */
function toSlotValue (value: ReactNode) {
  if (value === undefined) return null
  if (!hasNodes(value)) return LAYOUT_SLOT_HIDDEN
  return value
}

/** 헤더 조각 이름 → 슬롯 이름 */
const PART_NAMES = {
  back: 'header-back',
  brand: 'header-brand',
  nav: 'header-nav',
  actions: 'header-actions'
} as const

/** 헤더가 등록하는 슬롯 전체. 경로가 바뀌면 같이 비운다 */
const ALL_SLOTS = [
  'header',
  'header-layout',
  'header-hide-nav-on-scroll',
  ...Object.values(PART_NAMES)
]

/** 화면이 헤더 슬롯에 넣는 값. 표시 여부는 meta.header */
export interface HeaderProps {
  /**
   * inline — 한 줄 헤더
   * stacked — 상단(브랜드) + 하단(네비) 2단
   */
  layout?: AppHeaderLayout
  /**
   * stacked 전용: 스크롤 시 네비까지 함께 위로 올림
   * @example <Header layout="stacked" hideNavOnScroll />
   */
  hideNavOnScroll?: boolean
  /** 브랜드 왼쪽 뒤로가기 */
  back?: ReactNode
  /** 공통 헤더의 로고·이름. meta.header 가 true 일 때만 보임 */
  brand?: ReactNode
  /** 공통 헤더의 메뉴. 없으면 AppHeader 기본 메뉴 */
  nav?: ReactNode
  /** 공통 헤더 오른쪽 동작(링크·버튼) */
  actions?: ReactNode
  /** back / brand / nav / actions 없이 children 만 주면 헤더 전체 교체 */
  children?: ReactNode
}

/**
 * 공통 헤더의 내용을 화면에서 바꾼다.
 * 보일지 숨길지는 meta.header. true 표시, false 숨김. 생략하면 표시.
 * 이 컴포넌트는 header 가 true 일 때의 로고·메뉴·레이아웃이다.
 *
 * @example 공통 헤더 숨김
 * export const meta = { header: false }
 *
 * @example 인라인
 * <Header layout="inline" brand={...} nav={...} />
 *
 * @example 2단 (상단 브랜드 + 하단 네비)
 * <Header layout="stacked" brand={...} nav={...} />
 *
 * @example 2단 + 스크롤 시 네비도 숨김
 * <Header layout="stacked" hideNavOnScroll brand={...} nav={...} />
 *
 * @example 헤더 전체 교체
 * <Header><header>...</header></Header>
 */
export function Header ({
  layout,
  hideNavOnScroll = false,
  back,
  brand,
  nav,
  actions,
  children
}: HeaderProps) {
  useLayoutSlotSync((setSlot) => {
    const parts = { back, brand, nav, actions }
    const keys = Object.keys(PART_NAMES) as Array<keyof typeof PART_NAMES>

    setSlot('header-layout', isAppHeaderLayout(layout) ? layout : null)
    // hasNodes(true)===false 이므로 문자열 센티널 사용
    setSlot('header-hide-nav-on-scroll', hideNavOnScroll ? 'true' : null)

    const hasParts = keys.some((key) => hasNodes(parts[key]))

    if (hasNodes(children) && !hasParts) {
      keys.forEach((key) => setSlot(PART_NAMES[key], null))
      setSlot('header', children)
      return
    }

    setSlot('header', null)
    keys.forEach((key) => {
      setSlot(PART_NAMES[key], toSlotValue(parts[key]))
    })
  }, ALL_SLOTS)

  return null
}

export default Header
