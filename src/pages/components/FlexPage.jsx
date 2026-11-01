import DemoShell from '@/pages/DemoShell'
import { Flex, Button } from '@/components'

export default function FlexPage() {
  return (
    <DemoShell category="레이아웃" title="Flex" description="React · Flex — direction · justify · gap">
      <div className="demo-block">
        <h2 className="demo-block__title">space-between</h2>
        <Flex justify="between" align="center" gap={12}>
          <Button label="Left" />
          <Button label="Right" variant="outline" />
        </Flex>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">세로 · gap</h2>
        <Flex direction="column" gap={10}>
          <Button label="Item 1" block />
          <Button label="Item 2" block variant="outline" />
        </Flex>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">wrap</h2>
        <Flex gap={8} wrap>
          {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
            <Button key={n} size="sm" label={'Btn ' + n} />
          ))}
        </Flex>
      </div>
    </DemoShell>
  )
}
