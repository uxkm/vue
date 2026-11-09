'use client'

/**
 * 퍼블리싱 가이드 접근성 — /guide/accessibility
 * KWCAG 2.2 검사기준·체크리스트.
 */
import { GuideLayout, MarkdownDoc } from '@/pages/pub/widgets/guide'
import {
  accessibilityBody,
  accessibilitySummary
} from '@/pages/pub/data/accessibilityDoc'

export const guideLabel = '접근성'
export const routeId = 'accessibility'

export default function GuideAccessibility () {
  return (
    <GuideLayout
      category="시작"
      title="접근성"
      description={accessibilitySummary}
    >
      <MarkdownDoc source={accessibilityBody} />
    </GuideLayout>
  )
}
