import { defineConfig, devices } from '@playwright/test'

const port = Number(process.env.A11Y_PORT || 18100)
const baseURL = process.env.A11Y_BASE_URL || `http://127.0.0.1:${port}`

export default defineConfig({
  testDir: './tests/a11y',
  testMatch: '**/*.spec.mjs',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 2,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  outputDir: 'test-results/a11y',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/a11y/html', open: 'never' }],
    ['./tests/a11y/reporters/summary.mjs']
  ],
  use: {
    baseURL,
    locale: 'ko-KR',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] }
    }
  ],
  // 기본 명령은 먼저 정적 빌드를 생성한다. 외부 검증 서버도 지정할 수 있다.
  webServer: process.env.A11Y_BASE_URL ? undefined : {
    command: 'node scripts/serve-static.mjs',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 30_000,
    env: {
      HOSTNAME: '127.0.0.1',
      PORT: String(port),
      HTTPS_PORT: String(port + 1)
    }
  }
})
