'use client'

import { useState } from 'react'
import {
  Button,
  DemoBlock,
  Drawer,
  GuideApiDocs,
  GuideLayout
} from '@/comp'
import { drawerApiSections } from '@/pages/pub/data/guide/drawerApiSections'

/** 취소·확인 푸터 버튼 */
function FooterActions ({ onCancel, onConfirm, confirmLabel = '적용' }) {
  return (
    <>
      <Button variant="outline" color="default" label="취소" onClick={onCancel} />
      <Button color="primary" label={confirmLabel} onClick={onConfirm} />
    </>
  )
}

/** 버튼으로 열고 닫는 서랍 예시 */
function OpenDemo () {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button label="서랍 열기" onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        title="필터"
        footer={<FooterActions onCancel={close} onConfirm={close} />}
        onClose={close}
      >
        조건을 선택하세요.
      </Drawer>
    </>
  )
}

/** 방향별로 여는 서랍 예시 */
function PlacementDemo () {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState('right')

  return (
    <>
      <div className="demo-row">
        {['left', 'right', 'top', 'bottom'].map((value) => (
          <Button
            key={value}
            variant="outline"
            label={value}
            onClick={() => {
              setPlacement(value)
              setOpen(true)
            }}
          />
        ))}
      </div>
      <Drawer
        open={open}
        placement={placement}
        title={`placement="${placement}"`}
        onClose={() => setOpen(false)}
      >
        화면 <code>{placement}</code> 가장자리에서 열립니다.
      </Drawer>
    </>
  )
}

/** bottom 시트 — 드래그 유/무 */
function BottomSheetDemo () {
  const [open, setOpen] = useState(false)
  const [drag, setDrag] = useState(true)

  return (
    <>
      <div className="demo-row">
        <Button
          variant="outline"
          label="드래그 있음"
          onClick={() => {
            setDrag(true)
            setOpen(true)
          }}
        />
        <Button
          variant="outline"
          label="드래그 없음"
          onClick={() => {
            setDrag(false)
            setOpen(true)
          }}
        />
      </div>
      <Drawer
        open={open}
        placement="bottom"
        draggable={drag}
        title={drag ? '드래그 시트' : '일반 하단 시트'}
        onClose={() => setOpen(false)}
      >
        {drag
          ? '상단 바를 아래로 끌면 닫히고, 위로 끌면 확장됩니다.'
          : '핸들 바 없이 닫기 버튼·오버레이로만 닫습니다.'}
      </Drawer>
    </>
  )
}

/** 크기별로 여는 서랍 예시 */
function SizeDemo () {
  const [size, setSize] = useState(null)
  const close = () => setSize(null)

  return (
    <>
      <div className="demo-row">
        <Button variant="outline" label="Small" onClick={() => setSize('sm')} />
        <Button variant="outline" label="Medium" onClick={() => setSize('md')} />
        <Button variant="outline" label="Large" onClick={() => setSize('lg')} />
      </div>
      <Drawer
        open={size !== null}
        className={size === 'md' ? undefined : `drawer_${size}`}
        title={size === 'md' ? '기본 크기' : `drawer_${size}`}
        onClose={close}
      >
        className 로 크기 토큰을 바꿉니다.
      </Drawer>
    </>
  )
}

