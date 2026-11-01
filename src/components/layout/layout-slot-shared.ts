/** pageSlots 값: 영역 숨김 표시 */
export const LAYOUT_SLOT_HIDDEN = Object.freeze({ __layoutHidden: true as const })

export type LayoutSlotHidden = typeof LAYOUT_SLOT_HIDDEN

export function isLayoutSlotHidden (value: unknown): value is LayoutSlotHidden {
  return value === LAYOUT_SLOT_HIDDEN
}
