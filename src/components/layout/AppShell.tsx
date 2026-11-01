import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'
import { LayoutProvider, useLayoutSlots } from './LayoutContext'
import { isLayoutSlotHidden } from './layout-slot-shared'

export interface AppShellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 헤더 전체 교체 (Vue #header 슬롯) */
  header?: ReactNode
  headerBrand?: ReactNode
  headerNav?: ReactNode
  headerActions?: ReactNode
  /** 푸터 전체 교체 (Vue #footer 슬롯) */
  footer?: ReactNode
  /** 기본 AppFooter 내용 (Vue #footer-content 슬롯) */
  footerContent?: ReactNode
  children?: ReactNode
}

function AppShellInner ({
  header,
  headerBrand,
  headerNav,
  headerActions,
  footer,
  footerContent,
  children,
  className,
  ...rest
}: AppShellProps) {
  const pageSlots = useLayoutSlots()

  const isSlotHidden = (name: string) => isLayoutSlotHidden(pageSlots[name])
  const slotNodes = (name: string): ReactNode =>
    isSlotHidden(name) ? null : (pageSlots[name] as ReactNode)
  const hasSlotNodes = (name: string) => hasNodes(slotNodes(name))
  /** 페이지 슬롯 우선, 없으면 AppShell prop */
  const pick = (name: string, prop: ReactNode): ReactNode =>
    hasSlotNodes(name) ? slotNodes(name) : prop

  let headerNode: ReactNode = null
  if (header !== undefined && header !== null && header !== false) {
    headerNode = header
  } else if (!isSlotHidden('header')) {
    headerNode = hasSlotNodes('header')
      ? slotNodes('header')
      : (
        <AppHeader
          brand={pick('header-brand', headerBrand)}
          nav={pick('header-nav', headerNav)}
          actions={pick('header-actions', headerActions)}
        />
      )
  }

  let footerNode: ReactNode = null
  if (footer !== undefined && footer !== null && footer !== false) {
    footerNode = footer
  } else if (!isSlotHidden('footer')) {
    if (hasSlotNodes('footer')) footerNode = slotNodes('footer')
    else if (hasSlotNodes('footer-content')) {
      footerNode = <AppFooter>{slotNodes('footer-content')}</AppFooter>
    } else if (hasNodes(footerContent)) footerNode = <AppFooter>{footerContent}</AppFooter>
    else footerNode = <AppFooter />
  }

  return (
    <div {...rest} className={cx('app-shell', className)}>
      {headerNode}
      <main className="app-shell__main">{children}</main>
      {footerNode}
    </div>
  )
}

export function AppShell (props: AppShellProps) {
  return (
    <LayoutProvider>
      <AppShellInner {...props} />
    </LayoutProvider>
  )
}

export default AppShell
