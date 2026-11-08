'use client'

import { useMemo, useState } from 'react'
import { filesize } from 'filesize'
import { DemoPageShell } from '../shared/DemoPageShell'

const presets = [0, 512, 1024, 1536, 1048576, 1073741824, 5368709120]

/** filesize 데모 */
export default function FilesizeDemoPage () {
  const [bytes, setBytes] = useState(1536)
  const formatted = useMemo(() => filesize(bytes, { base: 2, standard: 'jedec' }), [bytes])

  return (
    <DemoPageShell
      title="filesize"
      description="filesize — 바이트를 읽기 쉬운 용량 문자열로 변환"
      slug="filesize"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">바이트 입력</h2>
        <div className="demo-stack">
          <input
            className="lib-demo-input"
            type="number"
            min={0}
            value={bytes}
            onChange={(e) => setBytes(Number(e.target.value) || 0)}
            aria-label="바이트"
          />
          <pre className="lib-demo-pre">{bytes} bytes → {formatted}</pre>
          <div className="demo-row">
            {presets.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setBytes(value)}
                style={{ padding: '6px 10px', cursor: 'pointer' }}
              >
                {filesize(value, { base: 2, standard: 'jedec' })}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DemoPageShell>
  )
}
