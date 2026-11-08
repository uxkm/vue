'use client'

import { useState } from 'react'
import {
  Button,
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Icon,
  Space,
  Tab,
  Tabs
} from '@/comp'
import { tabsApiSections } from '@/pages/pub/data/guide/tabsApiSections'

const BASIC_TABS = [
  { value: 'overview', label: '개요' },
  { value: 'settings', label: '설정' },
  { value: 'activity', label: '활동' }
]

const ICON_TABS = [
  { value: 'home', label: '홈', icon: <Icon name="home" size="100%" /> },
  { value: 'search', label: '검색', icon: <Icon name="search" size="100%" /> },
  { value: 'inbox', label: '수신함', icon: <Icon name="inbox" size="100%" /> }
]

const DISABLED_TABS = [
  { value: 'a', label: '활성' },
  { value: 'b', label: '비활성', disabled: true },
  { value: 'c', label: '대기' }
]

const MANY_TABS = Array.from({ length: 16 }, (_, index) => ({
  value: `t-${index + 1}`,
  label: `메뉴 항목 ${index + 1}`
}))

const CUSTOM_MENU = [
  { value: 'overview', label: '개요', icon: 'home' },
  { value: 'settings', label: '설정', icon: 'settings' },
  { value: 'activity', label: '활동(비활성)', disabled: true }
]

/** 데이터 map + 단일 패널(내용만 교체) */
function ControlledTabs ({
  tabs = BASIC_TABS,
  initial = tabs[0]?.value,
  panelPrefix = '콘텐츠',
  ...props
}) {
  const [value, setValue] = useState(initial)
  const active = tabs.find((tab) => tab.value === value) || tabs[0]

  return (
    <Tabs {...props} value={value} onChange={setValue}>
      {tabs.map((tab) => (
        <Tab
          key={String(tab.value)}
          value={tab.value}
          label={tab.label}
          icon={tab.icon}
          disabled={tab.disabled}
          closable={tab.closable}
        />
      ))}
      <p className="tabs_panel-placeholder">
        {panelPrefix}: {active?.label}
      </p>
    </Tabs>
  )
}

/** 코드보기용 — tabs map + 단일 패널 슬롯 */
function compoundCode (options = {}) {
  const {
    props = '',
    tabs = BASIC_TABS,
    panelPrefix = '콘텐츠',
    initial = tabs[0]?.value,
    wrapStart = '',
    wrapEnd = ''
  } = options
  const propLine = props ? ` ${props}` : ''
  const hasIcon = tabs.some((tab) => tab.icon)
  const hasDisabled = tabs.some((tab) => tab.disabled)
  const hasClosable = tabs.some((tab) => tab.closable)

  const tabsDecl = tabs.length > 6
    ? `const tabs = Array.from({ length: ${tabs.length} }, (_, index) => ({\n` +
      `  value: \`t-\${index + 1}\`,\n` +
      `  label: \`메뉴 항목 \${index + 1}\`\n` +
      '}))'
    : `const tabs = [\n${tabs.map((tab) => {
      const fields = [
        `value: '${tab.value}'`,
        tab.label != null ? `label: '${tab.label}'` : null,
        tab.disabled ? 'disabled: true' : null,
        tab.closable ? 'closable: true' : null,
        tab.icon ? 'icon: <Icon name="…" size="100%" />' : null
      ].filter(Boolean).join(', ')
      return `  { ${fields} }`
    }).join(',\n')}\n]`

  const tabAttrs = [
    'key={tab.value}',
    'value={tab.value}',
    'label={tab.label}',
    hasIcon ? 'icon={tab.icon}' : null,
    hasDisabled ? 'disabled={tab.disabled}' : null,
    hasClosable ? 'closable={tab.closable}' : null
  ].filter(Boolean).join('\n      ')

  return `${wrapStart}${tabsDecl}
const [value, setValue] = useState('${initial}')
const active = tabs.find((tab) => tab.value === value)

<Tabs value={value} onChange={setValue}${propLine}>
  {tabs.map((tab) => (
    <Tab
      ${tabAttrs}
    />
  ))}
  <p className="tabs_panel-placeholder">${panelPrefix}: {active?.label}</p>
</Tabs>${wrapEnd}`
}

