<template>
  <DemoShell category="피드백" title="Progress" description="Vue 2.6 · Progress — percent · status · show-info">
    <Space vertical :size="14">
      <Progress :percent="25" show-info />
      <Progress :percent="62" show-info color="success" />
      <Progress :percent="100" status="success" show-info />
      <Progress :percent="40" status="exception" show-info />
      <Progress :percent="150" show-info label="클램프 100%" />
      <Progress indeterminate />
    </Space>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Progress, Space } from '@/components'

export default {
  name: 'ProgressPage',
  components: { DemoShell, Progress, Space }
}
</script>
