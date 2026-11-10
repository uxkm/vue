'use client'

import { useEscapeKey } from '@/hooks/useEscapeKey'

/**
 * RemarkModal
 * - depth 항목 비고(히스토리) 상세 모달. Escape / 배경 클릭으로 닫기
 */
export default function RemarkModal ({
  itemName,
  itemId,
  items,
  historyLabel,
  detailLabel,
  closeLabel,
  emptyLabel,
  onClose,
  dialogRef
}) {
  useEscapeKey(dialogRef, onClose)
  return (
    <div
      className="remark-modal"
    >
      <div className="remark-modal__backdrop" aria-hidden="true" onClick={onClose} />
      <div
        ref={dialogRef}
        className="remark-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="remark-modal-title"
        tabIndex={-1}
      >
        <header className="remark-modal__header">
          <div>
            <p className="remark-modal__eyebrow">{historyLabel}</p>
            <h2 id="remark-modal-title" className="remark-modal__title">
              {itemName || detailLabel}
            </h2>
            {itemId && (
              <p className="remark-modal__meta">{itemId}</p>
            )}
          </div>
          <button
            type="button"
            className="wbs-btn is-ghost remark-modal__close"
            aria-label={closeLabel}
            onClick={onClose}
          >×</button>
        </header>
        <div className="remark-modal__body">
          {items.length
            ? (
              <ul className="remark-history">
                {items.map((item, index) => (
                  <li key={index} className="remark-history__item">
                    <div className="remark-history__head">
                      <span className="remark-history__date">{item.date || '-'}</span>
                      {item.author && (
                        <span className="remark-history__author">{item.author}</span>
                      )}
                    </div>
                    <p className="remark-history__text">{item.text}</p>
                  </li>
                ))}
              </ul>
            )
            : <div className="remark-modal__empty">{emptyLabel}</div>}
        </div>
      </div>
    </div>
  )
}
