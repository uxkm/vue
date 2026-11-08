/**
 * PubTabs
 * - B2B / WEB / MOBILE 등 퍼블리시 데이터 탭 전환
 * - 탭이 1개 이하면 전체 숨김 (컴포넌트 가이드는 상단 헤더에서 새 창으로 제공)
 */
import { cx } from '@/utils/cx'

export default function PubTabs ({
  tabs,
  activeTab,
  ariaLabel,
  labelOf,
  onSelect
}) {
  const showTabs = (tabs || []).length > 1
  if (!showTabs) return null

  return (
    <div className="wbs-tabs-bar">
      <div className="wbs-tabs-bar__tabs" role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={cx('wbs-tab', { 'is-active': activeTab === tab.id })}
            role="tab"
            aria-selected={activeTab === tab.id ? 'true' : 'false'}
            onClick={() => onSelect(tab.id)}
          >{labelOf(tab)}</button>
        ))}
      </div>
    </div>
  )
}
