import copy from 'clipboard-copy'

/** vue-clipboard2 대체 */
export async function copyText (text) {
  await copy(String(text ?? ''))
  return true
}

export default copyText
