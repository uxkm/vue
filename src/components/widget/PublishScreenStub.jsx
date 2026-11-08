'use client'

/**
 * 퍼블 화면 골격 스텁.
 * 폴더/화면 메타·하위 링크를 한글 원문으로 보여 준다.
 */
import { Link } from '@/lib/router'

/**
 * 퍼블 화면 골격 UI — 한글 원문으로 렌더.
 * 번역은 AppLayout GlobalTranslator 가 전역 처리한다 (locales 불필요).
 *
 * props
 * - device      : 기기 구분 문구 (예: Mobile)
 * - folderId    : 폴더 id (이름 없을 때 대체)
 * - folderName  : 폴더 표시명
 * - screenName  : 화면 제목 (없으면 folderName)
 * - screenType  : 메타 dl 용 타입
 * - screenId    : 메타 dl 용 id (번역 제외)
 * - pageUrl     : 메타 dl 용 URL (번역 제외)
 * - links       : 하위 화면 링크 목록 `{ to, label, screenId? }[]`
 */
export function PublishScreenStub ({
  device,
  folderId,
  folderName,
  screenName,
  screenType,
  screenId,
  pageUrl,
  links
}) {
  const folderLabel = folderName || folderId || ''
  const nameLabel = screenName || folderLabel
  /** 폴더명 앞 번호(예: "01. ") 제거한 짧은 이름 — 안내 문구용 */
  const shortName = String(folderLabel || '').replace(/^\d+\.\s*/, '') || nameLabel

  return (
    <div className="page">
      {device ? <p>{device} 메뉴</p> : null}
      <h1>{nameLabel}</h1>
      {(screenType || screenId || pageUrl) ? (
        <dl>
          {screenType ? (
            <div>
              <dt>Screen Type</dt>
              <dd>{screenType}</dd>
            </div>
          ) : null}
          {screenId ? (
            <div>
              <dt>Screen ID</dt>
              <dd data-no-translate="true">{screenId}</dd>
            </div>
          ) : null}
          {pageUrl ? (
            <div>
              <dt>PageUrl</dt>
              <dd data-no-translate="true">{pageUrl}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      <p>
        {Array.isArray(links) && links.length
          ? `${shortName} 메뉴 메인입니다. 하위 화면을 선택하세요.`
          : `${shortName} 메뉴 퍼블리시 화면입니다. 시안·마크업을 이 페이지에 연결해 작업하세요.`}
      </p>
      {Array.isArray(links) && links.length ? (
        <ul>
          {links.map((item) => (
            <li key={item.to || item.screenId || item.label}>
              {item.to
                ? <Link to={item.to}>{item.label}</Link>
                : (item.label || '')}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default PublishScreenStub
