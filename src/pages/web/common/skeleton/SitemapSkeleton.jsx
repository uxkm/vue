import { Skeleton } from '@/comp'

/** 이 화면 로딩 뼈대. PageLoading 의 skeleton 으로 넘긴다 */
export default function WebCommonSitemapSkeleton() {
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
