'use client'

import { useState } from 'react'
import {
  Button,
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Popover
} from '@/comp'
import { popoverApiSections } from '@/pages/pub/data/guide/popoverApiSections'

/** 배치 변형 — 값과 붙일 클래스 (기본은 트리거 아래 · 왼쪽 정렬) */
const PLACEMENTS = [
  { value: 'bottom', label: 'bottom (기본)', className: undefined },
  { value: 'bottom-end', label: 'bottom-end', className: 'popover_placement-end' },
  { value: 'bottom-center', label: 'bottom-center', className: 'popover_placement-bottom-center' },
  { value: 'top', label: 'top', className: 'popover_placement-top' },
  { value: 'top-center', label: 'top-center', className: 'popover_placement-top-center' },
  { value: 'left', label: 'left', className: 'popover_placement-left' },
  { value: 'right', label: 'right', className: 'popover_placement-right' }
]

/** 트리거만 눌러 열고 닫는 팝오버 예시 (비제어) */
function BasicDemo () {
  return (
    <div className="popover_demo-stage">
      <Popover trigger="자세히" title="안내" content="추가 설명이 이 영역에 표시됩니다." />
    </div>
  )
}

/** open · onOpenChange 로 부모가 상태를 관리하는 예시 (제어) */
function ControlledDemo () {
  const [open, setOpen] = useState(false)

  return (
    <div className="popover_demo-stage">
      <div className="popover_row">
        <Popover
          open={open}
          trigger={open ? '닫기' : '열기'}
          title="제어 모드"
          content="open 이 부모 상태를 따릅니다."
          onOpenChange={setOpen}
        />
        <Button variant="outline" label="바깥 버튼으로 토글" onClick={() => setOpen((prev) => !prev)} />
        <span>open: <code>{String(open)}</code></span>
      </div>
    </div>
  )
}

/** 배치별로 여는 팝오버 예시 — 닫혀도 마지막 배치를 유지한다 */
function PlacementDemo () {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState('bottom')
  const current = PLACEMENTS.find((item) => item.value === placement) ?? PLACEMENTS[0]

  return (
    <div className="popover_demo-stage">
      <div className="popover_row">
        {PLACEMENTS.map((item) => (
          <Button
            key={item.value}
            variant={item.value === placement ? 'filled' : 'outline'}
            label={item.label}
            onClick={() => {
              setPlacement(item.value)
              setOpen(true)
            }}
          />
        ))}
      </div>
      <div className="popover_row" style={{ justifyContent: 'center', marginTop: '4rem' }}>
        <Popover
          open={open}
          className={current.className}
          trigger={current.value}
          title={`placement="${current.value}"`}
          content={current.className ? <code>{current.className}</code> : '클래스 없음'}
          onOpenChange={setOpen}
        />
      </div>
    </div>
  )
}

/** 닫기 버튼 · 바깥 클릭 옵션 예시 */
function DismissDemo () {
  const [openClose, setOpenClose] = useState(false)
  const [openOutside, setOpenOutside] = useState(false)
  const [openKeep, setOpenKeep] = useState(false)

  return (
    <div className="popover_demo-stage">
      <div className="popover_row">
        <Popover
          open={openClose}
          trigger="닫기 버튼"
          title="닫기 있음"
          content="헤더 × 로 닫습니다. closable 기본값은 true 입니다."
          onOpenChange={setOpenClose}
        />
        <Popover
          open={openOutside}
          trigger="바깥 클릭 닫기"
          title="outside"
          content="패널 밖을 누르면 닫힙니다."
          closeOnOutsideClick
          onOpenChange={setOpenOutside}
        />
        <Popover
          open={openKeep}
          trigger="바깥 클릭 유지"
          title="유지"
          content="closeOnOutsideClick={false} — 바깥을 눌러도 유지됩니다."
          closable={false}
          closeOnOutsideClick={false}
          onOpenChange={setOpenKeep}
        />
      </div>
    </div>
  )
}

/** 화살표 방향·위치 변형 */
const ARROW_VARIANTS = [
  { value: 'bottom', label: '아래 · 시작', className: undefined },
  { value: 'bottom-end', label: '아래 · 끝', className: 'popover_placement-end' },
  { value: 'bottom-center', label: '아래 · 가운데', className: 'popover_placement-bottom-center' },
  { value: 'top', label: '위 · 시작', className: 'popover_placement-top' },
  { value: 'top-center', label: '위 · 가운데', className: 'popover_placement-top-center' },
  { value: 'left', label: '왼쪽', className: 'popover_placement-left' },
  { value: 'right', label: '오른쪽', className: 'popover_placement-right' },
  { value: 'custom', label: '커스텀 30%', className: undefined, arrowPosition: '30%' }
]

