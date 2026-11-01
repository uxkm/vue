<script>
import { LAYOUT_SLOT_HIDDEN, createHiddenHostRender, resolveSlotNodes } from './layout-slot-shared'

/**
 * 페이지에서 AppShell 푸터를 한곳에서 제어
 *
 * @example 숨김
 * <Footer hidden />
 *
 * @example 푸터 전체 교체
 * <Footer>
 *   <footer>...</footer>
 * </Footer>
 *
 * @example 기본 푸터 문구만 교체
 * <Footer>
 *   <template #content>문구</template>
 * </Footer>
 */
export default {
  name: 'Footer',
  inject: {
    layoutSetSlot: { default: null }
  },
  props: {
    /** true면 AppFooter 전체를 숨김 */
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
    this.clear()
  },
  methods: {
    setSlot: function (name, nodes) {
      if (!this.layoutSetSlot) return
      this.layoutSetSlot(name, nodes)
    },
    clear: function () {
      this.setSlot('footer', null)
      this.setSlot('footer-content', null)
    },
    sync: function () {
      if (!this.layoutSetSlot) return

      if (this.hidden) {
        this.setSlot('footer-content', null)
        this.setSlot('footer', LAYOUT_SLOT_HIDDEN)
        return
      }

      var content = resolveSlotNodes(this.$slots.content)
      var def = resolveSlotNodes(this.$slots.default)

      if (content) {
        this.setSlot('footer', null)
        this.setSlot('footer-content', content)
        return
      }

      if (def) {
        this.setSlot('footer-content', null)
        this.setSlot('footer', def)
        return
      }

      this.clear()
    }
  },
  render: createHiddenHostRender('layout-footer')
}
</script>
