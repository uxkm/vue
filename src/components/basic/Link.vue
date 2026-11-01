<template>
  <component
    :is="rootTag"
    class="link"
    :class="linkClass"
    :href="rootTag === 'a' ? (href || '#') : null"
    :target="target || (blank ? '_blank' : null)"
    :rel="resolvedRel"
    :aria-label="ariaLabel || null"
    :aria-disabled="disabled ? 'true' : null"
    :data-ripple="ripple ? null : 'false'"
    :tabindex="disabled ? -1 : null"
    @click="onClick"
  >
    <span v-if="$slots.icon" class="link_icon">
      <slot name="icon"></slot>
    </span>
    <span v-if="showLabel" class="link_label">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="$slots['icon-after']" class="link_icon">
      <slot name="icon-after"></slot>
    </span>
  </component>
</template>

<script>
var COLOR_OK = ['primary', 'muted', 'success', 'warning', 'danger', 'info']
var SIZE_OK = ['sm', 'lg', 'xl']

export default {
  name: 'Link',
  emits: ['click'],
  props: {
    as: {
      type: String,
      default: 'a'
    },
    href: {
      type: String,
      default: '#'
    },
    label: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary',
      validator: function (v) {
        return !v || COLOR_OK.indexOf(v) !== -1
      }
    },
    size: {
      type: String,
      default: '',
      validator: function (v) {
        return !v || SIZE_OK.indexOf(v) !== -1
      }
    },
    underline: Boolean,
    noUnderline: Boolean,
    standalone: Boolean,
    nav: Boolean,
    block: Boolean,
    back: Boolean,
    iconOnly: Boolean,
    active: Boolean,
    disabled: Boolean,
    /** @deprecated use target="_blank" */
    blank: Boolean,
    target: {
      type: String,
      default: ''
    },
    rel: {
      type: String,
      default: ''
    },
    ariaLabel: {
      type: String,
      default: ''
    },
    ripple: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    rootTag: function () {
      return this.as || 'a'
    },
    showLabel: function () {
      return !this.iconOnly
    },
    resolvedRel: function () {
      if (this.rel) return this.rel
      var t = this.target || (this.blank ? '_blank' : '')
      if (t === '_blank') return 'noopener noreferrer'
      return null
    },
    linkClass: function () {
      var classes = []
      if (this.color) classes.push('color_' + this.color)
      if (this.size) classes.push('size_' + this.size)
      if (this.underline) classes.push('link_underline')
      if (this.noUnderline) classes.push('link_no-underline')
      if (this.standalone) classes.push('link_standalone')
      if (this.nav) classes.push('link_nav')
      if (this.block) classes.push('link_block')
      if (this.back) classes.push('link_back')
      if (this.iconOnly) classes.push('link_icon-only')
      if (this.active) classes.push('is-active')
      if (this.disabled) classes.push('is-disabled')
      return classes
    }
  },
  methods: {
    onClick: function (event) {
      if (this.disabled) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
      this.$emit('click', event)
    }
  }
}
</script>
