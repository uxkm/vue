import { PageSkeleton } from '@/comp/ui/PageSkeleton'

/** App Router가 다음 경로를 준비하는 동안 표시하는 공통 로딩 UI. */
export default function Loading () {
  return (
    <div className="page-loading page-container" role="status" aria-busy="true" aria-label="불러오는 중">
      <PageSkeleton type="card" />
    </div>
  )
}
