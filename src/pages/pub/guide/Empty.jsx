'use client'

import { Button, Empty, Icon, Space } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/pages/pub/widgets/guide'
import { emptyApiSections } from '@/pages/pub/data/guide/emptyApiSections'

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>description</code>으로 안내 문구를 넣습니다. 비우면 &quot;데이터가 없습니다&quot;가 표시됩니다.
        아이콘·이미지가 없으면 문구만 보입니다.
      </>
    ),
    code: wrapPageExample(`<Empty />
<Empty description="표시할 항목이 없습니다" />`, {
      name: 'EmptyExample',
      reactImports: [],
      compImports: ['Empty']
    }),
    preview: (
      <Space vertical block size={16} align="center">
        <Empty />
        <Empty description="표시할 항목이 없습니다" />
      </Space>
    )
  },
  {
    title: '아이콘 · 이미지',
    description: (
      <>
        <code>icon</code> 또는 <code>image</code>를 주면 <code>empty_image</code>에 들어갑니다.
        <code>icon</code>이 있으면 <code>icon</code>이 우선입니다. <code>Icon</code>을 넣으면 스트로크 색은
        <code>--empty-icon-color</code>를 따릅니다.
      </>
    ),
    code: wrapPageExample(`<Empty
  description="받은 메일이 없습니다"
  icon={<Icon name="inbox" size="100%" />}
/>
<Empty
  description="검색 결과가 없습니다"
  icon={<Icon name="search" size="100%" />}
/>`, {
      name: 'EmptyIconExample',
      reactImports: [],
      compImports: ['Empty', 'Icon']
    }),
    preview: (
      <Space size={32} align="center" wrap>
        <Empty
          description="받은 메일이 없습니다"
          icon={<Icon name="inbox" size="100%" />}
        />
        <Empty
          description="검색 결과가 없습니다"
          icon={<Icon name="search" size="100%" />}
        />
      </Space>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 <code>sm</code> · <code>md</code>(기본) · <code>lg</code>입니다.
        <code>sm</code> · <code>lg</code>일 때 루트에 <code>empty_sm</code> · <code>empty_lg</code>가 붙어
        이미지·글자·여백이 바뀝니다.
      </>
    ),
    code: wrapPageExample(`<Empty size="sm" description="작음" icon={<Icon name="inbox" size="100%" />} />
<Empty size="md" description="기본" icon={<Icon name="inbox" size="100%" />} />
<Empty size="lg" description="큼" icon={<Icon name="inbox" size="100%" />} />`, {
      name: 'EmptySizeExample',
      reactImports: [],
      compImports: ['Empty', 'Icon']
    }),
    preview: (
      <Space size={24} align="center" wrap>
        <Empty size="sm" description="작음" icon={<Icon name="inbox" size="100%" />} />
        <Empty size="md" description="기본" icon={<Icon name="inbox" size="100%" />} />
        <Empty size="lg" description="큼" icon={<Icon name="inbox" size="100%" />} />
      </Space>
    )
  },
  {
    title: '심플',
    description: (
      <>
        <code>simple</code>을 켜면 <code>empty_simple</code>이 붙어 이미지 영역이 숨겨집니다.
        목록·검색 결과처럼 짧은 문구만 필요할 때 씁니다.
      </>
    ),
    code: wrapPageExample(`<Empty description="검색 결과 없음" simple />
<Empty
  description="아이콘이 있어도 simple 이면 숨김"
  simple
  icon={<Icon name="inbox" size="100%" />}
/>`, {
      name: 'EmptySimpleExample',
      reactImports: [],
      compImports: ['Empty', 'Icon']
    }),
    preview: (
      <Space vertical block size={16} align="center">
        <Empty description="검색 결과 없음" simple />
        <Empty
          description="아이콘이 있어도 simple 이면 숨김"
          simple
          icon={<Icon name="inbox" size="100%" />}
        />
      </Space>
    )
  },
  {
    title: '블록',
    description: (
      <>
        <code>block</code>을 켜면 <code>empty_block</code>이 붙어 부모 가로를 채우고 가운데 정렬합니다.
      </>
    ),
    code: wrapPageExample(`<Empty
  block
  description="이 영역에 표시할 데이터가 없습니다"
  icon={<Icon name="inbox" size="100%" />}
/>`, {
      name: 'EmptyBlockExample',
      reactImports: [],
      compImports: ['Empty', 'Icon']
    }),
    preview: (
      <Empty
        block
        description="이 영역에 표시할 데이터가 없습니다"
        icon={<Icon name="inbox" size="100%" />}
      />
    )
  },
  {
    title: '푸터 · 액션',
    description: (
      <>
        <code>footer</code> 또는 <code>children</code>은 <code>empty_footer</code>에 들어갑니다.
        <code>footer</code>가 있으면 <code>footer</code>가 우선입니다. 버튼 등 후속 액션을 둡니다.
      </>
    ),
    code: wrapPageExample(`<Empty
  description="표시할 항목이 없습니다"
  icon={<Icon name="inbox" size="100%" />}
>
  <Button label="새로고침" size="sm" />
</Empty>
<Empty
  description="문서를 추가해 보세요"
  icon={<Icon name="inbox" size="100%" />}
  footer={
    <>
      <Button variant="outline" label="취소" size="sm" />
      <Button label="새로 만들기" size="sm" />
    </>
  }
/>`, {
      name: 'EmptyFooterExample',
      reactImports: [],
      compImports: ['Button', 'Empty', 'Icon']
    }),
    preview: (
      <Space size={32} align="center" wrap>
        <Empty
          description="표시할 항목이 없습니다"
          icon={<Icon name="inbox" size="100%" />}
        >
          <Button label="새로고침" size="sm" />
        </Empty>
        <Empty
          description="문서를 추가해 보세요"
          icon={<Icon name="inbox" size="100%" />}
          footer={(
            <>
              <Button variant="outline" label="취소" size="sm" />
              <Button label="새로 만들기" size="sm" />
            </>
          )}
        />
      </Space>
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>empty</code> · <code>empty_image</code> · <code>empty_desc</code> · <code>empty_footer</code>입니다.
        React <code>Empty</code>도 동일 클래스로 렌더링합니다.
      </>
    ),
    code: `<div class="empty" role="status">
  <div class="empty_image" aria-hidden="true">…</div>
  <p class="empty_desc">데이터가 없습니다</p>
  <div class="empty_footer">
    <button type="button" class="btn …">새로 만들기</button>
  </div>
</div>`,
    preview: (
      <div className="empty" role="status">
        <div className="empty_image" aria-hidden="true">
          <Icon name="inbox" size="100%" />
        </div>
        <p className="empty_desc">데이터가 없습니다</p>
        <div className="empty_footer">
          <Button label="새로 만들기" size="sm" />
        </div>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        루트에 <code>role=&quot;status&quot;</code>가 지정됩니다. 이미지 영역은 장식용으로 <code>aria-hidden</code>을 둡니다.
        의미 있는 안내는 <code>description</code>(문구)에 담습니다.
      </>
    ),
    code: wrapPageExample(`<Empty description="파일 목록이 비어 있습니다" icon={<Icon name="inbox" size="100%" />} />`, {
      name: 'EmptyA11yExample',
      reactImports: [],
      compImports: ['Empty', 'Icon']
    }),
    preview: (
      <Empty
        description="파일 목록이 비어 있습니다"
        icon={<Icon name="inbox" size="100%" />}
      />
    )
  }
]

/**
 * Empty 가이드 화면.
 * 기본 · 아이콘 · 크기 · 심플 · 블록 · 푸터 예시와 API 문서를 모은다.
 */
export default function EmptyGuide () {
  return (
    <GuideLayout
      category="피드백"
      title="Empty"
      description="빈 상태 안내. description · icon · size로 구성하며 simple · block · footer 액션을 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName={
            section.title.includes('HTML') ? 'empty.html' : 'EmptyExample.jsx'
          }
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={emptyApiSections} />
    </GuideLayout>
  )
}
