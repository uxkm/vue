import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header, Footer, PageLoading } from '@/components'

export default function PcLoginPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 페이지 진입 로딩 예시 (실제 API 연동 시 교체)
    const timer = window.setTimeout(() => {
      setLoading(false)
    }, 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="login">
      <Header hidden />
      <Footer hidden />

      <PageLoading loading={loading} skeleton="card">
        <div className="page">
          <p>PC 메뉴</p>
          <h1>0. 로그인</h1>
          <p>
            로그인 메뉴 메인입니다. 하위 화면을 선택하세요.
          </p>
          <ul>
            <li>
              <Link to="/pc/login/01">로그인 01</Link>
            </li>
          </ul>
        </div>
      </PageLoading>
    </div>
  )
}
