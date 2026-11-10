'use client'

/**
 * 아바타.
 * 이니셜·이미지·아이콘으로 사용자/엔티티를 표시한다. 상태 점·그룹을 지원한다.
 */
import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 아바타 크기 */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'
/** 아바타 색 */
export type AvatarColor = 'primary' | 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted'

const VALID_SIZES = new Set(['sm', 'md', 'lg', 'xl'])

/** 아바타가 받는 값 */
export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  size?: AvatarSize
  color?: AvatarColor | ''
  square?: boolean
  src?: string
  alt?: string
  icon?: ReactNode
  /** 이니셜 텍스트 */
  initials?: ReactNode
  /** initials 별칭 */
  label?: ReactNode
  badgeColor?: string
  badgeLabel?: string
  ariaHidden?: boolean
  children?: ReactNode
}

/** 아바타 그룹 */
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  ariaLabel?: string
  children?: ReactNode
}

/**
 * 사람·항목을 나타내는 둥근 표식.
 * src 이미지 → 실패/없으면 icon · children · initials 순.
 */
export function Avatar ({
  size = 'md',
  color = '',
  square = false,
  src = '',
  alt = '',
  icon,
  initials,
  label,
  badgeColor = '',
  badgeLabel = '',
  ariaHidden = false,
  children,
  className,
  ...rest
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)
  const resolvedSize = VALID_SIZES.has(size) ? size : 'md'
  const showImage = Boolean(src) && !imageError
  const fallback = hasNodes(icon)
    ? icon
    : hasNodes(children)
      ? children
      : (initials ?? label)

  const [previousSrc, setPreviousSrc] = useState(src)
  if (previousSrc !== src) {
    setPreviousSrc(src)
    setImageError(false)
  }

  return (
    <span
      {...rest}
      className={cx(
        'avatar',
        color && 'color_' + color,
        resolvedSize !== 'md' && 'avatar_' + resolvedSize,
        square && 'avatar_square',
        className
      )}
      aria-hidden={ariaHidden || undefined}
    >
      {showImage
        ? (
          <img
            className="avatar_image"
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
          />
          )
        : fallback}
      {badgeColor
        ? (
          <span
            className={cx('avatar_badge', 'color_' + badgeColor)}
            role="img"
            aria-label={badgeLabel || undefined}
          />
          )
        : null}
    </span>
  )
}

/**
 * 아바타를 겹쳐 보여주는 묶음. role=group.
 */
export function AvatarGroup ({
  ariaLabel = '',
  className,
  children,
  ...rest
}: AvatarGroupProps) {
  return (
    <div
      {...rest}
      className={cx('avatar_group', className)}
      role="group"
      aria-label={ariaLabel || undefined}
    >
      {children}
    </div>
  )
}

export default Avatar
