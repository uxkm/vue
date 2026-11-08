'use client'

import {
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Slider
} from '@/comp'
import { sliderApiSections } from '@/pages/pub/data/guide/sliderApiSections'

const SECTIONS = [
  {
    title: '유형',
    description: (
      <>
        보이는 레이블이 있으면 <code>label</code> + <code>for</code>를, 없으면 <code>aria-label</code>을 사용합니다.
        보조 설명은 <code>aria-describedby</code>, 읽기 쉬운 값은 <code>aria-valuetext</code>를 조합합니다.
      </>
    ),
    code: `<Slider id="…" className="slider_fit" label="label + for — 기본" value={40} showValue />
<Slider className="slider_fit" value={55} aria-label="단독 슬라이더 — aria-label" />
<Slider
  id="…"
  className="slider_fit"
  label="aria-valuetext — 읽기 쉬운 값"
  value={3}
  min={1}
  max={5}
  data-slider-valuetext-map="1:매우 낮음,2:낮음,3:보통,4:높음,5:매우 높음"
  showValue
/>`,
    preview: (
      <div className="demo-stack">
        <Slider
          id="slider-type-label"
          className="slider_fit"
          label="label + for — 기본"
          value={40}
          showValue
        />
        <Slider className="slider_fit" value={55} aria-label="단독 슬라이더 — aria-label" />
        <p className="slider_hint">
          레이블 없이 사용할 때는 <code>aria-label</code>로 접근 가능한 이름을 지정합니다.
        </p>
        <Slider
          id="slider-type-labelledby"
          className="slider_fit"
          label="aria-labelledby — 외부 레이블"
          value={16}
          min={12}
          max={24}
          step={1}
          aria-describedby="slider-type-labelledby-hint"
          data-slider-valuetext-suffix="픽셀"
          showValue
        />
        <p className="slider_hint" id="slider-type-labelledby-hint">
          12~24px 사이 글자 크기
        </p>
        <Slider
          id="slider-type-describedby"
          className="slider_fit"
          label="aria-describedby — 보조 설명"
          value={70}
          aria-describedby="slider-type-describedby-hint"
          data-slider-suffix="%"
          data-slider-valuetext-suffix="퍼센트"
          showValue
        />
        <p className="slider_hint" id="slider-type-describedby-hint">
          0%는 최소, 100%는 최대 대비입니다. 힌트 id를 <code>aria-describedby</code>에 연결합니다.
        </p>
        <Slider
          id="slider-type-valuetext"
          className="slider_fit"
          label="aria-valuetext — 읽기 쉬운 값"
          value={3}
          min={1}
          max={5}
          step={1}
          data-slider-valuetext-map="1:매우 낮음,2:낮음,3:보통,4:높음,5:매우 높음"
          showValue
        />
        <p className="slider_hint">
          숫자 대신 <code>aria-valuetext</code>로 “보통”처럼 읽기 쉬운 값을 전달합니다.
        </p>
      </div>
    )
  },
  {
    title: '기본',
    description: (
      <>
        <code>slider</code> 래퍼 안에 <code>slider_input</code>을 배치합니다. min · max · value로 범위와 초기값을 지정합니다.
      </>
    ),
    code: `<Slider className="slider_fit" value={30} aria-label="기본 슬라이더" />`,
    preview: (
      <div className="demo-stack">
        <Slider className="slider_fit" value={30} aria-label="기본 슬라이더" />
      </div>
    )
  },
  {
    title: '레이블 · 값 표시',
    description: (
      <>
        <code>slider_header</code>에 레이블과 <code>output.slider_value</code>를 함께 사용합니다.
      </>
    ),
    code: `<Slider id="slider-volume" className="slider_fit" label="볼륨" value={60} showValue />
<Slider
  id="slider-brightness"
  className="slider_fit"
  label="밝기"
  value={40}
  data-slider-suffix="%"
  showValue
/>`,
    preview: (
      <div className="demo-stack">
        <Slider id="slider-volume" className="slider_fit" label="볼륨" value={60} showValue />
        <Slider
          id="slider-brightness"
          className="slider_fit"
          label="밝기"
          value={40}
          data-slider-suffix="%"
          showValue
        />
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
    code: `<Slider id="…" size="sm" className="slider_fit" label="Small — slider_sm" value={30} showValue />
<Slider id="…" className="slider_fit" label="Medium — 기본" value={50} showValue />
<Slider id="…" size="lg" className="slider_fit" label="Large — slider_lg" value={70} showValue />`,
    preview: (
      <div className="demo-stack">
        <Slider
          id="slider-size-sm"
          size="sm"
          className="slider_fit"
          label="Small — slider_sm"
          value={30}
          showValue
        />
        <Slider
          id="slider-size-md"
          className="slider_fit"
          label="Medium — 기본"
          value={50}
          showValue
        />
        <Slider
          id="slider-size-lg"
          size="lg"
          className="slider_fit"
          label="Large — slider_lg"
          value={70}
          showValue
        />
      </div>
    )
  },
  {
    title: '너비',
    description: (
      <>
        기본은 부모 100%입니다. <code>slider_fit</code>으로 최대 너비를 제한하고, <code>slider_block</code>으로 전체 너비를 사용합니다.
      </>
    ),
    code: `<Slider className="slider_fit" label="slider_fit — 최대 320px" value={45} showValue />
<Slider className="slider_block" style={{ maxWidth: 480 }} label="slider_block — 전체 너비" value={65} showValue />`,
    preview: (
      <div className="demo-stack">
        <Slider
          id="slider-width-fit"
          className="slider_fit"
          label="slider_fit — 최대 320px"
          value={45}
          showValue
        />
        <Slider
          id="slider-width-block"
          className="slider_block"
          style={{ maxWidth: 480 }}
          label="slider_block — 전체 너비"
          value={65}
          showValue
        />
      </div>
    )
  },
  {
    title: '간격 · 눈금',
    description: <>step으로 증감 단위를 지정합니다.</>,
    code: `<Slider className="slider_fit" label="step=10" value={50} step={10} showValue />`,
    preview: (
      <div className="demo-stack">
        <Slider className="slider_fit" label="step=10" value={50} step={10} showValue />
      </div>
    )
  },
  {
    title: '스텝 버튼',
    description: (
      <>
        <code>stepper</code>는 모바일에서 증감 버튼을 표시합니다. 항상 보이려면 <code>stepperAlways</code>를 함께 씁니다.
      </>
    ),
    code: `<Slider
  className="slider_fit"
  stepper
  label="볼륨 — slider_stepper"
  value={60}
  showValue
  decreaseLabel="볼륨 줄이기"
  increaseLabel="볼륨 늘리기"
/>
<Slider className="slider_fit" stepper stepperAlways label="밝기 — slider_stepper_always" … />`,
    preview: (
      <div className="demo-stack">
        <Slider
          className="slider_fit"
          stepper
          label="볼륨 — slider_stepper"
          value={60}
          showValue
          decreaseLabel="볼륨 줄이기"
          increaseLabel="볼륨 늘리기"
          hint="모바일 화면에서 − / + 버튼이 표시됩니다. 창 너비를 줄여 확인해 보세요."
        />
        <Slider
          className="slider_fit"
          stepper
          stepperAlways
          label="밝기 — slider_stepper_always"
          value={40}
          step={5}
          valueSuffix="%"
          showValue
          decreaseLabel="밝기 줄이기"
          increaseLabel="밝기 늘리기"
          hint="모든 화면 크기에서 스텝 버튼이 표시됩니다. step=5로 5%씩 증감합니다."
        />
        <Slider
          className="slider_fit"
          stepper
          label="비활성"
          value={30}
          showValue
          disabled
        />
      </div>
    )
  },
  {
    title: '색상',
    description: (
      <>
        <code>color_primary</code> · <code>color_success</code> · <code>color_danger</code> · <code>color_warning</code>으로 트랙·썸 색을 지정합니다.
      </>
    ),
    code: `<Slider className="color_primary slider_fit" label="Primary" value={60} showValue />
…`,
    preview: (
      <div className="demo-stack">
        <Slider
          id="slider-color-primary"
          className="color_primary slider_fit"
          label="Primary"
          value={60}
          showValue
        />
        <Slider
          id="slider-color-success"
          className="color_success slider_fit"
          label="Success"
          value={70}
          showValue
        />
        <Slider
          id="slider-color-danger"
          className="color_danger slider_fit"
          label="Danger"
          value={40}
          showValue
        />
        <Slider
          id="slider-color-warning"
          className="color_warning slider_fit"
          label="Warning"
          value={80}
          showValue
        />
      </div>
    )
  },
  {
    title: '상태',
    description: <>비활성 상태를 지원합니다.</>,
    code: `<Slider className="slider_fit" label="기본" value={50} showValue />
<Slider className="slider_fit" label="비활성" value={30} disabled showValue />`,
    preview: (
      <div className="demo-stack">
        <Slider className="slider_fit" label="기본" value={50} showValue />
        <Slider className="slider_fit" label="비활성" value={30} disabled showValue />
      </div>
    )
  },
  {
    title: '폼 레이아웃',
    description: (
      <>
        <code>form_field</code> · <code>form_vertical</code> · <code>form_horizontal</code>과 함께 사용합니다.
      </>
    ),
    code: `<form className="form form_vertical form_fit">
  <div className="form_field">
    <label className="form_field-label" htmlFor="slider-form-opacity">불투명도</label>
    <Slider id="slider-form-opacity" value={85} data-slider-suffix="%" />
    <p className="form_field-hint">0~100% 사이 값</p>
  </div>
</form>`,
    preview: (
      <div className="demo-stack">
        <form className="form form_vertical form_fit" onSubmit={(event) => event.preventDefault()}>
          <div className="form_field">
            <label className="form_field-label" htmlFor="slider-form-opacity">
              불투명도
            </label>
            <Slider id="slider-form-opacity" value={85} data-slider-suffix="%" />
            <p className="form_field-hint">0~100% 사이 값</p>
          </div>
          <div className="form_field">
            <label className="form_field-label" htmlFor="slider-form-zoom">
              확대 비율
            </label>
            <Slider
              id="slider-form-zoom"
              label="현재 값"
              value={125}
              min={50}
              max={200}
              step={25}
              data-slider-suffix="%"
              showValue
            />
          </div>
        </form>
        <form className="form form_horizontal form_fit" onSubmit={(event) => event.preventDefault()}>
          <div className="form_field">
            <label className="form_field-label" htmlFor="slider-form-horizontal">
              선 굵기
            </label>
            <Slider id="slider-form-horizontal" value={3} min={1} max={10} />
            <p className="form_field-hint">1~10px</p>
          </div>
        </form>
      </div>
    )
  }
]

/**
 * Slider 가이드 화면.
 * docs와 동일한 유형·크기·스텝·폼 예시와 API 문서를 모은다.
 */
export default function SliderGuide () {
  return (
    <GuideLayout
      category="폼"
      title="Slider"
      description="범위 값을 조절하는 슬라이더. label · showValue · stepper · size를 조합합니다. ripple은 옵션으로 켭니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={sliderApiSections} />
    </GuideLayout>
  )
}
