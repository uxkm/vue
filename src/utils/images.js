/**
 * public/images 정적 경로 헬퍼
 * - import 하지 않고 URL 문자열만 반환 → 빌드 번들에 포함되지 않음
 * - 실제 파일: public/images/{icon|common|pages}/...
 *
 * @example
 *   img('icon', 'close.svg')           // → /images/icon/close.svg
 *   imgIcon('close.svg')               // → /images/icon/close.svg
 *   <img src={img('common', 'logo.svg')} alt="" />
 *   style={{ backgroundImage: `url(${img('pages', 'home/hero.png')})` }}
 */

const BASE = '/images'

/** @param {'icon'|'common'|'pages'} folder @param {string} file */
export function img (folder, file) {
  const name = String(file || '').replace(/^\/+/, '')
  return `${BASE}/${folder}/${name}`
}

/** @param {string} file */
export function imgIcon (file) {
  return img('icon', file)
}

/** @param {string} file */
export function imgCommon (file) {
  return img('common', file)
}

/** @param {string} file */
export function imgPages (file) {
  return img('pages', file)
}
