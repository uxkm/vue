<template>
  <DemoShell category="레이아웃" title="Space" description="Vue 2.6 · Space — gap · align · justify">
    <div class="demo-block">
      <h2 class="demo-block__title">가로 gap</h2>
      <Space gap="sm">
        <Button label="A" />
        <Button label="B" variant="outline" />
        <Button label="C" variant="ghost" />
      </Space>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">세로 · between</h2>
      <Space gap="lg" vertical>
        <Button label="Item 1" block />
        <Button label="Item 2" block variant="outline" />
      </Space>
    </div>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Space, Button } from '@/components'

export default {
  name: 'SpacePage',
  components: { DemoShell, Space, Button }
}
</script>
