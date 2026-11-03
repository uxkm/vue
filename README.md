# vue

Nuxt 3 기반 퍼블리시 목록 프로젝트입니다.

## 환경

| 항목 | 버전 |
|------|------|
| Node.js | `>= 20` (권장 `24.11.1`) |
| npm | `>= 10` |
| Vue | `^3.5` |
| Nuxt | `^3.15` |
| 정적 폴더 | `public/` → URL `/...` |

```bash
nvm install
nvm use
npm install
```

`.nvmrc` / `.node-version`: `24.11.1`

## 폴더 구조

- `public/` — 정적 자산 (예: `/fonts/...`, `/data/...`)
- `src/assets/` — 번들 처리 에셋
- `src/components/` → 알리아스 `@/components`, `@components`
- `src/pages/` → 파일 기반 라우팅 (`#/pc/...`, `#/mobile/...`)
- `src/layouts/` — 기본 레이아웃 (`AppShell`)
- `nuxt.config.ts` — Nuxt / Vite 설정

화면 파일(`index.vue`, `01.vue` 등)을 `src/pages`에 추가하면 해시 라우트가 자동 연결됩니다. `*Skeleton.vue`는 라우트에서 제외됩니다.

## 설치 / 실행

```bash
npm install
npm run dev
```

개발 서버 기본 포트: `8088`

## 빌드

```bash
npm run build
npm run preview
```
