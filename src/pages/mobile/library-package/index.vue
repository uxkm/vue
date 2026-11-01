<template>
  <div class="library-package">
    <PageLoading :loading="loading">
      <template #skeleton>
        <IndexSkeleton />
      </template>
      <div class="page">
        <p>MOBILE 메뉴</p>
        <h1>10. 라이브러리패키지</h1>
        <p>
          라이브러리패키지 메뉴 메인입니다. 하위 화면을 선택하세요.
        </p>
        <ul>
          <li>
            <router-link :to="'/mobile/library-package/01'">라이브러리패키지 01</router-link>
          </li>
        </ul>
      </div>
    </PageLoading>
  </div>
</template>

<script>
import { PageLoading } from '@/components'
import IndexSkeleton from './skeleton/indexSkeleton'

export default {
  name: 'MobileLibraryPackagePage',
  components: {
    PageLoading: PageLoading,
    IndexSkeleton: IndexSkeleton
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
