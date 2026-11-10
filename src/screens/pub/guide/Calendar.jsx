'use client'

import { useState } from 'react'
import { Calendar, CalendarFooter, CalendarGroup, CalendarHeader, CalendarMonth, CalendarNav, CalendarWeekdays, CalendarWheel, CalendarWheelColumn } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { calendarApiSections } from '@/screens/pub/data/guide/calendarApiSections'

const header = (title = '2024년 6월', showNav = true) => (
  <CalendarHeader title={title} showNav={showNav} />
)
const weekdays = <CalendarWeekdays />

const weekDays = [9, 10, 11, 12, 13, 14, 15].map((day, index) => ({
  day,
  today: day === 12,
  selected: day === 14,
  sunday: index === 0,
  saturday: index === 6
}))

const years = Array.from({ length: 11 }, (_, index) => `${2019 + index}년`)
const months = Array.from({ length: 12 }, (_, index) => `${index + 1}월`)
const days = Array.from({ length: 31 }, (_, index) => `${index + 1}일`)

function EventItem ({ time, title, description, color = 'primary' }) {
  return (
    <li className={`calendar_agenda-event color_${color}`}>
      <span className="calendar_agenda-event-time">{time}</span>
      <div className="calendar_agenda-event-main">
        <span className="calendar_agenda-event-title">{title}</span>
        <span className="calendar_agenda-event-desc">{description}</span>
      </div>
    </li>
  )
}

/** 월·선택일·푸터를 페이지에서 제어하는 예시 */
function ControlledCalendarDemo () {
  const [month, setMonth] = useState(new Date(2024, 5, 1))
  const [selected, setSelected] = useState(15)
  const title = `${month.getFullYear()}년 ${month.getMonth() + 1}월`
  const today = new Date()
  const isSameMonth =
    today.getFullYear() === month.getFullYear() &&
    today.getMonth() === month.getMonth()

  const moveMonth = (offset) => {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1))
  }

  return (
    <div className="calendar_group">
      <Calendar
        shadow
        ariaLabel={title}
        header={(
          <CalendarHeader
            title={title}
            onPrev={() => moveMonth(-1)}
            onNext={() => moveMonth(1)}
          />
        )}
        weekdays={weekdays}
        footer={(
          <CalendarFooter
            onToday={() => {
              const now = new Date()
              setMonth(new Date(now.getFullYear(), now.getMonth(), 1))
              setSelected(now.getDate())
            }}
            onClear={() => setSelected(null)}
            onConfirm={() => {}}
          />
        )}
      >
        <CalendarMonth
          selected={selected}
          today={isSameMonth ? today.getDate() : undefined}
          onSelect={(day) => {
            if (!day.otherMonth) setSelected(day.day)
          }}
        />
      </Calendar>
      <p>
        선택: <code>{selected == null ? '—' : `${title} ${selected}일`}</code>
      </p>
    </div>
  )
}

