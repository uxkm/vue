/** 언어 전환 상태만 관리. 문구 JSON/locales 없음 — 번역은 AppLayout GlobalTranslator. */

/** 지원 언어 — 버튼 라벨은 항상 한글 (원문 = 한국어) */
export const SUPPORTED_LOCALES = [
  { code: 'ko', label: '원문', htmlLang: 'ko' },
  { code: 'th', label: '태국어', htmlLang: 'th' },
  { code: 'vi', label: '베트남어', htmlLang: 'vi' },
  { code: 'ru', label: '러시아어', htmlLang: 'ru' },
  { code: 'en', label: '영어', htmlLang: 'en' }
]

/** 기본 언어. 원문(한국어) */
export const DEFAULT_LOCALE = 'ko'
/** 사용자 선택 저장 */
export const LOCALE_STORAGE_KEY = 'publish-list.locale.v2'

/** 언어를 못 알아들으면 원문(ko)으로 돌린다. en-US 는 en */
export function normalizeLocale (code) {
  const base = String(code || '').toLowerCase().split('-')[0]
  return SUPPORTED_LOCALES.some((item) => item.code === base) ? base : DEFAULT_LOCALE
}

/** 지원 언어 코드인지 */
export function isSupportedLocale (code) {
  return SUPPORTED_LOCALES.some((item) => item.code === code)
}

/** 최초/서버 진입 언어 — 항상 원문(ko) */
export function detectLocale () {
  return DEFAULT_LOCALE
}

/** html lang 과 data-locale 을 현재 언어에 맞춘다 */
export function applyDocumentLang (locale) {
  if (typeof document === 'undefined') return
  const meta = SUPPORTED_LOCALES.find((item) => item.code === locale)
  document.documentElement.lang = meta?.htmlLang || locale
  document.documentElement.dataset.locale = locale
}

/** 앱 언어를 바꾼다. 저장소·document.lang 갱신 */
export async function setAppLocale (locale) {
  const next = normalizeLocale(locale)

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  applyDocumentLang(next)
  return next
}

/** 클라이언트 최초 — 저장 언어 복원 */
export async function bootstrapLocale () {
  let locale = DEFAULT_LOCALE
  if (typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY)
      if (saved) locale = normalizeLocale(saved)
    } catch {
      /* ignore */
    }
  }
  await setAppLocale(locale)
  return locale
}

/** SSR 호환 no-op */
export function pinLocaleForSSR () {
  /* no-op */
}
