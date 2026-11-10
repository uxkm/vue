/**
 * 가이드 코드보기용 — 실제 페이지 호출 형식 문자열.
 * IndexPage 처럼 'use client' · import · export default function 안에 상태를 둔다.
 */

/**
 * @param {object} options
 * @param {string} [options.name='Example'] export default 함수 이름
 * @param {string[]} [options.reactImports=['useState']] react named imports
 * @param {string[]} [options.compImports=[]] @/comp named imports
 * @param {string[]} [options.extraImports=[]] 추가 import 줄 전체(예: "import X from '…'")
 * @param {string} options.body 함수 본문(들여쓰기 없이 작성하면 2칸으로 맞춤)
 * @returns {string}
 */
export function pageExampleCode ({
  name = 'Example',
  reactImports = ['useState'],
  compImports = [],
  extraImports = [],
  body
}) {
  const lines = ["'use client'", '']

  if (reactImports.length) {
    lines.push(`import { ${reactImports.join(', ')} } from 'react'`)
  }
  if (compImports.length) {
    lines.push(`import { ${compImports.join(', ')} } from '@/comp'`)
  }
  for (const line of extraImports) {
    if (line) lines.push(line)
  }

  lines.push('')
  lines.push(`export default function ${name} () {`)
  lines.push(indentBody(body))
  lines.push('}')

  return lines.join('\n')
}

/** 본문 각 줄에 2칸 들여쓰기. 빈 줄은 유지 */
function indentBody (body) {
  const text = String(body ?? '').replace(/^\n+/, '').replace(/\n+$/, '')
  if (!text) return '  return null'
  return text
    .split('\n')
    .map((line) => (line.trim() === '' ? '' : `  ${line}`))
    .join('\n')
}

/**
 * JSX return 블록을 본문에 붙일 때 사용.
 * 형제 JSX 가 여러 개여도 되게 Fragment 로 감싼다.
 * @param {string} jsx
 * @param {string} [prefix] return 앞 상태/상수 코드
 */
export function pageExampleReturn (jsx, prefix = '') {
  const trimmed = String(jsx ?? '').replace(/^\n+/, '').replace(/\n+$/, '')
  let returnBlock
  if (trimmed.startsWith('return')) {
    returnBlock = trimmed
  } else if (trimmed.startsWith('<>') || trimmed.startsWith('<Fragment')) {
    returnBlock = `return (\n${indentBody(trimmed)}\n)`
  } else {
    // 형제 루트(Button + Modal 등)도 유효하도록 Fragment 사용
    returnBlock = `return (\n  <>\n${indentBody(indentBody(trimmed))}\n  </>\n)`
  }
  if (!prefix) return returnBlock
  return `${String(prefix).replace(/\n+$/, '')}\n\n${returnBlock}`
}

/**
 * useState 조각 코드(훅 + JSX)를 페이지형으로 감싼다.
 * 이미 'use client' 가 있으면 그대로 반환.
 *
 * @param {string} fragment
 * @param {object} [options]
 * @param {string} [options.name='Example']
 * @param {string[]} [options.reactImports]
 * @param {string[]} [options.compImports]
 * @param {string[]} [options.extraImports]
 */
export function wrapPageExample (fragment, options = {}) {
  const text = String(fragment ?? '').replace(/^\n+/, '').replace(/\n+$/, '')
  if (!text) return text
  if (text.includes("'use client'") || text.includes('"use client"')) return text

  const {
    name = 'Example',
    reactImports = ['useState'],
    compImports = [],
    extraImports = []
  } = options

  // 이미 import + function 형태면 use client · export default 만 보강
  if (/^import\s/m.test(text) && /^function\s+\w+/m.test(text)) {
    return ensurePageModule(text, name)
  }

  // 최상위 JSX 시작 줄만 고른다(헬퍼 function 안의 <Button> 등은 무시)
  const lines = text.split('\n')
  const jsxStart = findTopLevelJsxStart(lines)
  if (jsxStart < 0) {
    // JSX 없으면 본문 전체를 함수 안에 둔다
    return pageExampleCode({
      name,
      reactImports,
      compImports,
      extraImports,
      body: text
    })
  }

  const prefix = lines.slice(0, jsxStart).join('\n').replace(/\n+$/, '')
  const jsx = lines.slice(jsxStart).join('\n')
  return pageExampleCode({
    name,
    reactImports,
    compImports,
    extraImports,
    body: pageExampleReturn(jsx, prefix)
  })
}

/**
 * 중첩 function/블록 밖의 첫 JSX 줄 인덱스.
 * FloatAction 같은 헬퍼 안의 <Button> 을 본문 JSX 로 오인하지 않는다.
 */
function findTopLevelJsxStart (lines) {
  let depth = 0
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (depth === 0 && /^\s*</.test(line)) return index
    const opens = (line.match(/\{/g) || []).length
    const closes = (line.match(/\}/g) || []).length
    depth = Math.max(0, depth + opens - closes)
  }
  return -1
}

/**
 * import + function 모듈에 'use client' 와 export default 를 붙인다.
 * @param {string} source
 * @param {string} [exportName] export default 함수 이름(지정 시 기존 함수명 교체)
 */
export function ensurePageModule (source, exportName) {
  let text = String(source ?? '').replace(/^\n+/, '').replace(/\n+$/, '')
  if (!text.includes("'use client'") && !text.includes('"use client"')) {
    text = `'use client'\n\n${text}`
  }
  if (!/export\s+default\s+function/.test(text)) {
    if (exportName) {
      text = text.replace(/^function\s+\w+/m, `export default function ${exportName}`)
    } else {
      text = text.replace(/^function\s+(\w+)/m, 'export default function $1')
    }
  }
  return text
}
