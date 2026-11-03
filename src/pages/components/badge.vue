<template>
  <DemoShell category="데이터 표시" title="Badge" description="Vue 3 · Badge — color · size · count · dot">
    <div class="demo-block">
      <h2 class="demo-block__title">색상</h2>
      <div class="demo-row">
        <Badge color="primary">Primary</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="danger">Danger</Badge>
        <Badge color="info">Info</Badge>
        <Badge color="muted">Muted</Badge>
      </div>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">크기 · count · dot</h2>
      <div class="demo-row">
        <Badge size="sm" label="sm" />
        <Badge size="md" label="md" />
        <Badge size="lg" label="lg" />
        <Badge count>99+</Badge>
        <Badge dotOnly color="danger" aria-label="알림" />
      </div>
    </div>
  </DemoShell>
</template>

<script>
import DemoShell from '@/components/publish/DemoShell.vue'
import { Badge } from '@/components'

export default {
  name: 'BadgePage',
  components: { DemoShell, Badge }
}
</script>
