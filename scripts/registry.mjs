/**
 * pages 폴더를 스캔해 Next 동적 import 레지스트리를 생성한다.
 * - b2b/web/mobile: 메뉴·화면 파일 자동 인식
 * - pub/guide · pub/demo: 페이지 파일 자동 인식 (수동 맵 없음)
 * - 사이드 메뉴는 public/data/pub/guide-menu.json 을 런타임 fetch (생성물 없음)
 *
 * 사용: node scripts/registry.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** 이 스크립트 폴더 */
const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** 프로젝트 루트 */
const root = path.join(__dirname, '..')
/** 화면 소스 루트 */
const pagesRoot = path.join(root, 'src/pages')
/** 생성물 출력 폴더. 화면 폴더와 분리 */
const generatedRoot = path.join(root, 'src/generated')
/** 동적 import 레지스트리 출력 */
const outFile = path.join(generatedRoot, 'registry.js')
/** 정적 경로용 id 만 담는 출력 */
const idsFile = path.join(generatedRoot, 'registry-ids.js')

/** web 또는 mobile 아래 메뉴 폴더 이름 */
function listMenus (device) {
  const dir = path.join(pagesRoot, device)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
}

/**
 * 화면 파일명 → URL slug
 * AxPage.jsx → ax, FullMenu.jsx → full-menu, GNB.jsx → gnb, 01.jsx → 01
 */
function fileToSlug (fileName) {
  const raw = String(fileName || '').replace(/\.jsx$/, '')
  if (/^\d+$/.test(raw)) return raw
  const base = raw.replace(/Page$/, '')
  return kebabCase(base)
}

