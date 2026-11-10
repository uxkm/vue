'use client'

/**
 * 페이지 로딩 래퍼.
 * auto 측정 스켈레톤 또는 manual PageSkeleton 으로 로딩 UI 를 표시.
 */
import type { HTMLAttributes, ReactNode } from 'react'
import { resolveSkeletonMode, type SkeletonMode } from '@/config/skeleton'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { AutoSkeleton } from './AutoSkeleton'
import { PageSkeleton, type PageSkeletonType } from './PageSkeleton'

export type { SkeletonMode }

/** 페이지 로딩이 받는 값. auto 면 측정, manual 이면 skeleton */
export interface PageLoadingProps extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean
  label?: string
  /**
   * auto(기본): children UI 를 측정해 자동 스켈레톤
   * manual: skeleton 으로 넘긴 수동 디자인 사용
   * 생략 시 src/config/skeleton.ts 의 페이지 맵 → 전역 기본값
   */
  skeletonMode?: SkeletonMode
  /** auto 캐시·설정 키 (예: 'web/user-page') */
  skeletonId?: string
  /**
   * manual 모드: 수동 스켈레톤
   * auto 모드: 첫 방문 등 캐시 없을 때 폴백 (프리셋 문자열 또는 노드)
   */
  skeleton?: PageSkeletonType | string | ReactNode
  showMeta?: boolean
  showLinks?: boolean
  linkCount?: number
  rows?: number
  fields?: number
  cards?: number
  children?: ReactNode
}

/** skeleton 이 문자열이면 프리셋, 노드면 그 노드를 그대로 쓴다 */
function resolvePresetOrNode (
  skeleton: PageSkeletonType | string | ReactNode | undefined,
  opts: {
    showMeta: boolean
    showLinks: boolean
    linkCount: number
    rows: number
    fields: number
    cards: number
  }
): ReactNode {
  const isPreset = typeof skeleton === 'string' || skeleton == null
  if (!isPreset && hasNodes(skeleton)) return skeleton

  return (
    <PageSkeleton
      type={(isPreset && skeleton ? skeleton : 'page') as PageSkeletonType}
      showMeta={opts.showMeta}
      showLinks={opts.showLinks}
      linkCount={opts.linkCount}
      rows={opts.rows}
      fields={opts.fields}
      cards={opts.cards}
    />
  )
}

/**
 * 페이지 로딩 래퍼
 * - 기본(auto): 실제 children 레이아웃을 측정해 스켈레톤 자동 생성
 * - manual: 디자인 확정본 skeleton 노드 사용 (config 또는 prop)
 *
 * @example
 * // 자동 (기본)
 * <PageLoading loading={loading} skeletonId="web/user-page" className="page-container">
 *   ...
 * </PageLoading>
 *
 * @example
 * // 디자인 확정 후 수동
 * <PageLoading
 *   loading={loading}
 *   skeletonId="web/user-page"
 *   skeletonMode="manual"
 *   skeleton={<IndexSkeleton />}
 *   className="page-container"
 * >
 *   ...
 * </PageLoading>
 */
export function PageLoading ({
  loading = false,
  label = '불러오는 중',
  skeletonMode,
  skeletonId,
  skeleton = 'page',
  showMeta = true,
  showLinks = false,
  linkCount = 3,
  rows = 5,
  fields = 2,
  cards = 4,
  children,
  className,
  ...rest
}: PageLoadingProps) {
  const id = skeletonId || className || 'page'
  const mode = resolveSkeletonMode(id, skeletonMode)
  const presetOpts = { showMeta, showLinks, linkCount, rows, fields, cards }
  const manualOrFallback = resolvePresetOrNode(skeleton, presetOpts)

  if (mode === 'manual') {
    if (loading) {
      return (
        <div
          {...rest}
          className={cx('page-loading', className)}
          role={rest.role || 'status'}
          aria-busy="true"
          aria-label={label}
        >
          {manualOrFallback}
        </div>
      )
    }

    if (className || Object.keys(rest).length > 0) {
      return (
        <div {...rest} className={className}>
          {children}
        </div>
      )
    }

    return children
  }

  // auto: 항상 같은 래퍼를 유지해 레이아웃 측정·캐시
  return (
    <div
      {...rest}
      className={cx(loading && 'page-loading', className)}
      role={rest.role || (loading ? 'status' : undefined)}
      aria-busy={loading || undefined}
      aria-label={loading ? label : undefined}
    >
      <AutoSkeleton id={String(id)} loading={loading} fallback={manualOrFallback}>
        {children}
      </AutoSkeleton>
    </div>
  )
}

export default PageLoading
