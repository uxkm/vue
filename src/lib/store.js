import { create } from 'zustand'

/** Vuex 대체 — 앱 전역 상태가 필요할 때 확장 */
export const useAppStore = create((set) => ({
  locale: 'ko',
  setLocale: (locale) => set({ locale })
}))

export default useAppStore
