'use client'

import { useMemo, useState } from 'react'
import { dayjs } from '@/lib/dayjs'
import { DemoPageShell } from '../shared/DemoPageShell'

/** dayjs 데모 */
export default function DayjsDemoPage () {
  const [input, setInput] = useState(() => dayjs().format('YYYY-MM-DD HH:mm'))
  const parsed = useMemo(() => dayjs(input, 'YYYY-MM-DD HH:mm'), [input])
  const valid = parsed.isValid()

  return (
    <DemoPageShell
      title="Day.js"
      description="dayjs + utc/timezone/relativeTime/customParseFormat (@/lib/dayjs)"
      slug="dayjs"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">입력 · 포맷</h2>
        <div className="demo-stack">
          <input
            className="lib-demo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="날짜 입력"
          />
          <pre className="lib-demo-pre">
            {valid
              ? [
                  `ISO: ${parsed.toISOString()}`,
                  `KO: ${parsed.format('YYYY년 M월 D일 HH:mm')}`,
                  `상대: ${parsed.fromNow()}`,
                  `Asia/Seoul: ${parsed.tz('Asia/Seoul').format()}`
                ].join('\n')
              : '유효하지 않은 날짜입니다. (YYYY-MM-DD HH:mm)'}
          </pre>
        </div>
      </div>
    </DemoPageShell>
  )
}
