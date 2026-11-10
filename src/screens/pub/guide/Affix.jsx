'use client'

import { useRef, useState } from 'react'
import { Affix, Button, Link, Space } from '@/comp'
import {
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  ensurePageModule,
  pageExampleCode,
  wrapPageExample
} from '@/screens/pub/widgets/guide'
import { affixApiSections } from '@/screens/pub/data/guide/affixApiSections'

const DEMO_PARAS = Array.from({ length: 10 }, (_, index) => (
  <p key={index}>
    스크롤 데모 문단 {index + 1}. Affix가 컨테이너 상단(또는 하단)에 붙는지 확인합니다.
  </p>
))

const DEMO_PARAS_CODE = `Array.from({ length: 10 }, (_, index) => (
  <p key={index}>
    스크롤 데모 문단 {index + 1}. Affix가 컨테이너 상단(또는 하단)에 붙는지 확인합니다.
  </p>
))`

/** 내부 스크롤 영역에서 상단 고정 */
function ScrollTopAffixDemo ({ offsetTop = 0, label = '선택한 항목 3개' }) {
  const scrollerRef = useRef(null)
  const [fixed, setFixed] = useState(false)

  return (
    <div className="affix_demo-scroll" ref={scrollerRef}>
      <div className="affix_demo-content">
        <p>아래로 스크롤하면 바가 상단에 고정됩니다. 고정: <code>{String(fixed)}</code></p>
      </div>
      <Affix
        target={() => scrollerRef.current}
        offsetTop={offsetTop}
        label={label}
        onChange={setFixed}
        actions={(
          <>
            <Button size="sm" variant="outline" label="취소" />
            <Button size="sm" variant="filled" color="primary" label="적용" />
          </>
        )}
      />
      <div className="affix_demo-content">{DEMO_PARAS}</div>
    </div>
  )
}

/** 내부 스크롤 가시 영역 하단 기준 고정 */
function ScrollBottomAffixDemo () {
  const scrollerRef = useRef(null)
  const [fixed, setFixed] = useState(false)

  return (
    <div className="affix_demo-scroll" ref={scrollerRef}>
      <div className="affix_demo-content">{DEMO_PARAS}</div>
      <Affix
        target={() => scrollerRef.current}
        position="bottom"
        offsetBottom={0}
        label="하단 고정 바"
        onChange={setFixed}
        actions={<Button size="sm" variant="filled" color="primary" label="확인" />}
      />
      <div className="affix_demo-content">
        <p>
          기준: <code>target</code> 내부 스크롤 가시 영역 하단(<code>data-target=&quot;container&quot;</code>).
          문서 window가 아닙니다. 고정: <code>{String(fixed)}</code>
        </p>
      </div>
    </div>
  )
}

/** fixed · onChange 제어 — 스크롤 측정 + 강제 고정 토글 */
function ControlledFixedDemo () {
  const scrollerRef = useRef(null)
  const [fixed, setFixed] = useState(false)

  return (
    <div className="demo-stack">
      <div className="form_actions">
        <Button
          type="button"
          variant="outline"
          size="sm"
          label={fixed ? '고정 해제' : '강제 고정'}
          onClick={() => setFixed((v) => !v)}
        />
        <span className="typo_caption">
          fixed: <code>{String(fixed)}</code>
        </span>
      </div>
      <div className="affix_demo-scroll" ref={scrollerRef}>
        <div className="affix_demo-content">
          <p>
            <code>fixed</code> · <code>onChange</code>로 고정을 제어합니다.
            스크롤하면 콜백으로 갱신되고, 버튼으로도 강제할 수 있습니다.
          </p>
        </div>
        <Affix
          target={() => scrollerRef.current}
          offsetTop={0}
          label="제어 Affix"
          fixed={fixed}
          onChange={setFixed}
          actions={(
            <>
              <Button size="sm" variant="outline" label="취소" />
              <Button size="sm" variant="filled" color="primary" label="적용" />
            </>
          )}
        />
        <div className="affix_demo-content">{DEMO_PARAS}</div>
      </div>
    </div>
  )
}

