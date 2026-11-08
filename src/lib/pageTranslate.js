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

/** @type {Map<string, string | Promise<string>>} */
const textCache = new Map()

const FETCH_TIMEOUT_MS = 4000

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

async function fetchWithTimeout (url, ms) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, { signal: ctrl.signal })
  } finally {
    clearTimeout(timer)
  }
}

/** Google gtx — locales 없이 브라우저에서 번역 */
async function translateViaGoogle (text, locale) {
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=' +
    encodeURIComponent(locale) +
    '&dt=t&q=' +
    encodeURIComponent(text)
  const res = await fetchWithTimeout(url, FETCH_TIMEOUT_MS)
  if (!res.ok) throw new Error('translate http ' + res.status)
  const data = await res.json()
  const parts = Array.isArray(data?.[0]) ? data[0] : []
  return parts.map((row) => row?.[0] || '').join('') || text
}

async function translateText (text, locale) {
  const trimmed = text
  if (!trimmed.trim() || locale === 'ko') return trimmed

  const key = cacheKey(locale, trimmed)
  const cached = textCache.get(key)
  if (typeof cached === 'string') return cached
  if (cached && typeof cached.then === 'function') return cached

  const pending = translateViaGoogle(trimmed, locale)
    .then((value) => {
      textCache.set(key, value)
      return value
    })
    .catch((err) => {
      textCache.delete(key)
      console.warn('[pageTranslate] fail:', trimmed.slice(0, 32), err?.message || err)
      // 실패 시 원문 유지 (다음 시도 가능하도록 캐시하지 않음)
      return trimmed
    })

  textCache.set(key, pending)
  return pending
}

async function mapPool (items, limit, worker) {
  const ret = new Array(items.length)
  let i = 0
  const runners = Array.from({ length: Math.min(limit, items.length) || 0 }, async () => {
    while (i < items.length) {
      const idx = i++
      ret[idx] = await worker(items[idx], idx)
    }
  })
  await Promise.all(runners)
  return ret
}

/**
 * root 아래 텍스트를 locale 로 맞춘다.
 * @param {ParentNode} root
 * @param {string} locale
 * @param {{ signal?: AbortSignal, onProgress?: (info: { done: number, total: number, percent: number }) => void }} [options]
 */
export async function applyPageTranslation (root, locale, options = {}) {
  if (!root || typeof document === 'undefined') return
  const signal = options.signal
  const onProgress = options.onProgress

  const report = (done, total) => {
    const safeTotal = Math.max(total, 1)
    const percent = Math.min(100, Math.round((done / safeTotal) * 100))
    onProgress?.({ done, total: safeTotal, percent })
  }

  if (locale === 'ko') {
    report(0, 1)
    const nodes = collectTextNodes(root, { includeTranslated: true })
    for (const node of nodes) {
      const state = nodeState.get(node)
      if (state && node.nodeValue !== state.origin) {
        node.nodeValue = state.origin
        state.locale = 'ko'
        state.translated = state.origin
      }
    }
    report(1, 1)
    return
  }

  const nodes = collectTextNodes(root)
  // 유니크 원문만 먼저 번역해 요청 수 축소
  const unique = [...new Set(
    nodes.map((node) => {
      const current = node.nodeValue ?? ''
      const state = nodeState.get(node)
      if (state && (current === state.translated || current === state.origin)) {
        return state.origin
      }
      return current
    }).filter(Boolean)
  )]

  // fetch 단계 90% + DOM 적용 10%
  const fetchTotal = unique.length
  let fetchDone = 0
  report(0, Math.max(fetchTotal, 1))

  await mapPool(unique, 5, async (text) => {
    if (signal?.aborted) return
    await translateText(text, locale)
    fetchDone += 1
    // 0~90
    const percent = fetchTotal
      ? Math.min(90, Math.round((fetchDone / fetchTotal) * 90))
      : 90
    onProgress?.({ done: fetchDone, total: Math.max(fetchTotal, 1), percent })
  })

  if (signal?.aborted) return

  const applyTotal = nodes.length || 1
  let applyDone = 0

  for (const node of nodes) {
    if (signal?.aborted) return
    const current = node.nodeValue ?? ''
    let state = nodeState.get(node)

    if (
      !state ||
      (current !== state.translated && current !== state.origin)
    ) {
      state = { origin: current, locale: 'ko', translated: current }
      nodeState.set(node, state)
    }

    if (!(state.locale === locale && node.nodeValue === state.translated)) {
      const next = await translateText(state.origin, locale)
      if (signal?.aborted) return
      if (node.parentNode && next != null) {
        node.nodeValue = next
        state.locale = locale
        state.translated = next
      }
    }

    applyDone += 1
    // 90~100
    const percent = 90 + Math.round((applyDone / applyTotal) * 10)
    onProgress?.({ done: applyDone, total: applyTotal, percent: Math.min(100, percent) })
  }

  onProgress?.({ done: applyTotal, total: applyTotal, percent: 100 })
}

export const NO_TRANSLATE_ATTR = 'data-no-translate'
