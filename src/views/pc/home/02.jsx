'use client'

import { useEffect, useState } from 'react'
import { Header, Footer, PageLoading } from '@/components'
import { useHomeScrollFx } from '@/hooks/useHomeScrollFx'
import { cx } from '@/utils/cx'
import Skeleton01 from './skeleton/01Skeleton'
import '@/styles/pages/_pc-home-02.scss'
import './02.scss'

const HERO_INTERVAL_MS = 5500
const STOCK_PRICE = '428,500'

const nav = [
  { id: 'business', label: '사업소개' },
  { id: 'esg', label: '지속가능경영' },
  { id: 'media', label: '미디어' },
  { id: 'investors', label: '투자정보' }
]

const slides = [
  {
    id: 's1',
    tag: 'GLOBAL NO.1 SHIPBUILDER',
    title: '혁신적인 기술로\n바다의 무한한 잠재력을 실현합니다',
    desc: '글로벌 시장을 선도하는 기술로 세계 1위 조선해양기업의 항해를 이어갑니다.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 's2',
    tag: 'BEYOND INNOVATION',
    title: '새로운 50년의 항해를 위한\n끊임없는 도전과 혁신',
    desc: '친환경·스마트 조선으로 확장되는 미래 전략을 실행합니다.',
    image: 'https://images.unsplash.com/photo-1494412651409-6968d45d3d3f?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 's3',
    tag: 'SUSTAINABLE GROWTH',
    title: '바다에서 시작하는\n깨끗한 미래',
    desc: '지속 가능한 성장과 사회적 책임을 함께 실천합니다.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80'
  }
]

