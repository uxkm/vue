<template>
  <component :is="as" class="space" :class="spaceClass" :style="inlineGapStyle">
    <slot></slot>
  </component>
</template>

<script>
var GAP_TOKEN = {
  xs: 'space_gap-xs',
  sm: 'space_gap-sm',
  md: '',
  lg: 'space_gap-lg',
  xl: 'space_gap-xl'
}
var ALIGN_OK = ['start', 'center', 'end', 'baseline', 'stretch']
var JUSTIFY_OK = ['start', 'center', 'end', 'between']

export default {
  name: 'Space',
  props: {
    as: {
      type: String,
      default: 'div'
    },
    gap: {
      type: [String, Number],
      default: null
    },
    /** size는 gap 별칭 (기존 데모 호환) */
    size: {
      type: [String, Number],
      default: 'md'
    },
    vertical: Boolean,
    wrap: Boolean,
    block: Boolean,
    align: {
      type: String,
      default: 'center',
      validator: function (v) {
        return ALIGN_OK.indexOf(v) !== -1
      }
    },
    justify: {
      type: String,
      default: 'start',
      validator: function (v) {
        return JUSTIFY_OK.indexOf(v) !== -1
      }
    }
  },
  computed: {
    resolvedGap: function () {
      return this.gap != null ? this.gap : this.size
    },
    gapToken: function () {
      var g = this.resolvedGap
      if (typeof g === 'number') return null
      var key = String(g)
      if (Object.prototype.hasOwnProperty.call(GAP_TOKEN, key)) return key
      return 'md'
    },
    spaceClass: function () {
      var classes = []
      var token = this.gapToken
      if (token && GAP_TOKEN[token]) classes.push(GAP_TOKEN[token])
      if (this.vertical) classes.push('space_vertical')
      if (this.wrap) classes.push('space_wrap')
      if (this.block) classes.push('space_block')
      if (this.align && this.align !== 'center') {
        classes.push('space_align-' + this.align)
      }
      if (this.justify && this.justify !== 'start') {
        classes.push('space_justify-' + this.justify)
      }
      return classes
    },
    inlineGapStyle: function () {
      if (typeof this.resolvedGap === 'number') {
        return { gap: this.resolvedGap + 'px' }
      }
      return null
    }
  }
}
</script>
