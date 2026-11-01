/**
 * 퍼블리시 스텁 페이지 공통 로딩 데모 (Vue 3)
 * - mounted 시 짧은 지연 후 loading=false
 * - beforeUnmount 에서 타이머 정리 (언마운트 후 setState 경고 방지)
 */
export default {
  data: function () {
    return {
      loading: true,
      _loadingTimer: null
    }
  },
  mounted: function () {
    var self = this
    var delay = typeof this.loadingDemoDelay === 'number' ? this.loadingDemoDelay : 700
    this._loadingTimer = window.setTimeout(function () {
      self._loadingTimer = null
      self.loading = false
      if (typeof self.onLoadingDemoDone === 'function') {
        self.onLoadingDemoDone()
      }
    }, delay)
  },
  beforeUnmount: function () {
    if (this._loadingTimer) {
      window.clearTimeout(this._loadingTimer)
      this._loadingTimer = null
    }
  }
}
