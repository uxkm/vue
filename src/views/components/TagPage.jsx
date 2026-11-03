import DemoShell from '@/views/DemoShell'
import { Tag } from '@/components'

export default function TagPage() {
  const onClose = () => {
    // demo noop
  }

  return (
    <DemoShell category="데이터 표시" title="Tag" description="React · Tag — variant · color · closable">
      <div className="demo-block">
        <h2 className="demo-block__title">색상</h2>
        <div className="demo-row">
          <Tag color="primary" label="기획" />
          <Tag color="success" label="완료" />
          <Tag color="warning" label="대기" />
          <Tag color="danger" label="지연" />
        </div>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">변형</h2>
        <div className="demo-row">
          <Tag variant="filled" label="Filled" />
          <Tag variant="solid" label="Solid" />
          <Tag variant="outline" label="Outline" />
          <Tag variant="borderless" label="Borderless" />
          <Tag round label="Round" />
          <Tag closable label="Closable" onClose={onClose} />
        </div>
      </div>
    </DemoShell>
  )
}
