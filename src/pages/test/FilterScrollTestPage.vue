<template>
  <div class="wbs filter-scroll-test">
    <header class="filter-scroll-test__head">
      <router-link class="filter-scroll-test__back" to="/">← Publish List</router-link>
      <h1 class="filter-scroll-test__title">필터 하위목록 가로 스크롤 테스트</h1>
      <p class="filter-scroll-test__desc">
        하위 칩이 많을 때 <code>.wbs-filter-subs</code> 에 가로 스크롤이 생기는지 확인합니다.
      </p>
    </header>

    <div class="wbs-filter-bar">
      <button
        type="button"
        class="wbs-filter-btn is-active"
        aria-label="필터, 로그인"
      >
        <span class="wbs-filter-btn__label">로그인</span>
        <span class="wbs-filter-btn__icon" aria-hidden="true">▾</span>
      </button>
      <div class="wbs-filter-selected">
        <span class="wbs-filter-selected__sep" aria-hidden="true"></span>
        <ul
          ref="subs"
          class="wbs-filter-subs"
          aria-label="선택한 화면명 하위 목록"
        >
          <li
            v-for="n in chipCount"
            :key="'chip-' + n"
          >
            <span class="wbs-filter-sub is-static">로그인 화면 {{ pad(n) }}</span>
          </li>
        </ul>
      </div>
    </div>

    <dl class="filter-scroll-test__meta">
      <div>
        <dt>칩 개수</dt>
        <dd>{{ chipCount }}</dd>
      </div>
      <div>
        <dt>scrollWidth</dt>
        <dd>{{ metrics.scrollWidth }}</dd>
      </div>
      <div>
        <dt>clientWidth</dt>
        <dd>{{ metrics.clientWidth }}</dd>
      </div>
      <div>
        <dt>가로 스크롤</dt>
        <dd :class="{ 'is-ok': metrics.canScrollX, 'is-fail': !metrics.canScrollX }">
          {{ metrics.canScrollX ? '있음 (OK)' : '없음 (FAIL)' }}
        </dd>
      </div>
    </dl>

    <div class="filter-scroll-test__actions">
      <button type="button" class="wbs-btn" @click="setCount(5)">칩 5개</button>
      <button type="button" class="wbs-btn" @click="setCount(20)">칩 20개</button>
      <button type="button" class="wbs-btn" @click="setCount(40)">칩 40개</button>
      <button type="button" class="wbs-btn" @click="measure">다시 측정</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterScrollTestPage',
  data: function () {
    return {
      chipCount: 40,
      metrics: {
        scrollWidth: 0,
        clientWidth: 0,
        canScrollX: false
      }
    }
  },
  mounted: function () {
    this.measure()
    window.addEventListener('resize', this.measure)
  },
  beforeUnmount: function () {
    window.removeEventListener('resize', this.measure)
  },
  methods: {
    pad: function (n) {
      var s = String(n)
      return s.length < 2 ? '0' + s : s
    },
    setCount: function (n) {
      this.chipCount = n
      this.$nextTick(this.measure)
    },
    measure: function () {
      var el = this.$refs.subs
      if (!el) return
      var scrollWidth = el.scrollWidth
      var clientWidth = el.clientWidth
      this.metrics = {
        scrollWidth: scrollWidth,
        clientWidth: clientWidth,
        canScrollX: scrollWidth > clientWidth + 1
      }
    }
  }
}
</script>

<style lang="scss" src="@/styles/pages/_wbs-index.scss"></style>

<style lang="scss" scoped>
.filter-scroll-test {
  &__head {
    margin: 0 0 24px;
  }

  &__back {
    display: inline-block;
    margin-bottom: 12px;
    color: var(--accent, #0f766e);
    font-size: 13px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__title {
    margin: 0 0 8px;
    font-size: 24px;
    font-weight: 700;
  }

  &__desc {
    margin: 0;
    color: var(--muted, #5b6b7c);
    font-size: 14px;
    line-height: 1.5;

    code {
      font-size: 12px;
    }
  }

  &__meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin: 20px 0 0;
    padding: 16px;
    border: 1px solid var(--line, #d7e0e7);
    border-radius: 12px;
    background: #fff;

    div {
      margin: 0;
    }

    dt {
      margin: 0 0 4px;
      font-size: 11px;
      font-weight: 700;
      color: var(--muted, #5b6b7c);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    dd {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;

      &.is-ok {
        color: #067647;
      }

      &.is-fail {
        color: #b42318;
      }
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }
}
</style>
