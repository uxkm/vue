<template>
  <DemoShell category="기본 요소" title="Typography" description="Vue 3 · Typography — title · variant · color">
    <div class="demo-block">
      <h2 class="demo-block__title">Title (level)</h2>
      <Typography :level="1">Heading 1</Typography>
      <Typography :level="2">Heading 2</Typography>
      <Typography :level="3">Heading 3</Typography>
      <Typography :level="4">Heading 4</Typography>
      <Typography :level="5">Heading 5</Typography>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">Text variant</h2>
      <Typography>기본 본문 텍스트입니다.</Typography>
      <Typography variant="lead">Lead 문단입니다.</Typography>
      <Typography variant="caption">Caption 텍스트</Typography>
      <Typography color="muted">Muted 본문</Typography>
      <Typography variant="strong">Strong</Typography>
      <Typography size="sm" color="muted">Small muted</Typography>
    </div>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Typography } from '@/components'

export default {
  name: 'TypographyPage',
  components: { DemoShell, Typography }
}
</script>
