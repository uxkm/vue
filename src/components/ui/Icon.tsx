'use client'

/**
 * 아이콘.
 * 등록 stroke SVG · images 폴더 .svg(img/embed) · 커스텀 도형.
 */
import {
  useEffect,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type SVGAttributes
} from 'react'
import { cx } from '@/utils/cx'
import { imgIcon } from '@/utils/images'
import {
  loadEmbeddedSvg,
  type EmbeddedSvgData
} from '@/utils/embedSvg'

/**
 * images 경로 해석.
 * - `/…` · `http(s):` · `data:` 는 그대로
 * - `common/logo.svg` 처럼 폴더 포함이면 `/images/…`
 * - `close.svg` · `close` 는 `/images/icon/…`
 */
export function resolveIconSrc (src: string): string {
  const value = String(src || '').trim()
  if (!value) return ''
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('/') || value.startsWith('data:')) {
    return value
  }
  if (value.includes('/')) {
    return `/images/${value.replace(/^\/+/, '')}`
  }
  return imgIcon(value.endsWith('.svg') ? value : `${value}.svg`)
}

/** name 이 파일 경로(.svg)인지 */
function isIconFileName (value: string): boolean {
  return /\.svg$/i.test(value) || value.includes('/')
}

/** 아이콘 크기 이름. md 는 기본이라 클래스 없음 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
/** 등록된 크기 토큰 목록 */
export const iconSizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
/** 아이콘 색 */
export type IconColor = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted'

/**
 * 커스텀 크기를 CSS 길이로 변환.
 * 토큰(xs~3xl)이면 null. 숫자·'28'·'28px'·'1.75rem'·'var(--x)' 지원.
 */
export function toIconCssSize (size: IconSize | number | string | undefined | null): string | null {
  if (typeof size === 'number') {
    return Number.isFinite(size) && size > 0 ? `${size}px` : null
  }
  if (typeof size !== 'string') return null
  const raw = size.trim()
  if (!raw || iconSizes.includes(raw as IconSize)) return null
  if (/^var\(--[\w-]+\)$/.test(raw)) return raw
  if (/^\d+(\.\d+)?$/.test(raw)) return `${raw}px`
  if (/^\d+(\.\d+)?(px|rem|em|%|vh|vw|ch|ex|vmin|vmax)$/i.test(raw)) return raw
  return null
}

/** 등록된 stroke SVG 아이콘 이름 → 도형. viewBox 0 0 24 24, stroke-width 2 */
const paths = {
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9 7V4h6v3m-9 0 1 14h10l1-14M10 11v6m4-6v6" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  warning: (
    <>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 9v4m0 3h.01" />
    </>
  ),
  chevron: <path d="m9 6 6 6-6 6" />,
  'chevron-left': <path d="m15 6-6 6 6 6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 5h16l2 9v5H2v-5l2-9Z" />
      <path d="M2 14h5l2 3h6l2-3h5" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  edit: (
    <>
      <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1L14.5 3h-5l-.4 3.1a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L5.1 11a7 7 0 0 0 0 2L3 14.5l2 3.4 2.4-1a8 8 0 0 0 1.7 1l.4 3.1h5l.4-3.1a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2.1-1.5a7 7 0 0 0 .1-1Z" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v11h14V10M10 21v-7h4v7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <rect x="14" y="14" width="6" height="6" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2 11h10l3-8H6" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </>
  ),
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  external: (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 13v7H4V6h7" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 7v5h-5" />
      <path d="M19 12a7 7 0 1 0-2 5" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a3 3 0 0 1 3-2h5v18H7a3 3 0 0 0-3 2V5Z" />
      <path d="M20 5a3 3 0 0 0-3-2h-5v18h5a3 3 0 0 1 3 2V5Z" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  upload: (
    <>
      <path d="M5 16v5h14v-5" />
      <path d="M12 17V3m0 0-4 4m4-4 4 4" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6m0-10h.01" />
    </>
  ),
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  'alert-triangle': (
    <>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 9v4m0 3h.01" />
    </>
  ),
  'x-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6m0-6-6 6" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M14 21h-4" />
    </>
  ),
  loader: <path d="M21 12a9 9 0 1 1-6.2-8.6" />,
  heart: (
    <path d="M20.8 5a5.5 5.5 0 0 0-7.8 0L12 6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.2A5.5 5.5 0 0 0 20.8 5Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-2 2" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l2-2" />
    </>
  ),
  'arrow-left': <path d="M19 12H5m7 7-7-7 7-7" />,
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 12 10 5 10-5" />
      <path d="m2 17 10 5 10-5" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M3 9h6" />
    </>
  ),
  table: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M3 15h18M9 4v16M15 4v16" />
    </>
  ),
  'message-circle': (
    <>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22l5.9-2Z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16.2 7.8-2.5 6.4-6.4 2.5 2.5-6.4 6.4-2.5Z" />
    </>
  ),
  'more-horizontal': (
    <>
      <path d="M5 12h.01M12 12h.01M19 12h.01" strokeWidth="3" strokeLinecap="round" />
    </>
  )
} as const

