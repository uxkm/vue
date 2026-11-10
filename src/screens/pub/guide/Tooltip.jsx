'use client'

import { useState } from 'react'
import { Button, Tooltip } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { tooltipApiSections } from '@/screens/pub/data/guide/tooltipApiSections'

/** 배치 변형 — placement prop 과 추가로 붙일 클래스 (기본은 트리거 아래 · 가운데) */
const PLACEMENTS = [
  { value: 'bottom', placement: 'bottom', label: 'bottom (기본)', className: undefined },
  { value: 'bottom-start', placement: 'bottom', label: 'bottom-start', className: 'tooltip_placement-start' },
  { value: 'bottom-end', placement: 'bottom', label: 'bottom-end', className: 'tooltip_placement-end' },
  { value: 'top', placement: 'top', label: 'top', className: undefined },
  { value: 'top-start', placement: 'top', label: 'top-start', className: 'tooltip_placement-top-start' },
  { value: 'top-end', placement: 'top', label: 'top-end', className: 'tooltip_placement-top-end' },
  { value: 'left', placement: 'left', label: 'left', className: undefined },
  { value: 'right', placement: 'right', label: 'right', className: undefined }
]

/** 화살표 방향·위치 변형 */
const ARROW_VARIANTS = [
  { value: 'bottom', placement: 'bottom', label: '아래 · 가운데', className: undefined },
  { value: 'bottom-start', placement: 'bottom', label: '아래 · 시작', className: 'tooltip_placement-start' },
  { value: 'bottom-end', placement: 'bottom', label: '아래 · 끝', className: 'tooltip_placement-end' },
  { value: 'top', placement: 'top', label: '위 · 가운데', className: undefined },
  { value: 'top-start', placement: 'top', label: '위 · 시작', className: 'tooltip_placement-top-start' },
  { value: 'top-end', placement: 'top', label: '위 · 끝', className: 'tooltip_placement-top-end' },
  { value: 'left', placement: 'left', label: '왼쪽', className: undefined },
  { value: 'right', placement: 'right', label: '오른쪽', className: undefined },
  { value: 'custom', placement: 'bottom', label: '커스텀 25%', className: undefined, arrowPosition: '25%' }
]

/** 호버·포커스로 여는 툴팁 예시 */
function BasicDemo () {
  return (
    <div className="tooltip_demo-stage">
      <div className="tooltip_row" style={{ gap: '3rem' }}>
        <Tooltip content="짧은 도움말입니다.">
          <Button variant="outline" label="마우스를 올려보세요" />
        </Tooltip>
        <Tooltip content="Tab 키로 포커스해도 열립니다.">
          <Button variant="outline" label="포커스해 보세요" />
        </Tooltip>
      </div>
    </div>
  )
}

/** open · onOpenChange 로 표시를 제어하는 예시 */
function ControlledOpenDemo () {
  const [open, setOpen] = useState(false)

  return (
    <div className="tooltip_demo-stage">
      <div className="tooltip_row" style={{ gap: '1rem', alignItems: 'center' }}>
        <Tooltip
          content="제어 모드 도움말입니다."
          open={open}
          onOpenChange={setOpen}
        >
          <Button variant="outline" label="대상" />
        </Tooltip>
        <Button
          variant="outline"
          label={open ? '닫기' : '열기'}
          onClick={() => setOpen((prev) => !prev)}
        />
        <span>
          open: <code>{String(open)}</code>
        </span>
      </div>
    </div>
  )
}

