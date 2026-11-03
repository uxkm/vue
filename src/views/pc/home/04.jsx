'use client'

import { useEffect, useRef, useState } from 'react'
import { Header, Footer, PageLoading } from '@/components'
import { useHomeScrollFx } from '@/hooks/useHomeScrollFx'
import { cx } from '@/utils/cx'
import Skeleton01 from './skeleton/01Skeleton'
import '@/styles/pages/_pc-home-04.scss'

const nav = [
  { id: 'solutions', label: '솔루션' },
  { id: 'insights', label: '인사이트' },
  { id: 'careers', label: '채용' }
]

const bento = [
  {
    id: 'b1',
    label: 'Insight',
    title: '내일의 기술을 내 일의 기술로',
    tone: 'dark',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'b2',
    label: 'Cloud',
    title: '엔터프라이즈 클라우드 전환',
    tone: 'mint',
    image: ''
  },
  {
    id: 'b3',
    label: 'AI',
    title: '업무에 바로 붙는 AI Factory',
    tone: 'cream',
    image: ''
  },
  {
    id: 'b4',
    label: 'News',
    title: '글로벌 물류 디지털 트윈 사례',
    tone: 'sky',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b5',
    label: 'Contact',
    title: '무엇이든 물어보세요',
    tone: 'blue',
    image: ''
  }
]

const stats = [
  { id: 'st1', label: '글로벌 사업 지역', target: 50, suffix: '+', display: 0 },
  { id: 'st2', label: '디지털 전환 프로젝트', target: 1200, suffix: '+', display: 0 },
  { id: 'st3', label: '평균 경력 연수', target: 12, suffix: '년', display: 0 }
]

const solutionTabs = ['전체', '클라우드', 'AI', '물류', '보안']

const solutions = [
  { id: 's1', tab: '클라우드', name: 'Enterprise Cloud', text: '하이브리드 클라우드 전환과 운영 최적화를 지원합니다.' },
  { id: 's2', tab: 'AI', name: 'AI Factory', text: '업무에 바로 붙는 AI 서비스와 MLOps 기반을 제공합니다.' },
  { id: 's3', tab: '물류', name: 'Digital Logistics', text: '글로벌 물류 가시성과 자동화로 공급망을 고도화합니다.' },
  { id: 's4', tab: '보안', name: 'Cyber Security', text: '위협 탐지부터 대응까지 통합 보안 체계를 구축합니다.' },
  { id: 's5', tab: '클라우드', name: 'Data Platform', text: '분산된 데이터를 연결해 의사결정 속도를 높입니다.' },
  { id: 's6', tab: 'AI', name: 'Intelligent Ops', text: '운영 데이터를 학습해 장애 예측과 자동 대응을 돕습니다.' }
]

const insights = [
  {
    id: 'i1',
    label: 'Report',
    title: '2026 엔터프라이즈 AI 도입 가이드',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'i2',
    label: 'News',
    title: '글로벌 물류 디지털 트윈 구축 사례',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'i3',
    label: 'Insight',
    title: '클라우드 비용 최적화 체크리스트',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
  }
]

