<template>
  <span
    class="skeleton"
    :class="skeletonClass"
    :style="skeletonStyle"
    aria-hidden="true"
  ></span>
</template>

<script>
var VARIANT_OK = [
  'rect',
  'eyebrow',
  'title',
  'text',
  'text-sm',
  'meta',
  'chip',
  'avatar',
  'button'
]

/**
 * 스켈레톤 뼈대 (퍼블리시 목록 wbs-skel 과 동일 톤)
 *
 * @example
 * <Skeleton variant="title" />
 * <Skeleton variant="text" width="80%" />
 * <Skeleton :width="120" :height="12" />
 */
export default {
  name: 'Skeleton',
  props: {
    variant: {
      type: String,
      default: 'rect',
      validator: function (v) {
        return VARIANT_OK.indexOf(v) !== -1
      }
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    /** block 표시 */
    block: {
      type: Boolean,
      default: false
    },
    /** 원형 */
    round: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    skeletonClass: function () {
      var list = []
      if (this.variant && this.variant !== 'rect') {
        list.push('skeleton_' + this.variant)
      }
      if (this.block || this.variant === 'title' || this.variant === 'text' || this.variant === 'text-sm' || this.variant === 'meta') {
        list.push('skeleton_block')
      }
      if (this.round || this.variant === 'avatar') {
        list.push('skeleton_round')
      }
      return list
    },
    skeletonStyle: function () {
      var style = {}
      if (this.width != null && this.width !== '') {
        style.width = typeof this.width === 'number' ? this.width + 'px' : this.width
      }
      if (this.height != null && this.height !== '') {
        style.height = typeof this.height === 'number' ? this.height + 'px' : this.height
      }
      return style
    }
  }
}
</script>
