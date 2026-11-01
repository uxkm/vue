import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageLoading } from '@/components'
import IndexSkeleton from './skeleton/indexSkeleton.jsx'

export default function MobileHomePage () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 페이지 진입 로딩 예시 (실제 API 연동 시 교체)
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="home">
      <PageLoading loading={loading} skeleton={<IndexSkeleton />}>
        <div className="page">
          <p>MOBILE 메뉴</p>
          <h1>1. Home</h1>
          <p>
            Home 메뉴 메인입니다. 하위 화면을 선택하세요.
          </p>
          <ul>
            <li>
              <Link to="/mobile/home/01">Home 01</Link>
            </li>
          </ul>
        </div>
      </PageLoading>
    </div>
  )
}
