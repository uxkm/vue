import DemoShell from '@/pages/DemoShell'
import { Divider } from '@/components'

export default function DividerPage() {
  return (
    <DemoShell category="레이아웃" title="Divider" description="React · Divider — vertical · dashed · label">
      <div className="demo-block">
        <h2 className="demo-block__title">가로</h2>
        <p>위 영역</p>
        <Divider />
        <p>아래 영역</p>
        <Divider dashed />
        <Divider label="또는" />
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">세로</h2>
        <div className="demo-row">
          <span>왼쪽</span>
          <Divider vertical />
          <span>오른쪽</span>
        </div>
      </div>
    </DemoShell>
  )
}
