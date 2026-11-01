<template>
  <div class="demo-page">
    <Container>
      <header class="demo-page__header">
        <router-link class="demo-page__back" to="/">← 퍼블리시 목록으로</router-link>
        <p class="demo-page__cat">{{ category }}</p>
        <h1 class="demo-page__title">{{ title }}</h1>
        <p v-if="description" class="demo-page__desc">{{ description }}</p>
      </header>
      <section class="demo-page__body">
        <slot></slot>
      </section>
    </Container>
  </div>
</template>

<script>
import { Container } from '@/components'

export default {
  name: 'DemoShell',
  components: { Container },
  props: {
    category: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.demo-page {
  min-height: 100vh;
  padding: 32px 0 64px;
  background:
    radial-gradient(900px 400px at 0% 0%, rgba(15, 118, 110, 0.1), transparent 55%),
    var(--color-bg);
}

.demo-page__header {
  margin-bottom: 24px;
}

.demo-page__back {
  display: inline-block;
  margin-bottom: 14px;
  color: var(--color-accent);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}

.demo-page__cat {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.demo-page__title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-ink);
}

.demo-page__desc {
  margin: 8px 0 0;
  color: var(--color-muted);
  font-size: 14px;
  line-height: 1.5;
}

.demo-page__body {
  border: 1px solid var(--color-line);
  border-radius: var(--radius-panel);
  background: var(--color-panel);
  box-shadow: var(--shadow);
  padding: 22px;
}

.demo-block + .demo-block {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--color-line);
}

.demo-block__title {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-ink);
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
</style>
