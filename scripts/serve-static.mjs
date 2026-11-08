/**
 * 정적 export(out/) 로컬 미리보기 — HTTP + HTTPS
 * npm run build 후: npm run start
 */
import { createServer as createHttpServer } from 'node:http'
import { createServer as createHttpsServer } from 'node:https'
import { readFileSync, existsSync, statSync, createReadStream } from 'node:fs'
import { networkInterfaces } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** 이 스크립트 파일이 있는 디렉터리 (scripts/) */
const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** 프로젝트 루트 */
const root = path.join(__dirname, '..')
/** Next 정적 export 출력 폴더 (out/) */
const outDir = path.join(root, 'out')

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

/** 확장자 → Content-Type 매핑 */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json'
}

/** LAN IPv4 주소(외부 공개용). 없으면 null */
function lanAddress () {
  const nets = networkInterfaces()
  for (const list of Object.values(nets)) {
    for (const net of list || []) {
      if (net.family === 'IPv4' && !net.internal) return net.address
    }
  }
  return null
}

/**
 * URL 경로 → out/ 안 실제 파일.
 * trailing slash·확장자 없는 경로·index.html·404.html 폴백을 순서대로 시도.
 * out/ 밖 경로는 무시(path traversal 방지).
 */
function resolveFile (urlPath) {
  const decoded = decodeURIComponent((urlPath || '/').split('?')[0])
  let rel = decoded.replace(/^\/+/, '')
  if (!rel || rel.endsWith('/')) rel += 'index.html'

  const candidates = [
    path.join(outDir, rel),
    path.join(outDir, rel + '.html'),
    path.join(outDir, rel, 'index.html')
  ]

  for (const file of candidates) {
    if (!file.startsWith(outDir)) continue
    if (existsSync(file) && statSync(file).isFile()) return file
  }
  const fallback = path.join(outDir, '404.html')
  if (existsSync(fallback)) return fallback
  return null
}

/** 정적 파일 요청 처리 — MIME·스트림 응답, 없으면 404 */
function handle (req, res) {
  const file = resolveFile(req.url || '/')
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not Found')
    return
  }
  const ext = path.extname(file).toLowerCase()
  const type = MIME[ext] || 'application/octet-stream'
  res.writeHead(file.endsWith(`${path.sep}404.html`) || file.endsWith('/404.html') ? 404 : 200, {
    'Content-Type': type
  })
  createReadStream(file).pipe(res)
}

if (!existsSync(outDir)) {
  console.error('[serve-static] out/ 없음 — 먼저 npm run build 를 실행하세요.')
  process.exit(1)
}

/** 콘솔 Network URL용 LAN IP */
const lan = lanAddress()

/** HTTP 정적 서버 */
const httpServer = createHttpServer((req, res) => {
  try {
    handle(req, res)
  } catch (err) {
    console.error('[serve-static]', err)
    res.statusCode = 500
    res.end('error')
  }
})

httpServer.listen(HTTP_PORT, HOST, () => {
  console.log('')
  console.log('  ▲ Publish List (static out/)')
  console.log(`  - Local HTTP:    http://localhost:${HTTP_PORT}`)
  if (lan) console.log(`  - Network HTTP:  http://${lan}:${HTTP_PORT}`)
})

if (existsSync(keyPath) && existsSync(certPath)) {
  /** HTTPS 정적 서버 (인증서 있을 때만) */
  const httpsServer = createHttpsServer(
    { key: readFileSync(keyPath), cert: readFileSync(certPath) },
    (req, res) => {
      try {
        handle(req, res)
      } catch (err) {
        console.error('[serve-static]', err)
        res.statusCode = 500
        res.end('error')
      }
    }
  )
  httpsServer.listen(HTTPS_PORT, HOST, () => {
    console.log(`  - Local HTTPS:   https://localhost:${HTTPS_PORT}`)
    if (lan) console.log(`  - Network HTTPS: https://${lan}:${HTTPS_PORT}`)
    console.log('')
  })
} else {
  console.log('')
}
