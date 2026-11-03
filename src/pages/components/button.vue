<template>
  <DemoShell
    category="기본 요소"
    title="Button"
    description="Vue 3 · Button — variant · color · size · slot · 상태 조합을 확인합니다."
  >
    <div class="demo-block">
      <h2 class="demo-block__title">기본 유형</h2>
      <div class="demo-row">
        <Button variant="filled" color="primary" label="Filled Primary" />
        <Button variant="outline" color="primary" label="Outline" />
        <Button variant="ghost" label="Ghost" />
        <Button variant="text" color="primary" label="Text" />
        <Button variant="select" label="Select" />
      </div>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">색상</h2>
      <div class="demo-row">
        <Button color="primary" label="Primary" />
        <Button color="default" label="Default" />
        <Button color="success" label="Success" />
        <Button color="warning" label="Warning" />
        <Button color="danger" label="Danger" />
        <Button variant="text" color="muted" label="Muted" />
      </div>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">크기 / 상태</h2>
      <div class="demo-row">
        <Button size="sm" label="Small" />
        <Button size="md" label="Medium" />
        <Button size="lg" label="Large" />
        <Button round label="Round" />
        <Button loading label="Loading" />
        <Button disabled label="Disabled" />
        <Button :aria-disabled="true" label="Aria Disabled" />
      </div>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">슬롯 · 아이콘</h2>
      <div class="demo-row">
        <Button label="Before">
          <template #icon-before>
            <span aria-hidden="true">★</span>
          </template>
        </Button>
        <Button label="After">
          <template #icon-after>
            <span aria-hidden="true">→</span>
          </template>
        </Button>
        <Button icon-only aria-label="즐겨찾기">★</Button>
        <Button vertical label="홈">
          <template #icon-before>
            <span aria-hidden="true">⌂</span>
          </template>
        </Button>
      </div>
    </div>
    <div class="demo-block">
      <h2 class="demo-block__title">루트 태그 · Block</h2>
      <div class="demo-row">
        <Button tag="a" href="#button" label="Link Button" />
        <Button tag="div" label="Div Button" />
      </div>
      <div style="margin-top: 12px">
        <Button block label="전체 너비 버튼" />
      </div>
    </div>
  </DemoShell>
</template>

<script>
import DemoShell from '@/components/publish/DemoShell.vue'
import { Button } from '@/components'

export default {
  name: 'ButtonPage',
  components: { DemoShell, Button }
}
</script>