/** 앵커 스킨 */
function AnchorAffixDemo () {
  const scrollerRef = useRef(null)

  return (
    <div className="affix_demo-page" ref={scrollerRef}>
      <Affix
        target={() => scrollerRef.current}
        skin="anchor"
        offsetTop={0}
      >
        <Link href="#affix-sec-1">소개</Link>
        <Link href="#affix-sec-2">기능</Link>
        <Link href="#affix-sec-3">API</Link>
      </Affix>
      <div className="affix_demo-content">
        <p id="affix-sec-1"><strong>소개</strong> — 앵커 바가 스크롤 시 상단에 남습니다.</p>
        {DEMO_PARAS.slice(0, 4)}
        <p id="affix-sec-2"><strong>기능</strong> — skin=&quot;anchor&quot; 는 affix_anchor 입니다.</p>
        {DEMO_PARAS.slice(4, 8)}
        <p id="affix-sec-3"><strong>API</strong> — children 으로 링크를 직접 넣습니다.</p>
        {DEMO_PARAS.slice(8)}
      </div>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>label</code> · <code>actions</code>로 바를 구성합니다.
        기본 스킨은 <code>bar</code>(<code>affix_bar</code>)이며, 루트는 <code>affix</code> · 너비 100%입니다.
      </>
    ),
    code: wrapPageExample(`<Affix
  label="선택한 항목 3개"
  actions={(
    <>
      <Button size="sm" variant="outline" label="취소" />
      <Button size="sm" variant="filled" color="primary" label="적용" />
    </>
  )}
/>`, {
  name: 'AffixBasicExample',
  reactImports: [],
  compImports: ['Affix', 'Button']
}),
    preview: (
      <Affix
        label="선택한 항목 3개"
        actions={(
          <>
            <Button size="sm" variant="outline" label="취소" />
            <Button size="sm" variant="filled" color="primary" label="적용" />
          </>
        )}
      />
    )
  },
  {
    title: '스크롤 고정',
    description: (
      <>
        고정·오프셋 기준은 <code>target</code>입니다.
        <code>target</code> 생략/<code>window</code> → <strong>문서 뷰포트</strong>(<code>data-target=&quot;window&quot;</code>).
        <code>HTMLElement</code> → <strong>내부 스크롤 가시 영역</strong>(<code>data-target=&quot;container&quot;</code>).
        고정되면 <code>affix_target</code>에 <code>is-fixed</code>가 붙고 placeholder 높이가 맞춰집니다.
      </>
    ),
    code: pageExampleCode({
      name: 'AffixScrollExample',
      reactImports: ['useRef', 'useState'],
      compImports: ['Affix', 'Button'],
      body: `const DEMO_PARAS = ${DEMO_PARAS_CODE}

const scrollerRef = useRef(null)
const [fixed, setFixed] = useState(false)

return (
  <div className="affix_demo-scroll" ref={scrollerRef}>
    <div className="affix_demo-content">
      <p>아래로 스크롤하면 바가 상단에 고정됩니다. 고정: {String(fixed)}</p>
    </div>
    <Affix
      target={() => scrollerRef.current}
      offsetTop={0}
      label="선택한 항목 3개"
      onChange={setFixed}
      actions={(
        <>
          <Button size="sm" variant="outline" label="취소" />
          <Button size="sm" variant="filled" color="primary" label="적용" />
        </>
      )}
    />
    <div className="affix_demo-content">{DEMO_PARAS}</div>
  </div>
)`
    }),
    preview: <ScrollTopAffixDemo />
  },
  {
    title: '고정 제어',
    description: (
      <>
        <code>fixed</code> · <code>onChange</code>로 고정 상태를 페이지에서 제어합니다.
        스크롤 측정 콜백과 함께 쓰면 강제 고정 토글도 가능합니다.
      </>
    ),
    code: pageExampleCode({
      name: 'AffixControlledExample',
      reactImports: ['useRef', 'useState'],
      compImports: ['Affix', 'Button'],
      body: `const scrollerRef = useRef(null)
const [fixed, setFixed] = useState(false)

return (
  <>
    <Button
      type="button"
      variant="outline"
      size="sm"
      label={fixed ? '고정 해제' : '강제 고정'}
      onClick={() => setFixed((v) => !v)}
    />
    <Affix
      target={() => scrollerRef.current}
      offsetTop={0}
      label="제어 Affix"
      fixed={fixed}
      onChange={setFixed}
      actions={(
        <>
          <Button size="sm" variant="outline" label="취소" />
          <Button size="sm" variant="filled" color="primary" label="적용" />
        </>
      )}
    />
  </>
)`
    }),
    preview: <ControlledFixedDemo />
  },
  {
    title: '오프셋 · 하단',
    description: (
      <>
        <code>offsetTop</code>은 target 가시 <strong>상단</strong> 여백,
        <code>position=&quot;bottom&quot;</code> · <code>offsetBottom</code>은 target 가시 <strong>하단</strong> 여백입니다.
        데모는 모두 내부 스크롤(<code>data-target=&quot;container&quot;</code>) 기준이며, 문서 window 하단이 아닙니다.
      </>
    ),
    code: [
      pageExampleCode({
        name: 'AffixOffsetTopExample',
        reactImports: ['useRef', 'useState'],
        compImports: ['Affix', 'Button'],
        body: `const DEMO_PARAS = ${DEMO_PARAS_CODE}

const scrollerRef = useRef(null)
const [fixed, setFixed] = useState(false)

return (
  <div className="affix_demo-scroll" ref={scrollerRef}>
    <div className="affix_demo-content">
      <p>아래로 스크롤하면 바가 상단에 고정됩니다. 고정: {String(fixed)}</p>
    </div>
    <Affix
      target={() => scrollerRef.current}
      offsetTop={12}
      label="offsetTop=12"
      onChange={setFixed}
      actions={(
        <>
          <Button size="sm" variant="outline" label="취소" />
          <Button size="sm" variant="filled" color="primary" label="적용" />
        </>
      )}
    />
    <div className="affix_demo-content">{DEMO_PARAS}</div>
  </div>
)`
      }),
      pageExampleCode({
        name: 'AffixOffsetBottomExample',
        reactImports: ['useRef', 'useState'],
        compImports: ['Affix', 'Button'],
        body: `const DEMO_PARAS = ${DEMO_PARAS_CODE}

const scrollerRef = useRef(null)
const [fixed, setFixed] = useState(false)

return (
  <div className="affix_demo-scroll" ref={scrollerRef}>
    <div className="affix_demo-content">{DEMO_PARAS}</div>
    <Affix
      target={() => scrollerRef.current}
      position="bottom"
      offsetBottom={0}
      label="하단 고정 바"
      onChange={setFixed}
      actions={<Button size="sm" variant="filled" color="primary" label="확인" />}
    />
    <div className="affix_demo-content">
      <p>
        기준: target 내부 스크롤 가시 영역 하단(data-target=&quot;container&quot;).
        문서 window가 아닙니다. 고정: {String(fixed)}
      </p>
    </div>
  </div>
)`
      })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ScrollTopAffixDemo offsetTop={12} label="offsetTop=12" />
        <ScrollBottomAffixDemo />
      </Space>
    )
  },
  {
    title: '앵커(skin)',
    description: (
      <>
        <code>skin=&quot;anchor&quot;</code>이면 <code>affix_anchor</code>가 붙습니다.
        <code>children</code>으로 링크 등을 직접 넣습니다.
      </>
    ),
    code: ensurePageModule(`import { useRef } from 'react'
import { Affix, Link } from '@/comp'

const DEMO_PARAS = ${DEMO_PARAS_CODE}

function AnchorAffixDemo () {
  const scrollerRef = useRef(null)

  return (
    <div className="affix_demo-page" ref={scrollerRef}>
      <Affix
        target={() => scrollerRef.current}
        skin="anchor"
        offsetTop={0}
      >
        <Link href="#affix-sec-1">소개</Link>
        <Link href="#affix-sec-2">기능</Link>
        <Link href="#affix-sec-3">API</Link>
      </Affix>
      <div className="affix_demo-content">
        <p id="affix-sec-1"><strong>소개</strong> — 앵커 바가 스크롤 시 상단에 남습니다.</p>
        {DEMO_PARAS.slice(0, 4)}
        <p id="affix-sec-2"><strong>기능</strong> — skin=&quot;anchor&quot; 는 affix_anchor 입니다.</p>
        {DEMO_PARAS.slice(4, 8)}
        <p id="affix-sec-3"><strong>API</strong> — children 으로 링크를 직접 넣습니다.</p>
        {DEMO_PARAS.slice(8)}
      </div>
    </div>
  )
}`, 'AffixAnchorExample'),
    preview: <AnchorAffixDemo />
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>affix</code> · <code>affix_placeholder</code> · <code>affix_target</code>입니다.
        고정 시 target에 <code>is-fixed</code>가 붙습니다. 기본 바는 <code>affix_bar</code>입니다.
      </>
    ),
    code: `<div class="affix" data-affix data-offset-top="0">
  <div class="affix_placeholder" aria-hidden="true" hidden></div>
  <div class="affix_target affix_bar">
    <span class="affix_bar-label">선택한 항목 3개</span>
    <div class="affix_bar-actions">
      <button type="button" class="btn btn_filled color_primary btn_sm">
        <span class="btn_label">적용</span>
      </button>
    </div>
  </div>
</div>`,
    preview: (
      <div className="affix" data-affix="" data-offset-top="0">
        <div className="affix_placeholder" aria-hidden="true" hidden />
        <div className="affix_target affix_bar">
          <span className="affix_bar-label">선택한 항목 3개</span>
          <div className="affix_bar-actions">
            <Button size="sm" variant="filled" color="primary" label="적용" />
          </div>
        </div>
      </div>
    )
  }
]

/**
 * Affix 가이드 화면.
 * 고정 바 · 스크롤 target · offset · anchor 예시와 API 문서를 모은다.
 */
export default function AffixGuide () {
  return (
    <GuideLayout
      category="기타"
      title="Affix"
      description="스크롤 시 상단·하단에 붙잡는 고정 막대. offsetTop · target · fixed · onChange · skin(bar · anchor) · label · actions를 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName={section.title === 'HTML 마크업' ? 'affix.html' : 'AffixExample.jsx'}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={affixApiSections} />
    </GuideLayout>
  )
}
