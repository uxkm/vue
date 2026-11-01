<template>
  <component
    :is="rootTag"
    class="divider"
    :class="dividerClass"
    :role="rootTag === 'hr' ? 'separator' : (vertical ? null : 'separator')"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    :aria-hidden="vertical && !hasLabel ? 'true' : null"
  >
    <template v-if="rootTag !== 'hr'">
      <slot>{{ label }}</slot>
    </template>
  </component>
</template>

<script>
export default {
  name: 'Divider',
  props: {
    tag: {
      type: String,
      default: 'auto',
      validator: function (v) {
        return ['auto', 'hr', 'div', 'span'].indexOf(v) !== -1
      }
    },
    as: {
      type: String,
      default: ''
    },
    vertical: Boolean,
    dashed: Boolean,
    plain: Boolean,
    orient: {
      type: String,
      default: '',
      validator: function (v) {
        return !v || ['left', 'right'].indexOf(v) !== -1
      }
    },
    /** orientation 별칭 */
    orientation: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    marginY: {
      type: String,
      default: ''
    },
    thickness: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasLabel: function () {
      if (this.label) return true
      var nodes = this.$slots.default
      return !!(nodes && nodes.length)
    },
    rootTag: function () {
      if (this.as) return this.as
      if (this.tag !== 'auto') return this.tag
      if (this.hasLabel) return 'div'
      return this.vertical ? 'span' : 'hr'
    },
    resolvedOrient: function () {
      return this.orient || this.orientation || ''
    },
    dividerClass: function () {
      var classes = []
      if (this.vertical) classes.push('divider_vertical')
      if (this.dashed) classes.push('divider_dashed')
      if (this.plain) classes.push('divider_plain')
      if (this.resolvedOrient) classes.push('divider_orient-' + this.resolvedOrient)
      if (this.marginY) classes.push('divider_margin-' + this.marginY)
      if (this.thickness) classes.push('divider_thickness-' + this.thickness)
      if (this.height) classes.push('divider_height-' + this.height)
      if (this.hasLabel && this.rootTag !== 'hr') classes.push('divider_with-label')
      return classes
    }
  }
}
</script>
