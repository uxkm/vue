'use client'

import { useState } from 'react'
import { Button, Icon, Space, Steps } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { stepsApiSections } from '@/screens/pub/data/guide/stepsApiSections'

const ORDER_ITEMS = [
  { title: '장바구니', desc: '상품 확인' },
  { title: '결제', desc: '수단 선택' },
  { title: '완료', desc: '주문 확정' }
]

const ICON_ITEMS = [
  { title: '계정', desc: '기본 정보', icon: <Icon name="home" size="100%" /> },
  { title: '검색', desc: '조건 설정', icon: <Icon name="search" size="100%" /> },
  { title: '수신', desc: '알림 확인', icon: <Icon name="inbox" size="100%" /> }
]

/** current 를 버튼으로 바꾸는 데모 */
function ControlledSteps (props) {
  const [current, setCurrent] = useState(props.current ?? 1)
  const last = props.items.length - 1

  return (
    <Space vertical block size={16}>
      <Steps {...props} current={current} onChange={setCurrent} />
      <Space size={8}>
        <Button
          variant="outline"
          size="sm"
          label="이전"
          disabled={current <= 0}
          onClick={() => setCurrent((value) => Math.max(0, value - 1))}
        />
        <Button
          variant="outline"
          size="sm"
          label="다음"
          disabled={current >= last}
          onClick={() => setCurrent((value) => Math.min(last, value + 1))}
        />
      </Space>
    </Space>
  )
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>current</code>는 0부터입니다. 그보다 앞은 <code>is-finished</code>, 같으면 <code>is-active</code>,
        뒤는 <code>is-wait</code>입니다. 완료 단계는 체크 아이콘으로 표시됩니다.
      </>
    ),
    code: wrapPageExample(`<Steps
  current={1}
  label="주문 진행 단계"
  items={[
    { title: '장바구니', desc: '상품 확인' },
    { title: '결제', desc: '수단 선택' },
    { title: '완료', desc: '주문 확정' }
  ]}
/>`, {
  name: 'StepsBasicExample',
  reactImports: [],
  compImports: ['Steps']
}),
    preview: (
      <div className="steps_demo-narrow">
        <Steps current={1} label="주문 진행 단계" items={ORDER_ITEMS} />
      </div>
    )
  },
  {
    title: '세로',
    description: (
      <>
        <code>direction=&quot;vertical&quot;</code>이면 <code>steps_vertical</code>이 붙어 세로 타임라인처럼 배치됩니다.
      </>
    ),
    code: wrapPageExample(`<Steps direction="vertical" current={1} items={items} />`, {
  name: 'StepsExample2',
  reactImports: [],
  compImports: ['Steps']
}),
    preview: (
      <div style={{ maxWidth: 280 }}>
        <Steps direction="vertical" current={1} items={ORDER_ITEMS} />
      </div>
    )
  },
  {
    title: '크기 · 정렬 · 점',
    description: (
      <>
        <code>size</code>는 sm · md · lg, <code>align=&quot;center&quot;</code>는 가운데 정렬,
        <code>dot</code>은 숫자 대신 작은 점 인디케이터입니다.
      </>
    ),
    code: wrapPageExample(`<Steps size="sm" current={1} items={items} />
<Steps align="center" current={1} items={items} />
<Steps dot current={1} items={items} />`, {
  name: 'StepsSizeExample',
  reactImports: [],
  compImports: ['Steps']
}),
    preview: (
      <Space vertical block size={24}>
        <div className="steps_demo-narrow">
          <Steps size="sm" current={1} items={ORDER_ITEMS} />
        </div>
        <Steps align="center" current={1} items={ORDER_ITEMS} />
        <div className="steps_demo-narrow">
          <Steps dot current={1} items={ORDER_ITEMS} />
        </div>
      </Space>
    )
  },
  {
    title: '아이콘 · 오류',
    description: (
      <>
        항목에 <code>icon</code>을 넣으면 인디케이터에 표시되고 <code>steps_icon-style</code>이 붙습니다.
        <code>status=&quot;error&quot;</code>이면 <code>is-error</code> 상태입니다.
      </>
    ),
    code: wrapPageExample(`<Steps current={1} items={iconItems} />
<Steps
  current={1}
  items={[
    { title: '입력', desc: '완료', status: 'finish' },
    { title: '검증', desc: '실패', status: 'error' },
    { title: '제출', desc: '대기' }
  ]}
/>`, {
  name: 'StepsIconExample',
  reactImports: [],
  compImports: ['Steps']
}),
    preview: (
      <Space vertical block size={24}>
        <div className="steps_demo-narrow">
          <Steps current={1} items={ICON_ITEMS} />
        </div>
        <div className="steps_demo-narrow">
          <Steps
            current={1}
            items={[
              { title: '입력', desc: '완료', status: 'finish' },
              { title: '검증', desc: '실패', status: 'error' },
              { title: '제출', desc: '대기' }
            ]}
          />
        </div>
      </Space>
    )
  },
  {
    title: '클릭 이동(navigable)',
    description: (
      <>
        <code>navigable</code>과 <code>onChange</code>를 쓰면 완료·현재 단계를 눌러 current를 바꿀 수 있습니다.
        대기 단계는 클릭되지 않습니다.
      </>
    ),
    code: wrapPageExample(`const [current, setCurrent] = useState(1)
<Steps navigable current={current} onChange={setCurrent} items={items} />`, {
      name: 'StepsExample',
      reactImports: ['useState'],
      compImports: ['Steps']
    }),
    preview: (
      <div className="steps_demo-narrow">
        <ControlledSteps navigable current={1} items={ORDER_ITEMS} />
      </div>
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>steps</code> · <code>steps_item</code> · <code>steps_indicator</code> ·
        <code>steps_tail</code> · <code>steps_title</code>입니다.
        상태는 <code>is-finished</code> · <code>is-active</code> · <code>is-wait</code>입니다.
      </>
    ),
    code: `<ol class="steps" aria-label="주문 진행 단계">
  <li class="steps_item is-finished">…</li>
  <li class="steps_item is-active" aria-current="step">…</li>
  <li class="steps_item is-wait">…</li>
</ol>`,
    preview: (
      <div className="steps_demo-narrow">
        <ol className="steps" aria-label="주문 진행 단계">
          <li className="steps_item is-finished">
            <div className="steps_head">
              <span className="steps_indicator" aria-hidden="true">1</span>
              <span className="steps_tail" aria-hidden="true" />
            </div>
            <div className="steps_content">
              <p className="steps_title">장바구니</p>
              <p className="steps_desc">상품 확인</p>
            </div>
          </li>
          <li className="steps_item is-active" aria-current="step">
            <div className="steps_head">
              <span className="steps_indicator" aria-hidden="true">2</span>
              <span className="steps_tail" aria-hidden="true" />
            </div>
            <div className="steps_content">
              <p className="steps_title">결제</p>
              <p className="steps_desc">수단 선택</p>
            </div>
          </li>
          <li className="steps_item is-wait">
            <div className="steps_head">
              <span className="steps_indicator" aria-hidden="true">3</span>
            </div>
            <div className="steps_content">
              <p className="steps_title">완료</p>
              <p className="steps_desc">주문 확정</p>
            </div>
          </li>
        </ol>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        루트 <code>ol</code>에 <code>aria-label</code>(기본 &quot;진행 단계&quot;)을 둡니다.
        현재 단계는 <code>aria-current=&quot;step&quot;</code>, 인디케이터·연결선은 <code>aria-hidden</code>입니다.
      </>
    ),
    code: wrapPageExample(`<Steps label="가입 진행 단계" current={0} items={[{ title: '약관 동의' }]} />`, {
  name: 'StepsA11yExample',
  reactImports: [],
  compImports: ['Steps']
}),
    preview: (
      <Steps label="가입 진행 단계" current={0} items={[{ title: '약관 동의', desc: '필수' }]} />
    )
  }
]

/**
 * Steps 가이드 화면.
 * 기본 · 세로 · 크기 · 아이콘 · navigable 예시와 API 문서를 모은다.
 */
export default function StepsGuide () {
  return (
    <GuideLayout
      category="네비게이션"
      title="Steps"
      description="진행 단계. current · items로 구성하며 vertical · dot · navigable을 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName={section.title === 'HTML 마크업' ? 'steps.html' : 'StepsExample.jsx'}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={stepsApiSections} />
    </GuideLayout>
  )
}