/** 휠 값을 페이지에서 제어하는 예시 */
function ControlledWheelDemo () {
  const [year, setYear] = useState('2024년')
  const [month, setMonth] = useState('6월')
  const [day, setDay] = useState('15일')

  return (
    <div className="typo_stack">
      <CalendarWheel
        shadow
        title="날짜 선택"
        cancelLabel="취소"
        confirmLabel="완료"
        ariaLabel="날짜 휠 선택"
        onCancel={() => {}}
        onConfirm={() => {}}
      >
        <CalendarWheelColumn
          label="년"
          items={years}
          selected={year}
          onChange={setYear}
        />
        <CalendarWheelColumn
          label="월"
          items={months}
          selected={month}
          onChange={setMonth}
        />
        <CalendarWheelColumn
          label="일"
          items={days}
          selected={day}
          onChange={setDay}
        />
      </CalendarWheel>
      <p>
        선택: <code>{year} {month} {day}</code>
      </p>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        <code>CalendarHeader</code> · <code>CalendarWeekdays</code> · <code>CalendarMonth</code>를 조합합니다.
      </>
    ),
    code: wrapPageExample(`<Calendar ariaLabel="2024년 6월" header={<CalendarHeader title="2024년 6월" />} weekdays={<CalendarWeekdays />}>
  <CalendarMonth />
</Calendar>`, {
  name: 'CalendarBasicExample',
  reactImports: [],
  compImports: ['Calendar', 'CalendarHeader', 'CalendarMonth', 'CalendarWeekdays']
}),
    preview: (
      <div className="calendar_group">
        <Calendar ariaLabel="2024년 6월" header={header()} weekdays={weekdays}>
          <CalendarMonth />
        </Calendar>
      </div>
    )
  },
  {
    title: '선택 · 월 제어',
    description: (
      <>
        <code>CalendarMonth.onSelect</code> · <code>CalendarHeader.onPrev/onNext</code> ·
        <code>CalendarFooter.onToday/onClear/onConfirm</code>로 페이지에서 선택일과 월을 제어합니다.
      </>
    ),
    code: wrapPageExample(`const [month, setMonth] = useState(new Date(2024, 5, 1))
const [selected, setSelected] = useState(15)
const title = \`\${month.getFullYear()}년 \${month.getMonth() + 1}월\`

<Calendar
  header={
    <CalendarHeader
      title={title}
      onPrev={() => setMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
      onNext={() => setMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
    />
  }
  weekdays={<CalendarWeekdays />}
  footer={
    <CalendarFooter
      onToday={() => { /* 오늘로 이동 */ }}
      onClear={() => setSelected(null)}
      onConfirm={() => { /* 확정 */ }}
    />
  }
>
  <CalendarMonth
    selected={selected}
    onSelect={(day) => setSelected(day.day)}
  />
</Calendar>`, {
      name: 'CalendarExample',
      reactImports: ['useState'],
      compImports: ['Calendar', 'CalendarHeader', 'CalendarWeekdays', 'CalendarFooter', 'CalendarMonth']
    }),
    preview: <ControlledCalendarDemo />
  },
  {
    title: '헤더 없음',
    description: (
      <>
        <code>noHeader</code>로 제목 영역을 숨깁니다.
      </>
    ),
    code: wrapPageExample(`<Calendar noHeader ariaLabel="2024년 6월" weekdays={<CalendarWeekdays />}>
  <CalendarMonth />
</Calendar>`, {
  name: 'CalendarExample2',
  reactImports: [],
  compImports: ['Calendar', 'CalendarMonth', 'CalendarWeekdays']
}),
    preview: (
      <div className="calendar_group">
        <Calendar noHeader ariaLabel="2024년 6월" weekdays={weekdays}>
          <CalendarMonth />
        </Calendar>
      </div>
    )
  },
  {
    title: '날짜만',
    description: (
      <>
        <code>minimal</code> · <code>compact</code> · <code>borderless</code>로 날짜 셀만 표시합니다.
      </>
    ),
    code: wrapPageExample(`<Calendar minimal compact borderless ariaLabel="2024년 6월 날짜만">
  <CalendarMonth />
</Calendar>`, {
  name: 'CalendarDateExample',
  reactImports: [],
  compImports: ['Calendar', 'CalendarMonth']
}),
    preview: (
      <div className="calendar_group">
        <Calendar minimal compact borderless ariaLabel="2024년 6월 날짜만">
          <CalendarMonth />
        </Calendar>
      </div>
    )
  },
  {
    title: '주간',
    description: (
      <>
        <code>week</code>와 <code>CalendarNav</code>로 주 단위 보기를 구성합니다.
      </>
    ),
    code: wrapPageExample(`<Calendar week shadow ariaLabel="2024년 6월 9일~15일">
  <CalendarNav label="6월 9일 ~ 15일" />
  <CalendarWeekdays />
  <CalendarMonth week days={weekDays} />
</Calendar>`, {
  name: 'CalendarExample4',
  reactImports: [],
  compImports: ['Calendar', 'CalendarMonth', 'CalendarNav', 'CalendarWeekdays']
}),
    preview: (
      <div className="typo_stack">
        <Calendar week shadow ariaLabel="2024년 6월 9일~15일">
          <CalendarNav label="6월 9일 ~ 15일" />
          <CalendarWeekdays />
          <CalendarMonth week days={weekDays} />
        </Calendar>
        <Calendar week compact borderless ariaLabel="2024년 6월 9일~15일 컴팩트">
          <CalendarNav label="6월 9일 ~ 15일" />
          <CalendarMonth week days={weekDays} />
        </Calendar>
      </div>
    )
  },
  {
    title: '휠 (iOS 스타일)',
    description: (
      <>
        <code>CalendarWheel</code> · <code>CalendarWheelColumn</code>으로 년·월·일을 고릅니다.
        <code>selected</code> · <code>onChange</code>로 페이지에서 값을 제어하고,
        <code>onCancel</code> · <code>onConfirm</code>으로 툴바 액션을 받습니다.
      </>
    ),
    code: wrapPageExample(`const [year, setYear] = useState('2024년')
const [month, setMonth] = useState('6월')
const [day, setDay] = useState('15일')

<CalendarWheel
  shadow
  title="날짜 선택"
  cancelLabel="취소"
  confirmLabel="완료"
  onCancel={() => {}}
  onConfirm={() => {}}
>
  <CalendarWheelColumn label="년" items={years} selected={year} onChange={setYear} />
  <CalendarWheelColumn label="월" items={months} selected={month} onChange={setMonth} />
  <CalendarWheelColumn label="일" items={days} selected={day} onChange={setDay} />
</CalendarWheel>`, {
      name: 'CalendarWheelExample',
      reactImports: ['useState'],
      compImports: ['CalendarWheel', 'CalendarWheelColumn']
    }),
    preview: <ControlledWheelDemo />
  },
  {
    title: '범위 선택',
    description: (
      <>
        <code>rangeStart</code> · <code>rangeEnd</code>로 구간을 표시합니다.
      </>
    ),
    code: wrapPageExample(`<Calendar …>
  <CalendarMonth rangeStart={10} rangeEnd={18} />
</Calendar>`, {
  name: 'CalendarExample5',
  reactImports: [],
  compImports: ['Calendar', 'CalendarMonth']
}),
    preview: (
      <div className="calendar_group">
        <Calendar ariaLabel="2024년 6월 범위 선택" header={header()} weekdays={weekdays}>
          <CalendarMonth rangeStart={10} rangeEnd={18} />
        </Calendar>
      </div>
    )
  },
  {
    title: '이벤트 마커',
    description: (
      <>
        <code>events</code>와 <code>weekends</code>로 일정 점과 주말 색을 켭니다.
      </>
    ),
    code: wrapPageExample(`<Calendar weekends …>
  <CalendarMonth events={[3, 7, 12, 15, 21, 28]} weekends />
</Calendar>`, {
  name: 'CalendarExample6',
  reactImports: [],
  compImports: ['Calendar', 'CalendarMonth']
}),
    preview: (
      <div className="calendar_group">
        <Calendar
          weekends
          ariaLabel="2024년 6월 이벤트"
          header={header('2024년 6월', false)}
          weekdays={weekdays}
        >
          <CalendarMonth events={[3, 7, 12, 15, 21, 28]} weekends />
        </Calendar>
      </div>
    )
  },
  {
    title: '스킨',
    description: (
      <>
        <code>borderless</code> · <code>ghost</code> · <code>shadow</code> 스킨입니다.
      </>
    ),
    code: wrapPageExample(`<Calendar borderless …>…</Calendar>
<Calendar ghost …>…</Calendar>
<Calendar shadow …>…</Calendar>`, {
  name: 'CalendarExample7',
  reactImports: [],
  compImports: ['Calendar']
}),
    preview: (
      <div className="calendar_group">
        <Calendar borderless ariaLabel="Borderless" header={header('Borderless', false)} weekdays={weekdays}>
          <CalendarMonth partial={14} today={8} selected={10} />
        </Calendar>
        <Calendar ghost ariaLabel="Ghost" header={header('Ghost', false)} weekdays={weekdays}>
          <CalendarMonth partial={14} today={8} selected={10} />
        </Calendar>
        <Calendar shadow ariaLabel="Shadow" header={header('Shadow', false)} weekdays={weekdays}>
          <CalendarMonth partial={14} today={8} selected={10} />
        </Calendar>
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size=&quot;sm&quot;|lg</code>와 <code>compact</code>로 밀도를 조절합니다.
      </>
    ),
    code: wrapPageExample(`<Calendar size="sm" …>…</Calendar>
<Calendar compact …>…</Calendar>
<Calendar size="lg" …>…</Calendar>`, {
  name: 'CalendarSizeExample',
  reactImports: [],
  compImports: ['Calendar']
}),
    preview: (
      <div className="calendar_group">
        <Calendar size="sm" ariaLabel="Small" header={header('Small', false)} weekdays={weekdays}>
          <CalendarMonth partial={14} today={7} selected={9} />
        </Calendar>
        <Calendar compact ariaLabel="Compact" header={header('Compact', false)} weekdays={weekdays}>
          <CalendarMonth partial={14} today={7} selected={9} />
        </Calendar>
        <Calendar size="lg" ariaLabel="Large" header={header('Large', false)} weekdays={weekdays}>
          <CalendarMonth partial={14} today={7} selected={9} />
        </Calendar>
      </div>
    )
  },
  {
    title: '푸터',
    description: (
      <>
        <code>footer</code>에 <code>CalendarFooter</code>를 넣고
        <code>onToday</code> · <code>onClear</code> · <code>onConfirm</code>으로 액션을 제어합니다.
      </>
    ),
    code: wrapPageExample(`<Calendar
  shadow
  footer={
    <CalendarFooter
      onToday={() => {}}
      onClear={() => {}}
      onConfirm={() => {}}
    />
  }
>
  <CalendarMonth />
</Calendar>`, {
  name: 'CalendarExample9',
  reactImports: [],
  compImports: ['Calendar', 'CalendarFooter', 'CalendarMonth']
}),
    preview: (
      <div className="calendar_group">
        <Calendar
          shadow
          ariaLabel="2024년 6월 푸터 포함"
          header={header()}
          weekdays={weekdays}
          footer={(
            <CalendarFooter
              onToday={() => {}}
              onClear={() => {}}
              onConfirm={() => {}}
            />
          )}
        >
          <CalendarMonth />
        </Calendar>
      </div>
    )
  },
  {
    title: '이중 패널',
    description: (
      <>
        <code>calendar_group</code>으로 두 달을 나란히 배치합니다.
      </>
    ),
    code: wrapPageExample(`<div className="calendar_group">
  <Calendar compact shadow weekends …>…</Calendar>
  <Calendar compact shadow weekends …>…</Calendar>
</div>`, {
  name: 'CalendarExample10',
  reactImports: [],
  compImports: ['Calendar']
}),
    preview: (
      <div className="calendar_group">
        <Calendar
          compact
          shadow
          weekends
          ariaLabel="2024년 6월"
          header={header('2024년 6월')}
          weekdays={weekdays}
        >
          <CalendarMonth weekends rangeStart={24} rangeEnd={30} />
        </Calendar>
        <Calendar
          compact
          shadow
          weekends
          ariaLabel="2024년 7월"
          header={header('2024년 7월')}
          weekdays={weekdays}
        >
          <CalendarMonth weekends rangeStart={1} rangeEnd={5} />
        </Calendar>
      </div>
    )
  },
  {
    title: '세로 일정',
    description: (
      <>
        <code>agenda</code>와 <code>calendar_agenda-*</code> 마크업으로 일정 목록을 표시합니다.
      </>
    ),
    code: wrapPageExample(`<Calendar agenda shadow role="feed" header={<CalendarHeader title="6월 14일 ~ 20일" />}>
  <ol className="calendar_agenda-list">…</ol>
</Calendar>`, {
  name: 'CalendarExample11',
  reactImports: [],
  compImports: ['Calendar', 'CalendarHeader']
}),
    preview: (
      <Calendar
        agenda
        shadow
        role="feed"
        ariaLabel="2024년 6월 일정"
        header={header('6월 14일 ~ 20일')}
      >
        <ol className="calendar_agenda-list">
          <li className="calendar_agenda-day">
            <div className="calendar_agenda-date">
              <span className="calendar_agenda-weekday">금</span>
              <span className="calendar_agenda-daynum">14</span>
            </div>
            <div className="calendar_agenda-body">
              <ul className="calendar_agenda-events">
                <EventItem time="14:00" title="디자인 리뷰" description="컴포넌트 가이드 UI 시안 검토" />
              </ul>
            </div>
          </li>
          <li className="calendar_agenda-day is-saturday is-today" aria-current="date">
            <div className="calendar_agenda-date">
              <span className="calendar_agenda-weekday">토</span>
              <span className="calendar_agenda-daynum">15</span>
            </div>
            <div className="calendar_agenda-body">
              <ul className="calendar_agenda-events">
                <EventItem time="09:00" title="팀 스탠드업" description="주간 진행 상황 공유" color="success" />
                <EventItem time="15:30" title="QA 일정 점검" description="캘린더 컴포넌트 데모 확인" color="warning" />
              </ul>
            </div>
          </li>
          <li className="calendar_agenda-day is-sunday is-empty">
            <div className="calendar_agenda-date">
              <span className="calendar_agenda-weekday">일</span>
              <span className="calendar_agenda-daynum">16</span>
            </div>
            <div className="calendar_agenda-body">
              <p className="calendar_agenda-empty">일정 없음</p>
            </div>
          </li>
        </ol>
      </Calendar>
    )
  },
  {
    title: '상태',
    description: (
      <>
        <code>readonly</code> · <code>disabled</code>로 상호작용을 제한합니다.
      </>
    ),
    code: wrapPageExample(`<Calendar readonly …>
  <CalendarMonth partial={14} today={7} selected={9} readonly />
</Calendar>
<Calendar disabled …>
  <CalendarMonth partial={14} today={7} selected={9} disabled={[2, 3, 4, 5]} />
</Calendar>`, {
  name: 'CalendarStateExample',
  reactImports: [],
  compImports: ['Calendar', 'CalendarMonth']
}),
    preview: (
      <div className="typo_stack">
        <Calendar readonly ariaLabel="읽기 전용 캘린더" header={header('읽기 전용', false)} weekdays={weekdays}>
          <CalendarMonth partial={14} today={7} selected={9} readonly />
        </Calendar>
        <Calendar disabled ariaLabel="비활성 캘린더" header={header('비활성', false)} weekdays={weekdays}>
          <CalendarMonth partial={14} today={7} selected={9} disabled={[2, 3, 4, 5]} />
        </Calendar>
      </div>
    )
  }
]

/**
 * Calendar 가이드 화면.
 * docs와 동일한 월·주·휠·범위·아젠다 예시와 API 문서를 모은다.
 */
export default function CalendarGuide () {
  return (
    <GuideLayout
      category="데이터 표시"
      title="Calendar"
      description="Header · Weekdays · Month · Wheel · Footer를 조합해 월·주·일정·휠 달력을 구성합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="CalendarExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={calendarApiSections} />
    </GuideLayout>
  )
}
