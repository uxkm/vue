import DemoShell from '@/pages/DemoShell'
import { Empty, Button, Space } from '@/components'

export default function EmptyPage() {
  return (
    <DemoShell category="피드백" title="Empty" description="React · Empty — description · footer">
      <Space vertical gap="lg">
        <Empty description="표시할 항목이 없습니다">
          <Button label="새로고침" size="sm" />
        </Empty>
        <Empty description="검색 결과 없음" simple />
      </Space>
    </DemoShell>
  )
}
