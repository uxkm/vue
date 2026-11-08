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
| `npm run dev` | 개발 서버 — **SCSS 직접** 로드 + HMR (HTTP `8090` / HTTPS `8443`) |
| `npm run ui` | 개발 서버 — SCSS→CSS **감시·재빌드** 후 **`.min.css`** 로드 (JS·스타일 모두 실시간) |
| `npm run build:styles` | SCSS → `css/*.css`(규칙당 1줄) + `css/*.min.css`(압축). 앱·빌드는 `.min.css` |
| `npm run build` | 정적 사이트 생성 → **`out/`** (웹 서버에 이 폴더 업로드) |
| `npm run start` | `out/` 로컬 미리보기 — HTTP `8090` + HTTPS `8443` |
| `npm run start:http` | `out/` HTTP만 (`serve`) |
| `npm run lint` | Next ESLint |
| `npm run generate:registry` | pages 스캔 → `registry.js` 생성 (`dev`·`build` 시 자동). 가이드 메뉴는 `public/data/pub/guide-menu.json` |
| `npm run clean` | 빌드 산출물·캐시 삭제 (`.next`, **`out/`**, `src/styles/css`, 이전 `src/styles/dist`, `.cache` 등) |
| `npm run clean:modules` | `node_modules` 만 삭제 |
| `npm run clean:all` | `clean`(out 포함) + `node_modules` → 이후 `npm install` |

## package.json

| 필드 | 설명 |
|------|------|
| `name` / `version` / `description` | 패키지 식별 (`publish-list` · `3.0.0`) |
| `private` | npm 배포 금지 |
| `browserslist` | Autoprefixer·빌드 타깃 (점유율 0.5%+, 최근 2버전, iOS 14+, Android 10+ 등) |
| `engines` | Node `>= 20`, npm `>= 10` |

### dependencies (런타임)

대부분 Vue 시절 라이브러리의 React 대체이며, 래퍼는 [`src/lib/`](src/lib/README.md)에 있습니다.

| 패키지 | 용도 |
|--------|------|
| `next` · `react` · `react-dom` | 프레임워크·UI 코어 |
| `@amcharts/amcharts5` | 차트 (`@/lib/charts`) |
| `@dnd-kit/core` · `sortable` · `utilities` | 드래그앤드롭 (`@/lib/dnd`) |
| `@fullcalendar/*` | 캘린더 (`@/lib/calendar`) |
| `ajv` | JSON 스키마 검증 |
| `aos` | 스크롤 등장 애니메이션 |
| `clipboard-copy` | 클립보드 복사 (`@/lib/clipboard`) |
| `dayjs` | 날짜/시간 (`@/lib/dayjs`) |
| `filesize` | 파일 크기 표시 포맷 |
| `gsap` | 고급 애니메이션 |
| `hls.js` | HLS 영상 재생 |
| `i18next` · `react-i18next` | 다국어 (`@/lib/i18n`, `src/locales/`) |
| `js-base64` | Base64 인코딩/디코딩 |
| `lodash-es` | 유틸 함수 (ESM) |
| `lottie-react` · `lottie-web` | Lottie 애니메이션 (`@/lib/lottie`) |
| `react-youtube` | YouTube 임베드 (`@/lib/youtube`) |
| `simplebar-react` | 커스텀 스크롤바 (`@/lib/scroll`) |
| `swiper` | 슬라이더/캐러셀 (`@/lib/swiper`) |
| `viewerjs` | 이미지 뷰어 (`@/lib/viewer`) |
| `webstomp-client` | STOMP 웹소켓 클라이언트 |
| `xss` | XSS 방지 필터 |
| `zustand` | 전역 상태 (`@/lib/store`) |

### devDependencies (개발 전용)

| 패키지 | 용도 |
|--------|------|
| `@types/*` | TypeScript 타입 (aos, lodash-es, node, react, react-dom) |
| `sass` | SCSS 컴파일 |
| `postcss` · `autoprefixer` | CSS 후처리 · 벤더 프리픽스 (`postcss.config.mjs`) |
| `typescript` | 타입 체크/컴파일 |

## 폴더 구조

```
.
├── app/                 # Next.js App Router 라우트
├── public/              # 정적 파일 (빌드 번들 제외)
├── scripts/             # 메뉴·레지스트리 생성 스크립트
└── src/                 # 소스 (컴포넌트·화면·스타일·유틸)
```

### app / pages 계층 (권장)

라우트와 화면 본문을 나눕니다. `@/pages/...` import는 의도된 패턴이며, 화면 JSX를 `app/`에 두지 않습니다.

| 위치 | 역할 |
|------|------|
| `app/` | URL, layout, 스타일 엔트리, `generateStaticParams`, 얇은 진입 |
| `src/pages/` | 실제 화면·스켈레톤 (퍼블 작업 위치) |
| `src/generated/registry.js` | `pages` 스캔 결과 로더·meta (`npm run generate:registry`) |
| `src/components/` | 공통 UI (라우트와 무관) |

- **기기 루트** (`/b2b`, `/web`, `/mobile`): `app/*/page.jsx` → `@/pages/{b2b\|web\|mobile}`
- **동적 메뉴·화면**: `app/.../page.jsx`(서버) + `page.client.jsx`의 `RegistryPage` → 레지스트리가 `pages` 모듈을 로드
- **퍼블리시 목록**: `app/pub/page.jsx` → `@/pages/pub`

