'use client'

import { Divider, Space } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { dividerApiSections } from '@/screens/pub/data/guide/dividerApiSections'

const SECTIONS = [
  {
    title: '기본',
    code: wrapPageExample(`<p>위 콘텐츠</p>
<Divider />
<p>아래 콘텐츠</p>`, {
      name: 'DividerExample',
      reactImports: [],
      compImports: ['Divider']
    }),
    preview: (
      <div className="typo_stack">
        <p>위 콘텐츠</p>
        <Divider />
        <p>아래 콘텐츠</p>
      </div>
    )
  },
  {
    title: '점선',
    code: wrapPageExample(`<p>위 콘텐츠</p>
<Divider dashed />
<p>아래 콘텐츠</p>`, {
      name: 'DividerDashedExample',
      reactImports: [],
      compImports: ['Divider']
    }),
    preview: (
      <div className="typo_stack">
        <p>위 콘텐츠</p>
        <Divider dashed />
        <p>아래 콘텐츠</p>
      </div>
    )
  },
  {
    title: '텍스트 레이블',
    code: wrapPageExample(`<Divider label="섹션 제목" />
<Divider plain label="보조 설명" />`, {
      name: 'DividerLabelExample',
      reactImports: [],
      compImports: ['Divider']
    }),
    preview: (
      <div className="typo_stack">
        <Divider label="섹션 제목" />
        <Divider plain label="보조 설명" />
      </div>
    )
  },
  {
    title: '레이블 정렬',
    code: wrapPageExample(`<Divider orient="left" label="왼쪽" />
<Divider label="가운데" />
<Divider orient="right" label="오른쪽" />`, {
      name: 'DividerOrientExample',
      reactImports: [],
      compImports: ['Divider']
    }),
    preview: (
      <div className="typo_stack">
        <Divider orient="left" label="왼쪽" />
        <Divider label="가운데" />
        <Divider orient="right" label="오른쪽" />
      </div>
    )
  },
  {
    title: '세로',
    code: wrapPageExample(`<Space>
  <span>항목 A</span>
  <Divider vertical />
  <span>항목 B</span>
  <Divider vertical dashed />
  <span>항목 C</span>
</Space>`, {
      name: 'DividerVerticalExample',
      reactImports: [],
      compImports: ['Divider', 'Space']
    }),
    preview: (
      <Space>
        <span>항목 A</span>
        <Divider vertical />
        <span>항목 B</span>
        <Divider vertical dashed />
        <span>항목 C</span>
      </Space>
    )
  }
]

/**
 * Divider 가이드 화면.
 * 가로·세로·라벨과 API 문서를 한 페이지에 모은다.
 */
export default function DividerGuide () {
  return (
    <GuideLayout
      category="레이아웃"
      title="Divider"
      description="가로·세로 구분선입니다. dashed·라벨·orient로 변형합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="DividerExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={dividerApiSections} />
    </GuideLayout>
  )
}
