import { useCallback, useEffect, useRef, useState } from 'react'
import { Header, Footer, PageLoading } from '@/components'
import { useHomeScrollFx } from '@/hooks/useHomeScrollFx'
import { cx } from '@/utils/cx'
import Skeleton01 from './skeleton/01Skeleton'
import '@/styles/pages/_pc-home.scss'

const HERO_INTERVAL_MS = 5000

const navItems = [
  { id: 'services', label: '대표 서비스' },
  { id: 'solutions', label: '솔루션' },
  { id: 'brands', label: '대표 브랜드' },
  { id: 'contact', label: '문의하기' }
]

const sectionNav = [
  { id: 'services', label: '대표 서비스' },
  { id: 'solutions', label: '솔루션' },
  { id: 'brands', label: '대표 브랜드' },
  { id: 'contact', label: '문의하기' }
]

const heroSlides = [
  {
    id: 'h1',
    tag: '멀캠ON 10월 HR Lab',
    title: '데이터로 읽는 2027 트렌드:\nHR이 주목해야 할 변화와 과제',
    desc: '생성형 AI 확산 속 일하는 방식의 변화,<br />성과관리·인재확보·조직문화의 방향성을 짚어봅니다.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    bgStyle: {},
    ctas: [{ label: '자세히 보기', href: '#services', ghost: false }]
  },
  {
    id: 'h2',
    tag: '멀티캠퍼스 기업교육',
    title: '조직의 성장을 설계하는\n맞춤형 러닝 파트너',
    desc: '컨설팅부터 과정 운영·플랫폼까지,<br />기업 교육의 End-to-End를 지원합니다.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    bgStyle: { background: 'radial-gradient(ellipse 55% 70% at 78% 48%, rgba(26,80,160,.4), transparent 70%), linear-gradient(160deg,#050505,#101828 55%,#0a0a0a)' },
    ctas: [
      { label: '자세히 보기', href: '#services', ghost: false },
      { label: '홍보영상 보기', href: '#brands', ghost: true }
    ]
  },
  {
    id: 'h3',
    tag: 'AX Education',
    title: '직무·산업·직급별 AI 교육으로\n업무 혁신을 가속합니다',
    desc: 'AI 통합 교육 로드맵으로<br />조직의 AX 전환을 체계적으로 준비하세요.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
    bgStyle: { background: 'radial-gradient(ellipse 50% 60% at 70% 40%, rgba(15,100,120,.35), transparent 70%), #070b12' },
    ctas: [{ label: '자세히 보기', href: '#solutions', ghost: false }]
  },
  {
    id: 'h4',
    tag: 'Learning Platform',
    title: '스스로 성장하는 조직을 위한\n통합 러닝 환경',
    desc: '성과와 경력개발을 연결하는<br />디지털 학습 경험을 제공합니다.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80',
    bgStyle: { background: 'radial-gradient(ellipse 45% 55% at 75% 45%, rgba(80,60,160,.3), transparent 70%), #090909' },
    ctas: [
      { label: '자세히 보기', href: '#services', ghost: false },
      { label: '홍보영상 보기', href: '#brands', ghost: true }
    ]
  },
  {
    id: 'h5',
    tag: '2026 중소기업 지원 교육 안내',
    title: '교육비 부담은 줄이고\n업무 역량은 높입니다',
    desc: '지원 제도와 연계한 실무형 과정으로<br />현장의 성과를 바로 연결합니다.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80',
    bgStyle: { background: 'radial-gradient(ellipse 55% 65% at 70% 45%, rgba(30,60,160,.45), transparent 72%), linear-gradient(145deg,#1a2a6c,#0b1020)' },
    ctas: [{ label: '자세히 보기', href: '#contact', ghost: false }]
  },
  {
    id: 'h6',
    tag: 'Consulting & BPO',
    title: '인재 육성 체계부터 운영까지\n교육 프로세스 아웃소싱',
    desc: '역량 모델링·체계 수립·운영 효율화까지<br />고객의 미래 가치를 함께 설계합니다.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80',
    bgStyle: { background: 'radial-gradient(ellipse 50% 60% at 78% 50%, rgba(180,90,40,.25), transparent 70%), #0a0a0a' },
    ctas: [{ label: '자세히 보기', href: '#contact', ghost: false }]
  }
]

const services = [
  {
    id: 's1',
    title: 'AX교육',
    desc: '조직의 업무혁신을 이끄는 AI의 모든 것. 직무·산업·직급별 맞춤 교육을 위한 AI 통합 로드맵을 제공합니다.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's2',
    title: '컨설팅 서비스',
    desc: '역량 모델링부터 교육체계 수립까지, 업과 인재 육성 방향에 맞는 컨설팅을 제공합니다.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's3',
    title: '러닝 서비스',
    desc: '20여 년 기업교육 노하우로 조직과 임직원의 혁신·경쟁력 향상에 기여합니다.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's4',
    title: '플랫폼 서비스',
    desc: '성과와 경력개발을 지원하는 통합 러닝 플랫폼으로 디지털 학습환경을 구축합니다.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's5',
    title: 'BPO 서비스',
    desc: '기업교육 프로세스·역량 아웃소싱으로 인재경영 효율화와 경쟁력 강화를 돕습니다.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's6',
    title: '자격인증 서비스',
    desc: '외국어·IT 실무역량 측정과 수준별 교육으로 사내 제도와 연계한 육성 방안을 제시합니다.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
  }
]

const solutions = [
  { id: 'sol1', label: 'AI', hint: 'AX 역량·워크숍·해커톤' },
  { id: 'sol2', label: 'IT', hint: '직무·산업 전문 역량' },
  { id: 'sol3', label: '외국어', hint: 'AI 외국어·평가 연계' },
  { id: 'sol4', label: 'MBA', hint: '리더십·임원 프로그램' }
]

const brands = [
  {
    id: 'b1',
    name: 'multicampus',
    desc: '대한민국 기업이 선택한 기업교육',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b2',
    name: 'OPIc',
    desc: '외국어 평가·교육의 기준',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b3',
    name: 'SERICEO',
    desc: '지식, 그 이상의 가치',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80'
  }
]

const pad = (n) => (n < 10 ? '0' + n : String(n))

const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = window.pageYOffset + el.getBoundingClientRect().top - 16
  window.scrollTo({ top, behavior: 'smooth' })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function PcHomeScreen01() {
  const [loading, setLoading] = useState(true)
  const [navOpen, setNavOpen] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)
  const [heroPlaying, setHeroPlaying] = useState(true)
  const [serviceIndex, setServiceIndex] = useState(0)
  const [serviceOffset, setServiceOffset] = useState(0)
  const [activeSection, setActiveSection] = useState('services')
  const serviceTrackRef = useRef(null)

  const { rootRef } = useHomeScrollFx({ loading })

  const maxServiceIndex = Math.max(0, services.length - 1)

  // 페이지 진입 로딩
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 500)
    return () => window.clearTimeout(timer)
  }, [])

  // 히어로 자동 재생 (인덱스 변경 시 타이머 재시작)
  useEffect(() => {
    if (loading || !heroPlaying) return undefined
    const timer = window.setTimeout(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length)
    }, HERO_INTERVAL_MS)
    return () => window.clearTimeout(timer)
  }, [loading, heroPlaying, heroIndex])

  // 서비스 캐러셀 오프셋
  useEffect(() => {
    if (loading) return undefined
    const update = () => {
      const track = serviceTrackRef.current
      if (!track) return
      const card = track.querySelector('.mc-service-card')
      if (!card) return
      const gap = 24
      setServiceOffset(serviceIndex * (card.offsetWidth + gap))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [loading, serviceIndex])

  // 스크롤 스파이
  useEffect(() => {
    if (loading) return undefined
    const onScrollSpy = () => {
      const ids = ['services', 'solutions', 'brands', 'contact']
      let current = ids[0]
      const offset = 120
      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i])
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top - offset <= 0) current = ids[i]
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScrollSpy, { passive: true })
    onScrollSpy()
    return () => window.removeEventListener('scroll', onScrollSpy)
  }, [loading])

  const goHero = useCallback((index) => {
    setHeroIndex(index)
  }, [])

  const toggleHeroPlay = () => setHeroPlaying((prev) => !prev)

  const prevService = () => {
    if (serviceIndex <= 0) return
    setServiceIndex(serviceIndex - 1)
  }

  const nextService = () => {
    if (serviceIndex >= maxServiceIndex) return
    setServiceIndex(serviceIndex + 1)
  }

  const goSection = (id) => {
    setNavOpen(false)
    scrollToId(id)
  }

  return (
    <div className="home mc-home-page" ref={rootRef}>
      <Header hidden />
      <Footer hidden />

      <PageLoading loading={loading} skeleton={<Skeleton01 />}>
        <div className="mc-home">
          {/* 상단: 로고 + 햄버거 메뉴 */}
          <header className="mc-header">
            <a
              className="mc-header__brand"
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToId('hero') }}
            >
              <span className="mc-header__brand-mark" aria-hidden="true"></span>
              multicampus
            </a>
            <button
              type="button"
              className={cx('mc-header__menu', navOpen && 'is-open')}
              aria-expanded={navOpen ? 'true' : 'false'}
              aria-controls="mc-nav-panel"
              aria-label="메뉴"
              onClick={() => setNavOpen(!navOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </header>

          <div
            id="mc-nav-panel"
            className={cx('mc-nav-panel', navOpen && 'is-open')}
            onClick={(e) => { if (e.target === e.currentTarget) setNavOpen(false) }}
          >
            <nav className="mc-nav-panel__inner" aria-label="전체 메뉴">
              <ul className="mc-nav-panel__list">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      className="mc-nav-panel__link"
                      href={'#' + item.id}
                      onClick={(e) => { e.preventDefault(); goSection(item.id) }}
                    >{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* 히어로 배너 슬라이더 */}
          <section id="hero" className="mc-hero" aria-roledescription="carousel" aria-label="메인 배너">
            <div className="mc-hero__slides">
              {heroSlides.map((slide, index) => (
                <article
                  key={slide.id}
                  className={cx('mc-hero__slide', heroIndex === index && 'is-active')}
                  aria-hidden={heroIndex === index ? 'false' : 'true'}
                >
                  <div className="mc-hero__bg" style={slide.bgStyle}></div>
                  <div className="mc-hero__visual fx-parallax-clip" aria-hidden="true">
                    <img src={slide.image} alt="" data-parallax="0.25" />
                  </div>
                  <div className="mc-hero__body">
                    <p className="mc-hero__tag" data-fx="up">{slide.tag}</p>
                    <h1
                      className="mc-hero__title"
                      data-fx="up"
                      data-fx-delay="80"
                      style={{ whiteSpace: 'pre-line' }}
                    >{slide.title}</h1>
                    <p className="mc-hero__desc" dangerouslySetInnerHTML={{ __html: slide.desc }}></p>
                    <div className="mc-hero__actions">
                      {slide.ctas.map((cta, ctaIndex) => (
                        <a
                          key={slide.id + '-cta-' + ctaIndex}
                          className={cx('mc-cta', cta.ghost && 'mc-cta--ghost')}
                          href={cta.href}
                        >
                          {cta.label}
                          <span className="mc-cta__arrow" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mc-hero-pager" role="tablist" aria-label="배너 페이지">
              <div className="mc-hero-pager__tabs">
                {heroSlides.map((slide, index) => (
                  <button
                    key={'pager-' + slide.id}
                    type="button"
                    className={cx('mc-hero-pager__tab', heroIndex === index && 'is-active')}
                    role="tab"
                    aria-selected={heroIndex === index ? 'true' : 'false'}
                    aria-label={(index + 1) + ' of ' + heroSlides.length}
                    onClick={() => goHero(index)}
                  >{pad(index + 1)}</button>
                ))}
              </div>
              <button
                type="button"
                className="mc-hero-pager__pause"
                aria-label={heroPlaying ? '정지' : '재생'}
                onClick={toggleHeroPlay}
              >
                {heroPlaying ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </section>

          {/* 본문: 사이드 내비 + 섹션 */}
          <div className="mc-content">
            <div className="mc-content-inner">
              <nav className="mc-side-nav" aria-label="섹션 바로가기">
                {sectionNav.map((item) => (
                  <a
                    key={'side-' + item.id}
                    className={cx('mc-side-nav__item', activeSection === item.id && 'is-active')}
                    href={'#' + item.id}
                    onClick={(e) => { e.preventDefault(); goSection(item.id) }}
                  >{item.label}</a>
                ))}
              </nav>

              <div className="mc-sections">
                {/* 대표 서비스 카드 캐러셀 */}
                <section id="services" className="mc-section">
                  <div className="mc-section__head" data-fx="up">
                    <div>
                      <p className="mc-section__eyebrow">대표 서비스</p>
                      <h2 className="mc-section__title">
                        창의와 지식서비스로 조직과 개인의<br />
                        경쟁력을 키우는 기업교육 파트너입니다.
                      </h2>
                    </div>
                    <div className="mc-carousel-ctrl">
                      <button
                        type="button"
                        className="mc-carousel-ctrl__btn"
                        aria-label="이전 서비스"
                        disabled={serviceIndex <= 0}
                        onClick={prevService}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <span className="mc-carousel-ctrl__count">{serviceIndex + 1} / {services.length}</span>
                      <button
                        type="button"
                        className="mc-carousel-ctrl__btn"
                        aria-label="다음 서비스"
                        disabled={serviceIndex >= maxServiceIndex}
                        onClick={nextService}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mc-service-track" ref={serviceTrackRef}>
                    <div
                      className="mc-service-list"
                      style={{ transform: 'translateX(-' + serviceOffset + 'px)' }}
                    >
                      {services.map((item, sIdx) => (
                        <a
                          key={item.id}
                          className="mc-service-card"
                          href="#services"
                          data-fx="up"
                          data-fx-delay={String(sIdx * 70)}
                        >
                          <div className="mc-service-card__media">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <h3 className="mc-service-card__title">{item.title}</h3>
                          <p className="mc-service-card__desc">{item.desc}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 솔루션 */}
                <section id="solutions" className="mc-section">
                  <p className="mc-section__eyebrow" data-fx="up">솔루션</p>
                  <h2 className="mc-section__title" data-fx="up" data-fx-delay="60">
                    직무·산업·직급별 맞춤 교육으로<br />
                    조직의 변화를 설계합니다.
                  </h2>
                  <div className="mc-solution-grid" style={{ marginTop: '36px' }}>
                    {solutions.map((item, solIdx) => (
                      <a
                        key={item.id}
                        className="mc-solution-card"
                        href="#solutions"
                        data-fx="up"
                        data-fx-delay={String(solIdx * 80)}
                      >
                        <div>
                          <div className="mc-solution-card__label">{item.label}</div>
                          <p className="mc-solution-card__hint">{item.hint}</p>
                        </div>
                        <span className="mc-solution-card__go" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </a>
                    ))}
                  </div>
                </section>

                {/* 대표 브랜드 */}
                <section id="brands" className="mc-section">
                  <p className="mc-section__eyebrow" data-fx="up">대표 브랜드</p>
                  <h2 className="mc-section__title" data-fx="up" data-fx-delay="60">
                    국내외 16,000여 개 기업이<br />
                    선택해 온 학습 브랜드입니다.
                  </h2>
                  <div className="mc-brand-grid" style={{ marginTop: '36px' }}>
                    {brands.map((item, bIdx) => (
                      <a
                        key={item.id}
                        className="mc-brand-card"
                        href="#brands"
                        data-fx="scale"
                        data-fx-delay={String(bIdx * 90)}
                      >
                        <img src={item.image} alt={item.name} />
                        <div className="mc-brand-card__overlay">
                          <div className="mc-brand-card__name">{item.name}</div>
                          <p className="mc-brand-card__desc">{item.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>

                {/* 문의하기 */}
                <section id="contact" className="mc-section">
                  <p className="mc-section__eyebrow" data-fx="up">문의하기</p>
                  <div className="mc-contact" data-fx="up" data-fx-delay="80">
                    <div>
                      <h2 className="mc-contact__title">기업교육, 어디서부터<br />시작할지 함께 찾아드립니다.</h2>
                      <p className="mc-contact__desc">
                        교육 체계 진단부터 과정 설계·운영까지, 조직 상황에 맞는
                        실행 방안을 제안합니다.
                      </p>
                      <div className="mc-contact__actions">
                        <a className="mc-contact__btn mc-contact__btn--primary" href="#contact">기업교육 문의하기</a>
                        <a className="mc-contact__btn mc-contact__btn--line" href="#contact">교육과정 신청하기</a>
                      </div>
                    </div>
                    <div className="mc-contact__aside">
                      <a className="mc-contact__link" href="#contact">
                        기업/단체교육 문의
                        <span>상담 신청</span>
                      </a>
                      <a className="mc-contact__link" href="#contact">
                        학습 문의
                        <span>고객센터</span>
                      </a>
                      <a className="mc-contact__link" href="#contact">
                        홍보/제휴 문의
                        <span>제휴 제안</span>
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* 우측 플로팅 퀵메뉴 */}
          <aside className="mc-quick" aria-label="바로가기">
            <a
              className="mc-quick__item"
              href="#contact"
              onClick={(e) => { e.preventDefault(); goSection('contact') }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4z" strokeLinejoin="round" />
              </svg>
              <span>기업교육문의</span>
            </a>
            <a className="mc-quick__item" href="#hero">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="7" width="18" height="10" rx="5" />
                <circle cx="16" cy="12" r="3" fill="currentColor" stroke="none" />
              </svg>
              <span>멀캠ON</span>
            </a>
            <a
              className="mc-quick__item"
              href="#services"
              onClick={(e) => { e.preventDefault(); goSection('services') }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="4" width="18" height="12" rx="2" />
                <path d="M8 20h8M12 16v4" strokeLinecap="round" />
              </svg>
              <span>교육과정신청</span>
            </a>
            <button type="button" className="mc-quick__item" onClick={scrollToTop}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>TOP</span>
            </button>
          </aside>

          <p className="mc-footer-note">
            UI 레퍼런스: multicampus.com B2B 메인 · 인터랙션 재현 퍼블리시 (#/pc/home/01)
          </p>
        </div>
      </PageLoading>
    </div>
  )
}
