/**
 * 데이터 표.
 * thead·tbody children과 스킨·스크롤·고정 열을 조합한다.
 */
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'

const VALID_STICKY_COLS = new Set([1, 2, 3, 4])

const toCssSize = (value: string | number) =>
  typeof value === 'number' ? `${value}rem` : value

/** 열 너비·패딩 설정 (데이터 key가 아님) */
export interface TableColumnConfig {
  width?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  padding?: string
  nowrap?: boolean
}

/** @deprecated 데이터형 columns — rows와 함께 쓸 때 */
export interface TableColumn<T = Record<string, ReactNode>> {
  key: string
  title: ReactNode
  render?: (row: T, index: number) => ReactNode
  width?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  padding?: string
  nowrap?: boolean
}

export interface TableProps<T extends Record<string, ReactNode> = Record<string, ReactNode>>
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children?: ReactNode
  bordered?: boolean
  striped?: boolean
  compact?: boolean
  hover?: boolean
  /** false면 table만 반환 (래퍼 없음) */
  wrap?: boolean
  scroll?: boolean
  scrollMaxHeight?: string
  stickyTop?: boolean
  stickyLeft?: boolean
  stickyCols?: number
  stickyLeftOffsets?: Record<string | number, string>
  /** 열 너비·패딩 설정 또는 (rows와 함께) 데이터 열 정의 */
  columns?: Array<TableColumnConfig | TableColumn<T>>
  /** 데이터 행. children이 없을 때 columns.key로 렌더 */
  rows?: T[]
}

function columnStyle (column: TableColumnConfig = {}): CSSProperties {
  const style: CSSProperties = {}
  if (column.width != null) style.width = toCssSize(column.width)
  if (column.minWidth != null) style.minWidth = toCssSize(column.minWidth)
  if (column.maxWidth != null) style.maxWidth = toCssSize(column.maxWidth)
  return style
}

function columnVariables (columns: TableColumnConfig[]): CSSProperties {
  return columns.reduce<CSSProperties>((style, column, index) => {
    const position = index + 1
    if (column.padding != null) {
      (style as Record<string, string>)[`--table-col-${position}-padding`] = column.padding
    }
    if (column.nowrap) {
      (style as Record<string, string>)[`--table-col-${position}-white-space`] = 'nowrap'
    }
    return style
  }, {})
}

function isDataColumn (column: TableColumnConfig | TableColumn): column is TableColumn {
  return 'key' in column && typeof (column as TableColumn).key === 'string'
}

/**
 * 행과 열로 데이터를 보여 주는 표.
 * children으로 thead·tbody를 넣거나, rows·columns(key)로 자동 생성한다.
 */
export function Table<T extends Record<string, ReactNode> = Record<string, ReactNode>> ({
  children,
  bordered = false,
  striped = false,
  compact = false,
  hover = false,
  wrap = true,
  scroll = false,
  scrollMaxHeight = '',
  stickyTop = false,
  stickyLeft = false,
  stickyCols = 1,
  stickyLeftOffsets = {},
  columns = [],
  rows,
  className,
  style,
  tabIndex,
  ...rest
}: TableProps<T>) {
  const hasColumns = Array.isArray(columns) && columns.length > 0
  const dataMode = !children && Array.isArray(rows) && columns.some(isDataColumn)
  const resolvedStickyCols = VALID_STICKY_COLS.has(stickyCols) ? stickyCols : 1

  const tableClass = cx(
    'table',
    bordered && 'table_bordered',
    striped && 'table_striped',
    compact && 'table_compact',
    hover && 'table_hover',
    hasColumns && 'table_columns',
    stickyTop && 'table_sticky-top',
    stickyLeft && 'table_sticky-left',
    stickyLeft && `table_sticky-cols-${resolvedStickyCols}`
  )

  const tableStyle: CSSProperties = {
    ...columnVariables(hasColumns ? columns : []),
    ...(!wrap ? style : undefined)
  }
  Object.entries(stickyLeftOffsets ?? {}).forEach(([key, value]) => {
    if (value != null && value !== '') {
      (tableStyle as Record<string, string>)[`--table-sticky-left-${key}`] = String(value)
    }
  })

  const colgroup = hasColumns
    ? (
      <colgroup>
        {columns.map((column, index) => (
          <col key={index} style={columnStyle(column)} />
        ))}
      </colgroup>
      )
    : null

  const body = children ?? (dataMode
    ? (
      <>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={isDataColumn(column) ? column.key : index} scope="col">
                {isDataColumn(column) ? column.title : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(rows || []).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={isDataColumn(column) ? column.key : colIndex}>
                  {isDataColumn(column)
                    ? (column.render ? column.render(row, rowIndex) : row[column.key])
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </>
      )
    : null)

  if (!wrap) {
    return (
      <table
        {...(rest as HTMLAttributes<HTMLTableElement>)}
        className={cx(tableClass, className)}
        style={tableStyle}
      >
        {colgroup}
        {body}
      </table>
    )
  }

  const wrapStyle: CSSProperties = { ...style }
  if (scrollMaxHeight != null && scrollMaxHeight !== '') {
    (wrapStyle as Record<string, string>)['--table-scroll-max-height'] = scrollMaxHeight
  }

  return (
    <div
      {...rest}
      className={cx('table_wrap', scroll && 'table_wrap-scroll', className)}
      style={wrapStyle}
      role={rest.role || (scroll ? 'region' : undefined)}
      aria-label={rest['aria-label'] || (scroll ? '표 스크롤 영역' : undefined)}
      tabIndex={scroll ? 0 : tabIndex}
    >
      <table className={tableClass} style={tableStyle}>
        {colgroup}
        {body}
      </table>
    </div>
  )
}

export default Table
