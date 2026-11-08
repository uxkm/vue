/**
 * 스켈레톤 한 칸.
 * variant · size · width 토큰으로 로딩 뼈대 조각을 그린다.
 */
import type { CSSProperties, HTMLAttributes } from 'react'
import { cx } from '@/utils/cx'

/** SCSS 형태 클래스에 대응하는 variant. avatar 등은 별칭 */
export type SkeletonVariant =
  | 'rect'
  | 'text'
  | 'title'
  | 'circle'
  | 'button'
  | 'image'
  | 'block'
  | 'avatar'
  | 'eyebrow'
  | 'meta'
  | 'chip'
  | 'text-sm'

/** 뼈대 한 칸이 받는 값 */
export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant
  size?: 'sm' | 'md' | 'lg'
  /** 숫자·CSS 길이, 또는 sm · md · lg 너비 토큰(skeleton_w-*) */
  width?: string | number | null
  height?: string | number | null
  /** 가로 100%. rect 이고 높이 없으면 skeleton_block */
  block?: boolean
  /** 원형(skeleton_circle). variant circle · avatar 와 동일 */
  round?: boolean
  /** 반짝임 애니메이션 끄기(skeleton_static) */
  static?: boolean
}

/** variant → skeleton_* 형태 클래스 (rect 는 없음) */
const VARIANT_CLASS: Record<Exclude<SkeletonVariant, 'rect'>, string> = {
  text: 'skeleton_text',
  title: 'skeleton_title',
  circle: 'skeleton_circle',
  button: 'skeleton_button',
  image: 'skeleton_image',
  block: 'skeleton_block',
  avatar: 'skeleton_circle',
  eyebrow: 'skeleton_text',
  meta: 'skeleton_text',
  chip: 'skeleton_button',
  'text-sm': 'skeleton_text'
}

/**
 * 스켈레톤 뼈대.
 *
 * @example
 * <Skeleton variant="title" />
 * <Skeleton variant="text" width="lg" />
 * <Skeleton width={120} height={12} />
 */
export function Skeleton ({
  variant = 'rect',
  size = 'md',
  width = null,
  height = null,
  block = false,
  round = false,
  static: isStatic = false,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const widthToken =
    width === 'sm' || width === 'md' || width === 'lg' ? width : null

  const skeletonStyle: CSSProperties = { ...style }
  if (width != null && width !== '' && !widthToken) {
    skeletonStyle.width = typeof width === 'number' ? width + 'px' : width
  }
  if (height != null && height !== '') {
    skeletonStyle.height = typeof height === 'number' ? height + 'px' : height
  }
  if (block && skeletonStyle.width == null && !widthToken) {
    skeletonStyle.width = '100%'
  }

  const formClass = variant !== 'rect' ? VARIANT_CLASS[variant] : ''
  const useBlockClass = block && variant === 'rect' && height == null
  const useSizeSm = size === 'sm' || variant === 'text-sm'
  const useSizeLg = size === 'lg'
  const useWidthSm = widthToken === 'sm' || (variant === 'eyebrow' && !widthToken && width == null)

  return (
    <span
      {...rest}
      className={cx(
        'skeleton',
        formClass,
        round && variant !== 'circle' && variant !== 'avatar' && 'skeleton_circle',
        useBlockClass && 'skeleton_block',
        useSizeSm && 'skeleton_sm',
        useSizeLg && 'skeleton_lg',
        useWidthSm && 'skeleton_w-sm',
        widthToken === 'md' && 'skeleton_w-md',
        widthToken === 'lg' && 'skeleton_w-lg',
        variant === 'meta' && !widthToken && width == null && 'skeleton_w-md',
        isStatic && 'skeleton_static',
        className
      )}
      style={skeletonStyle}
      aria-hidden="true"
    />
  )
}

export default Skeleton
