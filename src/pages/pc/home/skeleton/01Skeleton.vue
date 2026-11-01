<template>
  <div class="mc-skel">
    <div class="mc-skel__hero">
      <span class="mc-skel__bar mc-skel__bar--tag"></span>
      <span class="mc-skel__bar mc-skel__bar--title"></span>
      <span class="mc-skel__bar mc-skel__bar--title-sm"></span>
      <span class="mc-skel__bar mc-skel__bar--desc"></span>
      <span class="mc-skel__bar mc-skel__bar--cta"></span>
      <span class="mc-skel__blob"></span>
    </div>
    <div class="mc-skel__content">
      <div class="mc-skel__side">
        <span class="mc-skel__bar" style="width: 72%"></span>
        <span class="mc-skel__bar" style="width: 64%"></span>
        <span class="mc-skel__bar" style="width: 70%"></span>
        <span class="mc-skel__bar" style="width: 58%"></span>
      </div>
      <div class="mc-skel__main">
        <span class="mc-skel__bar mc-skel__bar--eyebrow"></span>
        <span class="mc-skel__bar mc-skel__bar--heading"></span>
        <div class="mc-skel__cards">
          <span class="mc-skel__card"></span>
          <span class="mc-skel__card"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PcHomeSkeleton01'
}
</script>

<style lang="scss" scoped>
.mc-skel {
  min-height: 100vh;
  background: #0a0a0a;

  &__hero {
    position: relative;
    min-height: 72vh;
    padding: 120px 40px 80px;
    overflow: hidden;
  }

  &__bar {
    display: block;
    height: 14px;
    margin-bottom: 14px;
    border-radius: 6px;
    background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
    background-size: 200% 100%;
    animation: mc-skel-shine 1.2s ease-in-out infinite;

    &--tag { width: 160px; height: 12px; }
    &--title { width: 70%; max-width: 420px; height: 28px; }
    &--title-sm { width: 55%; max-width: 340px; height: 28px; }
    &--desc { width: 50%; max-width: 360px; height: 12px; margin-top: 8px; }
    &--cta { width: 140px; height: 40px; margin-top: 24px; border-radius: 999px; }
    &--eyebrow { width: 88px; height: 12px; }
    &--heading { width: 80%; max-width: 520px; height: 24px; margin-bottom: 28px; }
  }

  &__blob {
    position: absolute;
    right: 8%;
    top: 22%;
    width: 40vw;
    max-width: 360px;
    aspect-ratio: 1;
    border-radius: 42% 58% 48% 52% / 48% 42% 58% 52%;
    background: #1c1c1c;
    animation: mc-skel-shine 1.2s ease-in-out infinite;
  }

  &__content {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 40px;
    padding: 64px 40px;
    background: #f4f4f4;
  }

  &__side {
    display: grid;
    gap: 18px;
    padding-top: 8px;

    .mc-skel__bar {
      background: linear-gradient(90deg, #e4e4e4 25%, #eee 50%, #e4e4e4 75%);
      background-size: 200% 100%;
      height: 12px;
    }
  }

  &__main .mc-skel__bar {
    background: linear-gradient(90deg, #e4e4e4 25%, #eee 50%, #e4e4e4 75%);
    background-size: 200% 100%;
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  &__card {
    display: block;
    aspect-ratio: 16 / 10;
    border-radius: 4px;
    background: linear-gradient(90deg, #e4e4e4 25%, #eee 50%, #e4e4e4 75%);
    background-size: 200% 100%;
    animation: mc-skel-shine 1.2s ease-in-out infinite;
  }
}

@keyframes mc-skel-shine {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

@media (max-width: 768px) {
  .mc-skel__content {
    grid-template-columns: 1fr;
  }

  .mc-skel__blob {
    display: none;
  }

  .mc-skel__cards {
    grid-template-columns: 1fr;
  }
}
</style>
