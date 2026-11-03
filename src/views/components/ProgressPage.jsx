import DemoShell from '@/views/DemoShell'
import { Progress, Space } from '@/components'

export default function ProgressPage() {
  return (
    <DemoShell category="피드백" title="Progress" description="React · Progress — percent · status · showInfo">
      <Space vertical size={14}>
        <Progress percent={25} showInfo />
        <Progress percent={62} showInfo color="success" />
        <Progress percent={100} status="success" showInfo />
        <Progress percent={40} status="exception" showInfo />
        <Progress percent={150} showInfo label="클램프 100%" />
        <Progress indeterminate />
      </Space>
    </DemoShell>
  )
}
