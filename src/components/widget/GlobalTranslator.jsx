'use client'

/**
 * AppLayout 전역 DOM 번역.
 * 한글 원문 렌더 후 선택 언어로 텍스트를 번역한다. locales JSON 없이 동작.
 */
import { useEffect, useRef } from 'react'
import { useAppStore } from '@/lib/store'
import { DEFAULT_LOCALE, normalizeLocale } from '@/lib/i18n'
import { applyPageTranslation } from '@/lib/pageTranslate'

/**
 * AppLayout 전역 번역.
 * 화면은 한글 원문으로 렌더하고, 선택 언어가 원문이 아니면 DOM 텍스트를 번역한다.
 * locales 폴더 / 언어팩 JSON 없이 동작한다.
 *
 * @param {object} props
 * @param {{ current: HTMLElement | null } | null | undefined} props.rootRef - 번역할 DOM 루트 (보통 app-layout)
 * UI 노드는 렌더하지 않는다 (return null).
 */
export function GlobalTranslator ({ rootRef }) {
  const locale = useAppStore((s) => normalizeLocale(s.locale || DEFAULT_LOCALE))
  const setLocaleProgress = useAppStore((s) => s.setLocaleProgress)
  /** DOM 변경 debounce 타이머 */
  const timerRef = useRef(0)
  /** 최신 번역 실행 id. 이전 실행의 progress 갱신을 무시할 때 사용 */
  const runIdRef = useRef(0)
  /** 진행 중 번역 취소 */
  const abortRef = useRef(null)
  /** DOM 변경 감지 MutationObserver */
  const moRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let retryTimer = 0

    /** root 에 Observer·번역 루프를 붙인다 */
    const attach = (root) => {
      const stopMo = () => {
        try { moRef.current?.disconnect() } catch { /* ignore */ }
      }

      /** 번역 중에는 Observer 를 끄고, 끝난 뒤 다시 켠다 (자기 갱신 루프 방지) */
      const startMo = () => {
        if (!root.isConnected || !moRef.current) return
        moRef.current.observe(root, {
          childList: true,
          subtree: true,
          characterData: true
        })
      }

      /** 한 번의 페이지 번역 실행 */
      const run = async () => {
        if (cancelled) return
        const runId = ++runIdRef.current
        abortRef.current?.abort()
        const ac = new AbortController()
        abortRef.current = ac

        stopMo()
        root.dataset.translating = 'true'
        setLocaleProgress(0)

        try {
          await applyPageTranslation(root, locale, {
            signal: ac.signal,
            onProgress: ({ percent }) => {
              if (runId !== runIdRef.current || cancelled || ac.signal.aborted) return
              setLocaleProgress(percent)
            }
          })
        } catch (err) {
          if (!ac.signal.aborted) console.warn('[GlobalTranslator]', err)
        } finally {
          if (runId === runIdRef.current && !cancelled) {
            root.dataset.translating = 'false'
            setLocaleProgress(null)
            startMo()
          }
        }
      }

      /** DOM 변경이 잦을 때 160ms debounce 후 재번역 */
      const schedule = () => {
        window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => {
          void run()
        }, 160)
      }

      const mo = new MutationObserver(schedule)
      moRef.current = mo
      startMo()
      schedule()

      return () => {
        stopMo()
        moRef.current = null
        window.clearTimeout(timerRef.current)
        if (root.isConnected) root.dataset.translating = 'false'
      }
    }

    let detach = null

    /** rootRef 가 아직 없으면 짧게 재시도 */
    const tryAttach = () => {
      if (cancelled) return
      const root = rootRef?.current
      if (!root) {
        retryTimer = window.setTimeout(tryAttach, 50)
        return
      }
      detach = attach(root)
    }

    tryAttach()

    return () => {
      cancelled = true
      runIdRef.current += 1
      abortRef.current?.abort()
      window.clearTimeout(retryTimer)
      window.clearTimeout(timerRef.current)
      detach?.()
    }
  }, [locale, rootRef, setLocaleProgress])

  return null
}

export default GlobalTranslator
