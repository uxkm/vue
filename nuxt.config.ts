import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const stylesDir = path.resolve(rootDir, 'src/styles')

function isPublishRoutePage (file?: string | null) {
  if (!file) return false
  const normalized = file.replace(/\\/g, '/')

  if (
    normalized.includes('Skeleton') ||
    normalized.endsWith('/DemoShell.vue') ||
    normalized.endsWith('/PubIndex.vue')
  ) {
    return false
  }

  return true
}

export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src',
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  experimental: {
    appManifest: false
  },

  // srcDir 기준이면 src/public 을 보므로 루트 public 을 절대경로로 지정
  dir: {
    public: path.resolve(rootDir, 'public')
  },

  // 기존 수동 import 패턴 유지 (Button/Link 등 이름 충돌 방지)
  components: false,

  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },

  css: ['~/styles/main.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'ko' },
      title: 'Publish List',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { rel: 'stylesheet', href: '/fonts/pretendard/pretendard.css' }
      ]
    }
  },

  router: {
    options: {
      hashMode: true
    }
  },

  alias: {
    '@': path.resolve(rootDir, 'src'),
    '@components': path.resolve(rootDir, 'src/components'),
    '@pages': path.resolve(rootDir, 'src/pages')
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [stylesDir],
          additionalData (content: string, filename: string) {
            const file = String(filename || '').replace(/\\/g, '/')
            if (
              file.includes('/styles/_helpers') ||
              file.includes('/styles/common/_helpers') ||
              file.includes('/styles/common/_variables') ||
              file.includes('/styles/common/_mixins') ||
              file.includes('/styles/common/_animations')
            ) {
              return content
            }
            const helpersPath = path.resolve(stylesDir, '_helpers.scss').replace(/\\/g, '/')
            return `@import "${helpersPath}";\n` + content
          },
          silenceDeprecations: ['import', 'legacy-js-api']
        }
      }
    }
  },

  devServer: {
    host: 'localhost',
    port: 8088
  },

  hooks: {
    'pages:extend' (pages) {
      const keep = pages.filter((page) => isPublishRoutePage(page.file))
      pages.splice(0, pages.length, ...keep)
    }
  }
})
