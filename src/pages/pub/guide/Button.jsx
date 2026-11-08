'use client'

import { Button, DemoBlock, GuideApiDocs, GuideLayout, Icon } from '@/comp'
import { buttonApiSections } from '@/pages/pub/data/guide/buttonApiSections'

const SECTIONS = [
  {
    title: '기본 유형',
    code: `<Button variant="filled" color="primary" label="Filled Primary" />
<Button variant="outline" color="primary" label="Outline" />
<Button variant="ghost" label="Ghost" />
<Button variant="text" color="primary" label="Text" />
<Button variant="select" label="Select" />`,
    preview: (
      <div className="demo-row">
        <Button variant="filled" color="primary" label="Filled Primary" />
        <Button variant="outline" color="primary" label="Outline" />
        <Button variant="ghost" label="Ghost" />
        <Button variant="text" color="primary" label="Text" />
        <Button variant="select" label="Select" />
      </div>
    )
  },
  {
    title: '색상',
    code: `<Button color="primary" label="Primary" />
<Button color="default" label="Default" />
<Button color="success" label="Success" />
<Button color="warning" label="Warning" />
<Button color="danger" label="Danger" />
<Button variant="text" color="muted" label="Muted" />`,
    preview: (
      <div className="demo-row">
        <Button color="primary" label="Primary" />
        <Button color="default" label="Default" />
        <Button color="success" label="Success" />
        <Button color="warning" label="Warning" />
        <Button color="danger" label="Danger" />
        <Button variant="text" color="muted" label="Muted" />
      </div>
    )
  },
  {
    title: '크기',
    code: `<Button size="sm" label="Small" />
<Button size="md" label="Medium" />
<Button size="lg" label="Large" />`,
    preview: (
      <div className="demo-row">
        <Button size="sm" label="Small" />
        <Button size="md" label="Medium" />
        <Button size="lg" label="Large" />
      </div>
    )
  },
  {
    title: '상태',
    code: `<Button round label="Round" />
<Button loading label="Loading" />
<Button disabled label="Disabled" />
<Button ariaDisabled label="Aria Disabled" />
<Button open variant="select" label="Open" />
<Button error label="Error" />`,
    preview: (
      <div className="demo-row">
        <Button round label="Round" />
        <Button loading label="Loading" />
        <Button disabled label="Disabled" />
        <Button ariaDisabled label="Aria Disabled" />
        <Button open variant="select" label="Open" />
        <Button error label="Error" />
      </div>
    )
  },
  {
    title: '아이콘 · 슬롯',
    code: `<Button label="Before" iconBefore={<Icon name="plus" />} />
<Button label="After" iconAfter={<Icon name="chevron-right" />} />
<Button iconOnly ariaLabel="설정">
  <Icon name="settings" />
</Button>
<Button vertical label="홈" iconBefore={<Icon name="home" />} />`,
    preview: (
      <div className="demo-row">
        <Button label="Before" iconBefore={<Icon name="plus" />} />
        <Button label="After" iconAfter={<Icon name="chevron-right" />} />
        <Button iconOnly ariaLabel="설정">
          <Icon name="settings" />
        </Button>
        <Button vertical label="홈" iconBefore={<Icon name="home" />} />
      </div>
    )
  },
  {
    title: '레이아웃',
    code: `<Button block label="전체 너비 버튼" />
<div className="btn_row">
  <Button grow label="Grow" />
  <Button grow={2} label="Grow 2" />
  <Button fit label="Fit" />
</div>`,
    preview: (
      <div className="typo_stack">
        <Button block label="전체 너비 버튼" />
        <div className="btn_row" style={{ display: 'flex', gap: 8 }}>
          <Button grow label="Grow" />
          <Button grow={2} label="Grow 2" />
          <Button fit label="Fit" />
        </div>
      </div>
    )
  },
  {
    title: '루트 태그',
    code: `<Button tag="a" href="#button" label="Link Button" />
<Button tag="div" label="Div Button" />
<Button type="submit" label="Submit" />`,
    preview: (
      <div className="demo-row">
        <Button tag="a" href="#button" label="Link Button" />
        <Button tag="div" label="Div Button" />
        <Button type="submit" label="Submit" />
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
    code: `<Button label="ripple on" ripple />
<Button label="ripple off" />`,
    preview: (
      <div className="demo-row">
        <Button label="ripple on" ripple />
        <Button label="ripple off" />
      </div>
    )
  },
  {
    title: '셀렉트 변형',
    code: `<Button variant="select" label="선택하세요" placeholder />
<Button variant="select" selectText label="텍스트형" />
<Button variant="outline" selectCaret label="캐럿" />`,
    preview: (
      <div className="demo-row">
        <Button variant="select" label="선택하세요" placeholder />
        <Button variant="select" selectText label="텍스트형" />
        <Button variant="outline" selectCaret label="캐럿" />
      </div>
    )
  }
]

/**
 * Button 가이드 화면.
 * variant·색·크기·상태·아이콘과 API 문서를 한 페이지에 모은다.
 */
export default function ButtonGuide () {
  return (
    <GuideLayout
      category="기본 요소"
      title="Button"
      description="variant·color·size·아이콘·상태를 props와 공통 클래스로 조합합니다. color_*는 CSS 변수를 사용합니다."
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

      <GuideApiDocs sections={buttonApiSections} />
    </GuideLayout>
  )
}
