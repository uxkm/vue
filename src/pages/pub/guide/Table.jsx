'use client'

import { Badge, Table } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/pages/pub/widgets/guide'
import { tableApiSections } from '@/pages/pub/data/guide/tableApiSections'

const MEMBERS = [
  ['홍길동', 'Frontend', '활성'],
  ['김철수', 'Backend', '활성'],
  ['이영희', 'Design', '휴가']
]

const PRODUCTS = [
  ['Basic', '₩12,000', '120'],
  ['Pro', '₩29,000', '84'],
  ['Enterprise', '문의', '12']
]

const COLUMNS = [
  { width: '9rem', nowrap: true },
  { minWidth: '10rem' },
  { width: '7rem', nowrap: true }
]

const LONG_ROWS = Array.from({ length: 12 }, (_, index) => [
  `사용자 ${index + 1}`,
  index % 2 ? 'Design' : 'Development',
  index % 3 ? '활성' : '대기'
])

const WIDE_COLUMNS = [
  { width: '8rem', nowrap: true },
  { width: '10rem', nowrap: true },
  { width: '10rem' },
  { width: '10rem' },
  { width: '10rem' }
]

function Rows ({ data = MEMBERS, badge = false }) {
  return data.map((row) => (
    <tr key={row[0]}>
      {row.map((cell, index) => (
        <td key={`${row[0]}-${index}`}>
          {badge && index === 2
            ? (
              <Badge color={cell === '활성' ? 'success' : 'warning'} label={cell} />
              )
            : cell}
        </td>
      ))}
    </tr>
  ))
}

function Body ({ data = MEMBERS, badge = false }) {
  return (
    <>
      <thead>
        <tr>
          <th scope="col">이름</th>
          <th scope="col">구분</th>
          <th scope="col">상태</th>
        </tr>
      </thead>
      <tbody>
        <Rows data={data} badge={badge} />
      </tbody>
    </>
  )
}

