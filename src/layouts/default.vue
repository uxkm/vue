<template>
  <AppShell>
    <slot />
  </AppShell>
</template>

<script>
import { AppShell } from '@/components'

export default {
  name: 'DefaultLayout',
  components: { AppShell }
}
</script>
