import DemoShell from '@/pages/DemoShell'
import { Link, Space } from '@/components'

export default function LinkPage() {
  return (
    <DemoShell category="기본 요소" title="Link" description="React · Link — color · underline · nav · blank">
      <Space size={16} vertical>
        <div className="demo-row">
          <Link href="#/" label="WBS 홈" />
          <Link href="#/components/button" color="muted">Button 데모</Link>
          <Link href="#/components/typography" underline>Underline</Link>
        </div>
        <div className="demo-row">
          <Link href="#" blank>Storybook (새 창)</Link>
          <Link href="#/" nav label="Nav Link" />
          <Link href="#/" back label="뒤로" />
        </div>
        <p>
          본문 중간의{' '}
          <Link href="#/components/typography">인라인 링크</Link>{' '}
          예시입니다.
        </p>
      </Space>
    </DemoShell>
  )
}
