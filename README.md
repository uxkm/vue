# Publish List

Next.js (App Router) + React 퍼블리시 / UI 카탈로그 프로젝트입니다.

## 환경

| 항목 | 버전 |
|------|------|
| Node.js | `24.11.1` (`.nvmrc`, `>= 20` 가능) |
| npm | `>= 10` |
| Next.js | `15` |
| React | `19` |

언어는 **TypeScript(`.tsx`)와 바닐라 JS(`.jsx`)를 함께** 사용합니다. 공용 컴포넌트는 TSX, 화면은 JSX를 기본으로 합니다.

이전 Vue/Vite 의존성 대응표는 [`src/lib/README.md`](src/lib/README.md)를 참고하세요.

```bash
nvm use
npm install
npm run dev
```

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` / `npm run ui` | 개발 서버 (`http://localhost:8090`) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 (8090) |
| `npm run generate:menus` | PC/Mobile 퍼블리시 메뉴 JSON·스텁 생성 |
| `npm run generate:registry` | `src/views/registry.js` 동적 import 맵 생성 |

## 폴더 구조

- `app/` — Next.js App Router 라우트
- `public/static/` — 정적 파일 (`/static/...`)
- `src/components/` — 디자인 시스템 (TSX)
- `src/views/` — 화면 / 데모 (JSX) ※ Next `pages/` 충돌 방지를 위해 views 사용
- `src/hooks/`, `src/lib/`, `src/styles/`

## 라우팅

Hash(`#/`) 대신 **경로 기반**입니다.

- `/` — 퍼블리시 목록
- `/pc/{menu}` / `/pc/{menu}/{nn}`
- `/mobile/{menu}` / `/mobile/{menu}/{nn}`
- `/components/{name}` — 컴포넌트 가이드
- `/test/{name}` — 테스트 페이지
