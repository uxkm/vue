import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  size?: '' | 'sm' | 'md' | 'lg' | 'xl'
  fluid?: boolean
  as?: string
  children?: ReactNode
}

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
