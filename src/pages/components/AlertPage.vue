<template>
  <DemoShell category="피드백" title="Alert" description="Vue 2.6 · Alert — color · closable · icon">
    <Space vertical :size="10">
      <Alert color="info" title="정보">정보 알림입니다.</Alert>
      <Alert color="success">성공 알림입니다.</Alert>
      <Alert color="warning" closable>경고 알림입니다.</Alert>
      <Alert color="danger" :show-icon="false">아이콘 없는 위험 알림</Alert>
    </Space>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Alert, Space } from '@/components'

export default {
  name: 'AlertPage',
  components: { DemoShell, Alert, Space }
}
</script>
