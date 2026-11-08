/**
 * UI 모드: SCSS → CSS 빌드·감시 후, 생성된 CSS 로 개발 서버 실행
 * (dev 는 SCSS 직접 로드 / ui 는 컴파일된 CSS 로드)
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileAll, watchStyles } from './build-styles.mjs'

/** 이 스크립트 파일이 있는 디렉터리 (scripts/) */
const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** 프로젝트 루트 — 자식 프로세스 cwd */
const root = path.join(__dirname, '..')

// 시작 시 전량 컴파일 + SCSS 변경 감시
compileAll()
watchStyles()

/**
 * 개발 서버(serve.mjs --dev) 자식 프로세스.
 * STYLE_MODE=css 로 컴파일된 CSS를 쓰도록 환경 주입.
 */
const child = spawn(
  process.execPath,
  [path.join(__dirname, 'serve.mjs'), '--dev'],
  {
    cwd: root,
    env: {
      ...process.env,
      STYLE_MODE: 'css'
    },
    stdio: 'inherit'
  }
)

/** 자식 종료 시 동일 코드·시그널로 부모도 종료 */
child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  process.exit(code ?? 0)
})

/** Ctrl+C 등 — 자식에 동일 시그널 전달 */
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    child.kill(sig)
  })
}
