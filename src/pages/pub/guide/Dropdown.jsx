'use client'

import { useState } from 'react'
import {
  Button,
  DemoBlock,
  Dropdown,
  GuideApiDocs,
  GuideLayout,
  Icon,
  Space
} from '@/comp'
import { dropdownApiSections } from '@/pages/pub/data/guide/dropdownApiSections'

const BASIC_ITEMS = [
  { key: 'profile', label: '프로필' },
  { key: 'settings', label: '설정' },
  { key: 'logout', label: '로그아웃' }
]

const ICON_ITEMS = [
  { key: 'home', label: '홈', icon: <Icon name="home" size="100%" /> },
  { key: 'search', label: '검색', icon: <Icon name="search" size="100%" /> },
  { key: 'div-1', type: 'divider' },
  {
    key: 'danger',
    label: '삭제',
    danger: true,
    icon: <Icon name="trash" size="100%" />
  }
]

const MANY_ITEMS = Array.from({ length: 12 }, (_, index) => ({
  key: `item-${index + 1}`,
  label: `항목 ${index + 1}`
}))

const SELECT_ITEMS = [
  { key: 'ko', label: '한국어' },
  { key: 'en', label: 'English' },
  { key: 'ja', label: '日本語' },
  { key: 'zh', label: '中文' }
]

const REGION_ITEMS = [
  { key: 'seoul', label: '서울' },
  { key: 'busan', label: '부산' },
  { key: 'jeju', label: '제주' },
  { key: 'div-1', type: 'divider' },
  { key: 'etc', label: '기타', disabled: true }
]

/** open · onOpenChange 로 부모가 상태를 관리하는 예시 */
function ControlledDemo () {
  const [open, setOpen] = useState(false)

  return (
    <div className="dropdown_demo-stage">
      <div className="dropdown_row">
        <Dropdown
          open={open}
          label={open ? '닫기' : '열기'}
          items={BASIC_ITEMS}
          onOpenChange={setOpen}
        />
        <Button
          variant="outline"
          label="바깥 버튼으로 토글"
          onClick={() => setOpen((prev) => !prev)}
        />
        <span>
          open: <code>{String(open)}</code>
        </span>
      </div>
    </div>
  )
}

const TRIGGER_VARIANTS = [
  { value: 'select', label: 'select' },
  { value: 'outline', label: 'outline' },
  { value: 'filled', label: 'filled' },
  { value: 'ghost', label: 'ghost' }
]

const SELECT_PLACEMENTS = [
  { value: 'bottom', label: 'bottom' },
  { value: 'bottom-end', label: 'bottom-end' },
  { value: 'top', label: 'top' },
  { value: 'left', label: 'left' },
  { value: 'right', label: 'right' }
]

