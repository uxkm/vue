'use client'

import { useState } from 'react'
import { Accordion, AccordionItem, Button, Icon, Space } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { accordionApiSections } from '@/screens/pub/data/guide/accordionApiSections'

const BASIC_ITEMS = [
  { value: 'shipping', label: '배송 안내' },
  { value: 'return', label: '교환 · 반품' },
  { value: 'payment', label: '결제' }
]

const DISABLED_ITEMS = [
  { value: 'a', label: '열림 가능' },
  { value: 'b', label: '비활성', disabled: true },
  { value: 'c', label: '다른 칸' }
]

const CUSTOM_MENU = [
  { value: 'overview', label: '개요', icon: 'home' },
  { value: 'settings', label: '설정', icon: 'settings' },
  { value: 'activity', label: '활동(비활성)', disabled: true }
]

/** 데이터 map + 단일 패널(내용만 교체) */
function ControlledAccordion ({
  items = BASIC_ITEMS,
  initial = items[0]?.value,
  panelPrefix = '콘텐츠',
  ...props
}) {
  const [value, setValue] = useState(initial)
  const active = items.find((item) => item.value === value)

  return (
    <Accordion {...props} value={value} onChange={setValue}>
      {items.map((item) => (
        <AccordionItem
          key={String(item.value)}
          value={item.value}
          label={item.label}
          icon={item.icon}
          extra={item.extra}
          disabled={item.disabled}
        />
      ))}
      <p>{panelPrefix}: {active?.label}</p>
    </Accordion>
  )
}

/** 코드보기용 — items map + 단일 패널 슬롯 */
function compoundCode (options = {}) {
  const {
    props = '',
    items = BASIC_ITEMS,
    panelPrefix = '콘텐츠',
    initial = items[0]?.value,
    wrapStart = '',
    wrapEnd = ''
  } = options
  const propLine = props ? ` ${props}` : ''
  const hasIcon = items.some((item) => item.icon)
  const hasExtra = items.some((item) => item.extra)
  const hasDisabled = items.some((item) => item.disabled)

  const itemsDecl = `const items = [\n${items.map((item) => {
    const fields = [
      `value: '${item.value}'`,
      item.label != null ? `label: '${item.label}'` : null,
      item.disabled ? 'disabled: true' : null,
      item.icon ? 'icon: <Icon name="…" />' : null,
      item.extra ? `extra: '${item.extra}'` : null
    ].filter(Boolean).join(', ')
    return `  { ${fields} }`
  }).join(',\n')}\n]`

  const itemAttrs = [
    'key={item.value}',
    'value={item.value}',
    'label={item.label}',
    hasIcon ? 'icon={item.icon}' : null,
    hasExtra ? 'extra={item.extra}' : null,
    hasDisabled ? 'disabled={item.disabled}' : null
  ].filter(Boolean).join('\n      ')

  const fragment = `${wrapStart}${itemsDecl}
const [value, setValue] = useState('${initial}')
const active = items.find((item) => item.value === value)

<Accordion value={value} onChange={setValue}${propLine}>
  {items.map((item) => (
    <AccordionItem
      ${itemAttrs}
    />
  ))}
  <p>${panelPrefix}: {active?.label}</p>
</Accordion>${wrapEnd}`

  const compImports = ['Accordion', 'AccordionItem']
  if (hasIcon) compImports.push('Icon')

  return wrapPageExample(fragment, {
    name: options.name || 'AccordionExample',
    reactImports: ['useState'],
    compImports
  })
}

/** 메뉴 데이터 map + 아이콘 커스텀 · 패널 내용만 교체 */
function CompoundAccordionDemo () {
  const [value, setValue] = useState('overview')
  const active = CUSTOM_MENU.find((item) => item.value === value)

  return (
    <Accordion value={value} onChange={setValue} skin="bordered">
      {CUSTOM_MENU.map((item) => (
        <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
          {item.icon && (
            <span className="accordion_leading">
              <Icon name={item.icon} size="100%" />
            </span>
          )}
          <span className="accordion_label">{item.label}</span>
        </AccordionItem>
      ))}
      <p>콘텐츠: {active?.label}</p>
    </Accordion>
  )
}

function OverviewSlot () {
  return <p>개요 페이지 슬롯</p>
}

function SettingsSlot () {
  return (
    <Space vertical block size={8}>
      <p>설정 페이지 슬롯</p>
      <Button size="sm" variant="outline" label="저장" />
    </Space>
  )
}

function ActivitySlot () {
  return <p>활동 페이지 슬롯</p>
}

const PANEL_SLOTS = {
  overview: OverviewSlot,
  settings: SettingsSlot,
  activity: ActivitySlot
}

