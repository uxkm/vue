<template>
  <DemoShell category="네비게이션" title="Tabs" description="Vue 3 · Tabs — variant · v-model">
    <div class="demo-block">
      <h2 class="demo-block__title">line</h2>
      <Tabs v-model="tab" :tabs="tabs">
        <p v-if="tab === 'a'">탭 A 콘텐츠</p>
        <p v-else-if="tab === 'b'">탭 B 콘텐츠</p>
        <p v-else>탭 C 콘텐츠</p>
      </Tabs>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">pill</h2>
      <Tabs v-model="tab" :tabs="tabs" variant="pill" />
    </div>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Tabs } from '@/components'

export default {
  name: 'TabsPage',
  components: { DemoShell, Tabs },
  data: function () {
    return {
      tab: 'a',
      tabs: [
        { value: 'a', label: '탭 A' },
        { value: 'b', label: '탭 B' },
        { value: 'c', label: '탭 C' }
      ]
    }
  }
}
</script>
