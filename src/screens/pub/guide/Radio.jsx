'use client'

import { useState } from 'react'
import { Card, CardBody, CardDeck, CardHeader, Radio } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { radioApiSections } from '@/screens/pub/data/guide/radioApiSections'

/** 카드 전체 클릭 → 내부 radio input */
function onClickableCardClick (event) {
  if (event.target.closest('.radio_control')) return
  const input = event.currentTarget.querySelector('.radio_input')
  if (input instanceof HTMLInputElement && !input.disabled) input.click()
}

/** checked · onChange 로 부모가 선택 상태를 관리하는 예시 */
function ControlledDemo () {
  const [pay, setPay] = useState('card')

  return (
    <div className="form_field">
      <span className="form_field-label" id="radio-pay-label">결제 수단</span>
      <fieldset className="radio_group" aria-labelledby="radio-pay-label">
        <Radio
          name="radio-pay"
          value="card"
          checked={pay === 'card'}
          onChange={(e) => setPay(e.target.value)}
        >
          <span className="radio_content">
            <span className="radio_label">신용카드</span>
            <span className="radio_hint">Visa · Mastercard · 국내 카드</span>
          </span>
        </Radio>
        <Radio
          name="radio-pay"
          value="bank"
          checked={pay === 'bank'}
          onChange={(e) => setPay(e.target.value)}
        >
          <span className="radio_content">
            <span className="radio_label">계좌이체</span>
            <span className="radio_hint">등록된 계좌로 결제합니다.</span>
          </span>
        </Radio>
      </fieldset>
      <p className="form_field-hint">
        선택: <code>{pay}</code>
      </p>
    </div>
  )
}

function PlanCard ({
  id,
  titleId,
  descId,
  title,
  subtitle,
  desc,
  value,
  checked,
  disabled,
  colorClass,
  name = 'radio-plan',
  clickable
}) {
  const card = (
    <Card compact className="card_shadow">
      <CardHeader
        extra={(
          <Radio
            id={id}
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            aria-labelledby={`${titleId} ${descId}`}
          />
        )}
      >
        <h3 className="card_title" id={titleId}>{title}</h3>
        <p className="card_subtitle">{subtitle}</p>
      </CardHeader>
      <CardBody id={descId}>{desc}</CardBody>
    </Card>
  )

  const className = ['radio_card', colorClass, clickable && 'radio_card-clickable']
    .filter(Boolean)
    .join(' ')

  if (clickable) {
    return (
      <div className={className} role="presentation" data-ripple="" onClick={onClickableCardClick}>
        {card}
      </div>
    )
  }

  return <div className={className}>{card}</div>
}

