'use client'

/**
 * 페이지네이션.
 * 현재 페이지·전체 페이지 수로 번호·이전/다음을 그린다.
 */

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 페이지 이동이 받는 값 */
export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  page?: number
  /** 비제어 초기 페이지 */
  defaultPage?: number
  pageCount?: number
  siblingCount?: number
  size?: 'sm' | 'md' | 'lg'
  align?: 'start' | 'center' | 'end'
  round?: boolean
  minimal?: boolean
  /** 번호 목록 대신 현재/전체 텍스트 */
  simple?: boolean
  /** 총 건수 등 왼쪽 안내 */
  total?: ReactNode
  showJumper?: boolean
  hideOnSinglePage?: boolean
  prevLabel?: ReactNode
  nextLabel?: ReactNode
  ariaLabel?: string
  onChange?: (page: number) => void
}

/** 현재 페이지 주변에 보여줄 번호 */
function pageWindow (page: number, pageCount: number, siblingCount: number) {
  const start = Math.max(1, page - siblingCount)
  const end = Math.min(pageCount, page + siblingCount)
  const pages: Array<number | 'ellipsis'> = []
  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push('ellipsis')
  }
  for (let index = start; index <= end; index += 1) pages.push(index)
  if (end < pageCount) {
    if (end < pageCount - 1) pages.push('ellipsis')
    pages.push(pageCount)
  }
  return pages
}

function clampPage (value: number, pageCount: number) {
  if (!Number.isFinite(value)) return 1
  return Math.min(pageCount, Math.max(1, Math.trunc(value)))
}

/**
 * 목록 페이지 이동.
 * page 현재 쪽, pageCount 전체 쪽. onChange 로 바뀐 쪽을 올린다.
 */
export function Pagination ({
  page: pageProp,
  defaultPage = 1,
  pageCount = 1,
  siblingCount = 1,
  size = 'md',
  align = 'start',
  round = false,
  minimal = false,
  simple = false,
  total,
  showJumper = false,
  hideOnSinglePage = false,
  prevLabel = '이전',
  nextLabel = '다음',
  ariaLabel = '페이지 이동',
  className,
  onChange,
  ...rest
}: PaginationProps) {
  const controlled = pageProp !== undefined
  const [innerPage, setInnerPage] = useState(defaultPage)
  const safeCount = Math.max(1, Math.trunc(pageCount) || 1)
  const current = clampPage(controlled ? pageProp : innerPage, safeCount)
  const pages = pageWindow(current, safeCount, siblingCount)
  const [jumper, setJumper] = useState(String(current))

  const [previousPage, setPreviousPage] = useState(current)
  if (previousPage !== current) {
    setPreviousPage(current)
    setJumper(String(current))
  }

  if (hideOnSinglePage && safeCount <= 1) return null

  const go = (next: number) => {
    const clamped = clampPage(next, safeCount)
    if (clamped === current) return
    if (!controlled) setInnerPage(clamped)
    onChange?.(clamped)
  }

  const submitJumper = () => {
    const parsed = Number(jumper)
    if (!Number.isFinite(parsed)) {
      setJumper(String(current))
      return
    }
    go(parsed)
  }

  const rootClass = cx(
    'pagination',
    size === 'sm' && 'pagination_sm',
    size === 'lg' && 'pagination_lg',
    align === 'center' && 'pagination_align-center',
    align === 'end' && 'pagination_align-end',
    round && 'pagination_round',
    minimal && 'pagination_minimal',
    simple && 'pagination_simple',
    className
  )

  const prevDisabled = current <= 1
  const nextDisabled = current >= safeCount

  const list = (
    <ul className="pagination_list">
      <li className="pagination_item">
        <button
          type="button"
          className="pagination_btn pagination_prev"
          aria-label="이전 페이지"
          disabled={prevDisabled}
          onClick={() => go(current - 1)}
        >
          {prevLabel}
        </button>
      </li>

      {simple
        ? (
          <li className="pagination_item">
            <span className="pagination_simple-text">
              <span className="pagination_simple-current">{current}</span>
              {' / '}
              {safeCount}
            </span>
          </li>
          )
        : pages.map((item, index) => (
          <li className="pagination_item" key={`${item}-${index}`}>
            {item === 'ellipsis'
              ? <span className="pagination_ellipsis">…</span>
              : (
                <button
                  type="button"
                  className={cx('pagination_link', item === current && 'is-active')}
                  aria-current={item === current ? 'page' : undefined}
                  aria-label={`${item} 페이지`}
                  onClick={() => go(item)}
                >
                  {item}
                </button>
                )}
          </li>
          ))}

      <li className="pagination_item">
        <button
          type="button"
          className="pagination_btn pagination_next"
          aria-label="다음 페이지"
          disabled={nextDisabled}
          onClick={() => go(current + 1)}
        >
          {nextLabel}
        </button>
      </li>
    </ul>
  )

  const jumperNode = showJumper
    ? (
      <form
        className="pagination_jumper"
        onSubmit={(event: FormEvent) => {
          event.preventDefault()
          submitJumper()
        }}
      >
        <span>이동</span>
        <input
          className="pagination_jumper-input"
          type="number"
          min={1}
          max={safeCount}
          value={jumper}
          aria-label="페이지 번호 입력"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setJumper(event.target.value)}
          onBlur={submitJumper}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              submitJumper()
            }
          }}
        />
        <span>쪽</span>
      </form>
      )
    : null

  const hasExtras = hasNodes(total) || showJumper

  return (
    <nav {...rest} className={rootClass} aria-label={ariaLabel}>
      {hasExtras
        ? (
          <div className="pagination_wrap">
            {hasNodes(total)
              ? <span className="pagination_total">{total}</span>
              : <span />}
            <div className="pagination_wrap-end">
              {list}
              {jumperNode}
            </div>
          </div>
          )
        : (
          <>
            {list}
            {jumperNode}
          </>
          )}
    </nav>
  )
}

export default Pagination
