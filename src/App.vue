<template>
  <NuxtLayout>
    <NuxtPage :page-key="routeKey" />
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const routeKey = computed(() => route.fullPath)
</script>
