'use client'

import { useEscapeKey } from '@/hooks/useEscapeKey'

/**
 * FilterSheet
 * - 모바일/좁은 화면용 화면명(폴더) 필터 버텀시트
 * - 전체 또는 특정 폴더 선택
 */
import { cx } from '@/utils/cx'

export default function FilterSheet ({
  title,
  ariaLabel,
  closeLabel,
  allLabel,
  folders,
  activeId,
  countOf,
  labelOf,
  onClose,
  onPick,
  panelRef
}) {
  useEscapeKey(panelRef, onClose)
  return (
    <div
      className="wbs-bottom-sheet"
    >
      <div className="wbs-bottom-sheet__backdrop" aria-hidden="true" onClick={onClose} />
      <div
        ref={panelRef}
        className="wbs-bottom-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wbs-filter-sheet-title"
        tabIndex={-1}
      >
        <header className="wbs-bottom-sheet__header">
          <div className="wbs-bottom-sheet__handle" aria-hidden="true" />
          <h2 id="wbs-filter-sheet-title" className="wbs-bottom-sheet__title">{title}</h2>
          <button
            type="button"
            className="wbs-btn is-ghost wbs-bottom-sheet__close"
            aria-label={closeLabel}
            onClick={onClose}
          >×</button>
        </header>
        <ul className="wbs-bottom-sheet__list" role="listbox" aria-label={ariaLabel}>
          <li role="option" aria-selected={!activeId ? 'true' : 'false'}>
            <button
              type="button"
              className={cx('wbs-bottom-sheet__item', { 'is-active': !activeId })}
              onClick={() => onPick(null)}
            >
              <span>{allLabel}</span>
              <span className="wbs-bottom-sheet__count">{folders.length}</span>
            </button>
          </li>
          {folders.map((folder) => (
            <li
              key={'filter-' + folder.id}
              role="option"
              aria-selected={activeId === folder.id ? 'true' : 'false'}
            >
              <button
                type="button"
                className={cx('wbs-bottom-sheet__item', { 'is-active': activeId === folder.id })}
                onClick={() => onPick(folder.id)}
              >
                <span>{labelOf(folder)}</span>
                <span className="wbs-bottom-sheet__count">{countOf(folder)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
