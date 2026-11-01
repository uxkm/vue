import DemoShell from '@/pages/DemoShell'
import { Badge } from '@/components'

export default function BadgePage() {
  return (
    <DemoShell category="데이터 표시" title="Badge" description="React · Badge — color · size · count · dot">
      <div className="demo-block">
        <h2 className="demo-block__title">색상</h2>
        <div className="demo-row">
          <Badge color="primary">Primary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="danger">Danger</Badge>
          <Badge color="info">Info</Badge>
          <Badge color="muted">Muted</Badge>
        </div>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">크기 · count · dot</h2>
        <div className="demo-row">
          <Badge size="sm" label="sm" />
          <Badge size="md" label="md" />
          <Badge size="lg" label="lg" />
          <Badge count>99+</Badge>
          <Badge dotOnly color="danger" ariaLabel="알림" />
        </div>
      </div>
    </DemoShell>
  )
}
