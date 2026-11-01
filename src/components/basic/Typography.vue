<template>
  <component :is="resolvedTag" :class="typoClass" :href="href || null" :for="htmlFor || null" :cite="cite || null">
    <slot>{{ label }}</slot>
  </component>
</template>

<script>
var TITLE_TAGS = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5' }
var VARIANT_CLASS = {
  text: '',
  paragraph: 'typo_paragraph',
  lead: 'typo_lead',
  caption: 'typo_caption',
  label: 'typo_label',
  overline: 'typo_overline',
  code: 'typo_code',
  kbd: 'typo_kbd',
  pre: 'typo_pre',
  strong: 'typo_strong',
  italic: 'typo_italic',
  underline: 'typo_underline',
  delete: 'typo_delete',
  mark: 'typo_mark',
  sub: 'typo_sub',
  sup: 'typo_sup',
  small: 'typo_small',
  link: 'typo_link',
  blockquote: 'typo_blockquote'
}
var VARIANT_TAG = {
  paragraph: 'p',
  lead: 'p',
  caption: 'p',
  label: 'label',
  overline: 'p',
  code: 'code',
  kbd: 'kbd',
  pre: 'pre',
  strong: 'strong',
  italic: 'em',
  underline: 'u',
  delete: 'del',
  mark: 'mark',
  sub: 'sub',
  sup: 'sup',
  small: 'small',
  link: 'a',
  blockquote: 'blockquote'
}
var COLOR_OK = ['primary', 'muted', 'success', 'warning', 'danger', 'info', 'default']
var SIZE_OK = ['xs', 'sm', 'lg', 'xl']

export default {
  name: 'Typography',
  props: {
    tag: {
      type: String,
      default: ''
    },
    level: {
      type: [Number, String],
      default: 0
    },
    variant: {
      type: String,
      default: 'text',
      validator: function (v) {
        return Object.prototype.hasOwnProperty.call(VARIANT_CLASS, v)
      }
    },
    color: {
      type: String,
      default: '',
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
    ellipsis: {
      type: [Number, String],
      default: 0
    },
    label: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    htmlFor: {
      type: String,
      default: ''
    },
    cite: {
      type: String,
      default: ''
    },
    /** @deprecated use color="muted" */
    muted: Boolean,
    /** @deprecated use typo_* classes via variant */
    weight: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    titleLevel: function () {
      var n = Number(this.level)
      if (n >= 1 && n <= 5) return n
      return 0
    },
    isTitle: function () {
      return this.titleLevel > 0
    },
    resolvedTag: function () {
      if (this.tag) return this.tag
      if (this.isTitle) return TITLE_TAGS[this.titleLevel] || 'h1'
      if (this.href || this.variant === 'link') return 'a'
      return VARIANT_TAG[this.variant] || 'p'
    },
    typoClass: function () {
      var classes = []
      if (this.isTitle) {
        classes.push('typo_title-' + this.titleLevel)
      } else {
        var vc = VARIANT_CLASS[this.variant]
        if (vc) classes.push(vc)
        else classes.push('typo_text')
      }
      var color = this.color || (this.muted ? 'muted' : '')
      if (color) classes.push('color_' + color)
      if (this.size) classes.push('size_' + this.size)
      var ell = Number(this.ellipsis)
      if (ell === 1) classes.push('text_ellipsis')
      if (ell === 2) classes.push('text_ellipsis-2')
      if (ell === 3) classes.push('text_ellipsis-3')
      if (this.weight) classes.push('is-w' + this.weight)
      return classes
    }
  }
}
</script>
