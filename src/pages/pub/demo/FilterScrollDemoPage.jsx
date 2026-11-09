'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from '@/lib/router'
import { useGuideTitle } from '@/pages/pub/shared/guideTitle'
import '@/styles/pub.scss'

/**
 * 필터 스크롤 데모의 공통 크롬. 로딩 중과 본문이 같은 값을 쓴다.
 *
 * true  : 공통 영역 표시
 * false : 공통 영역 숨김
 * 생략  : 표시. 공통 기본값이라 키가 없어도 된다.
 *
 * header 만 적는다. (이 화면에서 필수)
 * footer 를 생략하면 공통 푸터는 그대로 보인다.
 * 값을 바꾼 뒤에는 node scripts/registry.mjs 를 다시 실행한다.
 */
export const meta = {
  /** 상단 공통 헤더. 아래 데모 제목 줄을 쓰므로 숨김 */
  header: false
}

/** 번호를 두 자리로. 1 → 01 */
function pad(n) {
  const s = String(n)
  return s.length < 2 ? '0' + s : s
}

/**
 * 필터 가로 스크롤 데모.
 * 하위 칩이 많을 때 가로 스크롤이 생기는지 확인한다.
 */
export default function FilterScrollDemoPage() {
  useGuideTitle('Filter Scroll')
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
    <div className="wbs filter-scroll-demo">
      {/* 이 화면 전용 제목. meta.header 를 false 로 둔 이유. 공통 푸터는 생략해서 그대로 표시 */}
      <header className="filter-scroll-demo__head">
        <Link className="filter-scroll-demo__back" to="/pub">← Publish List</Link>
        <h1 className="filter-scroll-demo__title">필터 하위목록 가로 스크롤 데모</h1>
        <p className="filter-scroll-demo__desc">
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

      <dl className="filter-scroll-demo__meta">
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

      <div className="filter-scroll-demo__actions">
        <button type="button" className="wbs-btn" onClick={() => setChipCount(5)}>칩 5개</button>
        <button type="button" className="wbs-btn" onClick={() => setChipCount(20)}>칩 20개</button>
        <button type="button" className="wbs-btn" onClick={() => setChipCount(40)}>칩 40개</button>
        <button type="button" className="wbs-btn" onClick={measure}>다시 측정</button>
      </div>
    </div>
  )
}
