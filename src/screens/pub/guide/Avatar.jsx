'use client'

import { Avatar, AvatarGroup, Icon } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { avatarApiSections } from '@/screens/pub/data/guide/avatarApiSections'

const SAMPLE = '/images/samples/avatar/avatar-sample.svg'

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        이미지가 있으면 <code>avatar_image</code>로 표시하고, 없으면 아이콘·이니셜 순으로 대체합니다.
      </>
    ),
    code: wrapPageExample(`<Avatar src="/images/samples/avatar/avatar-sample.svg" alt="홍길동" />
<Avatar color="primary" initials="홍" ariaHidden />
<Avatar color="default" icon={<Icon name="user" className="avatar_icon" />} ariaHidden />`, {
      name: 'AvatarExample',
      reactImports: [],
      compImports: ['Avatar', 'Icon']
    }),
    preview: (
      <div className="demo-row icon_group">
        <Avatar src={SAMPLE} alt="홍길동" />
        <Avatar color="primary" initials="홍" ariaHidden />
        <Avatar color="default" icon={<Icon name="user" className="avatar_icon" />} ariaHidden />
      </div>
    )
  },
  {
    title: '크기',
    description: 'small, medium, large, extra large 네 가지 크기를 제공합니다.',
    code: wrapPageExample(`<Avatar size="sm" color="primary" initials="A" ariaHidden />
<Avatar size="md" color="primary" initials="B" ariaHidden />
<Avatar size="lg" color="primary" initials="C" ariaHidden />
<Avatar size="xl" color="primary" initials="D" ariaHidden />`, {
      name: 'AvatarSizeExample',
      reactImports: [],
      compImports: ['Avatar']
    }),
    preview: (
      <div className="demo-row icon_group">
        <Avatar size="sm" color="primary" initials="A" ariaHidden />
        <Avatar size="md" color="primary" initials="B" ariaHidden />
        <Avatar size="lg" color="primary" initials="C" ariaHidden />
        <Avatar size="xl" color="primary" initials="D" ariaHidden />
      </div>
    )
  },
  {
    title: '형태',
    description: (
      <>
        기본은 원형이며 <code>square</code>로 사각형을 적용합니다.
      </>
    ),
    code: wrapPageExample(`<Avatar color="primary" initials="원" ariaHidden />
<Avatar square color="primary" initials="각" ariaHidden />
<Avatar square src="…" alt="홍길동" />`, {
      name: 'AvatarShapeExample',
      reactImports: [],
      compImports: ['Avatar']
    }),
    preview: (
      <div className="demo-row icon_group">
        <Avatar color="primary" initials="원" ariaHidden />
        <Avatar square color="primary" initials="각" ariaHidden />
        <Avatar square src={SAMPLE} alt="홍길동" />
      </div>
    )
  },
  {
    title: '색상',
    description: (
      <>
        이니셜·아이콘형 아바타에 공통 <code>color_*</code> 색상을 적용합니다.
      </>
    ),
    code: wrapPageExample(`<Avatar color="default" initials="D" ariaHidden />
<Avatar color="primary" initials="P" ariaHidden />
<Avatar color="success" initials="S" ariaHidden />
<Avatar color="warning" initials="W" ariaHidden />
<Avatar color="danger" initials="E" ariaHidden />`, {
      name: 'AvatarColorExample',
      reactImports: [],
      compImports: ['Avatar']
    }),
    preview: (
      <div className="demo-row icon_group">
        <Avatar color="default" initials="D" ariaHidden />
        <Avatar color="primary" initials="P" ariaHidden />
        <Avatar color="success" initials="S" ariaHidden />
        <Avatar color="warning" initials="W" ariaHidden />
        <Avatar color="danger" initials="E" ariaHidden />
      </div>
    )
  },
  {
    title: '상태 배지',
    description: (
      <>
        <code>badgeColor</code>와 <code>badgeLabel</code>로 온라인·자리 비움·오프라인 상태를 표시합니다.
      </>
    ),
    code: wrapPageExample(`<Avatar color="primary" initials="온" badgeColor="success" badgeLabel="온라인" />
<Avatar color="default" initials="대" badgeColor="warning" badgeLabel="자리 비움" />
<Avatar color="default" initials="오" badgeColor="danger" badgeLabel="오프라인" />`, {
      name: 'AvatarBadgeExample',
      reactImports: [],
      compImports: ['Avatar']
    }),
    preview: (
      <div className="demo-row icon_group">
        <Avatar color="primary" initials="온" badgeColor="success" badgeLabel="온라인" />
        <Avatar color="default" initials="대" badgeColor="warning" badgeLabel="자리 비움" />
        <Avatar color="default" initials="오" badgeColor="danger" badgeLabel="오프라인" />
      </div>
    )
  },
  {
    title: '그룹',
    description: (
      <>
        <code>AvatarGroup</code>은 여러 아바타를 겹쳐 표시합니다. <code>ariaLabel</code>로 인원·목적을 설명합니다.
      </>
    ),
    code: wrapPageExample(`<AvatarGroup ariaLabel="팀 멤버 4명">
  <Avatar color="primary" initials="김" ariaHidden />
  <Avatar color="success" initials="이" ariaHidden />
  <Avatar color="warning" initials="박" ariaHidden />
  <Avatar color="danger" initials="최" ariaHidden />
</AvatarGroup>
<AvatarGroup ariaLabel="팀 멤버 3명">
  <Avatar src="…" alt="홍길동" />
  <Avatar color="primary" initials="홍" ariaHidden />
  <Avatar color="default" icon={<Icon name="plus" className="avatar_icon" />} ariaHidden />
</AvatarGroup>`, {
      name: 'AvatarGroupExample',
      reactImports: [],
      compImports: ['Avatar', 'AvatarGroup', 'Icon']
    }),
    preview: (
      <div className="typo_stack">
        <AvatarGroup ariaLabel="팀 멤버 4명">
          <Avatar color="primary" initials="김" ariaHidden />
          <Avatar color="success" initials="이" ariaHidden />
          <Avatar color="warning" initials="박" ariaHidden />
          <Avatar color="danger" initials="최" ariaHidden />
        </AvatarGroup>
        <AvatarGroup ariaLabel="팀 멤버 3명">
          <Avatar src={SAMPLE} alt="홍길동" />
          <Avatar color="primary" initials="홍" ariaHidden />
          <Avatar color="default" icon={<Icon name="plus" className="avatar_icon" />} ariaHidden />
        </AvatarGroup>
      </div>
    )
  }
]

/**
 * Avatar 가이드 화면.
 * docs와 동일한 기본·크기·형태·색·상태 배지·그룹을 제공한다.
 */
export default function AvatarGuide () {
  return (
    <GuideLayout
      category="데이터 표시"
      title="Avatar"
      description="사용자·조직을 이미지, 이니셜 또는 아이콘으로 표현합니다. 크기·형태·색상·상태 점과 겹침 그룹을 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="AvatarExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={avatarApiSections} />
    </GuideLayout>
  )
}
