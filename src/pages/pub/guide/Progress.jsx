'use client'

import { useEffect, useState } from 'react'
import { Button, Progress, Space } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/pages/pub/widgets/guide'
import { progressApiSections } from '@/pages/pub/data/guide/progressApiSections'

/** 원형 진행률 — React Progress 는 막대만 렌더링하므로 HTML 마크업 그대로 보여준다 */
function CircleProgress ({ percent, className, children }) {
  return (
    <div
      className={['progress', 'progress_circle', className].filter(Boolean).join(' ')}
      style={{ '--progress-percent': percent }}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="진행률"
    >
      <svg className="progress_circle-svg" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="progress_circle-track" cx="50" cy="50" r="45" />
        <circle className="progress_circle-bar" cx="50" cy="50" r="45" />
      </svg>
      <span className="progress_circle-value">{children ?? `${percent}%`}</span>
    </div>
  )
}

/** percent 를 버튼으로 바꿔 보는 예시 */
function InteractiveDemo () {
  const [percent, setPercent] = useState(30)
  const status = percent >= 100 ? 'success' : ''

  return (
    <Space vertical block size={14}>
      <Progress percent={percent} status={status} showInfo />
      <Space size={8}>
        <Button variant="outline" label="-10%" onClick={() => setPercent((value) => Math.max(0, value - 10))} />
        <Button variant="outline" label="+10%" onClick={() => setPercent((value) => Math.min(100, value + 10))} />
        <Button variant="outline" label="초기화" onClick={() => setPercent(0)} />
      </Space>
    </Space>
  )
}