/** 화살표 유무 · 방향 · 위치 */
function ArrowDemo () {
  const [withArrow, setWithArrow] = useState(true)
  const [selected, setSelected] = useState('bottom')
  const current = ARROW_VARIANTS.find((item) => item.value === selected) ?? ARROW_VARIANTS[0]

  return (
    <div className="popover_demo-stage">
      <div className="popover_row" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
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
      <div className="popover_row" style={{ flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
        {ARROW_VARIANTS.map((item) => (
          <Button
            key={item.value}
            variant={item.value === selected ? 'filled' : 'outline'}
            label={item.label}
            onClick={() => setSelected(item.value)}
          />
        ))}
      </div>
      <div className="popover_row" style={{ justifyContent: 'center', marginTop: '2.5rem', minHeight: '12rem' }}>
        <Popover
          open
          closable={false}
          closeOnOutsideClick={false}
          className={current.className}
          arrow={withArrow}
          arrowPosition={withArrow ? current.arrowPosition : undefined}
          trigger="대상"
          title={withArrow ? current.label : `${current.label} · 화살표 없음`}
          content="arrow 옵션과 방향·위치를 확인하세요."
        />
      </div>
    </div>
  )
}

/** 크기별 팝오버 예시 */
function SizeDemo () {
  const [size, setSize] = useState('md')
  const [open, setOpen] = useState(false)
  const className = size === 'md' ? undefined : `popover_${size}`

  return (
    <div className="popover_demo-stage">
      <div className="popover_row">
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
      </div>
      <div className="popover_row" style={{ marginTop: '2rem' }}>
        <Popover
          open={open}
          className={className}
          trigger="크기 확인"
          title={className ?? '기본 크기'}
          content="className 으로 패널 폭·여백·글자 크기 토큰을 바꿉니다."
          onOpenChange={setOpen}
        />
      </div>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>trigger</code> 버튼을 누르면 패널이 열리고, 다시 누르면 닫힙니다.
        <code>open</code>을 넘기지 않으면 내부 상태로 동작합니다(비제어). <code>trigger</code>가 없으면 <code>자세히</code>가 표시됩니다.
      </>
    ),
    code: `<Popover trigger="자세히" title="안내" content="추가 설명이 이 영역에 표시됩니다." />`,
    preview: <BasicDemo />
  },
  {
    title: '열림 제어',
    description: (
      <>
        <code>open</code>을 넘기면 부모 상태가 기준이 됩니다(제어). 트리거·닫기 버튼·바깥 클릭 시 <code>onOpenChange</code>가 호출되므로
        부모에서 <code>open</code>을 직접 바꿉니다.
      </>
    ),
    code: `const [open, setOpen] = useState(false)

<Popover
  open={open}
  trigger={open ? '닫기' : '열기'}
  title="제어 모드"
  content="open 이 부모 상태를 따릅니다."
  onOpenChange={setOpen}
/>
<Button variant="outline" label="바깥 버튼으로 토글" onClick={() => setOpen((prev) => !prev)} />`,
    preview: <ControlledDemo />
  },
  {
    title: '닫기 버튼 · 바깥 클릭',
    description: (
      <>
        <code>closable</code>(기본 <code>true</code>)이면 헤더에 <code>Icon</code> <code>close</code> 버튼이 표시됩니다.
        <code>closeOnOutsideClick</code>(기본 <code>true</code>)이면 패널·트리거 밖을 누를 때 닫힙니다. 둘 다 <code>false</code>로 끌 수 있습니다.
      </>
    ),
    code: `<Popover closable title="닫기 있음" content="× 로 닫기" trigger="닫기 버튼" />
<Popover closeOnOutsideClick title="outside" content="바깥 클릭으로 닫기" trigger="바깥 클릭 닫기" />
<Popover closable={false} closeOnOutsideClick={false} title="유지" content="트리거로만 토글" trigger="바깥 클릭 유지" />`,
    preview: <DismissDemo />
  },
  {
    title: '배치',
    description: (
      <>
        React <code>Popover</code>에는 <code>placement</code> prop이 없고, 루트 <code>className</code>에
        <code>popover_placement-*</code> 클래스를 붙여 배치합니다. 기본은 트리거 아래 · 왼쪽 정렬이며,
        버튼을 눌러 배치를 바꿔도 팝오버가 닫히는 동안 마지막 배치가 유지됩니다.
      </>
    ),
    code: `<Popover className="popover_placement-end" trigger="bottom-end" title="제목" content="내용" />
<Popover className="popover_placement-bottom-center" trigger="bottom-center" title="제목" content="내용" />
<Popover className="popover_placement-top" trigger="top" title="제목" content="내용" />
<Popover className="popover_placement-top-center" trigger="top-center" title="제목" content="내용" />
<Popover className="popover_placement-left" trigger="left" title="제목" content="내용" />
<Popover className="popover_placement-right" trigger="right" title="제목" content="내용" />`,
    preview: <PlacementDemo />
  },
  {
    title: '화살표 · 방향 · 위치',
    description: (
      <>
        <code>arrow</code>(기본 <code>true</code>)로 화살표 유무를 고릅니다. <code>false</code>이면 <code>popover_no-arrow</code>가 붙습니다.
        방향은 배치 클래스, 가장자리 위치는 <code>popover_placement-end</code> · <code>arrowPosition</code> 등으로 맞춥니다.
      </>
    ),
    code: `<Popover open arrow title="화살표 있음" content="기본" trigger="있음" />
<Popover open arrow={false} title="화살표 없음" content="no-arrow" trigger="없음" />
<Popover open className="popover_placement-top" title="위" content="top" trigger="위" />
<Popover open arrowPosition="30%" title="커스텀" content="30%" trigger="30%" />`,
    preview: <ArrowDemo />
  },
  {
    title: '제목과 본문',
    description: (
      <>
        <code>title</code>은 헤더에 굵게 표시되고, 비어 있으면 헤더를 렌더링하지 않습니다.
        본문은 <code>content</code>로 전달하며, 없으면 <code>children</code>이 본문이 됩니다.
      </>
    ),
    code: `<Popover open trigger="제목 있음" title="안내" content="본문 내용입니다." />
<Popover open trigger="제목 없음" content="본문만 있는 팝오버입니다." />
<Popover open trigger="children 본문" title="children">
  <strong>children</strong> 으로 본문을 전달합니다.
</Popover>`,
    preview: (
      <div className="demo-stack">
        <div className="popover_demo-stage">
          <Popover open trigger="제목 있음" title="안내" content="본문 내용입니다." />
        </div>
        <div className="popover_demo-stage">
          <Popover open trigger="제목 없음" content="본문만 있는 팝오버입니다." />
        </div>
        <div className="popover_demo-stage">
          <Popover open trigger="children 본문" title="children">
            <strong>children</strong> 으로 본문을 전달합니다.
          </Popover>
        </div>
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        크기는 <code>className</code>에 <code>popover_sm</code> · <code>popover_lg</code>를 붙여 바꿉니다. 기본(클래스 없음)은 중간 크기입니다.
        패널의 최소·최대 너비, 여백, 글자 크기 토큰이 함께 바뀝니다.
      </>
    ),
    code: `<Popover className="popover_sm" trigger="Small" title="popover_sm" content="작은 패널" />
<Popover trigger="Medium" title="기본 크기" content="기본 패널" />
<Popover className="popover_lg" trigger="Large" title="popover_lg" content="큰 패널" />`,
    preview: <SizeDemo />
  },
  {
    title: '간격 · 패널 정렬',
    description: (
      <>
        <code>popover_offset-none</code> · <code>popover_offset-sm</code> · <code>popover_offset-lg</code>로 트리거와 패널 사이 간격을 바꿉니다.
        교차축 정렬은 <code>popover_panel-align-center</code> · <code>popover_panel-align-end</code>입니다.
      </>
    ),
    code: `<Popover open className="popover_offset-lg" trigger="간격 크게" title="offset-lg" content="트리거와 거리가 멉니다." />
<Popover open className="popover_panel-align-center" trigger="가운데 정렬" title="align-center" content="패널이 트리거 가운데에 맞춰집니다." />
<Popover open className="popover_panel-align-end" trigger="끝 정렬" title="align-end" content="패널이 트리거 오른쪽 끝에 맞춰집니다." />`,
    preview: (
      <div className="demo-stack">
        <div className="popover_demo-stage">
          <Popover open className="popover_offset-lg" trigger="간격 크게" title="offset-lg" content="트리거와 거리가 멉니다." />
        </div>
        <div className="popover_demo-stage">
          <Popover open className="popover_panel-align-center" trigger="가운데 정렬" title="align-center" content="패널이 트리거 가운데에 맞춰집니다." />
        </div>
        <div className="popover_demo-stage">
          <Popover open className="popover_panel-align-end" trigger="끝 정렬" title="align-end" content="패널이 트리거 오른쪽 끝에 맞춰집니다." />
        </div>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        트리거 버튼에 <code>aria-expanded</code>가 열림 상태와 함께 갱신되고, 패널에는 <code>role=&quot;dialog&quot;</code>가 지정됩니다.
        <code>aria-label</code> 등 네이티브 div 속성은 루트로 전달됩니다.
      </>
    ),
    code: `<Popover trigger="도움말" aria-label="도움말 팝오버" title="도움말" content="내용" />`,
    preview: (
      <div className="popover_demo-stage">
        <Popover open trigger="도움말" aria-label="도움말 팝오버" title="도움말" content="내용" />
      </div>
    )
  }
]

/**
 * Popover 가이드 화면.
 * 기본 사용, 열림 제어, 배치, 제목·본문, 크기, 간격 예시와 API 문서를 모은다.
 */
export default function PopoverGuide () {
  return (
    <GuideLayout
      category="피드백"
      title="Popover"
      description="트리거 옆 설명 패널. trigger · title · content · open · closable · closeOnOutsideClick으로 구성합니다."
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

      <GuideApiDocs sections={popoverApiSections} />
    </GuideLayout>
  )
}
