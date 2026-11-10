'use client'

import { Flex } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { flexApiSections } from '@/screens/pub/data/guide/flexApiSections'

const cells = (count, label = (index) => String(index + 1)) =>
  Array.from({ length: count }, (_, index) => (
    <div className="flex_demo-cell" key={index}>
      {typeof label === 'function' ? label(index) : label}
    </div>
  ))

const SECTIONS = [
  {
    title: '정렬과 비율',
    code: wrapPageExample(`<Flex justify="between" gap="sm">
  <div className="flex_demo-cell">Start</div>
  <div className="flex_demo-cell">End</div>
</Flex>
<Flex ratio="2-1" gap="sm">
  <div className="flex_demo-cell">2</div>
  <div className="flex_demo-cell">1</div>
</Flex>`, {
      name: 'FlexExample',
      reactImports: [],
      compImports: ['Flex']
    }),
    preview: (
      <div className="typo_stack">
        <Flex justify="between" gap="sm">
          <div className="flex_demo-cell">Start</div>
          <div className="flex_demo-cell">End</div>
        </Flex>
        <Flex ratio="2-1" gap="sm">
          <div className="flex_demo-cell">2</div>
          <div className="flex_demo-cell">1</div>
        </Flex>
      </div>
    )
  },
  {
    title: '균등 항목',
    code: wrapPageExample(`<Flex cols={2}>{/* cells */}</Flex>
<Flex cols={4}>…</Flex>`, {
      name: 'FlexColsExample',
      reactImports: [],
      compImports: ['Flex']
    }),
    preview: (
      <div className="typo_stack">
        <Flex cols={2}>{cells(2, 'cols 2')}</Flex>
        <Flex cols={4}>{cells(4, 'cols 4')}</Flex>
      </div>
    )
  },
  {
    title: '비율 항목',
    code: wrapPageExample(`<Flex ratio="1-2">
  <div className="flex_demo-cell">1</div>
  <div className="flex_demo-cell">2</div>
</Flex>
<Flex ratio="1-2-1">
  <div className="flex_demo-cell">1</div>
  <div className="flex_demo-cell">2</div>
  <div className="flex_demo-cell">1</div>
</Flex>`, {
      name: 'FlexRatioExample',
      reactImports: [],
      compImports: ['Flex']
    }),
    preview: (
      <div className="typo_stack">
        <Flex ratio="1-2">
          <div className="flex_demo-cell">1</div>
          <div className="flex_demo-cell">2</div>
        </Flex>
        <Flex ratio="1-2-1">
          <div className="flex_demo-cell">1</div>
          <div className="flex_demo-cell">2</div>
          <div className="flex_demo-cell">1</div>
        </Flex>
      </div>
    )
  },
  {
    title: '간격',
    code: wrapPageExample(`<Flex cols={3} gap="sm">…</Flex>
<Flex cols={3} gap="lg">…</Flex>
<Flex cols={3} gap="none">…</Flex>`, {
      name: 'FlexGapExample',
      reactImports: [],
      compImports: ['Flex']
    }),
    preview: (
      <div className="typo_stack">
        <Flex cols={3} gap="sm">{cells(3, 'gap sm')}</Flex>
        <Flex cols={3} gap="lg">{cells(3, 'gap lg')}</Flex>
        <Flex cols={3} gap="none">{cells(3, 'gap none')}</Flex>
      </div>
    )
  },
  {
    title: '줄바꿈 · equal · autoFit',
    code: wrapPageExample(`<Flex wrap gap="sm">{/* 8 cells */}</Flex>
<Flex equal gap="sm">…</Flex>
<Flex autoFit>…</Flex>`, {
      name: 'FlexWrapExample',
      reactImports: [],
      compImports: ['Flex']
    }),
    preview: (
      <div className="typo_stack">
        <Flex wrap gap="sm">{cells(8)}</Flex>
        <Flex equal gap="sm">{cells(3, 'equal')}</Flex>
        <Flex autoFit>{cells(6, 'auto-fit')}</Flex>
      </div>
    )
  },
  {
    title: '세로',
    code: wrapPageExample(`<Flex direction="column" gap="sm">
  <div className="flex_demo-cell">1</div>
  <div className="flex_demo-cell">2</div>
  <div className="flex_demo-cell">3</div>
</Flex>`, {
      name: 'FlexColumnExample',
      reactImports: [],
      compImports: ['Flex']
    }),
    preview: (
      <Flex direction="column" gap="sm" style={{ maxWidth: '16rem' }}>
        {cells(3)}
      </Flex>
    )
  }
]

/**
 * Flex 가이드 화면.
 * direction·정렬·gap과 API 문서를 한 페이지에 모은다.
 */
export default function FlexGuide () {
  return (
    <GuideLayout
      category="레이아웃"
      title="Flex"
      description="direction·gap·정렬로 가로·세로 배치 상자를 만듭니다. cols·ratio·equal도 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="FlexExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={flexApiSections} />
    </GuideLayout>
  )
}
