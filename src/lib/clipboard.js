import copy from 'clipboard-copy'

/** 클립보드 복사 헬퍼 */
export async function copyText (text) {
  await copy(String(text ?? ''))
  return true
}

export default copyText
