/**
 * 빈 상태 안내.
 * 데이터 없을 때 아이콘·설명·푸터 액션을 보여 준다.
 */
import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 빈 상태가 받는 값 */
export interface EmptyProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  description?: ReactNode
  /** @deprecated description 을 사용하세요 */
  title?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  /** empty_simple — 이미지 영역 숨김 */
  simple?: boolean
  /** empty_block — 가로 전체 */
  block?: boolean
  icon?: ReactNode
  /** icon 과 동일. icon 이 있으면 icon 우선 */
  image?: ReactNode
  footer?: ReactNode
  children?: ReactNode
}

/**
 * 데이터가 없을 때 안내.
 * description 설명, icon·image 그림, footer·children 액션.
 */
export function Empty ({
  description = '',
  title = '',
  size = 'md',
  simple = false,
  block = false,
  icon,
  image,
  footer,
  children,
  className,
  ...rest
}: EmptyProps) {
  const resolvedDescription = hasNodes(description)
    ? description
    : hasNodes(title)
      ? title
      : '데이터가 없습니다'
  const media = hasNodes(icon) ? icon : image
  const hasMedia = hasNodes(media)
  const footerContent = hasNodes(footer) ? footer : children
  const hasFooter = hasNodes(footerContent)

  return (
    <div
      {...rest}
      className={cx(
        'empty',
        size === 'sm' && 'empty_sm',
        size === 'lg' && 'empty_lg',
        simple && 'empty_simple',
        block && 'empty_block',
        className
      )}
      role="status"
    >
      {hasMedia && (
        <div className="empty_image" aria-hidden="true">
          {media}
        </div>
      )}
      <p className="empty_desc">{resolvedDescription}</p>
      {hasFooter && <div className="empty_footer">{footerContent}</div>}
    </div>
  )
}

export default Empty
