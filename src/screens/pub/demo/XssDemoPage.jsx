'use client'

import { useMemo, useState } from 'react'
import filterXss from 'xss'
import { DemoPageShell } from '../shared/DemoPageShell'

const SAMPLE = '<p>안녕 <script>alert(1)</script><b onclick="evil()">강조</b> <a href="javascript:alert(1)">링크</a></p>'

/** xss 새니타이즈 데모 */
export default function XssDemoPage () {
  const [raw, setRaw] = useState(SAMPLE)
  const cleaned = useMemo(() => filterXss(raw), [raw])

  return (
    <DemoPageShell
      title="xss"
      description="xss — 위험 HTML 태그/속성 제거"
      slug="xss"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">원본 HTML</h2>
        <textarea
          className="lib-demo-textarea"
          style={{ maxWidth: 640, minHeight: 120 }}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          aria-label="원본 HTML"
        />
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">필터 결과 (문자열)</h2>
        <pre className="lib-demo-pre">{cleaned}</pre>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">안전 렌더 (dangerouslySetInnerHTML)</h2>
        <div
          style={{
            padding: 12,
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-panel)',
            background: 'var(--color-bg)'
          }}
          dangerouslySetInnerHTML={{ __html: cleaned }}
        />
      </div>
    </DemoPageShell>
  )
}
