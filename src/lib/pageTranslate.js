/**
 * 페이지 DOM 전역 번역 (locales 파일 불필요)
 * - 화면은 항상 한글 원문으로 렌더
 * - AppLayout 이 텍스트 노드를 대상 언어로 치환
 */

const SKIP_SELECTOR = [
  'script',
  'style',
  'noscript',
  'textarea',
  'code',
  'pre',
  'kbd',
  'samp',
  '[data-no-translate]',
  '.lang-switcher',
  '.notranslate'
].join(',')

/** @type {WeakMap<Text, { origin: string, locale: string, translated: string }>} */
const nodeState = new WeakMap()

/** @type {Map<string, string>} */
const textCache = new Map()

const FETCH_TIMEOUT_MS = 4000
let serviceUnavailable = false

/** 장애 후 자동 재요청은 중단하고, 사용자 요청으로만 다시 시작한다. */
export function resetTranslationService () {
  serviceUnavailable = false
}

function cacheKey (locale, text) {
  return locale + '\0' + text
}

/** 경로·ID·코드성 문자열은 번역하지 않음 */
function looksLikeCode (text) {
  const value = String(text || '').trim()
  if (!value) return true
  if (value.length > 500) return true
  if (value.startsWith('/') || value.startsWith('#/') || value.startsWith('@/')) return true
  if (/^[A-Z]{2,3}-[A-Z0-9-]+$/i.test(value)) return true
  if (/^https?:\/\//i.test(value)) return true
  // 순수 라틴/숫자만(이미 영어 등) — 한글이 없으면 스킵
  if (!/[가-힣]/.test(value)) return true
  return false
}

function shouldSkip (node) {
  const el = node.parentElement
  if (!el) return true
  if (el.closest(SKIP_SELECTOR)) return true
  if (el.isContentEditable) return true
  // 이미 번역된 영문 등 — 저장된 한글 원문이 있으면 재번역 대상으로 유지
  const state = nodeState.get(node)
  if (state?.origin && /[가-힣]/.test(state.origin)) return false
  if (looksLikeCode(node.nodeValue)) return true
  return false
}

/**
 * @param {ParentNode} root
 * @param {{ includeTranslated?: boolean }} [options]
 * includeTranslated: 원문 복원용 — 이미 영어 등으로 바뀐 노드도 포함
 */
function collectTextNodes (root, options = {}) {
  const out = []
  if (!root) return out
  const includeTranslated = options.includeTranslated === true
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode (node) {
      const el = node.parentElement
      if (!el) return NodeFilter.FILTER_REJECT
      if (el.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT
      if (el.isContentEditable) return NodeFilter.FILTER_REJECT
      const value = node.nodeValue
      if (value == null || !value.trim()) return NodeFilter.FILTER_REJECT
      if (includeTranslated) {
        // 복원: 상태가 있거나 한글이 남은 노드
        if (nodeState.has(node) || /[가-힣]/.test(value)) {
          return NodeFilter.FILTER_ACCEPT
        }
        return NodeFilter.FILTER_REJECT
      }
      // 언어 A→B 전환: 화면에 영문만 있어도 원문 상태가 있으면 포함
      const state = nodeState.get(node)
      if (state?.origin && /[가-힣]/.test(state.origin)) {
        if (el.closest(SKIP_SELECTOR) || el.isContentEditable) {
          return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT
      }
      if (shouldSkip(node)) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    }
  })
  let cur = walker.nextNode()
  while (cur) {
    out.push(cur)
    cur = walker.nextNode()
  }
  return out
}

/** Google 응답과 본문 읽기까지 제한 시간을 적용한다. */
async function translateViaGoogle (text, locale, signal) {
  const ctrl = new AbortController()
  const abort = () => ctrl.abort()
  signal?.addEventListener('abort', abort, { once: true })
  if (signal?.aborted) ctrl.abort()
  const timer = setTimeout(abort, FETCH_TIMEOUT_MS)
  try {
    const url = 'https://translate.googleapis.com/translate_a/single?' +
      new URLSearchParams({ client: 'gtx', sl: 'ko', tl: locale, dt: 't', q: text })
    const res = await fetch(url, { signal: ctrl.signal })
    if (!res.ok) throw new Error('translate http ' + res.status)
    const data = await res.json()
    const parts = Array.isArray(data?.[0]) ? data[0] : []
    const value = parts.map((row) => typeof row?.[0] === 'string' ? row[0] : '').join('')
    if (!value.trim()) throw new Error('Invalid translation response')
    return value
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', abort)
  }
}

function restoreOriginal (root) {
  for (const node of collectTextNodes(root, { includeTranslated: true })) {
    const state = nodeState.get(node)
    if (!state) continue
    // React가 이미 새 문구를 렌더했다면 이전 원문으로 덮어쓰지 않는다.
    if (node.nodeValue !== state.translated && node.nodeValue !== state.origin) {
      nodeState.delete(node)
      continue
    }
    state.locale = 'ko'
    state.translated = state.origin
    if (node.nodeValue !== state.origin) node.nodeValue = state.origin
  }
}

function isNewText (node) {
  if (shouldSkip(node)) return false
  const state = nodeState.get(node)
  return !state || node.nodeValue !== state.translated
}

/** 번역기 자신의 치환과 언어 선택 UI의 진행률 변경은 재실행하지 않는다. */
export function hasTranslatableMutation (records) {
  return records.some((record) => {
    if (record.type === 'characterData') return isNewText(record.target)
    return [...record.addedNodes].some((node) => {
      if (node.nodeType === Node.TEXT_NODE) return isNewText(node)
      return node.nodeType === Node.ELEMENT_NODE && collectTextNodes(node).some(isNewText)
    })
  })
}

/**
 * @param {HTMLElement} root
 * @param {string} locale
 * @param {{ signal?: AbortSignal, onProgress?: (info: { done: number, total: number, percent: number }) => void }} [options]
 */
export async function applyPageTranslation (root, locale, { signal, onProgress } = {}) {
  if (signal?.aborted) return { status: 'aborted' }
  if (locale === 'ko') {
    restoreOriginal(root)
    return { status: 'original' }
  }
  if (serviceUnavailable) {
    restoreOriginal(root)
    return { status: 'unavailable' }
  }

  const snapshots = collectTextNodes(root).map((node) => {
    const current = node.nodeValue ?? ''
    const state = nodeState.get(node)
    const origin = state && (current === state.translated || current === state.origin)
      ? state.origin : current
    return { node, current, origin }
  })
  const unique = [...new Set(snapshots.map(({ origin }) => origin))]
  const results = new Map()
  let index = 0
  let done = 0
  // 동시에 최대 2개만 요청하며, 장애 감지 후 나머지 대기 요청은 보내지 않는다.
  await Promise.all(Array.from({ length: Math.min(2, unique.length) }, async () => {
    while (index < unique.length && !signal?.aborted && !serviceUnavailable) {
      const text = unique[index++]
      const key = cacheKey(locale, text)
      try {
        const translated = textCache.get(key) ?? await translateViaGoogle(text, locale, signal)
        if (signal?.aborted) return
        textCache.set(key, translated)
        results.set(text, translated)
        done += 1
        onProgress?.({ done, total: unique.length, percent: Math.round(done / unique.length * 90) })
      } catch {
        if (!signal?.aborted) serviceUnavailable = true
        return
      }
    }
  }))
  if (signal?.aborted) return { status: 'aborted' }
  if (serviceUnavailable) {
    restoreOriginal(root)
    return { status: 'unavailable' }
  }

  // 요청 단계의 결과를 재사용한다. 실패한 문구를 DOM 적용 단계에서 다시 요청하지 않는다.
  for (const { node, current, origin } of snapshots) {
    if (!root.contains(node) || node.nodeValue !== current) continue
    const translated = results.get(origin)
    if (translated == null) continue
    nodeState.set(node, { origin, locale, translated })
    if (current !== translated) node.nodeValue = translated
  }
  onProgress?.({ done: unique.length, total: unique.length, percent: 100 })
  return { status: 'translated' }
}

export const NO_TRANSLATE_ATTR = 'data-no-translate'
