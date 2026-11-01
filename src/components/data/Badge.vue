<template>
  <span
    class="badge"
    :class="badgeClass"
    :role="dotOnly ? 'status' : null"
    :aria-label="ariaLabel || null"
  >
    <slot>{{ label }}</slot>
  </span>
</template>

<script>
var COLOR_OK = ['primary', 'default', 'success', 'warning', 'danger', 'info', 'muted']
var SIZE_OK = ['sm', 'md', 'lg']

export default {
  name: 'Badge',
  props: {
    color: {
      type: String,
      default: 'primary',
      validator: function (v) {
        return !v || COLOR_OK.indexOf(v) !== -1
      }
    },
    /** @deprecated use `color` */
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md',
      validator: function (v) {
        return SIZE_OK.indexOf(v) !== -1
      }
    },
    label: {
      type: String,
      default: ''
    },
    ariaLabel: {
      type: String,
      default: ''
    },
    dot: Boolean,
    count: Boolean,
    dotOnly: Boolean
  },
  computed: {
    resolvedColor: function () {
      return this.color || this.type || 'primary'
    },
    badgeClass: function () {
      var classes = []
      var c = this.resolvedColor
      if (c && c !== 'default') classes.push('color_' + c)
      if (this.size === 'sm') classes.push('badge_sm')
      if (this.size === 'lg') classes.push('badge_lg')
      if (this.dot || this.dotOnly) classes.push('badge_dot')
      if (this.dotOnly) classes.push('badge_dot-only')
      if (this.count) classes.push('badge_count')
      return classes
    }
  }
}
</script>
