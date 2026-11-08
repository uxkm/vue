'use client'

/**
 * 앱 루트 Provider.
 * 저장 언어 복원·document lang 적용 후 AppLayout 으로 전 라우트를 감싼다.
 */
import { useEffect } from 'react'
import { AppLayout } from '@/comp'
import {
  DEFAULT_LOCALE,
  applyDocumentLang,
  bootstrapLocale
} from '@/lib/i18n'
import { useAppStore } from '@/lib/store'
import { initRipple } from '@/utils/ripple'

/** soft nav 시 중복 bootstrap 방지 */
let localeBootstrapped = false

/** 저장 언어 복원 후 전 라우트에 적용 (번역은 AppLayout GlobalTranslator) */
function LocaleBootstrap ({ children }) {
  const setLocale = useAppStore((s) => s.setLocale)

  useEffect(() => {
    if (localeBootstrapped) return undefined

    let cancelled = false

    ;(async () => {
      setLocale(DEFAULT_LOCALE)
      applyDocumentLang(DEFAULT_LOCALE)

      try {
        const locale = await bootstrapLocale()
        if (cancelled) return
        setLocale(locale)
      } catch (err) {
        console.warn('[locale] bootstrap failed', err)
        if (cancelled) return
        setLocale(DEFAULT_LOCALE)
        applyDocumentLang(DEFAULT_LOCALE)
      } finally {
        if (!cancelled) localeBootstrapped = true
      }
    })()

    return () => {
      cancelled = true
    }
  }, [setLocale])

  return children
}

/** 클릭 파장(data-ripple) 전역 등록 */
function RippleBootstrap ({ children }) {
  useEffect(() => {
    initRipple()
  }, [])
  return children
}

/** 앱 레이아웃으로 화면을 감싼다 */
export default function AppProviders ({ children }) {
  return (
    <LocaleBootstrap>
      <RippleBootstrap>
        <AppLayout>{children}</AppLayout>
      </RippleBootstrap>
    </LocaleBootstrap>
  )
}
