<template>
  <div class="feed-create">
    <PageLoading :loading="loading">
      <template #skeleton>
        <IndexSkeleton />
      </template>
      <div class="page">
        <p>PC 메뉴</p>
        <h1>6. 피드생성</h1>
        <p>
          피드생성 메뉴 메인입니다. 하위 화면을 선택하세요.
        </p>
        <ul>
          <li>
            <router-link :to="'/pc/feed-create/01'">피드생성 01</router-link>
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
  name: 'PcFeedCreatePage',
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
    window.setTimeout(function () {
      self.loading = false
    }, 700)
  }
}
</script>
