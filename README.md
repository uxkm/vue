# Publish List

Next.js 16 App Router와 React 19 기반 퍼블리싱 작업 환경입니다. 기기별 화면, 공통 UI, 라이브러리 데모를 한 프로젝트에서 관리하고 정적 사이트로 배포합니다.

## 프로젝트 구성

- **화면 작업**: B2B·WEB·MOBILE 화면과 스켈레톤을 `src/screens/`에서 관리합니다.
- **UI 가이드**: 공통 컴포넌트의 사용 예제·속성·디자인 토큰을 확인합니다.
- **퍼블리시 목록**: 화면별 경로·작업 상태·비고를 JSON으로 관리합니다.
- **검사 도구**: ESLint, TypeScript, Playwright·axe와 KWCAG 2.2 수동 체크리스트를 사용합니다.

| 경로 | 용도 |
| --- | --- |
| [소개](/guide) | 프로젝트 환경과 작업 방법 |
| [접근성](/guide/accessibility) | KWCAG 2.2 검사 항목과 검수 흐름 |
| [컴포넌트 예제](/guide/button) | 공통 UI 가이드의 시작 화면 |
| [라이브러리 데모](/demo/libs) | 외부 라이브러리 사용 예제 |
| [퍼블리시 목록](/pub) | 화면 목록·진행 상태 |
| `/b2b`, `/web`, `/mobile` | 기기별 메인과 하위 화면 |

## 개발 환경

아래 패키지 버전은 현재 `package-lock.json` 기준입니다. Node.js는 `.nvmrc`와 `.node-version`에 맞춥니다.

| 항목 | 현재 구성 |
| --- | --- |
| Node.js | `24.11.1` 고정 · 패키지 최소 조건 `20.9.0` |
| npm | `10` 이상 |
| Next.js | `16.4.5` · App Router |
| React / React DOM | `19.3.1` |
| TypeScript | `5.9.3` · JSX와 TSX 병행 |
| 번들러 | 개발·UI·프로덕션 빌드 모두 **Turbopack** |
| 스타일 | Sass Embedded + PostCSS·Autoprefixer |
| 코드 검사 | ESLint 9 · Flat Config · 경고 허용 안 함 |
| 브라우저 검사 | Playwright `1.65.0` + axe `4.14.0` |
| 배포 | `output: 'export'`로 생성한 `out/` 정적 파일 |

지원 대상은 Chrome·Edge·Firefox 111 이상, Safari·iOS Safari 16.4 이상, Android Chrome 111 이상입니다. `browserslist`는 브라우저 버전을 기준으로 설정합니다.

## 시작하기

프로젝트 루트에서 실행합니다. 다음 명령은 macOS·Linux 셸 기준입니다.

```bash
nvm use
npm ci
npm run dev
```

개발 주소는 `http://localhost:8090`입니다. 로컬 인증서가 있으면 `https://localhost:8443`도 함께 제공합니다.

| 작업 | 명령 | 동작 |
| --- | --- | --- |
| 일반 개발 | `npm run dev` | 레지스트리 생성 후 SCSS를 직접 읽는 Turbopack 서버 실행 |
| CSS 출력 확인 | `npm run ui` | 레지스트리·CSS 생성 후 SCSS 감시와 개발 서버 실행 |
| 스타일만 빌드 | `npm run build:styles` | SCSS를 일반 CSS와 압축 CSS로 변환 |
| 화면 레지스트리 갱신 | `npm run generate:registry` | 화면 로더·주소 목록·제목 생성 |
| 프로덕션 빌드 | `npm run build` | 레지스트리·스타일 생성 후 Turbopack으로 정적 사이트 빌드 |
| 빌드 미리보기 | `npm run start` | `out/`을 HTTP와 선택적 HTTPS로 제공 |
| HTTP 미리보기 | `npm run start:http` | `serve`로 `out/`을 HTTP 8090에서 제공 |
| 전체 코드 검사 | `npm run lint` | React·접근성 규칙 검사 · 경고도 실패 처리 |
| 타입 검사 | `npm run typecheck` | TypeScript 검사 · 산출물 출력 없음 |

