'use client'

/**
 * 퍼블리싱 가이드 좌측 메뉴.
 * GuideLayout 에서 호출한다. 소개 / 컴포넌트 / 데모 네비.
 */
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Link } from '@/lib/router'
import { cx } from '@/utils/cx'
import { guideHomePath, useGuideMenu } from '@/pages/pub/guideMenu'

/** pathname 이 `/guide/{item.id}` 인 컴포넌트 그룹 id (예: /guide/Button) */
function findComponentGroupId (pathname, guideMenu) {
  for (const group of guideMenu) {
    if (group.items.some((item) => pathname === '/guide/' + item.id)) {
      return group.id
    }
  }
  return null
}

/** pathname 이 `/demo/{item.id}` 인 데모 그룹 id */
function findDemoGroupId (pathname, guideDemoMenu) {
  for (const group of guideDemoMenu) {
    if (group.items.some((item) => pathname === '/demo/' + item.id)) {
      return group.id
    }
  }
  return null
}

/** 활성 컴포넌트/데모 그룹만 true */
function buildOpenMap (pathname, guideMenu, guideDemoMenu) {
  const map = {}
  const componentId = findComponentGroupId(pathname, guideMenu)
  const demoId = findDemoGroupId(pathname, guideDemoMenu)
  if (componentId) map[componentId] = true
  if (demoId) map[demoId] = true
  return map
}

/**
 * 가이드 좌측 aside 메뉴.
 * - navOpen     : 목록 전체 표시/숨김
 * - openGroups  : 그룹 아코디언 `{ [groupId]: boolean }`
 */
export function GuideMenu ({ className }) {
  const pathname = usePathname() || ''
  const menu = useGuideMenu()
  const [navOpen, setNavOpen] = useState(true)
  const [openGroups, setOpenGroups] = useState({})

  const guideIntroItem = menu?.intro || { id: 'intro', label: '소개' }
  const guideMenu = menu?.guideMenu || []
  const guideDemoMenu = menu?.guideDemoMenu || []
  const introHref = guideHomePath
  const introActive = pathname === guideHomePath || pathname === '/guide/'

  useEffect(() => {
    if (!menu) return
    const next = buildOpenMap(pathname, guideMenu, guideDemoMenu)
    if (!Object.keys(next).length) return
    setOpenGroups((prev) => {
      let changed = false
      const merged = { ...prev }
      for (const id of Object.keys(next)) {
        if (!merged[id]) {
          merged[id] = true
          changed = true
        }
      }
      return changed ? merged : prev
    })
  }, [pathname, menu, guideMenu, guideDemoMenu])

  const toggleGroup = (id) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const componentTotal = guideMenu.reduce((sum, group) => sum + group.items.length, 0)

  return (
    <aside
      className={cx('comp-guide__nav', { 'is-collapsed': !navOpen }, className)}
      aria-label="가이드 목록"
    >
      <div className="comp-guide__nav-head">
        {navOpen && <p className="comp-guide__nav-title">가이드</p>}
        <button
          type="button"
          className="comp-guide__toggle"
          aria-expanded={navOpen ? 'true' : 'false'}
          aria-controls="comp-guide-list"
          onClick={() => setNavOpen((value) => !value)}
        >
          {navOpen ? '접기' : '펼치기'}
        </button>
      </div>

      <nav id="comp-guide-list" className="comp-guide__list" hidden={!navOpen}>
        <div className="comp-guide__top">
          <Link
            className={cx('comp-guide__top-link', { 'is-active': introActive })}
            to={introHref}
            aria-current={introActive ? 'page' : undefined}
          >
            {guideIntroItem.label}
          </Link>
        </div>

        <div className="comp-guide__section">
          <p className="comp-guide__section-label">
            <span>컴포넌트</span>
            <span className="comp-guide__count" aria-label={`하위 ${componentTotal}개`}>
              {componentTotal}
            </span>
          </p>
          {guideMenu.map((group) => {
            const expanded = !!openGroups[group.id]
            const panelId = 'comp-guide-group-' + group.id
            const count = group.items.length
            return (
              <div
                key={group.id}
                className={cx('comp-guide__group', { 'is-open': expanded })}
              >
                <button
                  type="button"
                  className="comp-guide__group-toggle"
                  aria-expanded={expanded ? 'true' : 'false'}
                  aria-controls={panelId}
                  onClick={() => toggleGroup(group.id)}
                >
                  <span className="comp-guide__toggle-label">
                    <span>{group.label}</span>
                    <span className="comp-guide__count" aria-label={`하위 ${count}개`}>
                      {count}
                    </span>
                  </span>
                  <span className="comp-guide__chevron" aria-hidden="true" />
                </button>
                <ul id={panelId} hidden={!expanded}>
                    {group.items.map((item) => {
                      const href = '/guide/' + item.id
                      const active = pathname === href
                      return (
                        <li key={item.id}>
                          <Link
                            className={cx('comp-guide__link', { 'is-active': active })}
                            to={href}
                            aria-current={active ? 'page' : undefined}
                          >
                            {item.label}
                          </Link>
                        </li>
                      )
                    })}
                </ul>
              </div>
            )
          })}
        </div>

        {guideDemoMenu.map((group) => {
          const expanded = !!openGroups[group.id]
          const panelId = 'comp-guide-demo-' + group.id
          const count = group.items.length
          return (
            <div
              key={group.id}
              className={cx(
                'comp-guide__section',
                'comp-guide__section--demo',
                { 'is-open': expanded }
              )}
            >
              <button
                type="button"
                className="comp-guide__section-toggle"
                aria-expanded={expanded ? 'true' : 'false'}
                aria-controls={panelId}
                onClick={() => toggleGroup(group.id)}
              >
                <span className="comp-guide__toggle-label">
                  <span>{group.label}</span>
                  <span className="comp-guide__count" aria-label={`하위 ${count}개`}>
                    {count}
                  </span>
                </span>
                <span className="comp-guide__chevron" aria-hidden="true" />
              </button>
              <ul
                id={panelId}
                className="comp-guide__section-list"
                hidden={!expanded}
              >
                {group.items.map((item) => {
                  const href = '/demo/' + item.id
                  const active = pathname === href
                  return (
                    <li key={item.id}>
                      <Link
                        className={cx('comp-guide__link', { 'is-active': active })}
                        to={href}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default GuideMenu
