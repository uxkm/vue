import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageLoading } from '@/components'
import IndexSkeleton from './skeleton/indexSkeleton'

export default function PcHomePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 페이지 진입 로딩 예시 (실제 API 연동 시 교체)
    const timer = window.setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="home">
      <PageLoading loading={loading} skeleton={<IndexSkeleton />}>
        <div className="page">
          <p>PC 메뉴</p>
          <h1>1. Home</h1>
          <p>
            참고 사이트 UI·인터랙션을 반영한 Home 퍼블리시 목록입니다.
          </p>
          <ul>
            <li>
              <Link to="/pc/home/01">Home 01 · Multicampus</Link>
            </li>
            <li>
              <Link to="/pc/home/02">Home 02 · HD한국조선해양</Link>
            </li>
            <li>
              <Link to="/pc/home/03">Home 03 · 토스플레이스</Link>
            </li>
            <li>
              <Link to="/pc/home/04">Home 04 · 삼성SDS</Link>
            </li>
            <li>
              <Link to="/pc/home/05">Home 05 · 당근 about</Link>
            </li>
          </ul>
        </div>
      </PageLoading>
    </div>
  )
}
