'use client'

import { useState } from 'react'
import { Avatar, Button, Card, CardBody, CardDeck, CardFooter, CardHeader, Link, Stat, Tag, TagGroup } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { cardApiSections } from '@/screens/pub/data/guide/cardApiSections'

const MediaIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
)

const DocIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
)

const BoltIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

const ShieldIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const MoreIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)

/** href · onClick 으로 카드를 클릭 가능하게 만드는 예시 */
function ClickableCardDemo () {
  const [selected, setSelected] = useState('')

  return (
    <div className="demo-stack">
      <CardDeck columns={2}>
        <Card href="#card" hoverable>
          <CardBody>
            <h3 className="card_title">링크 카드</h3>
            <p className="card_subtitle">클릭하면 상세 페이지로 이동합니다.</p>
          </CardBody>
        </Card>
        <Card
          hoverable
          variant="shadow"
          onClick={() => setSelected('알림')}
        >
          <CardBody>
            <h3 className="card_title">클릭 카드</h3>
            <p className="card_subtitle">onClick으로 페이지 상태를 갱신합니다.</p>
          </CardBody>
        </Card>
      </CardDeck>
      {selected
        ? <p className="color_muted size_sm">선택: {selected}</p>
        : null}
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        <code>card_header</code> · <code>card_body</code> · <code>card_footer</code> 구조를 가집니다.
      </>
    ),
    code: wrapPageExample(`<Card style={{ maxWidth: 360 }}>
  <CardHeader title="카드 제목" subtitle="부제목 또는 메타 정보" />
  <CardBody>카드 본문 영역입니다.</CardBody>
  <CardFooter>
    <Button variant="filled" color="primary" size="sm" label="확인" />
    <Button variant="ghost" size="sm" label="취소" />
  </CardFooter>
</Card>`, {
  name: 'CardBasicExample',
  reactImports: [],
  compImports: ['Button', 'Card', 'CardBody', 'CardFooter', 'CardHeader']
}),
    preview: (
      <Card style={{ maxWidth: 360, width: '100%' }}>
        <CardHeader title="카드 제목" subtitle="부제목 또는 메타 정보" />
        <CardBody>카드 본문 영역입니다. 관련 콘텐츠, 설명, 데이터를 담을 수 있습니다.</CardBody>
        <CardFooter>
          <Button variant="filled" color="primary" size="sm" label="확인" />
          <Button variant="ghost" size="sm" label="취소" />
        </CardFooter>
      </Card>
    )
  },
  {
    title: '간단',
    description: 'header나 footer 없이 body만 사용하는 단순 카드입니다.',
    code: wrapPageExample(`<Card variant="shadow" size="compact">
  <CardBody>
    <p className="card_title">알림</p>
    새로운 메시지가 도착했습니다.
  </CardBody>
</Card>`, {
  name: 'CardExample2',
  reactImports: [],
  compImports: ['Card', 'CardBody']
}),
    preview: (
      <CardDeck columns={2}>
        <Card variant="shadow" size="compact">
          <CardBody>
            <p className="card_title">알림</p>
            새로운 메시지가 도착했습니다. 확인해 주세요.
          </CardBody>
        </Card>
        <Card size="compact">
          <CardBody>컴팩트 카드 — 좁은 패딩으로 밀도 높은 정보를 표시합니다.</CardBody>
        </Card>
      </CardDeck>
    )
  },
  {
    title: '스킨',
    description: '기본은 테두리·그림자가 적용됩니다. variant로 외형을 조절합니다.',
    code: wrapPageExample(`<Card><CardBody>기본 — 테두리 · 그림자</CardBody></Card>
<Card variant="shadow"><CardBody>Shadow</CardBody></Card>
<Card className="card_elevated"><CardBody>Elevated</CardBody></Card>
<Card variant="flat"><CardBody>Ghost</CardBody></Card>`, {
  name: 'CardExample3',
  reactImports: [],
  compImports: ['Card', 'CardBody']
}),
    preview: (
      <CardDeck columns={2}>
        <Card><CardBody>기본 — 테두리 · 그림자</CardBody></Card>
        <Card variant="shadow"><CardBody>Shadow — 그림자</CardBody></Card>
        <Card className="card_elevated"><CardBody>Elevated — 강한 그림자</CardBody></Card>
        <Card variant="flat"><CardBody>Ghost — 투명 배경</CardBody></Card>
      </CardDeck>
    )
  },
  {
    title: '크기',
    description: 'size로 패딩과 제목 크기를 조절합니다.',
    code: wrapPageExample(`<Card size="sm"><CardHeader title="Small" /><CardBody>…</CardBody></Card>
<Card><CardHeader title="Medium" /><CardBody>…</CardBody></Card>
<Card size="lg"><CardHeader title="Large" /><CardBody>…</CardBody></Card>`, {
  name: 'CardSizeExample',
  reactImports: [],
  compImports: ['Card', 'CardBody', 'CardHeader']
}),
    preview: (
      <CardDeck columns={2}>
        <Card size="sm">
          <CardHeader title="Small" />
          <CardBody>작은 카드 — 좁은 패딩과 작은 제목.</CardBody>
        </Card>
        <Card>
          <CardHeader title="Medium" />
          <CardBody>기본 크기 카드입니다.</CardBody>
        </Card>
        <Card size="lg">
          <CardHeader title="Large" />
          <CardBody>큰 카드 — 넓은 패딩과 큰 제목.</CardBody>
        </Card>
      </CardDeck>
    )
  },
  {
    title: '강조 테두리',
    description: (
      <>
        <code>card_accent</code>와 <code>color_*</code>로 왼쪽 강조선을 적용합니다.
      </>
    ),
    code: wrapPageExample(`<Card className="card_accent color_primary">
  <CardBody><p className="card_title">정보</p>…</CardBody>
</Card>`, {
  name: 'CardExample5',
  reactImports: [],
  compImports: ['Card', 'CardBody']
}),
    preview: (
      <CardDeck columns={2}>
        <Card className="card_accent color_primary">
          <CardBody>
            <p className="card_title">정보</p>
            시스템 업데이트가 예정되어 있습니다.
          </CardBody>
        </Card>
        <Card className="card_accent color_success">
          <CardBody>
            <p className="card_title">성공</p>
            작업이 정상적으로 완료되었습니다.
          </CardBody>
        </Card>
        <Card className="card_accent color_warning">
          <CardBody>
            <p className="card_title">주의</p>
            저장 공간이 부족합니다.
          </CardBody>
        </Card>
        <Card className="card_accent color_danger">
          <CardBody>
            <p className="card_title">오류</p>
            연결에 실패했습니다. 다시 시도해 주세요.
          </CardBody>
        </Card>
      </CardDeck>
    )
  },
  {
    title: '미디어',
    description: (
      <>
        <code>card_media</code>로 상단 이미지·썸네일 영역을 추가합니다.
      </>
    ),
    code: wrapPageExample(`<Card
  hoverable
  variant="shadow"
  media={<div className="card_media card_media-placeholder" role="img" aria-label="썸네일" />}
>
  <CardHeader title="프로젝트 Alpha" subtitle="업데이트 · 2일 전" />
  <CardBody>…</CardBody>
</Card>`, {
  name: 'CardExample6',
  reactImports: [],
  compImports: ['Card', 'CardBody', 'CardHeader']
}),
    preview: (
      <Card
        hoverable
        variant="shadow"
        style={{ maxWidth: 320, width: '100%' }}
        media={
          <div className="card_media card_media-placeholder" role="img" aria-label="프로젝트 썸네일">
            {MediaIcon}
          </div>
        }
      >
        <CardHeader>
          <div className="card_header-row">
            <h3 className="card_title">프로젝트 Alpha</h3>
            <Tag size="sm" color="primary" label="진행 중" />
          </div>
          <p className="card_subtitle">업데이트 · 2일 전</p>
        </CardHeader>
        <CardBody>디자인 시스템 구축 및 컴포넌트 라이브러리 개발 프로젝트입니다.</CardBody>
        <CardFooter between>
          <span className="color_muted size_sm">3명 참여</span>
          <Button variant="text" color="primary" size="sm" label="자세히" />
        </CardFooter>
      </Card>
    )
  },
  {
    title: '가로',
    description: (
      <>
        <code>card_horizontal</code>로 미디어와 콘텐츠를 나란히 배치합니다. <code>card_inner</code>로 본문을 감쌉니다.
      </>
    ),
    code: wrapPageExample(`<Card
  variant="shadow"
  className="card_horizontal"
  media={<div className="card_media card_media-placeholder" />}
>
  <div className="card_inner">
    <CardHeader title="가이드 문서" />
    <CardBody>…</CardBody>
    <CardFooter>…</CardFooter>
  </div>
</Card>`, {
  name: 'CardExample7',
  reactImports: [],
  compImports: ['Card', 'CardBody', 'CardFooter', 'CardHeader']
}),
    preview: (
      <Card
        variant="shadow"
        className="card_horizontal"
        style={{ maxWidth: 480, width: '100%' }}
        media={
          <div className="card_media card_media-placeholder" role="img" aria-label="문서 썸네일">
            {DocIcon}
          </div>
        }
      >
        <div className="card_inner">
          <CardHeader title="가이드 문서" />
          <CardBody>HTML 컴포넌트 사용법과 접근성 가이드를 확인하세요.</CardBody>
          <CardFooter>
            <Link href="#card" color="primary" size="sm">문서 보기</Link>
          </CardFooter>
        </div>
      </Card>
    )
  },
  {
    title: '아이콘 · 통계',
    description: (
      <>
        <code>card_icon</code> · Stat으로 기능 소개·지표 카드를 구성합니다.
      </>
    ),
    code: wrapPageExample(`<Card hoverable variant="shadow">
  <CardBody>
    <span className="card_icon color_primary" aria-hidden="true">…</span>
    <h3 className="card_title">빠른 성능</h3>
    <p className="card_subtitle">가벼운 번들, 빠른 로딩</p>
  </CardBody>
</Card>`, {
  name: 'CardIconExample',
  reactImports: [],
  compImports: ['Card', 'CardBody']
}),
    preview: (
      <CardDeck>
        <Card hoverable variant="shadow">
          <CardBody>
            <span className="card_icon color_primary" aria-hidden="true">{BoltIcon}</span>
            <h3 className="card_title">빠른 성능</h3>
            <p className="card_subtitle">가벼운 번들, 빠른 로딩</p>
          </CardBody>
        </Card>
        <Card hoverable variant="shadow">
          <CardBody>
            <span className="card_icon color_success" aria-hidden="true">{ShieldIcon}</span>
            <h3 className="card_title">접근성</h3>
            <p className="card_subtitle">WCAG 2.2 AA 기준</p>
          </CardBody>
        </Card>
        <Card variant="shadow">
          <CardBody>
            <Stat title="월간 활성 사용자" value="24.5K" description="+18.2%" />
          </CardBody>
        </Card>
      </CardDeck>
    )
  },
  {
    title: '프로필',
    description: (
      <>
        <code>card_avatar</code> · <code>card_extra</code>로 사용자 정보 카드를 만듭니다.
      </>
    ),
    code: wrapPageExample(`<Card variant="shadow">
  <CardHeader extra={<Button variant="ghost" size="sm" iconOnly ariaLabel="더 보기">…</Button>}>
    <div className="card_header-row">
      <Avatar color="primary" label="홍" />
      …
    </div>
  </CardHeader>
  …
</Card>`, {
  name: 'CardExample9',
  reactImports: [],
  compImports: ['Avatar', 'Button', 'Card', 'CardHeader']
}),
    preview: (
      <Card variant="shadow" style={{ maxWidth: 320, width: '100%' }}>
        <CardHeader
          extra={
            <Button variant="ghost" size="sm" iconOnly ariaLabel="더 보기">
              {MoreIcon}
            </Button>
          }
        >
          <div className="card_header-row">
            <Avatar color="primary" label="홍" aria-hidden="true" />
            <div>
              <h3 className="card_title">홍길동</h3>
              <p className="card_subtitle">프론트엔드 개발자</p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <TagGroup tight>
            <Tag size="sm" color="primary" label="React" />
            <Tag size="sm" color="primary" label="TypeScript" />
            <Tag size="sm" color="default" label="SCSS" />
          </TagGroup>
        </CardBody>
        <CardFooter between>
          <span className="color_muted size_sm">서울 · 온라인</span>
          <Button variant="outline" color="primary" size="sm" label="팔로우" />
        </CardFooter>
      </Card>
    )
  },
  {
    title: '클릭 가능',
    description: (
      <>
        <code>href</code> 또는 <code>onClick</code>으로 전체 카드를 클릭 가능하게 만듭니다. <code>hoverable</code>과 함께 사용합니다.
        <code>href</code>면 <code>a</code>, <code>onClick</code>만 있으면 <code>button</code>으로 렌더링됩니다.
      </>
    ),
    code: wrapPageExample(`const [selected, setSelected] = useState('')

<Card href="#card" hoverable>
  <CardBody>
    <h3 className="card_title">링크 카드</h3>
    <p className="card_subtitle">클릭하면 상세 페이지로 이동합니다.</p>
  </CardBody>
</Card>
<Card
  hoverable
  variant="shadow"
  onClick={() => setSelected('알림')}
>
  <CardBody>
    <h3 className="card_title">클릭 카드</h3>
    <p className="card_subtitle">onClick으로 페이지 상태를 갱신합니다.</p>
  </CardBody>
</Card>`, {
      name: 'CardExample',
      reactImports: ['useState'],
      compImports: ['Card', 'CardBody']
    }),
    preview: <ClickableCardDemo />
  },
  {
    title: '비활성',
    description: (
      <>
        <code>disabled</code>로 비활성 상태를 표시합니다.
      </>
    ),
    code: wrapPageExample(`<Card disabled style={{ maxWidth: 280 }}>
  <CardBody>
    <h3 className="card_title">비활성 카드</h3>
    <p className="card_subtitle">현재 이용할 수 없습니다.</p>
  </CardBody>
</Card>`, {
  name: 'CardDisabledExample',
  reactImports: [],
  compImports: ['Card', 'CardBody']
}),
    preview: (
      <Card disabled style={{ maxWidth: 280, width: '100%' }}>
        <CardBody>
          <h3 className="card_title">비활성 카드</h3>
          <p className="card_subtitle">현재 이용할 수 없습니다.</p>
        </CardBody>
      </Card>
    )
  },
  {
    title: '카드 그리드',
    description: (
      <>
        <code>CardDeck</code>으로 여러 카드를 그리드로 배치합니다. <code>columns</code>로 2·3열을 고정할 수 있습니다.
      </>
    ),
    code: wrapPageExample(`<CardDeck>
  <Card hoverable><CardHeader title="Feature A" /><CardBody>…</CardBody></Card>
  <Card hoverable><CardHeader title="Feature B" /><CardBody>…</CardBody></Card>
  <Card hoverable><CardHeader title="Feature C" /><CardBody>…</CardBody></Card>
</CardDeck>`, {
  name: 'CardExample11',
  reactImports: [],
  compImports: ['Card', 'CardBody', 'CardDeck', 'CardHeader']
}),
    preview: (
      <CardDeck>
        <Card hoverable>
          <CardHeader title="Feature A" />
          <CardBody>빠른 성능과 가벼운 번들 크기.</CardBody>
        </Card>
        <Card hoverable>
          <CardHeader title="Feature B" />
          <CardBody>접근성을 고려한 마크업 구조.</CardBody>
        </Card>
        <Card hoverable>
          <CardHeader title="Feature C" />
          <CardBody>Pure SCSS로 커스터마이즈 가능.</CardBody>
        </Card>
      </CardDeck>
    )
  }
]

/**
 * Card 가이드 화면.
 * docs와 동일한 기본·스킨·미디어·프로필·그리드 유형을 제공한다.
 */
export default function CardGuide () {
  return (
    <GuideLayout
      category="데이터 표시"
      title="Card"
      description="콘텐츠를 그룹화하여 표시합니다. Header·Body·Footer·Deck과 스킨·크기·미디어를 조합합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="CardExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={cardApiSections} />
    </GuideLayout>
  )
}
