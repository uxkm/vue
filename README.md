# vue

운영 환경에 맞춘 Vue 2 webpack 프로젝트입니다.

## 운영 환경 (고정)

| 항목 | 버전 |
|------|------|
| Node.js | `6.0.0` |
| npm | `3.0.0` |
| Vue | `2.6.10` |
| Webpack | `3.6.0` |
| 정적 폴더 | `static/` |

```bash
nvm install 6.0.0
nvm use
# npm -v  → 3.x 확인 (필요 시 npm i -g npm@3.0.0)
```

`.nvmrc` / `.node-version`: `6.0.0`  
`package.json` engines: `node=6.0.0`, `npm=3.0.0`  
Vue / vue-template-compiler는 **exact `2.6.10`** 으로 고정되어 있습니다.

## 폴더 구조

- `static/` — webpack 미처리 정적 파일 (`/static/...`)
- `src/assets/` — webpack 처리 에셋
- `src/components/` → 알리아스 `@/components`
- `src/pages/` → 알리아스 `@/pages`
- `index.html` — 프로젝트 루트

## 설치 / 실행

```bash
npm install
npm run dev
```

## UI (빌드 후 실행)

```bash
npm run ui
```

## 빌드만

```bash
npm run build
```
