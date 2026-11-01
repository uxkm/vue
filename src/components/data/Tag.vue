<template>
  <component
    :is="rootTag"
    class="tag"
    :class="tagClass"
    :href="rootTag === 'a' ? (href || null) : null"
    :disabled="rootTag === 'button' ? disabled : null"
    :aria-disabled="disabled ? 'true' : null"
    :data-ripple="ripple ? null : 'false'"
    @click="onClick"
  >
    <span v-if="$slots.icon" class="tag_icon">
      <slot name="icon"></slot>
    </span>
    <span class="tag_label">
      <slot>{{ label }}</slot>
    </span>
    <button
      v-if="closable"
      type="button"
      class="tag_close"
      :aria-label="closeLabel || '닫기'"
      :disabled="disabled"
      @click.stop="onClose"
    >×</button>
  </component>
</template>

<script>
var COLOR_OK = ['primary', 'default', 'success', 'warning', 'danger', 'info', 'muted']
var VARIANT_CLASS = {
  filled: '',
  solid: 'tag_solid',
  outline: 'tag_outline',
  borderless: 'tag_borderless'
}
var SIZE_OK = ['sm', 'md', 'lg']

export default {
  name: 'Tag',
  emits: ['click', 'close'],
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
    variant: {
      type: String,
      default: 'filled',
      validator: function (v) {
        return Object.prototype.hasOwnProperty.call(VARIANT_CLASS, v)
      }
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
    href: {
      type: String,
      default: ''
    },
    closeLabel: {
      type: String,
      default: ''
    },
    round: Boolean,
    checkable: Boolean,
    add: Boolean,
    closable: Boolean,
    selected: Boolean,
    disabled: Boolean,
    ripple: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    rootTag: function () {
      if (this.href) return 'a'
      if (this.checkable || this.add) return 'button'
      return 'span'
    },
    resolvedColor: function () {
      return this.color || this.type || 'primary'
    },
    tagClass: function () {
      var classes = []
      var vc = VARIANT_CLASS[this.variant]
      if (vc) classes.push(vc)
      var c = this.resolvedColor
      if (c && c !== 'default') classes.push('color_' + c)
      if (this.size === 'sm') classes.push('tag_sm')
      if (this.size === 'lg') classes.push('tag_lg')
      if (this.round) classes.push('tag_round')
      if (this.checkable) classes.push('tag_checkable')
      if (this.add) classes.push('tag_add')
      if (this.selected) classes.push('is-selected')
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
    },
    onClose: function (event) {
      if (this.disabled) return
      this.$emit('close', event)
    }
  }
}
</script>
