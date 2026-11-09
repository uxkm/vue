'use client'

import { useState } from 'react'
import { Button, Modal } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/pages/pub/widgets/guide'
import { modalApiSections } from '@/pages/pub/data/guide/modalApiSections'

/** 취소·확인 푸터 버튼 */
function FooterActions ({ onCancel, onConfirm, confirmLabel = '저장', confirmColor = 'primary' }) {
  return (
    <>
      <Button variant="outline" color="default" label="취소" onClick={onCancel} />
      <Button color={confirmColor} label={confirmLabel} onClick={onConfirm} />
    </>
  )
}

/** 버튼으로 열고 닫는 모달 예시 */
function OpenDemo () {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button label="모달 열기" onClick={() => setOpen(true)} />
      <Modal
        open={open}
        title="변경 사항 저장"
        footer={<FooterActions onCancel={close} onConfirm={close} />}
        onClose={close}
        onOpenChange={(next) => {
          if (!next) close()
        }}
      >
        저장하지 않은 내용이 있습니다.
      </Modal>
    </>
  )
}

/** 크기별로 여는 모달 예시 */
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
      <Modal
        open={size !== null}
        size={size || 'md'}
        title={`size="${size}"`}
        footer={<Button label="확인" onClick={close} />}
        onClose={close}
      >
        <code>size</code>에 따라 대화상자 너비가 달라집니다.
      </Modal>
    </>
  )
}

