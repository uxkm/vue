'use client'

import { useEffect, useRef, useState } from 'react'
import { Header, Footer, PageLoading } from '@/components'
import { useHomeScrollFx } from '@/hooks/useHomeScrollFx'
import { cx } from '@/utils/cx'
import Skeleton01 from './skeleton/01Skeleton'
import '@/styles/pages/_pc-home-03.scss'

const TARGET_COUNT = 440000
const INDUSTRY_INTERVAL_MS = 2800

const storySteps = [
  {
    id: 'ss1',
    title: '주문이 빨라지면 줄이 줄어요',
    desc: '테이블·키오스크·모바일 주문을 하나의 흐름으로 연결합니다.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ss2',
    title: '재고와 매출이 한눈에',
    desc: '마감 시간을 줄이고, 잘 되는 메뉴를 바로 파악합니다.',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ss3',
    title: '업장에 맞는 조합으로',
    desc: '식당·카페·리테일 환경에 맞춘 추천 구성을 제공합니다.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  }
]

const industries = [
  { label: '매장', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80' },
  { label: '식당', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80' },
  { label: '카페', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80' },
  { label: '리테일', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80' }
]

const nav = ['제품 소개', '업종별 기능', '추천 조합', '사장님 스토리', '혜택', '고객 지원']

const mosaic = [
  { id: 'm1', src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80', style: { top: '12%', left: '6%', width: '180px', height: '120px', transform: 'rotate(-6deg)' } },
  { id: 'm2', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', style: { top: '10%', right: '8%', width: '200px', height: '130px', transform: 'rotate(5deg)' } },
  { id: 'm3', src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', style: { top: '42%', left: '4%', width: '140px', height: '190px', transform: 'rotate(3deg)' } },
  { id: 'm4', src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=600&q=80', style: { top: '40%', right: '5%', width: '150px', height: '200px', transform: 'rotate(-4deg)' } },
  { id: 'm5', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80', style: { bottom: '12%', left: '18%', width: '190px', height: '120px', transform: 'rotate(-2deg)' } },
  { id: 'm6', src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80', style: { bottom: '10%', right: '16%', width: '210px', height: '130px', transform: 'rotate(4deg)' } }
]

const features = [
  { id: 'f1', icon: 'P', name: '포스·결제', text: '테이블·키오스크·모바일 결제를 하나의 흐름으로 연결합니다.' },
  { id: 'f2', icon: 'K', name: '키오스크', text: '주문·결제를 줄이고 회전율을 높이는 셀프 주문 흐름입니다.' },
  { id: 'f3', icon: 'S', name: '재고·매출', text: '실시간 매출과 재고를 한눈에 보고 운영 결정을 빠르게 합니다.' },
  { id: 'f4', icon: 'A', name: '업종 맞춤', text: '식당·카페·리테일 등 업종별 추천 조합을 제공합니다.' }
]

const stories = [
  {
    id: 'st1',
    who: '성수 · 카페 사장님',
    quote: '결제가 빨라지니 줄이 줄고, 직원 교육 시간도 확 줄었어요.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'st2',
    who: '망원 · 식당 사장님',
    quote: '매출 리포트를 매일 보면서 메뉴 구성을 바꾸니 회전율이 올랐어요.',
    image: 'https://images.unsplash.com/photo-1414235077428-3388164de043?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'st3',
    who: '합정 · 리테일 사장님',
    quote: '재고와 결제가 연동되니 마감이 한결 가벼워졌습니다.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80'
  }
]

const go = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - 16, behavior: 'smooth' })
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function PcHomeScreen03() {
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [displayCount, setDisplayCount] = useState(0)
  const [industryIndex, setIndustryIndex] = useState(0)
  const [storyIndex, setStoryIndex] = useState(0)
  const scrollTrackRef = useRef(null)

  const { rootRef, stickyProgress } = useHomeScrollFx({ loading, scrollTrackRef })

  // sticky 진행도 → 장면 단계
  const stickyStep = Math.min(
    storySteps.length - 1,
    Math.floor(stickyProgress * storySteps.length)
  )

  // 페이지 진입 로딩
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(timer)
  }, [])

  // 카운트 업 애니메이션
  useEffect(() => {
    if (loading) return undefined
    let rafId = null
    let start = null
    const duration = 1600
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min(1, (ts - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplayCount(Math.round(TARGET_COUNT * eased))
      if (p < 1) rafId = window.requestAnimationFrame(step)
    }
    rafId = window.requestAnimationFrame(step)
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [loading])

  // 업종 자동 전환 (인덱스 변경 시 타이머 재시작)
  useEffect(() => {
    if (loading) return undefined
    const timer = window.setTimeout(() => {
      setIndustryIndex((prev) => (prev + 1) % industries.length)
    }, INDUSTRY_INTERVAL_MS)
    return () => window.clearTimeout(timer)
  }, [loading, industryIndex])

  // 스크롤 상태
  useEffect(() => {
    if (loading) return undefined
    const onScroll = () => setScrolled(window.pageYOffset > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [loading])

  const industry = industries[industryIndex]
  const storyStep = storySteps[stickyStep]
  const story = stories[storyIndex]

  return (
    <div className="home" ref={rootRef}>
      <Header hidden />
      <Footer hidden />

      <PageLoading loading={loading} skeleton={<Skeleton01 />}>
        <div className={cx('toss-home', scrolled && 'is-scrolled')}>
          <header className={cx('toss-header', scrolled && 'is-scrolled')}>
            <a
              className="toss-header__brand"
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTop() }}
            >
              toss place
              <span className="toss-header__sub">대리점 홈페이지</span>
            </a>
            <nav className="toss-header__nav" aria-label="주요 메뉴">
              {nav.map((item) => (
                <a key={item} className="toss-header__link" href="#features">{item}</a>
              ))}
            </nav>
            <div className="toss-header__actions">
              <a className="toss-header__link" href="#cta">상담 받기</a>
              <a className="toss-header__link" href="#cta">포스 무료 다운로드</a>
            </div>
          </header>

          <section id="hero" className="toss-hero">
            <div className="fx-parallax-clip" style={{ position: 'absolute', inset: 0 }}>
              <div
                className="toss-hero__photo"
                data-parallax="0.3"
                style={{ backgroundImage: 'url(' + industry.image + ')' }}
              ></div>
            </div>
            <div className="toss-hero__mosaic" aria-hidden="true">
              {mosaic.map((shot) => (
                <div key={shot.id} className="toss-hero__shot" style={shot.style}>
                  <img src={shot.src} alt="" />
                </div>
              ))}
            </div>
            <div className="toss-hero__stage">
              <p className="toss-hero__count" data-fx="up">{displayCount.toLocaleString()} 매장의 선택</p>
              <h1 className="toss-hero__title" data-fx="up" data-fx-delay="80">잘 되는 {industry.label}의 기준</h1>
              <div className="toss-chips" role="tablist" aria-label="업종 선택">
                {industries.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    className={cx('toss-chips__btn', industryIndex === index && 'is-active')}
                    onClick={() => setIndustryIndex(index)}
                  >{item.label}</button>
                ))}
              </div>
              <div className="toss-hero__actions">
                <a className="toss-hero__btn toss-hero__btn--primary" href="#cta">상담 받기</a>
                <a className="toss-hero__btn toss-hero__btn--ghost" href="#cta">포스 다운로드</a>
              </div>
            </div>
            <button type="button" className="toss-hero__scroll" onClick={() => go('features')}>
              끝까지 스크롤 해주세요
              <span aria-hidden="true">↓</span>
            </button>
          </section>

          {/* sticky + 내부 장면 전환 (CSS sticky + 스크롤 진행) */}
          <div ref={scrollTrackRef} className="fx-sticky-track toss-story-track">
            <div className="fx-sticky-pin toss-story-pin">
              <div className="toss-story-pin__inner">
                <p className="toss-section__eyebrow" style={{ color: '#6bb1ff' }}>스크롤 스토리</p>
                <h2 className="toss-story-pin__title">{storyStep.title}</h2>
                <p className="toss-story-pin__desc">{storyStep.desc}</p>
                <div className="toss-story-pin__dots">
                  {storySteps.map((step, idx) => (
                    <span
                      key={step.id}
                      className={stickyStep === idx ? 'is-active' : undefined}
                    ></span>
                  ))}
                </div>
              </div>
              <div
                className="toss-story-pin__visual"
                style={{ backgroundImage: 'url(' + storyStep.image + ')' }}
              ></div>
            </div>
          </div>

          <section id="features" className="toss-section">
            <p className="toss-section__eyebrow" data-fx="up">자주 쓰는 기능이에요</p>
            <h2 className="toss-section__title" data-fx="up" data-fx-delay="60">매장 운영이 쉬워지는<br />결제·포스 솔루션</h2>
            <p className="toss-section__desc" data-fx="up" data-fx-delay="100">업종별 기능과 추천 조합으로 사장님의 하루를 단순하게 만듭니다.</p>
            <div className="toss-features">
              {features.map((item, fIdx) => (
                <article
                  key={item.id}
                  className="toss-features__card"
                  data-fx="up"
                  data-fx-delay={String(fIdx * 80)}
                >
                  <div className="toss-features__icon">{item.icon}</div>
                  <h3 className="toss-features__name">{item.name}</h3>
                  <p className="toss-features__text">{item.text}</p>
                  <a className="toss-features__more" href="#features">자세히 ›</a>
                </article>
              ))}
            </div>
          </section>

          <section id="story" className="toss-story">
            <div className="toss-story__inner">
              <p className="toss-section__eyebrow" style={{ color: '#6bb1ff' }}>사장님 스토리</p>
              <h2 className="toss-section__title" style={{ color: '#fff', marginBottom: '28px' }}>현장의 선택이<br />성장의 기준이 됩니다</h2>
              <div className="toss-story__grid">
                <div className="toss-story__media">
                  <img src={story.image} alt={story.who} />
                </div>
                <div className="toss-story__panel">
                  <p className="toss-story__quote">“{story.quote}”</p>
                  <p className="toss-story__who">{story.who}</p>
                  <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
                    {stories.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        className={cx('toss-hero__btn', storyIndex === i ? 'toss-hero__btn--primary' : 'toss-hero__btn--ghost')}
                        style={{ minHeight: '36px', padding: '0 14px', fontSize: '13px' }}
                        onClick={() => setStoryIndex(i)}
                      >{i + 1}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="cta" className="toss-cta">
            <h2 className="toss-cta__title">지금 바로 매장에 도입해 보세요</h2>
            <p className="toss-cta__desc">상담부터 설치·교육까지 한 번에 안내드립니다.</p>
            <div className="toss-cta__actions">
              <a className="toss-hero__btn toss-hero__btn--primary" href="#cta">상담 받기</a>
              <a className="toss-hero__btn toss-hero__btn--ghost" href="#cta">포스 다운로드</a>
            </div>
          </section>

          <p className="toss-foot">UI 레퍼런스: tossplace.com · Home 03 (#/pc/home/03)</p>

          <div className="toss-sticky" aria-label="빠른 상담">
            <p className="toss-sticky__text">매장에 맞는 조합, 지금 상담받아 보세요</p>
            <a className="toss-hero__btn toss-hero__btn--primary" href="#cta">상담 받기</a>
          </div>
          <button type="button" className="toss-fab" aria-label="채팅 상담" onClick={() => go('cta')}>💬</button>
        </div>
      </PageLoading>
    </div>
  )
}
