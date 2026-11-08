'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'

/** `#/web/login` → `/web/login` */
export function toAppHref (url?: string | null) {
  if (url == null || url === '') return url as any
  const s = String(url)
  if (s.startsWith('#/')) return s.slice(1)
  if (s.startsWith('#')) return '/' + s.slice(1)
  return s
}

/** 링크 class. 문자이거나 활성 여부를 받는 함수 */
export type LinkClassName =
  | string
  | ((state: { isActive: boolean, isPending: boolean }) => string | undefined)

/** 앱 링크가 받는 값. to 는 내부 경로 */
export interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'> {
  to?: string
  href?: string
  end?: boolean
  className?: LinkClassName
  children?: ReactNode
  replace?: boolean
  prefetch?: boolean
}

/**
 * react-router-dom `<Link to>` 호환 (Next.js)
 */
export const Link = forwardRef<HTMLAnchorElement, AppLinkProps>(function Link (
  { to, href, className, end, children, replace, prefetch, ...rest },
  ref
) {
  const pathname = usePathname() || '/'
  const target = toAppHref(to ?? href ?? '/') || '/'
  const active = end
    ? pathname === target
    : pathname === target || (target !== '/' && pathname.startsWith(String(target) + '/'))

  const resolvedClass =
    typeof className === 'function'
      ? className({ isActive: active, isPending: false })
      : className

  return (
    <NextLink
      ref={ref}
      href={target}
      replace={replace}
      prefetch={prefetch}
      className={cx(resolvedClass)}
      {...rest}
    >
      {children}
    </NextLink>
  )
})

/** NavLink 별칭 */
export const NavLink = Link

export default Link
