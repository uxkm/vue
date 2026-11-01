<template>
  <div class="page-skeleton">
    <Skeleton variant="title" />
    <Skeleton variant="meta" height="48px" />
    <Skeleton variant="meta" height="48px" />
    <Skeleton variant="button" width="100%" height="48px" block />
  </div>
</template>

<script>
import { Skeleton } from '@/components'

export default {
  name: 'PcLoginSkeleton01',
  components: { Skeleton: Skeleton }
}
</script>
