'use client'

import { SimpleBar } from '@/lib/scroll'
import { DemoPageShell } from '../shared/DemoPageShell'

const lines = Array.from({ length: 24 }, (_, i) => (
  `라인 ${i + 1} — SimpleBar 커스텀 스크롤 영역 예시입니다.`
))

/** simplebar-react 데모 */
export default function SimplebarDemoPage () {
  return (
    <DemoPageShell
      title="SimpleBar"
      description="simplebar-react — 커스텀 스크롤바 (@/lib/scroll)"
      slug="simplebar"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">고정 높이 스크롤</h2>
        <div className="lib-demo-scroll">
          <SimpleBar style={{ maxHeight: 180 }}>
            <div className="lib-demo-scroll__inner">
              {lines.map((line) => (
                <p key={line} style={{ margin: '0 0 8px' }}>{line}</p>
              ))}
            </div>
          </SimpleBar>
        </div>
      </div>
    </DemoPageShell>
  )
}
