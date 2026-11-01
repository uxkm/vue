# Publish List

React + Vite 기반 퍼블리시 / UI 카탈로그 프로젝트입니다.

## 환경

| 항목 | 버전 |
|------|------|
| Node.js | `24.11.1` (`.nvmrc`, `>= 20` 가능) |
| npm | `>= 10` |
| React | `19` |
| Vite | `6` |

언어는 **TypeScript(`.tsx`)와 바닐라 JS(`.jsx`)를 함께** 사용합니다. 공용 컴포넌트는 TSX, 페이지는 JSX를 기본으로 합니다.

이전 Vue 전용 패키지 대응표는 [`src/lib/README.md`](src/lib/README.md)를 참고하세요.

```bash
nvm use   # .nvmrc → 20+
npm install
npm run dev
```

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` / `npm run ui` | 개발 서버 (기본 `http://localhost:8090`) |
| `npm run build` | 프로덕션 빌드 → `dist/` |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run generate:menus` | PC/Mobile 퍼블리시 메뉴 JSON·스텁 페이지 생성 |

## 폴더 구조

- `public/static/` — 정적 파일 (`/static/...`, 폰트·퍼블리시 JSON)
- `src/assets/` — 번들 처리 에셋
- `src/components/` — 디자인 시스템 (TSX)
- `src/pages/` — 화면 / 데모 (JSX)
- `src/hooks/` — `useClickOutside`, `useHomeScrollFx` 등
- `src/styles/` — SCSS

## 라우팅

Hash 모드입니다.

- `#/` — 퍼블리시 목록 (`PubIndex`)
- `#/pc/{menu}` / `#/pc/{menu}/{nn}`
- `#/mobile/{menu}` / `#/mobile/{menu}/{nn}`
- `#/components/{name}` — 컴포넌트 가이드
