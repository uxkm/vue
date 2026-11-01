<template>
  <component :is="as" class="grid" :class="gridClass" :style="inlineStyle">
    <slot></slot>
  </component>
</template>

<script>
var GAP_TOKEN = {
  sm: 'grid_gap-sm',
  lg: 'grid_gap-lg',
  none: 'grid_gap-none'
}

export default {
  name: 'Grid',
  props: {
    as: {
      type: String,
      default: 'div'
    },
    cols: {
      type: [Number, String],
      default: 12
    },
    /** columns 별칭 */
    columns: {
      type: [Number, String],
      default: null
    },
    gap: {
      type: [String, Number],
      default: ''
    },
    ratio: {
      type: String,
      default: ''
    },
    autoFit: Boolean,
    autoFill: Boolean,
    equalColumns: Boolean,
    align: {
      type: String,
      default: '',
      validator: function (v) {
        return !v || ['center', 'end'].indexOf(v) !== -1
      }
    }
  },
  computed: {
    resolvedCols: function () {
      if (this.columns != null) return this.columns
      return this.cols
    },
    gridClass: function () {
      var classes = []
      var c = this.resolvedCols
      if (c) classes.push('grid_cols-' + c)
      if (typeof this.gap === 'string' && GAP_TOKEN[this.gap]) {
        classes.push(GAP_TOKEN[this.gap])
      }
      if (this.ratio) classes.push('grid_ratio-' + this.ratio)
      if (this.autoFit) classes.push('grid_auto-fit')
      if (this.autoFill) classes.push('grid_auto-fill')
      if (this.equalColumns) classes.push('grid_equal-columns')
      if (this.align) classes.push('grid_align-' + this.align)
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
