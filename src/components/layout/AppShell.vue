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
import { cloneVNode, h } from 'vue'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import { LAYOUT_SLOT_HIDDEN } from './layout-slot-shared'

function cloneNodes (nodes) {
  if (!nodes || !nodes.length) return null
  return nodes.map(function (node) {
    return cloneVNode(node)
  })
}

var VnodeHost = {
  name: 'VnodeHost',
  props: {
    nodes: { default: null }
  },
  setup: function (props) {
    return function () {
      var nodes = cloneNodes(props.nodes)
      if (!nodes || !nodes.length) return null
      return nodes.length === 1 ? nodes[0] : h('div', { class: 'vnode-host' }, nodes)
    }
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
    var self = this
    // Vue 3: inject 호출 시 this 가 깨지지 않도록 래핑
    return {
      layoutSetSlot: function (name, nodes) {
        self.setPageSlot(name, nodes)
      }
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
      var next = Object.assign({}, this.pageSlots)
      if (nodes === LAYOUT_SLOT_HIDDEN) {
        next[name] = LAYOUT_SLOT_HIDDEN
        this.pageSlots = next
        return
      }
      if (!nodes || !nodes.length) {
        if (Object.prototype.hasOwnProperty.call(next, name)) {
          delete next[name]
          this.pageSlots = next
        }
        return
      }
      next[name] = nodes
      this.pageSlots = next
    }
  },
  watch: {
    '$route.fullPath': function () {
      this.pageSlots = {}
    }
  }
}
</script>
