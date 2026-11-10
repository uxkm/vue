'use client'

import { Link } from '@/lib/router' // 앱 라우터 Link (브랜드 등)
import { AppHeaderLink } from '@/comp' // 헤더 네비 링크
import { GuideLayout } from '@/screens/pub/widgets/guide' // 가이드·데모 공통 레이아웃

/**
 * 라이브러리 데모 공통 틀.
 * 목록(/demo/libs)으로 돌아가고, 제목·설명·본문을 통일한다.
 */
export function DemoPageShell ({
  title,
  description,
  slug,
  children
}) {
  return (
    <GuideLayout
      category="라이브러리 데모"
      title={title}
      description={description}
      showBack
      backTo="/demo/libs"
      backLabel="← 라이브러리 데모"
      headerBrand={(
        <Link className="app-header__brand" to="/demo/libs">Libs</Link>
      )}
      headerNav={(
        <>
          <AppHeaderLink to="/demo/libs">목록</AppHeaderLink>
          {slug
            ? <AppHeaderLink to={`/demo/${slug}`}>{title}</AppHeaderLink>
            : null}
        </>
      )}
    >
      {children}
    </GuideLayout>
  )
}
