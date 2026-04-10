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
          height: 160,
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

function Avatar({ msg, size = 40 }) {
  const photoSrc = msg.photo
    ? `/${msg.photo}`
    : msg.photos?.[0]
    ? `/${msg.photos[0]}`
    : null

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.4,
      border: msg.pinned
        ? '1.5px solid rgba(255,63,164,0.5)'
        : '1.5px solid rgba(255,255,255,0.1)',
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
  )
}

export default function Inbox({ initialSelectedId = null, isMobile = false }) {
  const [selectedId, setSelectedId] = useState(initialSelectedId)
  const [hoveredId, setHoveredId]   = useState(null)
  const active = MESSAGES.find((m) => m.id === selectedId)

  // Mobile: list/detail pattern — show list OR message, not side by side
  if (isMobile) {
    return (
      <div style={{ height: '100%', fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column' }}>
        {active ? (
          // Detail view
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 18px' }}>
            <button
              onClick={() => setSelectedId(null)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--pink-hot)', fontFamily: 'var(--font-body)',
                fontSize: '13px', marginBottom: 18, padding: 0,
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              ← back
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <Avatar msg={active} size={40} />
              <span style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem', color: 'var(--pink-hot)' }}>
                {active.from}
              </span>
            </div>
            <div style={{ paddingLeft: 52 }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.85, margin: '0 0 16px', whiteSpace: 'pre-wrap' }}>
                {active.message}
              </p>
              {(() => {
                const allPhotos = active.photos ?? (active.photo ? [active.photo] : [])
                if (allPhotos.length === 0) return null
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {allPhotos.map((src, i) => (
                      <img key={i} src={`/${src}`} alt={`${active.from} ${i + 1}`}
                        style={{ width: '100%', borderRadius: 8, display: 'block' }} />
                    ))}
                  </div>
                )
              })()}
            </div>
          </div>
        ) : (
          // List view
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
            <div style={{
              fontFamily: 'var(--font-title)', fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '0 16px 10px',
            }}>messages</div>
            {MESSAGES.map((msg) => {
              const isPinned = msg.pinned
              const preview  = msg.message ? msg.message.replace(/\n/g, ' ').slice(0, 50) + '…' : ''
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedId(msg.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 16px', cursor: 'pointer',
                    borderLeft: isPinned ? '2px solid rgba(255,63,164,0.4)' : '2px solid transparent',
                    background: isPinned ? 'rgba(255,63,164,0.05)' : 'transparent',
                  }}
                >
                  <Avatar msg={msg} size={40} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--pink-hot)', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {msg.from}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {preview}
                    </div>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px', flexShrink: 0 }}>›</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'var(--font-body)' }}>

      {/* ── Left sidebar ── */}
      <div style={{
        width: 220,
        flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.08)',
        overflowY: 'auto',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        height: '100%',
      }}>
        <div style={{
          fontFamily: 'var(--font-title)',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0 14px 10px',
        }}>
          messages
        </div>

        {MESSAGES.map((msg) => {
          const isActive  = msg.id === selectedId
          const isHovered = msg.id === hoveredId
          const isPinned  = msg.pinned
          const preview   = msg.message
            ? msg.message.replace(/\n/g, ' ').slice(0, 38) + (msg.message.length > 38 ? '…' : '')
            : ''

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
                padding: '8px 14px',
                cursor: 'pointer',
                background: isActive
                  ? 'rgba(255,255,255,0.08)'
                  : isPinned
                  ? 'rgba(255,63,164,0.06)'
                  : isHovered
                  ? 'rgba(255,255,255,0.04)'
                  : 'transparent',
                borderLeft: isActive
                  ? '2px solid var(--pink-hot)'
                  : isPinned
                  ? '2px solid rgba(255,63,164,0.3)'
                  : '2px solid transparent',
                transition: 'background 0.15s',
              }}
            >
              <Avatar msg={msg} size={36} />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--pink-hot)',
                    flexShrink: 0,
                    boxShadow: '0 0 0 2px rgba(255,63,164,0.2)',
                  }} />
                  <span style={{
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive
                      ? 'rgba(255,255,255,0.95)'
                      : isHovered
                      ? 'rgba(255,255,255,0.85)'
                      : 'rgba(255,255,255,0.65)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.15s',
                  }}>{msg.from}</span>
                </div>
                {preview && (
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.28)',
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

      {/* ── Right: message content ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        {active ? (
          <>
            {/* Discord-style message header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 6,
            }}>
              <Avatar msg={active} size={44} />
              <span style={{
                fontFamily: 'var(--font-title)',
                fontSize: '1.15rem',
                color: 'var(--pink-hot)',
                letterSpacing: '-0.2px',
              }}>{active.from}</span>
            </div>

            {/* Message text — indented to align with name */}
            <div style={{ paddingLeft: 56 }}>
              <p style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.85,
                margin: '0 0 16px',
                whiteSpace: 'pre-wrap',
              }}>
                {active.message}
              </p>

              {/* Photos below text */}
              {(() => {
                const allPhotos = active.photos ?? (active.photo ? [active.photo] : [])
                const layout    = active.photoLayout ?? 'default'

                if (allPhotos.length === 0) return null

                if (layout === 'one-right-two-below' && allPhotos.length >= 3) {
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 520 }}>
                      <img
                        src={`/${allPhotos[0]}`}
                        alt={`${active.from} 1`}
                        style={{ width: '100%', borderRadius: 8, display: 'block' }}
                      />
                      <div style={{ display: 'flex', gap: 8 }}>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
                    {allPhotos.map((src, i) => (
                      <img
                        key={i}
                        src={`/${src}`}
                        alt={`${active.from} ${i + 1}`}
                        style={{ width: '100%', borderRadius: 8, display: 'block' }}
                      />
                    ))}
                  </div>
                )
              })()}

              {/* Stickers for mia/nancy */}
              {active.id === 12 && (
                <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
                  <StickerToggle defaultSrc="/sticker1.PNG" altSrc="/wispa.jpg"      alt="sticker1" label="nancy" />
                  <StickerToggle defaultSrc="/sticker2.PNG" altSrc="/boat.png"       alt="sticker2" label="nancy" />
                  <StickerToggle defaultSrc="/sticker3.png" altSrc="/cosplay.JPG"    alt="sticker3" label="mia"   />
                  <StickerToggle defaultSrc="/sticker4.PNG" altSrc="/christmas.png"  alt="sticker4" label="mia"   />
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{
            color: 'rgba(255,255,255,0.2)',
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
