'use client'

import { useEffect, useMemo, useState } from 'react'
import { chunk, debounce, uniq } from 'lodash-es'
import { DemoPageShell } from '../shared/DemoPageShell'

/** lodash-es 데모 */
export default function LodashDemoPage () {
  const [csv, setCsv] = useState('a, b, a, c, b, d, e, f')
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')

  const items = useMemo(
    () => csv.split(',').map((s) => s.trim()).filter(Boolean),
    [csv]
  )
  const unique = useMemo(() => uniq(items), [items])
  const chunks = useMemo(() => chunk(unique, 3), [unique])

  useEffect(() => {
    const run = debounce((value) => setDebounced(value), 400)
    run(query)
    return () => run.cancel()
  }, [query])

  return (
    <DemoPageShell
      title="lodash-es"
      description="lodash-es — uniq / chunk / debounce 예시"
      slug="lodash"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">uniq · chunk</h2>
        <div className="demo-stack">
          <input
            className="lib-demo-input"
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            aria-label="쉼표 구분 값"
          />
          <pre className="lib-demo-pre">
            {`uniq → ${JSON.stringify(unique)}\nchunk(3) → ${JSON.stringify(chunks)}`}
          </pre>
        </div>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">debounce (400ms)</h2>
        <div className="demo-stack">
          <input
            className="lib-demo-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="입력 후 잠시 기다려 보세요"
            aria-label="디바운스 입력"
          />
          <pre className="lib-demo-pre">즉시: {query || '(비어 있음)'}{'\n'}지연: {debounced || '(비어 있음)'}</pre>
        </div>
      </div>
    </DemoPageShell>
  )
}
