/**
 * FolderFilterBar
 * - 화면명 필터 트리거 버튼과, 선택된 폴더의 하위 리프 바로가기 목록
 */
import { cx } from '@/utils/cx'
import { toAppHref } from '../table/PathLinkCell'

export default function FolderFilterBar ({
  active,
  open,
  label,
  filterLabel,
  filterWithLabel,
  subsAria,
  items,
  itemLabelOf,
  onOpen
}) {
  return (
    <div className="wbs-filter-bar">
      <button
        type="button"
        className={cx('wbs-filter-btn', { 'is-active': active })}
        aria-expanded={open ? 'true' : 'false'}
        aria-haspopup="dialog"
        aria-label={active ? filterWithLabel : filterLabel}
        onClick={onOpen}
      >
        <span className="wbs-filter-btn__label">{label || filterLabel}</span>
        <span className="wbs-filter-btn__icon" aria-hidden="true">▾</span>
      </button>
      {items.length > 0 && (
        <div className="wbs-filter-selected">
          <span className="wbs-filter-selected__sep" aria-hidden="true" />
          <ul className="wbs-filter-subs" aria-label={subsAria}>
            {items.map((item, idx) => (
              <li key={(item.id || item.name || idx) + '-sub'}>
                {item.pageUrl
                  ? (
                    <a
                      className="wbs-filter-sub"
                      href={toAppHref(item.pageUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{itemLabelOf(item)}</a>
                  )
                  : (
                    <span className="wbs-filter-sub is-static">
                      {itemLabelOf(item)}
                    </span>
                  )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
