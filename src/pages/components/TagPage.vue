<template>
  <DemoShell category="데이터 표시" title="Tag" description="Vue 2.6 · Tag — variant · color · closable">
    <div class="demo-block">
      <h2 class="demo-block__title">색상</h2>
      <div class="demo-row">
        <Tag color="primary" label="기획" />
        <Tag color="success" label="완료" />
        <Tag color="warning" label="대기" />
        <Tag color="danger" label="지연" />
      </div>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">변형</h2>
      <div class="demo-row">
        <Tag variant="filled" label="Filled" />
        <Tag variant="solid" label="Solid" />
        <Tag variant="outline" label="Outline" />
        <Tag variant="borderless" label="Borderless" />
        <Tag round label="Round" />
        <Tag closable label="Closable" @close="onClose" />
      </div>
    </div>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'
import { Tag } from '@/components'

export default {
  name: 'TagPage',
  components: { DemoShell, Tag },
  methods: {
    onClose: function () {
      // demo noop
    }
  }
}
</script>
