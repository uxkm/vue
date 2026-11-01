<template>
  <DemoShell category="데이터 표시" title="Card" description="Vue 2.6 · Card — variant · title · slots">
    <Space vertical :size="16">
      <Card title="title prop" subtitle="부제목">
        prop으로 제목을 지정한 카드입니다.
      </Card>
      <Card variant="shadow" hoverable>
        <span slot="title">title 슬롯</span>
        슬롯으로 제목을 넣은 카드입니다.
      </Card>
      <Card variant="flat" size="sm">
        제목 없는 본문만 있는 카드입니다.
      </Card>
    </Space>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Card, Space } from '@/components'

export default {
  name: 'CardPage',
  components: { DemoShell, Card, Space }
}
</script>
