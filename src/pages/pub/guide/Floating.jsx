'use client'

import { useRef, useState } from 'react'
import { BackTop, Button, Floating, Icon, Space } from '@/comp'
import {
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  ensurePageModule,
  wrapPageExample
} from '@/pages/pub/widgets/guide'
import { floatingApiSections } from '@/pages/pub/data/guide/floatingApiSections'

const DEMO_PARAS = Array.from({ length: 12 }, (_, index) => (
  <p key={index}>
    스크롤 데모 문단 {index + 1}. Floating 안 BackTop이 target 스크롤 기준으로 나타나는지 확인합니다.
  </p>
))

const DEMO_PARAS_CODE = `Array.from({ length: 12 }, (_, index) => (
  <p key={index}>
    스크롤 데모 문단 {index + 1}. Floating 안 BackTop이 target 스크롤 기준으로 나타나는지 확인합니다.
  </p>
))`

/** 플로팅 보조 액션 버튼(원형 아이콘). iconOnly 는 children 으로 아이콘을 넣는다 */
function FloatAction ({ label = '문의', icon = 'mail', ...rest }) {
  return (
    <Button
      size="md"
      variant="filled"
      color="primary"
      iconOnly
      round
      ariaLabel={label}
      {...rest}
    >
      <Icon name={icon} />
    </Button>
  )
}

/** 내부 스크롤 + Floating(BackTop 포함) — 데모 래퍼 absolute */
function ScrollFloatingDemo ({
  order,
  direction = 'column',
  showChat = true,
  showHelp = false,
  visibilityHeight = 120
}) {
  const scrollerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  return (
    <div className="floating_demo-wrap">
      <div className="floating_demo-scroll" ref={scrollerRef}>
        <div className="floating_demo-content">
          <p>
            우측 Floating 스택(컨테이너). BackTop 표시: <code>{String(visible)}</code>
            {order ? <> · order=<code>{JSON.stringify(order)}</code></> : null}
          </p>
          {DEMO_PARAS}
        </div>
      </div>
      <Floating
        placement="bottom-right"
        offsetBottom={16}
        offsetRight={16}
        gap={10}
        direction={direction}
        order={order}
      >
        {showHelp && (
          <Floating.Item name="help">
            <FloatAction label="도움말" icon="info" />
          </Floating.Item>
        )}
        {showChat && (
          <Floating.Item name="chat">
            <FloatAction label="문의" icon="mail" />
          </Floating.Item>
        )}
        <Floating.Item name="backTop">
          <BackTop
            target={() => scrollerRef.current}
            visibilityHeight={visibilityHeight}
            label="맨 위로"
            onVisibleChange={setVisible}
          />
        </Floating.Item>
      </Floating>
    </div>
  )
}

/** 문서(window · DOM 뷰포트) 기준 Floating — 페이지 스크롤·뷰포트 fixed */
function WindowFloatingDemo () {
  const [visible, setVisible] = useState(false)

  return (
    <div className="floating_demo-window">
      <p>
        이 가이드 <strong>문서(페이지)</strong>를 스크롤하면 <strong>뷰포트 우하단</strong>에
        Floating 스택이 <code>position: fixed</code>로 붙습니다.
        BackTop <code>target</code>도 생략(<code>window</code> · <code>data-target=&quot;window&quot;</code>)입니다.
        내부 스크롤 박스가 아닙니다. BackTop 표시: <code>{String(visible)}</code>
      </p>
      <Floating
        placement="bottom-right"
        offsetBottom={24}
        offsetRight={24}
        gap={10}
      >
        <Floating.Item name="chat">
          <FloatAction label="문의(문서)" icon="mail" />
        </Floating.Item>
        <Floating.Item name="backTop">
          <BackTop
            visibilityHeight={280}
            label="맨 위로(문서)"
            onVisibleChange={setVisible}
          />
        </Floating.Item>
      </Floating>
    </div>
  )
}

