import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// WCAG 규칙을 KWCAG 준수 판정으로 바꾸지 않는다. 수동 검사는 별도 체크리스트에 기록한다.
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
const defaultPaths = [
  '/b2b',
  '/b2b/corpeduc/ax',
  '/web/about/ceo',
  '/mobile/corpeduc/ax',
  '/pub',
  '/guide/accessibility',
  '/guide/button',
  '/guide/input',
  '/guide/modal'
]
const paths = process.env.A11Y_PATHS
  ? process.env.A11Y_PATHS.split(',').map((path) => path.trim()).filter(Boolean)
  : defaultPaths

async function openPage (page, pathname) {
  const response = await page.goto(pathname)
  expect(response?.status(), `${pathname} must load successfully`).toBe(200)
  await expect(page.getByRole('main')).toBeVisible()
  // 공통 헤더는 React 마운트 후에 표시된다. 스켈레톤만 검사하는 것을 방지한다.
  await expect(page.locator('.app-layout--has-header')).toBeVisible()
  await expect(page.locator('main > .page-loading[aria-busy="true"]')).toHaveCount(0)
  await page.evaluate(() => document.fonts.ready)
  // 진입 애니메이션 중간의 반투명 텍스트를 명도 대비 위반으로 오인하지 않는다.
  await page.evaluate(async () => {
    const finiteAnimations = document.getAnimations()
      .filter((animation) => Number.isFinite(animation.effect?.getComputedTiming().endTime))
    await Promise.all(finiteAnimations.map((animation) => animation.finished.catch(() => undefined)))
  })
}

async function scan (page, testInfo, state) {
  const results = await new AxeBuilder({ page }).withTags(tags).analyze()
  await testInfo.attach('axe-results', {
    body: Buffer.from(JSON.stringify({
      url: page.url(),
      project: testInfo.project.name,
      state,
      tags,
      mode: process.env.A11Y_AUDIT_ONLY === '1' ? 'audit' : 'strict',
      ...results
    }, null, 2)),
    contentType: 'application/json'
  })
  // 감사 모드는 결과 수집용이다. 엄격 모드는 한 건이라도 위반하면 실패한다.
  if (process.env.A11Y_AUDIT_ONLY !== '1') {
    expect(results.violations, '자동 검사 위반: HTML 보고서의 axe-results 첨부 참조').toEqual([])
  }
}

for (const pathname of paths) {
  test(`접근성 검사 ${pathname}`, async ({ page }, testInfo) => {
    await openPage(page, pathname)
    await scan(page, testInfo, 'initial')
  })
}

test('모달을 연 상태의 접근성 검사', async ({ page }, testInfo) => {
  await openPage(page, '/guide/modal')
  await page.getByRole('button', { name: '모달 열기', exact: true }).click()
  await expect(page.locator('.modal:not(.modal_demo-static)')).toBeVisible()
  // 페이지 전체를 검사한다. 배경·샘플 영역을 임의로 제외하지 않는다.
  await scan(page, testInfo, 'modal-open')
})
