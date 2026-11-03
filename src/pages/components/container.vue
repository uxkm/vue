<template>
  <DemoShell category="레이아웃" title="Container" description="Vue 3 · Container — size · fluid">
    <div class="demo-block">
      <h2 class="demo-block__title">기본</h2>
      <Container>
        <div style="background:#ccfbf1;padding:16px;border-radius:8px;">
          기본 Container 내부 영역
        </div>
      </Container>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">size sm · fluid</h2>
      <Container size="sm">
        <div style="background:#e0f2fe;padding:16px;border-radius:8px;margin-bottom:12px;">
          container_sm
        </div>
      </Container>
      <Container fluid>
        <div style="background:#fef9c3;padding:16px;border-radius:8px;">
          Fluid Container
        </div>
      </Container>
    </div>
  </DemoShell>
</template>

<script>
import DemoShell from '@/components/publish/DemoShell.vue'
import { Container } from '@/components'

export default {
  name: 'ContainerPage',
  components: { DemoShell, Container }
}
</script>
