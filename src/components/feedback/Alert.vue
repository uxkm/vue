<template>
  <div
    v-if="visible"
    class="alert"
    :class="alertClass"
    :role="role"
  >
    <span v-if="showIcon" class="alert_icon" aria-hidden="true">
      <slot name="icon">{{ iconGlyph }}</slot>
    </span>
    <div class="alert_body">
      <div v-if="title" class="alert_title">{{ title }}</div>
      <div v-if="hasDefault" class="alert_desc">
        <slot>{{ description }}</slot>
      </div>
      <div v-if="$slots.actions" class="alert_actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <button
      v-if="closable"
      type="button"
      class="alert_close"
      aria-label="닫기"
      @click="onClose"
    >×</button>
  </div>
</template>

<script>
var COLOR_MAP = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
  error: 'error'
}
var ICON_GLYPH = {
  info: 'ℹ',
  success: '✓',
  warning: '!',
  error: '✕'
}
var SIZE_OK = ['sm', 'md', 'lg']

export default {
  name: 'Alert',
  props: {
    color: {
      type: String,
      default: 'info',
      validator: function (v) {
        return Object.prototype.hasOwnProperty.call(COLOR_MAP, v)
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
    role: {
      type: String,
      default: 'alert'
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    closable: Boolean,
    showIcon: {
      type: Boolean,
      default: true
    },
    banner: Boolean
  },
  data: function () {
    return {
      visible: true
    }
  },
  computed: {
    resolvedColor: function () {
      var key = this.color || this.type || 'info'
      return COLOR_MAP[key] || 'info'
    },
    iconGlyph: function () {
      return ICON_GLYPH[this.resolvedColor] || 'ℹ'
    },
    hasDefault: function () {
      if (this.description) return true
      var nodes = this.$slots.default
      return !!(nodes && nodes.length)
    },
    alertClass: function () {
      var classes = ['color_' + this.resolvedColor]
      if (this.size === 'sm') classes.push('alert_sm')
      if (this.size === 'lg') classes.push('alert_lg')
      if (this.banner) classes.push('alert_banner')
      return classes
    }
  },
  methods: {
    onClose: function (event) {
      this.visible = false
      this.$emit('close', event)
    }
  }
}
</script>
