'use client'

import {
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Skeleton,
  Space
} from '@/comp'
import { skeletonApiSections } from '@/pages/pub/data/guide/skeletonApiSections'

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>variant</code>로 형태를 고릅니다. 기본 <code>rect</code>는 <code>width</code> · <code>height</code>로 크기를 정하고,
        <code>text</code> · <code>title</code> · <code>circle</code> · <code>button</code> · <code>image</code> · <code>block</code>은
        각각 <code>skeleton_*</code> 클래스가 붙습니다.
      </>
    ),
    code: `<Skeleton variant="title" />
<Skeleton variant="text" />
<Skeleton variant="circle" />
<Skeleton variant="button" />
<Skeleton width={160} height={12} />`,
    preview: (
      <Space vertical block size={12} style={{ maxWidth: 360 }}>
        <Skeleton variant="title" />
        <Skeleton variant="text" />
        <Skeleton variant="circle" />
        <Skeleton variant="button" />
        <Skeleton width={160} height={12} />
      </Space>
    )
  },
  {
    title: '형태',
    description: (
      <>
        <code>text</code> · <code>title</code> · <code>circle</code> · <code>button</code> · <code>image</code> · <code>block</code>을 나란히 비교합니다.
        <code>round</code>는 <code>skeleton_circle</code>과 같습니다.
      </>
    ),
    code: `<Skeleton variant="text" />
<Skeleton variant="title" />
<Skeleton variant="circle" />
<Skeleton variant="button" />
<Skeleton variant="image" />
<Skeleton variant="block" />`,
    preview: (
      <Space vertical block size={12} style={{ maxWidth: 360 }}>
        <Skeleton variant="text" />
        <Skeleton variant="title" />
        <Space size={12} align="center">
          <Skeleton variant="circle" />
          <Skeleton variant="button" />
        </Space>
        <Skeleton variant="image" />
        <Skeleton variant="block" />
      </Space>
    )
  },
  {
    title: '너비 토큰',
    description: (
      <>
        <code>width</code>에 <code>sm</code> · <code>md</code> · <code>lg</code>를 주면 <code>skeleton_w-*</code>가 붙어
        각각 약 35% · 65% · 85% 너비가 됩니다. CSS 길이·숫자를 주면 인라인 너비입니다.
      </>
    ),
    code: `<Skeleton variant="text" width="sm" />
<Skeleton variant="text" width="md" />
<Skeleton variant="text" width="lg" />
<Skeleton variant="text" width="50%" />`,
    preview: (
      <Space vertical block size={12} style={{ maxWidth: 360 }}>
        <Skeleton variant="text" width="sm" />
        <Skeleton variant="text" width="md" />
        <Skeleton variant="text" width="lg" />
        <Skeleton variant="text" width="50%" />
      </Space>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 <code>sm</code> · <code>md</code>(기본) · <code>lg</code>입니다.
        <code>sm</code> · <code>lg</code>일 때 <code>skeleton_sm</code> · <code>skeleton_lg</code>가 붙어 줄·원·버튼 치수가 바뀝니다.
      </>
    ),
    code: `<Skeleton size="sm" variant="text" />
<Skeleton size="md" variant="text" />
<Skeleton size="lg" variant="text" />
<Skeleton size="sm" variant="circle" />
<Skeleton size="lg" variant="circle" />`,
    preview: (
      <Space vertical block size={14} style={{ maxWidth: 360 }}>
        <Skeleton size="sm" variant="text" />
        <Skeleton size="md" variant="text" />
        <Skeleton size="lg" variant="text" />
        <Space size={16} align="center">
          <Skeleton size="sm" variant="circle" />
          <Skeleton size="md" variant="circle" />
          <Skeleton size="lg" variant="circle" />
        </Space>
      </Space>
    )
  },
  {
    title: '정적(애니메이션 없음)',
    description: (
      <>
        <code>static</code>을 켜면 <code>skeleton_static</code>이 붙어 shimmer가 멈춥니다.
        <code>prefers-reduced-motion</code>에서도 동일하게 꺼집니다.
      </>
    ),
    code: `<Skeleton variant="text" />
<Skeleton variant="text" static />`,
    preview: (
      <Space vertical block size={12} style={{ maxWidth: 360 }}>
        <Skeleton variant="text" />
        <Skeleton variant="text" static />
      </Space>
    )
  },
  {
    title: '그룹 · 행 (HTML 마크업)',
    description: (
      <>
        여러 칸을 묶을 때는 <code>skeleton_group</code> · <code>skeleton_row</code> · <code>skeleton_row-body</code>를 씁니다.
        그룹에 <code>role=&quot;status&quot;</code> · <code>aria-busy</code> · <code>aria-label</code>을 두고, 각 칸은 <code>aria-hidden</code>입니다.
        React <code>Skeleton</code>은 한 칸만 렌더링합니다.
      </>
    ),
    code: `<div class="skeleton_group" role="status" aria-busy="true" aria-label="콘텐츠 로딩 중">
  <span class="skeleton skeleton_title skeleton_w-md" aria-hidden="true"></span>
  <span class="skeleton skeleton_text" aria-hidden="true"></span>
  <div class="skeleton_row">
    <span class="skeleton skeleton_circle" aria-hidden="true"></span>
    <div class="skeleton_row-body">
      <span class="skeleton skeleton_text skeleton_w-sm" aria-hidden="true"></span>
      <span class="skeleton skeleton_text" aria-hidden="true"></span>
    </div>
  </div>
  <span class="skeleton skeleton_button" aria-hidden="true"></span>
</div>`,
    preview: (
      <div
        className="skeleton_group"
        role="status"
        aria-busy="true"
        aria-label="콘텐츠 로딩 중"
        style={{ maxWidth: 360 }}
      >
        <Skeleton variant="title" width="md" />
        <Skeleton variant="text" />
        <div className="skeleton_row">
          <Skeleton variant="circle" />
          <div className="skeleton_row-body">
            <Skeleton variant="text" width="sm" />
            <Skeleton variant="text" />
          </div>
        </div>
        <Skeleton variant="button" />
      </div>
    )
  },
  {
    title: '카드 프리뷰 조합',
    description: (
      <>
        <code>image</code>와 텍스트 줄을 모아 카드형 로딩 UI를 구성한 예시입니다.
      </>
    ),
    code: `<div className="skeleton_group">
  <Skeleton variant="image" />
  <Skeleton variant="title" width="md" />
  <Skeleton variant="text" />
  <Skeleton variant="text" width="lg" />
</div>`,
    preview: (
      <div className="skeleton_group" style={{ maxWidth: 280 }}>
        <Skeleton variant="image" />
        <Skeleton variant="title" width="md" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="lg" />
      </div>
    )
  }
]

/**
 * Skeleton 가이드 화면.
 * 형태 · 너비 · 크기 · 그룹 예시와 API 문서를 모은다.
 */
export default function SkeletonGuide () {
  return (
    <GuideLayout
      category="피드백"
      title="Skeleton"
      description="로딩 뼈대. variant · size · width로 구성하며 그룹 · 행 마크업과 shimmer를 지원합니다."
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

      <GuideApiDocs sections={skeletonApiSections} />
    </GuideLayout>
  )
}
