'use client'

import { useState } from 'react'
import {
  FullCalendar,
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
  formatDate
} from '@/lib/calendar'
import { DemoPageShell } from '../shared/DemoPageShell'

const initialEvents = [
  { id: '1', title: '디자인 리뷰', start: '2026-11-05' },
  { id: '2', title: '배포', start: '2026-11-12' },
  { id: '3', title: '스프린트 회의', start: '2026-11-07T10:00:00', end: '2026-11-07T11:30:00' }
]

/** FullCalendar 데모 */
export default function FullCalendarDemoPage () {
  const [events, setEvents] = useState(initialEvents)
  const [lastAction, setLastAction] = useState('날짜를 클릭하거나 이벤트를 드래그해 보세요.')

  return (
    <DemoPageShell
      title="FullCalendar"
      description="@fullcalendar/react + daygrid/timegrid/interaction (@/lib/calendar)"
      slug="fullcalendar"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">월/주 뷰 · 날짜 클릭 · 드래그</h2>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--color-text-muted)' }}>
          today: {formatDate(new Date(), { month: 'long', year: 'numeric', day: 'numeric', locale: 'ko' })}
          <br />
          {lastAction}
        </p>
        <div className="lib-demo-calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek'
            }}
            editable
            selectable
            events={events}
            height="auto"
            dateClick={(info) => {
              const id = String(Date.now())
              const title = `새 일정 ${events.length + 1}`
              setEvents((prev) => [...prev, { id, title, start: info.dateStr }])
              setLastAction(`추가: ${title} (${info.dateStr})`)
            }}
            eventDrop={(info) => {
              setEvents((prev) => prev.map((ev) => (
                ev.id === info.event.id
                  ? { ...ev, start: info.event.startStr, end: info.event.endStr || undefined }
                  : ev
              )))
              setLastAction(`이동: ${info.event.title} → ${info.event.startStr}`)
            }}
          />
        </div>
      </div>
    </DemoPageShell>
  )
}
