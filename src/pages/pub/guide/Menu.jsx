'use client'

import { useState } from 'react'
import { Icon, Menu, Space } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/pages/pub/widgets/guide'
import { menuApiSections } from '@/pages/pub/data/guide/menuApiSections'

const VERTICAL_ITEMS = [
  { key: 'dash', label: '대시보드', href: '#menu', active: true },
  { key: 'project', label: '프로젝트', href: '#menu' },
  { key: 'settings', label: '설정', href: '#menu' }
]

const HORIZONTAL_ITEMS = [
  { key: 'home', label: '홈', href: '#menu', active: true },
  { key: 'guide', label: '가이드', href: '#menu' },
  { key: 'release', label: '릴리스', href: '#menu' }
]

const ICON_ITEMS = [
  {
    key: 'dash',
    label: '대시보드',
    href: '#menu',
    active: true,
    icon: <Icon name="home" size="100%" />
  },
  {
    key: 'search',
    label: '검색',
    href: '#menu',
    icon: <Icon name="search" size="100%" />
  },
  {
    key: 'inbox',
    label: '수신함',
    href: '#menu',
    icon: <Icon name="inbox" size="100%" />,
    extra: '3'
  }
]

const SUBMENU_ITEMS = [
  { key: 'dash', label: '대시보드', href: '#menu', active: true },
  {
    key: 'project',
    label: '프로젝트',
    defaultOpen: true,
    children: [
      { key: 'all', label: '전체', href: '#menu' },
      { key: 'mine', label: '내 프로젝트', href: '#menu' },
      { key: 'archive', label: '보관함', href: '#menu', disabled: true }
    ]
  },
  { key: 'div-1', type: 'divider' },
  {
    key: 'manage',
    type: 'group',
    title: '관리',
    children: [
      { key: 'members', label: '멤버', href: '#menu' },
      { key: 'billing', label: '결제', href: '#menu' }
    ]
  }
]

