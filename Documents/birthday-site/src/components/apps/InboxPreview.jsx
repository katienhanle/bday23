'use client'

import { useState } from 'react'
import { MESSAGES } from './inboxData'

export default function InboxPreview({ onOpen }) {
  const [collapsed, setCollapsed] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      width: 280,
      zIndex: 9500,
      borderRadius: 0,
      overflow: 'hidden',
      background: 'var(--win-dark-body)',
      border: '2px solid var(--win-dark-border)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Header */}
      <div
        onClick={() => setCollapsed(c => !c)}
        style={{
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          borderBottom: collapsed ? 'none' : '1px solid rgba(255,255,255,0.07)',
          background: 'var(--win-dark-bar)',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-title)',
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.7)',
          flex: 1,
          letterSpacing: '-0.2px',
        }}>messages</span>
        <span style={{
          background: 'var(--pink-hot)',
          color: 'white',
          fontSize: '10px',
          fontWeight: 700,
          borderRadius: 99,
          padding: '1px 7px',
          lineHeight: '18px',
        }}>{MESSAGES.length}</span>
        <span style={{
          fontSize: '10px',
          color: 'rgba(255,255,255,0.3)',
          marginLeft: 4,
        }}>{collapsed ? '▲' : '▼'}</span>
      </div>

      {/* Message list */}
      {!collapsed && (
        <div style={{
          maxHeight: 340,
          overflowY: 'auto',
          padding: '6px 0',
        }}>
          {MESSAGES.map((msg) => {
            const isHovered = msg.id === hoveredId
            const photoSrc = msg.photo
              ? `/${msg.photo}`
              : msg.photos?.[0]
              ? `/${msg.photos[0]}`
              : null
            const preview = msg.message
              ? msg.message.replace(/\n/g, ' ').slice(0, 45) + (msg.message.length > 45 ? '…' : '')
              : ''

            return (
              <div
                key={msg.id}
                onClick={() => onOpen(msg.id)}
                onMouseEnter={() => setHoveredId(msg.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 14px',
                  cursor: 'pointer',
                  background: isHovered ? 'rgba(255,255,255,0.06)' : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  flexShrink: 0,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  border: msg.pinned ? '1.5px solid rgba(255,63,164,0.5)' : '1.5px solid rgba(255,255,255,0.1)',
                }}>
                  {photoSrc ? (
                    <img
                      src={photoSrc}
                      alt={msg.from}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span>{msg.emoji}</span>
                  )}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 2,
                  }}>
                    {/* Unread dot */}
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--pink-hot)',
                      flexShrink: 0,
                      boxShadow: '0 0 0 2px rgba(255,63,164,0.2)',
                    }} />
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)',
                      transition: 'color 0.15s',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>{msg.from}</span>
                  </div>
                  {preview && (
                    <div style={{
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.32)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>{preview}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
