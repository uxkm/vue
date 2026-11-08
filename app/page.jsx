'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * 사이트 루트. B2B 로 진입한다.
 * / → /b2b
 */
export default function HomePage () {
  const router = useRouter()

  useEffect(() => {
    router.replace('/b2b')
  }, [router])

  return null
}
