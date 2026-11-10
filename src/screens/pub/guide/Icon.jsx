'use client'

import { useState } from 'react'
import { Icon, iconNames, iconSizes } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { iconApiSections } from '@/screens/pub/data/guide/iconApiSections'

/** button · onClick 으로 페이지 상태를 갱신하는 예시 */
function IconClickDemo () {
  const [count, setCount] = useState(0)

  return (
    <div className="demo-stack">
      <div className="demo-row icon_group">
        <Icon
          name="plus"
          button
          color="primary"
          ariaLabel="추가"
          onClick={() => setCount((prev) => prev + 1)}
        />
        <Icon
          name="refresh"
          button
          color="muted"
          ariaLabel="초기화"
          onClick={() => setCount(0)}
        />
      </div>
      <p className="color_muted size_sm">클릭 횟수: {count}</p>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본',
    code: wrapPageExample(`<Icon name="search" />
<Icon name="edit" />
<Icon name="trash" />`, {
  name: 'IconBasicExample',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <div className="demo-row icon_group">
        <Icon name="search" />
        <Icon name="edit" />
        <Icon name="trash" />
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        토큰 <code>xs · sm · md · lg · xl · 2xl · 3xl</code>. <code>md</code>가 기본입니다.
      </>
    ),
    code: wrapPageExample(`<Icon name="plus" size="xs" />
<Icon name="plus" size="sm" />
<Icon name="plus" size="md" />
<Icon name="plus" size="lg" />
<Icon name="plus" size="xl" />
<Icon name="plus" size="2xl" />
<Icon name="plus" size="3xl" />`, {
  name: 'IconSizeExample',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <div className="demo-row icon_group">
        {iconSizes.map((size) => (
          <span key={size} className="icon_grid-item">
            <Icon name="plus" size={size} />
            <span>{size}</span>
          </span>
        ))}
      </div>
    )
  },
  {
    title: '커스텀 크기',
    description: (
      <>
        토큰 외 값은 <code>--icon-custom-size</code>로 적용됩니다.
        숫자(px), <code>px/rem/em/%</code>, <code>var(--token)</code>을 사용할 수 있습니다.
      </>
    ),
    code: wrapPageExample(`<Icon name="star" size={18} />
<Icon name="star" size="22" />
<Icon name="star" size="28px" />
<Icon name="star" size="1.75rem" />
<Icon name="star" size={36} color="primary" circle />
<Icon name="search" size="2.5rem" button ariaLabel="검색" />`, {
  name: 'IconSizeExample2',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <div className="demo-row icon_group">
        <span className="icon_grid-item">
          <Icon name="star" size={18} />
          <span>18</span>
        </span>
        <span className="icon_grid-item">
          <Icon name="star" size="22" />
          <span>22</span>
        </span>
        <span className="icon_grid-item">
          <Icon name="star" size="28px" />
          <span>28px</span>
        </span>
        <span className="icon_grid-item">
          <Icon name="star" size="1.75rem" />
          <span>1.75rem</span>
        </span>
        <span className="icon_grid-item">
          <Icon name="star" size={36} color="primary" circle />
          <span>36 · circle</span>
        </span>
        <span className="icon_grid-item">
          <Icon name="search" size="2.5rem" button ariaLabel="검색" />
          <span>2.5rem · button</span>
        </span>
      </div>
    )
  },
  {
    title: '색상',
    code: wrapPageExample(`<Icon name="star" color="default" />
<Icon name="star" color="primary" />
<Icon name="check-circle" color="success" />
<Icon name="alert-triangle" color="warning" />
<Icon name="x-circle" color="danger" />`, {
  name: 'IconColorExample',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <div className="demo-row icon_group">
        <Icon name="star" color="default" />
        <Icon name="star" color="primary" />
        <Icon name="check-circle" color="success" />
        <Icon name="alert-triangle" color="warning" />
        <Icon name="x-circle" color="danger" />
      </div>
    )
  },
  {
    title: '텍스트 인라인',
    code: wrapPageExample(`<p>
  <Icon name="info" inline color="info" ariaLabel="안내" />{' '}
  변경 사항이 자동 저장됩니다.
</p>
<p>
  <Icon name="check-circle" inline color="success" ariaLabel="완료" />{' '}
  업로드가 완료되었습니다.
</p>`, {
  name: 'IconTextExample',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <>
        <p>
          <Icon name="info" inline color="info" ariaLabel="안내" />{' '}
          변경 사항이 자동 저장됩니다.
        </p>
        <p>
          <Icon name="check-circle" inline color="success" ariaLabel="완료" />{' '}
          업로드가 완료되었습니다.
        </p>
      </>
    )
  },
  {
    title: '원형 · 사각형 배경',
    code: wrapPageExample(`<Icon name="plus" circle color="primary" size="sm" />
<Icon name="check-circle" circle color="success" size="sm" />
<Icon name="trash" circle color="danger" size="lg" />
<Icon name="edit" square color="primary" />`, {
  name: 'IconRoundExample',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <div className="demo-row icon_group">
        <Icon name="plus" circle color="primary" size="sm" />
        <Icon name="check-circle" circle color="success" size="sm" />
        <Icon name="trash" circle color="danger" size="lg" />
        <Icon name="edit" square color="primary" />
      </div>
    )
  },
  {
    title: '아이콘 버튼',
    code: wrapPageExample(`<Icon name="search" button color="primary" ariaLabel="검색" />
<Icon name="settings" button color="muted" ariaLabel="설정" />
<Icon name="close" button color="danger" ariaLabel="닫기" />`, {
  name: 'IconIconExample',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <div className="demo-row icon_group">
        <Icon name="search" button color="primary" ariaLabel="검색" />
        <Icon name="settings" button color="muted" ariaLabel="설정" />
        <Icon name="close" button color="danger" ariaLabel="닫기" />
      </div>
    )
  },
  {
    title: '버튼 클릭',
    description: (
      <>
        <code>button</code>과 <code>onClick</code>으로 페이지 상태를 갱신합니다.
      </>
    ),
    code: wrapPageExample(`const [count, setCount] = useState(0)

<Icon
  name="plus"
  button
  color="primary"
  ariaLabel="추가"
  onClick={() => setCount((prev) => prev + 1)}
/>
<Icon
  name="refresh"
  button
  color="muted"
  ariaLabel="초기화"
  onClick={() => setCount(0)}
/>
{/* 클릭 횟수: {count} */}`, {
      name: 'IconExample',
      reactImports: ['useState'],
      compImports: ['Icon']
    }),
    preview: <IconClickDemo />
  },
  {
    title: 'Ripple',
    description: (
      <>
        <code>button</code>일 때 기본은 꺼져 있습니다. <code>ripple</code>을 지정하면 클릭 파장이 보입니다.
      </>
    ),
    code: wrapPageExample(`<Icon name="search" button ripple ariaLabel="ripple on" />
<Icon name="close" button ariaLabel="ripple off" />`, {
  name: 'IconExample8',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <div className="demo-row icon_group">
        <span className="icon_grid-item">
          <Icon name="search" button ripple size="lg" color="primary" ariaLabel="ripple on" />
          <span>ripple on</span>
        </span>
        <span className="icon_grid-item">
          <Icon name="close" button size="lg" color="danger" ariaLabel="ripple off" />
          <span>ripple off</span>
        </span>
      </div>
    )
  },
  {
    title: '펄스',
    code: wrapPageExample(`<Icon name="bell" circle pulse color="primary" size="sm" />
<Icon name="heart" circle pulse color="danger" size="sm" ariaLabel="알림" />`, {
  name: 'IconExample9',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <div className="demo-row icon_group">
        <Icon name="bell" circle pulse color="primary" size="sm" />
        <Icon name="heart" circle pulse color="danger" size="sm" ariaLabel="알림" />
      </div>
    )
  },
  {
    title: '그룹',
    code: wrapPageExample(`<div className="icon_group">
  <Icon name="upload" color="muted" />
  <Icon name="download" color="muted" />
  <Icon name="trash" color="muted" />
</div>
<p>
  <Icon name="user" circle color="primary" size="sm" />{' '}
  <span className="color_muted">홍길동님이 댓글을 남겼습니다.</span>
</p>`, {
  name: 'IconGroupExample',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <>
        <div className="demo-row icon_group">
          <Icon name="upload" color="muted" />
          <Icon name="download" color="muted" />
          <Icon name="trash" color="muted" />
        </div>
        <p>
          <Icon name="user" circle color="primary" size="sm" />{' '}
          <span className="color_muted">홍길동님이 댓글을 남겼습니다.</span>
        </p>
      </>
    )
  },
  {
    title: '회전',
    code: wrapPageExample(`<Icon name="loader" spin color="primary" ariaLabel="로딩" />
<Icon name="loader" spin size="lg" color="muted" ariaLabel="로딩" />`, {
  name: 'IconExample11',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <div className="demo-row icon_group">
        <Icon name="loader" spin color="primary" ariaLabel="로딩" />
        <Icon name="loader" spin size="lg" color="muted" ariaLabel="로딩" />
      </div>
    )
  },
  {
    title: '이미지 SVG',
    description: (
      <>
        <code>public/images</code> 의 <code>.svg</code> 를 <code>src</code>로 호출해 <code>&lt;img&gt;</code>로 표시합니다.
        파일명만 쓰면 <code>/images/icon/</code> 기준입니다. 이미지 방식은 <code>currentColor</code>를 상속하지 않습니다.
      </>
    ),
    code: wrapPageExample(`// <img src="/images/icon/search.svg"> 로 렌더
<Icon src="search.svg" size="lg" ariaLabel="검색" />
<Icon src="check.svg" circle size="sm" />
<Icon src="close.svg" button ariaLabel="닫기" />
<Icon src="star.svg" square />
<Icon name="check.svg" /> // name 이 .svg 이면 파일로 처리`, {
  name: 'IconExample12',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <div className="demo-row icon_group">
        <Icon src="search.svg" size="lg" ariaLabel="검색" />
        <Icon src="check.svg" circle size="sm" />
        <Icon src="close.svg" button ariaLabel="닫기" />
        <Icon src="star.svg" square />
        <Icon name="check.svg" size="lg" />
      </div>
    )
  },
  {
    title: '임베드 SVG',
    description: (
      <>
        같은 폴더의 <code>.svg</code> 를 <code>embed</code>로 불러오면 파일 내용을 인라인 SVG 코드로 렌더합니다.
        <code>currentColor</code> · <code>color_*</code> 상속이 되고, DOM에는 실제 <code>&lt;path&gt;</code> 등이 들어갑니다.
      </>
    ),
    code: wrapPageExample(`// fetch → 인라인 <svg>…</svg> 코드로 렌더
<Icon src="search.svg" embed size="lg" color="primary" ariaLabel="검색" />
<Icon src="check.svg" embed circle color="success" size="sm" />
<Icon src="close.svg" embed button color="danger" ariaLabel="닫기" />
<Icon src="star.svg" embed square color="warning" />
<Icon name="check.svg" embed color="info" size="lg" />`, {
  name: 'IconExample13',
  reactImports: [],
  compImports: ['Icon']
}),
    preview: (
      <div className="demo-row icon_group">
        <Icon src="search.svg" embed size="lg" color="primary" ariaLabel="검색" />
        <Icon src="check.svg" embed circle color="success" size="sm" />
        <Icon src="close.svg" embed button color="danger" ariaLabel="닫기" />
        <Icon src="star.svg" embed square color="warning" />
        <Icon name="check.svg" embed color="info" size="lg" />
      </div>
    )
  }
]

const GALLERY_CODE = wrapPageExample(`<div className="icon_grid">
  {iconNames.map((name) => (
    <div className="icon_grid-item" key={name}>
      <Icon name={name} size="lg" />
      <span>{name}</span>
    </div>
  ))}
</div>`, {
  name: 'IconGalleryExample',
  reactImports: [],
  compImports: ['Icon', 'iconNames']
})

/**
 * 아이콘 유형 한 칸.
 * 이름 아래 사용 코드를 보여 주고, 클릭 시 복사한다.
 */
function IconTypeItem ({ name }) {
  const snippet = `<Icon name="${name}" />`
  const [copied, setCopied] = useState(false)

  async function copySnippet () {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="icon_grid-item">
      <Icon name={name} size="lg" />
      <span>{name}</span>
      <button
        type="button"
        className="demo-code-snippet"
        title="클릭하면 코드를 복사합니다"
        onClick={copySnippet}
      >
        {copied ? '복사됨' : snippet}
      </button>
    </div>
  )
}

/**
 * Icon 가이드 화면.
 * 유형·크기·색·변형 예시와 코드보기를 한 페이지에 모아 확인한다.
 */
export default function IconGuide () {
  return (
    // Header 사용법 (GuideLayout header* props)
    // - 헤더 숨김: export const meta = { header: false }
    // - headerLayout="inline" : 한 줄 (스크롤 시 전체 숨김)
    // - headerLayout="stacked": 상단 브랜드 + 하단 네비 (스크롤 시 상단만 숨김)
    // - hideNavOnScroll       : stacked일 때 네비까지 함께 위로 올림
    // 예) <GuideLayout headerLayout="stacked" hideNavOnScroll ... />
    <GuideLayout
      category="기본 요소"
      title="Icon"
      description="SVG 아이콘의 이름·크기·색상·정렬·상태를 일관된 규칙으로 제공합니다. stroke 아이콘은 currentColor로 부모 색상을 상속합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="IconExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <DemoBlock
        title="아이콘 유형"
        description={(
          <>
            현재 공통 구현에서 제공하는 stroke SVG 아이콘입니다. 기본 좌표계는{' '}
            <code>viewBox=&quot;0 0 24 24&quot;</code>, 선 굵기는{' '}
            <code>stroke-width=&quot;2&quot;</code>입니다. 각 유형 아래 코드를 클릭하면 복사됩니다.
          </>
        )}
        code={GALLERY_CODE}
        fileName="IconExample.jsx"
      >
        <div className="icon_grid">
          {iconNames.map((name) => (
            <IconTypeItem key={name} name={name} />
          ))}
        </div>
      </DemoBlock>

      <GuideApiDocs sections={iconApiSections} />
    </GuideLayout>
  )
}
