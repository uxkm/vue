'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/lib/router'
import { PageLoading } from '@/components'
import IndexSkeleton from './skeleton/indexSkeleton.jsx'

export default function MobileContentPage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 페이지 진입 로딩 예시 (실제 API 연동 시 교체)
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="content">
      <PageLoading loading={loading} skeleton={<IndexSkeleton />}>
        <div className="page">
          <p>MOBILE 메뉴</p>
          <h1>3. Content</h1>
          <p>
            Content 메뉴 메인입니다. 하위 화면을 선택하세요.
          </p>
          <ul>
            <li>
              <Link to="/mobile/content/01">Content 01</Link>
            </li>
          </ul>
        </div>
      </PageLoading>
    </div>
  )
}
