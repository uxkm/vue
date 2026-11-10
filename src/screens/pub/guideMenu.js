'use client'

/**
 * 가이드·데모 사이드 메뉴 — public/data/pub/guide-menu.json 만 사용.
 * 메뉴 수정 시 JSON만 고치면 되고, generate:registry 불필요.
 */
import { useEffect, useState } from 'react'

const GUIDE_MENU_URL = '/data/pub/guide-menu.json'

/** 가이드 홈 경로 (/guide) — JSON intro 는 라벨용 */
export const guideHomePath = '/guide'

/** 접근성 가이드 경로 (/guide/accessibility) */
export const guideAccessibilityPath = '/guide/accessibility'

/** @deprecated guideHomePath 사용. 예전 /components/intro id 호환 */
export const guideHomeId = 'intro'

const EMPTY = {
  intro: { id: guideHomeId, label: '소개' },
  accessibility: { id: 'accessibility', label: '접근성' },
  guideMenu: [],
  guideDemoMenu: []
}

let cache = null

/** guide-menu.json 로드 (한 번만 fetch, 이후 캐시) */
export function loadGuideMenu () {
  if (!cache) {
    cache = fetch(GUIDE_MENU_URL)
      .then((res) => {
        if (!res.ok) throw new Error('guide-menu.json ' + res.status)
        return res.json()
      })
      .then((data) => ({
        intro: data.intro || EMPTY.intro,
        accessibility: data.accessibility || EMPTY.accessibility,
        guideMenu: Array.isArray(data.componentGroups) ? data.componentGroups : [],
        guideDemoMenu: Array.isArray(data.demoGroups) ? data.demoGroups : []
      }))
      .catch((err) => {
        console.warn('[guideMenu]', err)
        cache = null
        return EMPTY
      })
  }
  return cache
}

/** 사이드 메뉴·소개 페이지용. 로드 전 null */
export function useGuideMenu () {
  const [menu, setMenu] = useState(null)

  useEffect(() => {
    let alive = true
    loadGuideMenu().then((data) => {
      if (alive) setMenu(data)
    })
    return () => { alive = false }
  }, [])

  return menu
}