const SELECT_OFFSETS = [
  { value: 'none', label: 'none' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
  { value: 'custom', label: '커스텀 1.5rem' }
]

/** 셀렉트 역할 — 선택값이 트리거 라벨로 반영. 트리거·배치·간격 변경 가능 */
function SelectableDemo () {
  const [locale, setLocale] = useState('ko')
  const [region, setRegion] = useState(null)
  const [triggerVariant, setTriggerVariant] = useState('select')
  const [placement, setPlacement] = useState('bottom')
  const [offset, setOffset] = useState('md')

  const shared = {
    block: true,
    fit: triggerVariant === 'select',
    triggerVariant,
    placement,
    offset: offset === 'custom' ? 'md' : offset,
    style: offset === 'custom' ? { ['--dropdown-offset']: '1.5rem' } : undefined
  }
  const demoKey = `${triggerVariant}-${placement}-${offset}`

  return (
    <div className="dropdown_demo-stage dropdown_demo-stage-placement">
      <div className="dropdown_demo-select">
        <div className="dropdown_demo-select-controls">
          <div className="dropdown_demo-select-control-row">
            <p className="dropdown_demo-select-control-label">트리거</p>
            {TRIGGER_VARIANTS.map((item) => (
              <Button
                key={item.value}
                size="sm"
                variant={item.value === triggerVariant ? 'filled' : 'outline'}
                label={item.label}
                onClick={() => setTriggerVariant(item.value)}
              />
            ))}
          </div>
          <div className="dropdown_demo-select-control-row">
            <p className="dropdown_demo-select-control-label">배치</p>
            {SELECT_PLACEMENTS.map((item) => (
              <Button
                key={item.value}
                size="sm"
                variant={item.value === placement ? 'filled' : 'outline'}
                label={item.label}
                onClick={() => setPlacement(item.value)}
              />
            ))}
          </div>
          <div className="dropdown_demo-select-control-row">
            <p className="dropdown_demo-select-control-label">간격</p>
            {SELECT_OFFSETS.map((item) => (
              <Button
                key={item.value}
                size="sm"
                variant={item.value === offset ? 'filled' : 'outline'}
                label={item.label}
                onClick={() => setOffset(item.value)}
              />
            ))}
          </div>
        </div>

        <div className="dropdown_demo-select-grid">
          <div className="dropdown_demo-select-cell">
            <p className="dropdown_demo-select-caption">제어 · value / onChange</p>
            <Dropdown
              key={`locale-${demoKey}`}
              {...shared}
              value={locale}
              placeholder="언어 선택"
              items={SELECT_ITEMS}
              onChange={setLocale}
            />
            <p className="dropdown_demo-select-meta">
              value: <code>{locale}</code>
            </p>
          </div>
          <div className="dropdown_demo-select-cell">
            <p className="dropdown_demo-select-caption">미선택 · placeholder</p>
            <Dropdown
              key={`region-${demoKey}`}
              {...shared}
              value={region}
              placeholder="지역을 선택하세요"
              items={REGION_ITEMS}
              onChange={setRegion}
            />
            <p className="dropdown_demo-select-meta">
              value: <code>{String(region)}</code>
            </p>
          </div>
          <div className="dropdown_demo-select-cell">
            <p className="dropdown_demo-select-caption">비제어 · defaultValue</p>
            <Dropdown
              key={`default-${demoKey}`}
              {...shared}
              defaultValue="en"
              placeholder="언어 선택"
              items={SELECT_ITEMS}
            />
            <p className="dropdown_demo-select-meta">
              defaultValue: <code>en</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** 배치별로 여는 예시 — 아래·위·좌·우 전체 */
function PlacementDemo () {
  const [placement, setPlacement] = useState('bottom')
  const options = [
    { value: 'bottom', label: 'bottom (기본)' },
    { value: 'bottom-end', label: 'bottom-end' },
    { value: 'bottom-center', label: 'bottom-center' },
    { value: 'top', label: 'top' },
    { value: 'top-end', label: 'top-end' },
    { value: 'top-center', label: 'top-center' },
    { value: 'left', label: 'left (center)' },
    { value: 'left-top', label: 'left-top' },
    { value: 'left-bottom', label: 'left-bottom' },
    { value: 'right', label: 'right (center)' },
    { value: 'right-top', label: 'right-top' },
    { value: 'right-bottom', label: 'right-bottom' }
  ]

  return (
    <div className="dropdown_demo-stage dropdown_demo-stage-placement">
      <div className="dropdown_row">
        {options.map((item) => (
          <Button
            key={item.value}
            size="sm"
            variant={item.value === placement ? 'filled' : 'outline'}
            label={item.label}
            onClick={() => setPlacement(item.value)}
          />
        ))}
      </div>
      <div className="dropdown_demo-placement-stage">
        <Dropdown
          key={placement}
          open
          closeOnOutsideClick={false}
          placement={placement}
          label={placement}
          items={BASIC_ITEMS}
        />
      </div>
    </div>
  )
}

/** 트리거 ↔ 패널 간격 비교 */
function OffsetDemo () {
  const [offset, setOffset] = useState('md')
  const options = [
    { value: 'none', label: 'none (0)' },
    { value: 'sm', label: 'sm' },
    { value: 'md', label: 'md (기본)' },
    { value: 'lg', label: 'lg' },
    { value: 'custom', label: '커스텀 1.5rem' }
  ]

  return (
    <div className="dropdown_demo-stage">
      <div className="dropdown_row">
        {options.map((item) => (
          <Button
            key={item.value}
            variant={item.value === offset ? 'filled' : 'outline'}
            label={item.label}
            onClick={() => setOffset(item.value)}
          />
        ))}
      </div>
      <div className="dropdown_row" style={{ justifyContent: 'center', marginTop: '3rem' }}>
        <Dropdown
          key={offset}
          open
          closeOnOutsideClick={false}
          offset={offset === 'custom' ? 'md' : offset}
          style={
            offset === 'custom'
              ? { ['--dropdown-offset']: '1.5rem' }
              : undefined
          }
          label={offset === 'custom' ? '커스텀' : `offset=${offset}`}
          items={BASIC_ITEMS}
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
        트리거를 누르면 <code>is-open</code>이 붙고 메뉴가 펼쳐집니다. 항목을 고르거나 바깥을 누르면 닫힙니다.
      </>
    ),
    code: `<Dropdown
  label="메뉴"
  items={[
    { key: 'profile', label: '프로필' },
    { key: 'settings', label: '설정' },
    { key: 'logout', label: '로그아웃' }
  ]}
/>`,
    preview: (
      <div className="dropdown_demo-stage">
        <Dropdown label="메뉴" items={BASIC_ITEMS} />
      </div>
    )
  },
  {
    title: '제어 모드',
    description: (
      <>
        <code>open</code> · <code>onOpenChange</code>로 부모가 열림 상태를 관리합니다.
      </>
    ),
    code: `const [open, setOpen] = useState(false)
<Dropdown open={open} onOpenChange={setOpen} label="열기" items={items} />`,
    preview: <ControlledDemo />
  },
  {
    title: '선택(셀렉트 역할)',
    description: (
      <>
        <code>value</code> · <code>defaultValue</code> · <code>onChange</code>를 쓰면 셀렉트처럼 동작합니다.
        항목을 고르면 트리거 라벨이 해당 <code>item.label</code>로 바뀌고, 선택 항목에 <code>is-active</code>가 붙습니다.
        미선택 시에는 <code>placeholder</code>(없으면 <code>label</code>)이 보입니다.
        트리거는 <code>triggerVariant</code>로 <code>select</code>뿐 아니라 <code>outline</code> · <code>filled</code> · <code>ghost</code>도 쓸 수 있고,
        패널 위치는 <code>placement</code>, 트리거↔패널 간격은 <code>offset</code>으로 바꿉니다.
      </>
    ),
    code: `const [locale, setLocale] = useState('ko')
const [region, setRegion] = useState(null)

{/* 제어 · value / onChange */}
<Dropdown
  fit
  block
  triggerVariant="select"
  placement="bottom"
  offset="md"
  value={locale}
  placeholder="언어 선택"
  items={localeItems}
  onChange={setLocale}
/>

{/* 미선택 · placeholder */}
<Dropdown
  fit
  block
  triggerVariant="select"
  placement="bottom"
  offset="md"
  value={region}
  placeholder="지역을 선택하세요"
  items={regionItems}
  onChange={setRegion}
/>

{/* 비제어 · defaultValue */}
<Dropdown
  fit
  block
  triggerVariant="select"
  placement="bottom"
  offset="md"
  defaultValue="en"
  placeholder="언어 선택"
  items={localeItems}
/>`,
    preview: <SelectableDemo />
  },
  {
    title: '배치',
    description: (
      <>
        <code>placement</code>는 아래(<code>bottom</code> · <code>bottom-end</code> · <code>bottom-center</code>),
        위(<code>top</code> · <code>top-end</code> · <code>top-center</code>),
        좌(<code>left</code> · <code>left-top</code> · <code>left-bottom</code>),
        우(<code>right</code> · <code>right-top</code> · <code>right-bottom</code>)입니다.
        <code>left</code>/<code>right</code> 기본은 세로 center이고, <code>-top</code>/<code>-bottom</code>은 트리거 상·하 정렬입니다.
      </>
    ),
    code: `<Dropdown placement="left" label="메뉴" items={items} />
<Dropdown placement="left-top" label="메뉴" items={items} />
<Dropdown placement="left-bottom" label="메뉴" items={items} />
<Dropdown placement="right-top" label="메뉴" items={items} />`,
    preview: <PlacementDemo />
  },
  {
    title: '간격(offset)',
    description: (
      <>
        <code>offset</code>으로 트리거와 패널 사이 간격을 바꿉니다.
        <code>none</code> · <code>sm</code> · <code>lg</code>는 <code>dropdown_offset-*</code>를 붙이고,
        기본 <code>md</code>는 <code>--dropdown-offset</code>(space-xs)입니다.
        임의 값은 <code>style</code>의 <code>--dropdown-offset</code>으로 덮어씁니다.
      </>
    ),
    code: `<Dropdown offset="none" label="붙임" items={items} />
<Dropdown offset="lg" label="넓게" items={items} />
<Dropdown
  label="커스텀"
  style={{ '--dropdown-offset': '1.5rem' }}
  items={items}
/>`,
    preview: <OffsetDemo />
  },
  {
    title: '아이콘 · 구분선 · 위험',
    description: (
      <>
        항목에 <code>icon</code> · <code>danger</code> · <code>type=&quot;divider&quot;</code>를 줄 수 있습니다.
        위험 항목은 <code>menu_link.color_danger</code>입니다.
      </>
    ),
    code: `<Dropdown
  label="더보기"
  items={[
    { key: 'home', label: '홈', icon: <Icon name="home" /> },
    { key: 'div', type: 'divider' },
    { key: 'danger', label: '삭제', danger: true }
  ]}
/>`,
    preview: (
      <div className="dropdown_demo-stage">
        <Dropdown label="더보기" items={ICON_ITEMS} />
      </div>
    )
  },
  {
    title: '블록 · fit · 스크롤',
    description: (
      <>
        <code>block</code>은 가로 100%, <code>fit</code> + <code>triggerVariant=&quot;select&quot;</code>는 최소 너비,
        <code>maxVisibleItems</code>는 목록 스크롤입니다.
      </>
    ),
    code: `<Dropdown block label="전체 너비" items={items} />
<Dropdown fit triggerVariant="select" label="선택" items={items} />
<Dropdown maxVisibleItems={5} label="스크롤" items={manyItems} />`,
    preview: (
      <Space vertical block size={24}>
        <div style={{ maxWidth: 320 }}>
          <Dropdown block label="전체 너비" items={BASIC_ITEMS} />
        </div>
        <div className="dropdown_demo-stage">
          <div className="dropdown_row">
            <Dropdown
              fit
              triggerVariant="select"
              label="선택"
              items={BASIC_ITEMS}
            />
            <Dropdown
              maxVisibleItems={5}
              label="스크롤"
              items={MANY_ITEMS}
            />
          </div>
        </div>
      </Space>
    )
  },
  {
    title: '비활성',
    description: (
      <>
        <code>disabled</code>이면 루트에 <code>is-disabled</code>가 붙고 트리거가 비활성입니다.
        항목 단위 <code>disabled</code>도 지원합니다.
      </>
    ),
    code: `<Dropdown disabled label="비활성" items={items} />
<Dropdown
  label="일부 비활성"
  items={[
    { key: 'a', label: '활성' },
    { key: 'b', label: '비활성', disabled: true }
  ]}
/>`,
    preview: (
      <div className="dropdown_demo-stage">
        <div className="dropdown_row">
          <Dropdown disabled label="비활성" items={BASIC_ITEMS} />
          <Dropdown
            label="일부 비활성"
            items={[
              { key: 'a', label: '활성' },
              { key: 'b', label: '비활성', disabled: true },
              { key: 'c', label: '활성' }
            ]}
          />
        </div>
      </div>
    )
  },
  {
    title: 'HTML 마크업',
    description: (
      <>
        스타일 계약은 <code>dropdown</code> · <code>dropdown_trigger</code> · <code>dropdown_menu</code>입니다.
        패널 안은 <code>menu menu_vertical menu_compact</code> 목록을 씁니다.
      </>
    ),
    code: `<div class="dropdown is-open">
  <button type="button" class="btn btn_outline color_default dropdown_trigger" aria-expanded="true" aria-haspopup="menu">
    <span class="btn_label">메뉴</span>
  </button>
  <div class="dropdown_menu" role="menu">
    <div class="menu menu_vertical menu_compact" role="none">
      <ul class="menu_list">
        <li class="menu_item"><button type="button" class="menu_link" role="menuitem">프로필</button></li>
      </ul>
    </div>
  </div>
</div>`,
    preview: (
      <div className="dropdown_demo-stage">
        <div className="dropdown is-open">
          <button
            type="button"
            className="btn btn_outline color_default dropdown_trigger"
            aria-expanded="true"
            aria-haspopup="menu"
          >
            <span className="btn_label">메뉴</span>
          </button>
          <div className="dropdown_menu" role="menu">
            <div className="menu menu_vertical menu_compact" role="none">
              <ul className="menu_list">
                <li className="menu_item">
                  <button type="button" className="menu_link" role="menuitem">
                    <span className="menu_label">프로필</span>
                  </button>
                </li>
                <li className="menu_item">
                  <button type="button" className="menu_link" role="menuitem">
                    <span className="menu_label">설정</span>
                  </button>
                </li>
                <li className="menu_item">
                  <button type="button" className="menu_link" role="menuitem">
                    <span className="menu_label">로그아웃</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        트리거에 <code>aria-haspopup=&quot;menu&quot;</code> · <code>aria-expanded</code> · <code>aria-controls</code>를 두고,
        패널은 <code>role=&quot;menu&quot;</code>, 항목은 <code>role=&quot;menuitem&quot;</code>입니다. Escape로 닫힙니다.
      </>
    ),
    code: `<Dropdown label="계정 메뉴" items={[{ key: 'profile', label: '프로필' }]} />`,
    preview: (
      <div className="dropdown_demo-stage">
        <Dropdown label="계정 메뉴" items={[{ key: 'profile', label: '프로필' }]} />
      </div>
    )
  }
]

/**
 * Dropdown 가이드 화면.
 * 기본 · 제어 · 배치 · 아이콘 · 블록/스크롤 예시와 API 문서를 모은다.
 */
export default function DropdownGuide () {
  return (
    <GuideLayout
      category="네비게이션"
      title="Dropdown"
      description="트리거 메뉴. items로 구성하며 placement · block · maxVisibleItems를 지원합니다."
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

      <GuideApiDocs sections={dropdownApiSections} />
    </GuideLayout>
  )
}
