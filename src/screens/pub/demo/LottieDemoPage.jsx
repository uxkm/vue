'use client'

import { Lottie } from '@/lib/lottie'
import { DemoPageShell } from '../shared/DemoPageShell'

/** 최소 원형 회전 Lottie JSON */
const pulseAnim = {
  v: '5.5.7',
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: 'pulse',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Circle',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 60, s: [360] }
          ]
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [80, 80, 100], e: [110, 110, 100] },
            { t: 30, s: [110, 110, 100], e: [80, 80, 100] },
            { t: 60, s: [80, 80, 100] }
          ]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] } },
            { ty: 'fl', c: { a: 0, k: [0.2, 0.45, 0.95, 1] }, o: { a: 0, k: 100 } },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    }
  ]
}

/** lottie-react 데모 */
export default function LottieDemoPage () {
  return (
    <DemoPageShell
      title="Lottie"
      description="lottie-react / lottie-web — JSON 애니메이션 (@/lib/lottie)"
      slug="lottie"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">루프 애니메이션</h2>
        <Lottie
          animationData={pulseAnim}
          loop
          style={{ width: 200, height: 200 }}
        />
      </div>
    </DemoPageShell>
  )
}
