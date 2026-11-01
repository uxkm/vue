<template>
  <header class="app-header">
    <div class="app-header__inner">
      <!-- 전체 헤더 내부를 페이지에서 교체할 때 -->
      <slot>
        <div class="app-header__brand-wrap">
          <slot name="brand">
            <router-link class="app-header__brand" to="/">
              Publish List
            </router-link>
          </slot>
        </div>
        <div class="app-header__end">
          <nav class="app-header__nav" aria-label="주요 메뉴">
            <slot name="nav">
              <router-link class="app-header__link" to="/">목록</router-link>
              <router-link class="app-header__link" to="/components/button">컴포넌트</router-link>
            </slot>
          </nav>
          <div v-if="$slots.actions" class="app-header__actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  flex-shrink: 0;
  border-bottom: 1px solid var(--color-line, #d7e0e7);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    margin: 0 auto;
    padding: 12px 24px;
    box-sizing: border-box;
  }

  &__brand-wrap {
    min-width: 0;
  }

  &__brand {
    color: var(--color-accent, #0f766e);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-decoration: none;

    &:hover {
      opacity: 0.85;
    }
  }

  &__end {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    min-height: 32px;
    padding: 0 10px;
    border-radius: 8px;
    color: var(--color-muted, #5b6b7a);
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      color: var(--color-ink, #15202b);
      background: rgba(15, 118, 110, 0.06);
    }

    /* Vue Router 4: `/` 는 inclusive active 가 항상 켜지므로 exact 만 사용 */
    &.router-link-exact-active {
      color: var(--color-accent, #0f766e);
      background: rgba(15, 118, 110, 0.1);
    }
  }
}
</style>
