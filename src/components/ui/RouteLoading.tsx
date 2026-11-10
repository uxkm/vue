/**
 * 라우트 전환 로딩.
 * PageChrome(meta) + PageSkeleton 으로 본문 도착 전 UI 를 맞춘다.
 */
import { PageChrome } from '@/comp/widget/PageChrome'
import type { PageMeta } from '@/comp/shared/page-meta'
import { PageSkeleton } from './PageSkeleton'

/** 경로 로딩이 받는 값. meta 로 헤더·푸터를 본문과 맞춘다 */
export interface RouteLoadingProps {
  /**
   * 이 라우트의 크롬. (공통 PageMeta)
   * true 표시, false 숨김. 없으면 공통 헤더·푸터를 표시한다.
   * 화면 파일이 오기 전에도 알아야 하므로 registry 의 meta 맵을 넘긴다.
   */
  meta?: PageMeta | null
}

/**
 * 공통 라우트 로딩.
 * 화면 청크를 기다리는 동안 meta 와 같은 헤더·푸터를 유지한다.
 * 로딩이 끝난 뒤 크롬이 갑자기 생겼다 사라지지 않게 하는 것이 이 컴포넌트의 역할이다.
 * 화면 안의 PageLoading(데이터 로딩)과는 별개다.
 */
export function RouteLoading ({ meta }: RouteLoadingProps) {
  return (
    <>
      <PageChrome meta={meta} />
      <div className="page-loading page-container" role="status" aria-busy="true" aria-label="불러오는 중">
        <PageSkeleton type="card" />
      </div>
    </>
  )
}

export default RouteLoading
