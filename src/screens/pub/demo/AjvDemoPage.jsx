'use client'

import { useMemo, useState } from 'react'
import Ajv from 'ajv'
import { DemoPageShell } from '../shared/DemoPageShell'

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    age: { type: 'integer', minimum: 0, maximum: 150 },
    email: { type: 'string', pattern: '^.+@.+$' }
  },
  required: ['name', 'age'],
  additionalProperties: false
}

/** ajv JSON Schema 검증 데모 */
export default function AjvDemoPage () {
  const [jsonText, setJsonText] = useState('{\n  "name": "Kim",\n  "age": 30,\n  "email": "kim@example.com"\n}')
  const validate = useMemo(() => {
    const ajv = new Ajv({ allErrors: true })
    return ajv.compile(schema)
  }, [])

  const result = useMemo(() => {
    try {
      const data = JSON.parse(jsonText)
      const ok = validate(data)
      return ok
        ? { ok: true, message: '유효한 JSON입니다.' }
        : { ok: false, message: JSON.stringify(validate.errors, null, 2) }
    } catch (err) {
      return { ok: false, message: `JSON 파싱 오류: ${err.message}` }
    }
  }, [jsonText, validate])

  return (
    <DemoPageShell
      title="Ajv"
      description="ajv — JSON Schema 검증 예시"
      slug="ajv"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">스키마</h2>
        <pre className="lib-demo-pre">{JSON.stringify(schema, null, 2)}</pre>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">입력 JSON</h2>
        <div className="demo-stack">
          <textarea
            className="lib-demo-textarea"
            style={{ maxWidth: 560, minHeight: 140 }}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            aria-label="검증할 JSON"
          />
          <pre className="lib-demo-pre">
            {result.ok ? `OK — ${result.message}` : `FAIL\n${result.message}`}
          </pre>
        </div>
      </div>
    </DemoPageShell>
  )
}
