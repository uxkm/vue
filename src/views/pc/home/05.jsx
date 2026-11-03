'use client'

import { useEffect, useState } from 'react'
import { Header, Footer, PageLoading } from '@/components'
import { useHomeScrollFx } from '@/hooks/useHomeScrollFx'
import { cx } from '@/utils/cx'
import Skeleton01 from './skeleton/01Skeleton'
import '@/styles/pages/_pc-home-05.scss'

const nav = [
  { id: 'stories', label: '이야기' },
  { id: 'experts', label: '인터뷰' },
  { id: 'values', label: '가치' },
  { id: 'join', label: '합류' }
]

const experts = [
  { id: 'ex1', name: '김로컬', role: '로컬 커머스 연구원', quote: '가까운 거래가 신뢰를 만들고, 신뢰가 다시 동네를 키웁니다.', color: '#F1FBEA' },
  { id: 'ex2', name: '이커뮤니티', role: '도시사회학 연구자', quote: '이웃과 사장님의 목소리가 가장 가까운 곳에서 만나야 합니다.', color: '#FFF1E6' },
  { id: 'ex3', name: '박연결', role: '커뮤니티 빌더', quote: '작은 시도가 쌓이면 지역의 가능성이 달라집니다.', color: '#EAF4FF' }
]

const marqueeItems = [
  '중고거래',
  '동네생활',
  '알바',
  '부동산',
  '중고차',
  '모임',
  '비즈니스'
]

const stories = [
  {
    id: 'st1',
    tag: '중고거래',
    title: '가벼운 시도가 일상이 되기까지',
    text: '새것이 필요해지면 동네에서 먼저 찾아보고, 마음에 안 들면 다시 나눕니다.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'st2',
    tag: '동네생활',
    title: '이사 온 동네가 금방 익숙해졌어요',
    text: '근처 이웃과 이야기하며 지역의 숨은 장소를 알게 됩니다.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'st3',
    tag: '알바',
    title: '다시 시작한 일이 나를 살렸어요',
    text: '가까운 곳에서 일한 뒤 남겨진 따뜻한 후기가 힘이 됩니다.',
    image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'st4',
    tag: '모임',
    title: '한 식탁에 둘러앉은 사람들',
    text: '편히 가기 힘들었던 남의 집이, 동네 모임을 통해 새로운 연결이 됩니다.',
    image: 'https://images.unsplash.com/photo-1414235077428-3388164de043?auto=format&fit=crop&w=900&q=80'
  }
]

const values = [
  {
    id: 'v1',
    num: '01',
    title: '가까운 연결',
    text: '근처에서 시작하는 거래와 대화로 신뢰의 반경을 넓힙니다.'
  },
  {
    id: 'v2',
    num: '02',
    title: '숨은 가치',
    text: '쓰이지 않던 물건과 공간, 사람의 재능을 다시 순환시킵니다.'
  },
  {
    id: 'v3',
    num: '03',
    title: '로컬 생태계',
    text: '이웃·사장님·커뮤니티가 함께 성장하는 동네 경험을 만듭니다.'
  }
]