`npm run dev`와 `npm run ui`는 실행 시 레지스트리를 생성합니다. 새 화면 파일을 추가한 경우 `npm run generate:registry`를 다시 실행하거나 개발 서버를 재시작합니다. 기존 화면·스타일 수정은 개발 서버에서 반영합니다.

## 라우트와 화면 소스

URL은 `app/`에서 정의하고, 실제 화면은 `src/screens/`에 둡니다.

```text
.
├── app/                    # URL·레이아웃·메타데이터·로딩·오류 화면
├── src/
│   ├── screens/            # B2B·WEB·MOBILE·가이드·데모 화면
│   ├── components/         # 공통 UI·레이아웃·Provider
│   ├── hooks/              # 상태·hydration·키보드·DOM 관련 훅
│   ├── lib/                # 라우팅·정적 경로·외부 라이브러리 연동
│   ├── generated/          # 화면 레지스트리 생성물
│   ├── styles/             # SCSS 원본과 CSS 생성물
│   ├── config/             # 스켈레톤 등 공통 설정
│   ├── utils/              # 문자열·이미지·DOM 등 유틸리티
│   └── assets/             # 번들에 포함할 소량 에셋
├── public/                 # 폰트·이미지·퍼블리시 목록 JSON
├── scripts/                # 코드 생성·스타일 빌드·로컬 서버·검사
├── tests/a11y/             # 접근성 자동 검사와 UI 상호작용 검사
├── docs/a11y/              # 검수 방법·수동 체크리스트·검사 이력
└── .vscode/                # 공용 편집기·작업·디버깅 설정
```

| 계층 | 작업 위치와 역할 |
| --- | --- |
| 라우트 | `app/**/page.jsx`에서 URL 매개변수·정적 경로·제목을 처리합니다. |
| 화면 | `src/screens/{b2b,web,mobile}/`에서 JSX 화면과 스켈레톤을 작성합니다. |
| 가이드·데모 | `src/screens/pub/guide/`, `src/screens/pub/demo/`에서 예제를 관리합니다. |
| 공통 컴포넌트 | `src/components/`에서 TSX 기반 UI를 작성하고 `@/comp`로 가져옵니다. |
| 생성물 | `src/generated/registry-*.js`는 스크립트로 생성하며 직접 편집하지 않습니다. |

일반 화면 소스는 Next.js의 예약 라우팅 경로인 `src/pages/`에 두지 않습니다.

동적 화면의 라우트는 서버에서 `params`를 읽고 `RegistryPage`로 화면 모듈을 불러옵니다. `generateStaticParams`는 빌드할 주소를 만들고, `generateMetadata`는 페이지 제목을 생성합니다. 화면의 정적인 `Page`·`GuideLayout` 제목이나 `pageTitle` export가 제목 생성에 사용됩니다.

상태·이벤트·브라우저 API가 필요한 컴포넌트에는 `'use client'` 경계를 둡니다. 서버 렌더링과 첫 hydration의 상태를 맞추며, 데이터 로딩 상태는 실제 요청과 연결합니다.

## 주요 URL

| URL 형태 | 설명 |
| --- | --- |
| `/` | 브라우저에서 `/b2b`로 이동 |
| `/b2b`, `/web`, `/mobile` | 기기별 메인 |
| `/{device}/{menuId}` | 기기별 메뉴 메인 |
| `/{device}/{menuId}/{screen}` | 기기별 상세 화면 |
| `/guide` | 현재 소개 페이지 |
| `/guide/accessibility` | 접근성 가이드 |
| `/guide/{name}` | 컴포넌트 가이드 |
| `/demo/{name}` | 라이브러리·패턴 데모 |
| `/pub` | 퍼블리시 목록 |

`device`는 `b2b`, `web`, `mobile`입니다. `/b2b/main`처럼 기기 경로 뒤에 `main`이 오는 주소는 해당 기기 루트로 이동합니다.

## 스타일 작업

SCSS 원본은 `src/styles/`에 있습니다. 개발은 SCSS 직접 처리와 사전 생성 CSS 확인의 두 모드를 제공합니다.

| 모드 | 스타일 처리 |
| --- | --- |
| `dev` | Turbopack이 SCSS를 직접 컴파일 |
| `ui` | SCSS를 감시·컴파일하고 생성된 `.min.css`를 Turbopack에서 사용 |
| `build` | 스타일을 먼저 생성하고 `.min.css`로 정적 사이트 빌드 |

