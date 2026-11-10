'use client'

import { useState } from 'react'
import { Button, Input, Navbar, Space } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { navbarApiSections } from '@/screens/pub/data/guide/navbarApiSections'

const DEMO_ITEMS = [
  { key: 'home', label: '홈', href: '#navbar', active: true },
  { key: 'components', label: '컴포넌트', href: '#navbar' },
  { key: 'guide', label: '가이드', href: '#navbar' }
]

/** selectedKey · onSelect 로 페이지에서 활성 링크를 제어 */
function ControlledNavbarDemo () {
  const [selectedKey, setSelectedKey] = useState('home')
  const items = DEMO_ITEMS.map(({ active, ...item }) => item)

  return (
    <Space vertical block size={12}>
      <Navbar
        brand="Logo"
        items={items}
        selectedKey={selectedKey}
        onSelect={(key, item, event) => {
          event.preventDefault()
          setSelectedKey(key)
        }}
      />
      <span>
        선택: <code>{selectedKey}</code>
      </span>
    </Space>
  )
}

/** open · onOpenChange 로 모바일 메뉴 열림을 페이지에서 제어 */
function MobileOpenDemo () {
  const [open, setOpen] = useState(false)

  return (
    <Space vertical block size={12}>
      <Button
        size="sm"
        variant="outline"
        label={open ? '메뉴 닫기' : '메뉴 열기'}
        onClick={() => setOpen((prev) => !prev)}
      />
      <Navbar
        brand="Logo"
        items={DEMO_ITEMS}
        open={open}
        onOpenChange={setOpen}
      />
      <span>
        open: <code>{String(open)}</code>
      </span>
    </Space>
  )
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>brand</code> 기본값은 <code>Logo</code>입니다. <code>items</code>로 메뉴 링크를 넣고,
        <code>active</code>인 항목에 <code>is-active</code>와 <code>aria-current=&quot;page&quot;</code>가 붙습니다.
      </>
    ),
    code: wrapPageExample(`<Navbar
  brand="Logo"
  items={[
    { key: 'home', label: '홈', href: '#', active: true },
    { key: 'components', label: '컴포넌트', href: '#' },
    { key: 'guide', label: '가이드', href: '#' }
  ]}
/>`, {
  name: 'NavbarBasicExample',
  reactImports: [],
  compImports: ['Navbar']
}),
    preview: <Navbar brand="Logo" items={DEMO_ITEMS} />
  },
  {
    title: '선택 제어',
    description: (
      <>
        <code>selectedKey</code> · <code>onSelect</code>로 페이지에서 활성 링크와 클릭 액션을 제어합니다.
        모바일에서 메뉴가 열린 상태면 링크 클릭 후 자동으로 닫힙니다.
      </>
    ),
    code: wrapPageExample(`const [selectedKey, setSelectedKey] = useState('home')

<Navbar
  brand="Logo"
  items={items}
  selectedKey={selectedKey}
  onSelect={(key, item, event) => {
    event.preventDefault()
    setSelectedKey(key)
    // navigate(item.href)
  }}
/>`, {
      name: 'NavbarExample',
      reactImports: ['useState'],
      compImports: ['Navbar']
    }),
    preview: <ControlledNavbarDemo />
  },
  {
    title: '모바일 열림 제어',
    description: (
      <>
        <code>open</code> · <code>onOpenChange</code>로 모바일 메뉴 열림을 페이지에서 제어합니다.
        토글 버튼뿐 아니라 페이지 버튼으로도 열고 닫을 수 있습니다.
      </>
    ),
    code: wrapPageExample(`const [open, setOpen] = useState(false)

<Button
  size="sm"
  variant="outline"
  label={open ? '메뉴 닫기' : '메뉴 열기'}
  onClick={() => setOpen((prev) => !prev)}
/>
<Navbar
  brand="Logo"
  items={items}
  open={open}
  onOpenChange={setOpen}
/>`, {
      name: 'NavbarExample',
      reactImports: ['useState'],
      compImports: ['Button', 'Navbar']
    }),
    preview: <MobileOpenDemo />
  },
  {
    title: '액션 · 검색',
    description: (
      <>
        <code>actions</code>는 우측 <code>navbar_actions</code>에 들어갑니다.
        검색은 <code>navbar_search</code>로 감싼 뒤 <code>Input</code>을 넣습니다.
      </>
    ),
    code: wrapPageExample(`<Navbar
  brand="Logo"
  items={items}
  actions={
    <>
      <div className="navbar_search">
        <Input placeholder="검색" aria-label="검색" />
      </div>
      <Button label="로그인" size="sm" />
    </>
  }
/>`, {
  name: 'NavbarExample2',
  reactImports: [],
  compImports: ['Button', 'Input', 'Navbar']
}),
    preview: (
      <Navbar
        brand="Logo"
        items={DEMO_ITEMS}
        actions={(
          <>
            <div className="navbar_search">
              <Input placeholder="검색" aria-label="검색" />
            </div>
            <Button label="로그인" size="sm" />
          </>
        )}
      />
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 <code>sm</code> · <code>md</code>(기본) · <code>lg</code>입니다.
        <code>sm</code> · <code>lg</code>일 때 <code>navbar_sm</code> · <code>navbar_lg</code>가 붙어 높이가 바뀝니다.
      </>
    ),
    code: wrapPageExample(`<Navbar size="sm" brand="Logo" items={items} />
<Navbar size="md" brand="Logo" items={items} />
<Navbar size="lg" brand="Logo" items={items} />`, {
  name: 'NavbarSizeExample',
  reactImports: [],
  compImports: ['Navbar']
}),
    preview: (
      <Space vertical block size={12}>
        <Navbar size="sm" brand="Logo" items={DEMO_ITEMS} />
        <Navbar size="md" brand="Logo" items={DEMO_ITEMS} />
        <Navbar size="lg" brand="Logo" items={DEMO_ITEMS} />
      </Space>
    )
  },
  {
    title: '변형',
    description: (
      <>
        <code>borderless</code>는 하단 테두리를 없애고, <code>dark</code>는 surface 배경 톤을 씁니다.
        <code>sticky</code>는 스크롤 시 상단에 고정됩니다.
      </>
    ),
    code: wrapPageExample(`<Navbar borderless brand="Logo" items={items} />
<Navbar dark brand="Logo" items={items} />
<Navbar sticky brand="Logo" items={items} />`, {
  name: 'NavbarVariantExample',
  reactImports: [],
  compImports: ['Navbar']
}),
    preview: (
      <Space vertical block size={12}>
        <Navbar borderless brand="Logo" items={DEMO_ITEMS} />
        <Navbar dark brand="Logo" items={DEMO_ITEMS} />
        <div className="navbar_demo-scroll">
          <Navbar sticky brand="Logo" items={DEMO_ITEMS} />
          <div style={{ padding: 16, minHeight: 220, color: 'var(--color-text-muted)' }}>
            스크롤해 보면 sticky 바가 위에 남습니다.
            <br />
            …
            <br />
            …
            <br />
            …
          </div>
        </div>
      </Space>
    )
  },
  {
    title: '커스텀 collapse',
    description: (
      <>
        <code>children</code>을 주면 <code>navbar_collapse</code> 안을 직접 구성합니다.
        <code>items</code> · <code>actions</code> 대신 HTML 계약을 그대로 쓸 때 활용합니다.
      </>
    ),
    code: wrapPageExample(`<Navbar brand="Logo">
  <nav className="navbar_nav" aria-label="주요 메뉴">
    <ul className="navbar_list">
      <li className="navbar_item">
        <a href="#" className="navbar_link is-active" aria-current="page">홈</a>
      </li>
      <li className="navbar_item">
        <a href="#" className="navbar_link">문서</a>
      </li>
    </ul>
  </nav>
  <div className="navbar_actions">
    <Button label="시작하기" size="sm" />
  </div>
</Navbar>`, {
  name: 'NavbarExample5',
  reactImports: [],
  compImports: ['Button', 'Navbar']
}),
    preview: (
      <Navbar brand="Logo">
        <nav className="navbar_nav" aria-label="주요 메뉴">
          <ul className="navbar_list">
            <li className="navbar_item">
              <a href="#navbar" className="navbar_link is-active" aria-current="page">홈</a>
            </li>
            <li className="navbar_item">
              <a href="#navbar" className="navbar_link">문서</a>
            </li>
          </ul>
        </nav>
        <div className="navbar_actions">
          <Button label="시작하기" size="sm" />
        </div>
      </Navbar>
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>navbar</code> · <code>navbar_container</code> · <code>navbar_brand</code> ·
        <code>navbar_collapse</code> · <code>navbar_nav</code> · <code>navbar_link</code>입니다.
        브랜드 텍스트 예시는 <code>Logo</code>를 사용합니다.
      </>
    ),
    code: `<header class="navbar">
  <div class="navbar_container">
    <a href="#navbar" class="navbar_brand">Logo</a>
    <div class="navbar_collapse">
      <nav class="navbar_nav" aria-label="주요 메뉴">
        <ul class="navbar_list">
          <li class="navbar_item">
            <a href="#navbar" class="navbar_link is-active" aria-current="page">홈</a>
          </li>
          <li class="navbar_item">
            <a href="#navbar" class="navbar_link">컴포넌트</a>
          </li>
          <li class="navbar_item">
            <a href="#navbar" class="navbar_link">가이드</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</header>`,
    preview: (
      <header className="navbar">
        <div className="navbar_container">
          <a href="#navbar" className="navbar_brand">Logo</a>
          <div className="navbar_collapse">
            <nav className="navbar_nav" aria-label="주요 메뉴">
              <ul className="navbar_list">
                <li className="navbar_item">
                  <a href="#navbar" className="navbar_link is-active" aria-current="page">홈</a>
                </li>
                <li className="navbar_item">
                  <a href="#navbar" className="navbar_link">컴포넌트</a>
                </li>
                <li className="navbar_item">
                  <a href="#navbar" className="navbar_link">가이드</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        메뉴는 <code>nav</code>에 <code>aria-label=&quot;주요 메뉴&quot;</code>를 둡니다.
        활성 링크는 <code>aria-current=&quot;page&quot;</code>, 모바일 토글은 <code>aria-expanded</code> ·
        <code>aria-controls</code>로 collapse와 연결됩니다.
      </>
    ),
    code: wrapPageExample(`<Navbar brand="Logo" items={[{ key: 'home', label: '홈', active: true }]} />`, {
  name: 'NavbarA11yExample',
  reactImports: [],
  compImports: ['Navbar']
}),
    preview: (
      <Navbar
        brand="Logo"
        items={[{ key: 'home', label: '홈', href: '#navbar', active: true }]}
      />
    )
  }
]

/**
 * Navbar 가이드 화면.
 * 기본 · 액션 · 크기 · 변형 · 커스텀 · HTML 예시와 API 문서를 모은다.
 */
export default function NavbarGuide () {
  return (
    <GuideLayout
      category="네비게이션"
      title="Navbar"
      description="상단 내비게이션. brand(기본 Logo) · items · actions · selectedKey · open으로 구성·제어하며 sticky · dark · 모바일 토글을 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName={section.title === 'HTML 마크업' ? 'navbar.html' : 'NavbarExample.jsx'}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={navbarApiSections} />
    </GuideLayout>
  )
}
