<template>
  <div class="library-package">
    <PageLoading :loading="loading">
      <template #skeleton>
        <Skeleton01 />
      </template>
      <div class="page">
        <p>10. 라이브러리패키지</p>
        <h1>라이브러리패키지 01</h1>
        <dl>
          <div>
            <dt>Screen Type</dt>
            <dd>Page</dd>
          </div>
          <div>
            <dt>Screen ID</dt>
            <dd>MO-LIBRAR-001</dd>
          </div>
          <div>
            <dt>PageUrl</dt>
            <dd>#/mobile/library-package/01</dd>
          </div>
        </dl>
        <p>
          라이브러리패키지 메뉴 퍼블리시 화면입니다. 시안·마크업을 이 페이지에 연결해 작업하세요.
        </p>
      </div>
    </PageLoading>
  </div>
</template>

<script>
import { PageLoading } from '@/components'
import Skeleton01 from './skeleton/01Skeleton'

export default {
  name: 'MobileLibraryPackageScreen01',
  components: {
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
    window.setTimeout(function () {
      self.loading = false
    }, 700)
  }
}
</script>