스타일 엔트리는 `scripts/style-entries.mjs`에서 관리합니다. 현재 `index`, `pub`, `web`, `mobile`, `demo`의 5개 엔트리를 사용하며 출력 위치는 `src/styles/css/`입니다. 공용 변수·믹스인이 필요한 SCSS에는 `@use`를 명시합니다.

화면에서는 기존 방식으로 SCSS를 import합니다. `ui`와 `build`는 `next.config.ts`의 Turbopack 별칭을 통해 압축 CSS로 연결합니다.

## 퍼블리시 목록과 정적 자산

- 프로젝트·탭 정보: `public/data/pub/index.json`
- 화면 목록·상태·비고: `public/data/pub/{b2b,web,mobile}/`의 JSON
- 가이드 메뉴: `public/data/pub/guide-menu.json`
- 폰트·이미지: `public/fonts/`, `public/images/`

퍼블리시 목록 JSON과 화면 파일 레지스트리는 별도로 관리합니다. 목록·메뉴 데이터는 브라우저에서 읽으며, 화면 추가 시 목록과 레지스트리에 필요한 내용을 각각 반영합니다.

## 언어 전환

한국어 원문을 기본으로 태국어·베트남어·러시아어·영어를 선택할 수 있습니다. 화면 문구 번역은 `GlobalTranslator`와 `src/lib/pageTranslate.js`가 브라우저에서 처리합니다.

- 언어 상태·지원 목록: `src/lib/i18n.js`
- 언어 선택 UI: `src/components/widget/LanguageSwitcher.jsx`
- 상태와 전환 API: `src/hooks/useLocale.js`, `src/lib/store.js`

선택한 언어는 `localStorage`에 저장하며 마운트 후 복원합니다. `html`의 `lang`과 `data-locale`도 선택에 맞춰 변경합니다. 원문으로 전환하면 한국어 UI를 다시 표시합니다.

현재는 번역 JSON 파일 대신 Google 번역 엔드포인트로 화면 문구를 요청하는 방식입니다. 외부 네트워크가 필요하며, 서비스 오류·시간 초과 시 화면을 원문으로 복원하고 자동 요청을 중단합니다. 언어 선택 영역의 ‘다시 시도’ 또는 다른 언어 선택으로 재요청할 수 있습니다. 동시 요청은 최대 2개이며 성공한 번역만 캐시합니다. 코드·번역 제외 영역은 번역 대상에서 제외합니다.

## 접근성·품질 검사

ESLint는 `eslint.config.mjs`의 React·JSX 접근성 권장 규칙을 사용합니다. `npm run lint`는 `--max-warnings=0`을 적용합니다. `next build`와 별도로 실행합니다.

```bash
npm run lint
npm run lint:a11y
npm run typecheck
npm run build
```

브라우저 검사를 처음 실행하는 환경에서는 Chromium을 설치합니다.

```bash
npx playwright install chromium
npm run test:a11y
```

| 명령 | 검사 범위 |
| --- | --- |
| `npm run lint:a11y` | JSX 접근성 정적 검사 · 진단이 있으면 실패 |
| `npm run test:a11y` | 빌드 후 Playwright·axe 검사와 UI 상호작용 회귀 검사 |
| `npm run a11y:audit` | 빌드 후 접근성 현황 수집 · 위반은 보고하고 실행 오류는 실패 |
| `npm run a11y:report` | HTML 검사 보고서 열기 |

대표 페이지와 모달 상태는 데스크톱·모바일 크기 Chromium에서 검사합니다. 아코디언·접기·서랍·날짜 선택·업로드·캐러셀의 키보드·상태 전환도 확인합니다.

보고서는 `reports/a11y/`, 테스트 산출물은 `test-results/a11y/`에 생성합니다. 수동 검수는 `docs/a11y/kwcag-2.2-checklist.md`의 33개 항목에 기록합니다. 운영 방법과 검사 이력은 `docs/a11y/README.md`, `docs/a11y/baseline.md`에서 확인합니다.