/** 시간이 지나며 차오르는 줄무늬 예시 */
function AutoDemo () {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((value) => (value >= 100 ? 0 : value + 5))
    }, 400)
    return () => clearInterval(timer)
  }, [])

  return <Progress percent={percent} striped animated showInfo />
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        <code>percent</code>(0~100)만큼 막대가 채워집니다. <code>showInfo</code>를 켜면 막대 옆에 퍼센트 숫자가 표시됩니다.
        0 미만 · 100 초과 · 숫자가 아닌 값은 0~100 으로 보정됩니다.
      </>
    ),
    code: wrapPageExample(`<Progress percent={25} showInfo />
<Progress percent={62} showInfo />
<Progress percent={150} showInfo />`, {
  name: 'ProgressBasicExample',
  reactImports: [],
  compImports: ['Progress']
}),
    preview: (
      <Space vertical block size={14}>
        <Progress percent={25} showInfo />
        <Progress percent={62} showInfo />
        <Progress percent={150} showInfo />
      </Space>
    )
  },
  {
    title: '색상',
    description: (
      <>
        <code>color</code>는 <code>primary</code>(기본) · <code>success</code> · <code>warning</code> · <code>danger</code> ·
        <code>muted</code>를 받아 막대 <code>.progress_bar</code>에 <code>color_{'{값}'}</code> 클래스가 붙습니다.
      </>
    ),
    code: wrapPageExample(`<Progress percent={60} color="primary" showInfo />
<Progress percent={60} color="success" showInfo />
<Progress percent={60} color="warning" showInfo />
<Progress percent={60} color="danger" showInfo />
<Progress percent={60} color="muted" showInfo />`, {
  name: 'ProgressColorExample',
  reactImports: [],
  compImports: ['Progress']
}),
    preview: (
      <Space vertical block size={14}>
        <Progress percent={60} color="primary" showInfo />
        <Progress percent={60} color="success" showInfo />
        <Progress percent={60} color="warning" showInfo />
        <Progress percent={60} color="danger" showInfo />
        <Progress percent={60} color="muted" showInfo />
      </Space>
    )
  },
  {
    title: '상태',
    description: (
      <>
        <code>status</code>가 <code>success</code>이면 루트에 <code>is-success</code>, <code>exception</code>이면 <code>is-exception</code>이 붙어
        막대가 성공 · 위험 색으로 바뀌고, 안내 문구는 각각 &quot;완료&quot; · &quot;실패&quot;가 됩니다.
        <code>label</code>을 주면 상태 문구보다 우선해 그대로 표시됩니다.
      </>
    ),
    code: wrapPageExample(`<Progress percent={100} status="success" showInfo />
<Progress percent={40} status="exception" showInfo />
<Progress percent={70} showInfo label="3 / 4 단계" />`, {
  name: 'ProgressStateExample',
  reactImports: [],
  compImports: ['Progress']
}),
    preview: (
      <Space vertical block size={14}>
        <Progress percent={100} status="success" showInfo />
        <Progress percent={40} status="exception" showInfo />
        <Progress percent={70} showInfo label="3 / 4 단계" />
      </Space>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 <code>sm</code> · <code>md</code>(기본) · <code>lg</code>입니다.
        <code>sm</code> · <code>lg</code>일 때 루트에 <code>progress_sm</code> · <code>progress_lg</code>가 붙어 막대 두께와 글자 크기가 바뀝니다.
      </>
    ),
    code: wrapPageExample(`<Progress size="sm" percent={50} showInfo />
<Progress size="md" percent={50} showInfo />
<Progress size="lg" percent={50} showInfo />`, {
  name: 'ProgressSizeExample',
  reactImports: [],
  compImports: ['Progress']
}),
    preview: (
      <Space vertical block size={14}>
        <Progress size="sm" percent={50} showInfo />
        <Progress size="md" percent={50} showInfo />
        <Progress size="lg" percent={50} showInfo />
      </Space>
    )
  },
  {
    title: '줄무늬 · 애니메이션',
    description: (
      <>
        <code>striped</code>는 루트에 대각선 줄무늬(<code>progress_striped</code>)를, <code>animated</code>는 줄무늬가 흐르는 효과(<code>progress_animated</code>)를 더합니다.
        <code>animated</code>는 <code>striped</code>와 함께 써야 움직입니다.
      </>
    ),
    code: wrapPageExample(`<Progress percent={45} striped showInfo />
<Progress percent={45} striped animated showInfo />`, {
  name: 'ProgressExample5',
  reactImports: [],
  compImports: ['Progress']
}),
    preview: (
      <Space vertical block size={14}>
        <Progress percent={45} striped showInfo />
        <Progress percent={45} striped animated showInfo />
        <AutoDemo />
      </Space>
    )
  },
  {
    title: '불확정(indeterminate)',
    description: (
      <>
        <code>indeterminate</code>이면 루트에 <code>is-indeterminate</code>가 붙어 막대가 좌우로 계속 움직입니다.
        진행률을 알 수 없을 때 쓰며, <code>aria-valuenow</code>는 생략됩니다.
      </>
    ),
    code: wrapPageExample(`<Progress indeterminate />
<Progress indeterminate color="success" size="lg" />`, {
  name: 'ProgressExample6',
  reactImports: [],
  compImports: ['Progress']
}),
    preview: (
      <Space vertical block size={14}>
        <Progress indeterminate />
        <Progress indeterminate color="success" size="lg" />
      </Space>
    )
  },
  {
    title: '막대 안 텍스트',
    description: (
      <>
        <code>inside</code>를 켜고 <code>showInfo</code>와 함께 쓰면 퍼센트 숫자가 막대 안(<code>progress_info</code>)에 표시됩니다.
        트랙 배경은 투명해지고 막대 최소 너비가 확보되므로 두께가 있는 <code>size=&quot;lg&quot;</code>와 잘 어울립니다.
      </>
    ),
    code: wrapPageExample(`<Progress inside showInfo percent={60} size="lg" />
<Progress inside showInfo percent={80} size="lg" color="success" />`, {
  name: 'ProgressTextExample',
  reactImports: [],
  compImports: ['Progress']
}),
    preview: (
      <Space vertical block size={14}>
        <Progress inside showInfo percent={60} size="lg" />
        <Progress inside showInfo percent={80} size="lg" color="success" />
      </Space>
    )
  },
  {
    title: '너비',
    description: (
      <>
        기본 너비는 <code>--progress-max-width</code>(입력 필드 최대 너비)이며, 부모보다 넓으면 <code>max-width: 100%</code>로 줄어듭니다.
        <code>block</code>을 켜면 <code>progress_block</code>이 붙어 최대 너비 제한 없이 부모 너비를 채웁니다.
      </>
    ),
    code: wrapPageExample(`<Progress percent={50} />
<Progress percent={50} block />`, {
  name: 'ProgressExample8',
  reactImports: [],
  compImports: ['Progress']
}),
    preview: (
      <Space vertical block size={14}>
        <Progress percent={50} />
        <Progress percent={50} block />
      </Space>
    )
  },
  {
    title: '값 제어',
    description: (
      <>
        <code>percent</code>를 상태로 관리해 갱신합니다. 100 에 도달하면 <code>status=&quot;success&quot;</code>로 바꿔 완료를 표시하는 식으로 조합합니다.
      </>
    ),
    code: wrapPageExample(`const [percent, setPercent] = useState(30)

<Progress percent={percent} status={percent >= 100 ? 'success' : ''} showInfo />
<Button variant="outline" label="+10%" onClick={() => setPercent((v) => Math.min(100, v + 10))} />`, {
      name: 'ProgressExample',
      reactImports: ['useState'],
      compImports: ['Progress', 'Button']
    }),
    preview: <InteractiveDemo />
  },
  {
    title: '원형 (HTML 마크업)',
    description: (
      <>
        스타일에는 원형(<code>progress_circle</code>)이 있지만 React <code>Progress</code>는 렌더링하지 않습니다.
        SVG 마크업을 직접 작성하고 <code>--progress-percent</code>(0~100)로 채움을 지정합니다.
        크기는 <code>progress_sm</code> · <code>progress_lg</code>, 색은 루트에 <code>color_success</code> 등을 붙입니다.
      </>
    ),
    code: `<div class="progress progress_circle" style="--progress-percent: 65" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" aria-label="진행률">
  <svg class="progress_circle-svg" viewBox="0 0 100 100" aria-hidden="true">
    <circle class="progress_circle-track" cx="50" cy="50" r="45" />
    <circle class="progress_circle-bar" cx="50" cy="50" r="45" />
  </svg>
  <span class="progress_circle-value">65%</span>
</div>`,
    preview: (
      <Space size={24} wrap>
        <CircleProgress percent={30} className="progress_sm" />
        <CircleProgress percent={65} />
        <CircleProgress percent={85} className="progress_lg color_success" />
        <CircleProgress percent={40} className="color_danger" />
      </Space>
    )
  },
  {
    title: '헤더 · 라벨 (HTML 마크업)',
    description: (
      <>
        <code>progress_header</code> 안에 <code>progress_label</code> · <code>progress_value</code>를 넣으면 막대 위에 제목과 수치를 한 줄로 배치합니다.
        트랙에 직접 <code>role=&quot;progressbar&quot;</code>를 둡니다. 루트에 <code>progress_fit</code>을 붙이면 최대 너비가 적용됩니다.
      </>
    ),
    code: `<div class="progress progress_fit">
  <div class="progress_header">
    <span class="progress_label">업로드 중</span>
    <span class="progress_value">60%</span>
  </div>
  <div class="progress_track" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" aria-label="업로드 진행률">
    <span class="progress_bar" style="width: 60%"></span>
  </div>
</div>`,
    preview: (
      <div className="progress progress_fit">
        <div className="progress_header">
          <span className="progress_label">업로드 중</span>
          <span className="progress_value">60%</span>
        </div>
        <div
          className="progress_track"
          role="progressbar"
          aria-valuenow={60}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="업로드 진행률"
        >
          <span className="progress_bar" style={{ width: '60%' }} />
        </div>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        루트에 <code>role=&quot;progressbar&quot;</code>와 <code>aria-valuemin</code> · <code>aria-valuemax</code> · <code>aria-valuenow</code>가 지정됩니다
        (<code>indeterminate</code>일 때 <code>aria-valuenow</code> 생략).
        <code>aria-label</code>은 <code>ariaLabel</code> → <code>label</code> → &quot;진행률&quot; 순으로 정해지므로, 화면에 문구가 없으면 <code>ariaLabel</code>로 목적을 알려 주세요.
      </>
    ),
    code: wrapPageExample(`<Progress percent={40} ariaLabel="파일 업로드 진행률" showInfo />`, {
  name: 'ProgressA11yExample',
  reactImports: [],
  compImports: ['Progress']
}),
    preview: <Progress percent={40} ariaLabel="파일 업로드 진행률" showInfo />
  }
]

/**
 * Progress 가이드 화면.
 * 기본 사용, 색상, 상태, 크기, 줄무늬, 불확정, 원형 예시와 API 문서를 모은다.
 */
export default function ProgressGuide () {
  return (
    <GuideLayout
      category="피드백"
      title="Progress"
      description="진행률 표시. percent · status · color · size로 구성하며 줄무늬 · 불확정 · 막대 안 텍스트를 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName={section.title.includes('HTML') ? 'progress.html' : 'ProgressExample.jsx'}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={progressApiSections} />
    </GuideLayout>
  )
}
