'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { DEFAULT_LOCALE, normalizeLocale } from '@/lib/i18n'
import { applyPageTranslation, hasTranslatableMutation } from '@/lib/pageTranslate'

/** 한글 렌더 후 번역한다. 장애 시 원문과 재시도 상태를 유지한다. */
export function GlobalTranslator ({ rootRef }) {
  const locale = useAppStore((s) => normalizeLocale(s.locale || DEFAULT_LOCALE))
  const attempt = useAppStore((s) => s.translationAttempt)
  const setLocaleProgress = useAppStore((s) => s.setLocaleProgress)
  const setTranslationError = useAppStore((s) => s.setTranslationError)

  useEffect(() => {
    let cancelled = false
    let timer = 0
    let retryTimer = 0
    let controller = null
    let observer = null
    let root = null

    const run = async () => {
      if (cancelled) return
      controller?.abort()
      const ac = new AbortController()
      controller = ac
      root.dataset.translating = 'true'
      setLocaleProgress(0)
      try {
        const result = await applyPageTranslation(root, locale, {
          signal: ac.signal,
          onProgress: ({ percent }) => {
            if (!cancelled && !ac.signal.aborted) setLocaleProgress(percent)
          }
        })
        if (cancelled || ac.signal.aborted) return
        const unavailable = result.status === 'unavailable'
        setTranslationError(unavailable ? '번역 서비스를 사용할 수 없어 원문을 표시합니다.' : '')
        document.documentElement.lang = unavailable ? DEFAULT_LOCALE : locale
      } finally {
        if (!cancelled && controller === ac) {
          root.dataset.translating = 'false'
          setLocaleProgress(null)
        }
      }
    }
    const schedule = () => {
      controller?.abort()
      window.clearTimeout(timer)
      timer = window.setTimeout(() => { void run() }, 160)
    }
    const attach = () => {
      if (cancelled) return
      root = rootRef?.current
      if (!root) {
        retryTimer = window.setTimeout(attach, 50)
        return
      }
      observer = new MutationObserver((records) => {
        if (hasTranslatableMutation(records)) schedule()
      })
      observer.observe(root, { childList: true, subtree: true, characterData: true })
      schedule()
    }
    attach()
    return () => {
      cancelled = true
      controller?.abort()
      observer?.disconnect()
      window.clearTimeout(timer)
      window.clearTimeout(retryTimer)
      if (root) root.dataset.translating = 'false'
      setLocaleProgress(null)
    }
  }, [locale, attempt, rootRef, setLocaleProgress, setTranslationError])

  return null
}

export default GlobalTranslator
