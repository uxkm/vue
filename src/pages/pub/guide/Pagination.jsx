'use client'

import { useState } from 'react'
import { Pagination, Space } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/pages/pub/widgets/guide'
import { paginationApiSections } from '@/pages/pub/data/guide/paginationApiSections'

/** page 상태를 가진 데모 */
function ControlledPagination (props) {
  const [page, setPage] = useState(props.page || 1)
  return <Pagination {...props} page={page} onChange={setPage} />
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>page</code> · <code>pageCount</code>로 현재/전체를 지정하고, <code>onChange</code>로 쪽을 갱신합니다.
        현재 쪽은 <code>is-active</code>와 <code>aria-current=&quot;page&quot;</code>가 붙습니다.
      </>
    ),
    code: wrapPageExample(`const [page, setPage] = useState(1)
<Pagination page={page} pageCount={8} onChange={setPage} />`, {
      name: 'PaginationExample',
      reactImports: ['useState'],
      compImports: ['Pagination']
    }),
    preview: <ControlledPagination page={1} pageCount={8} />
  },
  {
    title: '말줄임 · siblingCount',
    description: (
      <>
        페이지가 많으면 양 끝과 현재 주변만 남기고 <code>…</code>(<code>pagination_ellipsis</code>)를 둡니다.
        <code>siblingCount</code>로 현재 페이지 양옆 번호 개수를 조절합니다.
      </>
    ),
    code: wrapPageExample(`<Pagination page={5} pageCount={20} siblingCount={1} onChange={setPage} />
<Pagination page={5} pageCount={20} siblingCount={2} onChange={setPage} />`, {
  name: 'PaginationCountExample',
  reactImports: [],
  compImports: ['Pagination']
}),
    preview: (
      <Space vertical block size={16}>
        <ControlledPagination page={5} pageCount={20} siblingCount={1} />
        <ControlledPagination page={5} pageCount={20} siblingCount={2} />
      </Space>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 <code>sm</code> · <code>md</code>(기본) · <code>lg</code>입니다.
        <code>sm</code> · <code>lg</code>일 때 <code>pagination_sm</code> · <code>pagination_lg</code>가 붙습니다.
      </>
    ),
    code: wrapPageExample(`<Pagination size="sm" page={2} pageCount={5} onChange={setPage} />
<Pagination size="md" page={2} pageCount={5} onChange={setPage} />
<Pagination size="lg" page={2} pageCount={5} onChange={setPage} />`, {
  name: 'PaginationSizeExample',
  reactImports: [],
  compImports: ['Pagination']
}),
    preview: (
      <Space vertical block size={16}>
        <ControlledPagination size="sm" page={2} pageCount={5} />
        <ControlledPagination size="md" page={2} pageCount={5} />
        <ControlledPagination size="lg" page={2} pageCount={5} />
      </Space>
    )
  },
  {
    title: '변형',
    description: (
      <>
        <code>round</code>는 pill 모서리, <code>minimal</code>은 테두리 없는 형태,
        <code>simple</code>은 번호 대신 <code>현재 / 전체</code> 텍스트입니다.
      </>
    ),
    code: wrapPageExample(`<Pagination round page={2} pageCount={6} onChange={setPage} />
<Pagination minimal page={2} pageCount={6} onChange={setPage} />
<Pagination simple page={2} pageCount={6} onChange={setPage} />`, {
  name: 'PaginationVariantExample',
  reactImports: [],
  compImports: ['Pagination']
}),
    preview: (
      <Space vertical block size={16}>
        <ControlledPagination round page={2} pageCount={6} />
        <ControlledPagination minimal page={2} pageCount={6} />
        <ControlledPagination simple page={2} pageCount={6} />
      </Space>
    )
  },
  {
    title: '정렬 · total · jumper',
    description: (
      <>
        <code>align</code>으로 가운데·끝 정렬을 하고, <code>total</code>로 건수 안내를,
        <code>showJumper</code>로 페이지 입력 이동을 추가합니다.
      </>
    ),
    code: wrapPageExample(`<Pagination
  align="center"
  total="총 128건"
  showJumper
  page={3}
  pageCount={12}
  onChange={setPage}
/>`, {
  name: 'PaginationExample4',
  reactImports: [],
  compImports: ['Pagination']
}),
    preview: (
      <ControlledPagination
        align="center"
        total="총 128건"
        showJumper
        page={3}
        pageCount={12}
      />
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>pagination</code> · <code>pagination_list</code> · <code>pagination_link</code> ·
        <code>pagination_btn</code> · <code>pagination_ellipsis</code>입니다.
        React <code>Pagination</code>도 동일 클래스로 렌더링합니다.
      </>
    ),
    code: `<nav class="pagination" aria-label="페이지 이동">
  <ul class="pagination_list">
    <li class="pagination_item">
      <button type="button" class="pagination_btn pagination_prev" aria-label="이전 페이지" disabled>이전</button>
    </li>
    <li class="pagination_item">
      <button type="button" class="pagination_link is-active" aria-current="page">1</button>
    </li>
    <li class="pagination_item">
      <button type="button" class="pagination_link">2</button>
    </li>
    <li class="pagination_item">
      <span class="pagination_ellipsis">…</span>
    </li>
    <li class="pagination_item">
      <button type="button" class="pagination_btn pagination_next" aria-label="다음 페이지">다음</button>
    </li>
  </ul>
</nav>`,
    preview: (
      <nav className="pagination" aria-label="페이지 이동">
        <ul className="pagination_list">
          <li className="pagination_item">
            <button type="button" className="pagination_btn pagination_prev" aria-label="이전 페이지" disabled>
              이전
            </button>
          </li>
          <li className="pagination_item">
            <button type="button" className="pagination_link is-active" aria-current="page">1</button>
          </li>
          <li className="pagination_item">
            <button type="button" className="pagination_link">2</button>
          </li>
          <li className="pagination_item">
            <span className="pagination_ellipsis">…</span>
          </li>
          <li className="pagination_item">
            <button type="button" className="pagination_btn pagination_next" aria-label="다음 페이지">
              다음
            </button>
          </li>
        </ul>
      </nav>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        루트 <code>nav</code>에 <code>aria-label</code>(기본 &quot;페이지 이동&quot;)을 둡니다.
        이전·다음은 각각 aria-label, 활성 번호는 <code>aria-current=&quot;page&quot;</code>입니다.
      </>
    ),
    code: wrapPageExample(`<Pagination ariaLabel="검색 결과 페이지" page={1} pageCount={4} onChange={setPage} />`, {
  name: 'PaginationA11yExample',
  reactImports: [],
  compImports: ['Pagination']
}),
    preview: (
      <ControlledPagination ariaLabel="검색 결과 페이지" page={1} pageCount={4} />
    )
  }
]

/**
 * Pagination 가이드 화면.
 * 기본 · 말줄임 · 크기 · 변형 · jumper 예시와 API 문서를 모은다.
 */
export default function PaginationGuide () {
  return (
    <GuideLayout
      category="네비게이션"
      title="Pagination"
      description="페이지 이동. page · pageCount · onChange로 구성하며 simple · round · jumper를 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName={section.title === 'HTML 마크업' ? 'pagination.html' : 'PaginationExample.jsx'}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={paginationApiSections} />
    </GuideLayout>
  )
}