const go = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - 64, behavior: 'smooth' })
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function PcHomeScreen05() {
  const [loading, setLoading] = useState(true)
  const [activeNav, setActiveNav] = useState('stories')

  const { rootRef } = useHomeScrollFx({ loading })

  // 페이지 진입 로딩
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 400)
    return () => window.clearTimeout(timer)
  }, [])

  // 스크롤 스파이
  useEffect(() => {
    if (loading) return undefined
    const onScroll = () => {
      const ids = ['stories', 'experts', 'values', 'join']
      let current = ids[0]
      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i])
        if (!el) continue
        if (el.getBoundingClientRect().top - 90 <= 0) current = ids[i]
      }
      setActiveNav(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [loading])

  return (
    <div className="home" ref={rootRef}>
      <Header hidden />
      <Footer hidden />

      <PageLoading loading={loading} skeleton={<Skeleton01 />}>
        <div className="dg-home">
          <header className="dg-header">
            <a
              className="dg-header__brand"
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTop() }}
            >
              <span className="dg-header__mark" aria-hidden="true"></span>
              당근
            </a>
            <nav className="dg-header__nav" aria-label="주요 메뉴">
              {nav.map((item) => (
                <a
                  key={item.id}
                  className={cx('dg-header__link', activeNav === item.id && 'is-active')}
                  href={'#' + item.id}
                  onClick={(e) => { e.preventDefault(); go(item.id) }}
                >{item.label}</a>
              ))}
            </nav>
          </header>

          <section id="hero" className="dg-hero dg-hero--split">
            <div className="dg-hero__copy">
              <p className="dg-hero__eyebrow" data-fx="up">회사소개</p>
              <h1 className="dg-hero__title" data-fx="up" data-fx-delay="70">동네를 여는 문,<br />당근</h1>
              <p className="dg-hero__desc" data-fx="up" data-fx-delay="120">
                로컬의 모든 것을 연결해, 동네의 숨은 가치를 깨워요.
              </p>
              <a className="dg-hero__cta" href="#stories" data-fx="up" data-fx-delay="160">사용자 이야기 보기</a>
            </div>
            <div className="dg-hero__media fx-parallax-clip" data-fx="scale" data-fx-delay="100">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
                alt="동네에서 만나는 사람들"
                data-parallax="0.22"
              />
            </div>
          </section>

          <section id="mission" className="dg-mission">
            <div className="fx-parallax-clip" style={{ position: 'absolute', inset: 0 }}>
              <div
                className="dg-mission__bg"
                data-parallax="0.35"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511637277480-c19a3b4e8e79?auto=format&fit=crop&w=1600&q=80)' }}
              ></div>
            </div>
            <div className="dg-mission__body">
              <p className="dg-mission__eyebrow" data-fx="up">Mission</p>
              <h2 className="dg-mission__title" data-fx="up" data-fx-delay="70">근처에서 시작하는<br />새로운 연결</h2>
              <p className="dg-mission__desc" data-fx="up" data-fx-delay="110">거래부터 모임, 홍보, 결제까지 로컬에서 일어나는 경험을 하나로 잇습니다.</p>
            </div>
          </section>

          <div className="dg-marquee" aria-hidden="true">
            <div className="dg-marquee__track">
              {marqueeItems.concat(marqueeItems).map((item, index) => (
                <span key={'mq-' + index} className="dg-marquee__item">{item}</span>
              ))}
            </div>
          </div>

          <section id="stories" className="dg-section">
            <p className="dg-section__eyebrow" data-fx="up">사용자 이야기</p>
            <h2 className="dg-section__title" data-fx="up" data-fx-delay="50">당근을 만나고<br />달라진 일상</h2>
            <div className="dg-story-split">
              {stories.map((item, index) => (
                <article
                  key={item.id}
                  className={cx('dg-story-split__row', index % 2 === 1 && 'is-reverse')}
                  data-fx="up"
                  data-fx-delay={String(index * 60)}
                >
                  <div className="dg-story-split__copy">
                    <span className="dg-stories__tag">{item.tag}</span>
                    <h3 className="dg-stories__name">{item.title}</h3>
                    <p className="dg-stories__text">{item.text}</p>
                    <a className="dg-story-split__more" href="#stories">{item.tag} 이야기 더 보기</a>
                  </div>
                  <div className="dg-story-split__media">
                    <img src={item.image} alt={item.title} />
                    <span className="dg-story-split__chip">{item.tag}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="experts" className="dg-section dg-experts">
            <div className="dg-experts__side" data-fx="left">
              <p className="dg-section__eyebrow">전문가 인터뷰</p>
              <h2 className="dg-section__title">동네를 연구하는<br />사람들의 시선</h2>
            </div>
            <div className="dg-experts__list">
              {experts.map((item, eIdx) => (
                <article
                  key={item.id}
                  className="dg-experts__card"
                  data-fx="up"
                  data-fx-delay={String(eIdx * 80)}
                >
                  <div className="dg-experts__avatar" style={{ background: item.color }}></div>
                  <div>
                    <h3 className="dg-experts__name">{item.name}</h3>
                    <p className="dg-experts__role">{item.role}</p>
                    <p className="dg-experts__quote">“{item.quote}”</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="values" className="dg-section">
            <p className="dg-section__eyebrow" data-fx="up">우리가 하는 일</p>
            <h2 className="dg-section__title" data-fx="up" data-fx-delay="50">거래부터 모임·홍보·결제까지<br />로컬 경험을 하나로</h2>
            <div className="dg-values">
              {values.map((item, vIdx) => (
                <article
                  key={item.id}
                  className="dg-values__item"
                  data-fx="up"
                  data-fx-delay={String(vIdx * 80)}
                >
                  <div className="dg-values__num">{item.num}</div>
                  <h3 className="dg-values__title">{item.title}</h3>
                  <p className="dg-values__text">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="join" className="dg-cta" data-fx="up">
            <h2 className="dg-cta__title">함께 동네의 문을 열어갈까요?</h2>
            <p className="dg-cta__desc">채용과 파트너십 소식을 확인해 보세요.</p>
            <a className="dg-cta__btn" href="#join">채용/제휴 알아보기</a>
          </section>

          <p className="dg-foot">UI 레퍼런스: about.daangn.com · Home 05 (#/pc/home/05)</p>
        </div>
      </PageLoading>
    </div>
  )
}
