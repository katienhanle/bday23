'use client'

import { useState } from 'react'
import { MESSAGES } from './inboxData'

function StickerToggle({ defaultSrc, altSrc, alt, label }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <img
        src={flipped ? altSrc : defaultSrc}
        alt={alt}
        onClick={() => setFlipped(f => !f)}
        style={{
          height: 200,
          width: 'auto',
          cursor: 'pointer',
          borderRadius: 8,
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />
      {label && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.4)',
        }}>✏️ {label}</span>
      )}
    </div>
  )
}

export default function Inbox({ initialSelectedId = null }) {
  const [selectedId, setSelectedId] = useState(initialSelectedId)
  const [hoveredId, setHoveredId] = useState(null)
  const active = MESSAGES.find((m) => m.id === selectedId)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {/* ── Left sidebar: friend list ── */}
      <div style={{
        width: 200,
        flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.08)',
        overflowY: 'auto',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}>
        <div style={{
          fontFamily: 'var(--font-title)',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '0 16px 12px',
        }}>
          messages
        </div>

        {MESSAGES.map((msg) => {
          const isActive = msg.id === selectedId
          const isHovered = msg.id === hoveredId
          const isPinned = msg.pinned
          return (
            <div
              key={msg.id}
              onClick={() => setSelectedId(msg.id)}
              onMouseEnter={() => setHoveredId(msg.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                cursor: 'pointer',
                background: isActive ? 'rgba(255,255,255,0.08)' : isPinned ? 'rgba(255,63,164,0.06)' : isHovered ? 'rgba(255,255,255,0.04)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--pink-hot)' : isPinned ? '2px solid rgba(255,63,164,0.3)' : '2px solid transparent',
                outline: isHovered && !isActive ? '1px solid rgba(255,255,255,0.12)' : 'none',
                outlineOffset: '-1px',
                transition: 'background 0.15s, outline 0.15s',
              }}
            >
              <span style={{
                fontSize: '1.1rem',
                transition: 'transform 0.15s',
                display: 'inline-block',
                transform: isHovered ? 'scale(1.2)' : 'scale(1)',
              }}>{msg.emoji}</span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: isHovered && !isActive ? '14px' : '13px',
                color: isActive ? 'rgba(255,255,255,0.9)' : isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.55)',
                fontWeight: isActive ? 600 : isHovered ? 500 : 400,
                transition: 'font-size 0.15s, color 0.15s',
              }}>
                {msg.from}
              </span>
            </div>
          )
        })}
      </div>

      {/* ── Right: message content ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '36px 40px' }}>
        {active ? (
          <>
            {/* Sender header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontSize: '1.5rem' }}>{active.emoji}</span>
              <span style={{
                fontFamily: 'var(--font-title)',
                fontSize: '1.3rem',
                color: 'var(--pink-hot)',
                letterSpacing: '-0.2px',
              }}>{active.from}</span>
            </div>

            {/* Body: text left, photo(s) right */}
            {(() => {
              const allPhotos = active.photos ?? (active.photo ? [active.photo] : [])
              const layout    = active.photoLayout ?? 'default'

              if (layout === 'one-right-two-below' && allPhotos.length >= 3) {
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Row 1: text + first photo */}
                    <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '16px',
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: 1.85,
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                        flex: 1,
                      }}>
                        {active.message}
                      </p>
                      <img
                        src={`/${allPhotos[0]}`}
                        alt={`${active.from} 1`}
                        style={{ flex: '0 0 33%', width: '33%', borderRadius: 8, display: 'block' }}
                      />
                    </div>
                    {/* Row 2: two photos side by side */}
                    <div style={{ display: 'flex', gap: 10 }}>
                      {allPhotos.slice(1).map((src, i) => (
                        <img
                          key={i}
                          src={`/${src}`}
                          alt={`${active.from} ${i + 2}`}
                          style={{ flex: 1, width: 0, borderRadius: 8, display: 'block', objectFit: 'cover' }}
                        />
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.85,
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    flex: 1,
                  }}>
                    {active.message}
                  </p>
                  {allPhotos.length > 0 && (
                    <div style={{ flex: '0 0 33%', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {allPhotos.map((src, i) => (
                        <img
                          key={i}
                          src={`/${src}`}
                          alt={`${active.from} ${i + 1}`}
                          style={{ width: '100%', borderRadius: 8, display: 'block' }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })()}

            {/* Stickers for mia/nancy */}
            {active.id === 12 && (
              <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                <StickerToggle defaultSrc="/sticker1.PNG" altSrc="/wispa.jpg" alt="sticker1" label="nancy" />
                <StickerToggle defaultSrc="/sticker2.PNG" altSrc="/boat.png" alt="sticker2" label="nancy" />
                <StickerToggle defaultSrc="/sticker3.png" altSrc="/cosplay.JPG" alt="sticker3" label="mia" />
                <StickerToggle defaultSrc="/sticker4.PNG" altSrc="/christmas.png" alt="sticker4" label="mia" />
              </div>
            )}
          </>
        ) : (
          <div style={{
            color: 'rgba(255,255,255,0.2)',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            marginTop: 40,
            textAlign: 'center',
          }}>
            select a message
          </div>
        )}
      </div>
    </div>
  )
}
