import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    // Dart Sass 3 대비 — 레거시 @import 경고 억제 (엔트리/헬퍼는 @use/@forward 로 이전)
    silenceDeprecations: ['import', 'legacy-js-api'],
    additionalData: (content, loaderContext) => {
      const f = String(loaderContext?.resourcePath || '').replace(/\\/g, '/')
      // 엔트리·헬퍼·변수 모듈에는 주입하지 않음 (중복 @use 방지)
      if (
        f.endsWith('/styles/main.scss') ||
        f.includes('/styles/_helpers.scss') ||
        f.includes('/styles/common/_helpers.scss') ||
        f.includes('/styles/common/_variables.scss') ||
        f.includes('/styles/common/_mixins.scss') ||
        f.includes('/styles/common/_animations.scss') ||
        f.includes('/styles/common/_base.scss') ||
        f.includes('/styles/components/_index.scss')
      ) {
        return content
      }
      // 페이지 SCSS 등 JS에서 직접 import 하는 파일용
      if (content.includes("@use 'helpers'") || content.includes('@use "helpers"')) {
        return content
      }
      return '@use "helpers" as *;\n' + content
    }
  },
  trailingSlash: false
}

export default nextConfig
