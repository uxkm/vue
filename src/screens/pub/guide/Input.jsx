'use client'

import { useState } from 'react'
import { Alert, Button, Icon, Input } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { inputApiSections } from '@/screens/pub/data/guide/inputApiSections'

function Field ({ id, label, hint, children }) {
  return (
    <div className="form_field">
      <label className="form_field-label" htmlFor={id}>{label}</label>
      {children}
      {hint ? <p className="form_field-hint">{hint}</p> : null}
    </div>
  )
}

function ImplicitInput ({ label, ...props }) {
  return (
    <label className="display_contents">
      <span className="input_group-label_hidden">{label}</span>
      <Input {...props} />
    </label>
  )
}

const TYPE_ROWS = [
  ['text', '텍스트'],
  ['password', '비밀번호'],
  ['email', '이메일'],
  ['tel', '전화번호'],
  ['url', 'URL'],
  ['search', '검색'],
  ['number', '숫자'],
  ['date', '날짜'],
  ['time', '시간']
]

const CLEARABLE_TYPES = new Set(['text', 'password', 'email', 'tel', 'url', 'search'])

/** value · onChange · onClear 로 입력을 제어하는 예시 */
function ControlledDemo () {
  const [value, setValue] = useState('제어 값')
  const [search, setSearch] = useState('')

  return (
    <div className="demo-stack">
      <Field id="input-controlled" label="이름" hint={`현재 값: ${value || '(비어 있음)'}`}>
        <Input
          id="input-controlled"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onClear={() => setValue('')}
          clearable
          placeholder="이름을 입력하세요"
        />
      </Field>
      <Input
        aria-label="검색"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onClear={() => setSearch('')}
        prefix={<Icon name="search" />}
        clearable
        placeholder="검색어를 입력하세요"
      />
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        <code>form_field</code> 라벨·힌트와 함께 사용합니다. <code>clearable</code>로 지우기 버튼을 켤 수 있습니다.
      </>
    ),
    code: wrapPageExample(`<Field id="input-name" label="이름" hint="2~20자 이내로 입력해 주세요.">
  <Input id="input-name" placeholder="이름을 입력하세요" clearable />
</Field>`, {
  name: 'InputBasicExample',
  reactImports: [],
  compImports: ['Field', 'Input']
}),
    preview: (
      <div className="demo-stack">
        <Field id="input-name" label="이름" hint="2~20자 이내로 입력해 주세요.">
          <Input id="input-name" placeholder="이름을 입력하세요" clearable />
        </Field>
      </div>
    )
  },
  {
    title: '단독 사용',
    description: (
      <>
        <code>input_field</code> · prefix 아이콘으로 검색형 입력을 구성합니다.
      </>
    ),
    code: wrapPageExample(`<div className="input_field input_field_fit">
  <label className="form_field-label" htmlFor="input-search">검색어</label>
  <Input id="input-search" placeholder="플레이스홀더" clearable />
</div>
<Input type="search" placeholder="검색어를 입력하세요" prefix={<Icon name="search" />} clearable />`, {
  name: 'InputExample2',
  reactImports: [],
  compImports: ['Icon', 'Input']
}),
    preview: (
      <div className="demo-stack">
        <div className="input_field input_field_fit">
          <label className="form_field-label" htmlFor="input-search">검색어</label>
          <Input id="input-search" placeholder="플레이스홀더" clearable />
        </div>
        <div className="input_field input_field_fit">
          <label className="form_field-label" htmlFor="input-nickname">닉네임</label>
          <Input id="input-nickname" defaultValue="입력된 값" clearable />
        </div>
        <Input
          type="search"
          aria-label="검색"
          placeholder="검색어를 입력하세요"
          prefix={<Icon name="search" />}
          clearable
        />
      </div>
    )
  },
  {
    title: '입력 타입',
    description: '네이티브 type별로 플레이스홀더와 clearable을 조합합니다.',
    code: wrapPageExample(`<Input type="email" placeholder="name@example.com" clearable />
<Input type="date" placeholder="날짜" />`, {
  name: 'InputExample3',
  reactImports: [],
  compImports: ['Input']
}),
    preview: (
      <div className="demo-stack">
        {TYPE_ROWS.map(([type, label]) => (
          <Field key={type} id={`input-type-${type}`} label={label}>
            {CLEARABLE_TYPES.has(type)
              ? (
                <Input
                  id={`input-type-${type}`}
                  type={type}
                  placeholder={type === 'email' ? 'name@example.com' : label}
                  clearable
                />
                )
              : (
                <Input id={`input-type-${type}`} type={type} placeholder={label} />
                )}
          </Field>
        ))}
      </div>
    )
  },
  {
    title: '입력 종류',
    description: (
      <>
        <code>input_split</code> · <code>input_otp</code> · 그룹 애드온 패턴입니다.
      </>
    ),
    code: wrapPageExample(`<div className="input_split" role="group">…</div>
<div className="input_otp" role="group">…</div>
<div className="input_group">
  <span className="input_group-addon">+82</span>
  <Input type="tel" />
  <Button variant="outline" size="sm" label="인증요청" />
</div>`, {
  name: 'InputExample4',
  reactImports: [],
  compImports: ['Button', 'Input']
}),
    preview: (
      <div className="demo-stack">
        <div className="form_field">
          <p className="form_field-label" id="card-label">카드번호</p>
          <div className="input_split" role="group" aria-labelledby="card-label">
            {[1, 2, 3, 4].map((part) => (
              <span key={part} className="display_contents">
                {part > 1 && <span className="input_split_sep" aria-hidden="true">-</span>}
                <ImplicitInput
                  label={`카드번호 ${part}번째 묶음`}
                  type={part > 2 ? 'password' : 'text'}
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="0000"
                />
              </span>
            ))}
          </div>
          <p className="form_field-hint">뒤 8자리는 마스킹 처리할 수 있습니다.</p>
        </div>
        <div className="form_field">
          <p className="form_field-label" id="otp-label">인증번호 (OTP)</p>
          <div className="input_otp" role="group" aria-labelledby="otp-label">
            {[1, 2, 3, 4, 5, 6].map((part) => (
              <ImplicitInput
                key={part}
                label={`인증번호 ${part}자리`}
                inputMode="numeric"
                maxLength={1}
              />
            ))}
          </div>
          <p className="form_field-hint">문자 메시지로 받은 6자리 번호를 입력하세요.</p>
        </div>
        <Field id="phone" label="휴대폰 번호">
          <div className="input_group">
            <span className="input_group-addon">+82</span>
            <Input id="phone" type="tel" placeholder="10-0000-0000" />
            <Button variant="outline" size="sm" label="인증요청" />
          </div>
        </Field>
        <Field id="amount" label="결제 금액">
          <Input id="amount" inputMode="numeric" placeholder="0" prefix="₩" suffix="원" clearable />
        </Field>
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
    code: wrapPageExample(`<Input size="sm" placeholder="input_sm" clearable />
<Input size="md" placeholder="기본 크기" clearable />
<Input size="lg" placeholder="input_lg" clearable />`, {
  name: 'InputSizeExample',
  reactImports: [],
  compImports: ['Input']
}),
    preview: (
      <div className="demo-stack">
        {(['sm', 'md', 'lg']).map((size) => (
          <Field key={size} id={`input-${size}`} label={size.toUpperCase()}>
            <Input
              id={`input-${size}`}
              size={size}
              placeholder={size === 'md' ? '기본 크기' : `input_${size}`}
              clearable
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
        기본은 전체 너비, <code>form_field_fit</code> · <code>input_fit</code>으로 최대 너비를 제한합니다.
      </>
    ),
    code: wrapPageExample(`<Field id="input-full" label="전체 너비">
  <Input id="input-full" placeholder="width: 100%" clearable />
</Field>
<div className="form_field form_field_fit">…</div>
<Input className="input_fit" placeholder="애드온 그룹 최대 320px" prefix="@" clearable />`, {
  name: 'InputExample6',
  reactImports: [],
  compImports: ['Field', 'Input']
}),
    preview: (
      <div className="demo-stack">
        <Field id="input-full" label="전체 너비">
          <Input id="input-full" placeholder="width: 100%" clearable />
        </Field>
        <div className="form_field form_field_fit">
          <label className="form_field-label" htmlFor="input-fit">제한 너비</label>
          <Input id="input-fit" placeholder="최대 320px" clearable />
        </div>
        <Input
          className="input_fit"
          aria-label="아이디"
          placeholder="애드온 그룹 최대 320px"
          prefix="@"
          clearable
        />
      </div>
    )
  },
  {
    title: 'Input Group',
    description: (
      <>
        <code>prefix</code> · <code>suffix</code>로 애드온 그룹을 만듭니다.
      </>
    ),
    code: wrapPageExample(`<Input placeholder="example.com" prefix="https://" clearable />
<Input placeholder="username" prefix="@" clearable />
<Input inputMode="numeric" placeholder="0" prefix="₩" suffix="KRW" clearable />`, {
  name: 'InputGroupExample',
  reactImports: [],
  compImports: ['Input']
}),
    preview: (
      <div className="demo-stack">
        <Input aria-label="도메인" placeholder="example.com" prefix="https://" clearable />
        <Input aria-label="사용자명" placeholder="username" prefix="@" clearable />
        <Input
          aria-label="결제 금액"
          inputMode="numeric"
          placeholder="0"
          prefix="₩"
          suffix="KRW"
          clearable
        />
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
    code: wrapPageExample(`<label className="form_field-label" htmlFor="required-email">
  이메일
  <span className="form_field-required">…</span>
</label>
<Input id="required-email" type="email" required aria-required="true" clearable />`, {
  name: 'InputRequiredExample',
  reactImports: [],
  compImports: ['Input']
}),
    preview: (
      <div className="demo-stack">
        <div className="form_field form_field_fit">
          <label className="form_field-label" htmlFor="required-email">
            이메일
            <span className="form_field-required">
              <span aria-hidden="true">*</span>
              <span className="form_field-required-text">필수 항목</span>
            </span>
          </label>
          <Input
            id="required-email"
            type="email"
            placeholder="name@example.com"
            required
            aria-required="true"
            clearable
          />
          <p className="form_field-hint">업무용 이메일을 입력해 주세요.</p>
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
    code: wrapPageExample(`<Input placeholder="입력 가능" clearable />
<Input defaultValue="수정할 수 없음" disabled clearable />
<Input defaultValue="읽기만 가능" readOnly clearable />
<Input error defaultValue="invalid-email" clearable />
<Input className="is-success" defaultValue="uxkm_user" clearable />`, {
  name: 'InputStateExample',
  reactImports: [],
  compImports: ['Input']
}),
    preview: (
      <div className="demo-stack">
        <Field id="state-default" label="기본">
          <Input id="state-default" placeholder="입력 가능" clearable />
        </Field>
        <Field id="state-disabled" label="비활성">
          <Input id="state-disabled" defaultValue="수정할 수 없음" disabled clearable />
        </Field>
        <Field id="state-readonly" label="읽기 전용">
          <Input id="state-readonly" defaultValue="읽기만 가능" readOnly clearable />
        </Field>
        <div className="form_field">
          <label className="form_field-label" htmlFor="state-error">에러</label>
          <Input
            id="state-error"
            error
            defaultValue="invalid-email"
            aria-describedby="state-error-message"
            clearable
          />
          <p className="form_field-error" id="state-error-message" role="alert">
            올바른 이메일 형식이 아닙니다.
          </p>
        </div>
        <div className="form_field">
          <label className="form_field-label" htmlFor="state-success">성공</label>
          <Input
            id="state-success"
            className="is-success"
            defaultValue="uxkm_user"
            aria-describedby="state-success-message"
            clearable
          />
          <p className="form_field-success" id="state-success-message" role="status">
            사용 가능한 아이디입니다.
          </p>
        </div>
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
    code: wrapPageExample(`<Input defaultValue="지울 수 있는 값" clearable />
<Input type="search" defaultValue="검색어" prefix={<Icon name="search" />} clearable />
<Input defaultValue="수정 불가" readOnly clearable />`, {
  name: 'InputExample10',
  reactImports: [],
  compImports: ['Icon', 'Input']
}),
    preview: (
      <div className="demo-stack">
        <Input aria-label="텍스트" defaultValue="지울 수 있는 값" clearable />
        <Input
          aria-label="검색"
          type="search"
          defaultValue="검색어"
          prefix={<Icon name="search" />}
          clearable
        />
        <Input aria-label="읽기 전용" defaultValue="수정 불가" readOnly clearable />
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
    code: wrapPageExample(`const [value, setValue] = useState('제어 값')
const [search, setSearch] = useState('')

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onClear={() => setValue('')}
  clearable
/>
<Input
  type="search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onClear={() => setSearch('')}
  prefix={<Icon name="search" />}
  clearable
/>`, {
      name: 'InputExample',
      reactImports: ['useState'],
      compImports: ['Icon', 'Input']
    }),
    preview: <ControlledDemo />
  },
  {
    title: '조합 예시',
    description: '성공·에러 피드백과 액션 버튼이 있는 로그인 폼 예시입니다.',
    code: wrapPageExample(`<form className="form form_vertical form_fit form_compact">
  <Alert>…</Alert>
  <Input className="is-success" defaultValue="uxkm_user" clearable />
  <Input type="password" error defaultValue="1234" clearable />
  <div className="form_actions">…</div>
</form>`, {
  name: 'InputExample11',
  reactImports: [],
  compImports: ['Alert', 'Input']
}),
    preview: (
      <form
        className="form form_vertical form_fit form_compact"
        onSubmit={(event) => event.preventDefault()}
      >
        <Alert color="danger">
          <strong>입력 내용을 확인해 주세요</strong>
        </Alert>
        <div className="form_field">
          <label className="form_field-label" htmlFor="login-id">아이디</label>
          <Input
            id="login-id"
            className="is-success"
            defaultValue="uxkm_user"
            aria-invalid="false"
            aria-describedby="login-id-success"
            clearable
          />
          <p id="login-id-success" className="form_field-success" role="status">
            사용 가능한 아이디입니다.
          </p>
        </div>
        <div className="form_field">
          <label className="form_field-label" htmlFor="login-password">비밀번호</label>
          <Input
            id="login-password"
            type="password"
            error
            defaultValue="1234"
            aria-describedby="login-password-error"
            clearable
          />
          <p id="login-password-error" className="form_field-error" role="alert">
            8자 이상 입력해 주세요.
          </p>
        </div>
        <div className="form_actions">
          <Button type="submit" label="로그인" />
          <Button variant="ghost" label="취소" />
        </div>
      </form>
    )
  }
]

/**
 * Input 가이드 화면.
 * docs와 동일한 타입·그룹·상태·clearable 예시와 API 문서를 모은다.
 */
export default function InputGuide () {
  return (
    <GuideLayout
      category="폼"
      title="Input"
      description="한 줄 입력. size · clearable · prefix/suffix · error 상태를 조합하고 form_field 패턴과 함께 사용합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="InputExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={inputApiSections} />
    </GuideLayout>
  )
}
