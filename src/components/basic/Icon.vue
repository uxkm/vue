<template>
  <component
    :is="rootTag"
    :class="iconClass"
    :type="button ? 'button' : null"
    :aria-hidden="isDecorative ? 'true' : null"
    :aria-label="resolvedAriaLabel"
    :title="title || null"
    :data-ripple="button ? (ripple ? null : 'false') : null"
    :style="rootStyle"
    @click="onClick"
  >
    <slot>{{ name }}</slot>
  </component>
</template>

<script>
var SIZE_CLASS = {
  sm: 'icon_sm',
  md: '',
  lg: 'icon_lg',
  xl: 'icon_xl'
}

var SIZE_PX = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
}

export default {
  name: 'Icon',
  emits: ['click'],
  props: {
    name: {
      type: String,
      default: 'plus'
    },
    size: {
      type: [String, Number],
      default: 'md'
    },
    color: {
      type: String,
      default: '',
      validator: function (v) {
        if (!v) return true
        return ['default', 'primary', 'success', 'warning', 'danger', 'info', 'muted'].indexOf(v) !== -1
      }
    },
    inline: Boolean,
    spin: Boolean,
    button: Boolean,
    circle: Boolean,
    square: Boolean,
    pulse: Boolean,
    ripple: {
      type: Boolean,
      default: true
    },
    ariaLabel: {
      type: String,
      default: ''
    },
    /** @deprecated use ariaLabel */
    label: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    rootTag: function () {
      return this.button ? 'button' : 'span'
    },
    resolvedAriaLabel: function () {
      return this.ariaLabel || this.label || null
    },
    isDecorative: function () {
      return !(this.resolvedAriaLabel || this.title || this.button)
    },
    sizeToken: function () {
      if (typeof this.size === 'number') return null
      var key = String(this.size)
      if (SIZE_CLASS[key] !== undefined) return key
      return 'md'
    },
    iconClass: function () {
      var classes = ['icon']
      if (this.button) {
        classes.push('icon_button')
      } else if (this.circle) {
        classes.push('icon_circle')
        if (this.sizeToken === 'sm') classes.push('icon_circle-sm')
        if (this.sizeToken === 'lg' || this.sizeToken === 'xl') classes.push('icon_circle-lg')
      } else if (this.square) {
        classes.push('icon_square')
      }
      if (this.sizeToken && SIZE_CLASS[this.sizeToken]) {
        classes.push(SIZE_CLASS[this.sizeToken])
      }
      if (this.color) classes.push('color_' + this.color)
      if (this.inline) classes.push('icon_inline')
      if (this.spin) classes.push('icon_spin')
      if (this.pulse && this.circle) classes.push('icon_pulse')
      return classes
    },
    rootStyle: function () {
      if (typeof this.size === 'number') {
        return {
          width: this.size + 'px',
          height: this.size + 'px',
          fontSize: this.size + 'px'
        }
      }
      var token = this.sizeToken || 'md'
      var px = SIZE_PX[token] || SIZE_PX.md
      if (this.button || this.circle || this.square) return null
      return {
        width: px + 'px',
        height: px + 'px',
        fontSize: px + 'px'
      }
    }
  },
  methods: {
    onClick: function (event) {
      if (!this.button) return
      this.$emit('click', event)
    }
  }
}
</script>
