import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '@/styles/pages/_wbs-index.scss'

function pad(n) {
  const s = String(n)
  return s.length < 2 ? '0' + s : s
}

export default function FilterScrollTestPage() {
  const [chipCount, setChipCount] = useState(40)
  const [metrics, setMetrics] = useState({
    scrollWidth: 0,
    clientWidth: 0,
    canScrollX: false
  })
  const subsRef = useRef(null)

  const measure = useCallback(() => {
    const el = subsRef.current
    if (!el) return
    const scrollWidth = el.scrollWidth
    const clientWidth = el.clientWidth
    setMetrics({
      scrollWidth,
      clientWidth,
      canScrollX: scrollWidth > clientWidth + 1
    })
  }, [])

  // 칩 개수 변경(DOM 반영 후) 및 최초 마운트 시 측정
  useEffect(() => {
    measure()
  }, [chipCount, measure])

  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  return (
    <div className="wbs filter-scroll-test">
      <header className="filter-scroll-test__head">
        <Link className="filter-scroll-test__back" to="/">← Publish List</Link>
        <h1 className="filter-scroll-test__title">필터 하위목록 가로 스크롤 테스트</h1>
        <p className="filter-scroll-test__desc">
          하위 칩이 많을 때 <code>.wbs-filter-subs</code> 에 가로 스크롤이 생기는지 확인합니다.
        </p>
      </header>

      <div className="wbs-filter-bar">
        <button
          type="button"
          className="wbs-filter-btn is-active"
          aria-label="필터, 로그인"
        >
          <span className="wbs-filter-btn__label">로그인</span>
          <span className="wbs-filter-btn__icon" aria-hidden="true">▾</span>
        </button>
        <div className="wbs-filter-selected">
          <span className="wbs-filter-selected__sep" aria-hidden="true"></span>
          <ul
            ref={subsRef}
            className="wbs-filter-subs"
            aria-label="선택한 화면명 하위 목록"
          >
            {Array.from({ length: chipCount }, (_, i) => i + 1).map((n) => (
              <li key={'chip-' + n}>
                <span className="wbs-filter-sub is-static">로그인 화면 {pad(n)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <dl className="filter-scroll-test__meta">
        <div>
          <dt>칩 개수</dt>
          <dd>{chipCount}</dd>
        </div>
        <div>
          <dt>scrollWidth</dt>
          <dd>{metrics.scrollWidth}</dd>
        </div>
        <div>
          <dt>clientWidth</dt>
          <dd>{metrics.clientWidth}</dd>
        </div>
        <div>
          <dt>가로 스크롤</dt>
          <dd className={metrics.canScrollX ? 'is-ok' : 'is-fail'}>
            {metrics.canScrollX ? '있음 (OK)' : '없음 (FAIL)'}
          </dd>
        </div>
      </dl>

      <div className="filter-scroll-test__actions">
        <button type="button" className="wbs-btn" onClick={() => setChipCount(5)}>칩 5개</button>
        <button type="button" className="wbs-btn" onClick={() => setChipCount(20)}>칩 20개</button>
        <button type="button" className="wbs-btn" onClick={() => setChipCount(40)}>칩 40개</button>
        <button type="button" className="wbs-btn" onClick={measure}>다시 측정</button>
      </div>
    </div>
  )
}
