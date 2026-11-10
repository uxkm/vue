'use client'

import { useState } from 'react'
import { Switch } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { switchApiSections } from '@/screens/pub/data/guide/switchApiSections'

/** checked · onChange 로 부모가 켜짐 상태를 관리하는 예시 */
function ControlledDemo () {
  const [checked, setChecked] = useState(false)
  const [autoSave, setAutoSave] = useState(true)

  return (
    <div className="demo-stack">
      <Switch
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="동의"
      />
      <Switch
        checked={autoSave}
        onChange={(e) => setAutoSave(e.target.checked)}
        label="자동 저장"
      />
    </div>
  )
}

const SECTIONS = [
  {
    title: '유형',
    description: (
      <>
        기본은 <code>switch_control</code> → <code>switch_label</code> 순서입니다.
        <code>switch_label-end</code>는 레이블 → 스위치 순서이며, 설정 화면에서 자주 사용합니다.
      </>
    ),
    code: wrapPageExample(`<Switch checked label="기본 — switch" />
<Switch labelEnd checked label="레이블 뒤 — switch_label-end" />`, {
  name: 'SwitchExample1',
  reactImports: [],
  compImports: ['Switch']
}),
    preview: (
      <div className="demo-stack">
        <Switch checked label="기본 — switch" />
        <Switch labelEnd checked label="레이블 뒤 — switch_label-end" />
      </div>
    )
  },
  {
    title: '레이블 뒤',
    description: (
      <>
        <code>labelEnd</code>는 레이블 → 스위치 순입니다.
        전체 너비는 <code>switch_block</code> · <code>switch_group_block</code>을 씁니다.
      </>
    ),
    code: wrapPageExample(`<Switch labelEnd checked label="푸시 알림 받기" />
<Switch labelEnd>
  <span className="switch_content">
    <span className="switch_label">마케팅 정보 수신</span>
    <span className="switch_hint">이벤트·할인 소식을 이메일로 받습니다.</span>
  </span>
</Switch>`, {
  name: 'SwitchExample2',
  reactImports: [],
  compImports: ['Switch']
}),
    preview: (
      <div className="demo-stack">
        <Switch labelEnd checked label="푸시 알림 받기" />
        <Switch labelEnd>
          <span className="switch_content">
            <span className="switch_label">마케팅 정보 수신</span>
            <span className="switch_hint">이벤트·할인 소식을 이메일로 받습니다.</span>
          </span>
        </Switch>
        <fieldset
          className="switch_group switch_group_block"
          style={{ maxWidth: 360, width: '100%' }}
        >
          <legend className="switch_group-legend">알림 설정 — switch_group_block</legend>
          <Switch labelEnd checked label="이메일 알림" />
          <Switch labelEnd checked label="푸시 알림" />
          <Switch labelEnd label="SMS 알림" />
        </fieldset>
        <Switch labelEnd size="sm" checked label="Small — switch_sm" />
        <Switch labelEnd size="lg" checked label="Large — switch_lg" />
      </div>
    )
  },
  {
    title: '기본',
    description: (
      <>
        <code>checked !== undefined</code>이면 제어 모드입니다(<code>onChange</code> 유무와 무관).
        부모 <code>useState</code>로 켜짐 상태를 관리합니다.
      </>
    ),
    code: wrapPageExample(`const [checked, setChecked] = useState(false)
const [autoSave, setAutoSave] = useState(true)

<Switch
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="동의"
/>
<Switch
  checked={autoSave}
  onChange={(e) => setAutoSave(e.target.checked)}
  label="자동 저장"
/>`, {
      name: 'SwitchExample',
      reactImports: ['useState'],
      compImports: ['Switch']
    }),
    preview: <ControlledDemo />
  },
  {
    title: '단독 사용',
    description: (
      <>
        레이블 없이 스위치만 사용할 수 있습니다. <code>ariaLabel</code>로 접근 가능한 이름을 지정합니다.
      </>
    ),
    code: wrapPageExample(`<Switch ariaLabel="기능 켜기" />
<Switch checked ariaLabel="기능 끄기" />
<Switch disabled ariaLabel="비활성" />`, {
  name: 'SwitchExample3',
  reactImports: [],
  compImports: ['Switch']
}),
    preview: (
      <div className="demo-stack">
        <Switch ariaLabel="기능 켜기" />
        <Switch checked ariaLabel="기능 끄기" />
        <Switch disabled ariaLabel="비활성" />
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
    code: wrapPageExample(`<Switch labelEnd size="sm" checked label="Small — switch_sm" />
<Switch labelEnd checked label="Medium — 기본" />
<Switch labelEnd size="lg" checked label="Large — switch_lg" />`, {
  name: 'SwitchSizeExample',
  reactImports: [],
  compImports: ['Switch']
}),
    preview: (
      <div className="demo-stack">
        <Switch labelEnd size="sm" checked label="Small — switch_sm" />
        <Switch labelEnd checked label="Medium — 기본" />
        <Switch labelEnd size="lg" checked label="Large — switch_lg" />
      </div>
    )
  },
  {
    title: '너비',
    description: (
      <>
        기본은 인라인(콘텐츠) 너비입니다. <code>switch_block</code> · <code>switch_group_block</code>으로 전체 너비를 사용합니다.
      </>
    ),
    code: wrapPageExample(`<Switch labelEnd checked label="기본 — 인라인 너비" />
<Switch labelEnd className="switch_block" checked label="switch_block — 전체 너비" />
<fieldset className="switch_group switch_group_block">…</fieldset>`, {
  name: 'SwitchExample5',
  reactImports: [],
  compImports: ['Switch']
}),
    preview: (
      <div className="demo-stack">
        <Switch labelEnd checked label="기본 — 인라인 너비" />
        <Switch labelEnd className="switch_block" checked label="switch_block — 전체 너비" />
        <fieldset
          className="switch_group switch_group_block"
          style={{ maxWidth: 360, width: '100%' }}
        >
          <legend className="switch_group-legend">switch_group_block</legend>
          <Switch labelEnd checked label="Wi-Fi" />
          <Switch labelEnd label="블루투스" />
        </fieldset>
      </div>
    )
  },
  {
    title: '색상',
    description: (
      <>
        <code>color_primary</code> · <code>color_success</code> · <code>color_danger</code> · <code>color_warning</code>으로 켜짐 색을 지정합니다.
      </>
    ),
    code: wrapPageExample(`<Switch className="color_primary" labelEnd checked label="Primary" />
…`, {
  name: 'SwitchColorExample',
  reactImports: [],
  compImports: ['Switch']
}),
    preview: (
      <div className="demo-stack">
        <Switch className="color_primary" labelEnd checked label="Primary" />
        <Switch className="color_success" labelEnd checked label="Success" />
        <Switch className="color_danger" labelEnd checked label="Danger" />
        <Switch className="color_warning" labelEnd checked label="Warning" />
      </div>
    )
  },
  {
    title: '상태',
    description: <>켜짐·꺼짐·비활성 상태를 지원합니다.</>,
    code: wrapPageExample(`<Switch labelEnd label="꺼짐" />
<Switch labelEnd checked label="켜짐" />
<Switch labelEnd disabled label="비활성" />`, {
  name: 'SwitchStateExample',
  reactImports: [],
  compImports: ['Switch']
}),
    preview: (
      <div className="demo-stack">
        <Switch labelEnd label="꺼짐" />
        <Switch labelEnd checked label="켜짐" />
        <Switch labelEnd disabled label="비활성" />
        <Switch labelEnd checked disabled label="켜짐 (비활성)" />
      </div>
    )
  },
  {
    title: '그룹',
    description: (
      <>
        <code>switch_group</code>으로 묶습니다. <code>switch_group_compact</code>로 간격을 줄입니다.
      </>
    ),
    code: wrapPageExample(`<fieldset className="switch_group switch_group_block">
  <legend className="switch_group-legend">개인정보 설정</legend>
  <Switch labelEnd checked>
    <span className="switch_content">
      <span className="switch_label">프로필 공개</span>
      <span className="switch_hint">다른 사용자가 내 프로필을 볼 수 있습니다.</span>
    </span>
  </Switch>
  …
</fieldset>`, {
  name: 'SwitchGroupExample',
  reactImports: [],
  compImports: ['Switch']
}),
    preview: (
      <div className="demo-stack">
        <fieldset
          className="switch_group switch_group_block"
          style={{ maxWidth: 400, width: '100%' }}
        >
          <legend className="switch_group-legend">개인정보 설정</legend>
          <Switch labelEnd checked>
            <span className="switch_content">
              <span className="switch_label">프로필 공개</span>
              <span className="switch_hint">다른 사용자가 내 프로필을 볼 수 있습니다.</span>
            </span>
          </Switch>
          <Switch labelEnd>
            <span className="switch_content">
              <span className="switch_label">활동 기록 표시</span>
              <span className="switch_hint">최근 활동이 타임라인에 노출됩니다.</span>
            </span>
          </Switch>
          <Switch labelEnd checked label="검색 허용" />
        </fieldset>
        <fieldset
          className="switch_group switch_group_block switch_group_compact"
          style={{ maxWidth: 400, width: '100%' }}
        >
          <legend className="switch_group-legend">접근성 — switch_group_compact</legend>
          <Switch labelEnd label="고대비 모드" />
          <Switch labelEnd label="애니메이션 줄이기" />
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
    <span className="form_field-label" id="…">알림</span>
    <fieldset className="switch_group switch_group_block" aria-labelledby="…">
      <Switch labelEnd checked label="이메일 알림" />
      <Switch labelEnd label="푸시 알림" />
    </fieldset>
  </div>
</form>`, {
  name: 'SwitchFormExample',
  reactImports: [],
  compImports: ['Switch']
}),
    preview: (
      <div className="demo-stack">
        <form className="form form_vertical form_fit" onSubmit={(event) => event.preventDefault()}>
          <div className="form_field">
            <span className="form_field-label" id="switch-form-vertical-label">
              알림
            </span>
            <fieldset
              className="switch_group switch_group_block"
              aria-labelledby="switch-form-vertical-label"
            >
              <Switch labelEnd checked label="이메일 알림" />
              <Switch labelEnd label="푸시 알림" />
            </fieldset>
          </div>
        </form>
        <form className="form form_horizontal form_fit" onSubmit={(event) => event.preventDefault()}>
          <div className="form_field">
            <span className="form_field-label" id="switch-form-horizontal-label">
              자동 저장
            </span>
            <Switch
              labelEnd
              checked
              label="편집 내용 자동 저장"
              aria-labelledby="switch-form-horizontal-label"
            />
          </div>
        </form>
      </div>
    )
  }
]

/**
 * Switch 가이드 화면.
 * docs와 동일한 유형·크기·그룹·폼 예시와 API 문서를 모은다.
 */
export default function SwitchGuide () {
  return (
    <GuideLayout
      category="폼"
      title="Switch"
      description="켜짐·꺼짐을 전환하는 스위치. checked · onChange로 제어하고 label · labelEnd · size · 그룹을 조합합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="SwitchExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={switchApiSections} />
    </GuideLayout>
  )
}
