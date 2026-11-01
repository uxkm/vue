<template>
  <DemoShell category="폼" title="Select" description="Vue 2.6 · Select — size · error · v-model">
    <Space vertical :size="12">
      <Select
        v-model="selected"
        placeholder="옵션을 선택하세요"
        :options="options"
      />
      <Select v-model="selected" size="sm" :options="options" />
      <Select v-model="selected" :options="options" error />
      <Select v-model="selected" :options="options" disabled />
      <p>선택값: {{ selected || '-' }}</p>
    </Space>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Select, Space } from '@/components'

export default {
  name: 'SelectPage',
  components: { DemoShell, Select, Space },
  data: function () {
    return {
      selected: '',
      options: [
        { value: 'a', label: '옵션 A' },
        { value: 'b', label: '옵션 B' },
        { value: 'c', label: '옵션 C' }
      ]
    }
  }
}
</script>
