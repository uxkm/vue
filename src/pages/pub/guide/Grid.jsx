'use client'

import { Grid } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/pages/pub/widgets/guide'
import { gridApiSections } from '@/pages/pub/data/guide/gridApiSections'

const cells = (count, label = (index) => String(index + 1)) =>
  Array.from({ length: count }, (_, index) => (
    <div className="grid_demo-cell" key={index}>
      {typeof label === 'function' ? label(index) : label}
    </div>
  ))

const SECTIONS = [
  {
    title: '균등 열',
    code: wrapPageExample(`<Grid cols={2}>{/* cells */}</Grid>
<Grid cols={3}>…</Grid>
<Grid cols={4}>…</Grid>`, {
      name: 'GridExample',
      reactImports: [],
      compImports: ['Grid']
    }),
    preview: (
      <div className="typo_stack">
        <Grid cols={2}>{cells(2, 'cols 2')}</Grid>
        <Grid cols={3}>{cells(3, 'cols 3')}</Grid>
        <Grid cols={4}>{cells(4, 'cols 4')}</Grid>
      </div>
    )
  },
  {
    title: '간격',
    code: wrapPageExample(`<Grid cols={3} gap="sm">…</Grid>
<Grid cols={3} gap="lg">…</Grid>
<Grid cols={3} gap="none">…</Grid>`, {
      name: 'GridGapExample',
      reactImports: [],
      compImports: ['Grid']
    }),
    preview: (
      <div className="typo_stack">
        <Grid cols={3} gap="sm">{cells(3, 'gap sm')}</Grid>
        <Grid cols={3} gap="lg">{cells(3, 'gap lg')}</Grid>
        <Grid cols={3} gap="none">{cells(3, 'gap none')}</Grid>
      </div>
    )
  },
  {
    title: '비율 열',
    code: wrapPageExample(`<Grid ratio="1-2">
  <div className="grid_demo-cell">1 : 2</div>
  <div className="grid_demo-cell">1 : 2</div>
</Grid>
<Grid ratio="1-2-1">
  <div className="grid_demo-cell">1</div>
  <div className="grid_demo-cell">2</div>
  <div className="grid_demo-cell">1</div>
</Grid>`, {
      name: 'GridRatioExample',
      reactImports: [],
      compImports: ['Grid']
    }),
    preview: (
      <div className="typo_stack">
        <Grid ratio="1-2">
          <div className="grid_demo-cell">1 : 2</div>
          <div className="grid_demo-cell">1 : 2</div>
        </Grid>
        <Grid ratio="1-2-1">
          <div className="grid_demo-cell">1</div>
          <div className="grid_demo-cell">2</div>
          <div className="grid_demo-cell">1</div>
        </Grid>
      </div>
    )
  },
  {
    title: '자동 배치',
    code: wrapPageExample(`<Grid autoFit>{/* cells */}</Grid>
<Grid autoFill>…</Grid>
<Grid equalColumns>…</Grid>`, {
      name: 'GridAutoExample',
      reactImports: [],
      compImports: ['Grid']
    }),
    preview: (
      <div className="typo_stack">
        <Grid autoFit>{cells(6, 'auto-fit')}</Grid>
        <Grid autoFill>{cells(3, 'auto-fill')}</Grid>
        <Grid equalColumns>{cells(3, 'equal')}</Grid>
      </div>
    )
  },
  {
    title: '자식별 span',
    description: (
      <>
        자식에 <code>grid_col-span-*</code> 클래스를 주면 열을 차지합니다.
      </>
    ),
    code: wrapPageExample(`<Grid gap="sm">
  <div className="grid_col-span-8">
    <div className="grid_demo-cell">span 8</div>
  </div>
  <div className="grid_col-span-4">
    <div className="grid_demo-cell">span 4</div>
  </div>
  <div className="grid_col-span-4">
    <div className="grid_demo-cell">span 4</div>
  </div>
  <div className="grid_col-span-4">
    <div className="grid_demo-cell">span 4</div>
  </div>
  <div className="grid_col-span-4">
    <div className="grid_demo-cell">span 4</div>
  </div>
</Grid>`, {
      name: 'GridSpanExample',
      reactImports: [],
      compImports: ['Grid']
    }),
    preview: (
      <Grid gap="sm">
        <div className="grid_col-span-8">
          <div className="grid_demo-cell">span 8</div>
        </div>
        <div className="grid_col-span-4">
          <div className="grid_demo-cell">span 4</div>
        </div>
        <div className="grid_col-span-4">
          <div className="grid_demo-cell">span 4</div>
        </div>
        <div className="grid_col-span-4">
          <div className="grid_demo-cell">span 4</div>
        </div>
        <div className="grid_col-span-4">
          <div className="grid_demo-cell">span 4</div>
        </div>
      </Grid>
    )
  }
]

/**
 * Grid 가이드 화면.
 * cols·gap·비율과 API 문서를 한 페이지에 모은다.
 */
export default function GridGuide () {
  return (
    <GuideLayout
      category="레이아웃"
      title="Grid"
      description="열 개수(cols)·간격으로 격자 배치를 만듭니다. ratio·autoFit·개별 span도 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="GridExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={gridApiSections} />
    </GuideLayout>
  )
}
