import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ko: {
    translation: {
      appName: 'Publish List'
    }
  },
  en: {
    translation: {
      appName: 'Publish List'
    }
  }
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'ko',
    fallbackLng: 'ko',
    interpolation: { escapeValue: false }
  })
}

export { i18n }
export default i18n