/** selectedKey · onSelect 로 페이지에서 선택을 제어하는 예시 */
function ControlledSelectDemo () {
  const [selectedKey, setSelectedKey] = useState('dash')
  const [openKeys, setOpenKeys] = useState(['project'])

  return (
    <div className="menu_demo-row">
      <div className="menu_demo-sidebar">
        <Menu
          bordered
          items={SUBMENU_ITEMS.map((item) => ({
            ...item,
            active: undefined,
            href: undefined,
            children: item.children?.map((child) => ({
              ...child,
              href: undefined
            }))
          }))}
          selectedKey={selectedKey}
          onSelect={(key) => setSelectedKey(key)}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
        />
      </div>
      <div className="menu_demo-content">
        선택: <code>{selectedKey}</code>
        <br />
        열림: <code>{openKeys.join(', ') || '—'}</code>
      </div>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        기본은 세로(<code>menu_vertical</code>)입니다. <code>items</code>로 링크를 넣고,
        <code>active</code>인 항목에 <code>is-active</code>와 <code>aria-current=&quot;page&quot;</code>가 붙습니다.
        <code>bordered</code>를 켜면 테두리 패널이 됩니다.
      </>
    ),
    code: wrapPageExample(`<Menu
  bordered
  items={[
    { key: 'dash', label: '대시보드', href: '#', active: true },
    { key: 'project', label: '프로젝트', href: '#' },
    { key: 'settings', label: '설정', href: '#' }
  ]}
/>`, {
  name: 'MenuBasicExample',
  reactImports: [],
  compImports: ['Menu']
}),
    preview: (
      <div className="menu_demo-sidebar">
        <Menu bordered items={VERTICAL_ITEMS} />
      </div>
    )
  },
  {
    title: '제어 선택',
    description: (
      <>
        <code>selectedKey</code> · <code>onSelect</code>로 선택이 활성화된 항목을 페이지에서 관리하고,
        <code>openKeys</code> · <code>onOpenChange</code>로 서브메뉴 펼침을 제어합니다.
      </>
    ),
    code: wrapPageExample(`const [selectedKey, setSelectedKey] = useState('dash')
const [openKeys, setOpenKeys] = useState(['project'])

<Menu
  bordered
  items={items}
  selectedKey={selectedKey}
  onSelect={(key, item, event) => setSelectedKey(key)}
  openKeys={openKeys}
  onOpenChange={setOpenKeys}
/>`, {
      name: 'MenuExample',
      reactImports: ['useState'],
      compImports: ['Menu']
    }),
    preview: <ControlledSelectDemo />
  },
  {
    title: '가로',
    description: (
      <>
        <code>direction=&quot;horizontal&quot;</code>이면 <code>menu_horizontal</code>이 붙어 한 줄 메뉴가 됩니다.
        서브메뉴는 절대 위치 드롭다운으로 펼쳐집니다.
      </>
    ),
    code: wrapPageExample(`<Menu direction="horizontal" items={items} label="상단 메뉴" />`, {
  name: 'MenuExample2',
  reactImports: [],
  compImports: ['Menu']
}),
    preview: (
      <Menu direction="horizontal" items={HORIZONTAL_ITEMS} label="상단 메뉴" />
    )
  },
  {
    title: '아이콘 · 부가 정보',
    description: (
      <>
        항목에 <code>icon</code> · <code>extra</code>를 주면 <code>menu_icon</code> · <code>menu_extra</code>에 들어갑니다.
        라벨은 <code>menu_label</code>로 말줄임됩니다.
      </>
    ),
    code: wrapPageExample(`<Menu
  bordered
  items={[
    { key: 'dash', label: '대시보드', icon: <Icon name="home" size="100%" />, active: true },
    { key: 'inbox', label: '수신함', icon: <Icon name="inbox" size="100%" />, extra: '3' }
  ]}
/>`, {
  name: 'MenuIconExample',
  reactImports: [],
  compImports: ['Icon', 'Menu']
}),
    preview: (
      <div className="menu_demo-sidebar">
        <Menu bordered items={ICON_ITEMS} />
      </div>
    )
  },
  {
    title: '서브메뉴 · 그룹 · 구분선',
    description: (
      <>
        <code>children</code>이 있으면 서브메뉴 버튼(<code>menu_item-submenu</code>)이 됩니다.
        <code>type=&quot;divider&quot;</code> · <code>type=&quot;group&quot;</code>으로 구분선과 그룹 제목을 넣을 수 있습니다.
        <code>disabled</code>는 클릭을 막습니다.
      </>
    ),
    code: wrapPageExample(`<Menu
  bordered
  items={[
    { key: 'dash', label: '대시보드', active: true },
    {
      key: 'project',
      label: '프로젝트',
      defaultOpen: true,
      children: [
        { key: 'all', label: '전체' },
        { key: 'archive', label: '보관함', disabled: true }
      ]
    },
    { key: 'div-1', type: 'divider' },
    {
      key: 'manage',
      type: 'group',
      title: '관리',
      children: [{ key: 'members', label: '멤버' }]
    }
  ]}
/>`, {
  name: 'MenuGroupExample',
  reactImports: [],
  compImports: ['Menu']
}),
    preview: (
      <div className="menu_demo-row">
        <div className="menu_demo-sidebar">
          <Menu bordered items={SUBMENU_ITEMS} />
        </div>
        <div className="menu_demo-content">선택한 메뉴의 콘텐츠 영역 예시입니다.</div>
      </div>
    )
  },
  {
    title: '변형',
    description: (
      <>
        <code>compact</code>는 패딩을 줄이고, <code>dark</code>는 surface 톤을 씁니다.
        <code>bordered</code>와 함께 쓰면 사이드바 패널에 잘 맞습니다.
      </>
    ),
    code: wrapPageExample(`<Menu bordered compact items={items} />
<Menu bordered dark items={items} />`, {
  name: 'MenuVariantExample',
  reactImports: [],
  compImports: ['Menu']
}),
    preview: (
      <Space size={24} align="start" wrap>
        <div className="menu_demo-sidebar">
          <Menu bordered compact items={VERTICAL_ITEMS} />
        </div>
        <div className="menu_demo-sidebar">
          <Menu bordered dark items={VERTICAL_ITEMS} />
        </div>
      </Space>
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>menu</code> · <code>menu_list</code> · <code>menu_item</code> · <code>menu_link</code>입니다.
        React <code>Menu</code>도 동일 클래스로 렌더링합니다.
      </>
    ),
    code: `<nav class="menu menu_vertical menu_bordered" aria-label="주요 메뉴">
  <ul class="menu_list">
    <li class="menu_item">
      <a href="#menu" class="menu_link is-active" aria-current="page">대시보드</a>
    </li>
    <li class="menu_item">
      <a href="#menu" class="menu_link">프로젝트</a>
    </li>
    <li class="menu_item">
      <a href="#menu" class="menu_link">설정</a>
    </li>
  </ul>
</nav>`,
    preview: (
      <div className="menu_demo-sidebar">
        <nav className="menu menu_vertical menu_bordered" aria-label="주요 메뉴">
          <ul className="menu_list">
            <li className="menu_item">
              <a href="#menu" className="menu_link is-active" aria-current="page">대시보드</a>
            </li>
            <li className="menu_item">
              <a href="#menu" className="menu_link">프로젝트</a>
            </li>
            <li className="menu_item">
              <a href="#menu" className="menu_link">설정</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        루트 <code>nav</code>에 <code>aria-label</code>(기본 &quot;주요 메뉴&quot;)을 둡니다.
        활성 링크는 <code>aria-current=&quot;page&quot;</code>, 서브메뉴 버튼은 <code>aria-expanded</code> ·
        <code>aria-controls</code>로 하위 목록과 연결됩니다.
      </>
    ),
    code: wrapPageExample(`<Menu label="사이드 메뉴" bordered items={[{ key: 'home', label: '홈', active: true }]} />`, {
  name: 'MenuA11yExample',
  reactImports: [],
  compImports: ['Menu']
}),
    preview: (
      <div className="menu_demo-sidebar">
        <Menu
          label="사이드 메뉴"
          bordered
          items={[{ key: 'home', label: '홈', href: '#menu', active: true }]}
        />
      </div>
    )
  }
]

/**
 * Menu 가이드 화면.
 * 세로·가로·아이콘·서브메뉴·변형 예시와 API 문서를 모은다.
 */
export default function MenuGuide () {
  return (
    <GuideLayout
      category="네비게이션"
      title="Menu"
      description="내비게이션 메뉴. items · selectedKey · onSelect · openKeys로 구성·제어하며 서브메뉴 · 그룹 · compact · dark를 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName={section.title === 'HTML 마크업' ? 'menu.html' : 'MenuExample.jsx'}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={menuApiSections} />
    </GuideLayout>
  )
}
