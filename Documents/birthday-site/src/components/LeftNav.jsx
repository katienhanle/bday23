'use client'

import { useState, useEffect } from 'react'

// id must match the view keys used in desktop/page.jsx
const NAV_ITEMS = [
  { id: 'home',       label: 'Home'       },
  { id: 'inbox',      label: 'Inbox'      },
  { id: 'memories',   label: 'Memories'   },
  { id: 'photobooth', label: 'Photobooth' },
  { id: 'playlist',   label: 'Music'      },
  { id: 'video',      label: 'Video'      },
  { id: 'stickers',  label: 'Stickers'   },
]

export default function LeftNav({ currentView, onNavigate }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    function tick() {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: 130,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 14px 20px',
      zIndex: 9000,
      pointerEvents: 'none',
    }}>
      {/* Site title */}
      <div style={{
        fontFamily: 'var(--font-title)',
        fontSize: '1rem',
        color: 'var(--pink-hot)',
        textShadow: '0 0 12px rgba(255,63,164,0.55)',
        marginBottom: 26,
        lineHeight: 1.25,
        pointerEvents: 'auto',
      }}>
        ariel's 23rd birthday!
      </div>

      {/* Nav links */}
      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        flex: 1,
        pointerEvents: 'auto',
      }}>
        {NAV_ITEMS.map((item) => {
          const active = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '1px 0',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-title)',
                fontSize: '1.55rem',
                letterSpacing: '-0.2px',
                color: active ? 'var(--pink-hot)' : 'rgba(255,255,255,0.8)',
                textShadow: active
                  ? '0 0 14px rgba(255,63,164,0.6)'
                  : '1px 1px 4px rgba(0,0,0,0.7)',
                transition: 'color 0.18s',
                display: 'block',
                lineHeight: 1.2,
              }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Clock */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        color: 'rgba(255,255,255,0.35)',
        pointerEvents: 'none',
      }}>
        {time}
      </div>
    </div>
  )
}
