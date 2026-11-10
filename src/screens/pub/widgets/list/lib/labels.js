/**
 * labels
 * - 퍼블리시 목록용 표시 라벨·상태색·비고 파싱 유틸
 * - 탭/폴더/depth 항목명, 상태, 유형, 비고 미리보기·검색 텍스트 등
 */

/** 뱃지/닷용 색상 키 */
const STATUS_COLOR = {
  all: 'default',
  done: 'success',
  active: 'info',
  pending: 'muted',
  delayed: 'warning'
}

/** 상태 코드 → 한글 라벨 */
const STATUS_LABEL = {
  all: '전체',
  done: '완료',
  active: '진행중',
  pending: '대기',
  delayed: '지연'
}

/** 항목 유형 코드 → 표시 */
const TYPE_LABEL = {
  index: 'Index',
  page: 'Page',
  guide: 'Guide'
}

/** 뱃지/닷용 색상 키 */
export const statusColor = (status) => STATUS_COLOR[status] || 'muted'

/** 상태 코드 → 표시 라벨 */
export const statusLabel = (status) => {
  if (!status) return '-'
  return STATUS_LABEL[status] || status
}

/** 탭 id → 표시 라벨 (없으면 JSON/기본 label) */
export const tabLabel = (tab) => {
  if (!tab) return '목록'
  return tab.label || '목록'
}

/**
 * 폴더명 — data JSON 원문.
 * 번역은 AppLayout GlobalTranslator 가 전역 처리한다.
 */
export const folderLabel = (folder) => {
  if (!folder) return ''
  return folder.name || folder.id || ''
}

/** 필터 버튼용 폴더 라벨 (번호 접두 제거) */
export const folderFilterLabel = (folder) =>
  String(folderLabel(folder) || '').replace(/^\d+\.\s*/, '')

/**
 * depth2/depth3 리프 표시명 — data JSON 원문.
 * 번역은 AppLayout GlobalTranslator 가 전역 처리한다.
 */
export const itemLabel = (folder, item) => {
  if (!item) return ''
  return item.name || item.id || ''
}

/** type 코드 → 표시 */
export const typeLabel = (type) => {
  if (!type) return '-'
  const key = String(type).toLowerCase()
  return TYPE_LABEL[key] || type
}

/** 비고 텍스트 정규화 */
function normalizeRemarkText (value) {
  if (value == null) return ''
  if (Array.isArray(value)) {
    return value
      .map((line) => (line == null ? '' : String(line)))
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }
  return String(value).replace(/\r\n/g, '\n').trim()
}

/** 비고 → [{ date, author, text }] */
export function remarkItems (remark) {
  if (!remark) return []
  if (Array.isArray(remark)) {
    return remark.map((entry) => {
      if (typeof entry === 'string') {
        return { date: '', author: '', text: normalizeRemarkText(entry) }
      }
      return {
        date: entry.date || entry.at || '',
        author: entry.author || entry.by || '',
        text: normalizeRemarkText(
          entry.text != null
            ? entry.text
            : entry.content != null
              ? entry.content
              : entry.message
        )
      }
    }).filter((entry) => !!entry.text)
  }
  if (typeof remark === 'string' && remark.trim()) {
    return [{ date: '', author: '', text: normalizeRemarkText(remark) }]
  }
  return []
}

/** 비고 내용 존재 여부 */
export const remarkHasContent = (remark) => remarkItems(remark).length > 0

/** 목록용 비고 미리보기 */
export function remarkPreview (remark) {
  const items = remarkItems(remark)
  if (!items.length) return '-'
  return items[items.length - 1].text.replace(/\s*\n\s*/g, ' ')
}

/** 검색용 비고 전체 텍스트 */
export const remarkSearchText = (remark) =>
  remarkItems(remark)
    .map((entry) => [entry.date, entry.author, entry.text].join(' '))
    .join(' ')
