import { test, expect } from '@playwright/test'

const endpoint = 'https://translate.googleapis.com/translate_a/single?**'
const failureMessage = '번역 서비스를 사용할 수 없어 원문을 표시합니다.'

async function visit (page) {
  await page.goto('/b2b/corpeduc/ax')
  await expect(page.locator('#app-header-language')).toBeVisible()
  await expect(page.locator('.app-layout')).toHaveAttribute('data-translating', 'false')
  return page.getByRole('main').locator('h1').textContent()
}

async function select (page, label) {
  await page.locator('#app-header-language').click()
  await page.getByRole('menuitemradio', { name: label, exact: true }).click()
}

test('번역: 500 발생 시 요청 중단, 원문 복원, 명시적 재시도', async ({ page }) => {
  let failed = true
  let requests = 0
  const warnings = []
  page.on('console', (message) => {
    if (message.type() === 'warning') warnings.push(message.text())
  })
  await page.route(endpoint, async (route) => {
    requests += 1
    await route.fulfill(failed
      ? { status: 500, body: 'Unavailable' }
      : { json: [[['Translated content', null]]] })
  })
  const original = await visit(page)
  await select(page, '태국어')
  await expect(page.locator('.lang-switcher').getByRole('alert')).toHaveText(failureMessage)
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko')
  await expect(page.getByRole('main').locator('h1')).toHaveText(original)
  await expect(page.locator('.app-layout')).toHaveAttribute('data-translating', 'false')
  expect(requests).toBeGreaterThan(0)
  expect(requests).toBeLessThanOrEqual(2)
  const stoppedAt = requests
  // 실제 DOM 변경에도 장애 중에는 외부 요청을 다시 보내지 않는다.
  await page.getByRole('main').locator('h1').evaluate((node) => { node.firstChild.nodeValue = '변경된 검사 문장' })
  await page.waitForTimeout(500)
  expect(requests).toBe(stoppedAt)
  failed = false
  await page.getByRole('button', { name: '다시 시도', exact: true }).click()
  await expect(page.getByRole('main').locator('h1')).toHaveText('Translated content')
  await expect(page.locator('html')).toHaveAttribute('lang', 'th')
  await expect(page.locator('.lang-switcher').getByRole('alert')).toHaveCount(0)
  const completedAt = requests
  await page.waitForTimeout(500)
  expect(requests).toBe(completedAt)
  failed = true
  await select(page, '베트남어')
  await expect(page.locator('.lang-switcher').getByRole('alert')).toHaveText(failureMessage)
  await expect(page.getByRole('main').locator('h1')).toHaveText('변경된 검사 문장')
  await select(page, '원문')
  await expect(page.getByRole('main').locator('h1')).toHaveText(original)
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko')
  expect(warnings.filter((message) => /pageTranslate|GlobalTranslator/.test(message))).toEqual([])
})

test('번역: 진행 중 원문 선택은 요청을 취소하고 늦은 응답을 무시', async ({ page }) => {
  let requests = 0
  let aborted = 0
  page.on('requestfailed', (request) => {
    if (request.url().startsWith('https://translate.googleapis.com/')) aborted += 1
  })
  let release
  const pending = new Promise((resolve) => { release = resolve })
  await page.route(endpoint, async (route) => {
    requests += 1
    await pending
    await route.fulfill({ json: [[['Late translation', null]]] }).catch(() => {})
  })
  const original = await visit(page)
  await select(page, '태국어')
  await expect.poll(() => requests).toBeGreaterThan(0)
  await select(page, '원문')
  await expect.poll(() => aborted).toBeGreaterThan(0)
  release()
  await expect(page.locator('.app-layout')).toHaveAttribute('data-translating', 'false')
  await page.waitForTimeout(300)
  await expect(page.getByRole('main').locator('h1')).toHaveText(original)
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko')
  await expect(page.locator('.lang-switcher').getByRole('alert')).toHaveCount(0)
})

test('번역: 응답 시간 초과 시 진행률을 종료하고 원문 표시', async ({ page }) => {
  let release
  const pending = new Promise((resolve) => { release = resolve })
  await page.route(endpoint, async (route) => {
    await pending
    await route.fulfill({ json: [[['Too late', null]]] }).catch(() => {})
  })
  try {
    const original = await visit(page)
    await select(page, '태국어')
    await expect(page.locator('.lang-switcher').getByRole('alert')).toHaveText(failureMessage)
    await expect(page.locator('.app-layout')).toHaveAttribute('data-translating', 'false')
    await expect(page.getByRole('main').locator('h1')).toHaveText(original)
    await expect(page.locator('html')).toHaveAttribute('lang', 'ko')
  } finally {
    release()
  }
})

test('번역: 응답 본문이 잘못되어도 성공으로 처리하지 않음', async ({ page }) => {
  await page.route(endpoint, (route) => route.fulfill({ json: { error: 'invalid response' } }))
  const original = await visit(page)
  await select(page, '태국어')
  await expect(page.locator('.lang-switcher').getByRole('alert')).toHaveText(failureMessage)
  await expect(page.getByRole('main').locator('h1')).toHaveText(original)
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko')
})
