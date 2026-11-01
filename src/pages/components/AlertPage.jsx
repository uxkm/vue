import DemoShell from '@/pages/DemoShell'
import { Alert, Space } from '@/components'

export default function AlertPage() {
  return (
    <DemoShell category="피드백" title="Alert" description="React · Alert — color · closable · icon">
      <Space vertical size={10}>
        <Alert color="info" title="정보">정보 알림입니다.</Alert>
        <Alert color="success">성공 알림입니다.</Alert>
        <Alert color="warning" closable>경고 알림입니다.</Alert>
        <Alert color="danger" showIcon={false}>아이콘 없는 위험 알림</Alert>
      </Space>
    </DemoShell>
  )
}
