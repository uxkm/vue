'use client'

import { useEffect, useRef } from 'react'
import { createViewer } from '@/lib/viewer'
import { DemoPageShell } from '../shared/DemoPageShell'

const images = [
  { src: 'https://picsum.photos/id/1015/800/600', alt: '산' },
  { src: 'https://picsum.photos/id/1025/800/600', alt: '강아지' },
  { src: 'https://picsum.photos/id/1035/800/600', alt: '숲' }
]

/** viewerjs 데모 */
export default function ViewerDemoPage () {
  const galleryRef = useRef(null)

  useEffect(() => {
    const viewer = createViewer(galleryRef.current, {
      toolbar: true,
      navbar: true,
      title: true
    })
    return () => {
      if (viewer) viewer.destroy()
    }
  }, [])

  return (
    <DemoPageShell
      title="Viewer.js"
      description="viewerjs — 이미지 갤러리 확대 (@/lib/viewer)"
      slug="viewer"
    >
      <div className="demo-block">
        <h2 className="demo-block__title">썸네일 클릭 → 뷰어</h2>
        <ul ref={galleryRef} className="lib-demo-gallery">
          {images.map((img) => (
            <li key={img.src}>
              <img src={img.src} alt={img.alt} />
            </li>
          ))}
        </ul>
      </div>
    </DemoPageShell>
  )
}
