import { Skeleton } from '@/components'

export default function PcCertificationIndexSkeleton() {
  return (
    <div className="page-skeleton">
      <Skeleton variant="eyebrow" />
      <Skeleton variant="title" />
      <Skeleton variant="text" />
      <Skeleton variant="chip" width={96} />
      <Skeleton variant="chip" width={88} />
    </div>
  )
}
