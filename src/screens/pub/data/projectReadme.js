/**
 * 루트 README.md 원문.
 * 가이드 소개(/guide)가 이 내용을 렌더한다.
 */
import readme from '../../../../README.md'

export const projectReadme = String(readme || '')

/** README 첫 문단 — GuideLayout description 용 */
export function projectReadmeSummary () {
  const lines = projectReadme.replace(/\r\n/g, '\n').split('\n')
  for (const line of lines) {
    const text = line.trim()
    if (!text || text.startsWith('#') || text.startsWith('|') || text.startsWith('```')) continue
    return text
  }
  return '프로젝트 README'
}

/**
 * 소개 본문용 README.
 * 상단 `# 제목` 과 첫 문단(레이아웃 description 과 중복)은 제외한다.
 */
export function projectReadmeBody () {
  const lines = projectReadme.replace(/\r\n/g, '\n').split('\n')
  let i = 0

  // 선행 빈 줄
  while (i < lines.length && !lines[i].trim()) i += 1

  // 선두 H1 (# Publish List 등)
  if (i < lines.length && /^#\s+/.test(lines[i].trim()) && !/^##\s+/.test(lines[i].trim())) {
    i += 1
  }

  while (i < lines.length && !lines[i].trim()) i += 1

  // 첫 문단 (description 과 동일)
  if (i < lines.length && !lines[i].trim().startsWith('#') && !lines[i].trim().startsWith('|') && !lines[i].trim().startsWith('```')) {
    while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith('#') && !lines[i].trim().startsWith('|') && !lines[i].trim().startsWith('```')) {
      i += 1
    }
  }

  while (i < lines.length && !lines[i].trim()) i += 1

  return lines.slice(i).join('\n').trimStart()
}

export default projectReadme
