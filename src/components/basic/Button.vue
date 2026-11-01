<template>
  <component
    :is="rootTag"
    class="btn"
    :class="btnClass"
    :type="rootTag === 'button' ? resolvedType : null"
    :href="rootTag === 'a' ? (href || null) : null"
    :disabled="rootTag === 'button' ? isDisabled : null"
    :role="computedRole"
    :tabindex="computedTabIndex"
    :aria-busy="loading ? 'true' : null"
    :aria-disabled="isDisabled ? 'true' : null"
    :aria-label="ariaLabel || null"
    :aria-haspopup="haspopupAttr"
    :aria-expanded="expandedAttr"
    :aria-invalid="(error || invalid) ? 'true' : null"
    :data-ripple="ripple ? null : 'false'"
    @click="onClick"
    @keydown="onKeydown"
  >
    <!-- icon-only: default 슬롯이 아이콘 콘텐츠 -->
    <template v-if="iconOnly">
      <slot></slot>
    </template>
    <template v-else>
      <span v-if="$slots['icon-before']" class="btn_icon btn_icon-before">
        <slot name="icon-before"></slot>
      </span>
      <span v-if="showLabel" class="btn_label">
        <slot>{{ label }}</slot>
      </span>
      <span v-if="$slots['icon-after']" class="btn_icon btn_icon-after">
        <slot name="icon-after"></slot>
      </span>
      <span
        v-if="showCaret"
        class="btn_icon btn_icon-after btn_caret"
        aria-hidden="true"
      >▾</span>
    </template>
  </component>
</template>

<script>
var VARIANT_CLASS = {
  filled: 'btn_filled',
  outline: 'btn_outline',
  ghost: 'btn_ghost',
  text: 'btn_text',
  select: 'btn_select'
}

export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'filled',
      validator: function (v) {
        return ['filled', 'outline', 'ghost', 'text', 'select'].indexOf(v) !== -1
      }
    },
    color: {
      type: String,
      default: 'primary',
      validator: function (v) {
        return ['primary', 'default', 'success', 'warning', 'danger', 'muted'].indexOf(v) !== -1
      }
    },
    size: {
      type: String,
      default: 'md',
      validator: function (v) {
        return ['sm', 'md', 'lg'].indexOf(v) !== -1
      }
    },
    label: {
      type: String,
      default: 'Button'
    },
    ripple: {
      type: Boolean,
      default: true
    },
    round: Boolean,
    vertical: Boolean,
    iconOnly: Boolean,
    block: Boolean,
    grow: {
      type: [Boolean, String, Number],
      default: false
    },
    fit: Boolean,
    disabled: Boolean,
    ariaDisabled: Boolean,
    loading: Boolean,
    open: Boolean,
    error: Boolean,
    placeholder: Boolean,
    selectText: Boolean,
    selectCaret: Boolean,
    type: {
      type: String,
      default: 'button',
      validator: function (v) {
        return ['button', 'submit', 'reset'].indexOf(v) !== -1
      }
    },
    /** @deprecated use `type` — kept for older demos */
    nativeType: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'button',
      validator: function (v) {
        return ['button', 'a', 'div'].indexOf(v) !== -1
      }
    },
    href: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: ''
    },
    tabindex: {
      type: [Number, String],
      default: null
    },
    ariaLabel: {
      type: String,
      default: ''
    },
    haspopup: {
      type: [Boolean, String],
      default: null
    },
    expanded: {
      default: null
    },
    invalid: Boolean
  },
  computed: {
    rootTag: function () {
      return this.tag
    },
    resolvedType: function () {
      return this.nativeType || this.type
    },
    isDisabled: function () {
      return !!(this.disabled || this.ariaDisabled || this.loading)
    },
    showLabel: function () {
      return !this.iconOnly
    },
    showCaret: function () {
      if (this.variant === 'select') return true
      return !!this.selectCaret
    },
    btnClass: function () {
      var classes = []
      if (this.variant === 'select' && this.selectText) {
        classes.push('btn_select-text')
      } else {
        classes.push(VARIANT_CLASS[this.variant] || 'btn_filled')
      }
      if (this.variant !== 'ghost') {
        classes.push('color_' + this.color)
      }
      if (this.size === 'sm') classes.push('btn_sm')
      if (this.size === 'lg') classes.push('btn_lg')
      if (this.round) classes.push('btn_round')
      if (this.block) classes.push('btn_block')
      if (this.fit) classes.push('btn_fit')
      if (this.grow === true || this.grow === '') classes.push('btn_grow')
      if (this.grow === 2 || this.grow === '2') classes.push('btn_grow-2')
      if (this.iconOnly) classes.push('btn_icon-only')
      if (this.vertical) classes.push('btn_vertical')
      if (this.placeholder) classes.push('is-placeholder')
      if (this.disabled || this.ariaDisabled) classes.push('is-disabled')
      if (this.loading) classes.push('is-loading')
      if (this.open) classes.push('is-open')
      if (this.error || this.invalid) classes.push('is-error')
      return classes
    },
    needsButtonRole: function () {
      if (this.tag === 'div') return true
      if (this.tag === 'a' && !this.href) return true
      return false
    },
    computedRole: function () {
      if (this.role) return this.role
      if (this.needsButtonRole) return 'button'
      return null
    },
    computedTabIndex: function () {
      if (this.tabindex !== null && this.tabindex !== undefined && this.tabindex !== '') {
        return this.tabindex
      }
      if (this.isDisabled && this.tag !== 'button') return -1
      if (this.needsButtonRole) return 0
      return null
    },
    haspopupAttr: function () {
      if (this.haspopup === true || this.haspopup === '') return 'true'
      if (this.haspopup === false || this.haspopup == null) return null
      return String(this.haspopup)
    },
    expandedAttr: function () {
      // expanded가 명시된 경우만 우선
      if (this.expanded === true) return 'true'
      if (this.expanded === false) return 'false'
      // select / haspopup / open 사용 시에만 aria-expanded 노출
      // (open 기본 false 때문에 모든 버튼에 aria-expanded="false"가 붙지 않도록)
      var needsExpanded =
        this.variant === 'select' ||
        this.open === true ||
        (this.haspopup !== null && this.haspopup !== false && this.haspopup !== undefined)
      if (!needsExpanded) return null
      return this.open ? 'true' : 'false'
    }
  },
  methods: {
    onClick: function (event) {
      if (this.isDisabled) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
      this.$emit('click', event)
    },
    onKeydown: function (event) {
      if (this.isDisabled) {
        this.$emit('keydown', event)
        return
      }
      this.$emit('keydown', event)
      if (this.computedRole !== 'button') return
      var key = event.key || event.keyCode
      if (key === 'Enter' || key === ' ' || key === 13 || key === 32) {
        event.preventDefault()
        this.onClick(event)
      }
    }
  }
}
</script>
