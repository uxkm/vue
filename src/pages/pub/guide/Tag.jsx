'use client'

import { useState } from 'react'
import { Icon, Tag, TagGroup } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/pages/pub/widgets/guide'
import { tagApiSections } from '@/pages/pub/data/guide/tagApiSections'

const COLORS = ['default', 'primary', 'success', 'warning', 'danger', 'info']

const colorRow = (variant = 'filled') => (
  <TagGroup>
    {COLORS.map((color) => (
      <Tag
        key={color}
        variant={variant}
        color={color}
        label={color[0].toUpperCase() + color.slice(1)}
      />
    ))}
  </TagGroup>
)

/** closable · onClose 로 페이지 상태에서 태그를 제거하는 예시 */
function ClosableDemo () {
  const [tags, setTags] = useState([
    { id: 'react', label: 'React', closeLabel: 'React 태그 제거' },
    { id: 'svelte', label: 'Svelte', variant: 'outline', color: 'default' },
    { id: 'deprecated', label: 'Deprecated', variant: 'solid', color: 'danger' },
    { id: 'frontend', label: 'Frontend', round: true, color: 'success', icon: true }
  ])

  const removeTag = (id) => () => {
    setTags((prev) => prev.filter((tag) => tag.id !== id))
  }

  return (
    <div className="typo_stack">
      <TagGroup tight>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            closable
            label={tag.label}
            closeLabel={tag.closeLabel}
            variant={tag.variant}
            color={tag.color}
            round={tag.round}
            icon={tag.icon ? <Icon name="star" /> : undefined}
            onClose={removeTag(tag.id)}
          />
        ))}
      </TagGroup>
      {tags.length === 0
        ? <p className="color_muted size_sm">닫기로 모든 태그를 제거했습니다.</p>
        : null}
    </div>
  )
}

