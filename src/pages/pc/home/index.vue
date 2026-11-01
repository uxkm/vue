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
          참고 사이트 UI·인터랙션을 반영한 Home 퍼블리시 목록입니다.
        </p>
        <ul>
          <li>
            <router-link :to="'/pc/home/01'">Home 01 · Multicampus</router-link>
          </li>
          <li>
            <router-link :to="'/pc/home/02'">Home 02 · HD한국조선해양</router-link>
          </li>
          <li>
            <router-link :to="'/pc/home/03'">Home 03 · 토스플레이스</router-link>
          </li>
          <li>
            <router-link :to="'/pc/home/04'">Home 04 · 삼성SDS</router-link>
          </li>
          <li>
            <router-link :to="'/pc/home/05'">Home 05 · 당근 about</router-link>
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
    }, 500)
  },
  beforeUnmount: function () {
    if (this._loadingTimer) {
      window.clearTimeout(this._loadingTimer)
      this._loadingTimer = null
    }
  }
}
</script>
