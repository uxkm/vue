import DemoShell from '@/views/DemoShell'
import { Container } from '@/components'

export default function ContainerPage() {
  return (
    <DemoShell category="레이아웃" title="Container" description="React · Container — size · fluid">
      <div className="demo-block">
        <h2 className="demo-block__title">기본</h2>
        <Container>
          <div style={{ background: '#ccfbf1', padding: 16, borderRadius: 8 }}>
            기본 Container 내부 영역
          </div>
        </Container>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">size sm · fluid</h2>
        <Container size="sm">
          <div style={{ background: '#e0f2fe', padding: 16, borderRadius: 8, marginBottom: 12 }}>
            container_sm
          </div>
        </Container>
        <Container fluid>
          <div style={{ background: '#fef9c3', padding: 16, borderRadius: 8 }}>
            Fluid Container
          </div>
        </Container>
      </div>
    </DemoShell>
  )
}
