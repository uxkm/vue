'use client'

import { Suspense } from 'react'
import { AppShell } from '@/components'
import '@/lib/i18n'

export default function AppProviders ({ children }) {
  return (
    <Suspense fallback={null}>
      <AppShell>{children}</AppShell>
    </Suspense>
  )
}
