'use client'

import { useMemo, useState } from 'react'
import { encode, decode } from 'js-base64'
import { DemoPageShell } from '../shared/DemoPageShell'

/** js-base64 데모 */
export default function Base64DemoPage () {
  const [plain, setPlain] = useState('안녕하세요 Publish List')
  const [encoded, setEncoded] = useState(() => encode('안녕하세요 Publish List'))

  const decoded = useMemo(() => {
    try {
      return decode(encoded)
    } catch (err) {
      return `(디코드 실패) ${err.message}`
    }
  }, [encoded])

  return (
    <DemoPageShell
      title="js-base64"
      description="js-base64 — 유니코드 안전 Base64 인코딩/디코딩"
      slug="base64"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">인코드</h2>
        <div className="demo-stack">
          <textarea
            className="lib-demo-textarea"
            value={plain}
            onChange={(e) => {
              setPlain(e.target.value)
              setEncoded(encode(e.target.value))
            }}
            aria-label="원문"
          />
          <pre className="lib-demo-pre">{encoded}</pre>
        </div>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">디코드</h2>
        <div className="demo-stack">
          <textarea
            className="lib-demo-textarea"
            value={encoded}
            onChange={(e) => setEncoded(e.target.value)}
            aria-label="Base64"
          />
          <pre className="lib-demo-pre">{decoded}</pre>
        </div>
      </div>
    </DemoPageShell>
  )
}