function WideBody () {
  return (
    <>
      <thead>
        <tr>
          <th>이름</th>
          <th>부서</th>
          <th>1월</th>
          <th>2월</th>
          <th>3월</th>
        </tr>
      </thead>
      <tbody>
        {LONG_ROWS.slice(0, 6).map((row, index) => (
          <tr key={row[0]}>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
            <td>{120 + index}</td>
            <td>{132 + index}</td>
            <td>{145 + index}</td>
          </tr>
        ))}
      </tbody>
    </>
  )
}

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        <code>thead</code>·<code>tbody</code> children과 <code>columns</code> 너비 설정으로 표를 구성합니다.
      </>
    ),
    code: wrapPageExample(`<Table columns={[
  { width: '9rem', nowrap: true },
  { minWidth: '10rem' },
  { width: '7rem', nowrap: true }
]}>
  <thead>…</thead>
  <tbody>…</tbody>
</Table>`, {
      name: 'TableExample',
      reactImports: [],
      compImports: ['Table']
    }),
    preview: (
      <Table columns={COLUMNS}>
        <Body badge />
      </Table>
    )
  },
  {
    title: '줄무늬',
    description: (
      <>
        <code>striped</code>로 짝수 행 배경을 켭니다.
      </>
    ),
    code: wrapPageExample(`<Table striped columns={columns}>
  …
</Table>`, {
      name: 'TableStripedExample',
      reactImports: [],
      compImports: ['Table']
    }),
    preview: (
      <Table striped columns={COLUMNS}>
        <Body data={PRODUCTS} />
      </Table>
    )
  },
  {
    title: '테두리',
    description: (
      <>
        <code>bordered</code>로 셀 테두리를 표시합니다.
      </>
    ),
    code: wrapPageExample(`<Table bordered>
  …
</Table>`, {
      name: 'TableBorderedExample',
      reactImports: [],
      compImports: ['Table']
    }),
    preview: (
      <Table bordered>
        <Body />
      </Table>
    )
  },
  {
    title: '컴팩트',
    description: (
      <>
        <code>compact</code>로 셀 패딩을 줄입니다.
      </>
    ),
    code: wrapPageExample(`<Table compact columns={columns}>
  …
</Table>`, {
      name: 'TableCompactExample',
      reactImports: [],
      compImports: ['Table']
    }),
    preview: (
      <Table compact columns={COLUMNS}>
        <Body data={PRODUCTS} />
      </Table>
    )
  },
  {
    title: '호버',
    description: (
      <>
        <code>hover</code>로 행 호버 강조를 켭니다.
      </>
    ),
    code: wrapPageExample(`<Table hover columns={columns}>
  …
</Table>`, {
      name: 'TableHoverExample',
      reactImports: [],
      compImports: ['Table']
    }),
    preview: (
      <Table hover columns={COLUMNS}>
        <Body badge />
      </Table>
    )
  },
  {
    title: '조합',
    description: 'bordered · compact · hover를 함께 쓸 수 있습니다.',
    code: wrapPageExample(`<Table bordered compact hover>
  …
</Table>`, {
      name: 'TableComboExample',
      reactImports: [],
      compImports: ['Table']
    }),
    preview: (
      <Table bordered compact hover>
        <Body />
      </Table>
    )
  },
  {
    title: '상단 고정',
    description: (
      <>
        <code>scroll</code>·<code>stickyTop</code>으로 헤더를 고정합니다.
      </>
    ),
    code: wrapPageExample(`<Table
  scroll
  scrollMaxHeight="14rem"
  stickyTop
  bordered
  compact
>
  …
</Table>`, {
      name: 'TableStickyTopExample',
      reactImports: [],
      compImports: ['Table']
    }),
    preview: (
      <Table scroll scrollMaxHeight="14rem" stickyTop bordered compact>
        <Body data={LONG_ROWS} />
      </Table>
    )
  },
  {
    title: '좌측 고정',
    description: (
      <>
        <code>stickyLeft</code>로 왼쪽 열을 고정합니다. 넓은 표는 <code>style.minWidth</code>와 함께 씁니다.
      </>
    ),
    code: wrapPageExample(`<Table
  scroll
  stickyLeft
  columns={wideColumns}
  style={{ minWidth: '48rem' }}
>
  …
</Table>`, {
      name: 'TableStickyLeftExample',
      reactImports: [],
      compImports: ['Table']
    }),
    preview: (
      <Table scroll stickyLeft columns={WIDE_COLUMNS} style={{ minWidth: '48rem' }}>
        <WideBody />
      </Table>
    )
  },
  {
    title: '다중 열 고정',
    description: (
      <>
        <code>stickyCols</code>와 <code>stickyLeftOffsets</code>로 여러 열을 고정합니다.
      </>
    ),
    code: wrapPageExample(`<Table
  scroll
  stickyLeft
  stickyCols={2}
  stickyLeftOffsets={{ 2: '8rem' }}
  columns={wideColumns}
  style={{ minWidth: '48rem' }}
>
  …
</Table>`, {
      name: 'TableStickyColsExample',
      reactImports: [],
      compImports: ['Table']
    }),
    preview: (
      <Table
        scroll
        stickyLeft
        stickyCols={2}
        stickyLeftOffsets={{ 2: '8rem' }}
        columns={WIDE_COLUMNS}
        style={{ minWidth: '48rem' }}
      >
        <WideBody />
      </Table>
    )
  },
  {
    title: '상단·좌측 고정',
    description: '헤더와 좌측 열을 동시에 고정할 수 있습니다.',
    code: wrapPageExample(`<Table
  scroll
  scrollMaxHeight="14rem"
  stickyTop
  stickyLeft
  stickyCols={2}
  stickyLeftOffsets={{ 2: '8rem' }}
  bordered
  compact
  columns={wideColumns}
  style={{ minWidth: '48rem' }}
>
  …
</Table>`, {
      name: 'TableStickyBothExample',
      reactImports: [],
      compImports: ['Table']
    }),
    preview: (
      <Table
        scroll
        scrollMaxHeight="14rem"
        stickyTop
        stickyLeft
        stickyCols={2}
        stickyLeftOffsets={{ 2: '8rem' }}
        bordered
        compact
        columns={WIDE_COLUMNS}
        style={{ minWidth: '48rem' }}
      >
        <WideBody />
      </Table>
    )
  }
]

/**
 * Table 가이드 화면.
 * docs와 동일한 스킨·스크롤·고정 열 예시와 API 문서를 모은다.
 */
export default function TableGuide () {
  return (
    <GuideLayout
      category="데이터 표시"
      title="Table"
      description="thead·tbody children과 columns 너비 설정으로 표를 구성하고, striped · bordered · compact · hover · sticky 옵션을 조합합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="TableExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={tableApiSections} />
    </GuideLayout>
  )
}
