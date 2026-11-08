/**
 * 레이아웃 슬롯 숨김 표시 유틸.
 * AppLayout pageSlots 에서 해당 영역을 비울 때 쓰는 마커와 판별 함수.
 */

/** pageSlots 값: 영역 숨김 표시 */
export const LAYOUT_SLOT_HIDDEN = Object.freeze({ __layoutHidden: true as const })

/** 슬롯에 넣는 숨김 표시의 타입 */
export type LayoutSlotHidden = typeof LAYOUT_SLOT_HIDDEN

/** 슬롯 값이 숨김 표시인지 */
export function isLayoutSlotHidden (value: unknown): value is LayoutSlotHidden {
  return value === LAYOUT_SLOT_HIDDEN
}
