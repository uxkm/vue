import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { PageSkeleton, type PageSkeletonType } from './PageSkeleton'

export interface PageLoadingProps extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean
  label?: string
  /**
   * 문자열이면 공통 프리셋(page | list | form | card),
   * ReactNode 이면 커스텀 스켈레톤 (Vue #skeleton 슬롯)
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

/**
 * 페이지 로딩 래퍼
 *
 * @example
 * <PageLoading loading={loading} skeleton="form">...</PageLoading>
 *
 * @example 커스텀 스켈레톤
 * <PageLoading loading={loading} skeleton={<><Skeleton variant="title" /></>}>
 *   <div className="page">...</div>
 * </PageLoading>
 */
export function PageLoading ({
  loading = false,
  label = '불러오는 중',
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
  const isPreset = typeof skeleton === 'string'

  return (
    <div
      {...rest}
      className={cx('page-loading', className)}
      aria-busy={loading ? 'true' : 'false'}
      aria-label={loading ? label : undefined}
    >
      {loading
        ? (!isPreset && hasNodes(skeleton)
          ? skeleton
          : (
            <PageSkeleton
              type={(isPreset ? skeleton : 'page') as PageSkeletonType}
              showMeta={showMeta}
              showLinks={showLinks}
              linkCount={linkCount}
              rows={rows}
              fields={fields}
              cards={cards}
            />
          ))
        : children}
    </div>
  )
}

export default PageLoading
