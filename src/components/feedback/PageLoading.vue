<template>
  <div
    class="page-loading"
    :aria-busy="loading ? 'true' : 'false'"
    :aria-label="loading ? label : null"
  >
    <template v-if="loading">
      <!-- 다를 때만 #skeleton 슬롯 (별도 파일 없이 페이지 안에 작성) -->
      <slot name="skeleton">
        <PageSkeleton
          :type="skeleton"
          :show-meta="showMeta"
          :show-links="showLinks"
          :link-count="linkCount"
          :rows="rows"
          :fields="fields"
          :cards="cards"
        />
      </slot>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
import PageSkeleton from './PageSkeleton.vue'

/**
 * 페이지 로딩 래퍼
 *
 * 스켈레톤은 파일로 쪼개지 않고:
 * 1) skeleton="page|list|form|card" 공통 프리셋
 * 2) 다를 때만 #skeleton 슬롯을 같은 vue 파일에 작성
 *
 * @example
 * <PageLoading :loading="loading" skeleton="form" />
 *
 * @example
 * <PageLoading :loading="loading">
 *   <template #skeleton>
 *     <Skeleton variant="title" />
 *     <Skeleton variant="meta" height="48px" />
 *   </template>
 *   <div class="page">...</div>
 * </PageLoading>
 */
export default {
  name: 'PageLoading',
  components: { PageSkeleton: PageSkeleton },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '불러오는 중'
    },
    /** 공통 프리셋: page | list | form | card */
    skeleton: {
      type: String,
      default: 'page'
    },
    showMeta: {
      type: Boolean,
      default: true
    },
    showLinks: {
      type: Boolean,
      default: false
    },
    linkCount: {
      type: Number,
      default: 3
    },
    rows: {
      type: Number,
      default: 5
    },
    fields: {
      type: Number,
      default: 2
    },
    cards: {
      type: Number,
      default: 4
    }
  }
}
</script>
