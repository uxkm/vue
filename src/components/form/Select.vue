<template>
  <select
    class="input"
    :class="selectClass"
    :value="modelValue"
    :disabled="disabled"
    :multiple="multiple"
    :size="nativeSize || null"
    :aria-invalid="error ? 'true' : null"
    @change="onChange"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <option v-if="placeholder && !multiple" value="" disabled>
      {{ placeholder }}
    </option>
    <slot>
      <option
        v-for="option in normalizedOptions"
        :key="String(option.value)"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </slot>
  </select>
</template>

<script>
var SIZE_OK = ['sm', 'md', 'lg']

export default {
  name: 'Select',
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  props: {
    modelValue: {
      type: [String, Number, Array],
      default: ''
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
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
    nativeSize: {
      type: [Number, String],
      default: null
    },
    fit: Boolean,
    disabled: Boolean,
    error: Boolean,
    multiple: Boolean
  },
  computed: {
    selectClass: function () {
      var classes = []
      if (this.size === 'sm') classes.push('input_sm')
      if (this.size === 'lg') classes.push('input_lg')
      if (this.fit) classes.push('input_fit')
      if (this.error) classes.push('is-error')
      return classes
    },
    normalizedOptions: function () {
      return (this.options || []).map(function (item) {
        if (item && typeof item === 'object') {
          return {
            value: item.value,
            label: item.label != null ? item.label : item.value
          }
        }
        return { value: item, label: String(item) }
      })
    }
  },
  methods: {
    onChange: function (event) {
      var next
      if (this.multiple) {
        var opts = event.target.options
        next = []
        for (var i = 0; i < opts.length; i++) {
          if (opts[i].selected) next.push(opts[i].value)
        }
      } else {
        next = event.target.value
      }
      this.$emit('update:modelValue', next)
      this.$emit('change', next)
    }
  }
}
</script>
