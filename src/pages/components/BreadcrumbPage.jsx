import DemoShell from '@/pages/DemoShell'
import { Breadcrumb, Space } from '@/components'

const items = [
  { label: 'WBS', href: '#/' },
  { label: '컴포넌트', href: '#/components/button' },
  { label: 'Breadcrumb' }
]

export default function BreadcrumbPage() {
  return (
    <DemoShell category="네비게이션" title="Breadcrumb" description="React · Breadcrumb — separator">
      <Space vertical size={16}>
        <Breadcrumb items={items} />
        <Breadcrumb items={items} separator="slash" />
        <Breadcrumb items={items} separator="dot" size="sm" />
      </Space>
    </DemoShell>
  )
}
