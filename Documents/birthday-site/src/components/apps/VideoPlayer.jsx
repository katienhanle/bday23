'use client'

import { useState } from 'react'

// EDIT: Replace with your YouTube video ID.
// e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ → VIDEO_ID = 'dQw4w9WgXcQ'
const VIDEO_ID = 'dQw4w9WgXcQ'

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false)

  const src = playing
    ? `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&modestbranding=1&rel=0`
    : `https://www.youtube.com/embed/${VIDEO_ID}?modestbranding=1&rel=0`

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Top bar */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid var(--win-dark-border)',
        padding: '7px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span>📼</span>
        <span style={{
          fontFamily: 'var(--font-title)',
          fontSize: '1rem',
          color: 'var(--win-dark-muted)',
          flex: 1,
        }}>
          {/* EDIT: change to your video title */}
          birthday_video.mp4
        </span>
      </div>

      {/* Video */}
      <iframe
        key={playing ? 'playing' : 'paused'}
        width="100%"
        height="260"
        src={src}
        title="Birthday Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ display: 'block', border: 'none' }}
      />

      {/* Controls */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        borderTop: '1px solid var(--win-dark-border)',
        padding: '7px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          flex: 1, height: 4,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 10, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: playing ? '40%' : '0%',
            background: 'var(--pink-hot)',
            borderRadius: 10,
            transition: 'width 0.3s',
          }} />
        </div>

        <button
          className="pill-btn"
          onClick={() => setPlaying((p) => !p)}
          style={{ padding: '4px 14px', fontSize: '11px' }}
        >
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>

        <span style={{ fontSize: '10px', color: 'var(--win-dark-muted)', whiteSpace: 'nowrap' }}>
          ✦ with love
        </span>
      </div>
    </div>
  )
}
