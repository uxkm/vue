/** pageSlots 값: 영역 숨김 표시 */
export var LAYOUT_SLOT_HIDDEN = Object.freeze({ __layoutHidden: true })

export function createHiddenHostRender (className) {
  return function (h) {
    return h('span', {
      class: className,
      style: { display: 'none' },
      attrs: { 'aria-hidden': 'true' }
    })
  }
}
