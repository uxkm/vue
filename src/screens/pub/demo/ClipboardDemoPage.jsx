'use client'

import { useState } from 'react'
import { copyText } from '@/lib/clipboard'
import { DemoPageShell } from '../shared/DemoPageShell'

/** clipboard-copy 데모 */
export default function ClipboardDemoPage () {
  const [text, setText] = useState('Publish List — clipboard demo')
  const [status, setStatus] = useState('')

  const onCopy = async () => {
    try {
      await copyText(text)
      setStatus('복사됨')
    } catch (err) {
      setStatus(`실패: ${err?.message || err}`)
    }
  }

  return (
    <DemoPageShell
      title="Clipboard"
      description="clipboard-copy — 텍스트 클립보드 복사 (@/lib/clipboard)"
      slug="clipboard"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">copyText()</h2>
        <div className="demo-stack">
          <textarea
            className="lib-demo-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="복사할 텍스트"
          />
          <div className="demo-row">
            <button type="button" onClick={onCopy} style={{ padding: '8px 12px', cursor: 'pointer' }}>
              클립보드에 복사
            </button>
            {status ? <span style={{ fontSize: 13 }}>{status}</span> : null}
          </div>
        </div>
      </div>
    </DemoPageShell>
  )
}
