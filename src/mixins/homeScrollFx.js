import { bindHomeScrollFx, createStickyProgress } from '@/utils/scrollFx'

/**
 * Home 랜딩 스크롤 인터랙션 믹스인 (Vue 3)
 * - 등장: CSS + IntersectionObserver (data-fx)
 * - 패럴랙스: rAF (data-parallax)
 * - sticky 진행: createStickyProgress (옵션, this.$refs.scrollTrack)
 */
export default {
  data: function () {
    return {
      stickyProgress: 0
    }
  },
  watch: {
    loading: function (val) {
      if (val === false) {
        var self = this
        this.$nextTick(function () {
          self.setupHomeScrollFx()
        })
      }
    }
  },
  mounted: function () {
    if (this.loading === false) {
      var self = this
      this.$nextTick(function () {
        self.setupHomeScrollFx()
      })
    }
  },
  beforeUnmount: function () {
    this.teardownHomeScrollFx()
  },
  methods: {
    setupHomeScrollFx: function () {
      this.teardownHomeScrollFx()
      this.__homeScrollUnbind = bindHomeScrollFx(this)

      if (this.$refs.scrollTrack) {
        var self = this
        this.__stickyCtrl = createStickyProgress(this.$refs.scrollTrack, function (p) {
          self.stickyProgress = p
          if (typeof self.onStickyProgress === 'function') {
            self.onStickyProgress(p)
          }
        })
      }
    },
    teardownHomeScrollFx: function () {
      if (typeof this.__homeScrollUnbind === 'function') {
        this.__homeScrollUnbind()
        this.__homeScrollUnbind = null
      }
      if (this.__stickyCtrl && typeof this.__stickyCtrl.destroy === 'function') {
        this.__stickyCtrl.destroy()
        this.__stickyCtrl = null
      }
    },
    onStickyProgress: function () {}
  }
}