const businesses = [
  { id: 'b1', name: '조선', desc: '컨테이너·LNG·특수선 건조', image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=800&q=80' },
  { id: 'b2', name: '해양플랜트', desc: '해양·산업 플랜트 엔지니어링', image: 'https://images.unsplash.com/photo-1504328345607-5f36b5a2f6c0?auto=format&fit=crop&w=800&q=80' },
  { id: 'b3', name: '특수선', desc: '해군·특수목적 선박', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
  { id: 'b4', name: '엔진&기계', desc: '추진·기계 시스템', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { id: 'b5', name: '에너지', desc: '에너지 솔루션', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80' },
  { id: 'b6', name: '가스·친환경', desc: '탈탄소 시스템', image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=800&q=80' },
  { id: 'b7', name: '친환경 추진', desc: '선박 추진 솔루션', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=800&q=80' },
  { id: 'b8', name: '연구개발', desc: '미래 기술 R&D', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' }
]

const esgTabs = [
  {
    id: 'e',
    label: 'Environmental',
    title: '기후변화에 대응하는 기술',
    desc: '녹색 성장과 미래 세대를 위해 최적의 기술과 방안을 지속적으로 발굴·실행합니다.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 's',
    label: 'Social',
    title: '더불어 행복한 사회',
    desc: '나눔·사랑·행복의 가치를 확산하고, 인권을 존중하는 협력 성장을 추구합니다.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'g',
    label: 'Governance',
    title: '투명하고 윤리적인 경영',
    desc: '상호 신뢰와 준법 의식으로 공정하고 깨끗한 기업 환경을 만듭니다.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
  }
]

const news = [
  { id: 'n1', date: '2026.10.28', title: '초대형 컨테이너선 8척 수주… 글로벌 수주 모멘텀 지속' },
  { id: 'n2', date: '2026.10.21', title: '美 현지 조선사와 선박 건조 협력 확대' },
  { id: 'n3', date: '2026.10.15', title: '노르시핑에서 바다의 탈탄소 전환 비전 제시' },
  { id: 'n4', date: '2026.10.08', title: '2025 지속가능경영보고서 발간' }
]

const pad = (n) => (n < 10 ? '0' + n : String(n))

const go = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - 20, behavior: 'smooth' })
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function PcHomeScreen02() {
  const [loading, setLoading] = useState(true)
  const [heroIndex, setHeroIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [esgIndex, setEsgIndex] = useState(0)

  const { rootRef } = useHomeScrollFx({ loading })

  // 페이지 진입 로딩
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(timer)
  }, [])

  // 히어로 자동 재생 (인덱스 변경 시 타이머 재시작)
  useEffect(() => {
    if (loading || !playing) return undefined
    const timer = window.setTimeout(() => {
      setHeroIndex((prev) => (prev + 1) % slides.length)
    }, HERO_INTERVAL_MS)
    return () => window.clearTimeout(timer)
  }, [loading, playing, heroIndex])

  const nextHero = () => setHeroIndex((heroIndex + 1) % slides.length)
  const prevHero = () => setHeroIndex((heroIndex - 1 + slides.length) % slides.length)
  const togglePlay = () => setPlaying((prev) => !prev)

  const esgTab = esgTabs[esgIndex]

  return (
    <div className="home" ref={rootRef}>
      <Header hidden />
      <Footer hidden />

      <PageLoading loading={loading} skeleton={<Skeleton01 />}>
        <div className="ksoe-home">
          <header className="ksoe-header">
            <a
              className="ksoe-header__brand"
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTop() }}
            >HD 한국조선해양</a>
            <nav className="ksoe-header__nav" aria-label="주요 메뉴">
              {nav.map((item) => (
                <a
                  key={item.id}
                  className="ksoe-header__link"
                  href={'#' + item.id}
                  onClick={(e) => { e.preventDefault(); go(item.id) }}
                >{item.label}</a>
              ))}
            </nav>
            <div className="ksoe-header__meta">
              <span className="ksoe-header__chip">KR</span>
              <span className="ksoe-header__chip">패밀리 사이트 +</span>
            </div>
          </header>

          <section id="hero" className="ksoe-hero" aria-roledescription="carousel" aria-label="메인 비주얼">
            <div className="ksoe-hero__slides">
              {slides.map((slide, index) => (
                <article
                  key={slide.id}
                  className={cx('ksoe-hero__slide', index === heroIndex && 'is-active')}
                >
                  <div className="fx-parallax-clip" style={{ position: 'absolute', inset: 0 }}>
                    <div
                      className="ksoe-hero__media"
                      data-parallax="0.35"
                      style={{ backgroundImage: 'url(' + slide.image + ')', height: '120%', top: '-10%' }}
                    ></div>
                  </div>
                  <div className="ksoe-hero__dim"></div>
                  <div className="ksoe-hero__body">
                    <p className="ksoe-hero__tag" data-fx="up">{slide.tag}</p>
                    <h1 className="ksoe-hero__title" data-fx="up" data-fx-delay="70">{slide.title}</h1>
                    <p className="ksoe-hero__desc" data-fx="up" data-fx-delay="120">{slide.desc}</p>
                    <a className="ksoe-hero__cta" href="#business">자세히 보기 →</a>
                  </div>
                </article>
              ))}
            </div>
            <div className="ksoe-hero__controls">
              <button type="button" className="ksoe-hero__btn" aria-label="이전" onClick={prevHero}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" className="ksoe-hero__btn" aria-label="다음" onClick={nextHero}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" className="ksoe-hero__btn" aria-label={playing ? '정지' : '재생'} onClick={togglePlay}>
                {playing ? (
                  <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>
              <span className="ksoe-hero__now">NOW {pad(heroIndex + 1)} / {pad(slides.length)}</span>
            </div>
          </section>

          <section id="business" className="ksoe-section">
            <p className="ksoe-section__eyebrow" data-fx="up">BUSINESS</p>
            <h2 className="ksoe-section__title" data-fx="up" data-fx-delay="60">바다의 잠재력을 실현하는 사업 영역</h2>
            <div className="ksoe-biz">
              {businesses.map((item, bIdx) => (
                <a
                  key={item.id}
                  className="ksoe-biz__card"
                  href="#business"
                  data-fx="up"
                  data-fx-delay={String((bIdx % 4) * 70)}
                  style={{
                    '--biz-img': 'url(' + item.image + ')',
                    backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.7)), url(' + item.image + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="ksoe-biz__name">{item.name}</div>
                  <p className="ksoe-biz__desc">{item.desc}</p>
                </a>
              ))}
            </div>
          </section>

          <section id="esg" className="ksoe-esg">
            <div className="ksoe-esg__inner">
              <p className="ksoe-section__eyebrow" data-fx="up">SUSTAINABILITY</p>
              <h2 className="ksoe-section__title" data-fx="up" data-fx-delay="60">Beyond Blue, Forward to Green</h2>
              <div className="ksoe-esg__tabs" role="tablist">
                {esgTabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={cx('ksoe-esg__tab', esgIndex === index && 'is-active')}
                    role="tab"
                    onClick={() => setEsgIndex(index)}
                  >{tab.label}</button>
                ))}
              </div>
              <div className="ksoe-esg__panel" data-fx="up" data-fx-delay="80">
                <div>
                  <h3 className="ksoe-esg__title">{esgTab.title}</h3>
                  <p className="ksoe-esg__desc">{esgTab.desc}</p>
                </div>
                <div className="ksoe-esg__visual fx-parallax-clip">
                  <div
                    data-parallax="0.2"
                    style={{ backgroundImage: 'url(' + esgTab.image + ')', height: '120%', backgroundSize: 'cover', backgroundPosition: 'center' }}
                  ></div>
                </div>
              </div>
            </div>
          </section>

          <section id="media" className="ksoe-section">
            <p className="ksoe-section__eyebrow" data-fx="up">NEWS</p>
            <h2 className="ksoe-section__title" data-fx="up" data-fx-delay="50">최신 뉴스</h2>
            <div className="ksoe-news">
              {news.map((item, nIdx) => (
                <a
                  key={item.id}
                  className="ksoe-news__item"
                  href="#media"
                  data-fx="up"
                  data-fx-delay={String(nIdx * 70)}
                >
                  <span className="ksoe-news__date">{item.date}</span>
                  <h3 className="ksoe-news__title">{item.title}</h3>
                </a>
              ))}
            </div>
          </section>

          <section id="investors" className="ksoe-section">
            <div className="ksoe-ir" data-fx="up">
              <div>
                <p className="ksoe-ir__label">INVESTORS</p>
                <h2 className="ksoe-ir__title">경영현황을 빠르고 쉽게</h2>
                <p className="ksoe-ir__desc">주가·재무·IR 자료를 한곳에서 확인할 수 있습니다.</p>
                <a
                  className="ksoe-hero__cta"
                  href="#investors"
                  style={{ color: '#fff', borderColor: 'rgba(255,255,255,.45)' }}
                >주가정보 바로가기 →</a>
              </div>
              <div className="ksoe-ir__stock">
                <div className="ksoe-ir__price">{STOCK_PRICE}</div>
                <div className="ksoe-ir__meta">HD한국조선해양 · KRX 009540 · KOSPI</div>
              </div>
            </div>
          </section>

          <p className="ksoe-foot">UI 레퍼런스: hd-ksoe.com · Home 02 (#/pc/home/02)</p>
        </div>
      </PageLoading>
    </div>
  )
}
