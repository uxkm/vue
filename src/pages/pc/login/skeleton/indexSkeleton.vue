<template>
  <div class="page-skeleton">
    <Skeleton variant="eyebrow" />
    <Skeleton variant="title" />
    <Skeleton variant="text" />
    <Skeleton variant="chip" :width="96" />
    <Skeleton variant="chip" :width="88" />
  </div>
</template>

<script>
import { Skeleton } from '@/components'

export default {
  name: 'PcLoginIndexSkeleton',
  components: { Skeleton: Skeleton }
}
</script>
