/**
 * 폭 제한 컨테이너.
 * 본문 최대 폭(size) 또는 fluid 전체 폭으로 콘텐츠를 감싼다.
 */
import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'

/** 가로 폭을 제한하는 컨테이너 */
export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  size?: '' | 'sm' | 'md' | 'lg' | 'xl'
  fluid?: boolean
  as?: string
  children?: ReactNode
}

/**
 * 본문 폭을 제한하는 컨테이너.
 * size 최대 폭, fluid 면 폭 제한 없음, as 렌더 태그.
 */
export function Container ({
  size = '',
  fluid = false,
  as = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  return createElement(
    as,
    {
      ...rest,
      className: cx('container', fluid ? 'container_fluid' : size && 'container_' + size, className)
    },
    children
  )
}

export default Container
