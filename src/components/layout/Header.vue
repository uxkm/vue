<script>
import { LAYOUT_SLOT_HIDDEN, createHiddenHostRender } from './layout-slot-shared'

var PART_SLOTS = ['brand', 'nav', 'actions']
var PART_NAMES = {
  brand: 'header-brand',
  nav: 'header-nav',
  actions: 'header-actions'
}

/**
 * 페이지에서 AppShell 헤더를 한곳에서 제어
 *
 * @example 숨김
 * <Header hidden />
 *
 * @example 상단 영역만 교체
 * <Header>
 *   <template #brand>...</template>
 *   <template #nav>...</template>
 *   <template #actions>...</template>
 * </Header>
 *
 * @example 헤더 전체 교체
 * <Header>
 *   <header>...</header>
 * </Header>
 */
export default {
  name: 'Header',
  inject: {
    layoutSetSlot: { default: null }
  },
  props: {
    /** true면 AppHeader 전체를 숨김 */
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
  beforeDestroy: function () {
    this.clear()
  },
  methods: {
    setSlot: function (name, nodes) {
      if (!this.layoutSetSlot) return
      this.layoutSetSlot(name, nodes)
    },
    clear: function () {
      this.setSlot('header', null)
      PART_SLOTS.forEach(function (key) {
        this.setSlot(PART_NAMES[key], null)
      }.bind(this))
    },
    sync: function () {
      if (!this.layoutSetSlot) return

      if (this.hidden) {
        PART_SLOTS.forEach(function (key) {
          this.setSlot(PART_NAMES[key], null)
        }.bind(this))
        this.setSlot('header', LAYOUT_SLOT_HIDDEN)
        return
      }

      var def = this.$slots.default
      var hasParts = PART_SLOTS.some(function (key) {
        return !!(this.$slots[key] && this.$slots[key].length)
      }.bind(this))

      if (def && def.length && !hasParts) {
        PART_SLOTS.forEach(function (key) {
          this.setSlot(PART_NAMES[key], null)
        }.bind(this))
        this.setSlot('header', def)
        return
      }

      this.setSlot('header', null)
      PART_SLOTS.forEach(function (key) {
        var nodes = this.$slots[key]
        this.setSlot(PART_NAMES[key], nodes && nodes.length ? nodes : null)
      }.bind(this))
    }
  },
  render: createHiddenHostRender('layout-header')
}
</script>
