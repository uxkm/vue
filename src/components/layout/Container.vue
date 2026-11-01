<template>
  <component :is="as" class="container" :class="containerClass">
    <slot></slot>
  </component>
</template>

<script>
var SIZE_OK = ['', 'sm', 'md', 'lg', 'xl']

export default {
  name: 'Container',
  props: {
    size: {
      type: String,
      default: '',
      validator: function (v) {
        return SIZE_OK.indexOf(v) !== -1
      }
    },
    fluid: Boolean,
    as: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    containerClass: function () {
      var classes = []
      if (this.fluid) {
        classes.push('container_fluid')
      } else if (this.size) {
        classes.push('container_' + this.size)
      }
      return classes
    }
  }
}
</script>
