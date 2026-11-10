import { ESLint } from 'eslint'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const eslint = new ESLint()
const results = await eslint.lintFiles(['app', 'src'])
const findings = results.flatMap((result) => result.messages
  .filter((message) => message.ruleId?.startsWith('jsx-a11y/') || message.fatal)
  .map((message) => ({ file: path.relative(process.cwd(), result.filePath), ...message })))

mkdirSync('reports/a11y', { recursive: true })
writeFileSync('reports/a11y/lint.json', JSON.stringify({ findings }, null, 2) + '\n')
for (const finding of findings) {
  console.log(`${finding.file}:${finding.line}:${finding.column} ${finding.ruleId || 'parse-error'} ${finding.message}`)
}
console.log(`\n접근성 정적 검사: ${findings.length}건 (reports/a11y/lint.json)`)
// 일반 lint의 경고도 이 전용 명령에서는 실패로 취급한다.
process.exitCode = findings.length ? 1 : 0