const SECTIONS = [
  {
    title: '유형',
    description: (
      <>
        기본은 wrapping <code>label.radio</code> 안에 <code>span.radio_control</code> + <code>span.radio_label</code> 순서입니다.
        보이는 레이블이 없으면 <code>label.radio_control</code>로 암묵 연결합니다.
      </>
    ),
    code: wrapPageExample(`<Radio name="radio-type-basic" checked label="기본 — radio" />
<Radio name="radio-type-label-end" labelEnd label="레이블 뒤 — radio_label-end" />
<fieldset className="radio_group radio_group_horizontal">
  <Radio button name="radio-type-btn" checked value="a" label="버튼형" />
  …
</fieldset>`, {
  name: 'RadioExample1',
  reactImports: [],
  compImports: ['Radio']
}),
    preview: (
      <div className="demo-stack">
        <Radio name="radio-type-basic" checked label="기본 — radio" />
        <Radio name="radio-type-label-end" labelEnd label="레이블 뒤 — radio_label-end" />
        <fieldset className="radio_group radio_group_horizontal">
          <Radio button name="radio-type-btn" checked value="a" label="버튼형" />
          <Radio button name="radio-type-btn" value="b" label="UI" />
          <Radio button name="radio-type-btn" value="c" label="UX" />
        </fieldset>
      </div>
    )
  },
  {
    title: '레이블 뒤',
    description: (
      <>
        <code>radio_label-end</code>는 레이블 → 라디오 순입니다.
        전체 너비는 <code>radio_block</code> · <code>radio_group_block</code>을 씁니다.
      </>
    ),
    code: wrapPageExample(`<Radio name="…" labelEnd checked label="신용카드" />
<Radio name="…" labelEnd>
  <span className="radio_content">
    <span className="radio_label">계좌이체</span>
    <span className="radio_hint">등록된 계좌로 결제합니다.</span>
  </span>
</Radio>`, {
  name: 'RadioExample2',
  reactImports: [],
  compImports: ['Radio']
}),
    preview: (
      <div className="demo-stack">
        <Radio name="radio-label-end-pay" labelEnd checked label="신용카드" />
        <Radio name="radio-label-end-pay2" labelEnd>
          <span className="radio_content">
            <span className="radio_label">계좌이체</span>
            <span className="radio_hint">등록된 계좌로 결제합니다.</span>
          </span>
        </Radio>
        <fieldset
          className="radio_group radio_group_block"
          style={{ maxWidth: 360, width: '100%' }}
        >
          <legend className="radio_group-legend">배송 방법 — radio_group_block</legend>
          <Radio name="radio-label-end-ship" labelEnd checked value="standard" label="일반 배송" />
          <Radio name="radio-label-end-ship" labelEnd value="express" label="빠른 배송" />
        </fieldset>
        <Radio className="radio_sm" name="radio-label-end-size" labelEnd checked label="Small — radio_sm" />
        <Radio className="radio_lg" name="radio-label-end-size2" labelEnd checked label="Large — radio_lg" />
      </div>
    )
  },
  {
    title: '기본',
    description: (
      <>
        <code>checked !== undefined</code>이면 제어 모드입니다(<code>onChange</code> 유무와 무관).
        부모 <code>useState</code>로 선택 값을 관리하고, 레이블·보조 설명(<code>radio_hint</code>)을 함께 쓸 수 있습니다.
      </>
    ),
    code: wrapPageExample(`const [pay, setPay] = useState('card')

<Radio
  name="radio-pay"
  value="card"
  checked={pay === 'card'}
  onChange={(e) => setPay(e.target.value)}
  label="신용카드"
/>
<Radio
  name="radio-pay"
  value="bank"
  checked={pay === 'bank'}
  onChange={(e) => setPay(e.target.value)}
  label="계좌이체"
/>`, {
      name: 'RadioExample',
      reactImports: ['useState'],
      compImports: ['Radio']
    }),
    preview: <ControlledDemo />
  },
  {
    title: '단독 사용',
    description: (
      <>
        레이블 없이 라디오만 사용할 수 있습니다. <code>ariaLabel</code>로 접근 가능한 이름을 지정합니다.
      </>
    ),
    code: wrapPageExample(`<div className="radio_group radio_group_horizontal">
  <Radio name="radio-standalone" ariaLabel="항목 선택" />
  <Radio name="radio-standalone" checked ariaLabel="선택됨" />
  <Radio name="radio-standalone-disabled" disabled ariaLabel="비활성" />
</div>`, {
  name: 'RadioExample3',
  reactImports: [],
  compImports: ['Radio']
}),
    preview: (
      <div className="radio_group radio_group_horizontal">
        <Radio name="radio-standalone" ariaLabel="항목 선택" />
        <Radio name="radio-standalone" checked ariaLabel="선택됨" />
        <Radio name="radio-standalone-disabled" disabled ariaLabel="비활성" />
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>radio_sm</code> · 기본 · <code>radio_lg</code>로 박스·텍스트 크기를 조절합니다.
      </>
    ),
    code: wrapPageExample(`<div className="radio_group radio_group_horizontal">
  <Radio className="radio_sm" name="radio-size" checked label="Small — radio_sm" />
  <Radio name="radio-size" label="Medium — 기본" />
  <Radio className="radio_lg" name="radio-size" label="Large — radio_lg" />
</div>`, {
  name: 'RadioSizeExample',
  reactImports: [],
  compImports: ['Radio']
}),
    preview: (
      <div className="radio_group radio_group_horizontal">
        <Radio className="radio_sm" name="radio-size" checked label="Small — radio_sm" />
        <Radio name="radio-size" label="Medium — 기본" />
        <Radio className="radio_lg" name="radio-size" label="Large — radio_lg" />
      </div>
    )
  },
  {
    title: '너비',
    description: (
      <>
        기본은 인라인(콘텐츠) 너비입니다. <code>radio_block</code> · <code>radio_group_block</code>으로 전체 너비를 사용합니다.
      </>
    ),
    code: wrapPageExample(`<Radio name="…" checked label="기본 — 인라인 너비" />
<Radio name="…" className="radio_block" checked label="radio_block — 전체 너비" />
<fieldset className="radio_group radio_group_block">…</fieldset>`, {
  name: 'RadioExample5',
  reactImports: [],
  compImports: ['Radio']
}),
    preview: (
      <div className="demo-stack">
        <Radio name="radio-width-inline" checked label="기본 — 인라인 너비" />
        <Radio name="radio-width-block" className="radio_block" checked label="radio_block — 전체 너비" />
        <fieldset
          className="radio_group radio_group_block"
          style={{ maxWidth: 360, width: '100%' }}
        >
          <legend className="radio_group-legend">radio_group_block</legend>
          <Radio name="radio-width-g1" checked label="항목 1" />
          <Radio name="radio-width-g1" label="항목 2" />
        </fieldset>
      </div>
    )
  },
  {
    title: '색상',
    description: (
      <>
        <code>color_primary</code> · <code>color_success</code> · <code>color_danger</code> · <code>color_warning</code>으로 선택 색을 지정합니다.
      </>
    ),
    code: wrapPageExample(`<Radio className="color_primary" name="…" checked label="Primary" />
…`, {
  name: 'RadioColorExample',
  reactImports: [],
  compImports: ['Radio']
}),
    preview: (
      <div className="demo-stack">
        <Radio className="color_primary" name="radio-color-primary" checked label="Primary" />
        <Radio className="color_success" name="radio-color-success" checked label="Success" />
        <Radio className="color_danger" name="radio-color-danger" checked label="Danger" />
        <Radio className="color_warning" name="radio-color-warning" checked label="Warning" />
      </div>
    )
  },
  {
    title: '상태',
    description: <>선택·미선택·비활성 상태를 지원합니다.</>,
    code: wrapPageExample(`<Radio name="radio-state" label="미선택" />
<Radio name="radio-state" checked label="선택됨" />
<Radio name="radio-state-disabled" disabled label="비활성" />`, {
  name: 'RadioStateExample',
  reactImports: [],
  compImports: ['Radio']
}),
    preview: (
      <div className="demo-stack">
        <Radio name="radio-state" label="미선택" />
        <Radio name="radio-state" checked label="선택됨" />
        <Radio name="radio-state-disabled" disabled label="비활성" />
        <Radio name="radio-state-disabled" checked disabled label="선택됨 (비활성)" />
      </div>
    )
  },
  {
    title: '그룹',
    description: (
      <>
        <code>radio_group</code>으로 묶습니다. <code>radio_group_horizontal</code> · <code>radio_group_compact</code> 변형이 있습니다.
      </>
    ),
    code: wrapPageExample(`<fieldset className="radio_group">
  <legend className="radio_group-legend">배송 방법 (세로)</legend>
  <Radio name="radio-group-ship" checked value="standard" label="일반 배송" />
  …
</fieldset>`, {
  name: 'RadioGroupExample',
  reactImports: [],
  compImports: ['Radio']
}),
    preview: (
      <div className="demo-stack">
        <fieldset className="radio_group">
          <legend className="radio_group-legend">배송 방법 (세로)</legend>
          <Radio name="radio-group-ship" checked value="standard" label="일반 배송" />
          <Radio name="radio-group-ship" value="express" label="빠른 배송" />
          <Radio name="radio-group-ship" value="pickup" label="매장 픽업" />
        </fieldset>
        <fieldset className="radio_group radio_group_horizontal">
          <legend className="radio_group-legend">크기 (가로)</legend>
          <Radio button name="radio-group-size" checked value="s" label="S" />
          <Radio button name="radio-group-size" value="m" label="M" />
          <Radio button name="radio-group-size" value="l" label="L" />
        </fieldset>
      </div>
    )
  },
  {
    title: '버튼형',
    description: (
      <>
        <code>button</code>은 태그·필터 UI에 적합합니다. 크기·색상 변형과 함께 사용할 수 있습니다.
      </>
    ),
    code: wrapPageExample(`<fieldset className="radio_group radio_group_horizontal">
  <Radio button name="radio-btn-filter" checked value="all" label="전체" />
  …
</fieldset>`, {
  name: 'RadioExample9',
  reactImports: [],
  compImports: ['Radio']
}),
    preview: (
      <div className="demo-stack">
        <fieldset className="radio_group radio_group_horizontal">
          <Radio button name="radio-btn-filter" checked value="all" label="전체" />
          <Radio button name="radio-btn-filter" value="active" label="진행 중" />
          <Radio button name="radio-btn-filter" value="done" label="완료" />
          <Radio button name="radio-btn-filter" disabled value="hold" label="보류 (비활성)" />
        </fieldset>
        <fieldset className="radio_group radio_group_horizontal">
          <Radio
            button
            className="radio_sm color_success"
            name="radio-btn-size-sm"
            checked
            value="sm"
            label="Small"
          />
          <Radio
            button
            className="color_success"
            name="radio-btn-size-md"
            checked
            value="md"
            label="Medium"
          />
          <Radio
            button
            className="radio_lg color_success"
            name="radio-btn-size-lg"
            checked
            value="lg"
            label="Large"
          />
        </fieldset>
      </div>
    )
  },
  {
    title: '카드형',
    description: (
      <>
        <code>div.radio_card</code> + card 조합입니다. 카드 전체 클릭은 <code>radio_card-clickable</code>을 씁니다.
      </>
    ),
    code: wrapPageExample(`<div className="radio_card">
  <Card compact className="card_shadow">
    <CardHeader extra={<Radio id="…" name="…" value="basic" checked aria-labelledby="…" />}>
      <h3 className="card_title" id="…">Basic</h3>
      <p className="card_subtitle">월 9,000원</p>
    </CardHeader>
    <CardBody id="…">개인 프로젝트에 적합합니다.</CardBody>
  </Card>
</div>`, {
  name: 'RadioExample10',
  reactImports: [],
  compImports: ['Card', 'CardBody', 'CardHeader', 'Radio']
}),
    preview: (
      <div className="demo-stack">
        <fieldset className="radio_group">
          <legend className="radio_group-legend">요금제 선택</legend>
          <CardDeck columns={2}>
            <PlanCard
              id="radio-plan-basic"
              titleId="radio-plan-basic-title"
              descId="radio-plan-basic-desc"
              title="Basic"
              subtitle="월 9,000원"
              desc="개인 프로젝트에 적합합니다."
              value="basic"
              checked
            />
            <PlanCard
              id="radio-plan-pro"
              titleId="radio-plan-pro-title"
              descId="radio-plan-pro-desc"
              title="Pro"
              subtitle="월 29,000원"
              desc="팀 협업과 고급 기능을 제공합니다."
              value="pro"
              colorClass="color_primary"
            />
            <PlanCard
              id="radio-plan-enterprise"
              titleId="radio-plan-enterprise-title"
              descId="radio-plan-enterprise-desc"
              title="Enterprise"
              subtitle="별도 문의"
              desc="대규모 조직용 맞춤 플랜입니다. (비활성)"
              value="enterprise"
              disabled
            />
          </CardDeck>
        </fieldset>
        <fieldset className="radio_group">
          <legend className="radio_group-legend">기본 권한 (가로)</legend>
          <CardDeck columns={3}>
            <div className="radio_card color_success">
              <Card compact>
                <CardHeader
                  extra={(
                    <Radio
                      id="radio-role-read"
                      name="radio-role"
                      value="read"
                      checked
                      aria-labelledby="radio-role-read-title radio-role-read-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="radio-role-read-title">읽기</h3>
                </CardHeader>
                <CardBody id="radio-role-read-desc">조회 권한</CardBody>
              </Card>
            </div>
            <div className="radio_card color_success">
              <Card compact>
                <CardHeader
                  extra={(
                    <Radio
                      id="radio-role-write"
                      name="radio-role"
                      value="write"
                      aria-labelledby="radio-role-write-title radio-role-write-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="radio-role-write-title">쓰기</h3>
                </CardHeader>
                <CardBody id="radio-role-write-desc">수정 권한</CardBody>
              </Card>
            </div>
            <div className="radio_card">
              <Card compact>
                <CardHeader
                  extra={(
                    <Radio
                      id="radio-role-admin"
                      name="radio-role"
                      value="admin"
                      aria-labelledby="radio-role-admin-title radio-role-admin-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="radio-role-admin-title">관리</h3>
                </CardHeader>
                <CardBody id="radio-role-admin-desc">전체 관리 권한</CardBody>
              </Card>
            </div>
          </CardDeck>
        </fieldset>
        <fieldset className="radio_group">
          <legend className="radio_group-legend">
            요금제 선택 — 카드 전체 클릭 (radio_card-clickable)
          </legend>
          <CardDeck columns={2}>
            <PlanCard
              id="radio-plan-full-basic"
              titleId="radio-plan-full-basic-title"
              descId="radio-plan-full-basic-desc"
              title="Basic"
              subtitle="월 9,000원"
              desc="카드 어디를 눌러도 선택됩니다."
              value="basic"
              checked
              name="radio-plan-clickable"
              clickable
            />
            <PlanCard
              id="radio-plan-full-pro"
              titleId="radio-plan-full-pro-title"
              descId="radio-plan-full-pro-desc"
              title="Pro"
              subtitle="월 29,000원"
              desc="제목·설명·여백을 포함한 전체 영역이 클릭 대상입니다."
              value="pro"
              colorClass="color_primary"
              name="radio-plan-clickable"
              clickable
            />
            <PlanCard
              id="radio-plan-full-enterprise"
              titleId="radio-plan-full-enterprise-title"
              descId="radio-plan-full-enterprise-desc"
              title="Enterprise"
              subtitle="별도 문의"
              desc="대규모 조직용 맞춤 플랜입니다. (비활성)"
              value="enterprise"
              disabled
              name="radio-plan-clickable"
              clickable
            />
          </CardDeck>
        </fieldset>
      </div>
    )
  },
  {
    title: '폼 레이아웃',
    description: (
      <>
        <code>form_vertical</code> · <code>form_horizontal</code>과 함께 사용합니다.
      </>
    ),
    code: wrapPageExample(`<form className="form form_vertical form_fit">
  <div className="form_field">
    <span className="form_field-label" id="…">수신 채널</span>
    <fieldset className="radio_group" aria-labelledby="…">
      <Radio name="radio-form-channel" checked value="email" label="이메일" />
      <Radio name="radio-form-channel" value="sms" label="SMS" />
    </fieldset>
  </div>
</form>`, {
  name: 'RadioFormExample',
  reactImports: [],
  compImports: ['Radio']
}),
    preview: (
      <div className="demo-stack">
        <form className="form form_vertical form_fit" onSubmit={(event) => event.preventDefault()}>
          <div className="form_field">
            <span className="form_field-label" id="radio-form-vertical-label">
              수신 채널
            </span>
            <fieldset className="radio_group" aria-labelledby="radio-form-vertical-label">
              <Radio name="radio-form-channel" checked value="email" label="이메일" />
              <Radio name="radio-form-channel" value="sms" label="SMS" />
            </fieldset>
          </div>
        </form>
        <form className="form form_horizontal form_fit" onSubmit={(event) => event.preventDefault()}>
          <div className="form_field">
            <span className="form_field-label" id="radio-form-horizontal-label">
              역할
            </span>
            <fieldset
              className="radio_group radio_group_horizontal"
              aria-labelledby="radio-form-horizontal-label"
            >
              <Radio button name="radio-form-role" checked value="viewer" label="뷰어" />
              <Radio button name="radio-form-role" value="editor" label="편집자" />
            </fieldset>
          </div>
        </form>
      </div>
    )
  }
]

/**
 * Radio 가이드 화면.
 * docs와 동일한 유형·상태·그룹·카드형 예시와 API 문서를 모은다.
 */
export default function RadioGuide () {
  return (
    <GuideLayout
      category="폼"
      title="Radio"
      description="단일 선택이 가능한 라디오. checked · onChange로 제어하고 label · button · labelEnd · 카드형을 조합합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="RadioExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={radioApiSections} />
    </GuideLayout>
  )
}
