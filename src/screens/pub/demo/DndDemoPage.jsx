'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
  CSS
} from '@/lib/dnd'
import { DemoPageShell } from '../shared/DemoPageShell'

function SortableItem ({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li
      ref={setNodeRef}
      className="lib-demo-list__item"
      style={style}
      {...attributes}
      {...listeners}
    >
      {id}
    </li>
  )
}

/** @dnd-kit 드래그 정렬 데모 */
export default function DndDemoPage () {
  const [items, setItems] = useState(['Alpha', 'Bravo', 'Charlie', 'Delta'])
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const onDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setItems((prev) => {
      const oldIndex = prev.indexOf(active.id)
      const newIndex = prev.indexOf(over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  return (
    <DemoPageShell
      title="DnD Kit"
      description="@dnd-kit/core · sortable · utilities — 목록 드래그 정렬 (@/lib/dnd)"
      slug="dnd"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">세로 목록 정렬</h2>
        <p style={{ margin: '0 0 12px', color: 'var(--color-text-muted)', fontSize: 13 }}>
          항목을 드래그해 순서를 바꿔 보세요.
        </p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <ul className="lib-demo-list">
              {items.map((id) => <SortableItem key={id} id={id} />)}
            </ul>
          </SortableContext>
        </DndContext>
        <pre className="lib-demo-pre" style={{ marginTop: 16 }}>
          {JSON.stringify(items, null, 2)}
        </pre>
      </div>
    </DemoPageShell>
  )
}
