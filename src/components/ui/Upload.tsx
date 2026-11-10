'use client'

import { useLatestRef } from '@/hooks/useLatestRef'

/**
 * 파일 업로드.
 * button · drag · list · picture-card · avatar 변형을 공통 클래스로 표현한다.
 */
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type DragEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode
} from 'react'
import { cx } from '@/utils/cx'

/** 업로드 목록 항목 */
export interface UploadFileItem {
  file?: File
  name: string
  size?: number
  type?: string
  url?: string
  status?: 'done' | 'uploading' | 'error' | string
  progress?: number
  error?: string
}

/** 업로드가 받는 값 */
export interface UploadProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange' | 'type' | 'value' | 'defaultValue' | 'title' | 'onError' | 'onSelect'
  > {
  inputId?: string
  variant?: 'button' | 'drag' | 'list' | 'picture-card' | 'avatar' | 'dropzone' | 'cards'
  size?: 'sm' | 'md' | 'lg'
  fit?: boolean
  disabled?: boolean
  error?: boolean
  dragover?: boolean
  multiple?: boolean
  accept?: string
  maxSize?: number
  maxFiles?: number
  files?: UploadFileItem[]
  defaultFiles?: UploadFileItem[]
  /**
   * 목록이 바뀔 때 호출. files 와 같은 UploadFileItem[] 을 넘긴다(제어 왕복 가능).
   */
  onChange?: (files: UploadFileItem[]) => void
  /** 새로 선택한 File[] 만 전달(추가 시점) */
  onSelect?: (files: File[]) => void
  /** 항목 삭제 직 호출. 삭제될 항목과 인덱스 */
  onRemove?: (item: UploadFileItem, index: number) => void
  onError?: (message: string) => void
  buttonLabel?: ReactNode
  title?: ReactNode
  description?: ReactNode
  hint?: ReactNode
  removeLabel?: string
  trigger?: ReactNode
  cards?: ReactNode
  avatarSrc?: string
  avatarAlt?: string
  children?: ReactNode
}

