import { useState } from 'react'
import DemoShell from '@/pages/DemoShell'
import { Select, Space } from '@/components'

const options = [
  { value: 'a', label: '옵션 A' },
  { value: 'b', label: '옵션 B' },
  { value: 'c', label: '옵션 C' }
]

export default function SelectPage() {
  const [selected, setSelected] = useState('')

  return (
    <DemoShell category="폼" title="Select" description="React · Select — size · error · value/onChange">
      <Space vertical size={12}>
        <Select
          value={selected}
          onChange={(v) => setSelected(v)}
          placeholder="옵션을 선택하세요"
          options={options}
        />
        <Select value={selected} onChange={(v) => setSelected(v)} size="sm" options={options} />
        <Select value={selected} onChange={(v) => setSelected(v)} options={options} error />
        <Select value={selected} onChange={(v) => setSelected(v)} options={options} disabled />
        <p>선택값: {selected || '-'}</p>
      </Space>
    </DemoShell>
  )
}
