'use client'

import { useState, useEffect } from 'react'

const ROTATIONS = [-6, 4, -3, 7, -5, 3, -7, 5, -2, 6, -4, 5, -3, 7]
const PHOTO_H   = 420   // px
const OVERLAP   = 35    // overlap between photos in a row

function formatDate(filename) {
  const base = filename.replace(/\.[^.]+$/, '').split('_')[0]
  if (base.length !== 8 || !/^\d{8}$/.test(base)) return ''
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const m = parseInt(base.slice(0, 2), 10) - 1
  const d = parseInt(base.slice(2, 4), 10)
  const y = base.slice(4, 8)
  return `${MONTHS[m]} ${d}, ${y}`
}

function sameDay(a, b) {
  if (!a) return false
  return a.split('_')[0].replace(/\.[^.]+$/, '') ===
         b.split('_')[0].replace(/\.[^.]+$/, '')
}

// Lightbox overlay
function Lightbox({ filename, onClose }) {
  const date = formatDate(filename)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'lb-in 0.22s ease',
      }}
    >
      <style>{`
        @keyframes lb-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lb-img { from { transform: scale(0.88); opacity:0; } to { transform: scale(1); opacity:1; } }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          animation: 'lb-img 0.25s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <img
          src={`/photos/${filename}`}
          alt={date || filename}
          style={{
            maxHeight: '80vh',
            maxWidth: '82vw',
            display: 'block',
            boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
          }}
        />
        {date && (
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.05em',
          }}>{date}</div>
        )}
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.2)',
          marginTop: -4,
        }}>click anywhere to close</div>
      </div>
    </div>
  )
}

function PhotoItem({ filename, index, prevFilename, baseZ, isHovered, onHover, onLeave, onClick }) {
  const rotate   = ROTATIONS[index % ROTATIONS.length]
  const date     = formatDate(filename)
  const showDate = !sameDay(prevFilename, filename)

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        flexShrink: 0,
        position: 'relative',
        zIndex: isHovered ? 1000 : baseZ,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'z-index 0s',
      }}
    >
      <div style={{
        transform: isHovered
          ? `rotate(${rotate * 0.3}deg) translateY(-32px) scale(1.08)`
          : `rotate(${rotate}deg)`,
        transformOrigin: 'center bottom',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <img
          src={`/photos/${filename}`}
          alt={date || filename}
          style={{
            height: PHOTO_H,
            width: 'auto',
            display: 'block',
            boxShadow: isHovered
              ? '0 20px 50px rgba(0,0,0,0.75)'
              : '4px 6px 24px rgba(0,0,0,0.55)',
            transition: 'box-shadow 0.25s ease',
          }}
          loading="eager"
        />
      </div>

      {showDate && date && (
        <div style={{
          marginTop: 8,
          fontSize: '10px',
          fontFamily: 'var(--font-body)',
          color: isHovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.4)',
          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          letterSpacing: '0.04em',
          transition: 'color 0.2s',
        }}>
          {date}
        </div>
      )}
    </div>
  )
}

export default function Photobooth() {
  const [photos,       setPhotos]       = useState([])
  const [loading,      setLoading]      = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [selected,     setSelected]     = useState(null)

  useEffect(() => {
    fetch('/api/photos')
      .then((r) => r.json())
      .then((data) => { setPhotos(data.photos ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{
        padding: '80px 0',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        color: 'rgba(255,255,255,0.35)',
        fontSize: '13px',
      }}>
        loading photos...
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div style={{
        padding: '80px 40px',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        color: 'rgba(255,255,255,0.35)',
        fontSize: '13px',
        lineHeight: 1.8,
      }}>
        <div style={{ fontSize: '2rem', marginBottom: 12 }}>📷</div>
        Upload your photos to <code style={{ color: 'rgba(255,255,255,0.55)' }}>public/photos/</code><br />
        Name them by date: <code style={{ color: 'rgba(255,255,255,0.55)' }}>MMDDYYYY.jpg</code><br />
        Multiple from same day: <code style={{ color: 'rgba(255,255,255,0.55)' }}>MMDDYYYY_2.jpg</code>
      </div>
    )
  }

  // Rows of 5
  const rows = []
  let i = 0
  let rowIdx = 0
  while (i < photos.length) {
    const count = 5
    rows.push(
      photos.slice(i, i + count).map((filename, col) => ({
        filename,
        absIndex: i + col,
      }))
    )
    i += count
    rowIdx++
  }

  return (
    <>
      {selected && (
        <Lightbox filename={selected} onClose={() => setSelected(null)} />
      )}
      <div style={{ padding: '60px 60px 120px', display: 'flex', flexDirection: 'column', gap: 72 }}>
        {rows.map((row, ri) => (
          <div
            key={ri}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              overflow: 'visible',
              marginLeft: ri % 2 === 0 ? 0 : 60,
            }}
          >
            {row.map(({ filename, absIndex }, col) => (
              <div
                key={filename}
                style={{ marginLeft: col > 0 ? -OVERLAP : 0, overflow: 'visible' }}
              >
                <PhotoItem
                  filename={filename}
                  index={absIndex}
                  prevFilename={absIndex > 0 ? photos[absIndex - 1] : null}
                  baseZ={col + 1}
                  isHovered={hoveredIndex === absIndex}
                  onHover={() => setHoveredIndex(absIndex)}
                  onLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelected(filename)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
