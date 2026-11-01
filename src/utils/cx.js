/** className 헬퍼 — 문자열/객체/배열 혼합 */
export function cx (...args) {
  const out = []
  for (const arg of args) {
    if (!arg) continue
    if (typeof arg === 'string' || typeof arg === 'number') {
      out.push(String(arg))
      continue
    }
    if (Array.isArray(arg)) {
      const inner = cx(...arg)
      if (inner) out.push(inner)
      continue
    }
    if (typeof arg === 'object') {
      for (const key of Object.keys(arg)) {
        if (arg[key]) out.push(key)
      }
    }
  }
  return out.join(' ')
}
