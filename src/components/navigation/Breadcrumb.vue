<template>
  <nav class="breadcrumb" :aria-label="ariaLabel || '경로'">
    <ol class="breadcrumb_list" :class="listClass">
      <li
        v-for="(item, index) in items"
        :key="itemKey(item, index)"
        class="breadcrumb_item"
      >
        <a
          v-if="item.href && !isCurrent(item, index) && !item.disabled"
          class="breadcrumb_link"
          :href="item.href"
          :aria-label="item.ariaLabel || null"
        >{{ item.label }}</a>
        <span
          v-else
          class="breadcrumb_current"
          :aria-current="isCurrent(item, index) ? 'page' : null"
          :aria-disabled="item.disabled ? 'true' : null"
        >{{ item.label }}</span>
        <span
          v-if="index < items.length - 1"
          class="breadcrumb_separator"
          aria-hidden="true"
        >{{ separatorGlyph }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
var SEPARATOR_GLYPH = {
  chevron: '›',
  slash: '/',
  dot: '·'
}
var SIZE_OK = ['sm', 'md', 'lg']

export default {
  name: 'Breadcrumb',
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    },
    ariaLabel: {
      type: String,
      default: '경로'
    },
    separator: {
      type: String,
      default: 'chevron',
      validator: function (v) {
        return Object.prototype.hasOwnProperty.call(SEPARATOR_GLYPH, v)
      }
    },
    size: {
      type: String,
      default: 'md',
      validator: function (v) {
        return SIZE_OK.indexOf(v) !== -1
      }
    }
  },
  computed: {
    separatorGlyph: function () {
      return SEPARATOR_GLYPH[this.separator] || '›'
    },
    listClass: function () {
      var classes = []
      if (this.size === 'sm') classes.push('breadcrumb_sm')
      if (this.size === 'lg') classes.push('breadcrumb_lg')
      return classes
    }
  },
  methods: {
    isCurrent: function (item, index) {
      if (item && item.current) return true
      return index === this.items.length - 1
    },
    itemKey: function (item, index) {
      if (item && item.href) return String(item.href) + '-' + index
      if (item && item.label) return String(item.label) + '-' + index
      return index
    }
  }
}
</script>