/** 제공 아이콘 이름 */
export type IconName = keyof typeof paths

/** 등록된 아이콘 이름 목록 */
export const iconNames = Object.keys(paths) as IconName[]

type SharedSvgProps = {
  className?: string
  title?: string
  resolvedLabel?: string
  hasWrapper: boolean
  sizeStyle?: CSSProperties
  style?: CSSProperties
  rest: Record<string, unknown>
}

/** 파일 SVG 를 fetch 해 인라인 코드로 그리는 내부 뷰 */
function EmbeddedSvg ({
  src,
  className,
  title,
  resolvedLabel,
  hasWrapper,
  sizeStyle,
  style,
  rest
}: SharedSvgProps & { src: string }) {
  const [data, setData] = useState<EmbeddedSvgData | null>(null)
  const [previousSrc, setPreviousSrc] = useState(src)
  if (previousSrc !== src) {
    setPreviousSrc(src)
    setData(null)
  }

  useEffect(() => {
    let alive = true
    loadEmbeddedSvg(src).then((next) => {
      if (alive) setData(next)
    })
    return () => {
      alive = false
    }
  }, [src])

  const svgProps: SVGAttributes<SVGSVGElement> = {
    className,
    viewBox: data?.viewBox || '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': hasWrapper || !resolvedLabel ? true : undefined,
    'aria-label': !hasWrapper ? resolvedLabel : undefined,
    role: !hasWrapper && resolvedLabel ? 'img' : undefined,
    style: !hasWrapper && (sizeStyle || style) ? { ...sizeStyle, ...style } : undefined,
    ...(!hasWrapper ? (rest as SVGAttributes<SVGSVGElement>) : {})
  }

  if (!data) {
    return (
      <svg {...svgProps} data-component="Icon" data-embed={src}>
        {title ? <title>{title}</title> : null}
      </svg>
    )
  }

  return (
    <svg
      {...svgProps}
      data-component="Icon"
      data-embed={src}
      dangerouslySetInnerHTML={{
        __html: (title ? `<title>${escapeXml(title)}</title>` : '') + data.innerHTML
      }}
    />
  )
}

