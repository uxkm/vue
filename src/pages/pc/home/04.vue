<template>
  <div class="home">
    <Header hidden />
    <Footer hidden />

    <PageLoading :loading="loading">
      <template #skeleton>
        <Skeleton01 />
      </template>

      <div class="sds-home">
        <header class="sds-header">
          <a class="sds-header__brand" href="#hero" @click.prevent="scrollTop">Samsung SDS</a>
          <nav class="sds-header__nav" aria-label="주요 메뉴">
            <a
              v-for="item in nav"
              :key="item.id"
              class="sds-header__link"
              :class="{ 'is-active': activeNav === item.id }"
              :href="'#' + item.id"
              @click.prevent="go(item.id)"
            >{{ item.label }}</a>
          </nav>
          <button type="button" class="sds-header__search" aria-label="검색">⌕</button>
        </header>

        <section id="hero" class="sds-kv">
          <div class="sds-kv__intro">
            <p class="sds-kv__tag" data-fx="up">DIGITAL TRANSFORMATION</p>
            <h1 class="sds-kv__title" data-fx="up" data-fx-delay="70">
              <span class="sds-kv__grad">내일</span>의 기술을<br />
              <span class="sds-kv__grad">내 일</span>의 기술로
            </h1>
            <p class="sds-kv__desc" data-fx="up" data-fx-delay="120">클라우드·AI·물류·보안으로 기업의 디지털 전환을 끝까지 동행합니다.</p>
          </div>
          <div class="sds-bento">
            <a
              v-for="(card, index) in bento"
              :key="card.id"
              class="sds-bento__card"
              :class="'is-' + card.tone + (index === 0 ? ' is-wide' : '')"
              href="#insights"
              data-fx="up"
              :data-fx-delay="String(index * 70)"
            >
              <div v-if="card.image" class="sds-bento__media" :style="{ backgroundImage: 'url(' + card.image + ')' }"></div>
              <div class="sds-bento__body">
                <span class="sds-bento__label">{{ card.label }}</span>
                <strong class="sds-bento__name">{{ card.title }}</strong>
                <span class="sds-bento__more">자세히 보기 ›</span>
              </div>
            </a>
          </div>
        </section>

        <section id="stats" class="sds-stats">
          <div class="sds-stats__inner">
            <p class="sds-section__eyebrow" data-fx="up">AT A GLANCE</p>
            <h2 class="sds-section__title" style="margin-bottom:28px" data-fx="up" data-fx-delay="50">한눈에 보기</h2>
            <div class="sds-stats__grid">
              <div
                v-for="(item, stIdx) in stats"
                :key="item.id"
                class="sds-stats__item"
                data-fx="up"
                :data-fx-delay="String(stIdx * 80)"
              >
                <strong class="sds-stats__value">{{ item.display }}{{ item.suffix }}</strong>
                <span class="sds-stats__label">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" class="sds-section">
          <div class="sds-section__head" data-fx="up">
            <div>
              <p class="sds-section__eyebrow">SOLUTIONS</p>
              <h2 class="sds-section__title">비즈니스 혁신을 가속하는<br />디지털 솔루션</h2>
            </div>
            <div class="sds-tabs" role="tablist">
              <button
                v-for="(tab, index) in solutionTabs"
                :key="tab"
                type="button"
                class="sds-tabs__btn"
                :class="{ 'is-active': solutionIndex === index }"
                @click="solutionIndex = index"
              >{{ tab }}</button>
            </div>
          </div>
          <div class="sds-solutions">
            <article
              v-for="(item, solIdx) in filteredSolutions"
              :key="item.id"
              class="sds-solutions__card"
              data-fx="up"
              :data-fx-delay="String(solIdx * 70)"
            >
              <h3 class="sds-solutions__name">{{ item.name }}</h3>
              <p class="sds-solutions__text">{{ item.text }}</p>
            </article>
          </div>
        </section>

        <section id="insights" class="sds-insight">
          <div class="sds-insight__inner">
            <p class="sds-section__eyebrow">INSIGHTS</p>
            <h2 class="sds-section__title" style="margin-bottom:28px">인사이트 &amp; 뉴스</h2>
            <div class="sds-insight__grid">
              <a
                v-for="(item, index) in insights"
                :key="item.id"
                class="sds-insight__card"
                :class="{ 'sds-insight__card--wide': index === 0 }"
                href="#insights"
                data-fx="up"
                :data-fx-delay="String(index * 80)"
              >
                <div
                  class="sds-insight__media"
                  :style="{ backgroundImage: 'url(' + item.image + ')' }"
                ></div>
                <div class="sds-insight__body">
                  <div class="sds-insight__label">{{ item.label }}</div>
                  <h3 class="sds-insight__title">{{ item.title }}</h3>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section id="careers" class="sds-banner" data-fx="up">
          <div>
            <h2 class="sds-banner__title">함께 성장할 인재를 찾습니다</h2>
            <p class="sds-banner__desc">클라우드·AI·물류 디지털 전환을 이끌 동료를 기다립니다.</p>
          </div>
          <a class="sds-banner__btn" href="#careers">채용 바로가기</a>
        </section>

        <p class="sds-foot">UI 레퍼런스: samsungsds.com · Home 04 (#/pc/home/04)</p>
      </div>
    </PageLoading>
  </div>
</template>

<script>
import { Header, Footer, PageLoading } from '@/components'
import Skeleton01 from './skeleton/01Skeleton'
import homeScrollFx from '@/mixins/homeScrollFx'

export default {
  name: 'PcHomeScreen04',
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
      solutionIndex: 0,
      activeNav: 'solutions',
      statsAnimated: false,
      nav: [
        { id: 'solutions', label: '솔루션' },
        { id: 'insights', label: '인사이트' },
        { id: 'careers', label: '채용' }
      ],
      bento: [
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
      ],
      stats: [
        { id: 'st1', label: '글로벌 사업 지역', target: 50, suffix: '+', display: 0 },
        { id: 'st2', label: '디지털 전환 프로젝트', target: 1200, suffix: '+', display: 0 },
        { id: 'st3', label: '평균 경력 연수', target: 12, suffix: '년', display: 0 }
      ],
      solutionTabs: ['전체', '클라우드', 'AI', '물류', '보안'],
      solutions: [
        { id: 's1', tab: '클라우드', name: 'Enterprise Cloud', text: '하이브리드 클라우드 전환과 운영 최적화를 지원합니다.' },
        { id: 's2', tab: 'AI', name: 'AI Factory', text: '업무에 바로 붙는 AI 서비스와 MLOps 기반을 제공합니다.' },
        { id: 's3', tab: '물류', name: 'Digital Logistics', text: '글로벌 물류 가시성과 자동화로 공급망을 고도화합니다.' },
        { id: 's4', tab: '보안', name: 'Cyber Security', text: '위협 탐지부터 대응까지 통합 보안 체계를 구축합니다.' },
        { id: 's5', tab: '클라우드', name: 'Data Platform', text: '분산된 데이터를 연결해 의사결정 속도를 높입니다.' },
        { id: 's6', tab: 'AI', name: 'Intelligent Ops', text: '운영 데이터를 학습해 장애 예측과 자동 대응을 돕습니다.' }
      ],
      insights: [
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
    }
  },
  computed: {
    filteredSolutions: function () {
      var tab = this.solutionTabs[this.solutionIndex]
      if (tab === '전체') return this.solutions
      return this.solutions.filter(function (item) {
        return item.tab === tab
      })
    }
  },
  watch: {
    solutionIndex: function () {
      var self = this
      this.$nextTick(function () {
        if (typeof self.setupHomeScrollFx === 'function') self.setupHomeScrollFx()
      })
    }
  },
  mounted: function () {
    var self = this
    window.setTimeout(function () {
      self.loading = false
      window.addEventListener('scroll', self.onScroll, { passive: true })
      self.onScroll()
    }, 450)
  },
  beforeDestroy: function () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    animateStats: function () {
      if (this.statsAnimated) return
      this.statsAnimated = true
      var self = this
      this.stats.forEach(function (stat, index) {
        var start = null
        var duration = 1200
        var step = function (ts) {
          if (!start) start = ts
          var p = Math.min(1, (ts - start) / duration)
          var eased = 1 - Math.pow(1 - p, 3)
          self.$set(self.stats[index], 'display', Math.round(stat.target * eased))
          if (p < 1) window.requestAnimationFrame(step)
        }
        window.requestAnimationFrame(step)
      })
    },
    onScroll: function () {
      var ids = ['solutions', 'insights', 'careers']
      var current = ids[0]
      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i])
        if (!el) continue
        if (el.getBoundingClientRect().top - 100 <= 0) current = ids[i]
      }
      this.activeNav = current
      var statsEl = document.getElementById('stats')
      if (statsEl && statsEl.getBoundingClientRect().top < window.innerHeight * 0.85) {
        this.animateStats()
      }
    },
    go: function (id) {
      var el = document.getElementById(id)
      if (!el) return
      window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - 70, behavior: 'smooth' })
    },
    scrollTop: function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="scss" src="@/styles/pages/_pc-home-04.scss"></style>
