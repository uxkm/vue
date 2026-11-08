'use client'

import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { DemoPageShell } from '../shared/DemoPageShell'

const STREAM_URL = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'

/** hls.js 스트리밍 데모 */
export default function HlsDemoPage () {
  const videoRef = useRef(null)
  const [status, setStatus] = useState('초기화 중…')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(STREAM_URL)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => setStatus('매니페스트 로드 완료 (hls.js)'))
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) setStatus(`오류: ${data.type} / ${data.details}`)
      })
      return () => hls.destroy()
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = STREAM_URL
      setStatus('네이티브 HLS (Safari 등)')
      return undefined
    }

    setStatus('이 브라우저는 HLS를 지원하지 않습니다.')
    return undefined
  }, [])

  return (
    <DemoPageShell
      title="hls.js"
      description="hls.js — HLS(.m3u8) 스트리밍 재생"
      slug="hls"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">샘플 스트림</h2>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--color-text-muted)' }}>
          {status}
        </p>
        <video
          ref={videoRef}
          className="lib-demo-video"
          controls
          playsInline
        />
      </div>
    </DemoPageShell>
  )
}
