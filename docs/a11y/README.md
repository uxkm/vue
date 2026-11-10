# 접근성 검사 운영

KWCAG 2.2 수동 점검에 JSX 정적 검사와 WCAG 기반 axe 자동 검사를 함께 사용합니다. 도구 결과는 인증·전체 준수 판정이 아닙니다.

## 실행

```sh
# React·접근성 규칙 검사 (경고도 허용하지 않음)
npm run lint

# 접근성 진단만 엄격하게 검사: 경고도 한 건 이상이면 종료 코드 1
npm run lint:a11y

# 정적 빌드 → 로컬 서버 → axe 검사. 위반이 있으면 실패
npm run test:a11y

# 현황 수집 모드. 위반은 보고하고 서버·테스트 오류는 실패
npm run a11y:audit

# HTML 결과 보기
npm run a11y:report
```

처음 실행할 때 `npx playwright install chromium`이 필요합니다. Linux CI에서는 `npx playwright install --with-deps chromium`으로 브라우저와 시스템 의존성을 설치합니다.

보고서는 `reports/a11y/`에 저장하며 Git에서 제외합니다. `summary.md`는 화면·상태별 위반 규칙·노드·수동 검토 수, `summary.json`은 상세 axe 결과, `lint.json`은 정적 진단을 포함합니다. HTML 보고서에도 테스트별 JSON 첨부가 있습니다. **감사 모드의 종료 코드 0은 위반 0건을 뜻하지 않습니다.** `incomplete`는 수동 검토 대상입니다.

## 범위

- 데스크톱 Chromium과 모바일 크기 Chromium에서 대표 9개 경로와 모달 상태를 검사합니다(20개 axe 검사). 아코디언·접기·서랍·날짜 선택기·업로드·캐러셀의 키보드·상태 전환 회귀 검사도 12개 실행합니다. 실제 iOS Safari·Android 기기 검사를 대체하지 않습니다.
- axe 필터는 `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`입니다. WCAG 2.2 AA까지 자동화 가능한 일부 규칙이며 KWCAG 전용 규칙 세트가 아닙니다.
- 화면 전체를 검사하며 노드 제외나 규칙 비활성화로 위반을 숨기지 않습니다.
- 기본 서버는 `127.0.0.1:18100`입니다. 충돌 시 `A11Y_PORT=18200 npm run test:a11y`처럼 변경합니다.
- 경로 추가는 `tests/a11y/pages.spec.mjs`의 `defaultPaths`에서 합니다. 임시 지정은 `A11Y_PATHS=/b2b,/guide/modal npm run test:a11y`이며 모달 상태 검사는 항상 실행합니다.
- 검증 서버 지정은 `A11Y_BASE_URL=http://127.0.0.1:8090 npx playwright test`입니다. 빌드와 로컬 서버 생성을 생략합니다. 운영 데이터를 변경하는 경로는 지정하지 않습니다.

## 수동 검수

[KWCAG 2.2 체크리스트](./kwcag-2.2-checklist.md)를 화면별로 복사해 33개 항목을 기록합니다. 대체 텍스트 품질, 자막 정확성, 키보드·초점 흐름, 도움 정보·인증 절차 등은 직접 검수합니다. axe 결과를 KWCAG 전체 준수로 바꾸어 판정하지 않습니다.

jsx-a11y 권장 규칙을 오류로 적용하고, 원본에서 비활성인 규칙과 옵션은 유지합니다. 라우팅용 NavLink·NextLink를 앵커로 인식합니다. 디자인 시스템 Link는 `as`, `label`, `ariaLabel`을 지원하므로 이름만으로 일반 앵커에 매핑하지 않습니다. React 규칙을 경고로 낮추는 예외는 제거했습니다. 일반·접근성 린트가 통과해도 실제 브라우저 검사는 실패할 수 있습니다.

## 근거

- [KWCAG 2.2 원문 제공](https://www.wa.or.kr/board/view.asp?BoardID=0004&sn=22592)
- [Playwright 접근성 검사](https://playwright.dev/docs/a11y-testing)
- [axe-core 규칙과 한계](https://github.com/dequelabs/axe-core)
- [JSX 접근성 규칙](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

접근성 린트의 `minimatch`는 각 도구의 API에 맞는 버전을 사용합니다. TypeScript 분석기만 패치된 11.x로 제한하고, 함수형 API를 사용하는 JSX·React 린트는 3.x의 패치 버전을 유지합니다. 전역 메이저 버전 강제는 사용하지 않습니다.

HLS 데모는 WebVTT 자막이 포함된 Shaka 공식 HLS 샘플을 사용합니다. JSX 분석으로는 매니페스트 트랙을 알 수 없어 해당 video 태그의 `media-has-caption` 규칙만 근거를 명시해 예외 처리합니다. 샘플을 교체할 때는 실제 자막 트랙·언어·표시 상태를 다시 확인합니다.
