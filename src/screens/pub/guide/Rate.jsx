'use client'

import { useState } from 'react'
import { Rate } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { rateApiSections } from '@/screens/pub/data/guide/rateApiSections'

/** value · onChange 로 부모가 별점을 소유하는 제어 예시 */
function ControlledDemo () {
  const [value, setValue] = useState(3)

  return (
    <div className="demo-stack">
      <Rate
        legend="배송 속도"
        value={value}
        onChange={setValue}
        name="rate-basic"
      />
      <p>
        value: <code>{value ?? '—'}</code>
      </p>
    </div>
  )
}

/** clearable · onChange(null) 로 선택 해제하는 제어 예시 */
function ClearableDemo () {
  const [value, setValue] = useState(3)

  return (
    <div className="demo-stack">
      <Rate
        clearable
        legend="만족도 — rate_clearable"
        value={value}
        onChange={setValue}
        name="rate-clear"
      />
      <p>
        value: <code>{value ?? 'null'}</code>
      </p>
    </div>
  )
}

const SECTIONS = [
  {
    title: '유형',
    description: (
      <>
        접근 가능한 이름 지정 방식별 예시입니다. <code>legend</code> · <code>aria-labelledby</code> · <code>aria-label</code>을 상황에 맞게 사용합니다.
      </>
    ),
    code: wrapPageExample(`<Rate legend="legend — 상품 만족도" value={3} name="rate-type-legend" />
<Rate value={4} name="rate-type-labelledby" legend="aria-labelledby — 서비스 평가" />
<Rate legend="aria-label — 단독" name="rate-type-aria" aria-label="별점 5점 만점" />`, {
  name: 'RateExample1',
  reactImports: [],
  compImports: ['Rate']
}),
    preview: (
      <div className="demo-stack">
        <Rate legend="legend — 상품 만족도" value={3} name="rate-type-legend" />
        <Rate value={4} name="rate-type-labelledby" legend="aria-labelledby — 서비스 평가" />
        <Rate legend="aria-label — 단독" name="rate-type-aria" aria-label="별점 5점 만점" />
      </div>
    )
  },
  {
    title: '기본',
    description: (
      <>
        <code>value</code>를 넘기면 제어 모드입니다. 부모가 별점을 소유하고 <code>onChange</code>로만 갱신합니다.
      </>
    ),
    code: wrapPageExample(`const [value, setValue] = useState(3)

<Rate
  legend="배송 속도"
  value={value}
  onChange={setValue}
  name="rate-basic"
/>`, {
      name: 'RateExample',
      reactImports: ['useState'],
      compImports: ['Rate']
    }),
    preview: <ControlledDemo />
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 sm · md · lg입니다.
      </>
    ),
    code: wrapPageExample(`<Rate size="sm" legend="Small — rate_sm" value={3} name="rate-size-sm" />
<Rate legend="Medium — 기본" value={3} name="rate-size-md" />
<Rate size="lg" legend="Large — rate_lg" value={3} name="rate-size-lg" />`, {
  name: 'RateSizeExample',
  reactImports: [],
  compImports: ['Rate']
}),
    preview: (
      <div className="demo-stack">
        <Rate size="sm" legend="Small — rate_sm" value={3} name="rate-size-sm" />
        <Rate legend="Medium — 기본" value={3} name="rate-size-md" />
        <Rate size="lg" legend="Large — rate_lg" value={3} name="rate-size-lg" />
      </div>
    )
  },
  {
    title: '색상',
    description: (
      <>
        기본은 warning(별색)입니다. <code>color_primary</code> · <code>color_success</code> · <code>color_danger</code>로 채움 색을 지정합니다.
      </>
    ),
    code: wrapPageExample(`<Rate className="color_primary" legend="Primary" value={4} name="rate-color-primary" />
…`, {
  name: 'RateColorExample',
  reactImports: [],
  compImports: ['Rate']
}),
    preview: (
      <div className="demo-stack">
        <Rate className="color_primary" legend="Primary" value={4} name="rate-color-primary" />
        <Rate className="color_success" legend="Success" value={5} name="rate-color-success" />
        <Rate className="color_danger" legend="Danger" value={2} name="rate-color-danger" />
      </div>
    )
  },
  {
    title: '반별',
    description: (
      <>
        <code>allowHalf</code>를 추가하면 별 왼쪽 절반 클릭으로 0.5 단위 선택이 가능합니다.
      </>
    ),
    code: wrapPageExample(`<Rate allowHalf legend="정밀 평가 — rate_allow-half" value={3.5} name="rate-half" />`, {
  name: 'RateExample4',
  reactImports: [],
  compImports: ['Rate']
}),
    preview: (
      <div className="demo-stack">
        <Rate allowHalf legend="정밀 평가 — rate_allow-half" value={3.5} name="rate-half" />
        <p className="rate_hint">
          별 왼쪽을 클릭하면 반별, 오른쪽을 클릭하면 정수 점수가 선택됩니다.
        </p>
      </div>
    )
  },
  {
    title: '선택 해제',
    description: (
      <>
        <code>clearable</code>을 추가하면 초기화 버튼으로 값을 지울 수 있습니다.
        제어 모드에서는 clear 시 <code>onChange(null)</code>이 호출되므로 <code>value</code>를 <code>null</code>로 갱신합니다.
      </>
    ),
    code: wrapPageExample(`const [value, setValue] = useState(3)
// clear → setValue(null)

<Rate
  clearable
  legend="만족도 — rate_clearable"
  value={value}
  onChange={setValue}
  name="rate-clear"
/>`, {
      name: 'RateExample',
      reactImports: ['useState'],
      compImports: ['Rate']
    }),
    preview: <ClearableDemo />
  },
  {
    title: '읽기 전용',
    description: (
      <>
        <code>readonly</code>로 표시 전용 별점을 렌더합니다. 평균 평점·리뷰 요약에 사용합니다.
      </>
    ),
    code: wrapPageExample(`<Rate readonly allowHalf value={4.5} />
<Rate readonly size="sm" value={2} />`, {
  name: 'RateExample5',
  reactImports: [],
  compImports: ['Rate']
}),
    preview: (
      <div className="demo-stack">
        <Rate readonly allowHalf value={4.5} />
        <Rate readonly size="sm" value={2} />
      </div>
    )
  },
  {
    title: '상태',
    description: <>비활성·오류(<code>is-error</code>) 상태를 지원합니다.</>,
    code: wrapPageExample(`<Rate disabled legend="비활성" value={3} name="rate-state-disabled" />
<Rate className="is-error" legend="오류 — is-error" name="rate-state-error" />`, {
  name: 'RateStateExample',
  reactImports: [],
  compImports: ['Rate']
}),
    preview: (
      <div className="demo-stack">
        <Rate disabled legend="비활성" value={3} name="rate-state-disabled" />
        <Rate className="is-error" legend="오류 — is-error" name="rate-state-error" />
        <p className="form_field-error">별점을 선택해 주세요.</p>
      </div>
    )
  },
  {
    title: '폼 레이아웃',
    description: (
      <>
        <code>form_field</code> · <code>form_vertical</code>과 함께 사용합니다.
      </>
    ),
    code: wrapPageExample(`<form className="form form_vertical form_fit">
  <div className="form_field">
    <span className="form_field-label" id="rate-form-label">상품 만족도</span>
    <Rate name="rate-form" aria-labelledby="rate-form-label" />
    <p className="form_field-hint">1~5점 사이로 평가해 주세요.</p>
  </div>
</form>`, {
  name: 'RateFormExample',
  reactImports: [],
  compImports: ['Rate']
}),
    preview: (
      <div className="demo-stack">
        <form className="form form_vertical form_fit" onSubmit={(event) => event.preventDefault()}>
          <div className="form_field">
            <span className="form_field-label" id="rate-form-label">
              상품 만족도
            </span>
            <Rate name="rate-form" aria-labelledby="rate-form-label" />
            <p className="form_field-hint">1~5점 사이로 평가해 주세요.</p>
          </div>
        </form>
      </div>
    )
  }
]

/**
 * Rate 가이드 화면.
 * docs와 동일한 유형·반별·읽기 전용 예시와 API 문서를 모은다.
 */
export default function RateGuide () {
  return (
    <GuideLayout
      category="폼"
      title="Rate"
      description="별점으로 평가·표시합니다. value(number | null) · onChange로 제어하고 allowHalf · clearable · readonly · size를 조합합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="RateExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={rateApiSections} />
    </GuideLayout>
  )
}
