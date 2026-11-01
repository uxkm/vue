<template>
  <component
    :is="rootTag"
    class="card"
    :class="cardClass"
    :href="rootTag === 'a' ? (href || null) : null"
    :data-ripple="ripple ? null : 'false'"
    @click="onClick"
  >
    <div v-if="$slots.media" class="card_media">
      <slot name="media"></slot>
    </div>
    <div class="card_inner">
      <div v-if="hasHeader" class="card_header">
        <slot name="header">
          <div class="card_header-main">
            <div v-if="title || $slots.title" class="card_title">
              <slot name="title">{{ title }}</slot>
            </div>
            <div v-if="subtitle" class="card_subtitle">{{ subtitle }}</div>
          </div>
        </slot>
        <div v-if="$slots.extra" class="card_extra">
          <slot name="extra"></slot>
        </div>
      </div>
      <div class="card_body">
        <slot></slot>
      </div>
      <div v-if="$slots.footer" class="card_footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </component>
</template>

<script>
var VARIANT_CLASS = {
  bordered: '',
  shadow: 'card_shadow',
  flat: 'card_ghost',
  ghost: 'card_ghost'
}
var SIZE_OK = ['sm', 'md', 'lg', 'compact']

export default {
  name: 'Card',
  emits: ['click'],
  props: {
    variant: {
      type: String,
      default: 'bordered',
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
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    as: {
      type: String,
      default: 'article'
    },
    /** @deprecated use `as` */
    tag: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    hoverable: Boolean,
    horizontal: Boolean,
    accent: Boolean,
    disabled: Boolean,
    ripple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rootTag: function () {
      if (this.href) return 'a'
      return this.tag || this.as || 'article'
    },
    hasHeader: function () {
      if (this.title || this.subtitle) return true
      if (this.$slots.header) return true
      if (this.$slots.extra) return true
      // legacy title slot
      if (this.$slots.title) return true
      return false
    },
    cardClass: function () {
      var classes = []
      var vc = VARIANT_CLASS[this.variant]
      if (vc) classes.push(vc)
      if (this.size === 'sm') classes.push('card_sm')
      if (this.size === 'lg') classes.push('card_lg')
      if (this.size === 'compact') classes.push('card_compact')
      if (this.hoverable) classes.push('card_hover')
      if (this.horizontal) classes.push('card_horizontal')
      if (this.accent) classes.push('card_accent')
      if (this.href) classes.push('card_clickable')
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
