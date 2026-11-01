<template>
  <div class="empty" :class="emptyClass" role="status">
    <div v-if="hasIcon" class="empty_image">
      <slot name="icon">
        <slot name="image"></slot>
      </slot>
    </div>
    <div class="empty_desc">
      <slot name="description">{{ resolvedDescription }}</slot>
    </div>
    <div v-if="hasFooter" class="empty_footer">
      <slot name="footer">
        <slot></slot>
      </slot>
    </div>
  </div>
</template>

<script>
var SIZE_OK = ['sm', 'md', 'lg']

export default {
  name: 'Empty',
  props: {
    description: {
      type: String,
      default: ''
    },
    /** @deprecated use description */
    title: {
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
    simple: Boolean,
    block: Boolean
  },
  computed: {
    resolvedDescription: function () {
      return this.description || this.title || '데이터가 없습니다'
    },
    hasIcon: function () {
      return !!(
        (this.$slots.icon && this.$slots.icon.length) ||
        (this.$slots.image && this.$slots.image.length)
      )
    },
    hasFooter: function () {
      return !!(
        (this.$slots.footer && this.$slots.footer.length) ||
        (this.$slots.default && this.$slots.default.length)
      )
    },
    emptyClass: function () {
      var classes = []
      if (this.size === 'sm') classes.push('empty_sm')
      if (this.size === 'lg') classes.push('empty_lg')
      if (this.simple) classes.push('empty_simple')
      if (this.block) classes.push('empty_block')
      return classes
    }
  }
}
</script>
