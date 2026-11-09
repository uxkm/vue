'use client'

import { Container } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/pages/pub/widgets/guide'
import { containerApiSections } from '@/pages/pub/data/guide/containerApiSections'

const SIZE_LABELS = {
  '': '기본 · 72rem',
  sm: 'Small · 36rem',
  md: 'Medium · 48rem',
  lg: 'Large · 64rem',
  xl: 'Extra Large · 80rem'
}

const Fill = ({ children }) => (
  <div className="container_demo-fill">{children}</div>
)

const SECTIONS = [
  {
    title: '기본',
    code: wrapPageExample(`<Container>
  <div className="container_demo-fill">기본 Container · 최대 72rem</div>
</Container>`, {
      name: 'ContainerExample',
      reactImports: [],
      compImports: ['Container']
    }),
    preview: (
      <Container>
        <Fill>기본 Container · 최대 72rem</Fill>
      </Container>
    )
  },
  {
    title: '최대 너비',
    description: (
      <>
        <code>size</code>로 최대 너비를 바꿉니다. sm · md · lg · xl.
      </>
    ),
    code: wrapPageExample(`<div className="container_demo-sizes">
  <Container><div className="container_demo-fill">기본 · 72rem</div></Container>
  <Container size="sm">…</Container>
  <Container size="md">…</Container>
  <Container size="lg">…</Container>
  <Container size="xl">…</Container>
</div>`, {
      name: 'ContainerSizeExample',
      reactImports: [],
      compImports: ['Container']
    }),
    preview: (
      <div className="container_demo-sizes">
        {(['', 'sm', 'md', 'lg', 'xl']).map((size) => (
          <Container key={size || 'default'} size={size || undefined}>
            <Fill>{SIZE_LABELS[size]}</Fill>
          </Container>
        ))}
      </div>
    )
  },
  {
    title: 'Fluid',
    code: wrapPageExample(`<Container fluid>
  <div className="container_demo-fill">Fluid · 최대 너비 제한 없음</div>
</Container>`, {
      name: 'ContainerFluidExample',
      reactImports: [],
      compImports: ['Container']
    }),
    preview: (
      <Container fluid>
        <Fill>Fluid · 최대 너비 제한 없음</Fill>
      </Container>
    )
  },
  {
    title: '시맨틱 루트',
    code: wrapPageExample(`<Container as="main" size="lg">
  <div className="container_demo-fill">main 요소로 렌더링</div>
</Container>`, {
      name: 'ContainerAsExample',
      reactImports: [],
      compImports: ['Container']
    }),
    preview: (
      <Container as="main" size="lg">
        <Fill>main 요소로 렌더링</Fill>
      </Container>
    )
  }
]

/**
 * Container 가이드 화면.
 * size·fluid와 API 문서를 한 페이지에 모은다.
 */
export default function ContainerGuide () {
  return (
    <GuideLayout
      category="레이아웃"
      title="Container"
      description="본문 최대 폭(size) 또는 fluid 전체 폭으로 콘텐츠를 감쌉니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="ContainerExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={containerApiSections} />
    </GuideLayout>
  )
}
