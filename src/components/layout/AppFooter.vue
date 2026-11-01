<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <slot>
        <p class="app-footer__text">Publish List · UXKM</p>
      </slot>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss">
.app-footer {
  flex-shrink: 0;
  border-top: 1px solid var(--color-line, #d7e0e7);
  background: #fff;

  &__inner {
    padding: 14px 24px;
    box-sizing: border-box;
  }

  &__text {
    margin: 0;
    color: var(--color-muted, #5b6b7a);
    font-size: 12px;
  }
}
</style>
