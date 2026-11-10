/**
 * PubSearchBar
 * - 검색 카테고리·검색어 입력, 지우기, 폴더 모두 펼치기/접기
 */
export default function PubSearchBar ({
  categoryLabel,
  categoryId = 'wbs-search-category',
  category,
  categories,
  onCategory,
  searchLabel,
  inputId = 'wbs-search-input',
  value,
  placeholder,
  onChange,
  onSearch,
  onClear,
  clearLabel,
  expanded,
  expandLabel,
  collapseLabel,
  onExpand
}) {
  return (
    <div className="wbs-panel-head">
      <div className="wbs-search">
        <label className="wbs-search-label" htmlFor={categoryId}>{categoryLabel}</label>
        <select
          id={categoryId}
          className="wbs-select"
          value={category}
          onChange={(e) => onCategory(e.target.value)}
        >
          {categories.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <label className="wbs-search-label" htmlFor={inputId}>{searchLabel}</label>
        <div className="wbs-search-field">
          <input
            id={inputId}
            className="wbs-input"
            type="search"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onSearch()
              }
            }}
          />
          {value && (
            <button
              type="button"
              className="wbs-input-clear"
              aria-label={clearLabel}
              onClick={onClear}
            >×</button>
          )}
        </div>
      </div>
      <div className="wbs-actions">
        <label className="wbs-switch">
          <input
            type="checkbox"
            checked={expanded}
            onChange={(e) => onExpand(e.target.checked)}
          />
          <span className="wbs-switch__ui" aria-hidden="true" />
          <span className="wbs-switch__label">{expanded ? collapseLabel : expandLabel}</span>
        </label>
      </div>
    </div>
  )
}
