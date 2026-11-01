<template>
  <div class="login">
    <Footer hidden />

    <Header>
      <template #brand>
        <router-link class="app-header__brand" to="/pc/login">로그인</router-link>
      </template>
      <template #nav>
        <router-link class="app-header__link" to="/pc/login">메뉴 메인</router-link>
        <router-link class="app-header__link" to="/pc/login/01">로그인 01</router-link>
      </template>
      <template #actions>
        <router-link class="app-header__link" to="/">목록으로</router-link>
      </template>
    </Header>

    <PageLoading :loading="loading">
      <template #skeleton>
        <Skeleton01 />
      </template>

      <div class="page">
        <p>0. 로그인</p>
        <h1>로그인 01</h1>
        <dl>
          <div>
            <dt>Screen Type</dt>
            <dd>Page</dd>
          </div>
          <div>
            <dt>Screen ID</dt>
            <dd>PC-LOGIN-001</dd>
          </div>
          <div>
            <dt>PageUrl</dt>
            <dd>#/pc/login/01</dd>
          </div>
        </dl>
        <p>
          로그인 메뉴 퍼블리시 화면입니다. 시안·마크업을 이 페이지에 연결해 작업하세요.
        </p>
      </div>
    </PageLoading>
  </div>
</template>

<script>
import { Header, Footer, PageLoading } from '@/components'
import Skeleton01 from './skeleton/01Skeleton'

export default {
  name: 'PcLoginScreen01',
  components: {
    Header: Header,
    Footer: Footer,
    PageLoading: PageLoading,
    Skeleton01: Skeleton01
  },
  data: function () {
    return {
      loading: true
    }
  },
  mounted: function () {
    var self = this
    // 페이지 진입 로딩 예시 (실제 API 연동 시 교체)
    this._loadingTimer = window.setTimeout(function () {
      self._loadingTimer = null
      self.loading = false
    }, 700)
  },
  beforeUnmount: function () {
    if (this._loadingTimer) {
      window.clearTimeout(this._loadingTimer)
      this._loadingTimer = null
    }
  }
}
</script>
