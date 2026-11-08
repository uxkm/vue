'use client'

import { useState } from 'react'
import {
  Button,
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Space,
  Spin
} from '@/comp'
import { spinApiSections } from '@/pages/pub/data/guide/spinApiSections'

/** spinning 을 버튼으로 켜고 끄는 래퍼 예시 */
function WrapDemo () {
  const [spinning, setSpinning] = useState(true)

  return (
    <Space vertical block size={14}>
      <Spin spinning={spinning} tip="불러오는 중…" block blur>
        <div style={{ padding: 16 }}>
          <p style={{ margin: 0 }}>카드 · 목록 등 콘텐츠 영역입니다.</p>
          <p style={{ margin: '8px 0 0', color: 'var(--color-text-muted)' }}>
            로딩이 끝나면 오버레이가 사라지고 본문을 조작할 수 있습니다.
          </p>
        </div>
      </Spin>
      <Button
        variant="outline"
        label={spinning ? '로딩 끄기' : '로딩 켜기'}
        onClick={() => setSpinning((value) => !value)}
      />
    </Space>
  )
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        기본은 회전 인디케이터만 표시합니다. <code>tip</code>을 주면 <code>spin_tip</code>에 문구가 붙고,
        <code>spinning={'{false}'}</code>이면 인디케이터를 숨깁니다.
      </>
    ),
    code: `<Spin />
<Spin tip="불러오는 중…" />
<Spin spinning={false} tip="숨김" />`,
    preview: (
      <Space size={24} align="center">
        <Spin />
        <Spin tip="불러오는 중…" />
        <Spin spinning={false} tip="숨김" />
      </Space>
    )
  },
  {
    title: '색상',
    description: (
      <>
        <code>color</code>는 <code>primary</code>(기본) · <code>success</code> · <code>warning</code> · <code>danger</code>를 받아
        루트에 <code>color_{'{값}'}</code> 클래스가 붙습니다.
      </>
    ),
    code: `<Spin color="primary" tip="primary" />
<Spin color="success" tip="success" />
<Spin color="warning" tip="warning" />
<Spin color="danger" tip="danger" />`,
    preview: (
      <Space size={24} align="center" wrap>
        <Spin color="primary" tip="primary" />
        <Spin color="success" tip="success" />
        <Spin color="warning" tip="warning" />
        <Spin color="danger" tip="danger" />
      </Space>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 <code>sm</code> · <code>md</code>(기본) · <code>lg</code>입니다.
        <code>sm</code> · <code>lg</code>일 때 루트에 <code>spin_sm</code> · <code>spin_lg</code>가 붙어 원 크기와 tip 글자 크기가 바뀝니다.
      </>
    ),
    code: `<Spin size="sm" tip="sm" />
<Spin size="md" tip="md" />
<Spin size="lg" tip="lg" />`,
    preview: (
      <Space size={24} align="center" wrap>
        <Spin size="sm" tip="sm" />
        <Spin size="md" tip="md" />
        <Spin size="lg" tip="lg" />
      </Space>
    )
  },
  {
    title: '인라인 · 블록',
    description: (
      <>
        <code>inline</code>은 인디케이터와 tip을 가로로 배치합니다(<code>spin_inline</code>).
        <code>block</code>은 단독 스피너를 가로 전체 너비로 가운데 둡니다(<code>spin_block</code>).
      </>
    ),
    code: `<Spin inline tip="저장 중…" />
<Spin block tip="전체 너비" />`,
    preview: (
      <Space vertical block size={14}>
        <Spin inline tip="저장 중…" />
        <Spin block tip="전체 너비" />
      </Space>
    )
  },
  {
    title: '콘텐츠 위 오버레이',
    description: (
      <>
        자식을 넣으면 <code>spin_wrap</code>으로 감싸고, <code>spinning</code>일 때 <code>spin_overlay</code>가 콘텐츠를 덮습니다.
        <code>block</code>은 래퍼에 <code>spin_wrap-block</code>(최소 높이)을, <code>blur</code>는 <code>spin_wrap-blur</code>를 붙입니다.
      </>
    ),
    code: `<Spin spinning={spinning} tip="불러오는 중…" block blur>
  <div>콘텐츠</div>
</Spin>`,
    preview: <WrapDemo />
  },
  {
    title: 'HTML 마크업 · 오버레이',
    description: (
      <>
        스타일 계약은 <code>spin_wrap.is-loading</code> + <code>spin_wrap-body</code> + <code>spin spin_overlay</code>입니다.
        React <code>Spin</code>에 자식을 넘기면 이 구조로 렌더링됩니다.
      </>
    ),
    code: `<div class="spin_wrap spin_wrap-block is-loading">
  <div class="spin_wrap-body">콘텐츠</div>
  <div class="spin spin_overlay color_primary" role="status" aria-live="polite" aria-busy="true" aria-label="로딩 중">
    <span class="spin_indicator" aria-hidden="true"></span>
    <span class="spin_tip">불러오는 중…</span>
  </div>
</div>`,
    preview: (
      <div className="spin_wrap spin_wrap-block is-loading">
        <div className="spin_wrap-body" style={{ padding: 16 }}>
          HTML 마크업 오버레이 예시입니다.
        </div>
        <div
          className="spin spin_overlay color_primary"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="로딩 중"
        >
          <span className="spin_indicator" aria-hidden="true" />
          <span className="spin_tip">불러오는 중…</span>
        </div>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        인디케이터(또는 overlay)에 <code>role=&quot;status&quot;</code> · <code>aria-live=&quot;polite&quot;</code> · <code>aria-busy</code>가 지정됩니다.
        <code>aria-label</code>은 <code>ariaLabel</code> → 문자열 <code>tip</code> → &quot;로딩 중&quot; 순입니다.
        인디케이터 원에는 <code>aria-hidden</code>을 둡니다.
      </>
    ),
    code: `<Spin tip="파일 업로드 중" ariaLabel="파일 업로드 진행 중" />`,
    preview: <Spin tip="파일 업로드 중" ariaLabel="파일 업로드 진행 중" />
  }
]

/**
 * Spin 가이드 화면.
 * 기본 · 색 · 크기 · 인라인 · 오버레이 예시와 API 문서를 모은다.
 */
export default function SpinGuide () {
  return (
    <GuideLayout
      category="피드백"
      title="Spin"
      description="로딩 표시. spinning · tip · color · size로 구성하며 인라인 · 콘텐츠 오버레이를 지원합니다."
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

      <GuideApiDocs sections={spinApiSections} />
    </GuideLayout>
  )
}
