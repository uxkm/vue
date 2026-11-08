'use client'

import { useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'
import { LayoutProvider, useLayoutSlots } from './LayoutContext'
import { isLayoutSlotHidden } from './layout-slot-shared'

export interface AppShellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 헤더 전체 교체 (Vue #header 슬롯) */
  header?: ReactNode
  headerBack?: ReactNode
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
  headerBack,
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
  const shellRef = useRef<HTMLDivElement>(null)

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
          back={pick('header-back', headerBack)}
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

  const hasHeader = headerNode != null

  // 헤더 높이를 --app-header-height 로 노출 → 페이지 sticky 가 헤더 아래에 붙도록
  useLayoutEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const setHeight = (px: number) => {
      shell.style.setProperty('--app-header-height', `${Math.max(0, px)}px`)
    }

    if (!hasHeader) {
      setHeight(0)
      return
    }

    const main = shell.querySelector('.app-shell__main')
    const headerEl = main?.previousElementSibling as HTMLElement | null
    if (!headerEl) {
      setHeight(0)
      return
    }

    const update = () => setHeight(headerEl.offsetHeight)
    update()

    const ro = new ResizeObserver(update)
    ro.observe(headerEl)
    return () => ro.disconnect()
  }, [hasHeader])

  return (
    <div
      {...rest}
      ref={shellRef}
      className={cx('app-shell', hasHeader && 'app-shell--has-header', className)}
    >
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
