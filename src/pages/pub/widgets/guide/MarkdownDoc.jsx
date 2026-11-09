'use client'

/**
 * README 등 프로젝트 마크다운을 가이드 소개·문서용으로 렌더.
 * 의존성 없이 제목·문단·목록(ul/ol)·표·코드·인라인 서식만 처리한다.
 */
import { Fragment } from 'react'
import { Link } from '@/lib/router'
import { cx } from '@/utils/cx'

/** `**bold**` · `` `code` `` · `[label](href)` */
function renderInline (text, keyPrefix = 'i') {
  if (text == null || text === '') return null
  const source = String(text)
  const nodes = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let match
  let index = 0

  while ((match = re.exec(source))) {
    if (match.index > last) {
      nodes.push(source.slice(last, match.index))
    }
    const token = match[0]
    const key = `${keyPrefix}-${index++}`
    if (token.startsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('`')) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>)
    } else {
      const link = /^\[[^\]]+\]\(([^)]+)\)$/.exec(token)
      const label = token.slice(1, token.indexOf(']'))
      const href = link?.[1] || '#'
      if (/^(https?:|mailto:)/i.test(href)) {
        nodes.push(
          <a key={key} href={href} target="_blank" rel="noreferrer">
            {label}
          </a>
        )
      } else if (href.startsWith('/') || href.startsWith('#')) {
        nodes.push(
          <Link key={key} className="guide-md__link" to={href}>
            {label}
          </Link>
        )
      } else {
        // 저장소 상대 경로(README 내 문서 링크)는 코드로 표시
        nodes.push(<code key={key}>{label}</code>)
      }
    }
    last = match.index + token.length
  }

  if (last < source.length) nodes.push(source.slice(last))
  return nodes.length === 1 ? nodes[0] : nodes
}

function isTableSeparator (line) {
  return /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line.trim())
}

/**
 * 표 행 분리.
 * README 의 `\|` 이스케이프·인라인 코드 안 `|` 는 열 구분자로 쓰지 않는다.
 */
function splitTableRow (line) {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '')
  const held = []
  const hold = (value) => {
    const token = `\uE000${held.length}\uE001`
    held.push(value)
    return token
  }
  // 1) 인라인 코드 먼저 보호 (코드 안 \| → | 로 복원)
  let protectedLine = trimmed.replace(/`[^`]*`/g, (m) => hold(m.replace(/\\\|/g, '|')))
  // 2) 코드 밖 남은 \| 는 리터럴 |
  protectedLine = protectedLine.replace(/\\\|/g, () => hold('|'))

  return protectedLine.split('|').map((cell) => {
    let text = cell.trim()
    text = text.replace(/\uE000(\d+)\uE001/g, (_, i) => held[Number(i)])
    return text
  })
}

function parseBlocks (markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed) {
      i += 1
      continue
    }

    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim()
      const code = []
      i += 1
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i])
        i += 1
      }
      if (i < lines.length) i += 1
      blocks.push({ type: 'code', lang, value: code.join('\n') })
      continue
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed)
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2].trim() })
      i += 1
      continue
    }

    if (trimmed.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const header = splitTableRow(trimmed)
      i += 2
      const rows = []
      while (i < lines.length && lines[i].trim().includes('|') && !isTableSeparator(lines[i])) {
        rows.push(splitTableRow(lines[i]))
        i += 1
      }
      blocks.push({ type: 'table', header, rows })
      continue
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''))
        i += 1
      }
      blocks.push({ type: 'ul', items })
      continue
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''))
        i += 1
      }
      blocks.push({ type: 'ol', items })
      continue
    }

    const para = [trimmed]
    i += 1
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('```') &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !(lines[i].includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1]))
    ) {
      para.push(lines[i].trim())
      i += 1
    }
    blocks.push({ type: 'p', text: para.join(' ') })
  }

  return blocks
}

function slugify (text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\uac00-\ud7a3\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/**
 * @param {{ source: string, className?: string }} props
 */
export function MarkdownDoc ({ source, className }) {
  const blocks = parseBlocks(source)

  return (
    <div className={cx('guide-md', className)}>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`
        if (block.type === 'heading') {
          const Tag = `h${block.level}`
          const id = slugify(block.text)
          return (
            <Tag key={key} id={id} className={`guide-md__h${block.level}`}>
              {renderInline(block.text, key)}
            </Tag>
          )
        }
        if (block.type === 'p') {
          return (
            <p key={key} className="guide-md__p">
              {renderInline(block.text, key)}
            </p>
          )
        }
        if (block.type === 'ul' || block.type === 'ol') {
          const ListTag = block.type === 'ol' ? 'ol' : 'ul'
          return (
            <ListTag
              key={key}
              className={cx('guide-md__list', block.type === 'ol' && 'guide-md__list--ordered')}
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>
              ))}
            </ListTag>
          )
        }
        if (block.type === 'code') {
          return (
            <pre key={key} className="guide-md__pre" data-lang={block.lang || undefined}>
              <code>{block.value}</code>
            </pre>
          )
        }
        if (block.type === 'table') {
          return (
            <div key={key} className="guide-md__table-wrap">
              <table className="guide-md__table">
                <thead>
                  <tr>
                    {block.header.map((cell, cellIndex) => (
                      <th key={`${key}-h-${cellIndex}`}>{renderInline(cell, `${key}-h-${cellIndex}`)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`${key}-r-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${key}-r-${rowIndex}-${cellIndex}`}>
                          {renderInline(cell, `${key}-r-${rowIndex}-${cellIndex}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        return <Fragment key={key} />
      })}
    </div>
  )
}

export default MarkdownDoc
