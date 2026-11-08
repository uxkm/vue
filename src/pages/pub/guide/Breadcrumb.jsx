'use client'

import {
  Breadcrumb,
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Icon,
  Space
} from '@/comp'
import { breadcrumbApiSections } from '@/pages/pub/data/guide/breadcrumbApiSections'

const BASIC_ITEMS = [
  { label: '홈', href: '#breadcrumb' },
  { label: '컴포넌트', href: '#breadcrumb' },
  { label: 'Breadcrumb' }
]

const LONG_ITEMS = [
  { label: '홈', href: '#breadcrumb' },
  { label: '가이드', href: '#breadcrumb' },
  { label: '네비게이션', href: '#breadcrumb' },
  { label: '컴포넌트', href: '#breadcrumb' },
  { label: 'Breadcrumb' }
]

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>items</code> 순서대로 경로를 표시합니다. <code>href</code>가 있는 앞 단계는 링크이고,
        마지막(또는 <code>current</code>)은 <code>breadcrumb_current</code>와 <code>aria-current=&quot;page&quot;</code>입니다.
        구분자는 CSS <code>::before</code>로 그려집니다.
      </>
    ),
    code: `<Breadcrumb
  items={[
    { label: '홈', href: '#' },
    { label: '컴포넌트', href: '#' },
    { label: 'Breadcrumb' }
  ]}
/>`,
    preview: <Breadcrumb items={BASIC_ITEMS} />
  },
  {
    title: '구분자',
    description: (
      <>
        <code>separator</code>는 <code>chevron</code>(기본 · ›) · <code>slash</code>(/) · <code>dot</code>(·)입니다.
        slash · dot일 때 루트에 <code>breadcrumb_sep-slash</code> · <code>breadcrumb_sep-dot</code>이 붙습니다.
      </>
    ),
    code: `<Breadcrumb items={items} />
<Breadcrumb items={items} separator="slash" />
<Breadcrumb items={items} separator="dot" />`,
    preview: (
      <Space vertical block size={12}>
        <Breadcrumb items={BASIC_ITEMS} />
        <Breadcrumb items={BASIC_ITEMS} separator="slash" />
        <Breadcrumb items={BASIC_ITEMS} separator="dot" />
      </Space>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 <code>sm</code> · <code>md</code>(기본) · <code>lg</code>입니다.
        <code>sm</code> · <code>lg</code>일 때 루트에 <code>breadcrumb_sm</code> · <code>breadcrumb_lg</code>가 붙습니다.
      </>
    ),
    code: `<Breadcrumb size="sm" items={items} />
<Breadcrumb size="md" items={items} />
<Breadcrumb size="lg" items={items} />`,
    preview: (
      <Space vertical block size={12}>
        <Breadcrumb size="sm" items={BASIC_ITEMS} />
        <Breadcrumb size="md" items={BASIC_ITEMS} />
        <Breadcrumb size="lg" items={BASIC_ITEMS} />
      </Space>
    )
  },
  {
    title: '아이콘',
    description: (
      <>
        항목에 <code>icon</code>을 넣을 수 있습니다. 라벨 없이 아이콘만 있으면
        <code>breadcrumb_link-icon</code>이 붙어 홈 아이콘 링크에 적합합니다.
      </>
    ),
    code: `<Breadcrumb
  items={[
    { href: '#', icon: <Icon name="home" size="100%" />, ariaLabel: '홈' },
    { label: '컴포넌트', href: '#' },
    { label: 'Breadcrumb' }
  ]}
/>`,
    preview: (
      <Breadcrumb
        items={[
          {
            href: '#breadcrumb',
            icon: <Icon name="home" size="100%" />,
            ariaLabel: '홈'
          },
          { label: '컴포넌트', href: '#breadcrumb' },
          { label: 'Breadcrumb' }
        ]}
      />
    )
  },
  {
    title: '말줄임(maxItems)',
    description: (
      <>
        <code>maxItems</code>가 항목 수보다 작으면 가운데를 <code>…</code>(<code>breadcrumb_ellipsis</code>)로 접습니다.
        버튼을 누르면 전체 경로가 펼쳐집니다.
      </>
    ),
    code: `<Breadcrumb maxItems={3} items={longItems} />`,
    preview: <Breadcrumb maxItems={3} items={LONG_ITEMS} />
  },
  {
    title: '비활성',
    description: (
      <>
        <code>disabled</code>이면 링크로 렌더링하지 않고 <code>is-disabled</code> · <code>aria-disabled</code>를 둡니다.
      </>
    ),
    code: `<Breadcrumb
  items={[
    { label: '홈', href: '#' },
    { label: '잠긴 구간', href: '#', disabled: true },
    { label: 'Breadcrumb' }
  ]}
/>`,
    preview: (
      <Breadcrumb
        items={[
          { label: '홈', href: '#breadcrumb' },
          { label: '잠긴 구간', href: '#breadcrumb', disabled: true },
          { label: 'Breadcrumb' }
        ]}
      />
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>breadcrumb</code> · <code>breadcrumb_list</code> · <code>breadcrumb_item</code> ·
        <code>breadcrumb_link</code> · <code>breadcrumb_current</code>입니다.
        구분자는 두 번째 항목부터 <code>::before</code>로 붙습니다.
      </>
    ),
    code: `<nav class="breadcrumb" aria-label="경로">
  <ol class="breadcrumb_list">
    <li class="breadcrumb_item">
      <a href="#breadcrumb" class="breadcrumb_link">홈</a>
    </li>
    <li class="breadcrumb_item">
      <a href="#breadcrumb" class="breadcrumb_link">컴포넌트</a>
    </li>
    <li class="breadcrumb_item is-current" aria-current="page">
      <span class="breadcrumb_current">Breadcrumb</span>
    </li>
  </ol>
</nav>`,
    preview: (
      <nav className="breadcrumb" aria-label="경로">
        <ol className="breadcrumb_list">
          <li className="breadcrumb_item">
            <a href="#breadcrumb" className="breadcrumb_link">홈</a>
          </li>
          <li className="breadcrumb_item">
            <a href="#breadcrumb" className="breadcrumb_link">컴포넌트</a>
          </li>
          <li className="breadcrumb_item is-current" aria-current="page">
            <span className="breadcrumb_current">Breadcrumb</span>
          </li>
        </ol>
      </nav>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        루트 <code>nav</code>에 <code>aria-label</code>(기본 &quot;경로&quot;)을 둡니다.
        현재 단계는 <code>aria-current=&quot;page&quot;</code>, 말줄임 버튼은 &quot;경로 펼치기&quot; 레이블을 가집니다.
      </>
    ),
    code: `<Breadcrumb ariaLabel="현재 위치" items={items} />`,
    preview: <Breadcrumb ariaLabel="현재 위치" items={BASIC_ITEMS} />
  }
]

/**
 * Breadcrumb 가이드 화면.
 * 기본 · 구분자 · 크기 · 아이콘 · 말줄임 예시와 API 문서를 모은다.
 */
export default function BreadcrumbGuide () {
  return (
    <GuideLayout
      category="네비게이션"
      title="Breadcrumb"
      description="경로 표시. items · separator · size로 구성하며 아이콘 · maxItems 말줄임을 지원합니다."
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

      <GuideApiDocs sections={breadcrumbApiSections} />
    </GuideLayout>
  )
}
