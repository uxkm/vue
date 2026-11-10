'use client'

import { Avatar, Badge, BadgeWrap, Button, Icon } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { badgeApiSections } from '@/screens/pub/data/guide/badgeApiSections'

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        공통 <code>color_*</code> 색상으로 배지의 의미를 구분합니다.
      </>
    ),
    code: wrapPageExample(`<Badge color="default" label="Default" />
<Badge color="primary" label="Primary" />
<Badge color="success" label="Success" />
<Badge color="warning" label="Warning" />
<Badge color="danger" label="Danger" />
<Badge color="info" label="Info" />`, {
      name: 'BadgeExample',
      reactImports: [],
      compImports: ['Badge']
    }),
    preview: (
      <div className="demo-row icon_group">
        <Badge color="default" label="Default" />
        <Badge color="primary" label="Primary" />
        <Badge color="success" label="Success" />
        <Badge color="warning" label="Warning" />
        <Badge color="danger" label="Danger" />
        <Badge color="info" label="Info" />
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        small, medium, large 세 가지 크기를 제공합니다.
      </>
    ),
    code: wrapPageExample(`<Badge size="sm" label="Small" />
<Badge label="Medium" />
<Badge size="lg" label="Large" />`, {
      name: 'BadgeSizeExample',
      reactImports: [],
      compImports: ['Badge']
    }),
    preview: (
      <div className="demo-row icon_group">
        <Badge size="sm" label="Small" />
        <Badge label="Medium" />
        <Badge size="lg" label="Large" />
      </div>
    )
  },
  {
    title: '상태 점',
    description: (
      <>
        <code>dot</code>으로 텍스트 앞에 상태 점을 표시합니다.
      </>
    ),
    code: wrapPageExample(`<Badge dot color="primary" label="Online" />
<Badge dot color="success" label="Active" />
<Badge dot color="warning" label="Away" />
<Badge dot color="danger" label="Offline" />`, {
      name: 'BadgeDotExample',
      reactImports: [],
      compImports: ['Badge']
    }),
    preview: (
      <div className="demo-row icon_group">
        <Badge dot color="primary" label="Online" />
        <Badge dot color="success" label="Active" />
        <Badge dot color="warning" label="Away" />
        <Badge dot color="danger" label="Offline" />
      </div>
    )
  },
  {
    title: '카운트',
    description: (
      <>
        <code>count</code>로 숫자 폭과 정렬이 안정적인 카운트 배지를 만듭니다.
      </>
    ),
    code: wrapPageExample(`<Badge count color="danger" label="3" ariaLabel="알림 3건" />
<Badge count label="12" ariaLabel="알림 12건" />
<Badge count color="success" label="99+" ariaLabel="알림 99건 이상" />
<Badge count size="sm" color="danger" label="5" />
<Badge count size="lg" label="New" />`, {
      name: 'BadgeCountExample',
      reactImports: [],
      compImports: ['Badge']
    }),
    preview: (
      <div className="demo-row icon_group">
        <Badge count color="danger" label="3" ariaLabel="알림 3건" />
        <Badge count label="12" ariaLabel="알림 12건" />
        <Badge count color="success" label="99+" ariaLabel="알림 99건 이상" />
        <Badge count size="sm" color="danger" label="5" />
        <Badge count size="lg" label="New" />
      </div>
    )
  },
  {
    title: '겹침',
    description: (
      <>
        <code>BadgeWrap</code> 안에 기준 요소와 Badge를 배치합니다.
        점만 표시할 때도 <code>ariaLabel</code>로 의미를 지정합니다.
      </>
    ),
    code: wrapPageExample(`<BadgeWrap>
  <Button label="알림" />
  <Badge count color="danger" ariaLabel="읽지 않은 알림 5건" label="5" />
</BadgeWrap>
<BadgeWrap>
  <Button variant="ghost" iconOnly ariaLabel="메시지">
    <Icon name="mail" />
  </Button>
  <Badge count color="danger" ariaLabel="새 메시지 12건" label="12" />
</BadgeWrap>
<BadgeWrap>
  <Avatar color="primary" label="홍" aria-hidden="true" />
  <Badge dotOnly color="success" ariaLabel="온라인" />
</BadgeWrap>`, {
      name: 'BadgeWrapExample',
      reactImports: [],
      compImports: ['Avatar', 'Badge', 'BadgeWrap', 'Button', 'Icon']
    }),
    preview: (
      <div className="demo-row icon_group">
        <BadgeWrap>
          <Button label="알림" />
          <Badge count color="danger" ariaLabel="읽지 않은 알림 5건" label="5" />
        </BadgeWrap>
        <BadgeWrap>
          <Button variant="ghost" iconOnly ariaLabel="메시지">
            <Icon name="mail" />
          </Button>
          <Badge count color="danger" ariaLabel="새 메시지 12건" label="12" />
        </BadgeWrap>
        <BadgeWrap>
          <Avatar color="primary" label="홍" aria-hidden="true" />
          <Badge dotOnly color="success" ariaLabel="온라인" />
        </BadgeWrap>
      </div>
    )
  }
]

/**
 * Badge 가이드 화면.
 * docs와 동일한 기본·크기·상태 점·카운트·겹침 유형을 제공한다.
 */
export default function BadgeGuide () {
  return (
    <GuideLayout
      category="데이터 표시"
      title="Badge"
      description="상태·분류·개수를 짧게 표시합니다. 텍스트·상태 점·카운트·다른 요소 위 겹침을 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="BadgeExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={badgeApiSections} />
    </GuideLayout>
  )
}
