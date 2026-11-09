/**
 * PubIndexSkeleton
 * - PubIndex 로딩 중 실제 레이아웃과 동일한 스켈레톤 UI
 * - aria 는 SSR·하이드레이션용 원문 고정 (Skel 조각 조합)
 */
import { cx } from '@/utils/cx'
import Skel from './Skel'

export default function PubIndexSkeleton ({
  columns,
  showProgress,
  rowCount
}) {
  const visible = columns.filter((col) => !col.progress || showProgress)

  return (
    <div
      className="wbs-skeleton"
      aria-busy="true"
      aria-label="목록을 불러오는 중"
      suppressHydrationWarning
    >
      <header className="wbs-hero">
        <Skel mod="eyebrow" />
        <Skel mod="title" />
        <Skel mod="desc" />
        {showProgress && (
          <div className="wbs-summary">
            <div className="wbs-summary-main">
              <Skel mod="label" />
              <Skel mod="value" />
            </div>
            <Skel mod="bar" />
            <div className="wbs-skeleton__stats">
              {[1, 2, 3, 4, 5].map((n) => <Skel key={'stat-' + n} mod="stat" />)}
            </div>
          </div>
        )}
      </header>

      <div className="wbs-sticky" aria-hidden="true">
        <div className="wbs-tabs-bar wbs-skeleton__tabs">
          {[1, 2, 3, 4].map((n) => <Skel key={'tab-' + n} mod="tab" />)}
        </div>
        <div className="wbs-panel-head">
          <div className="wbs-skeleton__search">
            <Skel mod="select" />
            <Skel mod="input" />
          </div>
          <Skel mod="switch" />
        </div>
      </div>
      <div className="wbs-filter-bar" aria-hidden="true">
        <Skel mod="chip" style={{ width: '88px', height: '32px' }} />
        <Skel mod="chip" style={{ width: '72px' }} />
        <Skel mod="chip" style={{ width: '96px' }} />
      </div>

      <section className="wbs-panel" aria-hidden="true">
        <div className="wbs-table-wrap">
          <div className={cx('wbs-table', { 'is-progress-hidden': !showProgress })}>
            <div className="wbs-table__head" role="presentation">
              {visible.map((col) => (
                <div key={col.key} className={'col-' + col.key}>
                  <Skel mod="th" />
                </div>
              ))}
            </div>
            <ul className="wbs-table__list">
              {Array.from({ length: rowCount }, (_, i) => i + 1).map((n) => (
                <li key={'row-' + n} className="wbs-table__group">
                  <div className="wbs-table__row level-0">
                    <div className="col-name" role="presentation">
                      <Skel mod="toggle" />
                      <Skel mod="name" style={{ width: (40 + (n % 5) * 10) + '%' }} />
                    </div>
                    {visible.filter((col) => col.key !== 'name').map((col) => (
                      <div key={col.key} className={'col-' + col.key}>
                        <Skel mod="cell" />
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
