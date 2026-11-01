<template>
  <component :is="as" class="flex" :class="flexClass" :style="inlineStyle">
    <slot></slot>
  </component>
</template>

<script>
var GAP_TOKEN = {
  sm: 'flex_gap-sm',
  lg: 'flex_gap-lg',
  none: 'flex_gap-none'
}

export default {
  name: 'Flex',
  props: {
    as: {
      type: String,
      default: 'div'
    },
    direction: {
      type: String,
      default: 'row'
    },
    wrap: Boolean,
    gap: {
      type: [String, Number],
      default: ''
    },
    cols: {
      type: [Number, String],
      default: ''
    },
    ratio: {
      type: String,
      default: ''
    },
    equal: Boolean,
    autoFit: Boolean,
    align: {
      type: String,
      default: ''
    },
    justify: {
      type: String,
      default: ''
    }
  },
  computed: {
    resolvedDirection: function () {
      var d = this.direction
      if (d === 'col' || d === 'column') return 'col'
      return 'row'
    },
    flexClass: function () {
      var classes = []
      classes.push(this.resolvedDirection === 'col' ? 'flex_col' : 'flex_row')
      if (this.wrap) classes.push('flex_wrap')
      if (typeof this.gap === 'string' && GAP_TOKEN[this.gap]) {
        classes.push(GAP_TOKEN[this.gap])
      }
      if (this.cols) classes.push('flex_cols-' + this.cols)
      if (this.ratio) classes.push('flex_ratio-' + this.ratio)
      if (this.equal) classes.push('flex_equal')
      if (this.autoFit) classes.push('flex_auto-fit')
      if (this.align) classes.push('flex_align-' + this.align)
      if (this.justify) {
        var j = this.justify === 'space-between' ? 'between' : this.justify
        classes.push('flex_justify-' + j)
      }
      return classes
    },
    inlineStyle: function () {
      if (typeof this.gap === 'number') {
        return { gap: this.gap + 'px' }
      }
      return null
    }
  }
}
</script>
