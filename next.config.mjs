import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const useCompiledCss = process.env.STYLE_MODE === 'css'
const stylesRoot = path.join(__dirname, 'src/styles')
const distRoot = path.join(stylesRoot, 'css')

/** 정적 export 는 프로덕션 빌드에서만. 개발 모드에 켜면 App Router가 전부 404가 된다. */
const isProdBuild = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 배포: npm run build → out/ (HTML/CSS/JS) 업로드
  ...(isProdBuild ? { output: 'export' } : {}),
  images: {
    unoptimized: true
  },
  // src/pages 는 화면 소스(App이 import). 기기 루트는 IndexPage.jsx 로 app/*/page.jsx 와 충돌 방지.
  // useFileSystemPublicRoutes: false 는 App Router까지 끄므로 사용하지 않음.
  // 스트리밍 메타데이터 비활성 → body 의 <div hidden><!--$--><!--/$--></div> 제거
  htmlLimitedBots: /.*/,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [stylesRoot],
    // Dart Sass 3 대비 — 레거시 @import 경고 억제 (엔트리/헬퍼는 @use/@forward 로 이전)
    silenceDeprecations: ['import', 'legacy-js-api'],
    additionalData: (content, loaderContext) => {
      const f = String(loaderContext?.resourcePath || '').replace(/\\/g, '/')
      // 엔트리·헬퍼·변수 모듈에는 주입하지 않음 (중복 @use 방지)
      if (
        f.endsWith('/styles/index.scss') ||
        f.includes('/styles/foundations/_helpers.scss') ||
        f.includes('/styles/foundations/_variables.scss') ||
        f.includes('/styles/foundations/_mixins.scss') ||
        f.includes('/styles/foundations/_tokens.scss') ||
        f.includes('/styles/foundations/_themes.scss') ||
        f.includes('/styles/foundations/_utilities.scss') ||
        f.includes('/styles/foundations/_ripple.scss') ||
        f.includes('/styles/common/_helpers.scss') ||
        f.includes('/styles/common/_animations.scss') ||
        f.includes('/styles/common/_base.scss') ||
        f.includes('/styles/components/_index.scss') ||
        f.includes('/styles/layouts/_index.scss')
      ) {
        return content
      }
      // 페이지 SCSS 등 JS에서 직접 import 하는 파일용
      if (content.includes("@use 'foundations/helpers'") || content.includes('@use "foundations/helpers"') || content.includes("@use 'helpers'") || content.includes('@use "helpers"')) {
        return content
      }
      return '@use "foundations/helpers" as *;\n' + content
    }
  },
  trailingSlash: false,
  /**
   * STYLE_MODE=css (npm run ui / build): .scss import → css/*.min.css
   * STYLE_MODE 미설정 (npm run dev): SCSS 그대로 로드
   */
  webpack: (config, { webpack }) => {
    if (!useCompiledCss) return config

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/\.scss$/i, (resource) => {
        const req = resource.request || ''
        if (!req.includes('.scss') || req.includes('/css/')) return

        let abs = null
        if (req.startsWith('@/styles/')) {
          abs = path.join(stylesRoot, req.replace('@/styles/', ''))
        } else if (req.startsWith('@/')) {
          abs = path.join(__dirname, 'src', req.slice(2))
        } else if (resource.context) {
          abs = path.resolve(resource.context, req)
        }
        if (!abs || !abs.endsWith('.scss')) return

        let dist
        if (path.dirname(abs) === stylesRoot) {
          dist = path.join(distRoot, path.basename(abs, '.scss') + '.min.css')
        } else {
          const rel = path.relative(path.join(__dirname, 'src'), abs)
          if (rel.startsWith('..')) return
          dist = path.join(distRoot, rel.replace(/\.scss$/i, '.min.css'))
        }
        resource.request = dist
      })
    )

    return config
  }
}

export default nextConfig
