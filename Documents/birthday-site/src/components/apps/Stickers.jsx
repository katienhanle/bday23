'use client'

import { useState } from 'react'

const STICKER_DATA = [
  { id: 1, defaultSrc: '/sticker1.PNG', altSrc: '/wispa.jpg',  by: 'nancy' },
  { id: 2, defaultSrc: '/sticker2.PNG', altSrc: '/boat.png',          by: 'nancy' },
  { id: 3, defaultSrc: '/sticker3.png', altSrc: '/cosplay.JPG',       by: 'mia'   },
  { id: 4, defaultSrc: '/sticker4.PNG', altSrc: '/christmas.png',     by: 'mia'   },
]

function StickerCard({ sticker }) {
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <img
        src={flipped ? sticker.altSrc : sticker.defaultSrc}
        alt={`sticker ${sticker.id}`}
        onClick={() => setFlipped(f => !f)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          height: 'auto',
          cursor: 'pointer',
          borderRadius: 10,
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.2s ease',
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.3)',
        }}
      />
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.4)',
      }}>
        ✏️ {sticker.by}
      </span>
    </div>
  )
}

export default function Stickers() {
  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <div style={{
        fontFamily: 'var(--font-title)',
        fontSize: '1.2rem',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: '-0.2px',
        marginBottom: 6,
      }}>
        stickers 🎨 by nancy and mia 
      </div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginBottom: 28 }}>
        click a sticker to reveal what's underneath
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 32,
      }}>
        {STICKER_DATA.map((s) => <StickerCard key={s.id} sticker={s} />)}
      </div>
    </div>
  )
}
