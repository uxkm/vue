'use client'

import { Button, DemoBlock, Divider, GuideApiDocs, GuideLayout, Space } from '@/comp'
import { spaceApiSections } from '@/pages/pub/data/guide/spaceApiSections'

const boxes = (label = '항목', count = 3) =>
  Array.from({ length: count }, (_, index) => (
    <div className="space_demo-box" key={index}>
      {label} {index + 1}
    </div>
  ))

const SECTIONS = [
  {
    title: '간격',
    code: `<Space gap="xs">{/* boxes */}</Space>
<Space gap="sm">…</Space>
<Space gap="md">…</Space>
<Space gap="lg">…</Space>
<Space gap="xl">…</Space>`,
    preview: (
      <div className="typo_stack">
        {(['xs', 'sm', 'md', 'lg', 'xl']).map((gap) => (
          <Space key={gap} gap={gap}>
            {boxes(gap)}
          </Space>
        ))}
      </div>
    )
  },
  {
    title: '세로',
    code: `<Space gap="md" vertical>
  <div className="space_demo-box">세로 1</div>
  <div className="space_demo-box">세로 2</div>
  <div className="space_demo-box">세로 3</div>
</Space>`,
    preview: (
      <Space gap="md" vertical>
        {boxes('세로')}
      </Space>
    )
  },
  {
    title: '정렬',
    code: `<Space block align="center" style={{ minHeight: '5rem', … }}>
  <div className="space_demo-box">align center</div>
  …
</Space>
<Space block justify="between">…</Space>`,
    preview: (
      <div className="typo_stack">
        <Space
          block
          align="center"
          style={{
            minHeight: '5rem',
            background: 'var(--color-surface-raised)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-md)'
          }}
        >
          <div className="space_demo-box">align center</div>
          <div className="space_demo-box" style={{ paddingBlock: 'var(--space-xl)' }}>
            높이 다름
          </div>
          <div className="space_demo-box">align center</div>
        </Space>
        <Space
          block
          justify="between"
          style={{
            background: 'var(--color-surface-raised)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-md)'
          }}
        >
          <div className="space_demo-box">justify between</div>
          <div className="space_demo-box">양 끝</div>
        </Space>
      </div>
    )
  },
  {
    title: '줄바꿈',
    code: `<Space block wrap gap="md">
  {[1, 2, 3, 4, 5].map((n) => (
    <div className="space_demo-box" style={{ minWidth: '8rem' }} key={n}>
      항목 {n}
    </div>
  ))}
</Space>`,
    preview: (
      <Space block wrap gap="md">
        {[1, 2, 3, 4, 5].map((number) => (
          <div className="space_demo-box" style={{ minWidth: '8rem' }} key={number}>
            항목 {number}
          </div>
        ))}
      </Space>
    )
  },
  {
    title: '조합 예시',
    code: `<Space>
  <Button variant="outline" label="취소" />
  <Button variant="filled" color="primary" label="저장" />
  <Divider vertical />
  <Button variant="text" label="더보기" />
</Space>`,
    preview: (
      <Space>
        <Button variant="outline" label="취소" />
        <Button variant="filled" color="primary" label="저장" />
        <Divider vertical />
        <Button variant="text" label="더보기" />
      </Space>
    )
  }
]

/**
 * Space 가이드 화면.
 * gap·정렬·방향과 API 문서를 한 페이지에 모은다.
 */
export default function SpaceGuide () {
  return (
    <GuideLayout
      category="레이아웃"
      title="Space"
      description="자식 사이에 gap을 넣는 간단한 배치 래퍼입니다. vertical·wrap·align·justify를 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={spaceApiSections} />
    </GuideLayout>
  )
}
