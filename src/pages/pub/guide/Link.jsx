'use client'

import { useState } from 'react'
import { Icon, Link } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/pages/pub/widgets/guide'
import { linkApiSections } from '@/pages/pub/data/guide/linkApiSections'

/** as="button" · onClick 으로 페이지 상태를 갱신하는 예시 */
function ButtonLinkDemo () {
  const [count, setCount] = useState(0)

  return (
    <div className="demo-stack">
      <div className="demo-row">
        <Link
          as="button"
          standalone
          label="액션 링크"
          onClick={() => setCount((prev) => prev + 1)}
        />
        <Link as="button" standalone color="muted" onClick={() => setCount(0)}>
          초기화
        </Link>
      </div>
      <p className="color_muted size_sm">클릭 횟수: {count}</p>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본',
    code: wrapPageExample(`<Link href="#/" label="WBS 홈" />
<Link href="#/guide/button">Button 데모</Link>
<Link href="#/guide/typography" underline>Underline</Link>`, {
  name: 'LinkBasicExample',
  reactImports: [],
  compImports: ['Link']
}),
    preview: (
      <div className="demo-row">
        <Link href="#/" label="WBS 홈" />
        <Link href="#/guide/button">Button 데모</Link>
        <Link href="#/guide/typography" underline>Underline</Link>
      </div>
    )
  },
  {
    title: '색상',
    code: wrapPageExample(`<Link href="#" color="primary">Primary</Link>
<Link href="#" color="muted">Muted</Link>
<Link href="#" color="success">Success</Link>
<Link href="#" color="warning">Warning</Link>
<Link href="#" color="danger">Danger</Link>
<Link href="#" color="info">Info</Link>`, {
  name: 'LinkColorExample',
  reactImports: [],
  compImports: ['Link']
}),
    preview: (
      <div className="demo-row">
        <Link href="#" color="primary">Primary</Link>
        <Link href="#" color="muted">Muted</Link>
        <Link href="#" color="success">Success</Link>
        <Link href="#" color="warning">Warning</Link>
        <Link href="#" color="danger">Danger</Link>
        <Link href="#" color="info">Info</Link>
      </div>
    )
  },
  {
    title: '크기',
    code: wrapPageExample(`<Link href="#" size="sm">Small</Link>
<Link href="#">Default</Link>
<Link href="#" size="lg">Large</Link>
<Link href="#" size="xl">XL</Link>`, {
  name: 'LinkSizeExample',
  reactImports: [],
  compImports: ['Link']
}),
    preview: (
      <div className="demo-row">
        <Link href="#" size="sm">Small</Link>
        <Link href="#">Default</Link>
        <Link href="#" size="lg">Large</Link>
        <Link href="#" size="xl">XL</Link>
      </div>
    )
  },
  {
    title: '밑줄 · 변형',
    code: wrapPageExample(`<Link href="#" underline>항상 밑줄</Link>
<Link href="#" noUnderline>밑줄 없음</Link>
<Link href="#" standalone>Standalone</Link>
<Link href="#" nav label="Nav Link" />
<Link href="#" back label="뒤로" />
<Link href="#" block>Block 링크</Link>`, {
  name: 'LinkVariantExample',
  reactImports: [],
  compImports: ['Link']
}),
    preview: (
      <div className="typo_stack">
        <div className="demo-row">
          <Link href="#" underline>항상 밑줄</Link>
          <Link href="#" noUnderline>밑줄 없음</Link>
          <Link href="#" standalone>Standalone</Link>
          <Link href="#" nav label="Nav Link" />
          <Link href="#" back label="뒤로" />
        </div>
        <Link href="#" block>Block 링크 (전체 너비)</Link>
      </div>
    )
  },
  {
    title: '상태',
    code: wrapPageExample(`<Link href="#" active>Active</Link>
<Link href="#" disabled>Disabled</Link>
<Link href="https://guide.uxkm.io" target="_blank" rel="noopener noreferrer">
  새 창
</Link>`, {
  name: 'LinkStateExample',
  reactImports: [],
  compImports: ['Link']
}),
    preview: (
      <div className="demo-row">
        <Link href="#" active>Active</Link>
        <Link href="#" disabled>Disabled</Link>
        <Link href="https://guide.uxkm.io" target="_blank" rel="noopener noreferrer">
          새 창
        </Link>
      </div>
    )
  },
  {
    title: '아이콘',
    code: wrapPageExample(`<Link href="#" icon={<Icon name="arrow-left" />}>이전</Link>
<Link href="#" iconAfter={<Icon name="external" />}>외부</Link>
<Link href="#" iconOnly ariaLabel="설정" icon={<Icon name="settings" />} />`, {
  name: 'LinkIconExample',
  reactImports: [],
  compImports: ['Icon', 'Link']
}),
    preview: (
      <div className="demo-row">
        <Link href="#" icon={<Icon name="arrow-left" />}>이전</Link>
        <Link href="#" iconAfter={<Icon name="external" />}>외부</Link>
        <Link href="#" iconOnly ariaLabel="설정" icon={<Icon name="settings" />} />
      </div>
    )
  },
  {
    title: '버튼형 클릭',
    description: (
      <>
        <code>as=&quot;button&quot;</code>과 <code>onClick</code>으로 이동 없이 페이지 상태를 갱신할 수 있습니다.
      </>
    ),
    code: wrapPageExample(`const [count, setCount] = useState(0)

<Link
  as="button"
  standalone
  label="액션 링크"
  onClick={() => setCount((prev) => prev + 1)}
/>
<Link as="button" standalone color="muted" onClick={() => setCount(0)}>
  초기화
</Link>`, {
      name: 'LinkExample',
      reactImports: ['useState'],
      compImports: ['Link']
    }),
    preview: <ButtonLinkDemo />
  },
  {
    title: 'Ripple',
    description: (
      <>
        기본은 꺼져 있습니다. <code>ripple</code>을 지정하면 클릭 파장이 보입니다.
      </>
    ),
    code: wrapPageExample(`<Link href="#" standalone ripple>ripple on</Link>
<Link href="#" standalone>ripple off</Link>`, {
  name: 'LinkExample7',
  reactImports: [],
  compImports: ['Link']
}),
    preview: (
      <div className="demo-row">
        <Link href="#" standalone ripple>ripple on</Link>
        <Link href="#" standalone>ripple off</Link>
      </div>
    )
  },
  {
    title: '인라인',
    code: wrapPageExample(`<p>
  본문 중간의{' '}
  <Link href="#/guide/typography">인라인 링크</Link>{' '}
  예시입니다.
</p>`, {
  name: 'LinkExample8',
  reactImports: [],
  compImports: ['Link']
}),
    preview: (
      <p>
        본문 중간의{' '}
        <Link href="#/guide/typography">인라인 링크</Link>{' '}
        예시입니다.
      </p>
    )
  }
]

/**
 * Link 가이드 화면.
 * 색·크기·변형·상태·아이콘과 API 문서를 한 페이지에 모은다.
 */
export default function LinkGuide () {
  return (
    <GuideLayout
      category="기본 요소"
      title="Link"
      description="텍스트 링크의 색·크기·밑줄·내비게이션·상태를 일관된 규칙으로 제공합니다. color_*는 CSS 변수를 사용합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="LinkExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={linkApiSections} />
    </GuideLayout>
  )
}
