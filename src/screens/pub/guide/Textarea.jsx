'use client'

import { useState } from 'react'
import { Button, Textarea } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { textareaApiSections } from '@/screens/pub/data/guide/textareaApiSections'

function Field ({ id, label, hint, children }) {
  return (
    <div className="form_field">
      <label className="form_field-label" htmlFor={id}>{label}</label>
      {children}
      {hint ? <p className="form_field-hint">{hint}</p> : null}
    </div>
  )
}

function ImplicitTextarea ({ label, ...props }) {
  return (
    <label className="display_contents">
      <span className="input_group-label_hidden">{label}</span>
      <Textarea {...props} />
    </label>
  )
}

/** value · onChange · onClear 로 입력을 제어하는 예시 */
function ControlledDemo () {
  const [value, setValue] = useState('제어 내용입니다.')

  return (
    <div className="demo-stack">
      <Field id="textarea-controlled" label="메모" hint={`글자 수: ${value.length}`}>
        <Textarea
          id="textarea-controlled"
          rows={4}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onClear={() => setValue('')}
          clearable
          showCount
          maxLength={200}
          placeholder="메모를 입력하세요"
        />
      </Field>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        <code>form_field</code> 라벨·힌트와 함께 사용합니다.
      </>
    ),
    code: wrapPageExample(`<Field id="textarea-message" label="메시지" hint="문의 내용을 자세히 작성해 주세요.">
  <Textarea id="textarea-message" rows={4} placeholder="메시지를 입력하세요" />
</Field>`, {
  name: 'TextareaBasicExample',
  reactImports: [],
  compImports: ['Field', 'Textarea']
}),
    preview: (
      <div className="demo-stack">
        <Field id="textarea-message" label="메시지" hint="문의 내용을 자세히 작성해 주세요.">
          <Textarea id="textarea-message" rows={4} placeholder="메시지를 입력하세요" />
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
    code: wrapPageExample(`<div className="input_field input_field_fit">
  <label className="form_field-label" htmlFor="textarea-note">메모</label>
  <Textarea id="textarea-note" rows={3} placeholder="메모를 입력하세요" />
</div>
<label className="display_contents">
  <span className="input_group-label_hidden">추가 요청사항</span>
  <Textarea rows={3} placeholder="추가 요청사항" />
</label>`, {
  name: 'TextareaExample2',
  reactImports: [],
  compImports: ['Textarea']
}),
    preview: (
      <div className="demo-stack">
        <div className="input_field input_field_fit">
          <label className="form_field-label" htmlFor="textarea-note">메모</label>
          <Textarea id="textarea-note" rows={3} placeholder="메모를 입력하세요" />
        </div>
        <ImplicitTextarea label="추가 요청사항" rows={3} placeholder="추가 요청사항" />
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
    code: wrapPageExample(`<Textarea size="sm" rows={3} placeholder="textarea_sm" />
<Textarea size="md" rows={3} placeholder="기본 크기" />
<Textarea size="lg" rows={3} placeholder="textarea_lg" />`, {
  name: 'TextareaSizeExample',
  reactImports: [],
  compImports: ['Textarea']
}),
    preview: (
      <div className="demo-stack">
        {(['sm', 'md', 'lg']).map((size) => (
          <Field key={size} id={`textarea-${size}`} label={size.toUpperCase()}>
            <Textarea
              id={`textarea-${size}`}
              size={size}
              rows={3}
              placeholder={size === 'md' ? '기본 크기' : `textarea_${size}`}
            />
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
    code: wrapPageExample(`<Textarea rows={3} placeholder="width: 100%" />
<div className="form_field form_field_fit">…</div>
<Textarea fit showCount maxLength={100} rows={3} />`, {
  name: 'TextareaExample4',
  reactImports: [],
  compImports: ['Textarea']
}),
    preview: (
      <div className="demo-stack">
        <Field id="textarea-full" label="전체 너비">
          <Textarea id="textarea-full" rows={3} placeholder="width: 100%" />
        </Field>
        <div className="form_field form_field_fit">
          <label className="form_field-label" htmlFor="textarea-fit">제한 너비</label>
          <Textarea id="textarea-fit" rows={3} placeholder="최대 320px" />
        </div>
        <Field id="textarea-wrap-fit" label="카운터 제한 너비">
          <Textarea id="textarea-wrap-fit" fit showCount maxLength={100} rows={3} />
        </Field>
      </div>
    )
  },
  {
    title: '크기 조절',
    description: (
      <>
        <code>resize</code>로 none · vertical · horizontal · both 방향을 지정합니다.
      </>
    ),
    code: wrapPageExample(`<Textarea resize="none" rows={3} />
<Textarea resize="vertical" rows={3} />
<Textarea resize="horizontal" rows={3} />
<Textarea resize="both" rows={3} />`, {
  name: 'TextareaSizeExample2',
  reactImports: [],
  compImports: ['Textarea']
}),
    preview: (
      <div className="demo-stack">
        {(['none', 'vertical', 'horizontal', 'both']).map((resize) => (
          <Field key={resize} id={`textarea-resize-${resize}`} label={resize}>
            <Textarea
              id={`textarea-resize-${resize}`}
              resize={resize}
              rows={3}
              defaultValue={`${resize} 방향 크기 조절`}
            />
          </Field>
        ))}
      </div>
    )
  },
  {
    title: '필수 필드',
    description: (
      <>
        <code>form_field-required</code>와 <code>required</code> · <code>aria-required</code>를 함께 씁니다.
      </>
    ),
    code: wrapPageExample(`<label className="form_field-label" htmlFor="textarea-required">
  문의 내용
  <span className="form_field-required">…</span>
</label>
<Textarea id="textarea-required" rows={4} required aria-required="true" />`, {
  name: 'TextareaRequiredExample',
  reactImports: [],
  compImports: ['Textarea']
}),
    preview: (
      <div className="demo-stack">
        <div className="form_field form_field_fit">
          <label className="form_field-label" htmlFor="textarea-required">
            문의 내용
            <span className="form_field-required">
              <span aria-hidden="true">*</span>
              <span className="form_field-required-text">필수 항목</span>
            </span>
          </label>
          <Textarea
            id="textarea-required"
            rows={4}
            required
            aria-required="true"
            placeholder="문의 내용을 입력하세요"
          />
          <p className="form_field-hint">답변에 필요한 내용을 작성해 주세요.</p>
        </div>
      </div>
    )
  },
  {
    title: '상태',
    description: (
      <>
        기본 · 비활성 · 읽기 전용 · <code>error</code> · <code>is-success</code> 상태입니다.
      </>
    ),
    code: wrapPageExample(`<Textarea rows={3} placeholder="입력 가능" />
<Textarea rows={3} defaultValue="수정할 수 없음" disabled />
<Textarea rows={3} defaultValue="읽기만 가능" readOnly />
<Textarea rows={3} error defaultValue="너무 짧은 내용" />
<Textarea rows={3} className="is-success" defaultValue="등록할 수 있는 내용입니다." />`, {
  name: 'TextareaStateExample',
  reactImports: [],
  compImports: ['Textarea']
}),
    preview: (
      <div className="demo-stack">
        <Field id="textarea-default" label="기본">
          <Textarea id="textarea-default" rows={3} placeholder="입력 가능" />
        </Field>
        <Field id="textarea-disabled" label="비활성">
          <Textarea id="textarea-disabled" rows={3} defaultValue="수정할 수 없음" disabled />
        </Field>
        <Field id="textarea-readonly" label="읽기 전용">
          <Textarea id="textarea-readonly" rows={3} defaultValue="읽기만 가능" readOnly />
        </Field>
        <div className="form_field">
          <label className="form_field-label" htmlFor="textarea-error">에러</label>
          <Textarea
            id="textarea-error"
            rows={3}
            error
            defaultValue="너무 짧은 내용"
            aria-describedby="textarea-error-message"
          />
          <p id="textarea-error-message" className="form_field-error" role="alert">
            10자 이상 입력해 주세요.
          </p>
        </div>
        <div className="form_field">
          <label className="form_field-label" htmlFor="textarea-success">성공</label>
          <Textarea
            id="textarea-success"
            rows={3}
            className="is-success"
            defaultValue="등록할 수 있는 내용입니다."
            aria-describedby="textarea-success-message"
          />
          <p id="textarea-success-message" className="form_field-success" role="status">
            입력 내용이 확인되었습니다.
          </p>
        </div>
      </div>
    )
  },
  {
    title: '글자 수',
    description: (
      <>
        <code>showCount</code> · <code>maxLength</code>로 실시간 글자 수를 표시합니다.
      </>
    ),
    code: wrapPageExample(`<Textarea rows={5} maxLength={200} showCount placeholder="자기소개를 입력하세요" />
<Textarea size="sm" rows={3} maxLength={30} showCount defaultValue="…" />`, {
  name: 'TextareaExample8',
  reactImports: [],
  compImports: ['Textarea']
}),
    preview: (
      <div className="demo-stack">
        <div className="form_field">
          <label className="form_field-label" htmlFor="textarea-count">자기소개</label>
          <Textarea
            id="textarea-count"
            rows={5}
            maxLength={200}
            showCount
            aria-describedby="textarea-count-hint"
            placeholder="자기소개를 입력하세요"
          />
          <p id="textarea-count-hint" className="form_field-hint">200자 이내로 작성해 주세요.</p>
        </div>
        <Field id="textarea-count-filled" label="작성 중">
          <Textarea
            id="textarea-count-filled"
            size="sm"
            rows={3}
            maxLength={30}
            showCount
            defaultValue="입력한 글자 수를 확인할 수 있습니다."
          />
        </Field>
      </div>
    )
  },
  {
    title: '입력 삭제',
    description: (
      <>
        <code>clearable</code>은 값이 있을 때 지우기 버튼을 표시합니다. 읽기 전용에서는 숨깁니다.
      </>
    ),
    code: wrapPageExample(`<Textarea rows={4} clearable defaultValue="지울 수 있는 내용" />
<Textarea rows={4} clearable showCount maxLength={200} defaultValue="…" />
<Textarea rows={3} clearable readOnly defaultValue="수정 불가" />`, {
  name: 'TextareaExample9',
  reactImports: [],
  compImports: ['Textarea']
}),
    preview: (
      <div className="demo-stack">
        <Field id="textarea-clear" label="메모">
          <Textarea id="textarea-clear" rows={4} clearable defaultValue="지울 수 있는 내용" />
        </Field>
        <Field id="textarea-clear-count" label="자기소개">
          <Textarea
            id="textarea-clear-count"
            rows={4}
            clearable
            showCount
            maxLength={200}
            defaultValue="글자 수와 지우기를 함께 사용합니다."
          />
        </Field>
        <Field id="textarea-clear-readonly" label="읽기 전용">
          <Textarea
            id="textarea-clear-readonly"
            rows={3}
            clearable
            readOnly
            defaultValue="수정 불가"
          />
        </Field>
      </div>
    )
  },
  {
    title: '제어 모드',
    description: (
      <>
        <code>value</code>를 넘기면 제어 모드입니다. <code>onChange</code>로 값을 갱신하고,
        지우기 시 <code>onClear</code>에서 빈 문자열로 맞춥니다.
      </>
    ),
    code: wrapPageExample(`const [value, setValue] = useState('제어 내용입니다.')

<Textarea
  rows={4}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onClear={() => setValue('')}
  clearable
  showCount
  maxLength={200}
/>`, {
      name: 'TextareaExample',
      reactImports: ['useState'],
      compImports: ['Textarea']
    }),
    preview: <ControlledDemo />
  },
  {
    title: '조합 예시',
    description: '필수 · 글자 수 · 에러 피드백이 있는 후기 폼 예시입니다.',
    code: wrapPageExample(`<form className="form form_vertical form_fit form_compact">
  <Textarea rows={6} showCount maxLength={300} error defaultValue="좋아요" required />
  <div className="form_actions">…</div>
</form>`, {
  name: 'TextareaExample10',
  reactImports: [],
  compImports: ['Textarea']
}),
    preview: (
      <form
        className="form form_vertical form_fit form_compact"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="form_field">
          <label className="form_field-label" htmlFor="review">
            후기
            <span className="form_field-required">
              <span aria-hidden="true">*</span>
              <span className="form_field-required-text">필수 항목</span>
            </span>
          </label>
          <Textarea
            id="review"
            rows={6}
            showCount
            maxLength={300}
            error
            defaultValue="좋아요"
            required
            aria-describedby="review-error"
          />
          <p id="review-error" className="form_field-error" role="alert">
            후기를 10자 이상 작성해 주세요.
          </p>
        </div>
        <div className="form_actions">
          <Button type="submit" label="등록" />
          <Button variant="ghost" label="취소" />
        </div>
      </form>
    )
  }
]

/**
 * Textarea 가이드 화면.
 * docs와 동일한 크기·리사이즈·글자 수·clearable 예시와 API 문서를 모은다.
 */
export default function TextareaGuide () {
  return (
    <GuideLayout
      category="폼"
      title="Textarea"
      description="여러 줄 입력. size · resize · fit · showCount · clearable · error 상태를 조합하고 form_field 패턴과 함께 사용합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="TextareaExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={textareaApiSections} />
    </GuideLayout>
  )
}
