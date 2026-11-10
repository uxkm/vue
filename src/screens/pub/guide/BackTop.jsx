'use client'

import { useRef, useState } from 'react'
import { BackTop, Button, Icon, Space } from '@/comp'
import {
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  pageExampleCode,
  wrapPageExample
} from '@/screens/pub/widgets/guide'
import { backTopApiSections } from '@/screens/pub/data/guide/backTopApiSections'

const DEMO_PARAS = Array.from({ length: 12 }, (_, index) => (
  <p key={index}>
    스크롤 데모 문단 {index + 1}. BackTop이 target 스크롤 기준으로 나타나는지 확인합니다.
  </p>
))

const DEMO_PARAS_CODE = `Array.from({ length: 12 }, (_, index) => (
  <p key={index}>
    스크롤 데모 문단 {index + 1}. BackTop이 target 스크롤 기준으로 나타나는지 확인합니다.
  </p>
))`

/** 내부 스크롤 영역 기준 BackTop */
function ScrollBackTopDemo ({
  visibilityHeight = 120,
  variant = 'primary',
  size = 'md',
  label = '맨 위로',
  icon
}) {
  const scrollerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  return (
    <div className="back_top_demo-wrap">
      <div className="back_top_demo-scroll" ref={scrollerRef}>
        <div className="back_top_demo-content">
          <p>
            아래로 스크롤하면 우하단에 버튼이 나타납니다.
            기준: <code>target</code> 내부 스크롤(<code>data-target=&quot;container&quot;</code>).
            표시: <code>{String(visible)}</code>
          </p>
          {DEMO_PARAS}
        </div>
      </div>
      <BackTop
        target={() => scrollerRef.current}
        visibilityHeight={visibilityHeight}
        variant={variant}
        size={size}
        label={label}
        icon={icon}
        onVisibleChange={setVisible}
      />
    </div>
  )
}

/** 문서(window · DOM 뷰포트) 기준 BackTop — 이 가이드 페이지 스크롤에 반응 */
function WindowBackTopDemo () {
  const [visible, setVisible] = useState(false)

  return (
    <div className="back_top_demo-window">
      <p>
        이 가이드 <strong>문서(페이지)</strong>를 스크롤하면 <strong>뷰포트 우하단</strong>에
        버튼이 나타납니다. <code>target</code> 생략 시 <code>window</code>
        (<code>data-target=&quot;window&quot;</code>)입니다. 내부 스크롤 박스가 아닙니다.
        표시: <code>{String(visible)}</code>
      </p>
      <BackTop
        visibilityHeight={280}
        label="맨 위로(문서)"
        onVisibleChange={setVisible}
      />
    </div>
  )
}

