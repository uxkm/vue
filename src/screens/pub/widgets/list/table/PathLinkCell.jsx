/**
 * PathLinkCell
 * - PageUrl / 파일 경로 / 기획·디자인 칸용 링크 셀
 * - toAppHref·resolveLinkField·linkFieldSearchText 헬퍼도 함께 제공
 */
import { ellipsisAttr } from './useEllipsisTooltip.jsx'

/** `#/web/login` → `/web/login` */
export function toAppHref (url) {
  if (url == null || url === '') return url
  const s = String(url)
  if (s.startsWith('#/')) return s.slice(1)
  if (s.startsWith('#')) return '/' + s.slice(1)
  return s
}

/**
 * 기획/디자인 등 링크 필드 정규화
 * - 문자열: URL만
 * - 객체: { label, url|href }
 */
export function resolveLinkField (value) {
  if (value == null || value === '') return { href: '', label: '' }
  if (typeof value === 'object') {
    return {
      href: String(value.url || value.href || ''),
      label: String(value.label || value.name || '')
    }
  }
  return { href: String(value), label: '' }
}

/** 검색용 텍스트 (라벨 + URL) */
export function linkFieldSearchText (value) {
  const { href, label } = resolveLinkField(value)
  return [label, href].filter(Boolean).join(' ')
}

export default function PathLinkCell ({ href, label }) {
  const appHref = toAppHref(href)
  if (!appHref) return <span className="path-empty">-</span>

  const text = label || appHref
  return (
    <a
      className="path-link"
      href={appHref}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label
        ? <span className="path-link__label" {...ellipsisAttr}>{text}</span>
        : <code {...ellipsisAttr}>{text}</code>}
    </a>
  )
}
