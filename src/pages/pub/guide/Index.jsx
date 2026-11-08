'use client'

/**
 * 퍼블리싱 가이드 홈 — /guide
 */
import { Link } from '@/lib/router'
import { GuideLayout } from '@/comp'
import { useGuideMenu } from '@/pages/pub/guideMenu'

export default function GuideIndex () {
  const menu = useGuideMenu()
  const componentGroups = menu?.guideMenu || []
  const demoGroups = menu?.guideDemoMenu || []

  return (
    <GuideLayout
      category="시작"
      title="소개"
      description="컴포넌트 예시와 라이브러리 데모를 한곳에서 확인하는 가이드입니다."
    >
      <div className="demo-block">
        <h2 className="demo-block__title">이 가이드에서 할 수 있는 일</h2>
        <ul className="guide-intro__list">
          <li>왼쪽 메뉴에서 컴포넌트를 골라 상태·변형 예시를 확인합니다.</li>
          <li>하단 <strong>Demo · UI / Demo · 유틸</strong> 에서 패키지별 동작 예시를 봅니다.</li>
          <li>퍼블리시 목록의 「컴포넌트 가이드」 링크는 <code>/guide</code> 소개 페이지로 연결됩니다.</li>
        </ul>
      </div>

      <div className="demo-block">
        <h2 className="demo-block__title">컴포넌트 그룹</h2>
        <div className="guide-intro__grid">
          {componentGroups.map((group) => (
            <div key={group.id} className="guide-intro__card">
              <p className="guide-intro__card-label">{group.label}</p>
              <ul>
                {group.items.slice(0, 4).map((item) => (
                  <li key={item.id}>
                    <Link className="guide-intro__link" to={`/guide/${item.id}`}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                {group.items.length > 4 ? (
                  <li className="guide-intro__more">외 {group.items.length - 4}개</li>
                ) : null}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-block">
        <h2 className="demo-block__title">Demo</h2>
        <div className="guide-intro__grid">
          {demoGroups.map((group) => (
            <div key={group.id} className="guide-intro__card">
              <p className="guide-intro__card-label">{group.label}</p>
              <ul>
                {group.items.slice(0, 5).map((item) => (
                  <li key={item.id}>
                    <Link className="guide-intro__link" to={`/demo/${item.id}`}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                {group.items.length > 5 ? (
                  <li className="guide-intro__more">외 {group.items.length - 5}개</li>
                ) : null}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-block">
        <h2 className="demo-block__title">바로가기</h2>
        <div className="demo-row">
          <Link className="guide-intro__cta" to="/guide/button">Button</Link>
          <Link className="guide-intro__cta" to="/demo/libs">Libs 목록</Link>
          <Link className="guide-intro__cta" to="/pub">Publish List</Link>
        </div>
      </div>
    </GuideLayout>
  )
}
