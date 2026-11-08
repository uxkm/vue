'use client'

import {
  Button,
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Input,
  Navbar,
  Space
} from '@/comp'
import { navbarApiSections } from '@/pages/pub/data/guide/navbarApiSections'

const DEMO_ITEMS = [
  { key: 'home', label: '홈', href: '#navbar', active: true },
  { key: 'components', label: '컴포넌트', href: '#navbar' },
  { key: 'guide', label: '가이드', href: '#navbar' }
]

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>brand</code> 기본값은 <code>Logo</code>입니다. <code>items</code>로 메뉴 링크를 넣고,
        <code>active</code>인 항목에 <code>is-active</code>와 <code>aria-current=&quot;page&quot;</code>가 붙습니다.
      </>
    ),
    code: `<Navbar
  brand="Logo"
  items={[
    { key: 'home', label: '홈', href: '#', active: true },
    { key: 'components', label: '컴포넌트', href: '#' },
    { key: 'guide', label: '가이드', href: '#' }
  ]}
/>`,
    preview: <Navbar brand="Logo" items={DEMO_ITEMS} />
  },
  {
    title: '액션 · 검색',
    description: (
      <>
        <code>actions</code>는 우측 <code>navbar_actions</code>에 들어갑니다.
        검색은 <code>navbar_search</code>로 감싼 뒤 <code>Input</code>을 넣습니다.
      </>
    ),
    code: `<Navbar
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
/>`,
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
    code: `<Navbar size="sm" brand="Logo" items={items} />
<Navbar size="md" brand="Logo" items={items} />
<Navbar size="lg" brand="Logo" items={items} />`,
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
    code: `<Navbar borderless brand="Logo" items={items} />
<Navbar dark brand="Logo" items={items} />
<Navbar sticky brand="Logo" items={items} />`,
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
    code: `<Navbar brand="Logo">
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
</Navbar>`,
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
    code: `<Navbar brand="Logo" items={[{ key: 'home', label: '홈', active: true }]} />`,
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
      description="상단 내비게이션. brand(기본 Logo) · items · actions로 구성하며 sticky · dark · 모바일 토글을 지원합니다."
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

      <GuideApiDocs sections={navbarApiSections} />
    </GuideLayout>
  )
}
