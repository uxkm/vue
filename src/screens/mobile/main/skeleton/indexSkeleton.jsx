import { Skeleton } from '@/comp'

/** 이 화면 로딩 뼈대. PageLoading 의 skeleton 으로 넘긴다 */
export default function MobileMainIndexSkeleton() {
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