자동 검사는 WCAG 기반 규칙을 활용합니다. 정적 검사 통과나 감사 모드의 성공은 KWCAG 2.2 전체 준수 판정이 아니며, 키보드·스크린리더·자막 품질 등은 수동으로 확인합니다. 상세 기준은 [접근성 가이드](/guide/accessibility)를 참고하세요.

## VS Code 사용

| 파일 | 설정 내용 |
| --- | --- |
| `.vscode/settings.json` | ESLint 저장 시 자동 수정, 프로젝트 TypeScript, 검색·감시 제외 |
| `.vscode/extensions.json` | ESLint·Playwright 추천 확장 |
| `.vscode/tasks.json` | 개발·UI·빌드·타입·접근성 검사 작업 |
| `.vscode/launch.json` | 개발 서버·UI 모드 디버깅 |

권장 확장을 설치한 뒤 JS/TS 파일에서 `TypeScript: Select TypeScript Version` → `Use Workspace Version`을 선택합니다. `Terminal → Run Task`로 명령을 실행하고 F5로 디버깅을 시작합니다.

JS/TS 저장 시 ESLint가 수정 가능한 항목을 처리합니다. JSON·JSONC는 기본 포매터로 정렬합니다. `.next`는 탐색기에 표시하되 검색·파일 감시에서 제외합니다.

## 설정과 실행 스크립트

| 파일 | 역할 |
| --- | --- |
| `next.config.ts` | `NextConfig` 타입을 사용하는 Next.js·Turbopack·Sass 설정 |
| `eslint.config.mjs` | React·접근성 코드 검사 규칙 |
| `postcss.config.mjs` | CSS 후처리 설정 |
| `playwright.config.mjs` | 브라우저·테스트 서버·결과 보고서 설정 |
| `scripts/registry.mjs` | 화면 레지스트리·정적 주소·제목 생성 |
| `scripts/build-styles.mjs` | SCSS → CSS 변환 |
| `scripts/serve.mjs` | 개발용 HTTP·HTTPS 서버 |
| `scripts/ui.mjs` | 스타일 감시와 CSS 모드 개발 서버 |
| `scripts/serve-static.mjs` | `out/` 정적 미리보기 서버 |
| `scripts/lint-a11y.mjs` | 접근성 전용 정적 검사·보고서 생성 |

`.mjs`는 Node.js가 ES Module로 실행하는 파일입니다. Next.js 설정은 타입 검사를 위해 `.ts`를 사용하고, 도구 설정과 실행 스크립트에는 지원되는 `.mjs` 형식을 사용합니다.

## 로컬 HTTPS

인증서가 없으면 HTTP만 실행합니다. HTTPS가 필요하면 프로젝트 루트에서 해당 PC용 인증서를 생성합니다.

```bash
mkcert -install
mkdir -p certificates
mkcert -key-file certificates/localhost-key.pem \
  -cert-file certificates/localhost.pem \
  localhost 127.0.0.1 ::1
```

`certificates/localhost-key.pem`과 `certificates/localhost.pem`이 있으면 개발·UI·정적 미리보기 서버가 HTTPS 8443도 제공합니다. 인증서는 Git에서 제외합니다. 포트는 `PORT`, `HTTPS_PORT`로 변경합니다.

## 빌드·배포·정리

`npm run build`로 생성한 `out/`을 정적 호스팅에 배포합니다. 호스팅 서버는 확장자 없는 경로를 해당 `.html`로 연결하고 없는 경로에는 `404.html`을 반환하도록 설정합니다. 로컬 검증에는 `npm run start`를 사용합니다.

정적 export에 포함될 주소는 빌드 시 확정합니다. 요청 시점 서버 처리나 호스팅의 HTTP 리다이렉트가 필요하면 해당 배포 구성을 별도로 적용합니다.

| 명령 | 정리 대상 |
| --- | --- |
| `npm run clean` | `.next`, `out`, 생성 CSS·캐시 |
| `npm run clean:modules` | `node_modules` |
| `npm run clean:all` | 빌드 산출물·캐시와 `node_modules` |

코드와 컴포넌트 구조는 `src/components/README.md`, 라이브러리 연동 목록은 `src/lib/README.md`에서 확인할 수 있습니다.
