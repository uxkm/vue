import { h } from 'vue'

/** pageSlots 값: 영역 숨김 표시 */
export var LAYOUT_SLOT_HIDDEN = Object.freeze({ __layoutHidden: true })

/** Vue 3 슬롯 함수 → VNode 배열 */
export function resolveSlotNodes (slot) {
  if (!slot) return null
  var nodes = typeof slot === 'function' ? slot() : slot
  if (!nodes || !nodes.length) return null
  return nodes
}

export function createHiddenHostRender (className) {
  return function () {
    return h('span', {
      class: className,
      style: { display: 'none' },
      'aria-hidden': 'true'
    })
  }
}
