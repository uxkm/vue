<template>
  <AppShell>
    <router-view />
  </AppShell>
</template>

<script>
import { AppShell } from '@/components'

export default {
  name: 'App',
  components: { AppShell }
}
</script>
