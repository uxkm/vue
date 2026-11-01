<template>
  <div class="home">
    <Header hidden />
    <Footer hidden />

    <PageLoading :loading="loading">
      <template #skeleton>
        <Skeleton01 />
      </template>

      <div class="toss-home" :class="{ 'is-scrolled': scrolled }">
        <header class="toss-header" :class="{ 'is-scrolled': scrolled }">
          <a class="toss-header__brand" href="#hero" @click.prevent="scrollTop">
            toss place
            <span class="toss-header__sub">대리점 홈페이지</span>
          </a>
          <nav class="toss-header__nav" aria-label="주요 메뉴">
            <a v-for="item in nav" :key="item" class="toss-header__link" href="#features">{{ item }}</a>
          </nav>
          <div class="toss-header__actions">
            <a class="toss-header__link" href="#cta">상담 받기</a>
            <a class="toss-header__link" href="#cta">포스 무료 다운로드</a>
          </div>
        </header>

        <section id="hero" class="toss-hero">
          <div class="fx-parallax-clip" style="position:absolute;inset:0">
            <div
              class="toss-hero__photo"
              data-parallax="0.3"
              :style="{ backgroundImage: 'url(' + industries[industryIndex].image + ')' }"
            ></div>
          </div>
          <div class="toss-hero__mosaic" aria-hidden="true">
            <div
              v-for="shot in mosaic"
              :key="shot.id"
              class="toss-hero__shot"
              :style="shot.style"
            >
              <img :src="shot.src" alt="" />
            </div>
          </div>
          <div class="toss-hero__stage">
            <p class="toss-hero__count" data-fx="up">{{ displayCount.toLocaleString() }} 매장의 선택</p>
            <h1 class="toss-hero__title" data-fx="up" data-fx-delay="80">잘 되는 {{ industries[industryIndex].label }}의 기준</h1>
            <div class="toss-chips" role="tablist" aria-label="업종 선택">
              <button
                v-for="(item, index) in industries"
                :key="item.label"
                type="button"
                class="toss-chips__btn"
                :class="{ 'is-active': industryIndex === index }"
                @click="selectIndustry(index)"
              >{{ item.label }}</button>
            </div>
            <div class="toss-hero__actions">
              <a class="toss-hero__btn toss-hero__btn--primary" href="#cta">상담 받기</a>
              <a class="toss-hero__btn toss-hero__btn--ghost" href="#cta">포스 다운로드</a>
            </div>
          </div>
          <button type="button" class="toss-hero__scroll" @click="go('features')">
            끝까지 스크롤 해주세요
            <span aria-hidden="true">↓</span>
          </button>
        </section>

        <!-- sticky + 내부 장면 전환 (CSS sticky + 스크롤 진행) -->
        <div ref="scrollTrack" class="fx-sticky-track toss-story-track">
          <div class="fx-sticky-pin toss-story-pin">
            <div class="toss-story-pin__inner">
              <p class="toss-section__eyebrow" style="color:#6bb1ff">스크롤 스토리</p>
              <h2 class="toss-story-pin__title">{{ storySteps[stickyStep].title }}</h2>
              <p class="toss-story-pin__desc">{{ storySteps[stickyStep].desc }}</p>
              <div class="toss-story-pin__dots">
                <span
                  v-for="(step, idx) in storySteps"
                  :key="step.id"
                  :class="{ 'is-active': stickyStep === idx }"
                ></span>
              </div>
            </div>
            <div
              class="toss-story-pin__visual"
              :style="{ backgroundImage: 'url(' + storySteps[stickyStep].image + ')' }"
            ></div>
          </div>
        </div>

        <section id="features" class="toss-section">
          <p class="toss-section__eyebrow" data-fx="up">자주 쓰는 기능이에요</p>
          <h2 class="toss-section__title" data-fx="up" data-fx-delay="60">매장 운영이 쉬워지는<br />결제·포스 솔루션</h2>
          <p class="toss-section__desc" data-fx="up" data-fx-delay="100">업종별 기능과 추천 조합으로 사장님의 하루를 단순하게 만듭니다.</p>
          <div class="toss-features">
            <article
              v-for="(item, fIdx) in features"
              :key="item.id"
              class="toss-features__card"
              data-fx="up"
              :data-fx-delay="String(fIdx * 80)"
            >
              <div class="toss-features__icon">{{ item.icon }}</div>
              <h3 class="toss-features__name">{{ item.name }}</h3>
              <p class="toss-features__text">{{ item.text }}</p>
              <a class="toss-features__more" href="#features">자세히 ›</a>
            </article>
          </div>
        </section>

        <section id="story" class="toss-story">
          <div class="toss-story__inner">
            <p class="toss-section__eyebrow" style="color:#6bb1ff">사장님 스토리</p>
            <h2 class="toss-section__title" style="color:#fff;margin-bottom:28px">현장의 선택이<br />성장의 기준이 됩니다</h2>
            <div class="toss-story__grid">
              <div class="toss-story__media">
                <img :src="stories[storyIndex].image" :alt="stories[storyIndex].who" />
              </div>
              <div class="toss-story__panel">
                <p class="toss-story__quote">“{{ stories[storyIndex].quote }}”</p>
                <p class="toss-story__who">{{ stories[storyIndex].who }}</p>
                <div style="margin-top:24px;display:flex;gap:8px">
                  <button
                    v-for="(s, i) in stories"
                    :key="s.id"
                    type="button"
                    class="toss-hero__btn"
                    :class="storyIndex === i ? 'toss-hero__btn--primary' : 'toss-hero__btn--ghost'"
                    style="min-height:36px;padding:0 14px;font-size:13px"
                    @click="storyIndex = i"
                  >{{ i + 1 }}</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" class="toss-cta">
          <h2 class="toss-cta__title">지금 바로 매장에 도입해 보세요</h2>
          <p class="toss-cta__desc">상담부터 설치·교육까지 한 번에 안내드립니다.</p>
          <div class="toss-cta__actions">
            <a class="toss-hero__btn toss-hero__btn--primary" href="#cta">상담 받기</a>
            <a class="toss-hero__btn toss-hero__btn--ghost" href="#cta">포스 다운로드</a>
          </div>
        </section>

        <p class="toss-foot">UI 레퍼런스: tossplace.com · Home 03 (#/pc/home/03)</p>

        <div class="toss-sticky" aria-label="빠른 상담">
          <p class="toss-sticky__text">매장에 맞는 조합, 지금 상담받아 보세요</p>
          <a class="toss-hero__btn toss-hero__btn--primary" href="#cta">상담 받기</a>
        </div>
        <button type="button" class="toss-fab" aria-label="채팅 상담" @click="go('cta')">💬</button>
      </div>
    </PageLoading>
  </div>
</template>

<script>
import { Header, Footer, PageLoading } from '@/components'
import Skeleton01 from './skeleton/01Skeleton'
import homeScrollFx from '@/mixins/homeScrollFx'

export default {
  name: 'PcHomeScreen03',
  mixins: [homeScrollFx],
  components: {
    Header: Header,
    Footer: Footer,
    PageLoading: PageLoading,
    Skeleton01: Skeleton01
  },
  data: function () {
    return {
      loading: true,
      scrolled: false,
      stickyStep: 0,
      storySteps: [
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
      ],
      displayCount: 0,
      targetCount: 440000,
      countTimer: null,
      industryIndex: 0,
      industryTimer: null,
      industries: [
        { label: '매장', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80' },
        { label: '식당', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80' },
        { label: '카페', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80' },
        { label: '리테일', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80' }
      ],
      storyIndex: 0,
      nav: ['제품 소개', '업종별 기능', '추천 조합', '사장님 스토리', '혜택', '고객 지원'],
      mosaic: [
        { id: 'm1', src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80', style: 'top:12%;left:6%;width:180px;height:120px;transform:rotate(-6deg)' },
        { id: 'm2', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', style: 'top:10%;right:8%;width:200px;height:130px;transform:rotate(5deg)' },
        { id: 'm3', src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', style: 'top:42%;left:4%;width:140px;height:190px;transform:rotate(3deg)' },
        { id: 'm4', src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=600&q=80', style: 'top:40%;right:5%;width:150px;height:200px;transform:rotate(-4deg)' },
        { id: 'm5', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80', style: 'bottom:12%;left:18%;width:190px;height:120px;transform:rotate(-2deg)' },
        { id: 'm6', src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80', style: 'bottom:10%;right:16%;width:210px;height:130px;transform:rotate(4deg)' }
      ],
      features: [
        { id: 'f1', icon: 'P', name: '포스·결제', text: '테이블·키오스크·모바일 결제를 하나의 흐름으로 연결합니다.' },
        { id: 'f2', icon: 'K', name: '키오스크', text: '주문·결제를 줄이고 회전율을 높이는 셀프 주문 흐름입니다.' },
        { id: 'f3', icon: 'S', name: '재고·매출', text: '실시간 매출과 재고를 한눈에 보고 운영 결정을 빠르게 합니다.' },
        { id: 'f4', icon: 'A', name: '업종 맞춤', text: '식당·카페·리테일 등 업종별 추천 조합을 제공합니다.' }
      ],
      stories: [
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
    }
  },
  mounted: function () {
    var self = this
    this._loadingTimer = window.setTimeout(function () {
      self._loadingTimer = null
      self.loading = false
      self.$nextTick(function () {
        self.animateCount()
        self.startIndustryTimer()
        window.addEventListener('scroll', self.onScroll, { passive: true })
        self.onScroll()
      })
    }, 450)
  },
  beforeUnmount: function () {
    if (this._loadingTimer) {
      window.clearTimeout(this._loadingTimer)
      this._loadingTimer = null
    }
    if (this.countTimer) window.cancelAnimationFrame(this.countTimer)
    if (this.industryTimer) window.clearInterval(this.industryTimer)
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll: function () {
      this.scrolled = window.pageYOffset > 40
    },
    startIndustryTimer: function () {
      var self = this
      if (this.industryTimer) window.clearInterval(this.industryTimer)
      this.industryTimer = window.setInterval(function () {
        self.industryIndex = (self.industryIndex + 1) % self.industries.length
      }, 2800)
    },
    selectIndustry: function (index) {
      this.industryIndex = index
      this.startIndustryTimer()
    },
    animateCount: function () {
      var self = this
      var start = null
      var duration = 1600
      var from = 0
      var to = this.targetCount
      var step = function (ts) {
        if (!start) start = ts
        var p = Math.min(1, (ts - start) / duration)
        var eased = 1 - Math.pow(1 - p, 3)
        self.displayCount = Math.round(from + (to - from) * eased)
        if (p < 1) self.countTimer = window.requestAnimationFrame(step)
      }
      this.countTimer = window.requestAnimationFrame(step)
    },
    go: function (id) {
      var el = document.getElementById(id)
      if (!el) return
      window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - 16, behavior: 'smooth' })
    },
    scrollTop: function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    onStickyProgress: function (p) {
      var max = this.storySteps.length - 1
      this.stickyStep = Math.min(max, Math.floor(p * this.storySteps.length))
    }
  }
}
</script>

<style lang="scss" src="@/styles/pages/_pc-home-03.scss"></style>
