<template>
  <div class="my-learning">
    <PageLoading :loading="loading">
      <template #skeleton>
        <Skeleton01 />
      </template>
      <div class="page">
        <p>5. My Learning</p>
        <h1>My Learning 01</h1>
        <dl>
          <div>
            <dt>Screen Type</dt>
            <dd>Page</dd>
          </div>
          <div>
            <dt>Screen ID</dt>
            <dd>MO-MYLEAR-001</dd>
          </div>
          <div>
            <dt>PageUrl</dt>
            <dd>#/mobile/my-learning/01</dd>
          </div>
        </dl>
        <p>
          My Learning 메뉴 퍼블리시 화면입니다. 시안·마크업을 이 페이지에 연결해 작업하세요.
        </p>
      </div>
    </PageLoading>
  </div>
</template>

<script>
import { PageLoading } from '@/components'
import Skeleton01 from './skeleton/01Skeleton'

export default {
  name: 'MobileMyLearningScreen01',
  components: {
    PageLoading: PageLoading,
    Skeleton01: Skeleton01
  },
  data: function () {
    return {
      loading: true
    }
  },
  mounted: function () {
    var self = this
    // 페이지 진입 로딩 예시 (실제 API 연동 시 교체)
    this._loadingTimer = window.setTimeout(function () {
      self._loadingTimer = null
      self.loading = false
    }, 700)
  },
  beforeUnmount: function () {
    if (this._loadingTimer) {
      window.clearTimeout(this._loadingTimer)
      this._loadingTimer = null
    }
  }
}
</script>
