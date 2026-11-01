<template>
  <DemoShell category="폼" title="Input" description="Vue 2.6 · Input — size · clearable · error">
    <Space vertical :size="12">
      <Input v-model="text" placeholder="내용을 입력하세요" clearable />
      <Input size="sm" v-model="text" placeholder="Small" />
      <Input size="lg" type="password" v-model="password" placeholder="비밀번호" />
      <Input value="읽기 전용" readonly />
      <Input value="에러" error />
      <Input value="비활성" disabled />
      <p>입력값: {{ text || '-' }}</p>
    </Space>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Input, Space } from '@/components'

export default {
  name: 'InputPage',
  components: { DemoShell, Input, Space },
  data: function () {
    return {
      text: '',
      password: ''
    }
  }
}
</script>
