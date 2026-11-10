'use client'

import { useHydrated } from '@/hooks/useHydrated'

import { useCallback, useState } from 'react'
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  normalizeLocale,
  setAppLocale
} from '@/lib/i18n'
import { useAppStore } from '@/lib/store'
import { resetTranslationService } from '@/lib/pageTranslate'

/**
 * 현재 언어 + 전환 API.
 * 화면 번역은 AppLayout GlobalTranslator.
 */
export function useLocale () {
  const storeLocale = useAppStore((s) => s.locale)
  const setStoreLocale = useAppStore((s) => s.setLocale)
  const localeProgress = useAppStore((s) => s.localeProgress)
  const translationError = useAppStore((s) => s.translationError)
  const requestRetry = useAppStore((s) => s.retryTranslation)
  const hydrated = useHydrated()
  const [localeLoading, setLocaleLoading] = useState(false)
  const [localeError, setLocaleError] = useState('')
  /** 언어 저장 중 또는 페이지 번역 진행 중 */
  const localeBusy = localeLoading || localeProgress != null


  const locale = hydrated
    ? normalizeLocale(storeLocale || DEFAULT_LOCALE)
    : DEFAULT_LOCALE

  const setLocale = useCallback(
    async (next) => {
      setLocaleLoading(true)
      setLocaleError('')
      resetTranslationService()
      useAppStore.getState().setTranslationError('')
      try {
        const applied = await setAppLocale(next)
        setStoreLocale(applied)
        return applied
      } catch (err) {
        setLocaleError(err?.message || '언어 전환에 실패했습니다')
        throw err
      } finally {
        setLocaleLoading(false)
      }
    },
    [setStoreLocale]
  )

  const retryTranslation = useCallback(() => {
    resetTranslationService()
    setLocaleError('')
    requestRetry()
  }, [requestRetry])

  return {
    locale,
    setLocale,
    hydrated,
    locales: SUPPORTED_LOCALES,
    localeLoading,
    localeBusy,
    localeProgress,
    localeError: localeError || translationError,
    retryTranslation,
    isKo: locale === 'ko',
    isTh: locale === 'th',
    isVi: locale === 'vi',
    isRu: locale === 'ru',
    isEn: locale === 'en'
  }
}

export default useLocale
