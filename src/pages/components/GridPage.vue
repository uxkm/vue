<template>
  <DemoShell category="레이아웃" title="Grid" description="Vue 2.6 · Grid — cols · gap">
    <div class="demo-block">
      <h2 class="demo-block__title">3열</h2>
      <Grid :cols="3" :gap="12">
        <div
          v-for="n in 6"
          :key="'a-' + n"
          style="background:#eef2f6;padding:16px;border-radius:8px;text-align:center;"
        >
          {{ n }}
        </div>
      </Grid>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">4열 · gap sm</h2>
      <Grid :cols="4" gap="sm">
        <div
          v-for="n in 8"
          :key="'b-' + n"
          style="background:#ccfbf1;padding:12px;border-radius:8px;text-align:center;"
        >
          {{ n }}
        </div>
      </Grid>
    </div>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Grid } from '@/components'

export default {
  name: 'GridPage',
  components: { DemoShell, Grid }
}
</script>