/** 메뉴 map + value → 컴포넌트(슬롯) 패널 */
function SlotPanelAccordionDemo () {
  const [value, setValue] = useState('overview')
  const Panel = PANEL_SLOTS[value]

  return (
    <Accordion value={value} onChange={setValue} skin="card">
      {CUSTOM_MENU.map((item) => (
        <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
          {item.icon && (
            <span className="accordion_leading">
              <Icon name={item.icon} size="100%" />
            </span>
          )}
          <span className="accordion_label">{item.label}</span>
        </AccordionItem>
      ))}
      {Panel ? <Panel key={value} /> : null}
    </Accordion>
  )
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        메뉴는 데이터 <code>map</code>으로 <code>AccordionItem</code>을 돌리고,
        패널은 열린 <code>value</code>에 맞춰 내용만 교체합니다.
        기본 스킨은 <code>bordered</code>(<code>accordion_bordered</code>)입니다.
      </>
    ),
    code: compoundCode({ panelPrefix: '콘텐츠' }),
    preview: (
      <ControlledAccordion />
    )
  },
  {
    title: '스킨(skin)',
    description: (
      <>
        <code>skin</code>은 <code>bordered</code>(기본) · <code>flush</code> · <code>card</code>입니다.
        각각 <code>accordion_bordered</code> · <code>accordion_flush</code> · <code>accordion_card</code>가 붙습니다.
      </>
    ),
    code: [
      compoundCode({ props: 'skin="bordered"', panelPrefix: 'bordered' }),
      compoundCode({ props: 'skin="flush"', panelPrefix: 'flush' }),
      compoundCode({ props: 'skin="card"', panelPrefix: 'card' })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ControlledAccordion skin="bordered" panelPrefix="bordered" />
        <ControlledAccordion skin="flush" panelPrefix="flush" />
        <ControlledAccordion skin="card" panelPrefix="card" />
      </Space>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 <code>sm</code> · <code>md</code>(기본) · <code>lg</code>입니다.
        <code>sm</code> · <code>lg</code>일 때 <code>accordion_sm</code> · <code>accordion_lg</code>가 붙습니다.
      </>
    ),
    code: [
      compoundCode({ props: 'size="sm"', panelPrefix: 'sm' }),
      compoundCode({ props: 'size="md"', panelPrefix: 'md' }),
      compoundCode({ props: 'size="lg"', panelPrefix: 'lg' })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ControlledAccordion size="sm" panelPrefix="sm" />
        <ControlledAccordion size="md" panelPrefix="md" />
        <ControlledAccordion size="lg" panelPrefix="lg" />
      </Space>
    )
  },
  {
    title: '슬라이드(effect)',
    description: (
      <>
        <code>effect=&quot;slide&quot;</code>이면 펼침·접힘 시 패널 높이가 슬라이드됩니다.
        루트에 <code>data-effect=&quot;slide&quot;</code>가 붙고,
        <code>--accordion-slide-duration</code> · <code>--accordion-slide-easing</code>으로 타이밍을 바꿀 수 있습니다.
        <code>prefers-reduced-motion</code>이면 즉시 전환합니다.
      </>
    ),
    code: [
      compoundCode({ props: 'effect="slide"', panelPrefix: 'slide' }),
      compoundCode({
        props: 'effect="slide" skin="card"',
        panelPrefix: 'slide · card'
      })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ControlledAccordion effect="slide" panelPrefix="slide" />
        <ControlledAccordion
          effect="slide"
          skin="card"
          panelPrefix="slide · card"
        />
      </Space>
    )
  },
  {
    title: '커스텀 트리거 · 패널',
    description: (
      <>
        메뉴가 많으면 데이터 <code>map</code>으로 <code>AccordionItem</code>을 반복합니다.
        패널은 열린 <code>value</code>에 맞춰 텍스트만 바꾸거나, 컴포넌트(슬롯)·페이지를 교체해 넣습니다.
      </>
    ),
    code: [
      wrapPageExample(`const menu = [
  { value: 'overview', label: '개요', icon: 'home' },
  { value: 'settings', label: '설정', icon: 'settings' },
  { value: 'activity', label: '활동(비활성)', disabled: true }
]
const [value, setValue] = useState('overview')
const active = menu.find((item) => item.value === value)

<Accordion value={value} onChange={setValue}>
  {menu.map((item) => (
    <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
      {item.icon && (
        <span className="accordion_leading">
          <Icon name={item.icon} size="100%" />
        </span>
      )}
      <span className="accordion_label">{item.label}</span>
    </AccordionItem>
  ))}
  <p>콘텐츠: {active?.label}</p>
</Accordion>`, {
        name: 'AccordionCustomLabelExample',
        reactImports: ['useState'],
        compImports: ['Accordion', 'AccordionItem', 'Icon']
      }),
      wrapPageExample(`const menu = [
  { value: 'overview', label: '개요', icon: 'home' },
  { value: 'settings', label: '설정', icon: 'settings' },
  { value: 'activity', label: '활동(비활성)', disabled: true }
]
const [value, setValue] = useState('overview')
// OverviewPage · SettingsPage · ActivityPage 는 페이지/슬롯 컴포넌트
const panels = {
  overview: OverviewPage,
  settings: SettingsPage,
  activity: ActivityPage
}
const Panel = panels[value]

<Accordion value={value} onChange={setValue} skin="card">
  {menu.map((item) => (
    <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
      {item.icon && (
        <span className="accordion_leading">
          <Icon name={item.icon} size="100%" />
        </span>
      )}
      <span className="accordion_label">{item.label}</span>
    </AccordionItem>
  ))}
  {Panel ? <Panel key={value} /> : null}
</Accordion>`, {
        name: 'AccordionSlotPanelExample',
        reactImports: ['useState'],
        compImports: ['Accordion', 'AccordionItem', 'Icon']
      })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <CompoundAccordionDemo />
        <SlotPanelAccordionDemo />
      </Space>
    )
  },
  {
    title: '비활성 · extra',
    description: (
      <>
        <code>disabled</code>인 칸은 <code>is-disabled</code>이며 열 수 없습니다.
        <code>extra</code>는 트리거 오른쪽(<code>accordion_extra</code>)에 둡니다.
      </>
    ),
    code: [
      compoundCode({
        items: DISABLED_ITEMS,
        initial: 'a',
        panelPrefix: '비활성 예시'
      }),
      compoundCode({
        items: [
          { value: 'faq', label: '자주 묻는 질문', extra: '3' },
          { value: 'notice', label: '공지', extra: 'N' }
        ],
        initial: 'faq',
        panelPrefix: 'extra'
      })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ControlledAccordion
          items={DISABLED_ITEMS}
          initial="a"
          panelPrefix="비활성 예시"
        />
        <ControlledAccordion
          items={[
            { value: 'faq', label: '자주 묻는 질문', extra: '3' },
            { value: 'notice', label: '공지', extra: 'N' }
          ]}
          initial="faq"
          panelPrefix="extra"
        />
      </Space>
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>accordion</code> · <code>accordion_item</code> · <code>accordion_trigger</code> ·
        <code>accordion_panel</code> · <code>accordion_content</code>입니다.
        기본 스킨은 <code>accordion_bordered</code>입니다.
      </>
    ),
    code: `<div class="accordion accordion_bordered">
  <div class="accordion_item is-open">
    <div class="accordion_heading" role="heading" aria-level="3">
      <button type="button" class="accordion_trigger" aria-expanded="true">
        <span class="accordion_label">배송 안내</span>
      </button>
    </div>
    <div class="accordion_panel" role="region">
      <div class="accordion_content">영업일 기준 2~3일 내 출고됩니다.</div>
    </div>
  </div>
  <div class="accordion_item">
    <div class="accordion_heading" role="heading" aria-level="3">
      <button type="button" class="accordion_trigger" aria-expanded="false">
        <span class="accordion_label">교환 · 반품</span>
      </button>
    </div>
  </div>
</div>`,
    preview: (
      <div className="accordion accordion_bordered">
        <div className="accordion_item is-open">
          <div className="accordion_heading" role="heading" aria-level={3}>
            <button type="button" className="accordion_trigger" aria-expanded="true">
              <span className="accordion_label">배송 안내</span>
            </button>
          </div>
          <div className="accordion_panel" role="region">
            <div className="accordion_content">영업일 기준 2~3일 내 출고됩니다.</div>
          </div>
        </div>
        <div className="accordion_item">
          <div className="accordion_heading" role="heading" aria-level={3}>
            <button type="button" className="accordion_trigger" aria-expanded="false">
              <span className="accordion_label">교환 · 반품</span>
            </button>
          </div>
        </div>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        제목은 <code>role=&quot;heading&quot;</code>, 트리거는 <code>aria-expanded</code>와
        <code>aria-controls</code>를 둡니다. 패널은 <code>role=&quot;region&quot;</code>입니다.
      </>
    ),
    code: compoundCode({
      props: 'collapsible',
      items: [
        { value: 'a', label: '일반' },
        { value: 'b', label: '알림' }
      ],
      initial: 'a',
      panelPrefix: '설정'
    }),
    preview: (
      <ControlledAccordion
        collapsible
        items={[
          { value: 'a', label: '일반' },
          { value: 'b', label: '알림' }
        ]}
        initial="a"
        panelPrefix="설정"
      />
    )
  }
]

/**
 * Accordion 가이드 화면.
 * Tabs 와 같이 메뉴는 데이터 map · 패널은 단일 슬롯(내용·컴포넌트 교체) 기준으로 예시를 모은다.
 */
export default function AccordionGuide () {
  return (
    <GuideLayout
      category="기타"
      title="Accordion"
      description="아코디언. 메뉴는 데이터 map으로 AccordionItem을 돌리고, 패널은 열린 value에 맞춰 내용·컴포넌트(슬롯)만 교체합니다. bordered · flush · card · size · effect(slide)를 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName={section.title === 'HTML 마크업' ? 'accordion.html' : 'AccordionExample.jsx'}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={accordionApiSections} />
    </GuideLayout>
  )
}
