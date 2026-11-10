'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { DemoPageShell } from '../shared/DemoPageShell'

const cards = [
  { anim: 'fade-up', label: 'fade-up' },
  { anim: 'fade-left', label: 'fade-left' },
  { anim: 'zoom-in', label: 'zoom-in' },
  { anim: 'flip-up', label: 'flip-up' }
]

/** aos 스크롤 등장 데모 */
export default function AosDemoPage () {
  useEffect(() => {
    AOS.init({ duration: 700, once: false, easing: 'ease-out-cubic' })
    AOS.refresh()
  }, [])

  return (
    <DemoPageShell
      title="AOS"
      description="aos — 스크롤 시 요소 등장 애니메이션"
      slug="aos"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">스크롤하여 확인</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--color-text-muted)' }}>
          아래로 스크롤하면 카드가 차례로 나타납니다.
        </p>
        <div className="lib-demo-aos-stack" style={{ paddingBottom: 120 }}>
          {cards.map((card, index) => (
            <div
              key={card.anim}
              className="lib-demo-aos-card"
              data-aos={card.anim}
              data-aos-delay={index * 80}
            >
              {card.label}
            </div>
          ))}
          <div style={{ height: 240 }} aria-hidden="true" />
          <div className="lib-demo-aos-card" data-aos="fade-up">
            마지막 카드
          </div>
        </div>
      </div>
    </DemoPageShell>
  )
}