const SECTIONS = [
  {
    title: '열기와 닫기',
    description: (
      <>
        <code>open</code>이 <code>true</code>일 때만 렌더링됩니다.
        오버레이나 닫기 버튼(<code>Icon</code> <code>close</code>)을 누르면 <code>onClose</code>와 <code>onOpenChange(false)</code>가 호출되므로, 부모에서 <code>open</code> 상태를 직접 바꿉니다.
      </>
    ),
    code: wrapPageExample(`const [open, setOpen] = useState(false)

<Button label="모달 열기" onClick={() => setOpen(true)} />
<Modal
  open={open}
  title="변경 사항 저장"
  footer={
    <>
      <Button variant="outline" color="default" label="취소" onClick={() => setOpen(false)} />
      <Button label="저장" onClick={() => setOpen(false)} />
    </>
  }
  onClose={() => setOpen(false)}
  onOpenChange={(next) => { if (!next) setOpen(false) }}
>
  저장하지 않은 내용이 있습니다.
</Modal>`, {
      name: 'ModalExample',
      reactImports: ['useState'],
      compImports: ['Modal', 'Button']
    }),
    preview: <OpenDemo />
  },
  {
    title: '제목과 본문',
    description: (
      <>
        <code>title</code>은 헤더에 굵게 표시되고, 본문은 <code>children</code>으로 전달합니다.
        <code>title</code>이 없어도 헤더에는 닫기 버튼이 남습니다.
      </>
    ),
    code: wrapPageExample(`<div className="modal_demo-frame modal_demo-frame-compact">
  <Modal staticDemo open title="제목이 있는 모달">본문 내용입니다.</Modal>
</div>
<div className="modal_demo-frame modal_demo-frame-compact">
  <Modal staticDemo open>제목 없이 본문만 있는 모달입니다.</Modal>
</div>`, {
  name: 'ModalExample1',
  reactImports: [],
  compImports: ['Modal']
}),
    preview: (
      <div className="demo-stack">
        <div className="modal_demo-frame modal_demo-frame-compact">
          <Modal staticDemo open title="제목이 있는 모달">본문 내용입니다.</Modal>
        </div>
        <div className="modal_demo-frame modal_demo-frame-compact">
          <Modal staticDemo open>제목 없이 본문만 있는 모달입니다.</Modal>
        </div>
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 sm · md · lg입니다. 기본은 <code>md</code>이며,
        <code>modal_sm</code> · <code>modal_lg</code> 클래스가 붙어 너비 토큰이 바뀝니다.
      </>
    ),
    code: wrapPageExample(`<Modal open={open} size="sm" title="Small" onClose={close}>작은 모달</Modal>
<Modal open={open} size="md" title="Medium" onClose={close}>기본 모달</Modal>
<Modal open={open} size="lg" title="Large" onClose={close}>큰 모달</Modal>`, {
  name: 'ModalSizeExample',
  reactImports: [],
  compImports: ['Modal']
}),
    preview: <SizeDemo />
  },
  {
    title: '푸터 액션',
    description: (
      <>
        <code>footer</code>로 취소·확인 같은 버튼을 전달하면 오른쪽 정렬(<code>modal_footer-end</code>) 푸터로 표시됩니다.
        <code>footer</code>가 없으면 푸터 영역은 렌더링되지 않습니다.
      </>
    ),
    code: wrapPageExample(`<Modal
  open
  title="항목 삭제"
  footer={
    <>
      <Button variant="outline" color="default" label="취소" />
      <Button color="danger" label="삭제" />
    </>
  }
>
  선택한 항목을 삭제하시겠습니까?
</Modal>`, {
  name: 'ModalExample3',
  reactImports: [],
  compImports: ['Button', 'Modal']
}),
    preview: (
      <div className="modal_demo-frame">
        <Modal
          staticDemo
          open
          title="항목 삭제"
          footer={<FooterActions onCancel={() => {}} onConfirm={() => {}} confirmLabel="삭제" confirmColor="danger" />}
        >
          선택한 항목을 삭제하시겠습니까?
        </Modal>
      </div>
    )
  },
  {
    title: '문서용 고정 미리보기',
    description: (
      <>
        <code>staticDemo</code>는 모달을 뷰포트 대신 <code>modal_demo-frame</code> 안에 고정해 보여 줍니다.
        가이드 미리보기용이며, 실제 화면에서는 쓰지 않습니다.
      </>
    ),
    code: wrapPageExample(`<div className="modal_demo-frame">
  <Modal staticDemo open title="고정 미리보기">프레임 안에 표시됩니다.</Modal>
</div>`, {
  name: 'ModalScrollExample',
  reactImports: [],
  compImports: ['Modal']
}),
    preview: (
      <div className="modal_demo-frame">
        <Modal staticDemo open title="고정 미리보기">프레임 안에 표시됩니다.</Modal>
      </div>
    )
  },
  {
    title: '스타일 클래스 확장',
    description: (
      <>
        <code>className</code>으로 <code>modal_scrollable</code> · <code>modal_fullscreen</code> 같은 공통 스킨 클래스를 루트에 붙일 수 있습니다.
        <code>modal_scrollable</code>은 본문이 길 때 본문만 스크롤합니다.
      </>
    ),
    code: wrapPageExample(`<Modal open title="스크롤 본문" className="modal_scrollable" onClose={close}>
  {/* 긴 본문 */}
</Modal>`, {
  name: 'ModalExample5',
  reactImports: [],
  compImports: ['Modal']
}),
    preview: (
      <div className="modal_demo-frame modal_demo-frame-compact">
        <Modal staticDemo open title="스크롤 본문" className="modal_scrollable">
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i}>긴 본문 {i + 1}번째 줄입니다. 내용이 길면 본문 영역만 스크롤됩니다.</p>
          ))}
        </Modal>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        루트에 <code>role=&quot;dialog&quot;</code> · <code>aria-modal=&quot;true&quot;</code>가 자동 지정되고, 닫기 버튼에는 <code>aria-label=&quot;닫기&quot;</code>가 있습니다.
        <code>aria-label</code> 등 네이티브 div 속성은 루트로 전달됩니다.
      </>
    ),
    code: wrapPageExample(`<Modal open title="확인" aria-label="확인 대화상자" onClose={close}>
  내용
</Modal>`, {
  name: 'ModalA11yExample',
  reactImports: [],
  compImports: ['Modal']
}),
    preview: (
      <div className="modal_demo-frame modal_demo-frame-compact">
        <Modal staticDemo open title="확인" aria-label="확인 대화상자">내용</Modal>
      </div>
    )
  }
]

/**
 * Modal 가이드 화면.
 * 열기·닫기, 제목, 크기, 푸터 액션 예시와 API 문서를 모은다.
 */
export default function ModalGuide () {
  return (
    <GuideLayout
      category="피드백"
      title="Modal"
      description="화면 중앙 대화상자. open · title · size · footer로 구성합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="ModalExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={modalApiSections} />
    </GuideLayout>
  )
}
