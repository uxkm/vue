import type { CSSProperties, HTMLAttributes } from 'react'
import { cx } from '@/utils/cx'

export type SkeletonVariant =
  | 'rect' | 'eyebrow' | 'title' | 'text' | 'text-sm'
  | 'meta' | 'chip' | 'avatar' | 'button'

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant
  width?: string | number | null
  height?: string | number | null
  /** block 표시 */
  block?: boolean
  /** 원형 */
  round?: boolean
}

/**
 * 스켈레톤 뼈대 (퍼블리시 목록 wbs-skel 과 동일 톤)
 *
 * @example
 * <Skeleton variant="title" />
 * <Skeleton variant="text" width="80%" />
 * <Skeleton width={120} height={12} />
 */
export function Skeleton ({
  variant = 'rect',
  width = null,
  height = null,
  block = false,
  round = false,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const skeletonStyle: CSSProperties = { ...style }
  if (width != null && width !== '') {
    skeletonStyle.width = typeof width === 'number' ? width + 'px' : width
  }
  if (height != null && height !== '') {
    skeletonStyle.height = typeof height === 'number' ? height + 'px' : height
  }

  return (
    <span
      {...rest}
      className={cx(
        'skeleton',
        variant && variant !== 'rect' && 'skeleton_' + variant,
        (block || variant === 'title' || variant === 'text' || variant === 'text-sm' || variant === 'meta') &&
          'skeleton_block',
        (round || variant === 'avatar') && 'skeleton_round',
        className
      )}
      style={skeletonStyle}
      aria-hidden="true"
    />
  )
}

export default Skeleton
