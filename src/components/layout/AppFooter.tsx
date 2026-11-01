import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

export interface AppFooterProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

export function AppFooter ({ children, className, ...rest }: AppFooterProps) {
  return (
    <footer {...rest} className={cx('app-footer', className)}>
      <div className="app-footer__inner">
        {hasNodes(children)
          ? children
          : <p className="app-footer__text">Publish List · UXKM</p>}
      </div>
    </footer>
  )
}

export default AppFooter
