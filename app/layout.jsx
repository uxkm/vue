import AppProviders from '@/comp/providers/AppProviders'
import '@/styles/index.scss'

const SITE_TITLE = '멀티캠퍼스 기업교육'
const SITE_DESCRIPTION =
  '삼성계열 기업교육 전문기업, 기업과 개인의 성장을 이끄는 AX 교육부터 리더십, 러닝플랫폼, 외국어, 법정의무교육까지'

/** 사이트 탭 제목과 설명, 아이콘, OG — 기본은 사이트명만. 화면별 제목은 각 라우트 metadata에서 설정 */
export const metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s | ' + SITE_TITLE
  },
  description: SITE_DESCRIPTION,
  icons: {
    shortcut: 'https://www.multicampus.com/img/favicon.ico'
  },
  verification: {
    other: {
      'naver-site-verification': 'f7afb1617008eb79cab63389821b5f0de18a8941'
    }
  },
  openGraph: {
    type: 'website',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://www.multicampus.com/',
    images: ['https://ui.multicampus.com/b2b/kr/common/images/img_sns.jpg']
  }
}

/** 모바일 뷰포트 — 사용자 확대를 허용한다. */
export const viewport = {
  width: 'device-width',
  initialScale: 1
}

/** 모든 화면의 공통 문서. 글꼴과 AppProviders 를 감싼다 */
export default function RootLayout ({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* public 정적 폰트 — App Router metadata로는 외부 stylesheet 링크 불가 */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/fonts/pretendard/pretendard.css" />
      </head>
      <body suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
