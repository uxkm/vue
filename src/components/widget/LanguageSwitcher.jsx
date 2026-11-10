'use client'

/**
 * 전역 언어 전환 드롭다운.
 * 라벨은 한글 고정, 번역 중 진행률 표시. data-no-translate 로 번역 제외.
 */
import { useId, useRef, useState } from 'react'
import { Button } from '../ui/Button.tsx'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLocale } from '@/hooks/useLocale'
import { cx } from '@/utils/cx'

/**
 * 전역 언어 전환 버튼.
 * 클릭 시 Dropdown 메뉴로 언어를 고른다. 라벨은 항상 한글.
 * 번역 중에는 라벨 옆에 진행률(%)을 표시한다.
 * data-no-translate 로 번역기 대상에서 제외.
 */
export function LanguageSwitcher ({
  className,
  /** 트리거 버튼 id. 없으면 useId 로 자동 생성 */
  id
}) {
  const autoId = useId()
  const triggerId = id || `app-language-${autoId}`
  const menuId = `${triggerId}-menu`
  const {
    locale,
    setLocale,
    locales,
    localeBusy,
    localeProgress,
    localeError,
    retryTranslation
  } = useLocale()
  /** 드롭다운 열림 */
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  /** 바깥 클릭 시 메뉴 닫기 */
  useClickOutside(rootRef, () => setOpen(false), open)

  const current = locales.find((item) => item.code === locale) || locales[0]
  const showProgress = localeProgress != null
  const progressText = showProgress ? `${Math.max(0, Math.min(100, localeProgress))}%` : ''

  /** 언어 선택. 번역 중이거나 동일 언어면 무시 */
  const onSelect = (code) => {
    setOpen(false)
    if ((localeBusy && code !== 'ko') || code === locale) return
    void setLocale(code).catch(() => {})
  }

  return (
    <div
      ref={rootRef}
      className={cx(
        'dropdown',
        'dropdown_placement-end',
        'lang-switcher',
        open && 'is-open',
        localeBusy && 'is-loading',
        className
      )}
      data-no-translate="true"
      lang="ko"
    >
      <Button
        id={triggerId}
        variant="select"
        color="default"
        size="sm"
        className="dropdown_trigger"
        open={open}
        haspopup="menu"
        expanded={open}
        ariaLabel={showProgress ? `${current.label} 언어 선택 ${progressText}` : `${current.label} 언어 선택`}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="lang-switcher__label-row">
          <span className="lang-switcher__label-text">{current.label}</span>
          {showProgress ? (
            <span className="lang-switcher__progress" aria-live="polite">
              {progressText}
            </span>
          ) : null}
        </span>
      </Button>
      {open ? (
        <div
          id={menuId}
          className="dropdown_menu"
          role="menu"
          aria-labelledby={triggerId}
        >
          {locales.map((item) => (
            <button
              key={item.code}
              type="button"
              role="menuitemradio"
              aria-checked={locale === item.code}
              className={cx('menu_link', locale === item.code && 'is-active')}
              disabled={localeBusy && item.code !== 'ko'}
              onClick={() => onSelect(item.code)}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
      {localeError ? (
        <div className="lang-switcher__status lang-switcher__status--error">
          <span role="alert">{localeError}</span>
          {locale !== 'ko' ? (
            <button type="button" onClick={retryTranslation} disabled={localeBusy}>
              다시 시도
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default LanguageSwitcher
