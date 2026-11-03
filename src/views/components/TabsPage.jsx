'use client'

import { useState } from 'react'
import DemoShell from '@/views/DemoShell'
import { Tabs } from '@/components'

const tabs = [
  { value: 'a', label: '탭 A' },
  { value: 'b', label: '탭 B' },
  { value: 'c', label: '탭 C' }
]

export default function TabsPage() {
  const [tab, setTab] = useState('a')

  return (
    <DemoShell category="네비게이션" title="Tabs" description="React · Tabs — variant · value/onChange">
      <div className="demo-block">
        <h2 className="demo-block__title">line</h2>
        <Tabs value={tab} onChange={(v) => setTab(v)} tabs={tabs}>
          {tab === 'a' ? <p>탭 A 콘텐츠</p> : tab === 'b' ? <p>탭 B 콘텐츠</p> : <p>탭 C 콘텐츠</p>}
        </Tabs>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">pill</h2>
        <Tabs value={tab} onChange={(v) => setTab(v)} tabs={tabs} variant="pill" />
      </div>
    </DemoShell>
  )
}
