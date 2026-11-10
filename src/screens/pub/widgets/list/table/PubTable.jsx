'use client'

/**
 * PubTable
 * - 퍼블리시 화면 목록 표 (헤더 고정 + 본문 스크롤, 가로 스크롤 동기화)
 * - 폴더 BranchRow 를 나열하고, 화면명 열 너비를 최장 텍스트에 맞춤
 * - depth2 그룹 / 리프까지 이름 폭 측정에 포함
 */
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { cx } from '@/utils/cx'
import BranchRow from './BranchRow'
import { folderLabel, itemLabel } from '../lib/labels'
import { countLeaves, groupLabel, isGroupNode } from '../lib/tree'
import { useEllipsisTooltip } from './useEllipsisTooltip.jsx'

/** 화면명 열 최대 너비 */
const NAME_COL_MAX = 240
/** 화면명 열 최소 너비 */
const NAME_COL_MIN = 64

/** 캔버스로 텍스트 폭 측정 (접힌 행도 포함해 최장 너비 산출) */
function measureTextWidth (text, font) {
  if (!text) return 0
  const canvas = measureTextWidth._canvas || (measureTextWidth._canvas = document.createElement('canvas'))
  const ctx = canvas.getContext('2d')
  if (!ctx) return 0
  ctx.font = font
  return ctx.measureText(String(text)).width
}