const FLOAT_ACTION_CODE = `function FloatAction ({ label = '문의', icon = 'mail', ...rest }) {
  return (
    <Button
      size="md"
      variant="filled"
      color="primary"
      iconOnly
      round
      ariaLabel={label}
      {...rest}
    >
      <Icon name={icon} />
    </Button>
  )
}`

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>Floating</code>은 우측(기본 <code>bottom-right</code>)에 고정되는 액션 스택입니다.
        <code>Floating.Item</code>에 버튼·<code>BackTop</code> 등을 넣습니다.
        BackTop이 안에 있으면 고정 기준은 Floating이며, Top 버튼은 스택 <strong>하단</strong>에 둡니다.
      </>
    ),
    code: wrapPageExample(`${FLOAT_ACTION_CODE}

<div className="floating_demo-wrap floating_demo-preview">
  <Floating
    placement="bottom-right"
    offsetBottom={16}
    offsetRight={16}
    gap={10}
    style={{ position: 'absolute' }}
  >
    <Floating.Item name="chat">
      <FloatAction label="문의" icon="mail" />
    </Floating.Item>
    <Floating.Item name="backTop">
      <BackTop label="맨 위로" />
    </Floating.Item>
  </Floating>
</div>`, {
      name: 'FloatingExample',
      reactImports: [],
      compImports: ['BackTop', 'Button', 'Floating', 'Icon']
    }),
    preview: (
      <div className="floating_demo-wrap floating_demo-preview">
        <Floating placement="bottom-right" offsetBottom={16} offsetRight={16} gap={10} style={{ position: 'absolute' }}>
          <Floating.Item name="chat">
            <FloatAction />
          </Floating.Item>
          <Floating.Item name="backTop">
            <div className="back_top is-visible is-in-floating" data-back-top="" data-in-floating="" style={{ opacity: 1, visibility: 'visible', pointerEvents: 'auto', transform: 'none', position: 'static' }}>
              <button type="button" className="back_top_btn back_top_primary" aria-label="맨 위로">
                <Icon name="chevron-down" className="back_top_icon" aria-hidden />
                <span className="back_top_label">맨 위로</span>
              </button>
            </div>
          </Floating.Item>
        </Floating>
      </div>
    )
  },
  {
    title: '스크롤 · 내부 컨테이너',
    description: (
      <>
        데모 스크롤 박스 + 래퍼 안 <code>absolute</code> Floating입니다.
        BackTop <code>target</code>은 내부 스크롤(<code>data-target=&quot;container&quot;</code>).
        <code>data-in-floating</code>으로 자체 fixed는 해제되고, 스택 위치 기준은 Floating입니다.
      </>
    ),
    code: ensurePageModule(`import { useRef, useState } from 'react'
import { BackTop, Button, Floating, Icon } from '@/comp'

const DEMO_PARAS = ${DEMO_PARAS_CODE}

${FLOAT_ACTION_CODE}

function FloatingScrollExample () {
  const scrollerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  return (
    <div className="floating_demo-wrap">
      <div className="floating_demo-scroll" ref={scrollerRef}>
        <div className="floating_demo-content">
          <p>
            우측 Floating 스택(컨테이너). BackTop 표시: {String(visible)}
          </p>
          {DEMO_PARAS}
        </div>
      </div>
      <Floating
        placement="bottom-right"
        offsetBottom={16}
        offsetRight={16}
        gap={10}
      >
        <Floating.Item name="chat">
          <FloatAction label="문의" icon="mail" />
        </Floating.Item>
        <Floating.Item name="backTop">
          <BackTop
            target={() => scrollerRef.current}
            visibilityHeight={120}
            label="맨 위로"
            onVisibleChange={setVisible}
          />
        </Floating.Item>
      </Floating>
    </div>
  )
}`, 'FloatingScrollExample'),
    preview: <ScrollFloatingDemo />
  },
  {
    title: '스크롤 · 문서(window)',
    description: (
      <>
        Floating 기본은 <code>position: fixed</code>로 <strong>문서 DOM 뷰포트</strong> 우하단에 붙습니다.
        BackTop도 <code>target</code> 생략(<code>window</code>)이라 페이지 스크롤에 반응합니다.
        이 가이드를 스크롤해 확인하세요. 내부 컨테이너 데모와 대비됩니다.
      </>
    ),
    code: ensurePageModule(`import { useState } from 'react'
import { BackTop, Button, Floating, Icon } from '@/comp'

${FLOAT_ACTION_CODE}

function FloatingWindowExample () {
  const [visible, setVisible] = useState(false)

  return (
    <div className="floating_demo-window">
      <p>
        이 가이드 문서(페이지)를 스크롤하면 뷰포트 우하단에 Floating 스택이
        position: fixed 로 붙습니다. BackTop target 도 생략(window · data-target=&quot;window&quot;)입니다.
        내부 스크롤 박스가 아닙니다. BackTop 표시: {String(visible)}
      </p>
      <Floating
        placement="bottom-right"
        offsetBottom={24}
        offsetRight={24}
        gap={10}
      >
        <Floating.Item name="chat">
          <FloatAction label="문의(문서)" icon="mail" />
        </Floating.Item>
        <Floating.Item name="backTop">
          <BackTop
            visibilityHeight={280}
            label="맨 위로(문서)"
            onVisibleChange={setVisible}
          />
        </Floating.Item>
      </Floating>
    </div>
  )
}`, 'FloatingWindowExample'),
    preview: <WindowFloatingDemo />
  },
  {
    title: '순서(order)',
    description: (
      <>
        아이템은 있을 수도·없을 수도 있고, 순서도 바뀔 수 있습니다.
        <code>order=&#123;[&apos;backTop&apos;, &apos;chat&apos;]&#125;</code>처럼
        <code>Floating.Item name</code> 배열로 위→아래 순서를 지정합니다.
        아이템별 <code>order</code> 숫자(CSS order)도 지원합니다.
      </>
    ),
    code: ensurePageModule(`import { useRef, useState } from 'react'
import { BackTop, Button, Floating, Icon, Space } from '@/comp'

const DEMO_PARAS = ${DEMO_PARAS_CODE}

${FLOAT_ACTION_CODE}

function ScrollFloatingDemo ({ order, showHelp = false }) {
  const scrollerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  return (
    <div className="floating_demo-wrap">
      <div className="floating_demo-scroll" ref={scrollerRef}>
        <div className="floating_demo-content">
          <p>
            우측 Floating 스택(컨테이너). BackTop 표시: {String(visible)}
            {' · order='}{JSON.stringify(order)}
          </p>
          {DEMO_PARAS}
        </div>
      </div>
      <Floating
        placement="bottom-right"
        offsetBottom={16}
        offsetRight={16}
        gap={10}
        order={order}
      >
        {showHelp && (
          <Floating.Item name="help">
            <FloatAction label="도움말" icon="info" />
          </Floating.Item>
        )}
        <Floating.Item name="chat">
          <FloatAction label="문의" icon="mail" />
        </Floating.Item>
        <Floating.Item name="backTop">
          <BackTop
            target={() => scrollerRef.current}
            visibilityHeight={120}
            label="맨 위로"
            onVisibleChange={setVisible}
          />
        </Floating.Item>
      </Floating>
    </div>
  )
}

export default function FloatingOrderExample () {
  return (
    <Space vertical block size={24}>
      <ScrollFloatingDemo
        showHelp
        order={['chat', 'help', 'backTop']}
      />
      <ScrollFloatingDemo
        showHelp
        order={['backTop', 'help', 'chat']}
      />
    </Space>
  )
}`),
    preview: (
      <Space vertical block size={24}>
        <ScrollFloatingDemo
          showHelp
          order={['chat', 'help', 'backTop']}
        />
        <ScrollFloatingDemo
          showHelp
          order={['backTop', 'help', 'chat']}
        />
      </Space>
    )
  },
  {
    title: '방향(direction)',
    description: (
      <>
        <code>direction</code>으로 스택 방향을 바꿉니다.
        기본 <code>column</code>은 위→아래(마지막이 하단).
        <code>column-reverse</code>면 시각적 상하가 뒤집힙니다.
      </>
    ),
    code: ensurePageModule(`import { useRef, useState } from 'react'
import { BackTop, Button, Floating, Icon } from '@/comp'

const DEMO_PARAS = ${DEMO_PARAS_CODE}

${FLOAT_ACTION_CODE}

function FloatingDirectionExample () {
  const scrollerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  return (
    <div className="floating_demo-wrap">
      <div className="floating_demo-scroll" ref={scrollerRef}>
        <div className="floating_demo-content">
          <p>
            우측 Floating 스택(컨테이너). BackTop 표시: {String(visible)}
            {' · order=["chat","backTop"] · direction="column-reverse"'}
          </p>
          {DEMO_PARAS}
        </div>
      </div>
      <Floating
        placement="bottom-right"
        offsetBottom={16}
        offsetRight={16}
        gap={10}
        direction="column-reverse"
        order={['chat', 'backTop']}
      >
        <Floating.Item name="chat">
          <FloatAction label="문의" icon="mail" />
        </Floating.Item>
        <Floating.Item name="backTop">
          <BackTop
            target={() => scrollerRef.current}
            visibilityHeight={120}
            label="맨 위로"
            onVisibleChange={setVisible}
          />
        </Floating.Item>
      </Floating>
    </div>
  )
}`, 'FloatingDirectionExample'),
    preview: (
      <ScrollFloatingDemo
        direction="column-reverse"
        order={['chat', 'backTop']}
      />
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>floating</code> · <code>floating_item</code>입니다.
        BackTop이 안에 있으면 <code>back_top is-in-floating</code>이 붙습니다.
      </>
    ),
    code: `<div class="floating_demo-wrap floating_demo-preview">
  <div
    class="floating"
    data-floating
    data-placement="bottom-right"
    data-direction="column"
    style="position: absolute; bottom: 16px; right: 16px; gap: 10px;"
  >
    <div class="floating_item" data-floating-item data-name="chat">
      <button
        type="button"
        class="btn btn_filled color_primary btn_round btn_icon-only"
        aria-label="문의"
      >
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M4 6h16v12H4z" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      </button>
    </div>
    <div class="floating_item" data-floating-item data-name="backTop">
      <div
        class="back_top is-visible is-in-floating"
        data-back-top
        data-in-floating
        data-target="container"
      >
        <button type="button" class="back_top_btn back_top_primary" aria-label="맨 위로">
          <svg class="back_top_icon icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
          <span class="back_top_label">맨 위로</span>
        </button>
      </div>
    </div>
  </div>
</div>`,
    preview: (
      <div className="floating_demo-wrap floating_demo-preview">
        <div
          className="floating"
          data-floating=""
          data-placement="bottom-right"
          data-direction="column"
          style={{ position: 'absolute', bottom: 16, right: 16, gap: 10 }}
        >
          <div className="floating_item" data-floating-item="" data-name="chat">
            <FloatAction />
          </div>
          <div className="floating_item" data-floating-item="" data-name="backTop">
            <div className="back_top is-visible is-in-floating" data-back-top="" data-in-floating="" style={{ opacity: 1, visibility: 'visible', pointerEvents: 'auto', transform: 'none' }}>
              <button type="button" className="back_top_btn back_top_primary" aria-label="맨 위로">
                <Icon name="chevron-down" className="back_top_icon" aria-hidden />
                <span className="back_top_label">맨 위로</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
]

/**
 * Floating 가이드 화면.
 * 우측 플로팅 스택 · BackTop 연동 · order · direction 예시와 API 문서를 모은다.
 */
export default function FloatingGuide () {
  return (
    <GuideLayout
      category="기타"
      title="Floating"
      description="우측 고정 액션 스택. BackTop·버튼을 담고, placement · order · direction으로 위치와 순서를 맞춥니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName={section.title === 'HTML 마크업' ? 'floating.html' : 'FloatingExample.jsx'}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={floatingApiSections} />
    </GuideLayout>
  )
}
