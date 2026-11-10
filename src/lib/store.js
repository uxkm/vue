import { create } from 'zustand'
import { DEFAULT_LOCALE } from './i18n'

/** 앱 전역 상태 (zustand) */
export const useAppStore = create((set) => ({
  /** 현재 언어. 기본은 원문(ko) */
  locale: DEFAULT_LOCALE,
  /** 언어를 저장소에 기록 */
  setLocale: (locale) => set({ locale }),
  /**
   * 페이지 번역 진행률 0~100.
   * null 이면 대기(표시 안 함).
   */
  localeProgress: null,
  setLocaleProgress: (localeProgress) => set({ localeProgress }),
  translationError: '',
  setTranslationError: (translationError) => set({ translationError }),
  translationAttempt: 0,
  retryTranslation: () => set((state) => ({
    translationAttempt: state.translationAttempt + 1,
    translationError: ''
  }))
}))

export default useAppStore