/** 화살표 유무 · 방향 · 위치 — 한 번에 하나만 열어 겹침 방지 */
function ArrowDemo () {
  const [withArrow, setWithArrow] = useState(true)
  const [selected, setSelected] = useState('bottom')
  const current = ARROW_VARIANTS.find((item) => item.value === selected) ?? ARROW_VARIANTS[0]
  const className = [current.className, 'is-open'].filter(Boolean).join(' ')

  return (
    <div className="tooltip_demo-stage">
      <div className="tooltip_row" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
        <Button
          variant={withArrow ? 'filled' : 'outline'}
          label="화살표 있음"
          onClick={() => setWithArrow(true)}
        />
        <Button
          variant={!withArrow ? 'filled' : 'outline'}
          label="화살표 없음"
          onClick={() => setWithArrow(false)}
        />
      </div>
      <div className="tooltip_row" style={{ flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
        {ARROW_VARIANTS.map((item) => (
          <Button
            key={item.value}
            variant={item.value === selected ? 'filled' : 'outline'}
            label={item.label}
            onClick={() => setSelected(item.value)}
          />
        ))}
      </div>
      <div
        className="tooltip_row"
        style={{ justifyContent: 'center', alignItems: 'center', minHeight: '10rem', marginTop: '1rem' }}
      >
        <Tooltip
          placement={current.placement}
          className={className}
          arrow={withArrow}
          arrowPosition={withArrow ? current.arrowPosition : undefined}
          content={withArrow ? current.label : `${current.label} · 화살표 없음`}
        >
          <Button variant="outline" label="대상" />
        </Tooltip>
      </div>
    </div>
  )
}

/** 배치별 툴팁 예시 — 닫혀도 마지막 배치를 유지한다 */
function PlacementDemo () {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('bottom')
  const current = PLACEMENTS.find((item) => item.value === selected) ?? PLACEMENTS[0]
  const className = [current.className, open ? 'is-open' : undefined].filter(Boolean).join(' ') || undefined

  return (
    <div className="tooltip_demo-stage">
      <div className="tooltip_row">
        {PLACEMENTS.map((item) => (
          <Button
            key={item.value}
            variant={item.value === selected ? 'filled' : 'outline'}
            label={item.label}
            onClick={() => {
              setSelected(item.value)
              setOpen(true)
            }}
          />
        ))}
        <Button variant="outline" label="닫기" onClick={() => setOpen(false)} />
      </div>
      <div
        className="tooltip_row"
        style={{ justifyContent: 'center', alignItems: 'center', minHeight: '10rem', marginTop: '1rem' }}
      >
        <Tooltip
          placement={current.placement}
          className={className}
          content={current.value}
        >
          <Button variant="outline" label="대상" />
        </Tooltip>
      </div>
    </div>
  )
}

/** 크기별 툴팁 예시 */
function SizeDemo () {
  const [size, setSize] = useState('md')
  const [open, setOpen] = useState(false)
  const sizeClass = size === 'md' ? undefined : `tooltip_${size}`
  const className = [sizeClass, open ? 'is-open' : undefined].filter(Boolean).join(' ') || undefined

  return (
    <div className="tooltip_demo-stage">
      <div className="tooltip_row">
        {['sm', 'md', 'lg'].map((value) => (
          <Button
            key={value}
            variant={value === size ? 'filled' : 'outline'}
            label={value}
            onClick={() => {
              setSize(value)
              setOpen(true)
            }}
          />
        ))}
        <Button variant="outline" label="닫기" onClick={() => setOpen(false)} />
      </div>
      <div className="tooltip_row" style={{ marginTop: '3rem' }}>
        <Tooltip
          className={className}
          content={sizeClass ?? '기본 크기'}
        >
          <Button variant="outline" label="크기 확인" />
        </Tooltip>
      </div>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        대상에 포인터를 올리거나 포커스하면 <code>content</code> 말풍선이 표시되고, 벗어나면 사라집니다.
        <code>children</code>(또는 <code>trigger</code>)이 대상이 되며, 키보드 포커스로 열려면 버튼처럼 포커스를 받는 요소를 넣습니다.
      </>
    ),
    code: wrapPageExample(`<Tooltip content="짧은 도움말입니다.">
  <Button variant="outline" label="마우스를 올려보세요" />
</Tooltip>`, {
  name: 'TooltipBasicExample',
  reactImports: [],
  compImports: ['Button', 'Tooltip']
}),
    preview: <BasicDemo />
  },
  {
    title: '제어 모드',
    description: (
      <>
        <code>open</code> · <code>onOpenChange</code>로 부모가 표시 상태를 관리합니다.
        바깥 버튼으로도 토글할 수 있습니다.
      </>
    ),
    code: wrapPageExample(`const [open, setOpen] = useState(false)

<Tooltip content="제어 모드 도움말입니다." open={open} onOpenChange={setOpen}>
  <Button variant="outline" label="대상" />
</Tooltip>
<Button label={open ? '닫기' : '열기'} onClick={() => setOpen((v) => !v)} />`, {
      name: 'TooltipExample',
      reactImports: ['useState'],
      compImports: ['Tooltip', 'Button']
    }),
    preview: <ControlledOpenDemo />
  },
  {
    title: '배치',
    description: (
      <>
        <code>placement</code>는 <code>top</code> · <code>bottom</code>(기본) · <code>left</code> · <code>right</code>를 받습니다.
        시작 · 끝 정렬은 <code>className</code>에 <code>tooltip_placement-start</code> · <code>tooltip_placement-end</code> ·
        <code>tooltip_placement-top-start</code> · <code>tooltip_placement-top-end</code>를 붙입니다.
        버튼을 눌러 배치를 바꿔도 툴팁이 닫히는 동안 마지막 배치가 유지됩니다.
      </>
    ),
    code: wrapPageExample(`<Tooltip placement="top" content="위"><Button variant="outline" label="top" /></Tooltip>
<Tooltip placement="left" content="왼쪽"><Button variant="outline" label="left" /></Tooltip>
<Tooltip placement="right" content="오른쪽"><Button variant="outline" label="right" /></Tooltip>
<Tooltip className="tooltip_placement-start" content="아래 · 왼쪽 정렬"><Button variant="outline" label="bottom-start" /></Tooltip>
<Tooltip className="tooltip_placement-end" content="아래 · 오른쪽 정렬"><Button variant="outline" label="bottom-end" /></Tooltip>
<Tooltip className="tooltip_placement-top-start" content="위 · 왼쪽 정렬"><Button variant="outline" label="top-start" /></Tooltip>
<Tooltip className="tooltip_placement-top-end" content="위 · 오른쪽 정렬"><Button variant="outline" label="top-end" /></Tooltip>`, {
  name: 'TooltipExample2',
  reactImports: [],
  compImports: ['Button', 'Tooltip']
}),
    preview: <PlacementDemo />
  },
  {
    title: '화살표 · 방향 · 위치',
    description: (
      <>
        <code>arrow</code>(기본 <code>true</code>)로 화살표 유무를 고릅니다. <code>false</code>이면 <code>tooltip_no-arrow</code>가 붙습니다.
        방향은 <code>placement</code>, 가장자리 위치는 배치 클래스나 <code>arrowPosition</code>으로 맞춥니다.
      </>
    ),
    code: wrapPageExample(`<Tooltip className="is-open" arrow content="화살표 있음"><Button label="있음" /></Tooltip>
<Tooltip className="is-open" arrow={false} content="화살표 없음"><Button label="없음" /></Tooltip>
<Tooltip placement="top" className="is-open" content="위"><Button label="위" /></Tooltip>
<Tooltip className="is-open" arrowPosition="25%" content="커스텀 25%"><Button label="25%" /></Tooltip>`, {
  name: 'TooltipExample3',
  reactImports: [],
  compImports: ['Button', 'Tooltip']
}),
    preview: <ArrowDemo />
  },
  {
    title: '내용',
    description: (
      <>
        <code>content</code>는 문자열뿐 아니라 <code>ReactNode</code>를 받습니다. 대상은 <code>trigger</code> prop으로도 지정할 수 있습니다.
        말풍선은 <code>role=&quot;tooltip&quot;</code>이며 최대 너비를 넘으면 줄바꿈됩니다.
      </>
    ),
    code: wrapPageExample(`<Tooltip className="is-open" content={<><strong>저장</strong> 단축키: <code>⌘S</code></>}>
  <Button variant="outline" label="ReactNode 내용" />
</Tooltip>
<Tooltip className="is-open" trigger={<Button variant="outline" label="trigger prop" />} content="trigger 로 대상을 지정합니다." />`, {
  name: 'TooltipExample4',
  reactImports: [],
  compImports: ['Button', 'Tooltip']
}),
    preview: (
      <div className="tooltip_demo-stage">
        <div className="tooltip_row" style={{ gap: '4rem', padding: '3rem 1rem', justifyContent: 'center' }}>
          <Tooltip className="is-open" content={<><strong>저장</strong> 단축키: <code>⌘S</code></>}>
            <Button variant="outline" label="ReactNode 내용" />
          </Tooltip>
          <Tooltip
            className="is-open"
            trigger={<Button variant="outline" label="trigger prop" />}
            content="trigger 로 대상을 지정합니다."
          />
        </div>
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        크기는 <code>className</code>에 <code>tooltip_sm</code> · <code>tooltip_lg</code>를 붙여 바꿉니다. 기본(클래스 없음)은 중간 크기입니다.
        말풍선의 최대 너비, 여백, 글자 크기 토큰이 함께 바뀝니다.
      </>
    ),
    code: wrapPageExample(`<Tooltip className="tooltip_sm" content="작은 말풍선"><Button variant="outline" label="Small" /></Tooltip>
<Tooltip content="기본 말풍선"><Button variant="outline" label="Medium" /></Tooltip>
<Tooltip className="tooltip_lg" content="큰 말풍선"><Button variant="outline" label="Large" /></Tooltip>`, {
  name: 'TooltipSizeExample',
  reactImports: [],
  compImports: ['Button', 'Tooltip']
}),
    preview: <SizeDemo />
  },
  {
    title: '간격 · 말풍선 정렬',
    description: (
      <>
        <code>tooltip_offset-none</code> · <code>tooltip_offset-sm</code> · <code>tooltip_offset-lg</code>로 트리거와 말풍선 사이 간격을 바꿉니다.
        교차축 정렬은 <code>tooltip_panel-align-start</code> · <code>tooltip_panel-align-end</code>이며,
        <code>left</code> · <code>right</code> 배치에서는 <code>tooltip_panel-align-center</code>도 쓸 수 있습니다.
      </>
    ),
    code: wrapPageExample(`<Tooltip className="is-open tooltip_offset-lg" content="간격 크게"><Button variant="outline" label="offset-lg" /></Tooltip>
<Tooltip className="is-open tooltip_offset-none" content="간격 없음"><Button variant="outline" label="offset-none" /></Tooltip>
<Tooltip className="is-open tooltip_panel-align-end" content="말풍선이 트리거 오른쪽 끝에 맞춰집니다."><Button variant="outline" label="align-end" /></Tooltip>`, {
  name: 'TooltipExample6',
  reactImports: [],
  compImports: ['Button', 'Tooltip']
}),
    preview: (
      <div className="tooltip_demo-stage">
        <div className="tooltip_row" style={{ gap: '4rem', padding: '3.5rem 1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Tooltip className="is-open tooltip_offset-lg" content="간격 크게">
            <Button variant="outline" label="offset-lg" />
          </Tooltip>
          <Tooltip className="is-open tooltip_offset-none" content="간격 없음">
            <Button variant="outline" label="offset-none" />
          </Tooltip>
          <Tooltip className="is-open tooltip_panel-align-end" content="말풍선이 트리거 오른쪽 끝에 맞춰집니다.">
            <Button variant="outline" label="align-end" />
          </Tooltip>
        </div>
      </div>
    )
  },
  {
    title: '반전 스킨',
    description: (
      <>
        <code>tooltip_inverse</code>를 붙이면 어두운 배경 · 밝은 글자 말풍선이 됩니다.
        색은 <code>--tooltip-inverse-bg</code> · <code>--tooltip-inverse-text</code> 토큰으로 바꿉니다.
      </>
    ),
    code: wrapPageExample(`<Tooltip className="is-open tooltip_inverse" content="반전 스킨">
  <Button variant="outline" label="inverse" />
</Tooltip>`, {
  name: 'TooltipExample7',
  reactImports: [],
  compImports: ['Button', 'Tooltip']
}),
    preview: (
      <div className="tooltip_demo-stage">
        <div className="tooltip_row">
          <Tooltip className="is-open tooltip_inverse" content="반전 스킨">
            <Button variant="outline" label="inverse" />
          </Tooltip>
        </div>
      </div>
    )
  },
  {
    title: '항상 표시',
    description: (
      <>
        React <code>Tooltip</code>에는 <code>open</code> prop이 없습니다. 호버 없이 계속 보여야 할 때(문서 미리보기 등)는
        루트 <code>className</code>에 <code>is-open</code>을 붙입니다.
      </>
    ),
    code: wrapPageExample(`<Tooltip className="is-open" content="항상 표시되는 말풍선">
  <Button variant="outline" label="is-open" />
</Tooltip>`, {
  name: 'TooltipExample8',
  reactImports: [],
  compImports: ['Button', 'Tooltip']
}),
    preview: (
      <div className="tooltip_demo-stage">
        <div className="tooltip_row">
          <Tooltip className="is-open" content="항상 표시되는 말풍선">
            <Button variant="outline" label="is-open" />
          </Tooltip>
        </div>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        말풍선에는 <code>role=&quot;tooltip&quot;</code>이 지정되고, 포커스 · 블러로도 열고 닫힙니다.
        <code>aria-label</code> 등 네이티브 span 속성은 루트로 전달됩니다. 말풍선은 항상 DOM에 있으므로
        짧은 보조 설명에만 쓰고, 중요한 정보는 본문에 직접 표시하세요.
      </>
    ),
    code: wrapPageExample(`<Tooltip aria-label="도움말 툴팁" content="도움말 내용">
  <Button variant="outline" label="도움말" />
</Tooltip>`, {
  name: 'TooltipA11yExample',
  reactImports: [],
  compImports: ['Button', 'Tooltip']
}),
    preview: (
      <div className="tooltip_demo-stage">
        <div className="tooltip_row">
          <Tooltip className="is-open" aria-label="도움말 툴팁" content="도움말 내용">
            <Button variant="outline" label="도움말" />
          </Tooltip>
        </div>
      </div>
    )
  }
]

/**
 * Tooltip 가이드 화면.
 * 기본 사용, 배치, 내용, 크기, 간격, 스킨 예시와 API 문서를 모은다.
 */
export default function TooltipGuide () {
  return (
    <GuideLayout
      category="피드백"
      title="Tooltip"
      description="대상 위에 잠깐 뜨는 도움말. content · placement · open · onOpenChange로 구성·제어합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="TooltipExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={tooltipApiSections} />
    </GuideLayout>
  )
}
