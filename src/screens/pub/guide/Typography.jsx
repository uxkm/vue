'use client'

import { Typography } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { typographyApiSections } from '@/screens/pub/data/guide/typographyApiSections'

const SECTIONS = [
  {
    title: '제목 (level)',
    description: (
      <>
        <code>level</code> 1~5로 h1~h5와 <code>typo_title-*</code>를 맞춥니다.
      </>
    ),
    code: wrapPageExample(`<Typography level={1}>Heading 1</Typography>
<Typography level={2}>Heading 2</Typography>
<Typography level={3}>Heading 3</Typography>
<Typography level={4}>Heading 4</Typography>
<Typography level={5}>Heading 5</Typography>`, {
      name: 'TypographyExample',
      reactImports: [],
      compImports: ['Typography']
    }),
    preview: (
      <div className="typo_stack">
        <Typography level={1}>Heading 1</Typography>
        <Typography level={2}>Heading 2</Typography>
        <Typography level={3}>Heading 3</Typography>
        <Typography level={4}>Heading 4</Typography>
        <Typography level={5}>Heading 5</Typography>
      </div>
    )
  },
  {
    title: '본문 variant',
    code: wrapPageExample(`<Typography>기본 본문 텍스트입니다.</Typography>
<Typography variant="paragraph">단락(paragraph)입니다.</Typography>
<Typography variant="lead">Lead 문단입니다.</Typography>
<Typography variant="caption">Caption 텍스트</Typography>
<Typography variant="label">Label 텍스트</Typography>
<Typography variant="overline">Overline</Typography>`, {
      name: 'TypographyVariantExample',
      reactImports: [],
      compImports: ['Typography']
    }),
    preview: (
      <div className="typo_stack">
        <Typography>기본 본문 텍스트입니다.</Typography>
        <Typography variant="paragraph">단락(paragraph)입니다.</Typography>
        <Typography variant="lead">Lead 문단입니다.</Typography>
        <Typography variant="caption">Caption 텍스트</Typography>
        <Typography variant="label">Label 텍스트</Typography>
        <Typography variant="overline">Overline</Typography>
      </div>
    )
  },
  {
    title: '인라인 강조',
    code: wrapPageExample(`<Typography variant="strong">Strong</Typography>
<Typography variant="italic">Italic</Typography>
<Typography variant="underline">Underline</Typography>
<Typography variant="delete">Delete</Typography>
<Typography variant="mark">Mark</Typography>
<Typography>H<sub>2</sub>O · x<sup>2</sup> · <Typography tag="span" variant="small">small</Typography></Typography>`, {
      name: 'TypographyInlineExample',
      reactImports: [],
      compImports: ['Typography']
    }),
    preview: (
      <div className="demo-row" style={{ flexWrap: 'wrap', gap: 12 }}>
        <Typography variant="strong">Strong</Typography>
        <Typography variant="italic">Italic</Typography>
        <Typography variant="underline">Underline</Typography>
        <Typography variant="delete">Delete</Typography>
        <Typography variant="mark">Mark</Typography>
        <Typography tag="span">
          H<Typography tag="sub" variant="sub">2</Typography>O · x
          <Typography tag="sup" variant="sup">2</Typography> ·{' '}
          <Typography tag="span" variant="small">small</Typography>
        </Typography>
      </div>
    )
  },
  {
    title: '코드 · 인용',
    code: wrapPageExample(`<Typography variant="code">const a = 1</Typography>
<Typography variant="kbd">Ctrl</Typography>
<Typography variant="pre">npm run dev</Typography>
<Typography variant="blockquote" cite="https://guide.uxkm.io">
  인용문 예시입니다.
</Typography>`, {
      name: 'TypographyCodeExample',
      reactImports: [],
      compImports: ['Typography']
    }),
    preview: (
      <div className="typo_stack">
        <Typography>
          인라인 <Typography tag="code" variant="code">const a = 1</Typography> 과{' '}
          <Typography tag="kbd" variant="kbd">Ctrl</Typography> 키
        </Typography>
        <Typography variant="pre">npm run dev</Typography>
        <Typography variant="blockquote" cite="https://guide.uxkm.io">
          인용문 예시입니다.
        </Typography>
      </div>
    )
  },
  {
    title: '색상 · 크기',
    code: wrapPageExample(`<Typography color="primary">Primary</Typography>
<Typography color="muted">Muted</Typography>
<Typography color="success">Success</Typography>
<Typography color="warning">Warning</Typography>
<Typography color="danger">Danger</Typography>
<Typography size="xs" color="muted">xs</Typography>
<Typography size="sm" color="muted">sm</Typography>
<Typography size="lg">lg</Typography>
<Typography size="xl">xl</Typography>`, {
      name: 'TypographyColorExample',
      reactImports: [],
      compImports: ['Typography']
    }),
    preview: (
      <div className="typo_stack">
        <div className="demo-row">
          <Typography color="primary">Primary</Typography>
          <Typography color="muted">Muted</Typography>
          <Typography color="success">Success</Typography>
          <Typography color="warning">Warning</Typography>
          <Typography color="danger">Danger</Typography>
          <Typography color="info">Info</Typography>
        </div>
        <div className="demo-row">
          <Typography size="xs" color="muted">xs</Typography>
          <Typography size="sm" color="muted">sm</Typography>
          <Typography>base</Typography>
          <Typography size="lg">lg</Typography>
          <Typography size="xl">xl</Typography>
        </div>
      </div>
    )
  },
  {
    title: '말줄임',
    code: wrapPageExample(`<Typography ellipsis={1}>한 줄 말줄임 …</Typography>
<Typography ellipsis={2}>두 줄 말줄임 …</Typography>
<Typography ellipsis={3}>세 줄 말줄임 …</Typography>`, {
      name: 'TypographyEllipsisExample',
      reactImports: [],
      compImports: ['Typography']
    }),
    preview: (
      <div className="typo_stack" style={{ maxWidth: 320 }}>
        <Typography ellipsis={1}>
          한 줄 말줄임 — 긴 문장이 영역을 넘치면 말줄임표로 잘립니다. 가이드에서 동작을 확인하세요.
        </Typography>
        <Typography ellipsis={2}>
          두 줄 말줄임 — 긴 문장이 영역을 넘치면 말줄임표로 잘립니다. 가이드에서 동작을 확인하세요. 두 번째 줄까지 표시됩니다.
        </Typography>
        <Typography ellipsis={3}>
          세 줄 말줄임 — 긴 문장이 영역을 넘치면 말줄임표로 잘립니다. 가이드에서 동작을 확인하세요. 세 번째 줄까지 표시한 뒤 잘립니다. 추가 문장입니다.
        </Typography>
      </div>
    )
  },
  {
    title: '인라인 링크',
    code: wrapPageExample(`<Typography>
  본문 중간의{' '}
  <Typography tag="a" variant="link" href="#/guide/link">인라인 링크</Typography>
  {' '}예시입니다.
</Typography>`, {
      name: 'TypographyLinkExample',
      reactImports: [],
      compImports: ['Typography']
    }),
    preview: (
      <Typography>
        본문 중간의{' '}
        <Typography tag="a" variant="link" href="#/guide/link">인라인 링크</Typography>
        {' '}예시입니다.
      </Typography>
    )
  }
]

/**
 * Typography 가이드 화면.
 * 제목·variant·색·크기·말줄임과 API 문서를 한 페이지에 모은다.
 */
export default function TypographyGuide () {
  return (
    <GuideLayout
      category="기본 요소"
      title="Typography"
      description="문단·제목·코드·인용 등 글 종류·색·크기를 일관된 규칙으로 제공합니다. color_* · size_*는 CSS 변수를 사용합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="TypographyExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={typographyApiSections} />
    </GuideLayout>
  )
}
