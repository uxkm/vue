/**
 * 파일 업로드.
 * button · drag · list · picture-card · avatar 변형을 공통 클래스로 표현한다.
 */
import {
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
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'type' | 'value' | 'defaultValue'> {
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
  onChange?: (files: File[]) => void
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
  const variantAlias = { dropzone: 'drag', cards: 'picture-card' } as const
  const resolvedVariant =
    variantAlias[variant as keyof typeof variantAlias] ?? variant
  const inputRef = useRef<HTMLInputElement>(null)
  const createdUrls = useRef<string[]>([])
  const [innerFiles, setInnerFiles] = useState<UploadFileItem[]>(defaultFiles)
  const [message, setMessage] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const files = controlledFiles ?? innerFiles

  useEffect(() => () => revokeUploadObjectUrls(createdUrls.current), [])

  const update = (next: UploadFileItem[]) => {
    if (controlledFiles === undefined) setInnerFiles(next)
    onChange?.(next.map((item) => item.file ?? (item as unknown as File)))
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
    const added = incoming.slice(0, available).map((file) => {
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
    update(multiple ? [...files, ...added] : added)
    if (inputRef.current) inputRef.current.value = ''
  }

  const remove = (index: number) => {
    const item = files[index]
    if (item?.url && createdUrls.current.includes(item.url)) {
      URL.revokeObjectURL(item.url)
      createdUrls.current = createdUrls.current.filter((url) => url !== item.url)
    }
    update(files.filter((_, itemIndex) => itemIndex !== index))
  }

  const openWithKeyboard = (event: KeyboardEvent<HTMLElement>) => {
    if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      inputRef.current?.click()
    }
  }

  const input = (
    <input
      {...props}
      ref={inputRef}
      id={resolvedInputId}
      className="upload_input"
      type="file"
      tabIndex={-1}
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
        tabIndex={disabled ? undefined : 0}
        onKeyDown={openWithKeyboard}
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
          tabIndex={disabled ? undefined : 0}
          onKeyDown={openWithKeyboard}
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
        tabIndex={disabled ? undefined : 0}
        onKeyDown={openWithKeyboard}
      >
        {input}
        {trigger ?? (
          <span className="avatar avatar_xl">
            {avatarSrc
              ? <img className="avatar_image" src={avatarSrc} alt={avatarAlt} />
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
        tabIndex={disabled ? undefined : 0}
        onKeyDown={openWithKeyboard}
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
