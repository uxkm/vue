import { useEffect, useState } from 'react'
import { PageLoading } from '@/components'
import Skeleton01 from './skeleton/01Skeleton'

export default function PcPersonalHomeScreen01() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 페이지 진입 로딩 예시 (실제 API 연동 시 교체)
    const timer = window.setTimeout(() => {
      setLoading(false)
    }, 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="personal-home">
      <PageLoading loading={loading} skeleton={<Skeleton01 />}>
        <div className="page">
          <p>27. 개인화홈</p>
          <h1>개인화홈 01</h1>
          <dl>
            <div>
              <dt>Screen Type</dt>
              <dd>Page</dd>
            </div>
            <div>
              <dt>Screen ID</dt>
              <dd>PC-PERSON-001</dd>
            </div>
            <div>
              <dt>PageUrl</dt>
              <dd>#/pc/personal-home/01</dd>
            </div>
          </dl>
          <p>
            개인화홈 메뉴 퍼블리시 화면입니다. 시안·마크업을 이 페이지에 연결해 작업하세요.
          </p>
        </div>
      </PageLoading>
    </div>
  )
}
