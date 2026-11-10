'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NextLink from 'next/link'

/** 정적 export에는 HTTP 리다이렉트 서버가 없으므로 브라우저에서 이동한다. */
export default function RouteRedirect ({ href }) {
  const router = useRouter()
  useEffect(() => { router.replace(href) }, [href, router])
  return <NextLink href={href}>이동하기</NextLink>
}