/** visible · onVisibleChange 제어 — 스크롤 측정 + 강제 표시 토글 */
function ControlledVisibleDemo () {
  const scrollerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  return (
    <div className="demo-stack">
      <div className="form_actions">
        <Button
          type="button"
          variant="outline"
          size="sm"
          label={visible ? '숨기기' : '강제 표시'}
          onClick={() => setVisible((v) => !v)}
        />
        <span className="typo_caption">
          visible: <code>{String(visible)}</code>
        </span>
      </div>
      <div className="back_top_demo-wrap">
        <div className="back_top_demo-scroll" ref={scrollerRef}>
          <div className="back_top_demo-content">
            <p>
              <code>visible</code> · <code>onVisibleChange</code>로 표시를 제어합니다.
              스크롤 임계값을 넘기면 콜백으로 갱신되고, 버튼으로도 강제할 수 있습니다.
            </p>
            {DEMO_PARAS}
          </div>
        </div>
        <BackTop
          target={() => scrollerRef.current}
          visibilityHeight={120}
          label="맨 위로"
          visible={visible}
          onVisibleChange={setVisible}
        />
      </div>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>label</code> · <code>icon</code>으로 버튼을 구성합니다.
        기본 스킨은 <code>primary</code>(<code>back_top_primary</code>)이며,
        루트는 <code>back_top</code>, 표시 시 <code>is-visible</code>이 붙습니다.
      </>
    ),
    code: wrapPageExample(`<BackTop label="맨 위로" />`, {
      name: 'BackTopExample',
      reactImports: [],
      compImports: ['BackTop']
    }),
    preview: (
      <div className="back_top" data-back-top="" data-target="window" style={{ position: 'static', opacity: 1, visibility: 'visible', pointerEvents: 'auto', transform: 'none' }}>
        <button type="button" className="back_top_btn back_top_primary" aria-label="맨 위로">
          <Icon name="chevron-down" className="back_top_icon" aria-hidden />
          <span className="back_top_label">맨 위로</span>
        </button>
      </div>
    )
  },
  {
    title: '스크롤 · 내부 컨테이너',
    description: (
      <>
        <code>target</code>에 스크롤 요소를 넘기면 <strong>내부 스크롤 가시 영역</strong> 기준입니다
        (<code>data-target=&quot;container&quot;</code>).
        버튼은 데모 래퍼 우하단에 붙습니다.
      </>
    ),
    code: pageExampleCode({
      name: 'BackTopScrollExample',
      reactImports: ['useRef', 'useState'],
      compImports: ['BackTop'],
      body: `const DEMO_PARAS = ${DEMO_PARAS_CODE}

const scrollerRef = useRef(null)
const [visible, setVisible] = useState(false)

return (
  <div className="back_top_demo-wrap">
    <div className="back_top_demo-scroll" ref={scrollerRef}>
      <div className="back_top_demo-content">
        <p>
          아래로 스크롤하면 우하단에 버튼이 나타납니다.
          기준: target 내부 스크롤(data-target=&quot;container&quot;).
          표시: {String(visible)}
        </p>
        {DEMO_PARAS}
      </div>
    </div>
    <BackTop
      target={() => scrollerRef.current}
      visibilityHeight={120}
      label="맨 위로"
      onVisibleChange={setVisible}
    />
  </div>
)`
    }),
    preview: <ScrollBackTopDemo />
  },
  {
    title: '스크롤 · 문서(window)',
    description: (
      <>
        <code>target</code> 생략 또는 <code>window</code>이면 <strong>문서 DOM 뷰포트</strong> 기준입니다
        (<code>data-target=&quot;window&quot;</code>).
        이 가이드 페이지를 스크롤하면 화면(뷰포트) 우하단에 <code>position: fixed</code>로 나타납니다.
      </>
    ),
    code: pageExampleCode({
      name: 'BackTopWindowExample',
      reactImports: ['useState'],
      compImports: ['BackTop'],
      body: `const [visible, setVisible] = useState(false)

return (
  <div className="back_top_demo-window">
    <p>
      이 가이드 문서(페이지)를 스크롤하면 뷰포트 우하단에 버튼이 나타납니다.
      target 생략 시 window(data-target=&quot;window&quot;)입니다. 내부 스크롤 박스가 아닙니다.
      표시: {String(visible)}
    </p>
    <BackTop
      visibilityHeight={280}
      label="맨 위로(문서)"
      onVisibleChange={setVisible}
    />
  </div>
)`
    }),
    preview: <WindowBackTopDemo />
  },
  {
    title: '표시 제어',
    description: (
      <>
        <code>visible</code> · <code>onVisibleChange</code>로 표시를 페이지에서 제어합니다.
        스크롤 측정 콜백과 함께 쓰면 강제 표시 토글도 가능합니다.
      </>
    ),
    code: pageExampleCode({
      name: 'BackTopControlledExample',
      reactImports: ['useRef', 'useState'],
      compImports: ['BackTop', 'Button'],
      body: `const scrollerRef = useRef(null)
const [visible, setVisible] = useState(false)

return (
  <>
    <Button
      type="button"
      variant="outline"
      size="sm"
      label={visible ? '숨기기' : '강제 표시'}
      onClick={() => setVisible((v) => !v)}
    />
    <BackTop
      target={() => scrollerRef.current}
      visibilityHeight={120}
      label="맨 위로"
      visible={visible}
      onVisibleChange={setVisible}
    />
  </>
)`
    }),
    preview: <ControlledVisibleDemo />
  },
  {
    title: '임계값 · 스킨 · 크기',
    description: (
      <>
        <code>visibilityHeight</code>는 target 스크롤 임계값입니다.
        <code>variant</code>는 primary · ghost, <code>size</code>는 sm · md · lg입니다.
        데모는 모두 내부 스크롤(<code>data-target=&quot;container&quot;</code>) 기준입니다.
      </>
    ),
    code: [
      pageExampleCode({
        name: 'BackTopGhostSmExample',
        reactImports: ['useRef', 'useState'],
        compImports: ['BackTop'],
        body: `const DEMO_PARAS = ${DEMO_PARAS_CODE}

const scrollerRef = useRef(null)
const [visible, setVisible] = useState(false)

return (
  <div className="back_top_demo-wrap">
    <div className="back_top_demo-scroll" ref={scrollerRef}>
      <div className="back_top_demo-content">
        <p>
          아래로 스크롤하면 우하단에 버튼이 나타납니다.
          기준: target 내부 스크롤(data-target=&quot;container&quot;).
          표시: {String(visible)}
        </p>
        {DEMO_PARAS}
      </div>
    </div>
    <BackTop
      target={() => scrollerRef.current}
      visibilityHeight={80}
      variant="ghost"
      size="sm"
      label="Top"
      onVisibleChange={setVisible}
    />
  </div>
)`
      }),
      pageExampleCode({
        name: 'BackTopLgExample',
        reactImports: ['useRef', 'useState'],
        compImports: ['BackTop'],
        body: `const DEMO_PARAS = ${DEMO_PARAS_CODE}

const scrollerRef = useRef(null)
const [visible, setVisible] = useState(false)

return (
  <div className="back_top_demo-wrap">
    <div className="back_top_demo-scroll" ref={scrollerRef}>
      <div className="back_top_demo-content">
        <p>
          아래로 스크롤하면 우하단에 버튼이 나타납니다.
          기준: target 내부 스크롤(data-target=&quot;container&quot;).
          표시: {String(visible)}
        </p>
        {DEMO_PARAS}
      </div>
    </div>
    <BackTop
      target={() => scrollerRef.current}
      visibilityHeight={160}
      size="lg"
      label="위로"
      onVisibleChange={setVisible}
    />
  </div>
)`
      })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ScrollBackTopDemo
          visibilityHeight={80}
          variant="ghost"
          size="sm"
          label="Top"
        />
        <ScrollBackTopDemo
          visibilityHeight={160}
          size="lg"
          label="위로"
        />
      </Space>
    )
  },
  {
    title: '아이콘만',
    description: (
      <>
        <code>label={'{null}'}</code>이면 아이콘만 표시됩니다.
        <code>icon={'{false}'}</code>면 아이콘을 숨기고 라벨만 씁니다.
      </>
    ),
    code: pageExampleCode({
      name: 'BackTopIconOnlyExample',
      reactImports: ['useRef', 'useState'],
      compImports: ['BackTop'],
      body: `const DEMO_PARAS = ${DEMO_PARAS_CODE}

const scrollerRef = useRef(null)
const [visible, setVisible] = useState(false)

return (
  <div className="back_top_demo-wrap">
    <div className="back_top_demo-scroll" ref={scrollerRef}>
      <div className="back_top_demo-content">
        <p>
          아래로 스크롤하면 우하단에 버튼이 나타납니다.
          기준: target 내부 스크롤(data-target=&quot;container&quot;).
          표시: {String(visible)}
        </p>
        {DEMO_PARAS}
      </div>
    </div>
    <BackTop
      target={() => scrollerRef.current}
      visibilityHeight={100}
      label={null}
      aria-label="맨 위로"
      onVisibleChange={setVisible}
    />
  </div>
)`
    }),
    preview: (
      <ScrollBackTopDemo
        visibilityHeight={100}
        label={null}
      />
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>back_top</code> · <code>back_top_btn</code>입니다.
        표시 시 루트에 <code>is-visible</code>이 붙습니다.
      </>
    ),
    code: `<div class="back_top is-visible" data-back-top data-target="window" data-visibility-height="200">
  <button type="button" class="back_top_btn back_top_primary" aria-label="맨 위로">
    <svg class="back_top_icon icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
    <span class="back_top_label">맨 위로</span>
  </button>
</div>

<div class="back_top is-visible" data-back-top data-target="window">
  <button type="button" class="back_top_btn back_top_ghost back_top_sm" aria-label="Top">
    <svg class="back_top_icon icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
    <span class="back_top_label">Top</span>
  </button>
</div>

<div class="back_top is-visible" data-back-top data-target="window">
  <button type="button" class="back_top_btn back_top_primary back_top_lg" aria-label="위로">
    <svg class="back_top_icon icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
    <span class="back_top_label">위로</span>
  </button>
</div>`,
    preview: (
      <Space size={12}>
        <div className="back_top" data-back-top="" style={{ position: 'static', opacity: 1, visibility: 'visible', pointerEvents: 'auto', transform: 'none' }}>
          <button type="button" className="back_top_btn back_top_primary" aria-label="맨 위로">
            <Icon name="chevron-down" className="back_top_icon" aria-hidden />
            <span className="back_top_label">맨 위로</span>
          </button>
        </div>
        <div className="back_top" data-back-top="" style={{ position: 'static', opacity: 1, visibility: 'visible', pointerEvents: 'auto', transform: 'none' }}>
          <button type="button" className="back_top_btn back_top_ghost back_top_sm" aria-label="Top">
            <Icon name="chevron-down" className="back_top_icon" aria-hidden />
            <span className="back_top_label">Top</span>
          </button>
        </div>
        <div className="back_top" data-back-top="" style={{ position: 'static', opacity: 1, visibility: 'visible', pointerEvents: 'auto', transform: 'none' }}>
          <button type="button" className="back_top_btn back_top_primary back_top_lg" aria-label="위로">
            <Icon name="chevron-down" className="back_top_icon" aria-hidden />
            <span className="back_top_label">위로</span>
          </button>
        </div>
      </Space>
    )
  }
]

/**
 * BackTop 가이드 화면.
 * 맨 위 버튼 · 스크롤 target · visibilityHeight · variant · size 예시와 API 문서를 모은다.
 */
export default function BackTopGuide () {
  return (
    <GuideLayout
      category="기타"
      title="BackTop"
      description="스크롤 시 나타나는 맨 위 버튼. visibilityHeight · target · visible · onVisibleChange · variant · size · label · icon을 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName={section.title === 'HTML 마크업' ? 'back-top.html' : 'BackTopExample.jsx'}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={backTopApiSections} />
    </GuideLayout>
  )
}