/** 메뉴 데이터 map + 아이콘 커스텀 · 패널 내용만 교체 */
function CompoundTabsDemo () {
  const [value, setValue] = useState('overview')
  const active = CUSTOM_MENU.find((tab) => tab.value === value)

  return (
    <Tabs value={value} onChange={setValue} indicatorSlide>
      {CUSTOM_MENU.map((tab) => (
        <Tab key={tab.value} value={tab.value} disabled={tab.disabled}>
          {tab.icon && (
            <span className="tabs_icon">
              <Icon name={tab.icon} size="100%" />
            </span>
          )}
          <span className="tabs_label">{tab.label}</span>
        </Tab>
      ))}
      <p className="tabs_panel-placeholder">콘텐츠: {active?.label}</p>
    </Tabs>
  )
}

function OverviewSlot () {
  return <p className="tabs_panel-placeholder">개요 페이지 슬롯</p>
}

function SettingsSlot () {
  return (
    <Space vertical block size={8}>
      <p className="tabs_panel-placeholder">설정 페이지 슬롯</p>
      <Button size="sm" variant="outline" label="저장" />
    </Space>
  )
}

function ActivitySlot () {
  return <p className="tabs_panel-placeholder">활동 페이지 슬롯</p>
}

const PANEL_SLOTS = {
  overview: OverviewSlot,
  settings: SettingsSlot,
  activity: ActivitySlot
}

/** 메뉴 map + value → 컴포넌트(슬롯) 패널 */
function SlotPanelTabsDemo () {
  const [value, setValue] = useState('overview')
  const Panel = PANEL_SLOTS[value]

  return (
    <Tabs value={value} onChange={setValue} indicatorSlide>
      {CUSTOM_MENU.map((tab) => (
        <Tab key={tab.value} value={tab.value} disabled={tab.disabled}>
          {tab.icon && (
            <span className="tabs_icon">
              <Icon name={tab.icon} size="100%" />
            </span>
          )}
          <span className="tabs_label">{tab.label}</span>
        </Tab>
      ))}
      {Panel ? <Panel key={value} /> : null}
    </Tabs>
  )
}

/** 닫기 가능한 탭 — 메뉴 map · 패널 내용 교체 */
function ClosableTabsDemo () {
  const [items, setItems] = useState([
    { value: 'doc-1', label: '문서 1', closable: true },
    { value: 'doc-2', label: '문서 2', closable: true },
    { value: 'doc-3', label: '문서 3', closable: true }
  ])
  const [value, setValue] = useState('doc-1')
  const active = items.find((tab) => tab.value === value)

  const onClose = (closed) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.value !== closed)
      if (closed === value && next.length) {
        setValue(next[0].value)
      } else if (!next.length) {
        setValue('')
      }
      return next
    })
  }

  if (!items.length) {
    return (
      <Space vertical block size={12}>
        <p className="tabs_panel-placeholder">열린 탭이 없습니다.</p>
        <Button
          size="sm"
          variant="outline"
          label="탭 다시 열기"
          onClick={() => {
            setItems([
              { value: 'doc-1', label: '문서 1', closable: true },
              { value: 'doc-2', label: '문서 2', closable: true }
            ])
            setValue('doc-1')
          }}
        />
      </Space>
    )
  }

  return (
    <Tabs
      value={value}
      onChange={setValue}
      onClose={onClose}
      extra={<Button size="sm" variant="ghost" label="추가" />}
    >
      {items.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          closable={tab.closable}
        />
      ))}
      <p className="tabs_panel-placeholder">{active?.label} 내용</p>
    </Tabs>
  )
}

