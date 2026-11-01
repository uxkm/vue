<template>
  <DemoShell category="레이아웃" title="Divider" description="Vue 2.6 · Divider — vertical · dashed · label">
    <div class="demo-block">
      <h2 class="demo-block__title">가로</h2>
      <p>위 영역</p>
      <Divider />
      <p>아래 영역</p>
      <Divider dashed />
      <Divider label="또는" />
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">세로</h2>
      <div class="demo-row">
        <span>왼쪽</span>
        <Divider vertical />
        <span>오른쪽</span>
      </div>
    </div>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Divider } from '@/components'

export default {
  name: 'DividerPage',
  components: { DemoShell, Divider }
}
</script>
