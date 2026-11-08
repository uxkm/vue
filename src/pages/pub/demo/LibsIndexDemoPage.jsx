'use client'

import { Link } from '@/lib/router'
import { useGuideMenu } from '@/pages/pub/guideMenu'
import { DemoPageShell } from '../shared/DemoPageShell'

/** URL /demo/libs (파일명 기본 slug 인 libs-index 대신) */
export const routeId = 'libs'
/** 사이드 메뉴 라벨 (없으면 id 기반) */
export const guideLabel = 'Libs 목록'

/** guide-menu.json demoGroups 를 카드 목록으로 (libs 자신 제외) */
function demoItemsFromMenu (demoGroups) {
  const items = []
  for (const group of demoGroups || []) {
    for (const item of group.items || []) {
      if (!item?.id || item.id === 'libs') continue
      items.push({
        id: item.id,
        title: item.label || item.id,
        package: item.package || group.label || '',
        description: item.description || ''
      })
    }
  }
  return items
}

/** 라이브러리 데모 목록 — 메뉴는 public/data/pub/guide-menu.json */
export default function LibsIndexDemoPage () {
  const menu = useGuideMenu()
  const items = demoItemsFromMenu(menu?.guideDemoMenu)

  return (
    <DemoPageShell
      title="라이브러리 데모"
      description="guide-menu.json 의 Demo 목록. 각 카드로 이동합니다."
      slug="libs"
    >
      <div className="lib-demo-grid">
        {items.map((item) => (
          <Link
            key={item.id}
            className="lib-demo-card"
            to={`/demo/${item.id}`}
          >
            {item.package
              ? <p className="lib-demo-card__pkg">{item.package}</p>
              : null}
            <h2 className="lib-demo-card__title">{item.title}</h2>
            {item.description
              ? <p className="lib-demo-card__desc">{item.description}</p>
              : null}
          </Link>
        ))}
      </div>
    </DemoPageShell>
  )
}