const formatSize = (bytes = 0) =>
  bytes < 1024
    ? `${bytes} B`
    : bytes < 1048576
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / 1048576).toFixed(1)} MB`

const uploadIcon = (
  <svg
    className="icon"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 16v5h14v-5M12 17V3m0 0-4 4m4-4 4 4" />
  </svg>
)

const fileIcon = (
  <svg
    className="icon"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 2h8l4 4v16H6zM14 2v5h5" />
  </svg>
)

const plusIcon = (
  <svg
    className="icon icon_lg"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const userIcon = (
  <svg
    className="avatar_icon"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
)

const accepts = (file: File, accept?: string) =>
  !accept ||
  accept.split(',').some((rule) => {
    const value = rule.trim()
    return value.startsWith('.')
      ? file.name.toLowerCase().endsWith(value.toLowerCase())
      : value.endsWith('/*')
        ? file.type.startsWith(value.slice(0, -1))
        : file.type === value
  })

/** 생성한 object URL을 해제한다 */
export const revokeUploadObjectUrls = (urls: string[]) => {
  urls.forEach((url) => URL.revokeObjectURL(url))
}

/**
 * 파일을 선택·첨부하는 업로드.
 * variant로 버튼·드롭존·목록·카드·아바타 UI를 고른다.
 */
export function Upload ({
  id,
  inputId,
  variant = 'button',
  size = 'md',
  fit = false,
  disabled = false,
  error = false,
  dragover = false,
  multiple = false,
  accept,
  maxSize,
  maxFiles,
  files: controlledFiles,
  defaultFiles = [],
  onChange,
  onSelect,
  onRemove,
  onError,
  buttonLabel = '파일 선택',
  title = '파일을 끌어다 놓거나 선택하세요',
  description,
  hint,
  removeLabel = '파일 삭제',
  trigger,
  cards,
  avatarSrc,
  avatarAlt = '프로필 사진',
  className,
  children,
  ...props
}: UploadProps) {
  const generatedId = useId().replace(/:/g, '')
  const resolvedInputId = inputId || id || `upload-${generatedId}`
  type ResolvedVariant = 'button' | 'drag' | 'list' | 'picture-card' | 'avatar'
  const resolvedVariant: ResolvedVariant =
    variant === 'dropzone'
      ? 'drag'
      : variant === 'cards'
        ? 'picture-card'
        : (variant as ResolvedVariant)
  const inputRef = useRef<HTMLInputElement>(null)
  const createdUrls = useRef<string[]>([])
  const [innerFiles, setInnerFiles] = useState<UploadFileItem[]>(defaultFiles)
  const [message, setMessage] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const controlled = controlledFiles !== undefined
  const files = controlled ? controlledFiles : innerFiles
  const filesRef = useLatestRef(files)
  /** avatar 미리보기: 제어 files 의 url 을 우선하고, 없으면 avatarSrc */
  const avatarPreview = files[0]?.url || avatarSrc

  const pruneStaleUrls = useCallback(() => {
    const active = new Set(
      filesRef.current.map((item) => item.url).filter((url): url is string => Boolean(url))
    )
    const kept: string[] = []
    const stale: string[] = []
    createdUrls.current.forEach((url) => {
      if (active.has(url)) kept.push(url)
      else stale.push(url)
    })
    createdUrls.current = kept
    if (stale.length) revokeUploadObjectUrls(stale)
  }, [filesRef])

  // files 에 더 이상 없는 object URL 만 해제(제어 부모가 삭제를 거부해도 미리보기가 깨지지 않음)
  useEffect(() => {
    pruneStaleUrls()
  }, [files, pruneStaleUrls])

  useEffect(() => () => revokeUploadObjectUrls(createdUrls.current), [])

  const update = (next: UploadFileItem[]) => {
    if (!controlled) setInnerFiles(next)
    onChange?.(next)
    // 제어 모드에서 부모가 반영하지 않으면 다음 프레임에 미반영 object URL 회수
    if (controlled) requestAnimationFrame(pruneStaleUrls)
  }

  const addFiles = (list: FileList | File[] | null) => {
    if (disabled) return
    const incoming = Array.from(list || [])
    const invalid = incoming.find(
      (file) => !accepts(file, accept) || (maxSize != null && file.size > maxSize)
    )
    if (invalid) {
      const nextMessage = !accepts(invalid, accept)
        ? `${invalid.name}: 허용되지 않는 파일 형식입니다.`
        : `${invalid.name}: 파일 크기 제한을 초과했습니다.`
      setMessage(nextMessage)
      onError?.(nextMessage)
      return
    }
    const limit = multiple ? maxFiles || Infinity : 1
    const available = Math.max(0, limit - (multiple ? files.length : 0))
    if (!available || incoming.length > available) {
      const nextMessage = `파일은 최대 ${limit}개까지 선택할 수 있습니다.`
      setMessage(nextMessage)
      onError?.(nextMessage)
      return
    }
    const selected = incoming.slice(0, available)
    const added = selected.map((file) => {
      const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : ''
      if (preview) createdUrls.current.push(preview)
      return {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        url: preview,
        status: 'done'
      } satisfies UploadFileItem
    })
    setMessage('')
    onSelect?.(selected)
    update(multiple ? [...files, ...added] : added)
    if (inputRef.current) inputRef.current.value = ''
  }

  const remove = (index: number) => {
    const item = files[index]
    if (!item) return
    onRemove?.(item, index)
    // object URL 해제는 files sync effect 가 담당(부모가 삭제를 거부하면 유지)
    update(files.filter((_, itemIndex) => itemIndex !== index))
  }

  const input = (
    <input
      {...props}
      ref={inputRef}
      id={resolvedInputId}
      className="upload_input"
      type="file"
      disabled={disabled}
      multiple={multiple}
      accept={accept}
      aria-invalid={error || undefined}
      onChange={(event) => addFiles(event.target.files)}
    />
  )

  const classes = cx(
    'upload',
    fit && 'upload_fit',
    size !== 'md' && `upload_${size}`,
    disabled && 'is-disabled',
    className
  )

  let triggerNode: ReactNode = null

  if (resolvedVariant === 'list') {
    triggerNode = null
  } else if (resolvedVariant === 'drag') {
    triggerNode = (
      <label
        className={cx(
          'upload_dropzone',
          (dragover || dragActive) && 'is-dragover',
          (error || message) && 'is-error'
        )}
        htmlFor={resolvedInputId}
        onDragEnter={(event: DragEvent<HTMLLabelElement>) => {
          event.preventDefault()
          if (!disabled) setDragActive(true)
        }}
        onDragOver={(event: DragEvent<HTMLLabelElement>) => event.preventDefault()}
        onDragLeave={(event: DragEvent<HTMLLabelElement>) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setDragActive(false)
          }
        }}
        onDrop={(event: DragEvent<HTMLLabelElement>) => {
          event.preventDefault()
          setDragActive(false)
          addFiles(event.dataTransfer.files)
        }}
      >
        {input}
        {trigger ?? (
          <>
            <span className="upload_dropzone-icon">{uploadIcon}</span>
            <span className="upload_dropzone-title">{title}</span>
            {description
              ? <span className="upload_dropzone-desc">{description}</span>
              : null}
          </>
        )}
      </label>
    )
  } else if (resolvedVariant === 'picture-card') {
    triggerNode = (
      <div className="upload_cards">
        {cards}
        {files.map((item, index) => (
          <div className="upload_card" key={`${item.name}-${index}`}>
            {item.url
              ? <img className="upload_card-image" src={item.url} alt={item.name} />
              : <span className="upload_item-icon">{fileIcon}</span>}
            <div className="upload_card-actions">
              <button
                type="button"
                className="btn btn_ghost btn_icon-only btn_sm"
                aria-label={`${item.name} ${removeLabel}`}
                onClick={() => remove(index)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <label
          className="upload_card upload_card-trigger"
          htmlFor={resolvedInputId}
            >
          {input}
          {trigger ?? (
            <>
              {plusIcon}
              <span>{buttonLabel}</span>
            </>
          )}
        </label>
      </div>
    )
  } else if (resolvedVariant === 'avatar') {
    triggerNode = (
      <label
        className="upload_avatar"
        htmlFor={resolvedInputId}
      >
        {input}
        {trigger ?? (
          <span className="avatar avatar_xl">
            {avatarPreview
              ? <img className="avatar_image" src={avatarPreview} alt={avatarAlt} />
              : userIcon}
          </span>
        )}
        <span className="upload_avatar-overlay" aria-hidden="true">
          {uploadIcon}
        </span>
      </label>
    )
  } else {
    triggerNode = (
      <label
        className="upload_trigger"
        htmlFor={resolvedInputId}
      >
        {input}
        {trigger ?? (
          <span className="btn btn_filled color_primary">
            <span className="btn_label">{buttonLabel}</span>
          </span>
        )}
      </label>
    )
  }

  const listNode =
    files.length > 0 && resolvedVariant !== 'picture-card' && resolvedVariant !== 'avatar'
      ? (
        <ul className="upload_list">
          {files.map((item, index) => (
            <li
              className={cx(
                'upload_item',
                item.status === 'error' && 'is-error',
                item.status !== 'uploading' && 'is-done'
              )}
              key={`${item.name}-${index}`}
            >
              <span className="upload_item-icon">{fileIcon}</span>
              <span className="upload_item-body">
                <span className="upload_item-name">{item.name}</span>
                <span className="upload_item-meta">
                  {item.status === 'error'
                    ? item.error || '업로드 실패'
                    : `${formatSize(item.size)} · 선택 완료`}
                </span>
                {item.status === 'uploading'
                  ? (
                    <span
                      className="upload_progress"
                      role="progressbar"
                      aria-valuenow={item.progress || 0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${item.name} 업로드 진행률`}
                    >
                      <span
                        className="upload_progress-bar"
                        style={{ width: `${item.progress || 0}%` }}
                      />
                    </span>
                    )
                  : null}
              </span>
              <button
                type="button"
                className="upload_item-action btn btn_ghost btn_icon-only btn_sm"
                aria-label={`${item.name} ${removeLabel}`}
                onClick={() => remove(index)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        )
      : null

  return (
    <div className={classes}>
      {triggerNode}
      {(resolvedVariant === 'button' || resolvedVariant === 'drag') && hint
        ? <p className="upload_hint">{hint}</p>
        : null}
      {message
        ? (
          <p className="form_field-error" role="alert">
            {message}
          </p>
          )
        : null}
      {children}
      {listNode}
    </div>
  )
}

export default Upload
