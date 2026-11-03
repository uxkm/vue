<template>
  <div class="home">
    <PageLoading :loading="loading">
      <template #skeleton>
        <IndexSkeleton />
      </template>
      <div class="page">
        <p>PC 메뉴</p>
        <h1>1. Home</h1>
        <p>
          Home 메뉴 메인입니다. 하위 화면을 선택하세요.
        </p>
        <ul>
          <li>
            <router-link :to="'/pc/home/01'">Home 01</router-link>
          </li>
          <li>
            <router-link :to="'/pc/home/02'">Home 02</router-link>
          </li>
          <li>
            <router-link :to="'/pc/home/03'">Home 03</router-link>
          </li>
          <li>
            <router-link :to="'/pc/home/04'">Home 04</router-link>
          </li>
          <li>
            <router-link :to="'/pc/home/05'">Home 05</router-link>
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
  name: 'PcHomePage',
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
