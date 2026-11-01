import DemoShell from '@/pages/DemoShell'
import { Space, Button } from '@/components'

export default function SpacePage() {
  return (
    <DemoShell category="레이아웃" title="Space" description="React · Space — gap · align · justify">
      <div className="demo-block">
        <h2 className="demo-block__title">가로 gap</h2>
        <Space gap="sm">
          <Button label="A" />
          <Button label="B" variant="outline" />
          <Button label="C" variant="ghost" />
        </Space>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">세로 · between</h2>
        <Space gap="lg" vertical>
          <Button label="Item 1" block />
          <Button label="Item 2" block variant="outline" />
        </Space>
      </div>
    </DemoShell>
  )
}