export default function PubTable ({
  ariaLabel,
  showProgress,
  columns,
  folders,
  emptyLabel,
  isOpen,
  collapseLabel,
  expandLabel,
  onToggle,
  onRemark
}) {
  const ellipsis = useEllipsisTooltip()
  const panelRef = useRef(null)
  const headWrapRef = useRef(null)
  const bodyWrapRef = useRef(null)
  const syncingScroll = useRef(false)

  const tableClass = cx('wbs-table', { 'is-progress-hidden': !showProgress })

  /** 가로 스크롤 딤 표시 */
  const syncScrolledX = useCallback(() => {
    const body = bodyWrapRef.current
    const head = headWrapRef.current
    const scrolled = !!(body && body.scrollLeft > 0)
    if (body) body.classList.toggle('is-scrolled-x', scrolled)
    if (head) head.classList.toggle('is-scrolled-x', scrolled)
  }, [])

  /** 헤더·본문 가로 스크롤 동기화 */
  const syncScrollFrom = useCallback((source) => {
    if (syncingScroll.current) return
    const head = headWrapRef.current
    const body = bodyWrapRef.current
    if (!head || !body) return
    const target = source === head ? body : head
    if (target.scrollLeft === source.scrollLeft) {
      syncScrolledX()
      return
    }
    syncingScroll.current = true
    target.scrollLeft = source.scrollLeft
    syncScrolledX()
    requestAnimationFrame(() => {
      syncingScroll.current = false
    })
  }, [syncScrolledX])

  // 첫 열: 목록 전체에서 가장 긴 텍스트 너비로 통일 (최대 NAME_COL_MAX)
  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return undefined

    /** 최장 화면명 너비를 재서 CSS 변수로 넣는다 */
    const syncNameColWidth = () => {
      const sample =
        panel.querySelector('.col-name .folder-name') ||
        panel.querySelector('.col-name .wbs-link') ||
        panel.querySelector('.col-name .name-label') ||
        panel.querySelector('.wbs-table__head .col-name') ||
        panel.querySelector('.col-name')
      if (!sample) {
        panel.style.removeProperty('--wbs-col-name-width')
        return
      }

      const cs = window.getComputedStyle(sample)
      const font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      const rootCs = window.getComputedStyle(panel.closest('.wbs') || panel)
      const controlH = parseFloat(rootCs.getPropertyValue('--control-h')) || 24
      const padX = 24
      const toggleMargin = 6
      const childPad = 16

      let maxContent = 0

      const nameCol = columns.find((col) => col.key === 'name')
      if (nameCol && nameCol.label) {
        maxContent = Math.max(maxContent, measureTextWidth(nameCol.label, font))
      }

      folders.forEach((folder) => {
        const fText = `${folderLabel(folder)} (${countLeaves(folder)})`
        maxContent = Math.max(
          maxContent,
          controlH + toggleMargin + measureTextWidth(fText, font)
        )
        ;(folder.depth2 || []).forEach((node) => {
          if (isGroupNode(node)) {
            const gText = `${groupLabel(node)} (${countLeaves(node)})`
            maxContent = Math.max(
              maxContent,
              controlH + toggleMargin + childPad + measureTextWidth(gText, font)
            )
            ;(node.depth3 || []).forEach((item) => {
              const sText = itemLabel(folder, item)
              maxContent = Math.max(
                maxContent,
                controlH + toggleMargin + childPad * 2 + measureTextWidth(sText, font)
              )
            })
            return
          }
          const sText = itemLabel(folder, node)
          maxContent = Math.max(
            maxContent,
            controlH + toggleMargin + childPad + measureTextWidth(sText, font)
          )
        })
      })

      const width = Math.min(Math.ceil(maxContent + padX), NAME_COL_MAX)
      panel.style.setProperty('--wbs-col-name-width', `${Math.max(width, NAME_COL_MIN)}px`)
    }

    syncNameColWidth()
    window.addEventListener('resize', syncNameColWidth)
    return () => window.removeEventListener('resize', syncNameColWidth)
  }, [folders, columns])

  useEffect(() => {
    const head = headWrapRef.current
    const body = bodyWrapRef.current
    if (!head || !body) return undefined

    /** 헤더 가로 스크롤 → 본문 동기화 */
    const onHeadScroll = () => syncScrollFrom(head)
    /** 본문 가로 스크롤 → 헤더 동기화 */
    const onBodyScroll = () => syncScrollFrom(body)

    syncScrolledX()
    head.addEventListener('scroll', onHeadScroll, { passive: true })
    body.addEventListener('scroll', onBodyScroll, { passive: true })
    return () => {
      head.removeEventListener('scroll', onHeadScroll)
      body.removeEventListener('scroll', onBodyScroll)
    }
  }, [folders, syncScrollFrom, syncScrolledX])

  return (
    <section ref={panelRef} className="wbs-panel" aria-label={ariaLabel}>
      {/* 컬럼 헤더: body 스크롤 시 탭/검색 아래 고정, 가로는 본문과 동기화 */}
      <div
        ref={headWrapRef}
        className="wbs-table-head-wrap"
        onMouseOver={ellipsis.onMouseOver}
        onFocus={ellipsis.onMouseOver}
        onMouseOut={ellipsis.onMouseOut}
        onBlur={ellipsis.onMouseOut}
      >
        <div className={tableClass} role="presentation">
          <div className="wbs-table__head" role="row">
            {columns.map((col) => (
              <div key={col.key} className={'col-' + col.key} role="columnheader">{col.label}</div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={bodyWrapRef}
        className="wbs-table-body-wrap"
        onMouseOver={ellipsis.onMouseOver}
        onFocus={ellipsis.onMouseOver}
        onMouseOut={ellipsis.onMouseOut}
        onBlur={ellipsis.onMouseOut}
        onScroll={ellipsis.onScroll}
      >
        <div className={tableClass} role="table" aria-label={ariaLabel}>
          {folders.length
            ? (
              <ul className="wbs-table__list">
                {folders.map((folder) => (
                  <BranchRow
                    key={folder.id}
                    folder={folder}
                    node={folder}
                    depth={0}
                    open={isOpen(folder.id)}
                    columns={columns}
                    showProgress={showProgress}
                    collapseLabel={collapseLabel}
                    expandLabel={expandLabel}
                    isOpen={isOpen}
                    onToggle={onToggle}
                    onRemark={onRemark}
                  />
                ))}
              </ul>
            )
            : <div className="wbs-empty">{emptyLabel}</div>}
        </div>
      </div>
      {ellipsis.node}
    </section>
  )
}
