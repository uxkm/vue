'use client'

import { useState } from 'react'
import { Button, DatePicker } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { datePickerApiSections } from '@/screens/pub/data/guide/datePickerApiSections'

function Field ({ id, label, hint, children }) {
  return (
    <div className="form_field">
      <label className="form_field-label" htmlFor={id}>{label}</label>
      {children}
      {hint ? <p className="form_field-hint">{hint}</p> : null}
    </div>
  )
}

function ControlledExample () {
  const [date, setDate] = useState('')
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(new Date())
  return (
    <form
      className="form form_vertical form_fit form_compact"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="form_field">
        <label className="form_field-label" htmlFor="visit-date">
          방문일
          <span className="form_field-required">
            <span aria-hidden="true">*</span>
            <span className="form_field-required-text">필수 항목</span>
          </span>
        </label>
        <DatePicker
          id="visit-date"
          name="visitDate"
          value={date}
          onChange={setDate}
          open={open}
          onOpenChange={setOpen}
          displayMonth={month}
          onDisplayMonthChange={setMonth}
          required
          error={!date}
          aria-describedby={!date ? 'visit-date-error' : 'visit-date-success'}
        />
        {!date
          ? (
            <p id="visit-date-error" className="form_field-error" role="alert">
              방문일을 선택해 주세요.
            </p>
            )
          : (
            <p id="visit-date-success" className="form_field-success" role="status">
              {date}로 선택했습니다.
            </p>
            )}
        <p className="form_field-hint">
          open: <code>{String(open)}</code>
          {' · '}
          displayMonth: <code>{month.getFullYear()}-{String(month.getMonth() + 1).padStart(2, '0')}</code>
        </p>
      </div>
      <div className="form_actions">
        <Button type="button" variant="outline" label={open ? '달력 닫기' : '달력 열기'} onClick={() => setOpen((v) => !v)} />
        <Button type="submit" label="예약" />
      </div>
    </form>
  )
}

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        <code>form_field</code>와 함께 사용합니다. <code>defaultValue</code>는 YYYY-MM-DD입니다.
      </>
    ),
    code: wrapPageExample(`<Field id="date-basic" label="예약일" hint="달력에서 날짜를 선택해 주세요.">
  <DatePicker id="date-basic" fit defaultValue="2024-06-15" />
</Field>`, {
  name: 'DatePickerBasicExample',
  reactImports: [],
  compImports: ['DatePicker', 'Field']
}),
    preview: (
      <Field id="date-basic" label="예약일" hint="달력에서 날짜를 선택해 주세요.">
        <DatePicker id="date-basic" fit defaultValue="2024-06-15" />
      </Field>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 sm · md · lg입니다.
      </>
    ),
    code: wrapPageExample(`<DatePicker id="date-sm" size="sm" defaultValue="2024-06-15" />
<DatePicker id="date-md" defaultValue="2024-06-15" />
<DatePicker id="date-lg" size="lg" defaultValue="2024-06-15" />`, {
  name: 'DatePickerSizeExample',
  reactImports: [],
  compImports: ['DatePicker']
}),
    preview: (
      <div className="demo-stack">
        {(['sm', 'md', 'lg']).map((size) => (
          <Field key={size} id={`date-${size}`} label={size.toUpperCase()}>
            <DatePicker id={`date-${size}`} size={size} defaultValue="2024-06-15" />
          </Field>
        ))}
      </div>
    )
  },
  {
    title: '너비',
    description: (
      <>
        <code>block</code>은 전체 너비, <code>fit</code>은 제한 너비입니다.
      </>
    ),
    code: wrapPageExample(`<DatePicker id="date-full" block defaultValue="2024-06-15" />
<DatePicker id="date-fit" fit defaultValue="2024-06-15" />`, {
  name: 'DatePickerExample3',
  reactImports: [],
  compImports: ['DatePicker']
}),
    preview: (
      <div className="demo-stack">
        <Field id="date-full" label="전체 너비">
          <DatePicker id="date-full" block defaultValue="2024-06-15" />
        </Field>
        <div className="form_field form_field_fit">
          <label className="form_field-label" htmlFor="date-fit">제한 너비</label>
          <DatePicker id="date-fit" fit defaultValue="2024-06-15" />
        </div>
      </div>
    )
  },
  {
    title: '선택 범위',
    description: (
      <>
        <code>min</code> · <code>max</code>로 선택 가능한 날짜를 제한합니다.
      </>
    ),
    code: wrapPageExample(`<DatePicker
  id="date-limits"
  defaultValue="2024-06-15"
  min="2024-06-10"
  max="2024-06-20"
/>`, {
  name: 'DatePickerExample4',
  reactImports: [],
  compImports: ['DatePicker']
}),
    preview: (
      <Field id="date-limits" label="프로모션 기간">
        <DatePicker
          id="date-limits"
          defaultValue="2024-06-15"
          min="2024-06-10"
          max="2024-06-20"
        />
        <p className="form_field-hint">
          2024년 6월 10일부터 20일까지만 선택할 수 있습니다.
        </p>
      </Field>
    )
  },
  {
    title: '상태',
    description: <>비활성·오류·성공 상태를 지원합니다.</>,
    code: wrapPageExample(`<DatePicker id="date-disabled" disabled defaultValue="2024-06-15" />
<DatePicker id="date-error" error />
<DatePicker id="date-success" success defaultValue="2024-06-15" />`, {
  name: 'DatePickerStateExample',
  reactImports: [],
  compImports: ['DatePicker']
}),
    preview: (
      <div className="demo-stack">
        <Field id="date-disabled" label="비활성">
          <DatePicker id="date-disabled" disabled defaultValue="2024-06-15" />
        </Field>
        <div className="form_field">
          <label className="form_field-label" htmlFor="date-error">에러</label>
          <DatePicker id="date-error" error aria-describedby="date-error-message" />
          <p id="date-error-message" className="form_field-error" role="alert">
            날짜를 선택해 주세요.
          </p>
        </div>
        <div className="form_field">
          <label className="form_field-label" htmlFor="date-success">성공</label>
          <DatePicker
            id="date-success"
            success
            defaultValue="2024-06-15"
            aria-describedby="date-success-message"
          />
          <p id="date-success-message" className="form_field-success" role="status">
            예약 가능한 날짜입니다.
          </p>
        </div>
      </div>
    )
  },
  {
    title: '조합 예시',
    description: (
      <>
        제어 <code>value</code> · <code>onChange</code>, <code>open</code> · <code>onOpenChange</code>,
        <code>displayMonth</code> · <code>onDisplayMonthChange</code>, 필수 검증을 조합합니다.
      </>
    ),
    code: wrapPageExample(`const [date, setDate] = useState('')
const [open, setOpen] = useState(false)
const [month, setMonth] = useState(new Date())

<DatePicker
  id="visit-date"
  name="visitDate"
  value={date}
  onChange={setDate}
  open={open}
  onOpenChange={setOpen}
  displayMonth={month}
  onDisplayMonthChange={setMonth}
  required
  error={!date}
/>`, {
      name: 'DatePickerExample',
      reactImports: ['useState'],
      compImports: ['DatePicker']
    }),
    preview: <ControlledExample />
  }
]

/**
 * DatePicker 가이드 화면.
 * docs와 동일한 크기·범위·상태 예시와 API 문서를 모은다.
 */
export default function DatePickerGuide () {
  return (
    <GuideLayout
      category="폼"
      title="DatePicker"
      description="날짜 선택. YYYY-MM-DD 값, open · onOpenChange · displayMonth · onDisplayMonthChange · min · max · clearable을 조합합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="DatePickerExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={datePickerApiSections} />
    </GuideLayout>
  )
}