/** PascalCase / camelCase → kebab-case */
function kebabCase (value) {
  return String(value || '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

/**
 * 가이드/데모 파일명 → 기본 route id (export const routeId 로 덮어쓸 수 있음)
 * - guide: 파일은 PascalCase(Button.jsx), URL id 는 kebab (button) → /guide/button
 * - demo: kebab-case (ChartDemoPage → chart)
 */
function guideFileToRouteId (fileName, { demo = false } = {}) {
  let raw = String(fileName || '').replace(/\.jsx$/, '')
  if (demo) raw = raw.replace(/DemoPage$/, '')
  else raw = raw.replace(/Page$/, '')
  return kebabCase(raw)
}

/** 메뉴의 화면 파일 (index 제외). 이름·숫자 jsx 모두 */
function listScreens (device, menuId) {
  const dir = path.join(pagesRoot, device, menuId)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter((name) => name.endsWith('.jsx') && name !== 'index.jsx')
    .map((name) => ({ file: name, slug: fileToSlug(name) }))
    .sort((a, b) => a.slug.localeCompare(b.slug, undefined, { numeric: true }))
}

/**
 * 화면 파일의 export const meta 를 읽는다. (공통 빌드, 로딩 전에 쓰기 위해 필수)
 *
 * header / footer 만 본다.
 * true 표시, false 숨김. 없는 키는 맵에 넣지 않고, 화면에서는 표시로 둔다.
 * 중괄호 안 주석에 '}' 가 있으면 여기서 객체가 끊기니 넣지 않는다.
 */
function readPageMeta (filePath) {
  if (!fs.existsSync(filePath)) return null
  const src = fs.readFileSync(filePath, 'utf8')
  // 주석 안의 예시(export const meta …)는 무시
  const code = src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
  const match = code.match(/export\s+const\s+meta\s*=\s*\{([^}]*)\}/)
  if (!match) return null
  const body = match[1]
  const meta = {}
  const header = body.match(/header\s*:\s*(true|false)/)
  const footer = body.match(/footer\s*:\s*(true|false)/)
  if (header) meta.header = header[1] === 'true'
  if (footer) meta.footer = footer[1] === 'true'
  return Object.keys(meta).length ? meta : null
}

/** export const name = 'value' */
function readExportString (filePath, exportName) {
  if (!fs.existsSync(filePath)) return null
  const src = fs.readFileSync(filePath, 'utf8')
  const re = new RegExp(`export\\s+const\\s+${exportName}\\s*=\\s*['"\`]([^'"\`]*)['"\`]`)
  const match = src.match(re)
  return match ? match[1] : null
}

/** JSX 의 slug="..." (DemoPageShell 등) — routeId 대용 */
function readSlugProp (filePath) {
  if (!fs.existsSync(filePath)) return null
  const src = fs.readFileSync(filePath, 'utf8')
  const match = src.match(/\bslug\s*=\s*['"]([^'"]+)['"]/)
  return match ? match[1] : null
}

/** meta 가 있으면 레지스트리 한 줄. 없으면 null */
function metaLine (key, filePath) {
  const meta = readPageMeta(filePath)
  if (!meta) return null
  return `  '${key}': ${JSON.stringify(meta)}`
}

/** 한 기기(web|mobile)의 로더·meta 줄을 모은다 */
function buildDevice (device) {
  const menus = listMenus(device)
  const indexLines = []
  const screenLines = []
  const indexMetaLines = []
  const screenMetaLines = []
  const menuIds = []

  menus.forEach((menuId) => {
    const indexPath = path.join(pagesRoot, device, menuId, 'index.jsx')
    if (fs.existsSync(indexPath)) {
      menuIds.push(menuId)
      indexLines.push(
        `  '${menuId}': () => import('@/pages/${device}/${menuId}/index.jsx')`
      )
      const indexMeta = metaLine(menuId, indexPath)
      if (indexMeta) indexMetaLines.push(indexMeta)
    }
    listScreens(device, menuId).forEach(({ file, slug }) => {
      const screenPath = path.join(pagesRoot, device, menuId, file)
      screenLines.push(
        `  '${menuId}/${slug}': () => import('@/pages/${device}/${menuId}/${file}')`
      )
      const screenMeta = metaLine(`${menuId}/${slug}`, screenPath)
      if (screenMeta) screenMetaLines.push(screenMeta)
    })
  })

  return { menuIds, indexLines, screenLines, indexMetaLines, screenMetaLines }
}

/** WEB 레지스트리 재료 */
const web = buildDevice('web')
/** 모바일 레지스트리 재료 */
const mobile = buildDevice('mobile')
/** B2B 레지스트리 재료 */
const b2b = buildDevice('b2b')

/**
 * main 본문은 main/index.jsx 가 아니라 pages/{device}/IndexPage.jsx.
 * (index.jsx 는 App Router 와 충돌하므로 IndexPage.jsx 사용)
 * main/ 폴더에는 skeleton 등 호출부만 둔다. (/b2b · /web · /mobile)
 */
function patchRootIndex (deviceBundle, device) {
  const rootIndex = path.join(pagesRoot, device, 'IndexPage.jsx')
  if (!fs.existsSync(rootIndex)) return
  const line = `  'main': () => import('@/pages/${device}/IndexPage.jsx')`
  const idx = deviceBundle.indexLines.findIndex((l) => l.includes("'main':"))
  if (idx >= 0) {
    deviceBundle.indexLines[idx] = line
  } else {
    deviceBundle.menuIds = ['main', ...deviceBundle.menuIds.filter((id) => id !== 'main')]
    deviceBundle.indexLines.unshift(line)
  }
  const meta = metaLine('main', rootIndex)
  if (meta) {
    const metaIdx = deviceBundle.indexMetaLines.findIndex((l) => l.includes("'main':"))
    if (metaIdx >= 0) deviceBundle.indexMetaLines[metaIdx] = meta
    else deviceBundle.indexMetaLines.unshift(meta)
  }
}
patchRootIndex(b2b, 'b2b')
patchRootIndex(web, 'web')
patchRootIndex(mobile, 'mobile')

/**
 * pub/guide 페이지 맵 { id: { importPath, filePath, label } }
 * - Button.jsx 등 PascalCase 파일 → URL id kebab (/guide/button)
 * - Index 제외
 */
function buildGuidePages () {
  const dir = path.join(pagesRoot, 'pub', 'guide')
  const pages = {}
  if (!fs.existsSync(dir)) return pages

  fs.readdirSync(dir)
    .filter((name) => (
      name.endsWith('.jsx') &&
      !/^index\.jsx$/i.test(name)
    ))
    .forEach((name) => {
      const filePath = path.join(dir, name)
      const routeId =
        readExportString(filePath, 'routeId') ||
        readSlugProp(filePath) ||
        guideFileToRouteId(name)
      pages[routeId] = {
        importPath: `@/pages/pub/guide/${name}`,
        filePath,
        label: readExportString(filePath, 'guideLabel') || titleFromId(routeId)
      }
    })

  return pages
}

/** pub/demo 페이지 맵 */
function buildDemoPages () {
  const dir = path.join(pagesRoot, 'pub', 'demo')
  const pages = {}
  if (!fs.existsSync(dir)) return pages

  fs.readdirSync(dir)
    .filter((name) => name.endsWith('.jsx'))
    .forEach((name) => {
      const filePath = path.join(dir, name)
      const routeId =
        readExportString(filePath, 'routeId') ||
        readSlugProp(filePath) ||
        guideFileToRouteId(name, { demo: true })
      pages[routeId] = {
        importPath: `@/pages/pub/demo/${name}`,
        filePath,
        label: readExportString(filePath, 'guideLabel') || titleFromId(routeId)
      }
    })

  return pages
}

/** id → 표시용 라벨 (routeId 없을 때). PascalCase·kebab 모두 지원 */
function titleFromId (id) {
  const s = String(id || '')
  if (s.includes('-')) {
    return s
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }
  return s.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
}

const componentPages = buildGuidePages()
const demoPages = buildDemoPages()

const componentLines = Object.entries(componentPages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([id, page]) => `  '${id}': () => import('${page.importPath}')`)

const demoLines = Object.entries(demoPages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([id, page]) => `  '${id}': () => import('${page.importPath}')`)

const componentMetaLines = Object.entries(componentPages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([id, page]) => metaLine(id, page.filePath))
  .filter(Boolean)

const demoMetaLines = Object.entries(demoPages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([id, page]) => metaLine(id, page.filePath))
  .filter(Boolean)

const componentNames = Object.keys(componentPages).sort()
const demoNames = Object.keys(demoPages).sort()

/** registry.js 생성물 본문 — 로더 + meta export */
const content = `/* eslint-disable */
/** Auto-generated by scripts/registry.mjs — do not edit */
export const webMenuIds = ${JSON.stringify(web.menuIds, null, 2)}
export const mobileMenuIds = ${JSON.stringify(mobile.menuIds, null, 2)}
export const b2bMenuIds = ${JSON.stringify(b2b.menuIds, null, 2)}

export const webIndexLoaders = {
${web.indexLines.join(',\n')}
}

export const webScreenLoaders = {
${web.screenLines.join(',\n')}
}

export const mobileIndexLoaders = {
${mobile.indexLines.join(',\n')}
}

export const mobileScreenLoaders = {
${mobile.screenLines.join(',\n')}
}

export const b2bIndexLoaders = {
${b2b.indexLines.join(',\n')}
}

export const b2bScreenLoaders = {
${b2b.screenLines.join(',\n')}
}

export const componentLoaders = {
${componentLines.join(',\n')}
}

export const demoLoaders = {
${demoLines.join(',\n')}
}

export const webIndexMeta = {
${web.indexMetaLines.join(',\n')}
}

export const webScreenMeta = {
${web.screenMetaLines.join(',\n')}
}

export const mobileIndexMeta = {
${mobile.indexMetaLines.join(',\n')}
}

export const mobileScreenMeta = {
${mobile.screenMetaLines.join(',\n')}
}

export const b2bIndexMeta = {
${b2b.indexMetaLines.join(',\n')}
}

export const b2bScreenMeta = {
${b2b.screenMetaLines.join(',\n')}
}

export const componentMeta = {
${componentMetaLines.join(',\n')}
}

export const demoMeta = {
${demoMetaLines.join(',\n')}
}
`

/** web 스크린 키 목록 (menuId/slug) — ids 전용 파일용 */
const webScreenKeys = web.screenLines.map((line) => {
  const m = line.match(/'([^']+)'/)
  return m ? m[1] : null
}).filter(Boolean)
/** mobile 스크린 키 목록 */
const mobileScreenKeys = mobile.screenLines.map((line) => {
  const m = line.match(/'([^']+)'/)
  return m ? m[1] : null
}).filter(Boolean)
/** b2b 스크린 키 목록 */
const b2bScreenKeys = b2b.screenLines.map((line) => {
  const m = line.match(/'([^']+)'/)
  return m ? m[1] : null
}).filter(Boolean)

