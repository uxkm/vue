'use client'

import { useState } from 'react'
import {
  Button,
  Collapse,
  CollapseItem,
  CollapsePanel,
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Icon,
  Space
} from '@/comp'
import { collapseApiSections } from '@/pages/pub/data/guide/collapseApiSections'

const BASIC_ITEMS = [
  { value: 'panel-1', label: '패널 1' },
  { value: 'panel-2', label: '패널 2' },
  { value: 'panel-3', label: '패널 3' }
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

/** 데이터 map + 칸별 패널(여러 칸 동시 열림) */
function ControlledCollapse ({
  items = BASIC_ITEMS,
  initial = items[0] ? [items[0].value] : [],
  panelPrefix = '콘텐츠',
  ...props
}) {
  const [value, setValue] = useState(initial)

  return (
    <Collapse {...props} value={value} onChange={setValue}>
      {items.map((item) => (
        <CollapseItem
          key={String(item.value)}
          value={item.value}
          label={item.label}
          icon={item.icon}
          extra={item.extra}
          disabled={item.disabled}
        />
      ))}
      {items.map((item) => (
        <CollapsePanel key={String(item.value)} value={item.value}>
          <p>{panelPrefix}: {item.label}</p>
        </CollapsePanel>
      ))}
    </Collapse>
  )
}

/** 코드보기용 — items map + CollapsePanel */
function compoundCode (options = {}) {
  const {
    props = '',
    items = BASIC_ITEMS,
    panelPrefix = '콘텐츠',
    initial = items[0] ? [items[0].value] : [],
    wrapStart = '',
    wrapEnd = ''
  } = options
  const propLine = props ? ` ${props}` : ''
  const hasIcon = items.some((item) => item.icon)
  const hasExtra = items.some((item) => item.extra)
  const hasDisabled = items.some((item) => item.disabled)
  const initialLit = `[${initial.map((v) => `'${v}'`).join(', ')}]`

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

  return `${wrapStart}${itemsDecl}
const [value, setValue] = useState(${initialLit})

<Collapse value={value} onChange={setValue}${propLine}>
  {items.map((item) => (
    <CollapseItem
      ${itemAttrs}
    />
  ))}
  {items.map((item) => (
    <CollapsePanel key={item.value} value={item.value}>
      <p>${panelPrefix}: {item.label}</p>
    </CollapsePanel>
  ))}
</Collapse>${wrapEnd}`
}

/** 메뉴 데이터 map + 아이콘 커스텀 · 칸별 패널 */
function CompoundCollapseDemo () {
  const [value, setValue] = useState(['overview'])

  return (
    <Collapse value={value} onChange={setValue} skin="bordered">
      {CUSTOM_MENU.map((item) => (
        <CollapseItem key={item.value} value={item.value} disabled={item.disabled}>
          {item.icon && (
            <span className="collapse_leading">
              <Icon name={item.icon} size="100%" />
            </span>
          )}
          <span className="collapse_label">{item.label}</span>
        </CollapseItem>
      ))}
      {CUSTOM_MENU.map((item) => (
        <CollapsePanel key={item.value} value={item.value}>
          <p>콘텐츠: {item.label}</p>
        </CollapsePanel>
      ))}
    </Collapse>
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
function SlotPanelCollapseDemo () {
  const [value, setValue] = useState(['overview'])

  return (
    <Collapse value={value} onChange={setValue} skin="card">
      {CUSTOM_MENU.map((item) => (
        <CollapseItem key={item.value} value={item.value} disabled={item.disabled}>
          {item.icon && (
            <span className="collapse_leading">
              <Icon name={item.icon} size="100%" />
            </span>
          )}
          <span className="collapse_label">{item.label}</span>
        </CollapseItem>
      ))}
      {CUSTOM_MENU.map((item) => {
        const Panel = PANEL_SLOTS[item.value]
        return (
          <CollapsePanel key={item.value} value={item.value}>
            {Panel ? <Panel /> : null}
          </CollapsePanel>
        )
      })}
    </Collapse>
  )
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        메뉴는 데이터 <code>map</code>으로 <code>CollapseItem</code>을 돌리고,
        패널은 칸별 <code>CollapsePanel</code>로 둡니다. Accordion과 달리
        <code>value</code>는 배열이며 <strong>여러 칸을 동시에</strong> 열 수 있습니다.
        기본 스킨은 <code>bordered</code>(<code>collapse_bordered</code>)입니다.
      </>
    ),
    code: compoundCode({ panelPrefix: '콘텐츠' }),
    preview: <ControlledCollapse />
  },
  {
    title: '스킨(skin)',
    description: (
      <>
        <code>skin</code>은 <code>bordered</code>(기본) · <code>ghost</code> · <code>card</code>입니다.
        각각 <code>collapse_bordered</code> · <code>collapse_ghost</code> · <code>collapse_card</code>가 붙습니다.
      </>
    ),
    code: [
      compoundCode({ props: 'skin="bordered"', panelPrefix: 'bordered' }),
      compoundCode({ props: 'skin="ghost"', panelPrefix: 'ghost' }),
      compoundCode({ props: 'skin="card"', panelPrefix: 'card' })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ControlledCollapse skin="bordered" panelPrefix="bordered" />
        <ControlledCollapse skin="ghost" panelPrefix="ghost" />
        <ControlledCollapse skin="card" panelPrefix="card" />
      </Space>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 <code>sm</code> · <code>md</code>(기본) · <code>lg</code>입니다.
        <code>sm</code> · <code>lg</code>일 때 <code>collapse_sm</code> · <code>collapse_lg</code>가 붙습니다.
      </>
    ),
    code: [
      compoundCode({ props: 'size="sm"', panelPrefix: 'sm' }),
      compoundCode({ props: 'size="md"', panelPrefix: 'md' }),
      compoundCode({ props: 'size="lg"', panelPrefix: 'lg' })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ControlledCollapse size="sm" panelPrefix="sm" />
        <ControlledCollapse size="md" panelPrefix="md" />
        <ControlledCollapse size="lg" panelPrefix="lg" />
      </Space>
    )
  },
  {
    title: '슬라이드(effect)',
    description: (
      <>
        <code>effect=&quot;slide&quot;</code>이면 펼침·접힘 시 패널 높이가 슬라이드됩니다.
        루트에 <code>data-effect=&quot;slide&quot;</code>가 붙고,
        <code>--collapse-slide-duration</code> · <code>--collapse-slide-easing</code>으로 타이밍을 바꿀 수 있습니다.
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
        <ControlledCollapse effect="slide" panelPrefix="slide" />
        <ControlledCollapse
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
        메뉴가 많으면 데이터 <code>map</code>으로 <code>CollapseItem</code>을 반복합니다.
        패널은 칸별 <code>CollapsePanel</code>에 텍스트·컴포넌트(슬롯)·페이지를 넣습니다.
      </>
    ),
    code: `const menu = [
  { value: 'overview', label: '개요', icon: 'home' },
  { value: 'settings', label: '설정', icon: 'settings' },
  { value: 'activity', label: '활동(비활성)', disabled: true }
]
const [value, setValue] = useState(['overview'])

// 1) 메뉴 map + 칸별 패널
<Collapse value={value} onChange={setValue}>
  {menu.map((item) => (
    <CollapseItem key={item.value} value={item.value} disabled={item.disabled}>
      {item.icon && (
        <span className="collapse_leading">
          <Icon name={item.icon} size="100%" />
        </span>
      )}
      <span className="collapse_label">{item.label}</span>
    </CollapseItem>
  ))}
  {menu.map((item) => (
    <CollapsePanel key={item.value} value={item.value}>
      <p>콘텐츠: {item.label}</p>
    </CollapsePanel>
  ))}
</Collapse>

// 2) value → 컴포넌트(슬롯)·페이지
const panels = {
  overview: OverviewPage,
  settings: SettingsPage,
  activity: ActivityPage
}

<Collapse value={value} onChange={setValue} skin="card">
  {menu.map((item) => (
    <CollapseItem key={item.value} value={item.value} disabled={item.disabled}>
      {item.icon && (
        <span className="collapse_leading">
          <Icon name={item.icon} size="100%" />
        </span>
      )}
      <span className="collapse_label">{item.label}</span>
    </CollapseItem>
  ))}
  {menu.map((item) => {
    const Panel = panels[item.value]
    return (
      <CollapsePanel key={item.value} value={item.value}>
        {Panel ? <Panel /> : null}
      </CollapsePanel>
    )
  })}
</Collapse>`,
    preview: (
      <Space vertical block size={24}>
        <CompoundCollapseDemo />
        <SlotPanelCollapseDemo />
      </Space>
    )
  },
  {
    title: '비활성 · extra',
    description: (
      <>
        <code>disabled</code>인 칸은 <code>is-disabled</code>이며 열 수 없습니다.
        <code>extra</code>는 트리거 오른쪽(<code>collapse_extra</code>)에 둡니다.
      </>
    ),
    code: [
      compoundCode({
        items: DISABLED_ITEMS,
        initial: ['a'],
        panelPrefix: '비활성 예시'
      }),
      compoundCode({
        items: [
          { value: 'faq', label: '자주 묻는 질문', extra: '3' },
          { value: 'notice', label: '공지', extra: 'N' }
        ],
        initial: ['faq'],
        panelPrefix: 'extra'
      })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ControlledCollapse
          items={DISABLED_ITEMS}
          initial={['a']}
          panelPrefix="비활성 예시"
        />
        <ControlledCollapse
          items={[
            { value: 'faq', label: '자주 묻는 질문', extra: '3' },
            { value: 'notice', label: '공지', extra: 'N' }
          ]}
          initial={['faq']}
          panelPrefix="extra"
        />
      </Space>
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>collapse_group</code> · <code>collapse_panel</code> · <code>collapse_trigger</code> ·
        <code>collapse_body</code> · <code>collapse_content</code>입니다.
        기본 스킨은 <code>collapse_bordered</code>입니다.
      </>
    ),
    code: `<div class="collapse_group collapse_bordered">
  <div class="collapse_panel is-open">
    <div class="collapse_header">
      <button type="button" class="collapse_trigger" aria-expanded="true">
        <span class="collapse_label">패널 1</span>
      </button>
    </div>
    <div class="collapse_body" role="region">
      <div class="collapse_content">첫 번째 내용입니다.</div>
    </div>
  </div>
  <div class="collapse_panel">
    <div class="collapse_header">
      <button type="button" class="collapse_trigger" aria-expanded="false">
        <span class="collapse_label">패널 2</span>
      </button>
    </div>
  </div>
</div>`,
    preview: (
      <div className="collapse_group collapse_bordered">
        <div className="collapse_panel is-open">
          <div className="collapse_header">
            <button type="button" className="collapse_trigger" aria-expanded="true">
              <span className="collapse_label">패널 1</span>
            </button>
          </div>
          <div className="collapse_body" role="region">
            <div className="collapse_content">첫 번째 내용입니다.</div>
          </div>
        </div>
        <div className="collapse_panel">
          <div className="collapse_header">
            <button type="button" className="collapse_trigger" aria-expanded="false">
              <span className="collapse_label">패널 2</span>
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
        트리거는 <code>aria-expanded</code>와 <code>aria-controls</code>를 둡니다.
        패널 본문은 <code>role=&quot;region&quot;</code>입니다. 여러 칸이 동시에 열려도 각각 연결됩니다.
      </>
    ),
    code: compoundCode({
      items: [
        { value: 'a', label: '일반' },
        { value: 'b', label: '알림' }
      ],
      initial: ['a'],
      panelPrefix: '설정'
    }),
    preview: (
      <ControlledCollapse
        items={[
          { value: 'a', label: '일반' },
          { value: 'b', label: '알림' }
        ]}
        initial={['a']}
        panelPrefix="설정"
      />
    )
  }
]

/**
 * Collapse 가이드 화면.
 * Accordion 과 같이 메뉴는 데이터 map · 패널은 칸별 Panel/슬롯이며, 여러 칸 동시 열림을 지원한다.
 */
export default function CollapseGuide () {
  return (
    <GuideLayout
      category="기타"
      title="Collapse"
      description="접기 패널 그룹. 메뉴는 데이터 map으로 CollapseItem을 돌리고, 패널은 칸별 CollapsePanel·컴포넌트(슬롯)로 둡니다. Accordion과 달리 여러 칸을 동시에 열 수 있으며, bordered · ghost · card · size · effect(slide)를 지원합니다."
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

      <GuideApiDocs sections={collapseApiSections} />
    </GuideLayout>
  )
}
