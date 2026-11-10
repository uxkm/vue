'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { DemoPageShell } from '../shared/DemoPageShell'

/** gsap 트윈 데모 */
export default function GsapDemoPage () {
  const boxRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return undefined

    tweenRef.current = gsap.to(el, {
      x: 160,
      rotation: 360,
      scale: 1.15,
      duration: 1.4,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    })

    return () => {
      tweenRef.current?.kill()
      gsap.set(el, { clearProps: 'all' })
    }
  }, [])

  const replay = () => {
    tweenRef.current?.restart()
  }

  return (
    <DemoPageShell
      title="GSAP"
      description="gsap — 트윈 / yoyo 반복 애니메이션"
      slug="gsap"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">박스 트윈</h2>
        <div className="demo-stack">
          <div style={{ height: 140, display: 'flex', alignItems: 'center' }}>
            <div ref={boxRef} className="lib-demo-box">GSAP</div>
          </div>
          <button type="button" onClick={replay} style={{ width: 'fit-content', padding: '8px 12px', cursor: 'pointer' }}>
            다시 시작
          </button>
        </div>
      </div>
    </DemoPageShell>
  )
}
