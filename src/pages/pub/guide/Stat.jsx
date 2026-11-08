'use client'

import { DemoBlock, GuideApiDocs, GuideLayout, Icon, Stat } from '@/comp'
import { statApiSections } from '@/pages/pub/data/guide/statApiSections'

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        <code>title</code> · <code>value</code> · <code>description</code>으로 지표를 표시합니다.
      </>
    ),
    code: `<Stat title="총 사용자" value="12,480" description="지난 30일 기준" />`,
    preview: <Stat title="총 사용자" value="12,480" description="지난 30일 기준" />
  },
  {
    title: '접두·접미',
    description: (
      <>
        <code>prefix</code> · <code>suffix</code>로 단위를 붙이고, description에 <code>trendColor</code>를 적용할 수 있습니다.
      </>
    ),
    code: `<div className="stat_group stat_group-3">
  <Stat title="총 매출" prefix="₩" value="4,280,000" description="+8.2%" trendColor="success" />
  <Stat title="전환율" value="3.6" suffix="%" description="-0.4%p" trendColor="danger" />
  <Stat title="평균 응답 시간" value="128" suffix="ms" />
</div>`,
    preview: (
      <div className="stat_group stat_group-3">
        <Stat title="총 매출" prefix="₩" value="4,280,000" description="+8.2%" trendColor="success" />
        <Stat title="전환율" value="3.6" suffix="%" description="-0.4%p" trendColor="danger" />
        <Stat title="평균 응답 시간" value="128" suffix="ms" />
      </div>
    )
  },
  {
    title: '추세',
    description: (
      <>
        <code>trend</code>는 헤더 우측(또는 description 자리)에 증감을 표시합니다. <code>trendIcon</code>으로 아이콘을 바꿀 수 있습니다.
      </>
    ),
    code: `<div className="stat_group stat_group-2">
  <Stat title="신규 가입" value="1,234" trend="+15.3%" trendColor="success" />
  <Stat
    title="이탈률"
    value="2.4%"
    trend="+0.3%p"
    trendColor="danger"
    trendIcon={<Icon name="warning" />}
  />
</div>`,
    preview: (
      <div className="stat_group stat_group-2">
        <Stat title="신규 가입" value="1,234" trend="+15.3%" trendColor="success" />
        <Stat
          title="이탈률"
          value="2.4%"
          trend="+0.3%p"
          trendColor="danger"
          trendIcon={<Icon name="warning" />}
        />
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 sm · md · lg입니다. 카드와 함께 쓰면 밀도 차이를 보기 쉽습니다.
      </>
    ),
    code: `<div className="stat_group stat_group-3">
  <Stat card size="sm" title="Small" value="1,024" />
  <Stat card title="Medium" value="8,192" />
  <Stat card size="lg" title="Large" value="64K" />
</div>`,
    preview: (
      <div className="stat_group stat_group-3">
        <Stat card size="sm" title="Small" value="1,024" />
        <Stat card title="Medium" value="8,192" />
        <Stat card size="lg" title="Large" value="64K" />
      </div>
    )
  },
  {
    title: '레이아웃',
    description: (
      <>
        <code>stat_horizontal</code> · <code>stat_inline</code> · <code>stat_row</code> 클래스로 배치를 바꿉니다.
      </>
    ),
    code: `<Stat card className="stat_horizontal" title="활성 세션" value="342" />
<Stat card className="stat_inline" title="CPU 사용률" value="68" suffix="%" />
<Stat card className="stat_row" shadow>
  <span className="stat_icon-wrap color_primary"><Icon name="user" /></span>
  <div className="stat_body">
    <span className="stat_label">신규 사용자</span>
    <span className="stat_value">1,284</span>
  </div>
</Stat>`,
    preview: (
      <>
        <Stat card className="stat_horizontal" title="활성 세션" value="342" />
        <Stat card className="stat_inline" title="CPU 사용률" value="68" suffix="%" />
        <Stat card className="stat_row" shadow>
          <span className="stat_icon-wrap color_primary"><Icon name="user" /></span>
          <div className="stat_body">
            <span className="stat_label">신규 사용자</span>
            <span className="stat_value">1,284</span>
          </div>
        </Stat>
      </>
    )
  },
  {
    title: '아이콘',
    description: (
      <>
        children으로 <code>stat_icon</code> · <code>stat_row</code> 커스텀 레이아웃을 구성합니다.
      </>
    ),
    code: `<div className="stat_group stat_group-2">
  <Stat card>
    <span className="stat_icon"><Icon name="star" /></span>
    <span className="stat_label">즐겨찾기</span>
    <span className="stat_value">128</span>
  </Stat>
  <Stat card className="stat_row">
    <span className="stat_icon-wrap color_success"><Icon name="check" /></span>
    <div className="stat_body">…</div>
  </Stat>
</div>`,
    preview: (
      <div className="stat_group stat_group-2">
        <Stat card>
          <span className="stat_icon"><Icon name="star" /></span>
          <span className="stat_label">즐겨찾기</span>
          <span className="stat_value">128</span>
        </Stat>
        <Stat card className="stat_row">
          <span className="stat_icon-wrap color_success"><Icon name="check" /></span>
          <div className="stat_body">
            <span className="stat_label">완료</span>
            <span className="stat_value">84</span>
          </div>
        </Stat>
      </div>
    )
  },
  {
    title: '카드 스킨',
    description: (
      <>
        <code>card</code> · <code>shadow</code> · <code>stat_borderless</code> · <code>stat_accent</code>을 조합합니다.
      </>
    ),
    code: `<div className="stat_group stat_group-4">
  <Stat card title="기본 카드" value="1,200" />
  <Stat card shadow title="Shadow" value="980" />
  <Stat card className="stat_borderless" title="Borderless" value="456" />
  <Stat card className="stat_accent color_primary" title="Accent" value="789" description="강조 지표" />
</div>`,
    preview: (
      <div className="stat_group stat_group-4">
        <Stat card title="기본 카드" value="1,200" />
        <Stat card shadow title="Shadow" value="980" />
        <Stat card className="stat_borderless" title="Borderless" value="456" />
        <Stat
          card
          className="stat_accent color_primary"
          title="Accent"
          value="789"
          description="강조 지표"
        />
      </div>
    )
  },
  {
    title: '그룹',
    description: (
      <>
        <code>stat_group</code> · <code>stat_group-n</code> · <code>stat_group-divider</code>로 지표 행을 묶습니다.
      </>
    ),
    code: `<div className="stat_group stat_group-4">
  <Stat card shadow title="총 매출" prefix="₩" value="4.2M" description="+8.2%" trendColor="success" />
  …
</div>
<div className="stat_group stat_group-4 stat_group-divider">
  <Stat title="방문" value="24.5K" />
  …
</div>`,
    preview: (
      <>
        <div className="stat_group stat_group-4">
          <Stat card shadow title="총 매출" prefix="₩" value="4.2M" description="+8.2%" trendColor="success" />
          <Stat card shadow title="신규 가입" value="1,234" description="+15.3%" trendColor="success" />
          <Stat card shadow title="이탈률" value="2.4" suffix="%" description="+0.3%p" trendColor="danger" />
          <Stat card shadow title="활성 사용자" value="8,901" description="변동 없음" trendColor="muted" />
        </div>
        <div className="stat_group stat_group-4 stat_group-divider">
          <Stat title="방문" value="24.5K" />
          <Stat title="페이지뷰" value="89.2K" />
          <Stat title="전환" value="1,842" />
          <Stat title="매출" value="₩12M" />
        </div>
      </>
    )
  }
]

/**
 * Stat 가이드 화면.
 * docs와 동일한 접두·추세·크기·레이아웃·스킨·그룹 예시와 API 문서를 모은다.
 */
export default function StatGuide () {
  return (
    <GuideLayout
      category="데이터 표시"
      title="Stat"
      description="title · value · prefix/suffix · trend · description으로 지표를 구성하고, size · card · shadow · stat_group을 조합합니다."
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

      <GuideApiDocs sections={statApiSections} />
    </GuideLayout>
  )
}
