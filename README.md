# vue

Vue 3 + Vite 기반 퍼블리시 목록 프로젝트입니다.

## 환경

| 항목 | 버전 |
|------|------|
| Node.js | `>= 20` (권장 `24.11.1`) |
| npm | `>= 10` |
| Vue | `^3.5` |
| Vite | `^6` |
| 정적 폴더 | `static/` → URL `/...` |

```bash
nvm install
nvm use
npm install
```

`.nvmrc` / `.node-version`: `24.11.1`

## 폴더 구조

- `static/` — Vite `publicDir` (예: `/fonts/...`, `/data/...`)
- `src/assets/` — 번들 처리 에셋
- `src/components/` → 알리아스 `@/components`, `@components`
- `src/pages/` → 알리아스 `@/pages`, `@pages`
- `index.html` — 프로젝트 루트 (Vite 엔트리)

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
