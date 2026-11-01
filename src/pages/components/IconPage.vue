<template>
  <DemoShell
    category="기본 요소"
    title="Icon"
    description="Vue 3 · Icon — size · color · spin · circle · button 조합을 확인합니다."
  >
    <div class="demo-block">
      <h2 class="demo-block__title">크기</h2>
      <div class="demo-row">
        <Icon name="★" size="sm" />
        <Icon name="★" size="md" />
        <Icon name="★" size="lg" />
        <Icon name="★" size="xl" />
      </div>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">색상</h2>
      <div class="demo-row">
        <Icon name="●" color="primary" size="lg" />
        <Icon name="●" color="success" size="lg" />
        <Icon name="●" color="warning" size="lg" />
        <Icon name="●" color="danger" size="lg" />
        <Icon name="●" color="muted" size="lg" />
      </div>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">변형</h2>
      <div class="demo-row">
        <Icon name="↻" spin size="lg" aria-label="로딩" />
        <Icon name="★" circle color="primary" />
        <Icon name="★" square color="muted" />
        <Icon name="♥" circle pulse color="danger" aria-label="알림" />
        <Icon name="☰" button aria-label="메뉴" />
      </div>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">인라인</h2>
      <p>
        텍스트와
        <Icon name="→" inline color="primary" aria-label="다음" />
        함께 사용합니다.
      </p>
    </div>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Icon } from '@/components'

export default {
  name: 'IconPage',
  components: { DemoShell, Icon }
}
</script>
