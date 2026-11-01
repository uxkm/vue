<template>
  <div class="app-shell">
    <!-- header: 페이지 LayoutSlot(name="header") 또는 슬롯으로 전체 교체 -->
    <slot name="header">
      <template v-if="!isSlotHidden('header')">
        <vnode-host
          v-if="hasSlotNodes('header')"
          :nodes="pageSlots.header"
        />
        <AppHeader v-else>
          <template v-if="hasPageOrSlot('header-brand')" #brand>
            <vnode-host
              v-if="hasSlotNodes('header-brand')"
              :nodes="pageSlots['header-brand']"
            />
            <slot v-else name="header-brand" />
          </template>
          <template v-if="hasPageOrSlot('header-nav')" #nav>
            <vnode-host
              v-if="hasSlotNodes('header-nav')"
              :nodes="pageSlots['header-nav']"
            />
            <slot v-else name="header-nav" />
          </template>
          <template v-if="hasPageOrSlot('header-actions')" #actions>
            <vnode-host
              v-if="hasSlotNodes('header-actions')"
              :nodes="pageSlots['header-actions']"
            />
            <slot v-else name="header-actions" />
          </template>
        </AppHeader>
      </template>
    </slot>

    <main class="app-shell__main">
      <slot />
    </main>

    <slot name="footer">
      <template v-if="!isSlotHidden('footer')">
        <vnode-host
          v-if="hasSlotNodes('footer')"
          :nodes="pageSlots.footer"
        />
        <AppFooter v-else-if="hasSlotNodes('footer-content')">
          <vnode-host :nodes="pageSlots['footer-content']" />
        </AppFooter>
        <AppFooter v-else-if="$slots['footer-content']">
          <slot name="footer-content" />
        </AppFooter>
        <AppFooter v-else />
      </template>
    </slot>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import { LAYOUT_SLOT_HIDDEN } from './layout-slot-shared'

var VnodeHost = {
  name: 'VnodeHost',
  functional: true,
  props: {
    nodes: { default: null }
  },
  render: function (h, ctx) {
    var nodes = ctx.props.nodes
    if (!nodes || !nodes.length) return null
    return nodes.length === 1 ? nodes[0] : h('div', { class: 'vnode-host' }, nodes)
  }
}

export default {
  name: 'AppShell',
  components: {
    AppHeader: AppHeader,
    AppFooter: AppFooter,
    VnodeHost: VnodeHost
  },
  provide: function () {
    return {
      layoutSetSlot: this.setPageSlot
    }
  },
  data: function () {
    return {
      pageSlots: {}
    }
  },
  methods: {
    isSlotHidden: function (name) {
      return this.pageSlots[name] === LAYOUT_SLOT_HIDDEN
    },
    hasSlotNodes: function (name) {
      var nodes = this.pageSlots[name]
      return !!(nodes && nodes.length && nodes !== LAYOUT_SLOT_HIDDEN)
    },
    hasPageOrSlot: function (name) {
      return this.hasSlotNodes(name) || !!this.$slots[name]
    },
    /**
     * LayoutSlot 이 등록하는 페이지 슬롯
     * @param {string} name
     * @param {VNode[]|typeof LAYOUT_SLOT_HIDDEN|null} nodes
     */
    setPageSlot: function (name, nodes) {
      if (nodes === LAYOUT_SLOT_HIDDEN) {
        this.$set(this.pageSlots, name, LAYOUT_SLOT_HIDDEN)
        return
      }
      if (!nodes || !nodes.length) {
        if (Object.prototype.hasOwnProperty.call(this.pageSlots, name)) {
          this.$delete(this.pageSlots, name)
        }
        return
      }
      this.$set(this.pageSlots, name, nodes)
    }
  },
  watch: {
    '$route.fullPath': function () {
      this.pageSlots = {}
    }
  }
}
</script>