const SECTIONS = [
  {
    title: '열기와 닫기',
    description: (
      <>
        <code>open</code>에 맞춰 가장자리에서 슬라이드로 열리고 닫힙니다.
        오버레이나 닫기 버튼(<code>Icon</code> <code>close</code>)을 누르면 <code>onClose</code>가 호출되므로, 부모에서 <code>open</code> 상태를 직접 바꿉니다.
      </>
    ),
    code: `const [open, setOpen] = useState(false)

<Button label="서랍 열기" onClick={() => setOpen(true)} />
<Drawer
  open={open}
  title="필터"
  footer={
    <>
      <Button variant="outline" color="default" label="취소" onClick={() => setOpen(false)} />
      <Button label="적용" onClick={() => setOpen(false)} />
    </>
  }
  onClose={() => setOpen(false)}
>
  조건을 선택하세요.
</Drawer>`,
    preview: <OpenDemo />
  },
  {
    title: '배치',
    description: (
      <>
        <code>placement</code>는 left · right · top · bottom입니다. 기본은 <code>right</code>이며,
        <code>drawer_placement-*</code> 클래스가 붙습니다.
      </>
    ),
    code: `<Drawer open={open} placement="left" title="left" onClose={close}>내용</Drawer>
<Drawer open={open} placement="right" title="right" onClose={close}>내용</Drawer>
<Drawer open={open} placement="top" title="top" onClose={close}>내용</Drawer>
<Drawer open={open} placement="bottom" title="bottom" onClose={close}>내용</Drawer>`,
    preview: <PlacementDemo />
  },
  {
    title: '하단 시트 · 드래그',
    description: (
      <>
        <code>placement=&quot;bottom&quot;</code>에서 <code>draggable</code>이면 상단에 핸들 바가 보이고 드래그로 닫기·확장할 수 있습니다.
        <code>draggable</code>이 없으면 바를 표시하지 않으며 닫기 버튼·오버레이만 사용합니다.
      </>
    ),
    code: `<Drawer open={open} placement="bottom" draggable title="드래그 시트" onClose={close}>
  상단 바를 드래그하세요.
</Drawer>
<Drawer open={open} placement="bottom" title="일반 하단 시트" onClose={close}>
  핸들 바 없음
</Drawer>`,
    preview: <BottomSheetDemo />
  },
  {
    title: '제목과 본문',
    description: (
      <>
        <code>title</code>은 헤더에 굵게 표시되고, 본문은 <code>children</code>으로 전달합니다.
        <code>title</code>이 없어도 빈 제목 영역이 남아 닫기 버튼은 항상 오른쪽 끝에 위치합니다.
      </>
    ),
    code: `<div className="drawer_demo-frame drawer_demo-frame-compact">
  <Drawer staticDemo open title="제목이 있는 서랍">본문 내용입니다.</Drawer>
</div>
<div className="drawer_demo-frame drawer_demo-frame-compact">
  <Drawer staticDemo open>제목 없이 본문만 있는 서랍입니다.</Drawer>
</div>`,
    preview: (
      <div className="demo-stack">
        <div className="drawer_demo-frame drawer_demo-frame-compact">
          <Drawer staticDemo open title="제목이 있는 서랍">본문 내용입니다.</Drawer>
        </div>
        <div className="drawer_demo-frame drawer_demo-frame-compact">
          <Drawer staticDemo open>제목 없이 본문만 있는 서랍입니다.</Drawer>
        </div>
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        크기는 <code>className</code>에 <code>drawer_sm</code> · <code>drawer_lg</code>를 붙여 바꿉니다. 기본(클래스 없음)은 중간 크기입니다.
        left·right는 너비, top·bottom은 높이 토큰이 바뀝니다.
      </>
    ),
    code: `<Drawer open={open} className="drawer_sm" title="Small" onClose={close}>작은 서랍</Drawer>
<Drawer open={open} title="Medium" onClose={close}>기본 서랍</Drawer>
<Drawer open={open} className="drawer_lg" title="Large" onClose={close}>큰 서랍</Drawer>`,
    preview: <SizeDemo />
  },
  {
    title: '푸터 액션',
    description: (
      <>
        <code>footer</code>로 취소·확인 같은 버튼을 전달하면 오른쪽 정렬(<code>drawer_footer-end</code>) 푸터로 표시됩니다.
        <code>footer</code>가 없으면 푸터 영역은 렌더링되지 않습니다.
      </>
    ),
    code: `<Drawer
  open
  title="필터"
  footer={
    <>
      <Button variant="outline" color="default" label="취소" />
      <Button color="primary" label="적용" />
    </>
  }
>
  조건을 선택하세요.
</Drawer>`,
    preview: (
      <div className="drawer_demo-frame drawer_demo-frame-compact">
        <Drawer
          staticDemo
          open
          title="필터"
          footer={<FooterActions onCancel={() => {}} onConfirm={() => {}} />}
        >
          조건을 선택하세요.
        </Drawer>
      </div>
    )
  },
  {
    title: '문서용 고정 미리보기',
    description: (
      <>
        <code>staticDemo</code>는 서랍을 뷰포트 대신 <code>drawer_demo-frame</code> 안에 고정해 보여 줍니다.
        가이드 미리보기용이며, 실제 화면에서는 쓰지 않습니다.
      </>
    ),
    code: `<div className="drawer_demo-frame">
  <Drawer staticDemo open title="고정 미리보기">프레임 안에 표시됩니다.</Drawer>
</div>`,
    preview: (
      <div className="drawer_demo-frame">
        <Drawer staticDemo open title="고정 미리보기">프레임 안에 표시됩니다.</Drawer>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        루트에 <code>role="dialog"</code> · <code>aria-modal="true"</code>가 자동 지정되고, 닫기 버튼에는 <code>aria-label="닫기"</code>가 있습니다.
        <code>aria-label</code> 등 네이티브 div 속성은 루트로 전달됩니다.
      </>
    ),
    code: `<Drawer open title="상세" aria-label="상세 서랍" onClose={close}>
  내용
</Drawer>`,
    preview: (
      <div className="drawer_demo-frame drawer_demo-frame-compact">
        <Drawer staticDemo open title="상세" aria-label="상세 서랍">내용</Drawer>
      </div>
    )
  }
]

/**
 * Drawer 가이드 화면.
 * 열기·닫기, 배치, 제목, 크기, 푸터 액션 예시와 API 문서를 모은다.
 */
export default function DrawerGuide () {
  return (
    <GuideLayout
      category="피드백"
      title="Drawer"
      description="화면 가장자리 패널. open · placement · title · footer로 구성합니다."
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

      <GuideApiDocs sections={drawerApiSections} />
    </GuideLayout>
  )
}