const SECTIONS = [
  {
    title: '기본 사용',
    description: (
      <>
        메뉴는 데이터 <code>map</code>으로 <code>Tab</code>을 돌리고, 패널은 활성 값에 맞춰 내용만 교체합니다.
        기본 스킨은 <code>line</code>(<code>tabs_line</code>)이며, 선택 탭에 <code>is-active</code>와
        <code>aria-selected</code>가 붙습니다.
      </>
    ),
    code: compoundCode({ panelPrefix: '콘텐츠' }),
    preview: <ControlledTabs />
  },
  {
    title: '변형(variant)',
    description: (
      <>
        <code>variant</code>는 <code>line</code>(기본) · <code>card</code> · <code>pill</code>입니다.
        각각 <code>tabs_line</code> · <code>tabs_card</code> · <code>tabs_pill</code>이 붙습니다.
      </>
    ),
    code: [
      compoundCode({ props: 'variant="line"', panelPrefix: 'line' }),
      compoundCode({ props: 'variant="card"', panelPrefix: 'card' }),
      compoundCode({ props: 'variant="pill"', panelPrefix: 'pill' })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ControlledTabs variant="line" panelPrefix="line" />
        <ControlledTabs variant="card" panelPrefix="card" />
        <ControlledTabs variant="pill" panelPrefix="pill" />
      </Space>
    )
  },
  {
    title: '인디케이터 슬라이드',
    description: (
      <>
        <code>indicatorSlide</code>이면 <code>tabs_indicator-slide</code>와
        <code>tabs_indicator</code>가 붙고, 활성 탭을 따라 인디케이터가 이동합니다.
        <code>line</code>은 밑줄(세로면 옆줄), <code>pill</code>은 배경이 슬라이드합니다.
        <code>layout=&quot;equal&quot;</code>은 균등 분할입니다.
      </>
    ),
    code: [
      compoundCode({ props: 'indicatorSlide variant="line"', panelPrefix: 'line slide' }),
      compoundCode({ props: 'indicatorSlide variant="pill"', panelPrefix: 'pill slide' }),
      compoundCode({
        props: 'indicatorSlide layout="equal" variant="line"',
        panelPrefix: 'equal slide'
      }),
      compoundCode({
        props: 'indicatorSlide vertical variant="line"',
        panelPrefix: 'vertical slide',
        wrapStart: '<div className="tabs_demo-narrow">\n',
        wrapEnd: '\n</div>'
      })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ControlledTabs indicatorSlide variant="line" panelPrefix="line slide" />
        <ControlledTabs indicatorSlide variant="pill" panelPrefix="pill slide" />
        <ControlledTabs
          indicatorSlide
          layout="equal"
          variant="line"
          panelPrefix="equal slide"
        />
        <div className="tabs_demo-narrow">
          <ControlledTabs
            indicatorSlide
            vertical
            variant="line"
            panelPrefix="vertical slide"
          />
        </div>
      </Space>
    )
  },
  {
    title: '스크롤 네비 · 딤 · 선택',
    description: (
      <>
        <code>layout=&quot;scroll&quot;</code>이면 좌·우 <code>Icon button</code>(<code>tabs_nav</code>)이 붙습니다.
        예시는 컨테이너 너비 100% 기준이며, 좁아지면 스크롤·네비가 반응형으로 동작합니다.
        <code>navFade</code>로 가장자리 딤을 켜고, <code>navSelect</code>이면 이전/다음 클릭 시 인접 탭을 선택합니다.
      </>
    ),
    code: [
      compoundCode({
        props: 'indicatorSlide layout="scroll"',
        tabs: MANY_TABS,
        initial: 't-1',
        panelPrefix: 'scroll',
        wrapStart: '<div className="tabs_demo-fluid">\n',
        wrapEnd: '\n</div>'
      }),
      compoundCode({
        props: 'indicatorSlide layout="scroll" navFade',
        tabs: MANY_TABS,
        initial: 't-1',
        panelPrefix: 'navFade',
        wrapStart: '<div className="tabs_demo-fluid">\n',
        wrapEnd: '\n</div>'
      }),
      compoundCode({
        props: 'indicatorSlide layout="scroll" navSelect',
        tabs: MANY_TABS,
        initial: 't-1',
        panelPrefix: 'navSelect',
        wrapStart: '<div className="tabs_demo-fluid">\n',
        wrapEnd: '\n</div>'
      }),
      compoundCode({
        props: 'indicatorSlide layout="scroll" navFade navSelect',
        tabs: MANY_TABS,
        initial: 't-1',
        panelPrefix: 'navFade + navSelect',
        wrapStart: '<div className="tabs_demo-fluid">\n',
        wrapEnd: '\n</div>'
      })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <div className="tabs_demo-fluid">
          <ControlledTabs
            indicatorSlide
            layout="scroll"
            tabs={MANY_TABS}
            initial="t-1"
            panelPrefix="scroll"
          />
        </div>
        <div className="tabs_demo-fluid">
          <ControlledTabs
            indicatorSlide
            layout="scroll"
            navFade
            tabs={MANY_TABS}
            initial="t-1"
            panelPrefix="navFade"
          />
        </div>
        <div className="tabs_demo-fluid">
          <ControlledTabs
            indicatorSlide
            layout="scroll"
            navSelect
            tabs={MANY_TABS}
            initial="t-1"
            panelPrefix="navSelect"
          />
        </div>
        <div className="tabs_demo-fluid">
          <ControlledTabs
            indicatorSlide
            layout="scroll"
            navFade
            navSelect
            tabs={MANY_TABS}
            initial="t-1"
            panelPrefix="navFade + navSelect"
          />
        </div>
      </Space>
    )
  },
  {
    title: '네비 버튼 스타일',
    description: (
      <>
        <code>navVariant</code>는 <code>outline</code>(기본) · <code>ghost</code> · <code>soft</code>입니다.
        <code>navColor</code>로 Icon 색(<code>primary</code> · <code>muted</code> 등)을 바꿀 수 있고,
        <code>navClassName</code>으로 클래스를 더할 수 있습니다.
      </>
    ),
    code: [
      compoundCode({
        props: 'layout="scroll" navVariant="outline"',
        tabs: MANY_TABS,
        initial: 't-1',
        panelPrefix: 'outline',
        wrapStart: '<div className="tabs_demo-fluid">\n',
        wrapEnd: '\n</div>'
      }),
      compoundCode({
        props: 'layout="scroll" navVariant="ghost" navColor="muted"',
        tabs: MANY_TABS,
        initial: 't-1',
        panelPrefix: 'ghost · muted',
        wrapStart: '<div className="tabs_demo-fluid">\n',
        wrapEnd: '\n</div>'
      }),
      compoundCode({
        props: 'layout="scroll" navVariant="soft" navColor="primary"',
        tabs: MANY_TABS,
        initial: 't-1',
        panelPrefix: 'soft · primary',
        wrapStart: '<div className="tabs_demo-fluid">\n',
        wrapEnd: '\n</div>'
      })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <div className="tabs_demo-fluid">
          <ControlledTabs
            layout="scroll"
            navVariant="outline"
            tabs={MANY_TABS}
            initial="t-1"
            panelPrefix="outline"
          />
        </div>
        <div className="tabs_demo-fluid">
          <ControlledTabs
            layout="scroll"
            navVariant="ghost"
            navColor="muted"
            tabs={MANY_TABS}
            initial="t-1"
            panelPrefix="ghost · muted"
          />
        </div>
        <div className="tabs_demo-fluid">
          <ControlledTabs
            layout="scroll"
            navVariant="soft"
            navColor="primary"
            tabs={MANY_TABS}
            initial="t-1"
            panelPrefix="soft · primary"
          />
        </div>
      </Space>
    )
  },
  {
    title: '커스텀 탭 · 패널',
    description: (
      <>
        메뉴가 많으면 데이터 <code>map</code>으로 <code>Tab</code>을 반복합니다.
        패널은 활성 <code>value</code>에 맞춰 텍스트만 바꾸거나, 컴포넌트(슬롯)·페이지를 교체해 넣습니다.
      </>
    ),
    code: `const menu = [
  { value: 'overview', label: '개요', icon: 'home' },
  { value: 'settings', label: '설정', icon: 'settings' },
  { value: 'activity', label: '활동(비활성)', disabled: true }
]
const [value, setValue] = useState('overview')
const active = menu.find((tab) => tab.value === value)

// 1) 메뉴 map + 패널 내용만 교체
<Tabs value={value} onChange={setValue} indicatorSlide>
  {menu.map((tab) => (
    <Tab key={tab.value} value={tab.value} disabled={tab.disabled}>
      {tab.icon && (
        <span className="tabs_icon"><Icon name={tab.icon} size="100%" /></span>
      )}
      <span className="tabs_label">{tab.label}</span>
    </Tab>
  ))}
  <p className="tabs_panel-placeholder">콘텐츠: {active?.label}</p>
</Tabs>

// 2) value → 컴포넌트(슬롯)·페이지 교체
const panels = {
  overview: OverviewPage,
  settings: SettingsPage,
  activity: ActivityPage
}
const Panel = panels[value]

<Tabs value={value} onChange={setValue} indicatorSlide>
  {menu.map((tab) => (
    <Tab key={tab.value} value={tab.value} disabled={tab.disabled}>
      {tab.icon && (
        <span className="tabs_icon"><Icon name={tab.icon} size="100%" /></span>
      )}
      <span className="tabs_label">{tab.label}</span>
    </Tab>
  ))}
  {Panel ? <Panel key={value} /> : null}
</Tabs>`,
    preview: (
      <Space vertical block size={24}>
        <CompoundTabsDemo />
        <SlotPanelTabsDemo />
      </Space>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 <code>sm</code> · <code>md</code>(기본) · <code>lg</code>입니다.
        <code>sm</code> · <code>lg</code>일 때 <code>tabs_sm</code> · <code>tabs_lg</code>가 붙습니다.
      </>
    ),
    code: [
      compoundCode({ props: 'size="sm"', panelPrefix: 'sm' }),
      compoundCode({ props: 'size="md"', panelPrefix: 'md' }),
      compoundCode({ props: 'size="lg"', panelPrefix: 'lg' })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ControlledTabs size="sm" panelPrefix="sm" />
        <ControlledTabs size="md" panelPrefix="md" />
        <ControlledTabs size="lg" panelPrefix="lg" />
      </Space>
    )
  },
  {
    title: '세로 · 균등 · 스크롤',
    description: (
      <>
        <code>vertical</code>은 세로 탭, <code>layout=&quot;equal&quot;</code>은 가로 균등 분할,
        <code>layout=&quot;scroll&quot;</code>은 좌·우 이전/다음 네비, <code>scrollable</code>은 스크롤바만 붙입니다.
      </>
    ),
    code: [
      compoundCode({
        props: 'vertical',
        panelPrefix: 'vertical',
        wrapStart: '<div className="tabs_demo-narrow">\n',
        wrapEnd: '\n</div>'
      }),
      compoundCode({ props: 'layout="equal"', panelPrefix: 'equal' }),
      compoundCode({
        props: 'layout="scroll"',
        tabs: MANY_TABS,
        initial: 't-1',
        panelPrefix: 'scroll nav',
        wrapStart: '<div className="tabs_demo-fluid">\n',
        wrapEnd: '\n</div>'
      }),
      compoundCode({
        props: 'scrollable',
        tabs: MANY_TABS,
        initial: 't-1',
        panelPrefix: 'scrollable',
        wrapStart: '<div className="tabs_demo-fluid">\n',
        wrapEnd: '\n</div>'
      })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <div className="tabs_demo-narrow">
          <ControlledTabs vertical panelPrefix="vertical" />
        </div>
        <ControlledTabs layout="equal" panelPrefix="equal" />
        <div className="tabs_demo-fluid">
          <ControlledTabs
            layout="scroll"
            tabs={MANY_TABS}
            initial="t-1"
            panelPrefix="scroll nav"
          />
        </div>
        <div className="tabs_demo-fluid">
          <ControlledTabs
            scrollable
            tabs={MANY_TABS}
            initial="t-1"
            panelPrefix="scrollable"
          />
        </div>
      </Space>
    )
  },
  {
    title: '아이콘 · 비활성',
    description: (
      <>
        <code>Tab</code>의 <code>icon</code>은 <code>tabs_icon</code>에 표시됩니다.
        <code>disabled</code>인 탭은 <code>is-disabled</code>이며 선택할 수 없습니다.
      </>
    ),
    code: [
      compoundCode({
        tabs: [
          { value: 'home', label: '홈', icon: true },
          { value: 'search', label: '검색', icon: true },
          { value: 'inbox', label: '수신함', icon: true }
        ],
        initial: 'home',
        panelPrefix: '아이콘'
      }),
      compoundCode({
        tabs: DISABLED_TABS,
        initial: 'a',
        panelPrefix: '비활성 예시'
      })
    ].join('\n\n'),
    preview: (
      <Space vertical block size={24}>
        <ControlledTabs tabs={ICON_TABS} initial="home" panelPrefix="아이콘" />
        <ControlledTabs tabs={DISABLED_TABS} initial="a" panelPrefix="비활성 예시" />
      </Space>
    )
  },
  {
    title: '닫기 · extra',
    description: (
      <>
        <code>Tab</code>의 <code>closable</code>이면 ×(<code>tabs_close</code>)가 붙고
        <code>onClose</code>가 호출됩니다. <code>extra</code>는 바 오른쪽(<code>tabs_extra</code>)에 둡니다.
      </>
    ),
    code: `const [items, setItems] = useState([
  { value: 'doc-1', label: '문서 1', closable: true },
  { value: 'doc-2', label: '문서 2', closable: true },
  { value: 'doc-3', label: '문서 3', closable: true }
])
const [value, setValue] = useState('doc-1')
const active = items.find((tab) => tab.value === value)

<Tabs
  value={value}
  onChange={setValue}
  onClose={(closed) => {
    setItems((prev) => prev.filter((item) => item.value !== closed))
  }}
  extra={<Button size="sm" variant="ghost" label="추가" />}
>
  {items.map((tab) => (
    <Tab
      key={tab.value}
      value={tab.value}
      label={tab.label}
      closable={tab.closable}
    />
  ))}
  <p className="tabs_panel-placeholder">{active?.label} 내용</p>
</Tabs>`,
    preview: <ClosableTabsDemo />
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>tabs</code> · <code>tabs_bar</code> · <code>tabs_list</code> · <code>tabs_tab</code> ·
        <code>tabs_panel</code>입니다. 기본 스킨은 <code>tabs_line</code>입니다.
      </>
    ),
    code: `<div class="tabs tabs_line">
  <div class="tabs_bar">
    <div class="tabs_list-wrap">
      <div class="tabs_list" role="tablist" aria-label="섹션">
        <button type="button" class="tabs_tab is-active" role="tab" aria-selected="true">
          <span class="tabs_label">개요</span>
        </button>
        <button type="button" class="tabs_tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tabs_label">설정</span>
        </button>
        <button type="button" class="tabs_tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tabs_label">활동</span>
        </button>
      </div>
    </div>
  </div>
  <div class="tabs_panels">
    <div class="tabs_panel" role="tabpanel">
      <p class="tabs_panel-placeholder">개요 패널</p>
    </div>
  </div>
</div>`,
    preview: (
      <div className="tabs tabs_line">
        <div className="tabs_bar">
          <div className="tabs_list-wrap">
            <div className="tabs_list" role="tablist" aria-label="섹션">
              <button
                type="button"
                className="tabs_tab is-active"
                role="tab"
                aria-selected="true"
              >
                <span className="tabs_label">개요</span>
              </button>
              <button
                type="button"
                className="tabs_tab"
                role="tab"
                aria-selected="false"
                tabIndex={-1}
              >
                <span className="tabs_label">설정</span>
              </button>
              <button
                type="button"
                className="tabs_tab"
                role="tab"
                aria-selected="false"
                tabIndex={-1}
              >
                <span className="tabs_label">활동</span>
              </button>
            </div>
          </div>
        </div>
        <div className="tabs_panels">
          <div className="tabs_panel" role="tabpanel">
            <p className="tabs_panel-placeholder">개요 패널</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        <code>tablist</code>에 <code>aria-label</code>(기본 &quot;섹션&quot;)을 둡니다.
        활성 탭은 <code>aria-selected=&quot;true&quot;</code>, 비활성 탭은 <code>tabIndex=-1</code>입니다.
        세로일 때는 <code>aria-orientation=&quot;vertical&quot;</code>입니다.
      </>
    ),
    code: compoundCode({
      props: 'label="설정 탭"',
      tabs: [
        { value: 'a', label: '일반' },
        { value: 'b', label: '알림' }
      ],
      initial: 'a',
      panelPrefix: '설정'
    }),
    preview: (
      <ControlledTabs
        label="설정 탭"
        tabs={[
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
 * Tabs 가이드 화면.
 * 메뉴는 데이터 map · 패널은 단일 슬롯(내용·컴포넌트 교체) 기준으로 예시를 모은다.
 */
export default function TabsGuide () {
  return (
    <GuideLayout
      category="네비게이션"
      title="Tabs"
      description="탭 전환. 메뉴는 데이터 map으로 Tab을 돌리고, 패널은 활성 value에 맞춰 내용·컴포넌트(슬롯)만 교체합니다. line · card · pill · indicatorSlide · navFade · navSelect · scroll을 지원합니다."
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

      <GuideApiDocs sections={tabsApiSections} />
    </GuideLayout>
  )
}
