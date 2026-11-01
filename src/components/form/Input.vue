<template>
  <div
    class="input_wrap"
    :class="{ 'input_clearable': clearable, 'input_block': block, 'is-error': error }"
  >
    <span v-if="$slots.prefix" class="input_prefix">
      <slot name="prefix"></slot>
    </span>
    <input
      class="input"
      :class="inputClass"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="error ? 'true' : null"
      @input="onInput"
      @change="onChange"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    >
    <button
      v-if="clearable && hasValue && !disabled"
      type="button"
      class="input_clear"
      aria-label="입력 지우기"
      @click="onClear"
    >×</button>
    <span v-if="$slots.suffix" class="input_suffix">
      <slot name="suffix"></slot>
    </span>
  </div>
</template>

<script>
var SIZE_OK = ['sm', 'md', 'lg']

export default {
  name: 'Input',
  emits: ['update:modelValue', 'change', 'clear', 'focus', 'blur'],
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: 'md',
      validator: function (v) {
        return SIZE_OK.indexOf(v) !== -1
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    readonly: Boolean,
    error: Boolean,
    block: Boolean,
    clearable: Boolean
  },
  computed: {
    hasValue: function () {
      return this.modelValue !== '' && this.modelValue != null
    },
    inputClass: function () {
      var classes = []
      if (this.size === 'sm') classes.push('input_sm')
      if (this.size === 'lg') classes.push('input_lg')
      if (this.readonly) classes.push('is-readonly')
      if (this.error) classes.push('is-error')
      return classes
    }
  },
  methods: {
    onInput: function (event) {
      this.$emit('update:modelValue', event.target.value)
    },
    onChange: function (event) {
      this.$emit('change', event.target.value)
    },
    onClear: function () {
      this.$emit('update:modelValue', '')
      this.$emit('clear')
    }
  }
}
</script>