const go = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - 70, behavior: 'smooth' })
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function PcHomeScreen04() {
  const [loading, setLoading] = useState(true)
  const [solutionIndex, setSolutionIndex] = useState(0)
  const [activeNav, setActiveNav] = useState('solutions')
  const [statDisplay, setStatDisplay] = useState(() => stats.map(() => 0))
  // 솔루션 탭 변경 시 data-fx 요소 재바인딩용 (훅 loading 옵션을 한 틱 토글)
  const [fxRefresh, setFxRefresh] = useState(false)
  const statsAnimatedRef = useRef(false)
  const rafIdsRef = useRef([])

  const { rootRef } = useHomeScrollFx({ loading: loading || fxRefresh })

  const tab = solutionTabs[solutionIndex]
  const filteredSolutions = tab === '전체'
    ? solutions
    : solutions.filter((item) => item.tab === tab)

  // 페이지 진입 로딩
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(timer)
  }, [])

  // 탭 변경 후 스크롤 FX 재설정
  useEffect(() => {
    if (fxRefresh) setFxRefresh(false)
  }, [fxRefresh])

  const selectSolution = (index) => {
    if (index === solutionIndex) return
    setSolutionIndex(index)
    setFxRefresh(true)
  }

  // 스크롤 스파이 + 통계 카운트 업
  useEffect(() => {
    if (loading) return undefined

    const animateStats = () => {
      if (statsAnimatedRef.current) return
      statsAnimatedRef.current = true
      stats.forEach((stat, index) => {
        let start = null
        const duration = 1200
        const step = (ts) => {
          if (!start) start = ts
          const p = Math.min(1, (ts - start) / duration)
          const eased = 1 - Math.pow(1 - p, 3)
          setStatDisplay((prev) => {
            const next = prev.slice()
            next[index] = Math.round(stat.target * eased)
            return next
          })
          if (p < 1) rafIdsRef.current[index] = window.requestAnimationFrame(step)
        }
        rafIdsRef.current[index] = window.requestAnimationFrame(step)
      })
    }

    const onScroll = () => {
      const ids = ['solutions', 'insights', 'careers']
      let current = ids[0]
      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i])
        if (!el) continue
        if (el.getBoundingClientRect().top - 100 <= 0) current = ids[i]
      }
      setActiveNav(current)
      const statsEl = document.getElementById('stats')
      if (statsEl && statsEl.getBoundingClientRect().top < window.innerHeight * 0.85) {
        animateStats()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [loading])

  // 언마운트 시 진행 중인 카운트 애니메이션 정리
  useEffect(() => () => {
    rafIdsRef.current.forEach((id) => {
      if (id) window.cancelAnimationFrame(id)
    })
  }, [])

  return (
    <div className="home" ref={rootRef}>
      <Header hidden />
      <Footer hidden />

      <PageLoading loading={loading} skeleton={<Skeleton01 />}>
        <div className="sds-home">
          <header className="sds-header">
            <a
              className="sds-header__brand"
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTop() }}
            >Samsung SDS</a>
            <nav className="sds-header__nav" aria-label="주요 메뉴">
              {nav.map((item) => (
                <a
                  key={item.id}
                  className={cx('sds-header__link', activeNav === item.id && 'is-active')}
                  href={'#' + item.id}
                  onClick={(e) => { e.preventDefault(); go(item.id) }}
                >{item.label}</a>
              ))}
            </nav>
            <button type="button" className="sds-header__search" aria-label="검색">⌕</button>
          </header>

          <section id="hero" className="sds-kv">
            <div className="sds-kv__intro">
              <p className="sds-kv__tag" data-fx="up">DIGITAL TRANSFORMATION</p>
              <h1 className="sds-kv__title" data-fx="up" data-fx-delay="70">
                <span className="sds-kv__grad">내일</span>의 기술을<br />
                <span className="sds-kv__grad">내 일</span>의 기술로
              </h1>
              <p className="sds-kv__desc" data-fx="up" data-fx-delay="120">클라우드·AI·물류·보안으로 기업의 디지털 전환을 끝까지 동행합니다.</p>
            </div>
            <div className="sds-bento">
              {bento.map((card, index) => (
                <a
                  key={card.id}
                  className={cx('sds-bento__card', 'is-' + card.tone + (index === 0 ? ' is-wide' : ''))}
                  href="#insights"
                  data-fx="up"
                  data-fx-delay={String(index * 70)}
                >
                  {card.image && (
                    <div className="sds-bento__media" style={{ backgroundImage: 'url(' + card.image + ')' }}></div>
                  )}
                  <div className="sds-bento__body">
                    <span className="sds-bento__label">{card.label}</span>
                    <strong className="sds-bento__name">{card.title}</strong>
                    <span className="sds-bento__more">자세히 보기 ›</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="stats" className="sds-stats">
            <div className="sds-stats__inner">
              <p className="sds-section__eyebrow" data-fx="up">AT A GLANCE</p>
              <h2 className="sds-section__title" style={{ marginBottom: '28px' }} data-fx="up" data-fx-delay="50">한눈에 보기</h2>
              <div className="sds-stats__grid">
                {stats.map((item, stIdx) => (
                  <div
                    key={item.id}
                    className="sds-stats__item"
                    data-fx="up"
                    data-fx-delay={String(stIdx * 80)}
                  >
                    <strong className="sds-stats__value">{statDisplay[stIdx]}{item.suffix}</strong>
                    <span className="sds-stats__label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="solutions" className="sds-section">
            <div className="sds-section__head" data-fx="up">
              <div>
                <p className="sds-section__eyebrow">SOLUTIONS</p>
                <h2 className="sds-section__title">비즈니스 혁신을 가속하는<br />디지털 솔루션</h2>
              </div>
              <div className="sds-tabs" role="tablist">
                {solutionTabs.map((t, index) => (
                  <button
                    key={t}
                    type="button"
                    className={cx('sds-tabs__btn', solutionIndex === index && 'is-active')}
                    onClick={() => selectSolution(index)}
                  >{t}</button>
                ))}
              </div>
            </div>
            <div className="sds-solutions">
              {filteredSolutions.map((item, solIdx) => (
                <article
                  key={item.id}
                  className="sds-solutions__card"
                  data-fx="up"
                  data-fx-delay={String(solIdx * 70)}
                >
                  <h3 className="sds-solutions__name">{item.name}</h3>
                  <p className="sds-solutions__text">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="insights" className="sds-insight">
            <div className="sds-insight__inner">
              <p className="sds-section__eyebrow">INSIGHTS</p>
              <h2 className="sds-section__title" style={{ marginBottom: '28px' }}>인사이트 &amp; 뉴스</h2>
              <div className="sds-insight__grid">
                {insights.map((item, index) => (
                  <a
                    key={item.id}
                    className={cx('sds-insight__card', index === 0 && 'sds-insight__card--wide')}
                    href="#insights"
                    data-fx="up"
                    data-fx-delay={String(index * 80)}
                  >
                    <div
                      className="sds-insight__media"
                      style={{ backgroundImage: 'url(' + item.image + ')' }}
                    ></div>
                    <div className="sds-insight__body">
                      <div className="sds-insight__label">{item.label}</div>
                      <h3 className="sds-insight__title">{item.title}</h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section id="careers" className="sds-banner" data-fx="up">
            <div>
              <h2 className="sds-banner__title">함께 성장할 인재를 찾습니다</h2>
              <p className="sds-banner__desc">클라우드·AI·물류 디지털 전환을 이끌 동료를 기다립니다.</p>
            </div>
            <a className="sds-banner__btn" href="#careers">채용 바로가기</a>
          </section>

          <p className="sds-foot">UI 레퍼런스: samsungsds.com · Home 04 (#/pc/home/04)</p>
        </div>
      </PageLoading>
    </div>
  )
}
