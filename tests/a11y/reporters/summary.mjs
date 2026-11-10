import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

/** axe 위반과 수동 검토(incomplete)를 분리해 JSON·Markdown으로 기록한다. */
export default class AccessibilityReporter {
  scans = []
  failures = []

  onTestEnd (test, result) {
    if (result.status !== 'passed') {
      this.failures.push({ test: test.titlePath().join(' / '), status: result.status })
    }
    for (const attachment of result.attachments) {
      if (attachment.name !== 'axe-results') continue
      const body = attachment.body || readFileSync(attachment.path)
      this.scans.push(JSON.parse(body.toString()))
    }
  }

  onEnd (result) {
    // --list처럼 실제 검사를 하지 않은 실행은 기존 보고서를 덮어쓰지 않는다.
    if (!this.scans.length && !this.failures.length) return
    const folder = path.resolve('reports/a11y')
    mkdirSync(folder, { recursive: true })
    const report = {
      generatedAt: new Date().toISOString(),
      testStatus: result.status,
      mode: process.env.A11Y_AUDIT_ONLY === '1' ? 'audit' : 'strict',
      note: '자동 검사 결과이며 KWCAG 2.2 준수 판정이 아닙니다. incomplete는 수동 검토가 필요합니다.',
      failures: this.failures,
      scans: this.scans
    }
    writeFileSync(path.join(folder, 'summary.json'), JSON.stringify(report, null, 2) + '\n')
    const lines = [
      '# 접근성 자동 검사 결과',
      '',
      report.note,
      '',
      `- 실행 모드: ${report.mode}`,
      `- 테스트 상태: ${result.status} (audit 모드의 성공은 접근성 위반 0건을 뜻하지 않습니다.)`,
      `- 완료한 화면·상태 검사: ${this.scans.length}`,
      '',
      '| 환경 | 경로·상태 | 위반 규칙 | 위반 노드 | 수동 검토 규칙 |',
      '| --- | --- | --- | --- | --- |'
    ]
    for (const scan of this.scans) {
      const url = new URL(scan.url)
      lines.push(`| ${scan.project} | ${url.pathname} (${scan.state}) | ${scan.violations.length} | ${scan.violations.reduce((n, rule) => n + rule.nodes.length, 0)} | ${scan.incomplete.length} |`)
    }
    for (const scan of this.scans) {
      if (!scan.violations.length) continue
      lines.push('', `## ${scan.project}: ${new URL(scan.url).pathname} (${scan.state})`, '')
      for (const rule of scan.violations) {
        lines.push(`- [${rule.id}](${rule.helpUrl}): ${rule.nodes.length}개 노드 (${rule.impact || '미분류'})`)
      }
    }
    if (this.failures.length) {
      lines.push('', '## 실패한 테스트', '')
      for (const failure of this.failures) lines.push(`- ${failure.test}: ${failure.status}`)
    }
    writeFileSync(path.join(folder, 'summary.md'), lines.join('\n') + '\n')
    process.stdout.write(`\n접근성 결과: ${path.join(folder, 'summary.md')}\n`)
  }
}