function escapeXml (value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** 아이콘이 받는 값. name 등록 stroke · src images/.svg · embed 인라인 */
export interface IconProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color' | 'title' | 'onClick'> {
  name?: IconName | string
  /**
   * public/images 의 SVG 파일.
   * `close.svg` → /images/icon/close.svg
   * `common/logo.svg` → /images/common/logo.svg
   * `/images/…` · 절대 URL 은 그대로 사용
   */
  src?: string
  /**
   * true 이면 src 파일을 fetch 해 인라인 SVG 코드로 렌더.
   * false(기본) 이면 img 태그로 표시.
   * 인라인이면 currentColor · color_* 상속이 된다.
   */
  embed?: boolean
  /**
   * 크기.
   * - 토큰: xs · sm · md · lg · xl · 2xl · 3xl
   * - 커스텀: 28 · '28' · '28px' · '1.75rem' · 'var(--icon-banner)'
   */
  size?: IconSize | number | string
  color?: IconColor | ''
  inline?: boolean
  spin?: boolean
  button?: boolean
  circle?: boolean
  square?: boolean
  pulse?: boolean
  ripple?: boolean
  /** button 모드에서 비활성 */
  disabled?: boolean
  ariaLabel?: string
  title?: string
  children?: ReactNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

/**
 * 공통 아이콘.
 * children → src(+embed) 파일 SVG → name 등록 stroke 순.
 */
export function Icon ({
  name = 'plus',
  src = '',
  embed = false,
  size = 'md',
  color = '',
  inline = false,
  spin = false,
  button = false,
  circle = false,
  square = false,
  pulse = false,
  ripple = false,
  disabled = false,
  ariaLabel = '',
  title = '',
  children,
  className,
  style,
  onClick,
  ...rest
}: IconProps) {
  const resolvedLabel = ariaLabel || title || undefined
  // onClick 만 넘긴 경우에도 클릭 가능하도록 button 래퍼로 취급
  const asButton = Boolean(button || (onClick && !circle && !square))
  const hasWrapper = Boolean(asButton || circle || square)
  const customCssSize = toIconCssSize(size)
  const namedSize = !customCssSize && typeof size === 'string' && iconSizes.includes(size as IconSize)
    ? (size as IconSize)
    : (!customCssSize && typeof size !== 'number' ? 'md' : null)
  const sizeToken = customCssSize ? null : (namedSize || 'md')
  const sizeClass = sizeToken && sizeToken !== 'md' ? `icon_${sizeToken}` : ''
  const frameSizeClass =
    sizeToken && sizeToken !== 'md' ? `icon_circle-${sizeToken}` : ''

  const iconClass = cx('icon', sizeClass, spin && 'icon_spin')
  const outerClass = cx(
    asButton
      ? ['icon_button', frameSizeClass]
      : circle
        ? ['icon_circle', frameSizeClass]
        : square
          ? ['icon_square', frameSizeClass]
          : false,
    color && 'color_' + color,
    inline && 'icon_inline',
    pulse && circle && 'icon_pulse',
    !hasWrapper && iconClass,
    className
  )

  // 커스텀 크기 → --icon-custom-size (토큰·래퍼·내부 아이콘이 동일 값 사용)
  const sizeStyle: CSSProperties | undefined = customCssSize
    ? {
        width: customCssSize,
        height: customCssSize,
        ['--icon-custom-size' as string]: customCssSize
      }
    : undefined

  const hasChildren = children != null && children !== false && children !== ''
  const fileSrc = src
    ? resolveIconSrc(src)
    : (!hasChildren && isIconFileName(String(name)) ? resolveIconSrc(String(name)) : '')
  const useFile = Boolean(fileSrc)
  const useEmbed = useFile && embed
  const useImage = useFile && !embed
  const content = hasChildren
    ? children
    : useFile
      ? null
      : paths[name as IconName] ?? null

  const sharedSvg: SharedSvgProps = {
    className: hasWrapper ? iconClass : outerClass,
    title,
    resolvedLabel,
    hasWrapper,
    sizeStyle,
    style,
    rest: rest as Record<string, unknown>
  }

  const image = useImage
    ? (
      <img
        src={fileSrc}
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      )
    : null

  const svgProps: SVGAttributes<SVGSVGElement> = {
    className: sharedSvg.className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': hasWrapper || !resolvedLabel ? true : undefined,
    'aria-label': !hasWrapper ? resolvedLabel : undefined,
    role: !hasWrapper && resolvedLabel ? 'img' : undefined,
    style: !hasWrapper && (sizeStyle || style) ? { ...sizeStyle, ...style } : undefined,
    ...(!hasWrapper ? (rest as SVGAttributes<SVGSVGElement>) : {})
  }

  let graphic: ReactNode
  if (useEmbed) {
    graphic = <EmbeddedSvg {...sharedSvg} src={fileSrc} />
  } else if (useImage) {
    graphic = hasWrapper
      ? <i className={iconClass} data-component="Icon">{image}</i>
      : (
        <i
          {...rest}
          className={outerClass}
          data-component="Icon"
          aria-hidden={resolvedLabel ? undefined : true}
          aria-label={resolvedLabel}
          role={resolvedLabel ? 'img' : undefined}
          title={title || undefined}
          style={sizeStyle || style ? { ...sizeStyle, ...style } : undefined}
        >
          {image}
        </i>
        )
  } else {
    graphic = (
      <svg {...svgProps} data-component="Icon">
        {title ? <title>{title}</title> : null}
        {content}
      </svg>
    )
  }

  if (asButton) {
    return (
      <button
        {...rest}
        type="button"
        className={outerClass}
        aria-label={resolvedLabel}
        disabled={disabled}
        data-ripple={ripple ? 'true' : undefined}
        style={sizeStyle || style ? { ...sizeStyle, ...style } : undefined}
        onClick={onClick}
      >
        {graphic}
      </button>
    )
  }

  if (circle || square) {
    return (
      <span
        {...rest}
        className={outerClass}
        aria-label={resolvedLabel}
        aria-hidden={resolvedLabel ? undefined : true}
        role={resolvedLabel ? 'img' : onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        style={sizeStyle || style ? { ...sizeStyle, ...style } : undefined}
        onClick={onClick}
        onKeyDown={
          onClick
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onClick(event as unknown as MouseEvent<HTMLElement>)
                }
              }
            : undefined
        }
      >
        {graphic}
      </span>
    )
  }

  return graphic
}

export default Icon
