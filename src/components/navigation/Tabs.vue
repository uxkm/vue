<template>
  <div class="tabs" :class="tabsClass">
    <div class="tabs_list" role="tablist" :aria-orientation="vertical ? 'vertical' : 'horizontal'">
      <button
        v-for="tab in normalizedTabs"
        :key="String(tab.value)"
        type="button"
        class="tabs_tab"
        :class="{ 'is-active': tab.value === value, 'is-disabled': tab.disabled }"
        role="tab"
        :aria-selected="tab.value === value ? 'true' : 'false'"
        :aria-disabled="tab.disabled ? 'true' : null"
        :tabindex="tab.value === value ? 0 : -1"
        :disabled="tab.disabled"
        @click="onSelect(tab.value)"
      >
        {{ tab.label }}
        <button
          v-if="closable || tab.closable"
          type="button"
          class="tabs_close"
          :aria-label="tab.closeLabel || '탭 닫기'"
          @click.stop="onClose(tab.value)"
        >×</button>
      </button>
      <div v-if="$slots.extra" class="tabs_extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="tabs_panel" role="tabpanel">
      <slot></slot>
    </div>
  </div>
</template>

<script>
var VARIANT_OK = ['line', 'card', 'pill']
var SIZE_OK = ['sm', 'md', 'lg']
var LAYOUT_OK = ['auto', 'equal', 'scroll']

export default {
  name: 'Tabs',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    tabs: {
      type: Array,
      default: function () {
        return []
      }
    },
    variant: {
      type: String,
      default: 'line',
      validator: function (v) {
        return VARIANT_OK.indexOf(v) !== -1
      }
    },
    size: {
      type: String,
      default: 'md',
      validator: function (v) {
        return SIZE_OK.indexOf(v) !== -1
      }
    },
    layout: {
      type: String,
      default: 'auto',
      validator: function (v) {
        return LAYOUT_OK.indexOf(v) !== -1
      }
    },
    vertical: Boolean,
    scrollable: Boolean,
    closable: Boolean
  },
  computed: {
    tabsClass: function () {
      var classes = []
      if (this.variant === 'card') classes.push('tabs_card')
      if (this.variant === 'pill') classes.push('tabs_pill')
      if (this.vertical) classes.push('tabs_vertical')
      if (this.size === 'sm') classes.push('tabs_sm')
      if (this.size === 'lg') classes.push('tabs_lg')
      if (this.layout === 'equal') classes.push('tabs_equal')
      if (this.layout === 'scroll' || this.scrollable) classes.push('tabs_scroll')
      return classes
    },
    normalizedTabs: function () {
      return (this.tabs || []).map(function (item) {
        if (item && typeof item === 'object') {
          return {
            value: item.value,
            label: item.label != null ? item.label : item.value,
            disabled: !!item.disabled,
            closable: !!item.closable,
            closeLabel: item.closeLabel || ''
          }
        }
        return { value: item, label: String(item), disabled: false, closable: false, closeLabel: '' }
      })
    }
  },
  methods: {
    onSelect: function (next) {
      if (next === this.value) return
      this.$emit('input', next)
      this.$emit('change', next)
    },
    onClose: function (key) {
      this.$emit('close', key)
    }
  }
}
</script>
