/**
 * public/images 등 원격·정적 SVG를 인라인 코드로 쓰기 위한 헬퍼.
 * script·이벤트 속성을 제거하고 viewBox·innerHTML 만 남긴다.
 */

export type EmbeddedSvgData = {
  viewBox: string
  innerHTML: string
}

const cache = new Map<string, Promise<EmbeddedSvgData | null>>()

const DEFAULT_VIEW_BOX = '0 0 24 24'

/** 위험 태그·인라인 핸들러 제거 */
function sanitizeSvgMarkup (raw: string): string {
  return String(raw || '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<\?xml[^>]*\?>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\shref\s*=\s*("\s*javascript:[^"]*"|'\s*javascript:[^']*')/gi, '')
}

/**
 * 하드코딩 색을 currentColor 로 바꿔 color_* · 부모 색 상속이 되게 한다.
 * none · currentColor · url(…) 은 유지.
 */
export function colorizeSvgMarkup (markup: string): string {
  return String(markup || '').replace(
    /\s(stroke|fill)\s*=\s*("([^"]*)"|'([^']*)')/gi,
    (full, attr: string, _quoted: string, doubleVal?: string, singleVal?: string) => {
      const value = (doubleVal ?? singleVal ?? '').trim()
      if (!value) return full
      const lower = value.toLowerCase()
      if (lower === 'none' || lower === 'currentcolor' || lower.startsWith('url(')) {
        return full
      }
      return ` ${attr}="currentColor"`
    }
  )
}

/** SVG 문자열 → viewBox + 내부 마크업 */
export function parseSvgMarkup (raw: string): EmbeddedSvgData | null {
  const cleaned = colorizeSvgMarkup(sanitizeSvgMarkup(raw))
  if (typeof DOMParser === 'undefined') return null

  const doc = new DOMParser().parseFromString(cleaned, 'image/svg+xml')
  if (doc.querySelector('parsererror')) return null

  const svg = doc.querySelector('svg')
  if (!svg) return null

  const viewBox =
    svg.getAttribute('viewBox') ||
    (() => {
      const width = svg.getAttribute('width')
      const height = svg.getAttribute('height')
      if (width && height) {
        const w = String(width).replace(/px$/i, '')
        const h = String(height).replace(/px$/i, '')
        if (/^\d+(\.\d+)?$/.test(w) && /^\d+(\.\d+)?$/.test(h)) return `0 0 ${w} ${h}`
      }
      return DEFAULT_VIEW_BOX
    })()

  return {
    viewBox,
    innerHTML: svg.innerHTML.trim()
  }
}

/** URL 에서 SVG 를 가져와 파싱. 동일 URL 은 캐시. */
export function loadEmbeddedSvg (url: string): Promise<EmbeddedSvgData | null> {
  const key = String(url || '').trim()
  if (!key) return Promise.resolve(null)

  const hit = cache.get(key)
  if (hit) return hit

  const request = fetch(key)
    .then((res) => {
      if (!res.ok) throw new Error(`SVG fetch failed: ${res.status}`)
      return res.text()
    })
    .then((text) => parseSvgMarkup(text))
    .catch(() => null)

  cache.set(key, request)
  return request
}

/** 테스트·스토리용 캐시 초기화 */
export function clearEmbeddedSvgCache (): void {
  cache.clear()
}
