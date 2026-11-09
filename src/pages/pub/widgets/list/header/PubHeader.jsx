/**
 * PubHeader
 * - /pub 퍼블리시 목록 전용 헤더 슬롯
 * - 컴포넌트 가이드는 번역 드롭다운 옆(actions)에 배치, 새 창
 * - 숨김은 meta.header (PageChrome). 일반 페이지는 PageHeader / Header
 */
import { Header, AppHeaderLink } from '@/comp'
import { Link } from '@/lib/router'

const DEFAULT_BRAND = 'Publish List'

/** 번역 스위치 옆에 두는 컴포넌트 가이드 (새 창) */
function GuideAction () {
  return (
    <AppHeaderLink
      to="/guide"
      target="_blank"
      rel="noopener noreferrer"
    >컴포넌트 가이드</AppHeaderLink>
  )
}

export default function PubHeader ({
  layout = 'stacked',
  hideNavOnScroll = false,
  projectName,
  brand,
  nav,
  actions,
  back
}) {
  const title = projectName || DEFAULT_BRAND

  return (
    <Header
      layout={layout}
      hideNavOnScroll={hideNavOnScroll}
      back={back}
      brand={
        brand ?? (
          <Link className="app-header__brand" to="/pub">{title}</Link>
        )
      }
      nav={
        nav ?? (
          <AppHeaderLink to="/pub">목록</AppHeaderLink>
        )
      }
      actions={
        actions ?? (
          <GuideAction />
        )
      }
    />
  )
}
