<template>
  <div
    class="page-skeleton"
    :class="'page-skeleton_' + type"
    aria-hidden="true"
  >
    <slot>
      <!-- page: 퍼블리시 .page 기본 -->
      <template v-if="type === 'page'">
        <div class="page-skeleton__eyebrow">
          <Skeleton variant="eyebrow" />
        </div>
        <div class="page-skeleton__title">
          <Skeleton variant="title" />
        </div>
        <div v-if="showMeta" class="page-skeleton__meta">
          <Skeleton variant="meta" />
        </div>
        <div class="page-skeleton__desc">
          <Skeleton variant="text" />
          <Skeleton variant="text-sm" />
        </div>
        <div v-if="showLinks" class="page-skeleton__links">
          <Skeleton
            v-for="n in linkCount"
            :key="'link-' + n"
            variant="chip"
            :width="72 + (n % 3) * 16"
          />
        </div>
      </template>

      <!-- list: 목록/카드 리스트 -->
      <template v-else-if="type === 'list'">
        <div class="page-skeleton__title">
          <Skeleton variant="title" />
        </div>
        <div
          v-for="n in rows"
          :key="'row-' + n"
          class="page-skeleton__row"
        >
          <Skeleton variant="avatar" />
          <div class="page-skeleton__row-body">
            <Skeleton variant="text" width="55%" />
            <Skeleton variant="text-sm" width="40%" />
          </div>
        </div>
      </template>

      <!-- form: 로그인·입력 폼 -->
      <template v-else-if="type === 'form'">
        <div class="page-skeleton__title">
          <Skeleton variant="title" width="200px" />
        </div>
        <div class="page-skeleton__form">
          <Skeleton
            v-for="n in fields"
            :key="'field-' + n"
            variant="meta"
            height="44px"
          />
          <Skeleton variant="button" width="100%" height="44px" block />
        </div>
      </template>

      <!-- card: 카드 그리드 -->
      <template v-else-if="type === 'card'">
        <div class="page-skeleton__title">
          <Skeleton variant="title" />
        </div>
        <div class="page-skeleton__cards">
          <Skeleton
            v-for="n in cards"
            :key="'card-' + n"
            class="page-skeleton__card"
            width="100%"
            height="140px"
            block
          />
        </div>
      </template>
    </slot>
  </div>
</template>

<script>
import Skeleton from './Skeleton.vue'

var TYPE_OK = ['page', 'list', 'form', 'card']

/**
 * 공통 스켈레톤 프리셋: page / list / form / card
 * 페이지마다 다르면 별도 파일 없이 PageLoading #skeleton 슬롯 사용
 */
export default {
  name: 'PageSkeleton',
  components: { Skeleton: Skeleton },
  props: {
    type: {
      type: String,
      default: 'page',
      validator: function (v) {
        return TYPE_OK.indexOf(v) !== -1
      }
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
