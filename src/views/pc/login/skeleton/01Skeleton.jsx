import { Skeleton } from '@/components'

export default function PcLoginSkeleton01() {
  return (
    <div className="page-skeleton">
      <Skeleton variant="title" />
      <Skeleton variant="meta" height="48px" />
      <Skeleton variant="meta" height="48px" />
      <Skeleton variant="button" width="100%" height="48px" block />
    </div>
  )
}
