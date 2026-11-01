<template>
  <DemoShell category="피드백" title="Empty" description="Vue 2.6 · Empty — description · footer">
    <Space vertical gap="lg">
      <Empty description="표시할 항목이 없습니다">
        <Button label="새로고침" size="sm" />
      </Empty>
      <Empty description="검색 결과 없음" simple />
    </Space>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Empty, Button, Space } from '@/components'

export default {
  name: 'EmptyPage',
  components: { DemoShell, Empty, Button, Space }
}
</script>
