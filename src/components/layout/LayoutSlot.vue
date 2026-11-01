<script>
import { LAYOUT_SLOT_HIDDEN, createHiddenHostRender, resolveSlotNodes } from './layout-slot-shared'

export { LAYOUT_SLOT_HIDDEN }

/**
 * 저수준 슬롯 등록 (세분 제어용)
 * 일반 페이지는 Header / Footer 컴포넌트 사용을 권장
 *
 * 지원 name: header, header-brand, header-nav, header-actions, footer, footer-content
 */
export default {
  name: 'LayoutSlot',
  inject: {
    layoutSetSlot: { default: null }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  mounted: function () {
    this.sync()
  },
  updated: function () {
    this.sync()
  },
  beforeUnmount: function () {
    if (this.layoutSetSlot) {
      this.layoutSetSlot(this.name, null)
    }
  },
  methods: {
    sync: function () {
      if (!this.layoutSetSlot) return
      if (this.hidden) {
        this.layoutSetSlot(this.name, LAYOUT_SLOT_HIDDEN)
        return
      }
      this.layoutSetSlot(this.name, resolveSlotNodes(this.$slots.default))
    }
  },
  render: createHiddenHostRender('layout-slot')
}
</script>
