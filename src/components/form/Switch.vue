<template>
  <label
    class="switch"
    :class="switchClass"
  >
    <input
      class="switch_input"
      type="checkbox"
      role="switch"
      :checked="isOn"
      :disabled="disabled"
      :aria-checked="isOn ? 'true' : 'false'"
      :aria-label="ariaLabel || label || null"
      @change="onChange"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    >
    <span class="switch_control" aria-hidden="true">
      <span class="switch_track">
        <span v-if="showInnerLabel" class="switch_inner">{{ innerLabel }}</span>
      </span>
      <span class="switch_thumb"></span>
    </span>
    <span v-if="showLabel" class="switch_label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
var SIZE_OK = ['sm', 'md', 'lg']
var COLOR_OK = ['primary', 'success', 'warning', 'danger', 'info']

export default {
  // SVG 예약 태그 <switch>와 충돌하므로 태그명은 FormSwitch 사용
  name: 'FormSwitch',
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: function (v) {
        return SIZE_OK.indexOf(v) !== -1
      }
    },
    color: {
      type: String,
      default: 'primary',
      validator: function (v) {
        return !v || COLOR_OK.indexOf(v) !== -1
      }
    },
    label: {
      type: String,
      default: ''
    },
    checkedLabel: {
      type: String,
      default: ''
    },
    uncheckedLabel: {
      type: String,
      default: ''
    },
    ariaLabel: {
      type: String,
      default: ''
    },
    disabled: Boolean
  },
  computed: {
    isOn: function () {
      return !!this.modelValue
    },
    showLabel: function () {
      return !!(this.label || this.$slots.default)
    },
    showInnerLabel: function () {
      return !!(this.checkedLabel || this.uncheckedLabel)
    },
    innerLabel: function () {
      return this.isOn
        ? (this.checkedLabel || '')
        : (this.uncheckedLabel || '')
    },
    switchClass: function () {
      var classes = []
      if (this.isOn) classes.push('is-checked')
      if (this.disabled) classes.push('is-disabled')
      if (this.size === 'sm') classes.push('switch_sm')
      if (this.size === 'lg') classes.push('switch_lg')
      if (this.color && this.color !== 'primary') {
        classes.push('color_' + this.color)
      }
      return classes
    }
  },
  methods: {
    onChange: function (event) {
      if (this.disabled) return
      var next = !!event.target.checked
      this.$emit('update:modelValue', next)
      this.$emit('change', next)
    }
  }
}
</script>
