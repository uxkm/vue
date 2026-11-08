/**
 * Ripple — data-ripple 요소 클릭 위치에 파장(.ripple_wave)을 생성한다.
 * 스타일: styles/foundations/_ripple.scss
 *
 * data-ripple / data-ripple="true" / data-ripple="surface" → 활성
 * data-ripple="false" · data-no-ripple → 비활성
 */
export const RIPPLE_SELECTOR = '[data-ripple]:not([data-ripple="false"])'

const RIPPLE_CLASS = 'ripple_wave'
const RIPPLE_DURATION_MS = 600
const recentRipples = new WeakMap()

function prefersReducedMotion () {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isRippleDisabled (element) {
  if (!element || element.closest('[data-no-ripple]')) return true
  if (element.disabled) return true
  if (element.matches('label') && element.querySelector('input:disabled, button:disabled')) return true
  if (element.classList.contains('is-disabled')) return true
  if (element.getAttribute('aria-disabled') === 'true') return true
  return Boolean(element.closest('.is-disabled, [aria-disabled="true"]'))
}

function spawnRipple (target, clientX, clientY) {
  const rect = target.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height) * 2
  const ripple = document.createElement('span')

  ripple.className = RIPPLE_CLASS
  ripple.style.width = `${size}px`
  ripple.style.height = `${size}px`
  ripple.style.left = `${clientX - rect.left - size / 2}px`
  ripple.style.top = `${clientY - rect.top - size / 2}px`

  target.insertBefore(ripple, target.firstChild)
  recentRipples.set(target, Date.now())

  const cleanup = () => ripple.remove()
  ripple.addEventListener('animationend', cleanup, { once: true })
  window.setTimeout(cleanup, RIPPLE_DURATION_MS)
}

function resolveRippleTarget (event) {
  return event.target instanceof Element ? event.target.closest(RIPPLE_SELECTOR) : null
}

function onPointerDown (event) {
  if (event.pointerType === 'mouse' && event.button !== 0) return

  const target = resolveRippleTarget(event)
  if (!target?.isConnected || isRippleDisabled(target)) return
  spawnRipple(target, event.clientX, event.clientY)
}

function onClick (event) {
  const target = resolveRippleTarget(event)
  if (!target?.isConnected || isRippleDisabled(target)) return

  const lastAt = recentRipples.get(target)
  if (lastAt && Date.now() - lastAt < 500) return

  const rect = target.getBoundingClientRect()
  spawnRipple(target, rect.left + rect.width / 2, rect.top + rect.height / 2)
}

/** document 에 한 번만 pointerdown/click 위임을 등록한다. */
export function initRipple () {
  if (typeof document === 'undefined' || globalThis.__uxkmRippleInitialized) return
  globalThis.__uxkmRippleInitialized = true

  if (prefersReducedMotion()) return
  document.addEventListener('pointerdown', onPointerDown, { passive: true })
  document.addEventListener('click', onClick, { passive: true })
}
