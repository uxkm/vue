import type { NextConfig } from 'next'
import path from 'node:path'
import { STYLE_ENTRIES } from './scripts/style-entries.mjs'

const projectRoot = typeof __dirname === 'string' ? __dirname : process.cwd()
const useCompiledCss = process.env.STYLE_MODE === 'css'
const stylesRoot = path.join(projectRoot, 'src/styles')
const distRoot = path.join(stylesRoot, 'css')
const srcRoot = path.join(projectRoot, 'src')

/** 프로덕션 빌드에서 정적 사이트(out/)를 생성한다. */
const isProdBuild = process.env.NODE_ENV === 'production'

/**
 * STYLE_MODE=css (ui / build) — Turbopack CSS 별칭.
 * JS에서 import 하는 SCSS 엔트리 → 컴파일된 .min.css
 */
function compiledCssAliases (): Record<string, string> {
  const aliases: Record<string, string> = {}
  for (const entryRel of STYLE_ENTRIES) {
    const absScss = path.join(projectRoot, entryRel)
    let absCss: string
    if (entryRel.startsWith('src/styles/') && path.dirname(absScss) === stylesRoot) {
      absCss = path.join(distRoot, path.basename(entryRel, '.scss') + '.min.css')
    } else {
      const rel = path.relative(srcRoot, absScss)
      if (rel.startsWith('..')) continue
      absCss = path.join(distRoot, rel.replace(/\.scss$/i, '.min.css'))
    }
    if (entryRel.startsWith('src/')) {
      // Turbopack은 선행 / 경로를 파일시스템 절대 경로로 해석하지 않는다.
      aliases['@/' + entryRel.slice('src/'.length)] = './' + path.relative(projectRoot, absCss).split(path.sep).join('/')
    }
  }
  return aliases
}

const nextConfig: NextConfig = {
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
    loadPaths: [stylesRoot],
    // 비ASCII 주석 시 Sass 기본값이 CSS 선두에 UTF-8 BOM 을 넣어
    // `:root` 선택자가 `\\ufeff:root` 로 깨지며 토큰·컴포넌트 스타일이 전부 무효화됨
    charset: false
  },
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js'
      }
    },
    ...(useCompiledCss ? { resolveAlias: compiledCssAliases() } : {})
  }
}

export default nextConfig
