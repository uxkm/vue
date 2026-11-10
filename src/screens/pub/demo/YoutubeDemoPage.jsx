'use client'

import { useState } from 'react'
import { YouTube } from '@/lib/youtube'
import { DemoPageShell } from '../shared/DemoPageShell'

/** Google IFrame API 샘플 영상 */
const SAMPLE_ID = 'M7lc1UVf-VE'

/** react-youtube 데모 */
export default function YoutubeDemoPage () {
  const [status, setStatus] = useState('대기')

  return (
    <DemoPageShell
      title="YouTube"
      description="react-youtube — iframe 플레이어 (@/lib/youtube)"
      slug="youtube"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">임베드 플레이어</h2>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--color-text-muted)' }}>
          상태: {status}
        </p>
        <YouTube
          videoId={SAMPLE_ID}
          opts={{
            width: '100%',
            height: '360',
            playerVars: { rel: 0 }
          }}
          onReady={() => setStatus('ready')}
          onPlay={() => setStatus('playing')}
          onPause={() => setStatus('paused')}
          onEnd={() => setStatus('ended')}
        />
      </div>
    </DemoPageShell>
  )
}
