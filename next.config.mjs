import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { STYLE_ENTRIES } from './scripts/style-entries.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const useCompiledCss = process.env.STYLE_MODE === 'css'
const useTurbopack = Boolean(process.env.TURBOPACK)
const stylesRoot = path.join(__dirname, 'src/styles')
const distRoot = path.join(stylesRoot, 'css')
const srcRoot = path.join(__dirname, 'src')

/** 정적 export 는 프로덕션 빌드에서만. 개발 모드에 켜면 App Router가 전부 404가 된다. */
const isProdBuild = process.env.NODE_ENV === 'production'

/**
 * STYLE_MODE=css + Turbopack — webpack NormalModuleReplacement 대응.
 * JS에서 import 하는 SCSS 엔트리 → 컴파일된 .min.css
 * @returns {Record<string, string>}
 */
function compiledCssAliases () {
  /** @type {Record<string, string>} */
  const aliases = {}
  for (const entryRel of STYLE_ENTRIES) {
    const absScss = path.join(__dirname, entryRel)
    let absCss
    if (entryRel.startsWith('src/styles/') && path.dirname(absScss) === stylesRoot) {
      absCss = path.join(distRoot, path.basename(entryRel, '.scss') + '.min.css')
    } else {
      const rel = path.relative(srcRoot, absScss)
      if (rel.startsWith('..')) continue
      absCss = path.join(distRoot, rel.replace(/\.scss$/i, '.min.css'))
    }
    if (entryRel.startsWith('src/')) {
      aliases['@/' + entryRel.slice('src/'.length)] = absCss
    }
  }
  return aliases
}

/** webpack 전용 — Turbopack 은 함수 additionalData 직렬화 불가 */
function sassAdditionalData (content, loaderContext) {
  const f = String(loaderContext?.resourcePath || '').replace(/\\/g, '/')
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
  if (
    content.includes("@use 'foundations/helpers'") ||
    content.includes('@use "foundations/helpers"') ||
    content.includes("@use 'helpers'") ||
    content.includes('@use "helpers"')
  ) {
    return content
  }
  return '@use "foundations/helpers" as *;\n' + content
}

/**
 * Next.js 15.5 권장 구성
 * - dev  : Turbopack (serve.mjs turbo/turbopack)
 * - build: webpack (`next build --webpack`) — static export + STYLE_MODE 안정
 * - Sass : sass-embedded (Dart Sass native)
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  ...(isProdBuild ? { output: 'export' } : {}),
  // localhost 로 기동해도 127.0.0.1 로 접속하면 /_next/* 교차출처 경고 → 명시 허용
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    unoptimized: true
  },
  htmlLimitedBots: /.*/,
  reactStrictMode: true,
  trailingSlash: false,
  sassOptions: {
    implementation: 'sass-embedded',
    includePaths: [stylesRoot],
    // 비ASCII 주석 시 Sass 기본값이 CSS 선두에 UTF-8 BOM 을 넣어
    // `:root` 선택자가 `\\ufeff:root` 로 깨지며 토큰·컴포넌트 스타일이 전부 무효화됨
    charset: false,
    // Next/webpack 경로의 legacy JS API 경고 억제 (소스 SCSS는 @use)
    silenceDeprecations: ['legacy-js-api'],
    ...(useTurbopack ? {} : { additionalData: sassAdditionalData })
  },
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js'
      }
    },
    ...(useCompiledCss ? { resolveAlias: compiledCssAliases() } : {})
  },
  /**
   * STYLE_MODE=css (ui / build): .scss → css/*.min.css
   * STYLE_MODE 미설정 (dev): SCSS 직접 로드
   */
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.md$/i,
      type: 'asset/source'
    })

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
          const rel = path.relative(srcRoot, abs)
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