/** selected · onSelectedChange 로 선택을 제어하는 예시 */
function CheckableDemo () {
  const [filters, setFilters] = useState({
    all: true,
    ui: false,
    ux: false,
    dev: false
  })
  const [status, setStatus] = useState({
    progress: true,
    done: true,
    hold: false,
    cancel: false
  })

  const toggleFilter = (key) => (selected) => {
    setFilters((prev) => ({ ...prev, [key]: selected }))
  }
  const toggleStatus = (key) => (selected) => {
    setStatus((prev) => ({ ...prev, [key]: selected }))
  }

  return (
    <div className="typo_stack">
      <TagGroup ariaLabel="카테고리 필터">
        <Tag checkable color="default" label="전체" selected={filters.all} onSelectedChange={toggleFilter('all')} />
        <Tag checkable color="default" label="UI" selected={filters.ui} onSelectedChange={toggleFilter('ui')} />
        <Tag checkable color="default" label="UX" selected={filters.ux} onSelectedChange={toggleFilter('ux')} />
        <Tag checkable color="default" label="개발" selected={filters.dev} onSelectedChange={toggleFilter('dev')} />
      </TagGroup>
      <TagGroup ariaLabel="상태 필터">
        <Tag checkable round label="진행 중" selected={status.progress} onSelectedChange={toggleStatus('progress')} />
        <Tag checkable round color="success" label="완료" selected={status.done} onSelectedChange={toggleStatus('done')} />
        <Tag checkable round color="warning" label="보류" selected={status.hold} onSelectedChange={toggleStatus('hold')} />
        <Tag checkable round color="danger" label="취소" selected={status.cancel} onSelectedChange={toggleStatus('cancel')} />
      </TagGroup>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본 (Filled)',
    description: '연한 배경의 기본 태그입니다.',
    code: wrapPageExample(`<Tag color="default" label="Default" />
<Tag color="primary" label="Primary" />
<Tag color="success" label="Success" />
<Tag color="warning" label="Warning" />
<Tag color="danger" label="Danger" />
<Tag color="info" label="Info" />`, {
  name: 'TagExample1',
  reactImports: [],
  compImports: ['Tag']
}),
    preview: colorRow()
  },
  {
    title: '솔리드',
    description: '강조가 필요한 레이블에 대비가 높은 채움 스킨을 사용합니다.',
    code: wrapPageExample(`<Tag variant="solid" color="primary" label="Primary" />
<Tag variant="solid" color="success" label="Success" />
…`, {
  name: 'TagExample2',
  reactImports: [],
  compImports: ['Tag']
}),
    preview: colorRow('solid')
  },
  {
    title: '아웃라인',
    description: '배경 없이 테두리로 구분합니다.',
    code: wrapPageExample(`<Tag variant="outline" color="primary" label="Primary" />
<Tag variant="outline" color="success" label="Success" />
…`, {
  name: 'TagOutlineExample',
  reactImports: [],
  compImports: ['Tag']
}),
    preview: colorRow('outline')
  },
  {
    title: '크기',
    description: 'small, medium, large 세 가지 크기를 모든 스킨에 적용할 수 있습니다.',
    code: wrapPageExample(`<Tag size="sm" label="Small" />
<Tag label="Medium" />
<Tag size="lg" label="Large" />
<Tag size="sm" variant="outline" color="success" label="Small" />
…`, {
  name: 'TagSizeExample',
  reactImports: [],
  compImports: ['Tag']
}),
    preview: (
      <div className="typo_stack">
        <TagGroup tight>
          <Tag size="sm" label="Small" />
          <Tag label="Medium" />
          <Tag size="lg" label="Large" />
        </TagGroup>
        <TagGroup tight>
          <Tag size="sm" variant="outline" color="success" label="Small" />
          <Tag variant="outline" color="success" label="Medium" />
          <Tag size="lg" variant="outline" color="success" label="Large" />
        </TagGroup>
        <TagGroup tight>
          <Tag size="sm" variant="solid" color="danger" label="Small" />
          <Tag variant="solid" color="danger" label="Medium" />
          <Tag size="lg" variant="solid" color="danger" label="Large" />
        </TagGroup>
      </div>
    )
  },
  {
    title: '둥근',
    description: (
      <>
        <code>round</code>로 pill 형태를 적용합니다.
      </>
    ),
    code: wrapPageExample(`<Tag round label="Filled" />
<Tag round variant="outline" label="Outline" />
<Tag round variant="solid" label="Solid" />
<Tag round variant="borderless" color="default" label="Borderless" />`, {
  name: 'TagExample5',
  reactImports: [],
  compImports: ['Tag']
}),
    preview: (
      <TagGroup>
        <Tag round label="Filled" />
        <Tag round variant="outline" label="Outline" />
        <Tag round variant="solid" label="Solid" />
        <Tag round variant="borderless" color="default" label="Borderless" />
      </TagGroup>
    )
  },
  {
    title: '아이콘',
    description: (
      <>
        <code>icon</code> prop으로 앞 아이콘을 배치합니다.
      </>
    ),
    code: wrapPageExample(`<Tag label="Design" icon={<Icon name="star" />} />
<Tag variant="outline" color="success" label="Verified" icon={<Icon name="check" />} />
<Tag variant="solid" color="danger" label="Error" icon={<Icon name="close" />} />
<Tag size="sm" round color="default" label="User" icon={<Icon name="user" />} />`, {
  name: 'TagIconExample',
  reactImports: [],
  compImports: ['Icon', 'Tag']
}),
    preview: (
      <TagGroup>
        <Tag label="Design" icon={<Icon name="star" />} />
        <Tag variant="outline" color="success" label="Verified" icon={<Icon name="check" />} />
        <Tag variant="solid" color="danger" label="Error" icon={<Icon name="close" />} />
        <Tag size="sm" round color="default" label="User" icon={<Icon name="user" />} />
      </TagGroup>
    )
  },
  {
    title: '닫기 가능',
    description: (
      <>
        <code>closable</code>은 독립적인 닫기 버튼을 제공합니다.
        <code>onClose</code>에서 페이지 상태의 항목을 제거합니다.
      </>
    ),
    code: wrapPageExample(`const [tags, setTags] = useState([
  { id: 'react', label: 'React' },
  { id: 'svelte', label: 'Svelte' }
])

<TagGroup tight>
  {tags.map((tag) => (
    <Tag
      key={tag.id}
      closable
      label={tag.label}
      onClose={() => setTags((prev) => prev.filter((item) => item.id !== tag.id))}
    />
  ))}
</TagGroup>`, {
      name: 'TagClosableExample',
      reactImports: ['useState'],
      compImports: ['Tag', 'TagGroup']
    }),
    preview: <ClosableDemo />
  },
  {
    title: '선택 가능',
    description: (
      <>
        <code>checkable</code> 태그는 button과 <code>aria-pressed</code>로 선택 상태를 전달합니다.
        <code>selected</code> · <code>onSelectedChange</code>(또는 <code>defaultSelected</code>)로 페이지에서 선택을 제어합니다.
      </>
    ),
    code: wrapPageExample(`const [all, setAll] = useState(true)
const [ui, setUi] = useState(false)

<TagGroup ariaLabel="카테고리 필터">
  <Tag
    checkable
    color="default"
    label="전체"
    selected={all}
    onSelectedChange={setAll}
  />
  <Tag
    checkable
    color="default"
    label="UI"
    selected={ui}
    onSelectedChange={setUi}
  />
</TagGroup>`, {
      name: 'TagCheckableExample',
      reactImports: ['useState'],
      compImports: ['Tag', 'TagGroup']
    }),
    preview: <CheckableDemo />
  },
  {
    title: '추가',
    description: '새 항목을 만드는 태그형 버튼입니다.',
    code: wrapPageExample(`<Tag add round label="태그 추가" icon={<Icon name="plus" />} />
<Tag add size="sm" label="+ New Tag" />
<Tag add size="lg" round label="+ 카테고리 추가" />`, {
  name: 'TagExample7',
  reactImports: [],
  compImports: ['Icon', 'Tag']
}),
    preview: (
      <TagGroup>
        <Tag add round label="태그 추가" icon={<Icon name="plus" />} />
        <Tag add size="sm" label="+ New Tag" />
        <Tag add size="lg" round label="+ 카테고리 추가" />
      </TagGroup>
    )
  },
  {
    title: '링크',
    description: (
      <>
        <code>href</code>가 있으면 링크 의미를 유지합니다.
      </>
    ),
    code: wrapPageExample(`<Tag href="#tag" label="문서 보기" />
<Tag href="#tag" variant="outline" label="가이드" />
<Tag href="#tag" variant="solid" label="바로가기" />
<Tag href="#tag" round variant="outline" color="success" label="외부 링크" icon={<Icon name="external" />} />`, {
  name: 'TagLinkExample',
  reactImports: [],
  compImports: ['Icon', 'Tag']
}),
    preview: (
      <TagGroup>
        <Tag href="#tag" label="문서 보기" />
        <Tag href="#tag" variant="outline" label="가이드" />
        <Tag href="#tag" variant="solid" label="바로가기" />
        <Tag href="#tag" round variant="outline" color="success" label="외부 링크" icon={<Icon name="external" />} />
      </TagGroup>
    )
  },
  {
    title: '비활성',
    description: 'button에는 네이티브 disabled, 링크·정적 요소에는 aria-disabled를 적용합니다.',
    code: wrapPageExample(`<Tag disabled label="Filled" />
<Tag disabled variant="outline" color="success" label="Outline" />
<Tag disabled variant="solid" color="danger" label="Solid" />
<Tag disabled checkable selected color="default" label="선택됨 (비활성)" />
<Tag disabled add label="태그 추가 (비활성)" />`, {
  name: 'TagDisabledExample',
  reactImports: [],
  compImports: ['Tag']
}),
    preview: (
      <TagGroup>
        <Tag disabled label="Filled" />
        <Tag disabled variant="outline" color="success" label="Outline" />
        <Tag disabled variant="solid" color="danger" label="Solid" />
        <Tag disabled checkable selected color="default" label="선택됨 (비활성)" />
        <Tag disabled add label="태그 추가 (비활성)" />
      </TagGroup>
    )
  },
  {
    title: '그룹',
    description: (
      <>
        <code>TagGroup</code>으로 관련 태그를 묶고 <code>tight</code>으로 간격을 줄입니다.
      </>
    ),
    code: wrapPageExample(`<TagGroup>
  <Tag label="HTML" />
  <Tag label="CSS" />
  …
</TagGroup>
<TagGroup tight>
  <Tag closable round label="React" />
  <Tag closable round label="Next.js" />
  <Tag add round size="sm" label="+ 추가" />
</TagGroup>`, {
  name: 'TagGroupExample',
  reactImports: [],
  compImports: ['Tag', 'TagGroup']
}),
    preview: (
      <div className="typo_stack">
        <TagGroup>
          <Tag label="HTML" />
          <Tag label="CSS" />
          <Tag label="JavaScript" />
          <Tag color="default" label="TypeScript" />
          <Tag color="success" label="SCSS" />
        </TagGroup>
        <TagGroup tight>
          <Tag closable round label="React" />
          <Tag closable round label="Next.js" />
          <Tag add round size="sm" label="+ 추가" />
        </TagGroup>
      </div>
    )
  }
]

/**
 * Tag 가이드 화면.
 * docs와 동일한 스킨·크기·아이콘·닫기·선택·추가·링크·비활성·그룹을 제공한다.
 */
export default function TagGuide () {
  return (
    <GuideLayout
      category="데이터 표시"
      title="Tag"
      description="카테고리·필터·선택 항목을 표시합니다. selected · onSelectedChange · closable · onClose · 스킨·크기·아이콘을 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="TagExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={tagApiSections} />
    </GuideLayout>
  )
}
