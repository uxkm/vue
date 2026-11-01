import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header, Footer, PageLoading } from '@/components'
import Skeleton01 from './skeleton/01Skeleton'

export default function PcLoginScreen01() {
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
      <Footer hidden />

      <Header
        brand={<Link className="app-header__brand" to="/pc/login">로그인</Link>}
        nav={(
          <>
            <Link className="app-header__link" to="/pc/login">메뉴 메인</Link>
            <Link className="app-header__link" to="/pc/login/01">로그인 01</Link>
          </>
        )}
        actions={<Link className="app-header__link" to="/">목록으로</Link>}
      />

      <PageLoading loading={loading} skeleton={<Skeleton01 />}>
        <div className="page">
          <p>0. 로그인</p>
          <h1>로그인 01</h1>
          <dl>
            <div>
              <dt>Screen Type</dt>
              <dd>Page</dd>
            </div>
            <div>
              <dt>Screen ID</dt>
              <dd>PC-LOGIN-001</dd>
            </div>
            <div>
              <dt>PageUrl</dt>
              <dd>#/pc/login/01</dd>
            </div>
          </dl>
          <p>
            로그인 메뉴 퍼블리시 화면입니다. 시안·마크업을 이 페이지에 연결해 작업하세요.
          </p>
        </div>
      </PageLoading>
    </div>
  )
}
