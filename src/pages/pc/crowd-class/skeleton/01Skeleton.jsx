import { Skeleton } from '@/components'

export default function PcCrowdClassSkeleton01() {
  return (
    <div className="page-skeleton">
      <Skeleton variant="eyebrow" />
      <Skeleton variant="title" />
      <Skeleton variant="meta" />
      <Skeleton variant="text" />
      <Skeleton variant="text-sm" />
    </div>
  )
}
