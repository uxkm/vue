<template>
  <div
    class="progress"
    :class="progressClass"
    role="progressbar"
    :aria-valuenow="indeterminate ? null : clamped"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="ariaLabel || label || '진행률'"
  >
    <div class="progress_track">
      <div
        class="progress_bar"
        :class="barClass"
        :style="barStyle"
      >
        <span v-if="inside && showInfo" class="progress_info">{{ infoText }}</span>
      </div>
    </div>
    <span v-if="!inside && showInfo" class="progress_info">{{ infoText }}</span>
  </div>
</template>

<script>
var SIZE_OK = ['sm', 'md', 'lg']
var STATUS_OK = ['', 'success', 'exception']
var COLOR_OK = ['primary', 'success', 'warning', 'danger', 'info', 'muted']

export default {
  name: 'Progress',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: '',
      validator: function (v) {
        return STATUS_OK.indexOf(v) !== -1
      }
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
    showInfo: Boolean,
    striped: Boolean,
    animated: Boolean,
    indeterminate: Boolean,
    inside: Boolean,
    block: Boolean,
    label: {
      type: String,
      default: ''
    },
    ariaLabel: {
      type: String,
      default: ''
    }
  },
  computed: {
    clamped: function () {
      var n = Number(this.percent)
      if (isNaN(n)) return 0
      if (n < 0) return 0
      if (n > 100) return 100
      return n
    },
    infoText: function () {
      if (this.label) return this.label
      if (this.status === 'success') return '완료'
      if (this.status === 'exception') return '실패'
      return this.clamped + '%'
    },
    progressClass: function () {
      var classes = []
      if (this.size === 'sm') classes.push('progress_sm')
      if (this.size === 'lg') classes.push('progress_lg')
      if (this.block) classes.push('progress_block')
      if (this.inside) classes.push('progress_inside')
      if (this.indeterminate) classes.push('is-indeterminate')
      if (this.status === 'success') classes.push('is-success')
      if (this.status === 'exception') classes.push('is-exception')
      return classes
    },
    barClass: function () {
      var classes = []
      if (this.color) classes.push('color_' + this.color)
      if (this.striped) classes.push('progress_striped')
      if (this.animated) classes.push('progress_animated')
      return classes
    },
    barStyle: function () {
      if (this.indeterminate) return null
      return { width: this.clamped + '%' }
    }
  }
}
</script>
