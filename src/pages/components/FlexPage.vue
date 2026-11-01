<template>
  <DemoShell category="레이아웃" title="Flex" description="Vue 3 · Flex — direction · justify · gap">
    <div class="demo-block">
      <h2 class="demo-block__title">space-between</h2>
      <Flex justify="between" align="center" :gap="12">
        <Button label="Left" />
        <Button label="Right" variant="outline" />
      </Flex>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">세로 · gap</h2>
      <Flex direction="column" :gap="10">
        <Button label="Item 1" block />
        <Button label="Item 2" block variant="outline" />
      </Flex>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">wrap</h2>
      <Flex :gap="8" wrap>
        <Button v-for="n in 8" :key="n" size="sm" :label="'Btn ' + n" />
      </Flex>
    </div>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Flex, Button } from '@/components'

export default {
  name: 'FlexPage',
  components: { DemoShell, Flex, Button }
}
</script>
