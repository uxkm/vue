'use client'

import { useState } from 'react'
import {
  Button,
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Select
} from '@/comp'
import { selectApiSections } from '@/pages/pub/data/guide/selectApiSections'

function Field ({ id, label, hint, children }) {
  return (
    <div className="form_field">
      <label className="form_field-label" htmlFor={id}>{label}</label>
      {children}
      {hint ? <p className="form_field-hint">{hint}</p> : null}
    </div>
  )
}

function ImplicitSelect ({ label, ...props }) {
  return (
    <label className="display_contents">
      <span className="input_group-label_hidden">{label}</span>
      <Select {...props} />
    </label>
  )
}

function RegionOptions () {
  return (
    <>
      <option value="seoul">서울</option>
      <option value="busan">부산</option>
      <option value="jeju">제주</option>
    </>
  )
}

function ExampleForm () {
  const [region, setRegion] = useState('')
  return (
    <form
      className="form form_vertical form_fit form_compact"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="form_field">
        <label className="form_field-label" htmlFor="delivery-region">
          배송 지역
          <span className="form_field-required">
            <span aria-hidden="true">*</span>
            <span className="form_field-required-text">필수 항목</span>
          </span>
        </label>
        <Select
          id="delivery-region"
          value={region}
          onChange={(event) => setRegion(event.target.value)}
          required
          error={!region}
          placeholder="지역을 선택하세요"
          aria-describedby={!region ? 'delivery-region-error' : 'delivery-region-success'}
        >
          <RegionOptions />
        </Select>
        {!region
          ? (
            <p id="delivery-region-error" className="form_field-error" role="alert">
              배송 지역을 선택해 주세요.
            </p>
            )
          : (
            <p id="delivery-region-success" className="form_field-success" role="status">
              선택한 지역으로 배송할 수 있습니다.
            </p>
            )}
      </div>
      <div className="form_actions">
        <Button type="submit" label="저장" />
        <Button variant="ghost" label="취소" />
      </div>
    </form>
  )
}

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        <code>form_field</code>와 placeholder · option children으로 구성합니다.
      </>
    ),
    code: `<Field id="select-region" label="지역" hint="거주 지역을 선택해 주세요.">
  <Select id="select-region" fit required placeholder="지역을 선택하세요">
    <option value="seoul">서울</option>
    …
  </Select>
</Field>`,
    preview: (
      <div className="demo-stack">
        <Field id="select-region" label="지역" hint="거주 지역을 선택해 주세요.">
          <Select id="select-region" fit required placeholder="지역을 선택하세요">
            <RegionOptions />
          </Select>
        </Field>
      </div>
    )
  },
  {
    title: '단독 사용',
    description: (
      <>
        <code>input_field</code> 또는 숨김 라벨(<code>display_contents</code>)로 단독 배치합니다.
      </>
    ),
    code: `<div className="input_field input_field_fit">
  <label htmlFor="select-language">언어</label>
  <Select id="select-language" defaultValue="ko">…</Select>
</div>
<label className="display_contents">
  <span className="input_group-label_hidden">정렬 기준</span>
  <Select fit defaultValue="latest">…</Select>
</label>`,
    preview: (
      <div className="demo-stack">
        <div className="input_field input_field_fit">
          <label className="form_field-label" htmlFor="select-language">언어</label>
          <Select id="select-language" defaultValue="ko">
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </Select>
        </div>
        <ImplicitSelect label="정렬 기준" fit defaultValue="latest">
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
        </ImplicitSelect>
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 sm · md · lg입니다.
      </>
    ),
    code: `<Select size="sm" defaultValue="seoul">…</Select>
<Select size="md" defaultValue="seoul">…</Select>
<Select size="lg" defaultValue="seoul">…</Select>`,
    preview: (
      <div className="demo-stack">
        {(['sm', 'md', 'lg']).map((size) => (
          <Field key={size} id={`select-${size}`} label={size.toUpperCase()}>
            <Select id={`select-${size}`} size={size} defaultValue="seoul">
              <RegionOptions />
            </Select>
          </Field>
        ))}
      </div>
    )
  },
  {
    title: '너비',
    description: (
      <>
        기본은 전체 너비, <code>form_field_fit</code> · <code>fit</code>으로 최대 너비를 제한합니다.
      </>
    ),
    code: `<Select defaultValue="seoul">…</Select>
<div className="form_field form_field_fit">…</div>
<Select fit defaultValue="jeju">…</Select>`,
    preview: (
      <div className="demo-stack">
        <Field id="select-full" label="전체 너비">
          <Select id="select-full" defaultValue="seoul">
            <RegionOptions />
          </Select>
        </Field>
        <div className="form_field form_field_fit">
          <label className="form_field-label" htmlFor="select-fit">제한 너비</label>
          <Select id="select-fit" defaultValue="busan">
            <RegionOptions />
          </Select>
        </div>
        <ImplicitSelect label="제한 너비 단독 선택" fit defaultValue="jeju">
          <RegionOptions />
        </ImplicitSelect>
      </div>
    )
  },
  {
    title: '옵션 그룹',
    description: (
      <>
        <code>optgroup</code>으로 옵션을 묶습니다.
      </>
    ),
    code: `<Select placeholder="팀을 선택하세요">
  <optgroup label="제품">
    <option value="design">디자인</option>
    <option value="development">개발</option>
  </optgroup>
  <optgroup label="비즈니스">…</optgroup>
</Select>`,
    preview: (
      <div className="demo-stack">
        <Field id="select-team" label="소속 팀">
          <Select id="select-team" placeholder="팀을 선택하세요">
            <optgroup label="제품">
              <option value="design">디자인</option>
              <option value="development">개발</option>
            </optgroup>
            <optgroup label="비즈니스">
              <option value="marketing">마케팅</option>
              <option value="sales">영업</option>
            </optgroup>
          </Select>
        </Field>
      </div>
    )
  },
  {
    title: '다중 선택',
    description: (
      <>
        <code>multiple</code>과 <code>nativeSize</code>로 여러 항목을 고릅니다.
      </>
    ),
    code: `<Select
  multiple
  nativeSize={4}
  defaultValue={['design', 'frontend']}
>
  <option value="design">UI 디자인</option>
  …
</Select>`,
    preview: (
      <div className="demo-stack">
        <Field id="select-skills" label="관심 분야" hint="여러 항목을 선택할 수 있습니다.">
          <Select
            id="select-skills"
            multiple
            nativeSize={4}
            defaultValue={['design', 'frontend']}
          >
            <option value="design">UI 디자인</option>
            <option value="frontend">프론트엔드</option>
            <option value="backend">백엔드</option>
            <option value="data">데이터</option>
          </Select>
        </Field>
      </div>
    )
  },
  {
    title: '필수 필드',
    description: (
      <>
        <code>form_field-required</code>와 <code>required</code>를 함께 씁니다.
      </>
    ),
    code: `<label htmlFor="select-required">
  문의 유형
  <span className="form_field-required">…</span>
</label>
<Select id="select-required" required placeholder="문의 유형을 선택하세요">…</Select>`,
    preview: (
      <div className="demo-stack">
        <div className="form_field form_field_fit">
          <label className="form_field-label" htmlFor="select-required">
            문의 유형
            <span className="form_field-required">
              <span aria-hidden="true">*</span>
              <span className="form_field-required-text">필수 항목</span>
            </span>
          </label>
          <Select id="select-required" required placeholder="문의 유형을 선택하세요">
            <option value="product">제품 문의</option>
            <option value="account">계정 문의</option>
          </Select>
          <p className="form_field-hint">가장 가까운 유형을 선택해 주세요.</p>
        </div>
      </div>
    )
  },
  {
    title: '상태',
    description: (
      <>
        기본 · 비활성 · <code>error</code> · <code>is-success</code> 상태입니다.
      </>
    ),
    code: `<Select defaultValue="seoul">…</Select>
<Select defaultValue="busan" disabled>…</Select>
<Select error required placeholder="지역을 선택하세요">…</Select>
<Select className="is-success" defaultValue="jeju">…</Select>`,
    preview: (
      <div className="demo-stack">
        <Field id="select-default" label="기본">
          <Select id="select-default" defaultValue="seoul">
            <RegionOptions />
          </Select>
        </Field>
        <Field id="select-disabled" label="비활성">
          <Select id="select-disabled" defaultValue="busan" disabled>
            <RegionOptions />
          </Select>
        </Field>
        <div className="form_field">
          <label className="form_field-label" htmlFor="select-error">에러</label>
          <Select
            id="select-error"
            error
            required
            placeholder="지역을 선택하세요"
            aria-describedby="select-error-message"
          >
            <RegionOptions />
          </Select>
          <p id="select-error-message" className="form_field-error" role="alert">
            지역을 선택해 주세요.
          </p>
        </div>
        <div className="form_field">
          <label className="form_field-label" htmlFor="select-success">성공</label>
          <Select
            id="select-success"
            className="is-success"
            defaultValue="jeju"
            aria-describedby="select-success-message"
          >
            <RegionOptions />
          </Select>
          <p id="select-success-message" className="form_field-success" role="status">
            배송 가능 지역입니다.
          </p>
        </div>
      </div>
    )
  },
  {
    title: '조합 예시',
    description: '필수 · 에러/성공 피드백이 있는 배송 지역 폼 예시입니다.',
    code: `<Select
  value={region}
  onChange={(e) => setRegion(e.target.value)}
  required
  error={!region}
  placeholder="지역을 선택하세요"
>
  …
</Select>`,
    preview: <ExampleForm />
  }
]

/**
 * Select 가이드 화면.
 * docs와 동일한 크기·그룹·다중·상태 예시와 API 문서를 모은다.
 */
export default function SelectGuide () {
  return (
    <GuideLayout
      category="폼"
      title="Select"
      description="네이티브 select. size · fit · placeholder · multiple · error 상태를 조합하고 form_field 패턴과 함께 사용합니다."
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

      <GuideApiDocs sections={selectApiSections} />
    </GuideLayout>
  )
}
