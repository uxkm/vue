/**
 * LeafRow
 * - depth2/depth3 최종 항목 한 줄 (이름·유형·ID·경로·일정·상태·기획/디자인·비고)
 * - level=1: Depth1 직속 리프 / level=2: Depth2 그룹 하위 리프
 */
import { cx } from '@/utils/cx'
import PathLinkCell, { resolveLinkField, toAppHref } from './PathLinkCell'
import { ellipsisAttr } from './useEllipsisTooltip.jsx'
import {
  remarkItems,
  remarkPreview,
  itemLabel,
  typeLabel,
  statusColor,
  statusLabel
} from '../lib/labels'

export default function LeafRow ({
  folder,
  item,
  level = 2,
  showProgress,
  onRemark
}) {
  const remarks = remarkItems(item.remark)
  const rowLevel = level === 1 ? 'level-1' : 'level-2'

  return (
    <li
      className={cx('wbs-table__row', rowLevel, 'status-' + (item.status || 'pending'))}
      role="row"
    >
      <div className="col-name" role="cell">
        <span className={cx('name', level === 2 ? 'name--grandchild' : 'name--child')}>
          {item.pageUrl
            ? (
              <a
                className="wbs-link"
                href={toAppHref(item.pageUrl)}
                target="_blank"
                rel="noopener noreferrer"
                {...ellipsisAttr}
              >{itemLabel(folder, item)}</a>
            )
            : <span className="name-label" {...ellipsisAttr}>{itemLabel(folder, item)}</span>}
        </span>
      </div>
      <div className="col-type" role="cell">
        <span className="wbs-tag is-muted">{typeLabel(item.type)}</span>
      </div>
      <div className="col-id" role="cell">
        <code>{item.id || '-'}</code>
      </div>
      <div className="col-pageurl" role="cell">
        <PathLinkCell href={toAppHref(item.pageUrl)} />
      </div>
      <div className="col-path" role="cell">
        {item.filePath
          ? <code {...ellipsisAttr}>{item.filePath}</code>
          : <span className="path-empty">-</span>}
      </div>
      <div className="col-owner" role="cell">{item.owner || '-'}</div>
      {showProgress && (
        <>
          <div className="col-start" role="cell">{item.start || '-'}</div>
          <div className="col-expected" role="cell">{item.expected || '-'}</div>
          <div className="col-end" role="cell">{item.end || '-'}</div>
          <div className="col-status" role="cell">
            <span className={cx('wbs-badge', 'is-' + statusColor(item.status))}>
              {statusLabel(item.status)}
            </span>
          </div>
          <div className="col-progress" role="cell">
            <span className="pct">{item.progress || 0}%</span>
          </div>
        </>
      )}
      <div className="col-planning" role="cell">
        <PathLinkCell {...resolveLinkField(item.planning)} />
      </div>
      <div className="col-design" role="cell">
        <PathLinkCell {...resolveLinkField(item.design)} />
      </div>
      <div className="col-remark" role="cell">
        {remarks.length > 0
          ? (
            <button
              type="button"
              className="remark-trigger"
              onClick={() => onRemark(folder, item)}
            >
              <span className="remark-preview" {...ellipsisAttr}>{remarkPreview(item.remark)}</span>
              {remarks.length > 1 && (
                <span className="wbs-badge is-muted is-count">+{remarks.length - 1}</span>
              )}
            </button>
          )
          : <span className="path-empty">-</span>}
      </div>
    </li>
  )
}

/** 키. 부모 목록에서 쓴다 */
export function leafRowKey (folder, item, index, groupId) {
  const base = folder.id + (groupId ? '/' + groupId : '')
  return base + '-' + (item.id || item.name || index) + '-' + index
}
