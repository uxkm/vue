import DemoShell from '@/pages/DemoShell'
import { Grid } from '@/components'

const range = (n) => Array.from({ length: n }, (_, i) => i + 1)

export default function GridPage() {
  return (
    <DemoShell category="레이아웃" title="Grid" description="React · Grid — cols · gap">
      <div className="demo-block">
        <h2 className="demo-block__title">3열</h2>
        <Grid cols={3} gap={12}>
          {range(6).map((n) => (
            <div
              key={'a-' + n}
              style={{ background: '#eef2f6', padding: 16, borderRadius: 8, textAlign: 'center' }}
            >
              {n}
            </div>
          ))}
        </Grid>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">4열 · gap sm</h2>
        <Grid cols={4} gap="sm">
          {range(8).map((n) => (
            <div
              key={'b-' + n}
              style={{ background: '#ccfbf1', padding: 12, borderRadius: 8, textAlign: 'center' }}
            >
              {n}
            </div>
          ))}
        </Grid>
      </div>
    </DemoShell>
  )
}
