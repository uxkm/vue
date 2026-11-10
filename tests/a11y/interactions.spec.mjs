import { test, expect } from '@playwright/test'

async function visit (page, pathname) {
  const response = await page.goto(pathname)
  expect(response?.status()).toBe(200)
  await expect(page.locator('.app-layout--has-header')).toBeVisible()
  // 모바일에서는 사용자가 메뉴를 접고 예제를 조작하는 경로를 따른다.
  if ((page.viewportSize()?.width || 0) < 600) {
    await page.getByRole('button', { name: '메뉴 접기', exact: true }).click()
  }
  return page.getByRole('main')
}

for (const name of ['accordion', 'collapse']) {
  test(`${name}: 키보드 토글과 닫힘 애니메이션 후 본문 유지`, async ({ page }) => {
    const main = await visit(page, `/guide/${name}`)
    const trigger = main.locator(`.${name}_trigger`).first()
    if (await trigger.getAttribute('aria-expanded') === 'true') await trigger.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await trigger.focus()
    await trigger.press('Enter')
    const panel = main.locator(`[id="${await trigger.getAttribute('aria-controls')}"]`)
    await expect(panel).toBeVisible()
    const content = await panel.innerText()
    expect(content.trim()).not.toBe('')
    await trigger.press('Enter')
    await expect(panel).not.toBeVisible()
    await trigger.press('Enter')
    await expect(panel).toBeVisible()
    await expect(panel).toHaveText(content)
  })
}

test('서랍: 닫힘 애니메이션 후 다시 열기', async ({ page }) => {
  await visit(page, '/guide/drawer')
  const open = page.getByRole('button', { name: '서랍 열기', exact: true })
  const drawer = page.locator('.drawer:not(.drawer_demo-static)')
  await open.click()
  await expect(drawer).toHaveClass(/is-open/)
  await drawer.getByRole('button', { name: '닫기', exact: true }).click()
  await expect(drawer).toHaveCount(0)
  await open.click()
  await expect(drawer).toHaveClass(/is-open/)
})

test('날짜 선택기: Escape로 달력 닫기', async ({ page }) => {
  const main = await visit(page, '/guide/date-picker')
  const input = main.getByRole('combobox').first()
  await input.click()
  const panel = main.locator(`[id="${await input.getAttribute('aria-controls')}"]`)
  await expect(panel).toBeVisible()
  await input.press('Escape')
  await expect(panel).not.toBeVisible()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
})

test('업로드: 키보드 파일 선택 후 목록에 표시', async ({ page }) => {
  const main = await visit(page, '/guide/upload')
  const input = main.locator('input[type="file"]').first()
  await input.focus()
  await expect(input).toBeFocused()
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    input.press('Enter')
  ])
  await chooser.setFiles({ name: 'keyboard-upload.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\n%%EOF') })
  await expect(main.getByText('keyboard-upload.pdf', { exact: true })).toBeVisible()
})

test('캐러셀: 슬라이드 이동 후 재진입', async ({ page }) => {
  const main = await visit(page, '/guide/carousel')
  const carousel = main.locator('.carousel').first()
  const active = carousel.locator('.swiper-slide-active')
  await expect(active).toBeVisible()
  await carousel.getByRole('button', { name: '슬라이드 정지', exact: true }).click()
  const initial = await active.textContent()
  await carousel.getByRole('button', { name: '다음 슬라이드', exact: true }).click()
  await expect(active).not.toHaveText(initial)
  await carousel.getByRole('button', { name: '이전 슬라이드', exact: true }).click()
  await expect(active).toHaveText(initial)
})
