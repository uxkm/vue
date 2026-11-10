/**
 * 가이드 API 문서 블록.
 * Props · Children · 클래스 · 디자인 토큰 표를 섹션으로 렌더한다.
 */

/**
 * @typedef {{ key: string, label: string }} ApiColumn
 * @typedef {Record<string, string>} ApiRow
 * @typedef {{ columns?: ApiColumn[], rows: ApiRow[], codeColumn?: string }} ApiTableData
 * @typedef {{ title: string, description?: string, tables: ApiTableData[] }} ApiSectionData
 */

const DEFAULT_COLUMNS = [
  { key: 'name', label: '이름' },
  { key: 'description', label: '설명' },
  { key: 'default', label: '기본값' },
  { key: 'type', label: '타입' }
]

/**
 * @param {{ columns?: ApiColumn[], rows: ApiRow[], codeColumn?: string }} props
 */
function ApiTable ({ columns = DEFAULT_COLUMNS, rows, codeColumn = 'name' }) {
  if (!rows?.length) return null

  return (
    <div className="guide-api__table-wrap" role="region" aria-label="API 표" tabIndex={0}>
      <table className="guide-api__table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[codeColumn] || 'row'}-${index}`}>
              {columns.map((col) => {
                const value = row[col.key] ?? '—'
                const isCode = col.key === codeColumn || col.key === 'type' || col.key === 'default'
                return (
                  <td key={col.key} data-col={col.key}>
                    {isCode && value !== '—'
                      ? <code>{value}</code>
                      : value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * @param {{ sections: ApiSectionData[], className?: string }} props
 */
export function GuideApiDocs ({ sections, className }) {
  if (!sections?.length) return null

  return (
    <div className={['guide-api', className].filter(Boolean).join(' ')}>
      {sections.map((section, sectionIndex) => (
        <section
          className="guide-api__section"
          key={`${section.title}-${sectionIndex}`}
          aria-labelledby={`guide-api-${sectionIndex}`}
        >
          <h2 className="guide-api__title" id={`guide-api-${sectionIndex}`}>
            {section.title}
          </h2>
          {section.description
            ? <p className="guide-api__desc">{section.description}</p>
            : null}
          {section.tables.map((table, tableIndex) => (
            <ApiTable key={tableIndex} {...table} />
          ))}
        </section>
      ))}
    </div>
  )
}

export default GuideApiDocs
