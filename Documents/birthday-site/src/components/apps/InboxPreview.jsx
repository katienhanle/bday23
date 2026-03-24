'use client'

import { useState } from 'react'
import { MESSAGES } from './inboxData'

export default function InboxPreview({ onOpen }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 10,
      }}>
        <span style={{
          fontFamily: 'var(--font-title)',
          fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '-0.2px',
        }}>inbox</span>
        <span style={{
          background: 'var(--pink-hot)',
          color: 'white',
          fontSize: '10px',
          fontWeight: 700,
          borderRadius: 99,
          padding: '1px 7px',
          lineHeight: '18px',
        }}>{MESSAGES.length}</span>
      </div>

      {/* Sender list — scrollable, half height */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        maxHeight: 100,
        overflowY: 'auto',
      }}>
        {MESSAGES.map((msg) => {
          const isHovered = msg.id === hoveredId
          return (
            <div
              key={msg.id}
              onClick={() => onOpen(msg.id)}
              onMouseEnter={() => setHoveredId(msg.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '3px 6px',
                borderRadius: 4,
                cursor: onOpen ? 'pointer' : 'default',
                background: isHovered ? 'rgba(255,255,255,0.07)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--pink-hot)',
                flexShrink: 0,
                boxShadow: '0 0 0 2px rgba(255,63,164,0.25)',
              }} />
              <span style={{ fontSize: '1rem' }}>{msg.emoji}</span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)',
                fontWeight: isHovered ? 500 : 400,
                transition: 'color 0.15s',
              }}>{msg.from}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
