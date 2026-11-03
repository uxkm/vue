import AppProviders from '@/components/providers/AppProviders'
import '@/styles/main.scss'

export const metadata = {
  title: 'Publish List',
  description: 'PC / MOBILE 화면 퍼블리시 목록'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="/static/fonts/pretendard/pretendard.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
