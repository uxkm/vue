'use client'

import { Link } from '@/lib/router'
import { Container, Header } from '@/components'
import { hasNodes } from '@/utils/react'

/**
 * 컴포넌트/테스트 데모 페이지 공통 셸
 *
 * 뒤로가기·헤더는 AppShell Header 슬롯으로 제공 — 본문에 두지 않음.
 * 페이지에서 header* props 또는 <Header> 로 수정 가능.
 */
export default function DemoShell ({
  category = '',
  title,
  description = '',
  children,
  /** 헤더 전체 숨김 */
  headerHidden = false,
  /** 헤더 전체 교체 노드 (<Header>{header}</Header>) */
  header,
  /** 뒤로가기 노드 (미지정 시 backTo/backLabel 기본 링크) */
  headerBack,
  headerBrand,
  headerNav,
  headerActions,
  showBack = true,
  backTo = '/',
  backLabel = '← 퍼블리시 목록으로'
}) {
  const defaultBack = showBack
    ? <Link className="app-header__back-link" to={backTo}>{backLabel}</Link>
    : null
  const backNode = headerBack !== undefined ? headerBack : defaultBack

  let headerControl = null
  if (headerHidden) {
    headerControl = <Header hidden />
  } else if (hasNodes(header)) {
    headerControl = <Header>{header}</Header>
  } else {
    headerControl = (
      <Header
        back={backNode}
        brand={headerBrand}
        nav={headerNav}
        actions={headerActions}
      />
    )
  }

  return (
    <>
      {headerControl}
      <div className="demo-page">
        <Container>
          <header className="demo-page__header">
            {category && <p className="demo-page__cat">{category}</p>}
            <h1 className="demo-page__title">{title}</h1>
            {description && <p className="demo-page__desc">{description}</p>}
          </header>
          <section className="demo-page__body">{children}</section>
        </Container>
      </div>
    </>
  )
}
