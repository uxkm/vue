<template>
  <div class="login">
    <Header hidden />
    <Footer hidden />

    <PageLoading :loading="loading" skeleton="card">
      <div class="page">
        <p>PC 메뉴</p>
        <h1>0. 로그인</h1>
        <p>
          로그인 메뉴 메인입니다. 하위 화면을 선택하세요.
        </p>
        <ul>
          <li>
            <router-link :to="'/pc/login/01'">로그인 01</router-link>
          </li>
        </ul>
      </div>
    </PageLoading>
  </div>
</template>

<script>
import { Header, Footer, PageLoading } from '@/components'

export default {
  name: 'PcLoginPage',
  components: {
    Header: Header,
    Footer: Footer,
    PageLoading: PageLoading
  },
  data: function () {
    return {
      loading: true
    }
  },
  mounted: function () {
    var self = this
    // 페이지 진입 로딩 예시 (실제 API 연동 시 교체)
    window.setTimeout(function () {
      self.loading = false
    }, 700)
  }
}
</script>
