/**
 * 퍼블 가이드·데모 전용 위젯.
 * 화면은 `@/screens/pub/widgets/guide` 로 import.
 */
export { GuideLayout } from './GuideLayout.jsx' // 가이드·데모 공통 레이아웃 (헤더·좌측 메뉴·본문)
export { GuideMenu } from './GuideMenu.jsx' // 좌측 네비 (소개 / 접근성 / 컴포넌트 / 데모)
export { GuideApiDocs } from './GuideApiDocs.jsx' // Props·클래스·토큰 API 문서 표
export { DemoBlock } from './DemoBlock.jsx' // 미리보기 + 코드보기 데모 블록
export {
  pageExampleCode,
  pageExampleReturn,
  wrapPageExample,
  ensurePageModule
} from './pageExampleCode.js' // 페이지형 코드보기 문자열
export { MarkdownDoc } from './MarkdownDoc.jsx' // README 등 마크다운 렌더 (소개)
export { GUIDE_SECTION, useGuideTitle, useSiteTitle } from '@/screens/pub/shared/guideTitle' // 탭 섹션·가이드 타이틀
