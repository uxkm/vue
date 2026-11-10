'use client'

/**
 * 퍼블리싱 가이드 공통 레이아웃 (Shell + 본문 통합).
 * - Header 슬롯
 * - 좌측: <GuideMenu /> 호출
 * - 우측: 제목·설명·본문
 *
 * 헤더 숨김: export const meta = { header: false } (PageChrome)
 */
import { Link } from '@/lib/router' // 앱 라우터 Link
import { Container } from '@/comp/ui/Container' // 본문 폭·패딩 컨테이너
import { Header } from '@/comp/module/Header' // 상단 헤더 슬롯
import { hasNodes } from '@/utils/react' // children 유무 판별
import { cx } from '@/utils/cx' // className 결합
import { GUIDE_SECTION, useGuideTitle } from '@/screens/pub/shared/guideTitle' // 탭 섹션·가이드 타이틀
import { GuideMenu } from './GuideMenu' // 좌측 가이드 네비

const DEFAULT_GUIDE_BRAND = (
  <span className="app-header__brand">퍼블리싱 가이드</span>
)

/**
 * 가이드·데모 화면 공통 레이아웃
 *
 * @example
 * <GuideLayout category="기본 요소" title="Button" description="…">
 *   …
 * </GuideLayout>
 *
 * @example 좌측 메뉴 숨김
 * <GuideLayout showMenu={false} title="…" />
 */
export function GuideLayout ({
  category = '',
  title,
  description = '',
  children,
  /** 브라우저 탭용 페이지명. 생략 시 title 사용 */
  documentTitle,
  /** 브라우저 탭 섹션. 기본 퍼블리싱가이드 */
  documentSection = GUIDE_SECTION,
  /** inline | stacked */
  headerLayout = 'inline',
  /** stacked 전용: 스크롤 시 네비까지 함께 숨김 */
  hideNavOnScroll = false,
  /** 헤더 전체 교체 노드 */
  header,
  headerBack,
  headerBrand,
  /** 미지정 시 메뉴 없음(null) */
  headerNav = null,
  headerActions,
  /** 기본 false — 좌측「← 목록으로」숨김 */
  showBack = false,
  backTo = '/pub',
  backLabel = '← 목록으로',
  /** 좌측 GuideMenu 표시. 기본 true */
  showMenu = true,
  className
}) {
  useGuideTitle(documentTitle || title, { section: documentSection })

  const defaultBack = showBack
    ? <Link className="app-header__back-link" to={backTo}>{backLabel}</Link>
    : null
  const backNode = headerBack !== undefined ? headerBack : defaultBack
  const brandNode = headerBrand !== undefined ? headerBrand : DEFAULT_GUIDE_BRAND

  const headerControl = hasNodes(header)
    ? (
      <Header layout={headerLayout} hideNavOnScroll={hideNavOnScroll}>{header}</Header>
      )
    : (
      <Header
        layout={headerLayout}
        hideNavOnScroll={hideNavOnScroll}
        back={backNode}
        brand={brandNode}
        nav={headerNav}
        actions={headerActions}
      />
      )

  const page = (
    <div className="demo-page">
      {/* fluid: max-width 해제, 좌우 padding 만 남기고 가용 폭 100% */}
      <Container fluid>
        <header className="demo-page__header">
          {category && <p className="demo-page__cat">{category}</p>}
          <h1 className="demo-page__title">{title}</h1>
          {description && <p className="demo-page__desc">{description}</p>}
        </header>
        <section className="demo-page__body">{children}</section>
      </Container>
    </div>
  )

  return (
    <>
      {headerControl}
      {showMenu
        ? (
          <div className={cx('comp-guide', className)}>
            <GuideMenu />
            <div className="comp-guide__main">{page}</div>
          </div>
          )
        : page}
    </>
  )
}

export default GuideLayout