```jsx
// app/b2b/page.jsx — 라우트 셸만
import B2bIndexPage from '@/pages/b2b'
export default function B2bPage () {
  return <B2bIndexPage />
}
```

### `app/` — 라우팅

| 경로 | 설명 |
|------|------|
| `layout.jsx` | 루트 레이아웃 |
| `page.jsx` | `/` → `/b2b` 리다이렉트 |
| `b2b/`, `web/`, `mobile/` | 기기별 루트·메뉴·화면 라우트 (본문은 `src/pages`) |
| `pub/` | 퍼블리시 목록 |
| `components/[name]/` | 컴포넌트 가이드 |
| `demo/[name]/` | 데모 페이지 |

### `public/` — 정적 자산

| 경로 | 설명 |
|------|------|
| `fonts/pretendard/` | Pretendard 웹폰트 (`woff` / `woff2`) |
| `data/pub/` | 퍼블리시 목록 **단일 소스** (`b2b`/`web`/`mobile` JSON 수동 관리). 컴포넌트는 `/components` 가이드 |
| `images/icon\|common\|pages` | 이미지 (호출: `@/utils/images` 또는 `/images/...`) |
| `favicon.ico` / `favicon.svg` | 파비콘 |

### `scripts/` — 코드 생성

| 파일 | 설명 |
|------|------|
| `registry.js` | `src/generated/registry.js` 동적 import 맵 생성 (`npm run generate:registry`) |

퍼블리시 목록은 `public/data/pub/` JSON만 편집합니다. (생성 스크립트 없음)

### `src/` — 애플리케이션 소스

| 경로 | 설명 |
|------|------|
| `components/` | 디자인 시스템. 화면 컴포넌트는 `ui/`, 그 외 `widget` · `module` · `shared` · `providers`. 공개 입구는 `index.js` |
| `pages/` | 화면만 (JSX). `app/` 라우트 셸이 `@/pages/...` 로 연결. `useFileSystemPublicRoutes: false` 로 Pages Router 충돌 방지 |
| `pages/b2b\|web\|mobile/{menu}/` | 기기별 퍼블리시 화면 (`skeleton/` 포함) |
| `pages/pub/guide/` | 퍼블리싱 가이드(컴포넌트) 화면 |
| `pages/pub/data/` | pub 전용 import 데이터 (`guide/` API 문서 섹션 등). `demo/` 데이터도 여기 확장 가능 |
| `pages/pub/` | `index.jsx` · `widgets/`(목록 UI) · `guide/` · `demo/`(*DemoPage) · `data/` · `shared/` |
| `generated/` | 빌드용 생성물 (`registry.js`, `registry-ids.js`) |
| `styles/` | SCSS. `common` · `components` · `pages` · `index.scss` |
| `hooks/` | 공용 React 훅 (`useLocale`, `useClickOutside` 등) |
| `locales/` | i18n 번역 JSON (`ko` · `th` · `vi` · `ru` · `en`) |
| `lib/` | 외부 라이브러리 래퍼 / Vue→React 대응 (차트, 스와이퍼, i18n 등) |
| `utils/` | 유틸 (`cx`, `images`, `scrollFx` 등) |
| `assets/` | 번들에 포함되는 소량 에셋 (예: `logo.svg`) |

## 다국어 (i18n)

`i18next` + `react-i18next` 기반입니다. 기본 언어는 **원문(한국어 `ko`)** 이며, 태국어·베트남어·러시아어·영어를 지원합니다. 전환 버튼명은 항상 한글입니다.

| 경로 | 설명 |
|------|------|
| `src/locales/{ko\|th\|vi\|ru\|en}/common.json` | 번역 리소스 |
| `src/lib/i18n.js` | 초기화 · 언어 감지 · `document.documentElement.lang` 동기화 |
| `src/hooks/useLocale.js` | `t` / `locale` / `setLocale` 훅 |
| `src/pages/pub/widgets/LanguageSwitcher.jsx` | (deprecated) `@/comp` LanguageSwitcher 재export |

```jsx
import { useLocale } from '@/hooks/useLocale'
import LanguageSwitcher from '@/pages/pub/widgets/LanguageSwitcher'

function Example () {
  const { t, setLocale } = useLocale()
  return (
    <>
      <h1>{t('appName')}</h1>
      <LanguageSwitcher variant="buttons" />
      <button type="button" onClick={() => setLocale('ko')}>원문</button>
    </>
  )
}
```

- 서버 실행·최초 진입: 항상 **원문(`ko`) 버튼 활성** (localStorage·브라우저 언어로 덮지 않음)
- 세션 중 언어 전환은 유지되며, `원문` 클릭 시 한국어(`ko`)로 복귀
- `html[lang]` / `data-locale` 자동 갱신
- 언어 추가: `SUPPORTED_LOCALES`에 `code` + 한글 `label` + `src/locales/{code}/common.json` 작성

퍼블리시 목록(`/pub`) 히어로에 언어 전환 버튼이 있습니다.

## 라우팅

Hash(`#/`) 대신 **경로 기반**입니다.

- `/` — `/b2b` 로 리다이렉트
- `/pub` — 퍼블리시 목록
- `/b2b` · `/web` · `/mobile` — 각 기기 메인 (`/…/main` 은 루트로 리다이렉트)
- `/b2b|web|mobile/{menu}` / `/{menu}/{screen}`
- `/components/{name}` — 컴포넌트 가이드
- `/demo/{name}` — 데모 페이지
