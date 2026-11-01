<template>
  <div class="page-skeleton">
    <Skeleton variant="eyebrow" />
    <Skeleton variant="title" />
    <Skeleton variant="meta" />
    <Skeleton variant="text" />
    <Skeleton variant="text-sm" />
  </div>
</template>

<script>
import { Skeleton } from '@/components'

export default {
  name: 'MobileUserPageSkeleton01',
  components: { Skeleton: Skeleton }
}
</script>
