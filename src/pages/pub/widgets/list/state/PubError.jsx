/**
 * PubError
 * - JSON 등 데이터 불러오기 실패 시 안내 문구와 다시 시도 버튼
 */
export default function PubError ({ message, retryLabel, onRetry }) {
  return (
    <div className="wbs-state wbs-alert" role="alert">
      <p className="wbs-alert__title">{message}</p>
      <button type="button" className="wbs-btn" onClick={onRetry}>
        {retryLabel}
      </button>
    </div>
  )
}
