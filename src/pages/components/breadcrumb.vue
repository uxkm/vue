<template>
  <DemoShell category="네비게이션" title="Breadcrumb" description="Vue 3 · Breadcrumb — separator">
    <Space vertical :size="16">
      <Breadcrumb :items="items" />
      <Breadcrumb :items="items" separator="slash" />
      <Breadcrumb :items="items" separator="dot" size="sm" />
    </Space>
  </DemoShell>
</template>

<script>
import DemoShell from '@/components/publish/DemoShell.vue'
import { Breadcrumb, Space } from '@/components'

export default {
  name: 'BreadcrumbPage',
  components: { DemoShell, Breadcrumb, Space },
  data: function () {
    return {
      items: [
        { label: 'WBS', href: '#/' },
        { label: '컴포넌트', href: '#/components/button' },
        { label: 'Breadcrumb' }
      ]
    }
  }
}
</script>
