/**
 * HTTP + HTTPS 동시 제공
 * - HTTP : PORT (기본 8090)
 * - HTTPS: HTTPS_PORT (기본 8443), certificates/localhost*.pem
 *
 * 사용:
 *   node scripts/serve.mjs --dev   # 개발 (HMR)
 *   node scripts/serve.mjs         # 프로덕션 (next build 후)
 */
import { createServer as createHttpServer } from 'node:http'
import { createServer as createHttpsServer } from 'node:https'
import { readFileSync, existsSync } from 'node:fs'
import { networkInterfaces } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import next from 'next'

/**
 * Next handle() 용 parsedUrl — deprecated url.parse 대신 WHATWG URL.
 * @param {string} requestUrl req.url
 */
function parseRequestUrl (requestUrl) {
  const u = new URL(requestUrl || '/', 'http://localhost')
  /** @type {Record<string, string | string[]>} */
  const query = {}
  for (const key of new Set(u.searchParams.keys())) {
    const all = u.searchParams.getAll(key)
    query[key] = all.length > 1 ? all : all[0]
  }
  const pathWithSearch = u.pathname + u.search
  return {
    pathname: u.pathname,
    query,
    search: u.search,
    hash: u.hash,
    href: pathWithSearch + u.hash,
    path: pathWithSearch
  }
}

/** 이 스크립트 파일이 있는 디렉터리 (scripts/) */
const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** 프로젝트 루트 — Next dir */
const root = path.join(__dirname, '..')

/** --dev 플래그: 개발(HMR) vs 프로덕션 */
const isDev = process.argv.includes('--dev')
/** HTTP 포트 — env PORT, 기본 8090 */
const HTTP_PORT = Number(process.env.PORT || 8090)
/** HTTPS 포트 — env HTTPS_PORT, 기본 8443 */
const HTTPS_PORT = Number(process.env.HTTPS_PORT || 8443)
/** listen 바인드 주소 — env HOSTNAME, 기본 0.0.0.0 */
const HOST = process.env.HOSTNAME || '0.0.0.0'

/** 로컬 HTTPS용 private key 경로 */
const keyPath = path.join(root, 'certificates/localhost-key.pem')
/** 로컬 HTTPS용 인증서 경로 */
const certPath = path.join(root, 'certificates/localhost.pem')

/** LAN IPv4 주소(외부 공개용). 없으면 null */
function lanAddress () {
  try {
    const nets = networkInterfaces()
    for (const list of Object.values(nets || {})) {
      for (const net of list || []) {
        if (net.family === 'IPv4' && !net.internal) return net.address
      }
    }
  } catch {
    // 샌드박스·권한 환경에서 networkInterfaces 실패 시 Network URL만 생략
  }
  return null
}

/**
 * listen 실패 처리 — EADDRINUSE면 안내 후 종료.
 * @param {string} label - HTTP|HTTPS
 * @param {number} port
 * @param {NodeJS.ErrnoException} err
 */
function onListenError (label, port, err) {
  if (err?.code === 'EADDRINUSE') {
    console.error(`[serve] ${label} 포트 ${port} 사용 중 — 기존 node 서버를 종료한 뒤 다시 실행하세요.`)
    console.error(`[serve]   예) lsof -ti:${port} | xargs kill`)
  } else {
    console.error(`[serve] ${label}`, err)
  }
  process.exit(1)
}

/** Next가 HMR upgrade를 붙일 HTTP 서버 */
const httpServer = createHttpServer()

/** Next 앱 인스턴스 — httpServer에 HMR/WebSocket 자동 연결 */
const app = next({
  dev: isDev,
  dir: root,
  hostname: HOST === '0.0.0.0' ? 'localhost' : HOST,
  port: HTTP_PORT,
  // HMR/WebSocket 은 httpServer 에 자동 연결 (getUpgradeHandler 불필요)
  httpServer
})

await app.prepare()

/** Next 요청 핸들러 */
const handle = app.getRequestHandler()

httpServer.on('request', async (req, res) => {
  try {
    await handle(req, res, parseRequestUrl(req.url))
  } catch (err) {
    console.error('[serve]', req.url, err)
    res.statusCode = 500
    res.end('internal server error')
  }
})

/** 콘솔 Network URL용 LAN IP */
const lan = lanAddress()
/** 시작 로그용 모드 라벨 */
const label = isDev ? 'development' : 'production'

httpServer.once('error', (err) => onListenError('HTTP', HTTP_PORT, err))
httpServer.listen(HTTP_PORT, HOST, () => {
  console.log('')
  console.log(`  ▲ Publish List (${label})`)
  console.log(`  - Local HTTP:    http://localhost:${HTTP_PORT}`)
  if (lan) console.log(`  - Network HTTP:  http://${lan}:${HTTP_PORT}`)

  if (!existsSync(keyPath) || !existsSync(certPath)) {
    console.warn('  ! certificates/localhost*.pem 없음 — HTTPS 생략')
    console.log('')
    return
  }

  /** HTTPS 서버 — 인증서 있을 때만 기동 */
  const httpsServer = createHttpsServer({
    key: readFileSync(keyPath),
    cert: readFileSync(certPath)
  })

  httpsServer.on('request', async (req, res) => {
    try {
      await handle(req, res, parseRequestUrl(req.url))
    } catch (err) {
      console.error('[serve]', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  // HTTPS 로 접속할 때도 HMR 업그레이드 처리
  httpsServer.on('upgrade', (req, socket, head) => {
    httpServer.emit('upgrade', req, socket, head)
  })

  httpsServer.once('error', (err) => onListenError('HTTPS', HTTPS_PORT, err))
  httpsServer.listen(HTTPS_PORT, HOST, () => {
    console.log(`  - Local HTTPS:   https://localhost:${HTTPS_PORT}`)
    if (lan) console.log(`  - Network HTTPS: https://${lan}:${HTTPS_PORT}`)
    console.log('')
  })
})