/** registry-ids.js 생성물 본문 — id/키만 (로더 없음, 정적 export용) */
const idsContent = `/* eslint-disable */
/** Auto-generated by scripts/registry.mjs — ids only (정적 export용, loader 없음) */
export const webMenuIds = ${JSON.stringify(web.menuIds, null, 2)}
export const mobileMenuIds = ${JSON.stringify(mobile.menuIds, null, 2)}
export const b2bMenuIds = ${JSON.stringify(b2b.menuIds, null, 2)}
export const webScreenKeys = ${JSON.stringify(webScreenKeys, null, 2)}
export const mobileScreenKeys = ${JSON.stringify(mobileScreenKeys, null, 2)}
export const b2bScreenKeys = ${JSON.stringify(b2bScreenKeys, null, 2)}
export const componentNames = ${JSON.stringify(componentNames, null, 2)}
export const demoNames = ${JSON.stringify(demoNames, null, 2)}
`

fs.mkdirSync(generatedRoot, { recursive: true })
fs.writeFileSync(outFile, content)
fs.writeFileSync(idsFile, idsContent)
console.log('wrote', path.relative(root, outFile))
console.log('wrote', path.relative(root, idsFile))
console.log('web menus', web.menuIds.length, 'screens', web.screenLines.length)
console.log('mobile menus', mobile.menuIds.length, 'screens', mobile.screenLines.length)
console.log('b2b menus', b2b.menuIds.length, 'screens', b2b.screenLines.length)
console.log('components', componentNames.length, 'demos', demoNames.length)
