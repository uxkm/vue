'use client'

/**
 * 가이드 데모 블록.
 * 미리보기 + 코드보기 토글(복사 포함).
 */
import { useId, useState } from 'react'
import { cx } from '@/utils/cx'

/**
 * @param {object} props
 * @param {string} props.title 섹션 제목
 * @param {import('react').ReactNode} [props.description] 설명
 * @param {string} [props.code] React 사용 코드. 있으면 코드보기 제공
 * @param {string} [props.fileName='Example.jsx'] 코드 파일 라벨
 * @param {import('react').ReactNode} props.children 미리보기
 * @param {string} [props.className]
 */
export function DemoBlock ({
  title,
  description = '',
  code = '',
  fileName = 'Example.jsx',
  children,
  className
}) {
  const panelId = useId()
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const hasCode = Boolean(code && String(code).trim())

  async function copyCode () {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={cx('demo-block', className)}>
      {title ? <h2 className="demo-block__title">{title}</h2> : null}
      {description
        ? (
          <div className="demo-block__desc">{description}</div>
          )
        : null}
      <div className="demo-block__preview">{children}</div>
      {hasCode
        ? (
          <div className={cx('demo-code', expanded && 'is-expanded')}>
            <div className="demo-code__togglebar">
              <button
                type="button"
                className="demo-code__toggle"
                aria-controls={panelId}
                aria-expanded={expanded}
                onClick={() => setExpanded((v) => !v)}
              >
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
                </svg>
                {expanded ? '코드 숨기기' : '코드보기'}
              </button>
            </div>
            {expanded
              ? (
                <div className="demo-code__body" id={panelId}>
                  <div className="demo-code__filebar">
                    <code>{fileName}</code>
                    <button type="button" className="demo-code__copy" onClick={copyCode}>
                      {copied ? '복사됨' : '코드 복사'}
                    </button>
                  </div>
                  <pre className="demo-code__pre"><code>{code}</code></pre>
                </div>
                )
              : null}
          </div>
          )
        : null}
    </div>
  )
}

export default DemoBlock
