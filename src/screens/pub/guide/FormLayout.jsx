'use client'

import { Button, FormActions, FormField, FormLayout, Input, Select, Textarea } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { formLayoutApiSections } from '@/screens/pub/data/guide/formLayoutApiSections'

function Fields () {
  return (
    <>
      <FormField label="이름" htmlFor="form-name" required hint="실명을 입력해 주세요.">
        <Input id="form-name" placeholder="홍길동" required />
      </FormField>
      <FormField label="이메일" htmlFor="form-email">
        <Input id="form-email" type="email" placeholder="name@example.com" />
      </FormField>
    </>
  )
}

function ActionButtons ({ submitLabel = '저장' }) {
  return (
    <FormActions>
      <Button type="submit" label={submitLabel} />
      <Button type="button" variant="ghost" label="취소" />
    </FormActions>
  )
}

const SECTIONS = [
  {
    title: '세로',
    description: (
      <>
        기본은 <code>form_vertical</code>입니다. <code>fit</code>으로 입력 최대 너비를 제한합니다.
      </>
    ),
    code: wrapPageExample(`<FormLayout fit onSubmit={…}>
  <FormField label="이름" htmlFor="form-name" required hint="실명을 입력해 주세요.">
    <Input id="form-name" placeholder="홍길동" required />
  </FormField>
  …
  <FormActions>
    <Button type="submit" label="저장" />
    <Button type="button" variant="ghost" label="취소" />
  </FormActions>
</FormLayout>`, {
      name: 'FormLayoutExample',
      reactImports: [],
      compImports: ['Button', 'FormActions', 'FormField', 'FormLayout', 'Input']
    }),
    preview: (
      <FormLayout fit onSubmit={(event) => event.preventDefault()}>
        <Fields />
        <ActionButtons />
      </FormLayout>
    )
  },
  {
    title: '가로',
    description: (
      <>
        <code>layout=&quot;horizontal&quot;</code>로 레이블과 입력을 가로로 배치합니다.
      </>
    ),
    code: wrapPageExample(`<FormLayout layout="horizontal" onSubmit={…}>
  <FormField label="이름" htmlFor="…">…</FormField>
  <FormActions>…</FormActions>
</FormLayout>`, {
      name: 'FormLayoutHorizontalExample',
      reactImports: [],
      compImports: ['FormActions', 'FormField', 'FormLayout']
    }),
    preview: (
      <FormLayout layout="horizontal" onSubmit={(event) => event.preventDefault()}>
        <Fields />
        <ActionButtons />
      </FormLayout>
    )
  },
  {
    title: '가로 — 레이블 정렬·너비',
    description: (
      <>
        <code>labelAlign</code> · <code>labelWidth</code>로 가로 레이아웃의 레이블을 조절합니다.
      </>
    ),
    code: wrapPageExample(`<FormLayout layout="horizontal" labelWidth="sm" labelAlign="start">…</FormLayout>
<FormLayout layout="horizontal" labelWidth="lg">…</FormLayout>`, {
      name: 'FormLayoutLabelExample',
      reactImports: [],
      compImports: ['FormLayout']
    }),
    preview: (
      <div className="demo-stack">
        <FormLayout layout="horizontal" labelWidth="sm" labelAlign="start">
          <FormField label="도시" htmlFor="align-city">
            <Input id="align-city" placeholder="서울" />
          </FormField>
          <FormField label="우편번호" htmlFor="align-zip">
            <Input id="align-zip" placeholder="00000" />
          </FormField>
        </FormLayout>
        <FormLayout layout="horizontal" labelWidth="lg">
          <FormField label="회사명" htmlFor="align-company">
            <Input id="align-company" placeholder="UXKM" />
          </FormField>
          <FormField label="부서" htmlFor="align-team">
            <Input id="align-team" placeholder="디자인팀" />
          </FormField>
        </FormLayout>
      </div>
    )
  },
  {
    title: '인라인',
    description: (
      <>
        <code>layout=&quot;inline&quot;</code>로 검색 폼처럼 한 줄에 배치합니다.
      </>
    ),
    code: wrapPageExample(`<FormLayout layout="inline" onSubmit={…}>
  <FormField label="검색어" htmlFor="form-query">
    <Input id="form-query" placeholder="검색어" />
  </FormField>
  <FormField label="상태" htmlFor="form-status">
    <Select id="form-status">…</Select>
  </FormField>
  <FormActions>
    <Button type="submit" label="검색" />
  </FormActions>
</FormLayout>`, {
      name: 'FormLayoutInlineExample',
      reactImports: [],
      compImports: ['Button', 'FormActions', 'FormField', 'FormLayout', 'Input', 'Select']
    }),
    preview: (
      <FormLayout layout="inline" onSubmit={(event) => event.preventDefault()}>
        <FormField label="검색어" htmlFor="form-query">
          <Input id="form-query" placeholder="검색어" />
        </FormField>
        <FormField label="상태" htmlFor="form-status">
          <Select id="form-status">
            <option>전체</option>
            <option>진행 중</option>
            <option>완료</option>
          </Select>
        </FormField>
        <FormActions>
          <Button type="submit" label="검색" />
        </FormActions>
      </FormLayout>
    )
  },
  {
    title: '그리드',
    description: (
      <>
        <code>grid</code>와 조합해 다열 필드를 구성합니다.
      </>
    ),
    code: wrapPageExample(`<FormLayout onSubmit={…}>
  <div className="grid grid_cols-1 grid_cols-md-2">
    <FormField label="이름" htmlFor="grid-name">…</FormField>
    <FormField label="부서" htmlFor="grid-team">…</FormField>
  </div>
  <FormField label="이메일" htmlFor="grid-email">…</FormField>
  <FormActions>…</FormActions>
</FormLayout>`, {
      name: 'FormLayoutGridExample',
      reactImports: [],
      compImports: ['FormActions', 'FormField', 'FormLayout']
    }),
    preview: (
      <FormLayout onSubmit={(event) => event.preventDefault()}>
        <div className="grid grid_cols-1 grid_cols-md-2">
          <FormField label="이름" htmlFor="grid-name">
            <Input id="grid-name" />
          </FormField>
          <FormField label="부서" htmlFor="grid-team">
            <Input id="grid-team" />
          </FormField>
        </div>
        <FormField label="이메일" htmlFor="grid-email">
          <Input id="grid-email" type="email" />
        </FormField>
        <ActionButtons />
      </FormLayout>
    )
  },
  {
    title: '너비',
    description: (
      <>
        기본은 부모 100%입니다. <code>fit</code>으로 제한 너비를 사용합니다.
      </>
    ),
    code: wrapPageExample(`<FormLayout>
  <FormField label="기본 너비" htmlFor="width-default">…</FormField>
</FormLayout>
<FormLayout fit>
  <FormField label="제한 너비" htmlFor="width-fit">…</FormField>
</FormLayout>`, {
      name: 'FormLayoutWidthExample',
      reactImports: [],
      compImports: ['FormField', 'FormLayout']
    }),
    preview: (
      <div className="demo-stack">
        <FormLayout>
          <FormField label="기본 너비" htmlFor="width-default">
            <Input id="width-default" placeholder="부모 100%" />
          </FormField>
        </FormLayout>
        <FormLayout fit>
          <FormField label="제한 너비" htmlFor="width-fit">
            <Input id="width-fit" placeholder="최대 320px" />
          </FormField>
        </FormLayout>
        <FormLayout layout="horizontal">
          <FormField label="가로 레이아웃" htmlFor="width-horizontal">
            <Input id="width-horizontal" placeholder="남은 공간을 채움" />
          </FormField>
        </FormLayout>
      </div>
    )
  },
  {
    title: '액션 영역',
    description: (
      <>
        <code>FormActions</code>로 제출·취소 버튼을 묶습니다. 세로·가로 레이아웃에 맞게 정렬됩니다.
      </>
    ),
    code: wrapPageExample(`<FormLayout>
  <FormField label="제목" htmlFor="actions-vertical">…</FormField>
  <FormActions>…</FormActions>
</FormLayout>`, {
      name: 'FormLayoutActionsExample',
      reactImports: [],
      compImports: ['FormActions', 'FormField', 'FormLayout']
    }),
    preview: (
      <div className="demo-stack">
        <FormLayout onSubmit={(event) => event.preventDefault()}>
          <FormField label="제목" htmlFor="actions-vertical">
            <Input id="actions-vertical" />
          </FormField>
          <ActionButtons />
        </FormLayout>
        <FormLayout layout="horizontal" onSubmit={(event) => event.preventDefault()}>
          <FormField label="제목" htmlFor="actions-horizontal">
            <Input id="actions-horizontal" />
          </FormField>
          <ActionButtons />
        </FormLayout>
      </div>
    )
  },
  {
    title: '전체 예시',
    description: (
      <>
        <code>compact</code> · 그리드 · 필수 필드를 조합한 가입 폼 예시입니다.
      </>
    ),
    code: wrapPageExample(`<FormLayout compact onSubmit={…}>
  <div className="grid grid_cols-1 grid_cols-md-2">
    <FormField label="아이디" htmlFor="example-id" required hint="영문·숫자 4~16자">…</FormField>
    …
  </div>
  <FormActions>
    <Button type="submit" label="가입하기" />
  </FormActions>
</FormLayout>`, {
      name: 'FormLayoutFullExample',
      reactImports: [],
      compImports: ['Button', 'FormActions', 'FormField', 'FormLayout']
    }),
    preview: (
      <FormLayout compact onSubmit={(event) => event.preventDefault()}>
        <div className="grid grid_cols-1 grid_cols-md-2">
          <FormField label="아이디" htmlFor="example-id" required hint="영문·숫자 4~16자">
            <Input id="example-id" required />
          </FormField>
          <FormField label="비밀번호" htmlFor="example-password" required>
            <Input id="example-password" type="password" required />
          </FormField>
          <FormField label="이름" htmlFor="example-name" required>
            <Input id="example-name" required />
          </FormField>
          <FormField label="이메일" htmlFor="example-email">
            <Input id="example-email" type="email" />
          </FormField>
          <FormField className="grid_col-span-md-2" label="메모" htmlFor="example-memo">
            <Textarea id="example-memo" rows={3} />
          </FormField>
        </div>
        <ActionButtons submitLabel="가입하기" />
      </FormLayout>
    )
  }
]

/**
 * Form Layout 가이드 화면.
 * docs와 동일한 세로·가로·인라인·그리드 예시와 API 문서를 모은다.
 */
export default function FormLayoutGuide () {
  return (
    <GuideLayout
      category="폼"
      title="Form Layout"
      description="폼 필드 배치. vertical · horizontal · inline과 fit · compact · FormField · FormActions를 조합합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="FormLayoutExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={formLayoutApiSections} />
    </GuideLayout>
  )
}
