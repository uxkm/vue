'use client'

import { DemoBlock, GuideApiDocs, GuideLayout, Icon, Link } from '@/comp'
import { linkApiSections } from '@/pages/pub/data/guide/linkApiSections'

const SECTIONS = [
  {
    title: '기본',
    code: `<Link href="#/" label="WBS 홈" />
<Link href="#/guide/button">Button 데모</Link>
<Link href="#/guide/typography" underline>Underline</Link>`,
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
    code: `<Link href="#" color="primary">Primary</Link>
<Link href="#" color="muted">Muted</Link>
<Link href="#" color="success">Success</Link>
<Link href="#" color="warning">Warning</Link>
<Link href="#" color="danger">Danger</Link>
<Link href="#" color="info">Info</Link>`,
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
    code: `<Link href="#" size="sm">Small</Link>
<Link href="#">Default</Link>
<Link href="#" size="lg">Large</Link>
<Link href="#" size="xl">XL</Link>`,
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
    code: `<Link href="#" underline>항상 밑줄</Link>
<Link href="#" noUnderline>밑줄 없음</Link>
<Link href="#" standalone>Standalone</Link>
<Link href="#" nav label="Nav Link" />
<Link href="#" back label="뒤로" />
<Link href="#" block>Block 링크</Link>`,
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
    code: `<Link href="#" active>Active</Link>
<Link href="#" disabled>Disabled</Link>
<Link href="https://guide.uxkm.io" target="_blank" rel="noopener noreferrer">
  새 창
</Link>`,
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
    code: `<Link href="#" icon={<Icon name="arrow-left" />}>이전</Link>
<Link href="#" iconAfter={<Icon name="external" />}>외부</Link>
<Link href="#" iconOnly ariaLabel="설정" icon={<Icon name="settings" />} />`,
    preview: (
      <div className="demo-row">
        <Link href="#" icon={<Icon name="arrow-left" />}>이전</Link>
        <Link href="#" iconAfter={<Icon name="external" />}>외부</Link>
        <Link href="#" iconOnly ariaLabel="설정" icon={<Icon name="settings" />} />
      </div>
    )
  },
  {
    title: 'Ripple',
    description: (
      <>
        기본은 꺼져 있습니다. <code>ripple</code>을 지정하면 클릭 파장이 보입니다.
      </>
    ),
    code: `<Link href="#" standalone ripple>ripple on</Link>
<Link href="#" standalone>ripple off</Link>`,
    preview: (
      <div className="demo-row">
        <Link href="#" standalone ripple>ripple on</Link>
        <Link href="#" standalone>ripple off</Link>
      </div>
    )
  },
  {
    title: '인라인',
    code: `<p>
  본문 중간의{' '}
  <Link href="#/guide/typography">인라인 링크</Link>{' '}
  예시입니다.
</p>`,
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
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={linkApiSections} />
    </GuideLayout>
  )
}
