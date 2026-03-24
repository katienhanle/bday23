'use client'

import { useEffect, useState } from 'react'

export default function Playlist() {
  const [tracks,   setTracks]   = useState([])
  const [loading,  setLoading]  = useState(true)
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    fetch('/api/playlist')
      .then((r) => r.json())
      .then(({ tracks }) => {
        setTracks(tracks ?? [])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={{
        fontFamily: 'var(--font-title)',
        fontSize: '1.2rem',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: '-0.2px',
      }}>
        ♫ songs i listened to while putting this together and thinking of you ᯓ
      </div>

      {/* Player — only shows after a track is selected */}
      {activeId && (
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
          <iframe
            key={activeId}
            width="100%"
            height="280"
            src={`https://www.youtube.com/embed/${activeId}?autoplay=0&modestbranding=1&rel=0`}
            title="Now playing"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: 'block', border: 'none' }}
          />
        </div>
      )}

      {/* Track list */}
      <div style={{
        maxHeight: 380,
        overflowY: 'auto',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 8,
      }}>
        {loading && (
          <div style={{ padding: '14px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            loading…
          </div>
        )}
        {!loading && tracks.length === 0 && (
          <div style={{ padding: '14px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            no tracks found
          </div>
        )}
        {tracks.map((t, i) => {
          const isActive = t.id === activeId
          return (
            <div
              key={t.id}
              onClick={() => setActiveId(t.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 14px',
                cursor: 'pointer',
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--pink-hot)' : '2px solid transparent',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                transition: 'background 0.15s',
              }}
            >
              <span style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.25)',
                width: 18,
                flexShrink: 0,
                textAlign: 'right',
              }}>{i + 1}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: '12px',
                  color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
                  fontWeight: isActive ? 600 : 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {t.title}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.3)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {t.artist.replace(' - Topic', '')}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', textAlign: 'right' }}>
        curated with love ✦
      </div>
    </div>
  )
}
