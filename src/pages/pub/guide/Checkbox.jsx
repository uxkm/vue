'use client'

import {
  Card,
  CardBody,
  CardDeck,
  CardHeader,
  Checkbox,
  DemoBlock,
  GuideApiDocs,
  GuideLayout
} from '@/comp'
import { checkboxApiSections } from '@/pages/pub/data/guide/checkboxApiSections'

/** 카드 전체 클릭 → 내부 checkbox input */
function onClickableCardClick (event) {
  if (event.target.closest('.checkbox_control')) return
  const input = event.currentTarget.querySelector('.checkbox_input')
  if (input instanceof HTMLInputElement && !input.disabled) input.click()
}

const SECTIONS = [
  {
    title: '유형',
    description: (
      <>
        기본은 <code>span.checkbox_control</code> + <code>label.checkbox_label</code> 순서입니다.
        보이는 레이블이 없으면 <code>label.checkbox_control</code>로 암묵 연결합니다.
      </>
    ),
    code: `<Checkbox checked label="기본 — checkbox" />
<Checkbox labelEnd label="레이블 뒤 — checkbox_label-end" />
<fieldset className="checkbox_group checkbox_group_horizontal">
  <Checkbox button checked label="버튼형" />
  …
</fieldset>
<div className="checkbox_card">
  <Card compact>…</Card>
</div>`,
    preview: (
      <div className="demo-stack">
        <Checkbox checked label="기본 — checkbox" />
        <Checkbox labelEnd label="레이블 뒤 — checkbox_label-end" />
        <fieldset className="checkbox_group checkbox_group_horizontal">
          <Checkbox button checked label="버튼형" />
          <Checkbox button label="UI" />
          <Checkbox button label="UX" />
        </fieldset>
        <div className="checkbox_card" style={{ maxWidth: 360 }}>
          <Card compact>
            <CardHeader
              extra={(
                <Checkbox
                  id="checkbox-type-card"
                  checked
                  aria-labelledby="checkbox-type-card-title checkbox-type-card-desc"
                />
              )}
            >
              <h3 className="card_title" id="checkbox-type-card-title">
                카드형 — checkbox_card
              </h3>
            </CardHeader>
            <CardBody id="checkbox-type-card-desc">
              card 컴포넌트와 조합해 제목·설명을 표시합니다.
            </CardBody>
          </Card>
        </div>
      </div>
    )
  },
  {
    title: '레이블 뒤',
    description: (
      <>
        <code>checkbox_label-end</code>는 레이블 → 체크박스 순입니다.
        전체 너비는 <code>checkbox_block</code> · <code>checkbox_group_block</code>을 씁니다.
      </>
    ),
    code: `<Checkbox labelEnd checked label="푸시 알림 받기" />
<Checkbox labelEnd>
  <span className="checkbox_content">
    <span className="checkbox_label">마케팅 정보 수신</span>
    <span className="checkbox_hint">이벤트·할인 소식을 이메일로 받습니다.</span>
  </span>
</Checkbox>`,
    preview: (
      <div className="demo-stack">
        <Checkbox labelEnd checked label="푸시 알림 받기" />
        <Checkbox labelEnd>
          <span className="checkbox_content">
            <span className="checkbox_label">마케팅 정보 수신</span>
            <span className="checkbox_hint">이벤트·할인 소식을 이메일로 받습니다.</span>
          </span>
        </Checkbox>
        <fieldset
          className="checkbox_group checkbox_group_block"
          style={{ maxWidth: 360, width: '100%' }}
        >
          <legend className="checkbox_group-legend">알림 설정 — checkbox_group_block</legend>
          <Checkbox labelEnd checked label="이메일 알림" />
          <Checkbox labelEnd checked label="푸시 알림" />
          <Checkbox labelEnd label="SMS 알림" />
        </fieldset>
        <Checkbox className="checkbox_sm" labelEnd checked label="Small — checkbox_sm" />
        <Checkbox className="checkbox_lg" labelEnd checked label="Large — checkbox_lg" />
      </div>
    )
  },
  {
    title: '기본',
    description: (
      <>
        레이블과 보조 설명(<code>checkbox_hint</code>)을 함께 사용할 수 있습니다.
      </>
    ),
    code: `<div className="form_field">
  <span className="form_field-label" id="checkbox-notify-label">알림 설정</span>
  <fieldset className="checkbox_group" aria-labelledby="checkbox-notify-label">
    <Checkbox checked>
      <span className="checkbox_content">
        <span className="checkbox_label">이메일 알림</span>
        <span className="checkbox_hint">중요 공지와 계정 관련 메일을 받습니다.</span>
      </span>
    </Checkbox>
    …
  </fieldset>
</div>`,
    preview: (
      <div className="form_field">
        <span className="form_field-label" id="checkbox-notify-label">알림 설정</span>
        <fieldset className="checkbox_group" aria-labelledby="checkbox-notify-label">
          <Checkbox checked>
            <span className="checkbox_content">
              <span className="checkbox_label">이메일 알림</span>
              <span className="checkbox_hint">중요 공지와 계정 관련 메일을 받습니다.</span>
            </span>
          </Checkbox>
          <Checkbox>
            <span className="checkbox_content">
              <span className="checkbox_label">푸시 알림</span>
              <span className="checkbox_hint">모바일·브라우저 푸시를 허용합니다.</span>
            </span>
          </Checkbox>
        </fieldset>
      </div>
    )
  },
  {
    title: '단독 사용',
    description: (
      <>
        레이블 없이 체크박스만 사용할 수 있습니다. <code>ariaLabel</code>로 접근 가능한 이름을 지정합니다.
      </>
    ),
    code: `<Checkbox ariaLabel="항목 선택" />
<Checkbox checked ariaLabel="선택됨" />
<Checkbox disabled ariaLabel="비활성" />`,
    preview: (
      <div className="demo-stack">
        <Checkbox ariaLabel="항목 선택" />
        <Checkbox checked ariaLabel="선택됨" />
        <Checkbox disabled ariaLabel="비활성" />
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>checkbox_sm</code> · 기본 · <code>checkbox_lg</code>로 박스·텍스트 크기를 조절합니다.
      </>
    ),
    code: `<Checkbox className="checkbox_sm" checked label="Small — checkbox_sm" />
<Checkbox checked label="Medium — 기본" />
<Checkbox className="checkbox_lg" checked label="Large — checkbox_lg" />`,
    preview: (
      <div className="demo-stack">
        <Checkbox className="checkbox_sm" checked label="Small — checkbox_sm" />
        <Checkbox checked label="Medium — 기본" />
        <Checkbox className="checkbox_lg" checked label="Large — checkbox_lg" />
      </div>
    )
  },
  {
    title: '너비',
    description: (
      <>
        기본은 인라인(콘텐츠) 너비입니다. <code>checkbox_block</code> · <code>checkbox_group_block</code>으로 전체 너비를 사용합니다.
      </>
    ),
    code: `<Checkbox checked label="기본 — 인라인 너비" />
<Checkbox className="checkbox_block" checked label="checkbox_block — 전체 너비" />
<fieldset className="checkbox_group checkbox_group_block">…</fieldset>`,
    preview: (
      <div className="demo-stack">
        <Checkbox checked label="기본 — 인라인 너비" />
        <Checkbox className="checkbox_block" checked label="checkbox_block — 전체 너비" />
        <fieldset
          className="checkbox_group checkbox_group_block"
          style={{ maxWidth: 360, width: '100%' }}
        >
          <legend className="checkbox_group-legend">checkbox_group_block</legend>
          <Checkbox checked label="항목 1" />
          <Checkbox label="항목 2" />
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
    code: `<Checkbox className="color_primary" checked label="Primary" />
<Checkbox className="color_success" checked label="Success" />
…`,
    preview: (
      <div className="demo-stack">
        <Checkbox className="color_primary" checked label="Primary" />
        <Checkbox className="color_success" checked label="Success" />
        <Checkbox className="color_danger" checked label="Danger" />
        <Checkbox className="color_warning" checked label="Warning" />
      </div>
    )
  },
  {
    title: '상태',
    description: (
      <>
        선택·미선택·불확정(<code>indeterminate</code>)·비활성 상태를 지원합니다.
      </>
    ),
    code: `<Checkbox label="미선택" />
<Checkbox checked label="선택됨" />
<Checkbox checked indeterminate label="불확정" />
<Checkbox disabled label="비활성" />`,
    preview: (
      <div className="demo-stack">
        <Checkbox label="미선택" />
        <Checkbox checked label="선택됨" />
        <Checkbox checked indeterminate label="불확정" />
        <Checkbox disabled label="비활성" />
        <Checkbox checked disabled label="선택됨 (비활성)" />
      </div>
    )
  },
  {
    title: '그룹',
    description: (
      <>
        <code>checkbox_group</code>으로 묶습니다. <code>checkbox_group_horizontal</code> · <code>checkbox_group_compact</code> 변형이 있습니다.
      </>
    ),
    code: `<fieldset className="checkbox_group">
  <legend className="checkbox_group-legend">관심 분야 (세로)</legend>
  <Checkbox checked label="디자인" />
  …
</fieldset>
<fieldset className="checkbox_group checkbox_group_horizontal">…</fieldset>`,
    preview: (
      <div className="demo-stack">
        <fieldset className="checkbox_group">
          <legend className="checkbox_group-legend">관심 분야 (세로)</legend>
          <Checkbox checked label="디자인" />
          <Checkbox label="개발" />
          <Checkbox label="기획" />
        </fieldset>
        <fieldset className="checkbox_group checkbox_group_horizontal">
          <legend className="checkbox_group-legend">언어 (가로)</legend>
          <Checkbox button checked label="한국어" />
          <Checkbox button checked label="English" />
          <Checkbox button label="日本語" />
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
    code: `<fieldset className="checkbox_group checkbox_group_horizontal">
  <Checkbox button checked label="전체" />
  <Checkbox button label="진행 중" />
  …
</fieldset>`,
    preview: (
      <div className="demo-stack">
        <fieldset className="checkbox_group checkbox_group_horizontal">
          <Checkbox button checked label="전체" />
          <Checkbox button label="진행 중" />
          <Checkbox button label="완료" />
          <Checkbox button disabled label="보류 (비활성)" />
        </fieldset>
        <fieldset className="checkbox_group checkbox_group_horizontal">
          <Checkbox button className="checkbox_sm color_success" checked label="Small" />
          <Checkbox button className="color_success" checked label="Medium" />
          <Checkbox button className="checkbox_lg color_success" checked label="Large" />
        </fieldset>
      </div>
    )
  },
  {
    title: '카드형',
    description: (
      <>
        <code>div.checkbox_card</code> + card 조합입니다. 카드 전체 클릭은 <code>checkbox_card-clickable</code>을 씁니다.
      </>
    ),
    code: `<div className="checkbox_card">
  <Card compact className="card_shadow">
    <CardHeader extra={<Checkbox id="…" checked aria-labelledby="…" />}>
      <h3 className="card_title" id="…">Basic</h3>
      <p className="card_subtitle">월 9,000원</p>
    </CardHeader>
    <CardBody id="…">개인 프로젝트에 적합합니다.</CardBody>
  </Card>
</div>`,
    preview: (
      <div className="demo-stack">
        <fieldset className="checkbox_group">
          <legend className="checkbox_group-legend">요금제 선택 (다중)</legend>
          <CardDeck columns={2}>
            <div className="checkbox_card">
              <Card compact className="card_shadow">
                <CardHeader
                  extra={(
                    <Checkbox
                      id="checkbox-plan-basic"
                      name="plan"
                      value="basic"
                      checked
                      aria-labelledby="checkbox-plan-basic-title checkbox-plan-basic-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="checkbox-plan-basic-title">Basic</h3>
                  <p className="card_subtitle">월 9,000원</p>
                </CardHeader>
                <CardBody id="checkbox-plan-basic-desc">개인 프로젝트에 적합합니다.</CardBody>
              </Card>
            </div>
            <div className="checkbox_card color_primary">
              <Card compact className="card_shadow">
                <CardHeader
                  extra={(
                    <Checkbox
                      id="checkbox-plan-pro"
                      name="plan"
                      value="pro"
                      aria-labelledby="checkbox-plan-pro-title checkbox-plan-pro-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="checkbox-plan-pro-title">Pro</h3>
                  <p className="card_subtitle">월 29,000원</p>
                </CardHeader>
                <CardBody id="checkbox-plan-pro-desc">팀 협업과 고급 기능을 제공합니다.</CardBody>
              </Card>
            </div>
            <div className="checkbox_card">
              <Card compact className="card_shadow">
                <CardHeader
                  extra={(
                    <Checkbox
                      id="checkbox-plan-enterprise"
                      name="plan"
                      value="enterprise"
                      disabled
                      aria-labelledby="checkbox-plan-enterprise-title checkbox-plan-enterprise-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="checkbox-plan-enterprise-title">Enterprise</h3>
                  <p className="card_subtitle">별도 문의</p>
                </CardHeader>
                <CardBody id="checkbox-plan-enterprise-desc">
                  대규모 조직용 맞춤 플랜입니다. (비활성)
                </CardBody>
              </Card>
            </div>
          </CardDeck>
        </fieldset>
        <fieldset className="checkbox_group">
          <legend className="checkbox_group-legend">권한 (가로)</legend>
          <CardDeck columns={3}>
            <div className="checkbox_card color_success">
              <Card compact>
                <CardHeader
                  extra={(
                    <Checkbox
                      id="checkbox-perm-read"
                      checked
                      aria-labelledby="checkbox-perm-read-title checkbox-perm-read-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="checkbox-perm-read-title">읽기</h3>
                </CardHeader>
                <CardBody id="checkbox-perm-read-desc">조회 권한</CardBody>
              </Card>
            </div>
            <div className="checkbox_card color_success">
              <Card compact>
                <CardHeader
                  extra={(
                    <Checkbox
                      id="checkbox-perm-write"
                      checked
                      aria-labelledby="checkbox-perm-write-title checkbox-perm-write-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="checkbox-perm-write-title">쓰기</h3>
                </CardHeader>
                <CardBody id="checkbox-perm-write-desc">수정 권한</CardBody>
              </Card>
            </div>
            <div className="checkbox_card">
              <Card compact>
                <CardHeader
                  extra={(
                    <Checkbox
                      id="checkbox-perm-delete"
                      aria-labelledby="checkbox-perm-delete-title checkbox-perm-delete-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="checkbox-perm-delete-title">삭제</h3>
                </CardHeader>
                <CardBody id="checkbox-perm-delete-desc">삭제 권한</CardBody>
              </Card>
            </div>
          </CardDeck>
        </fieldset>
        <fieldset className="checkbox_group">
          <legend className="checkbox_group-legend">
            요금제 선택 — 카드 전체 클릭 (checkbox_card-clickable)
          </legend>
          <CardDeck columns={2}>
            <div
              className="checkbox_card checkbox_card-clickable"
              data-ripple=""
              onClick={onClickableCardClick}
            >
              <Card compact className="card_shadow">
                <CardHeader
                  extra={(
                    <Checkbox
                      id="checkbox-plan-full-basic"
                      name="plan-clickable"
                      value="basic"
                      checked
                      aria-labelledby="checkbox-plan-full-basic-title checkbox-plan-full-basic-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="checkbox-plan-full-basic-title">Basic</h3>
                  <p className="card_subtitle">월 9,000원</p>
                </CardHeader>
                <CardBody id="checkbox-plan-full-basic-desc">
                  카드 어디를 눌러도 선택됩니다.
                </CardBody>
              </Card>
            </div>
            <div
              className="checkbox_card checkbox_card-clickable color_primary"
              data-ripple=""
              onClick={onClickableCardClick}
            >
              <Card compact className="card_shadow">
                <CardHeader
                  extra={(
                    <Checkbox
                      id="checkbox-plan-full-pro"
                      name="plan-clickable"
                      value="pro"
                      aria-labelledby="checkbox-plan-full-pro-title checkbox-plan-full-pro-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="checkbox-plan-full-pro-title">Pro</h3>
                  <p className="card_subtitle">월 29,000원</p>
                </CardHeader>
                <CardBody id="checkbox-plan-full-pro-desc">
                  제목·설명·여백을 포함한 전체 영역이 클릭 대상입니다.
                </CardBody>
              </Card>
            </div>
            <div
              className="checkbox_card checkbox_card-clickable"
              data-ripple=""
              onClick={onClickableCardClick}
            >
              <Card compact className="card_shadow">
                <CardHeader
                  extra={(
                    <Checkbox
                      id="checkbox-plan-full-enterprise"
                      name="plan-clickable"
                      value="enterprise"
                      disabled
                      aria-labelledby="checkbox-plan-full-enterprise-title checkbox-plan-full-enterprise-desc"
                    />
                  )}
                >
                  <h3 className="card_title" id="checkbox-plan-full-enterprise-title">Enterprise</h3>
                  <p className="card_subtitle">별도 문의</p>
                </CardHeader>
                <CardBody id="checkbox-plan-full-enterprise-desc">
                  대규모 조직용 맞춤 플랜입니다. (비활성)
                </CardBody>
              </Card>
            </div>
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
    code: `<form className="form form_vertical form_fit">
  <div className="form_field">
    <span className="form_field-label" id="…">수신 동의</span>
    <fieldset className="checkbox_group" aria-labelledby="…">
      <Checkbox checked label="마케팅 정보 수신" />
      <Checkbox label="뉴스레터 구독" />
    </fieldset>
  </div>
</form>`,
    preview: (
      <div className="demo-stack">
        <form className="form form_vertical form_fit" onSubmit={(event) => event.preventDefault()}>
          <div className="form_field">
            <span className="form_field-label" id="checkbox-form-vertical-label">
              수신 동의
            </span>
            <fieldset className="checkbox_group" aria-labelledby="checkbox-form-vertical-label">
              <Checkbox checked label="마케팅 정보 수신" />
              <Checkbox label="뉴스레터 구독" />
            </fieldset>
          </div>
        </form>
        <form className="form form_horizontal form_fit" onSubmit={(event) => event.preventDefault()}>
          <div className="form_field">
            <span className="form_field-label" id="checkbox-form-horizontal-label">
              권한
            </span>
            <fieldset
              className="checkbox_group checkbox_group_horizontal"
              aria-labelledby="checkbox-form-horizontal-label"
            >
              <Checkbox button checked label="조회" />
              <Checkbox button label="편집" />
            </fieldset>
          </div>
        </form>
      </div>
    )
  }
]

/**
 * Checkbox 가이드 화면.
 * docs와 동일한 유형·상태·그룹·카드형 예시와 API 문서를 모은다.
 */
export default function CheckboxGuide () {
  return (
    <GuideLayout
      category="폼"
      title="Checkbox"
      description="다중 선택이 가능한 체크박스. label · button · indeterminate · labelEnd · 카드형을 조합합니다."
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

      <GuideApiDocs sections={checkboxApiSections} />
    </GuideLayout>
  )
}
